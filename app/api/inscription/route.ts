import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Resend } from 'resend'
import { bouton, gabarit } from '@/lib/emails'
import { escapeHtml } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'marc.masterbet@gmail.com'

export async function POST(req: Request) {
  try {
    const { email, motDePasse, estVoyageur, estHebergeur, estPrestataire, redirect } = await req.json()

    if (typeof email !== 'string' || typeof motDePasse !== 'string' || !email || !motDePasse) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }
    if (email.length > 254 || !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email.trim()) || motDePasse.length > 200) {
      return NextResponse.json({ error: 'Email ou mot de passe invalide' }, { status: 400 })
    }
    if (motDePasse.length < 8 || !/[A-Z]/.test(motDePasse) || !/[0-9]/.test(motDePasse) || !/[!@#$%^&*(),.?":{}|<>_\-]/.test(motDePasse)) {
      return NextResponse.json({ error: 'Mot de passe trop faible (8 car. min, majuscule, chiffre, caractère spécial)' }, { status: 400 })
    }
    if (!estVoyageur && !estHebergeur && !estPrestataire) {
      return NextResponse.json({ error: 'Sélectionnez au moins un profil' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('directloca_users')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Un compte existe déjà avec cet email' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10)
    const refCode = crypto.randomBytes(4).toString('hex')
    const tokenValidation = crypto.randomBytes(32).toString('hex')

    const { data: newUser, error } = await supabase
      .from('directloca_users')
      .insert({
        email: email.toLowerCase().trim(),
        prenom: '',
        nom: '',
        mot_de_passe: hashedPassword,
        est_voyageur: !!estVoyageur,
        est_hebergeur: !!estHebergeur,
        est_prestataire: !!estPrestataire,
        ref_code: refCode,
        statut: 'actif',
        email_valide: false,
        token_validation: tokenValidation,
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur création compte:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    const validationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/valider-email/${tokenValidation}${typeof redirect === 'string' && /^\/(?![\/\\])/.test(redirect) ? `?redirect=${encodeURIComponent(redirect)}` : ''}`

    try {
      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: newUser.email,
        subject: 'Confirmez votre compte LocaDirect',
        html: gabarit(`
          <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Plus qu’une étape</p>
          <p style="margin:0 0 16px;">Confirmez votre adresse e-mail pour activer votre compte LocaDirect.</p>
          ${bouton(validationUrl, 'Confirmer mon adresse e-mail')}
          <p style="margin:16px 0 0;font-size:13px;color:#6B6A80;word-break:break-all;">Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur&nbsp;: ${validationUrl}</p>`),
      })
    } catch (e) {
      console.error('Erreur envoi email:', e)
    }

    // Notification email à l'admin — ne bloque jamais la réponse si ça échoue
    try {
      const profils = [estVoyageur && 'Voyageur', estHebergeur && 'Propriétaire', estPrestataire && 'Prestataire']
        .filter(Boolean)
        .join(' + ')

      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: ADMIN_EMAIL,
        subject: `🎉 Nouvel inscrit : ${String(newUser.email).replace(/[\r\n]/g, ' ')}`,
        html: gabarit(`
          <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Nouvelle inscription</p>
          <p style="margin:0 0 12px;"><strong>${escapeHtml(newUser.email)}</strong><br>Profil : ${profils}</p>
          <p style="margin:0;font-size:14px;color:#6B6A80;">L’utilisateur doit encore confirmer son adresse e-mail pour activer son compte.</p>`),
      })
    } catch (e) {
      console.error('Erreur envoi email notification admin:', e)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur inscription:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}