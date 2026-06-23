import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
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
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
            <h1 style="color: #EA580C; font-size: 22px;">🏠 LocaDirect</h1>
            <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
              Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le bouton ci-dessous pour en choisir un nouveau.
            </p>
            <a href="${resetUrl}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
              Réinitialiser mon mot de passe
            </a>
            <p style="font-size: 13px; color: #6B7280;">
              Ce lien expire dans 1 heure. Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.
            </p>
          </div>
        `,
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
