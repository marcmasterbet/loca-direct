import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { token, motDePasse } = await req.json()

    if (!token || !motDePasse) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    if (motDePasse.length < 8 || !/[A-Z]/.test(motDePasse) || !/[0-9]/.test(motDePasse) || !/[!@#$%^&*(),.?":{}|<>_\-]/.test(motDePasse)) {
      return NextResponse.json({ error: 'Mot de passe trop faible (8 car. min, majuscule, chiffre, caractère spécial)' }, { status: 400 })
    }

    const { data: user } = await supabase
      .from('directloca_users')
      .select('id, token_reset_expire')
      .eq('token_reset_password', token)
      .single()

    if (!user) {
      return NextResponse.json({ error: 'Lien invalide ou déjà utilisé' }, { status: 400 })
    }

    if (!user.token_reset_expire || new Date(user.token_reset_expire) < new Date()) {
      return NextResponse.json({ error: 'Ce lien a expiré. Veuillez refaire une demande.' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(motDePasse, 10)

    const { error } = await supabase
      .from('directloca_users')
      .update({
        mot_de_passe: hashedPassword,
        token_reset_password: null,
        token_reset_expire: null,
      })
      .eq('id', user.id)

    if (error) {
      console.error('Erreur reset password:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur reinitialiser-mot-de-passe:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
