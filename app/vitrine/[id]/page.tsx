import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VitrineClient from './VitrineClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params

  const { data: vitrine } = await supabase
    .from('vitrines')
    .select('titre, ville, prix_nuit, description_courte, photos')
    .eq('id', id)
    .single()

  if (!vitrine) {
    return { title: 'Annonce introuvable' }
  }

  const title = `${vitrine.titre} — ${vitrine.ville}`
  const description =
    vitrine.description_courte ||
    `${vitrine.titre} à ${vitrine.ville}, à partir de ${vitrine.prix_nuit}€/nuit. Location directe sans commission sur LocaDirect.`

  return {
    title,
    description,
    openGraph: {
      title: `${title} | LocaDirect`,
      description,
      images: vitrine.photos?.[0] ? [vitrine.photos[0]] : undefined,
    },
  }
}

export default async function VitrinePage({ params }: Props) {
  const { id } = await params
  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: vitrine, error } = await supabase
    .from('vitrines')
    .select('*')
    .eq('id', id)
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .single()

  if (error || !vitrine) {
    notFound()
  }

  // Incrémente le compteur de vues
  supabase
    .from('vitrines')
    .update({ nb_vues: (vitrine.nb_vues || 0) + 1 })
    .eq('id', id)
    .then(() => {})

  supabase
    .from('page_views_vitrines')
    .insert({ vitrine_id: id })
    .then(() => {})

  // JSON-LD données structurées pour Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: vitrine.titre,
    description: vitrine.description_courte || vitrine.description_longue || `${vitrine.titre} à ${vitrine.ville}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: vitrine.ville,
      postalCode: vitrine.code_postal || '',
      addressCountry: vitrine.pays === 'Belgique' ? 'BE' : vitrine.pays === 'Suisse' ? 'CH' : vitrine.pays === 'Espagne' ? 'ES' : 'FR',
    },
    priceRange: `${vitrine.prix_nuit}€/nuit`,
    image: vitrine.photos?.[0] || undefined,
    url: `https://www.loca-direct.fr/vitrine/${vitrine.id}`,
    petsAllowed: vitrine.equipements?.includes('chien_10kg') ?? false,
    numberOfRooms: vitrine.nb_chambres || undefined,
    amenityFeature: (vitrine.equipements || []).map((eq: string) => ({
      '@type': 'LocationFeatureSpecification',
      name: eq,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      price: vitrine.prix_nuit,
      priceCurrency: 'EUR',
      availability: vitrine.statut === 'active'
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VitrineClient vitrine={vitrine} isLoggedIn={isLoggedIn} />
    </>
  )
}
