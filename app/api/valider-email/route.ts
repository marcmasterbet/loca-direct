import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    const { data: user, error } = await supabase
      .from('directloca_users')
      .select('*')
      .eq('token_validation', token)
      .single()

    if (error || !user) {
      return NextResponse.json({ status: 'invalid' })
    }

    if (user.email_valide) {
      return NextResponse.json({ status: 'already_active' })
    }

    await supabase
      .from('directloca_users')
      .update({ email_valide: true })
      .eq('id', user.id)

    const cookieStore = await cookies()
    cookieStore.set('loca_session', user.id, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })

    return NextResponse.json({ status: 'success' })
  } catch (e) {
    console.error('Erreur validation email:', e)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}