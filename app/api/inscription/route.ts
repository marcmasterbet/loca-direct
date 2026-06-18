import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email, motDePasse, estVoyageur, estHebergeur, redirect } = await req.json()

    if (!email || !motDePasse) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }
    if (motDePasse.length < 8 || !/[A-Z]/.test(motDePasse) || !/[0-9]/.test(motDePasse) || !/[!@#$%^&*(),.?":{}|<>_\-]/.test(motDePasse)) {
      return NextResponse.json({ error: 'Mot de passe trop faible (8 car. min, majuscule, chiffre, caractère spécial)' }, { status: 400 })
    }
    if (!estVoyageur && !estHebergeur) {
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

    const validationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/valider-email/${tokenValidation}${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`

    try {
      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: newUser.email,
        subject: 'Confirmez votre compte LocaDirect',
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
            <h1 style="color: #EA580C; font-size: 22px;">🏠 LocaDirect</h1>
            <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
              Bienvenue ! Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte.
            </p>
            <a href="${validationUrl}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
              Confirmer mon email
            </a>
            <p style="font-size: 13px; color: #6B7280;">
              Si le bouton ne fonctionne pas, copiez ce lien : ${validationUrl}
            </p>
          </div>
        `,
      })
    } catch (e) {
      console.error('Erreur envoi email:', e)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur inscription:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}