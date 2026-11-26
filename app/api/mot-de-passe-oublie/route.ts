import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { Resend } from 'resend'
import { bouton, gabarit } from '@/lib/emails'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (typeof email !== 'string' || !email || email.length > 254) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const { data: user } = await supabase
      .from('directloca_users')
      .select('id, email')
      .eq('email', email.toLowerCase().trim())
      .single()

    // On répond toujours "success" même si l'email n'existe pas,
    // pour ne pas révéler quels emails sont inscrits (sécurité)
    if (!user) {
      return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expire = new Date(Date.now() + 60 * 60 * 1000) // expire dans 1h

    await supabase
      .from('directloca_users')
      .update({
        token_reset_password: token,
        token_reset_expire: expire.toISOString(),
      })
      .eq('id', user.id)

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reinitialiser-mot-de-passe/${token}`

    try {
      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: user.email,
        subject: 'Réinitialisez votre mot de passe LocaDirect',
        html: gabarit(`
          <p style="margin:0 0 12px;font-size:22px;font-weight:700;">Nouveau mot de passe</p>
          <p style="margin:0 0 16px;">Vous avez demandé à changer votre mot de passe LocaDirect. Cliquez sur le bouton pour en choisir un nouveau.</p>
          ${bouton(resetUrl, 'Choisir un nouveau mot de passe')}
          <p style="margin:16px 0 0;font-size:14px;color:#6B6A80;">Ce lien est valable 1&nbsp;heure. Si vous n’êtes pas à l’origine de cette demande, ignorez cet e-mail : votre mot de passe ne change pas.</p>`),
      })
    } catch (e) {
      console.error('Erreur envoi email reset:', e)
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur mot-de-passe-oublie:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
