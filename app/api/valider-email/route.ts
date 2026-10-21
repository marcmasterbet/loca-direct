import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { setUserSession } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) {
      return NextResponse.json({ status: 'invalid' })
    }

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
      .update({ email_valide: true, token_validation: null })
      .eq('id', user.id)

    await setUserSession(user.id)

    return NextResponse.json({ status: 'success' })
  } catch (e) {
    console.error('Erreur validation email:', e)
    return NextResponse.json({ status: 'error' }, { status: 500 })
  }
}