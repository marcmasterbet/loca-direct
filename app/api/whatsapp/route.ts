import { createClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'
import { SITE_URL } from '@/lib/seo'

// Ouvre WhatsApp vers le propriétaire ou le prestataire, sans compte.
// Le numéro n'est jamais écrit dans les pages : il n'est lu qu'au moment du clic,
// ce qui empêche les robots de récolter les numéros en lisant le site.
//   /api/whatsapp?logement=<id>     /api/whatsapp?prestataire=<id>

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

function numeroInternational(brut: unknown): string | null {
  const n = String(brut || '').replace(/[^0-9+]/g, '')
  const f = n.startsWith('00') ? n.slice(2) : n.startsWith('0') ? '33' + n.slice(1) : n.startsWith('+') ? n.slice(1) : n
  return /^\d{8,15}$/.test(f) ? f : null
}

function versWhatsapp(numero: string, message: string) {
  const res = NextResponse.redirect(`https://wa.me/${numero}?text=${encodeURIComponent(message)}`, 302)
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  res.headers.set('Cache-Control', 'no-store')
  return res
}

export async function GET(request: NextRequest) {
  const logement = request.nextUrl.searchParams.get('logement')
  const prestataire = request.nextUrl.searchParams.get('prestataire')

  if (logement) {
    const { data } = await supabase
      .from('vitrines')
      .select('id, titre, whatsapp, statut')
      .eq('id', logement)
      .eq('statut', 'active')
      .single()
    const numero = numeroInternational(data?.whatsapp)
    if (!data || !numero) return NextResponse.redirect(`${SITE_URL}/vitrine/${encodeURIComponent(logement)}`, 302)
    return versWhatsapp(
      numero,
      `Bonjour, je suis intéressé(e) par votre logement « ${data.titre} » vu sur LocaDirect : ${SITE_URL}/vitrine/${data.id}`
    )
  }

  if (prestataire) {
    const { data } = await supabase
      .from('prestataires')
      .select('id, prenom, whatsapp, statut')
      .eq('id', prestataire)
      .eq('statut', 'active')
      .single()
    const numero = numeroInternational(data?.whatsapp)
    if (!data || !numero) return NextResponse.redirect(`${SITE_URL}/prestataires`, 302)
    return versWhatsapp(
      numero,
      `Bonjour${data.prenom ? ` ${data.prenom}` : ''}, j'ai trouvé votre profil sur LocaDirect et je souhaite vous contacter.`
    )
  }

  return NextResponse.redirect(SITE_URL, 302)
}
