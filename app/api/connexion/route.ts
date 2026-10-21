import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import { setUserSession } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { email, motDePasse } = await req.json()

    if (typeof email !== 'string' || typeof motDePasse !== 'string' || !email || !motDePasse || motDePasse.length > 200) {
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from('directloca_users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    const passwordMatch = await bcrypt.compare(motDePasse, user.mot_de_passe)
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }

    if (!user.email_valide) {
      return NextResponse.json({ error: 'Veuillez confirmer votre email avant de vous connecter' }, { status: 403 })
    }

    if (user.statut === 'banni') {
      return NextResponse.json({ error: 'Ce compte a été suspendu' }, { status: 403 })
    }

    await setUserSession(user.id)

    await supabase
      .from('directloca_users')
      .update({ derniere_connexion: new Date().toISOString() })
      .eq('id', user.id)

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur connexion:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}