import crypto from 'crypto'
import { cookies } from 'next/headers'

/**
 * Sessions signées (HMAC-SHA256).
 * Avant : le cookie contenait l'id brut de l'utilisateur (ou "true" pour l'admin),
 * ce qui permettait à n'importe qui de se faire passer pour un autre compte.
 * Variable Vercel requise : SESSION_SECRET (64+ caractères aléatoires).
 */

export const USER_COOKIE = 'loca_session'
export const ADMIN_COOKIE = 'admin_session'
const USER_MAX_AGE = 60 * 60 * 24 * 30
const ADMIN_MAX_AGE = 60 * 60 * 12

function secret(): string {
  const s = process.env.SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!s || s.length < 32) throw new Error('SESSION_SECRET manquant ou trop court')
  return s
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', secret()).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb)
}

function encode(kind: string, subject: string, maxAge: number): string {
  const exp = Math.floor(Date.now() / 1000) + maxAge
  const payload = `${kind}.${Buffer.from(subject).toString('base64url')}.${exp}`
  return `${payload}.${sign(payload)}`
}

function decode(kind: string, value: string | undefined): string | null {
  if (!value) return null
  const parts = value.split('.')
  if (parts.length !== 4 || parts[0] !== kind) return null
  const payload = parts.slice(0, 3).join('.')
  let expected: string
  try { expected = sign(payload) } catch { return null }
  if (!safeEqual(parts[3], expected)) return null
  const exp = Number(parts[2])
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return null
  try { return Buffer.from(parts[1], 'base64url').toString() } catch { return null }
}

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge,
  path: '/',
})

export async function setUserSession(userId: string) {
  const store = await cookies()
  store.set(USER_COOKIE, encode('u', userId, USER_MAX_AGE), cookieOptions(USER_MAX_AGE))
}

export async function clearUserSession() {
  const store = await cookies()
  store.set(USER_COOKIE, '', cookieOptions(0))
}

/** Renvoie l'id de l'utilisateur connecté, ou null si le cookie est absent, expiré ou falsifié. */
export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies()
  return decode('u', store.get(USER_COOKIE)?.value)
}

export async function setAdminSession() {
  const store = await cookies()
  store.set(ADMIN_COOKIE, encode('a', 'admin', ADMIN_MAX_AGE), cookieOptions(ADMIN_MAX_AGE))
}

export async function clearAdminSession() {
  const store = await cookies()
  store.set(ADMIN_COOKIE, '', cookieOptions(0))
}

export async function isAdmin(): Promise<boolean> {
  const store = await cookies()
  return decode('a', store.get(ADMIN_COOKIE)?.value) === 'admin'
}

/** Comparaison de mot de passe en temps constant. */
export function passwordMatches(input: unknown, expected: string | undefined): boolean {
  if (typeof input !== 'string' || !expected) return false
  const a = crypto.createHash('sha256').update(input).digest()
  const b = crypto.createHash('sha256').update(expected).digest()
  return crypto.timingSafeEqual(a, b)
}

/** Échappe le texte saisi par les utilisateurs avant de l'insérer dans un e-mail HTML. */
export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Retire les champs sensibles d'un utilisateur avant de l'envoyer au navigateur. */
export function publicUser<T extends Record<string, unknown>>(user: T): T {
  const { mot_de_passe, token_validation, token_reset_password, token_reset_expire, ...rest } = user
  void mot_de_passe; void token_validation; void token_reset_password; void token_reset_expire
  return rest as unknown as T
}
