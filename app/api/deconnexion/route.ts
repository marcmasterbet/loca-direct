import { NextResponse } from 'next/server'
import { clearUserSession, clearAdminSession } from '@/lib/session'

export async function POST() {
  await clearUserSession()
  await clearAdminSession()
  return NextResponse.json({ success: true })
}
