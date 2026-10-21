import { NextResponse } from 'next/server'
import { setAdminSession, passwordMatches } from '@/lib/session'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD

    if (!expected || expected.length < 12) {
      console.error('ADMIN_PASSWORD absent ou trop court (12 caractères minimum)')
      return NextResponse.json({ error: 'Administration indisponible' }, { status: 503 })
    }

    if (!passwordMatches(password, expected)) {
      // Ralentit les tentatives de devinette du mot de passe
      await new Promise((r) => setTimeout(r, 1500))
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 })
    }

    await setAdminSession()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Requête invalide' }, { status: 400 })
  }
}
