import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import VitrineClient, { type Voisin } from './VitrineClient'
import { getSessionUserId } from '@/lib/session'
import { centreCommune } from '@/lib/geo'
import { SITE_URL, STATUTS_VISIBLES } from '@/lib/seo'
import { slugifier, slugRegion } from '@/lib/france'

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
    .select('titre, ville, prix_nuit, description_courte, photos, type_logement, capacite, equipements')
    .eq('id', id)
    .single()

  if (!vitrine) {
    return { title: 'Annonce introuvable' }
  }

  const chien = Array.isArray(vitrine.equipements) && vitrine.equipements.includes('chien_10kg')
  const title = `${vitrine.titre} à ${vitrine.ville}`
  const description =
    vitrine.description_courte ||
    `${vitrine.type_logement || 'Location de vacances'} à ${vitrine.ville}${vitrine.capacite ? ` pour ${vitrine.capacite} personnes` : ''}${chien ? ', chien accepté' : ''}, à partir de ${vitrine.prix_nuit} € la nuit. Location entre particuliers, sans commission.`

  return {
    title,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}…` : description,
    alternates: { canonical: `${SITE_URL}/vitrine/${id}` },
    openGraph: {
      title: `${title} | LocaDirect`,
      description,
      images: vitrine.photos?.[0] ? [vitrine.photos[0]] : undefined,
    },
  }
}

export default async function VitrinePage({ params }: Props) {
  const { id } = await params
  const isLoggedIn = !!(await getSessionUserId())

  const { data: vitrine, error } = await supabase
    .from('vitrines')
    .select('*')
    .eq('id', id)
    .in('statut', STATUTS_VISIBLES)
    .single()

  if (error || !vitrine) {
    notFound()
  }

  // Compteurs de vues (inchangés)
  supabase
    .from('vitrines')
    .update({ nb_vues: (vitrine.nb_vues || 0) + 1 })
    .eq('id', id)
    .then(() => {})

  supabase
    .from('page_views_vitrines')
    .insert({ vitrine_id: id })
    .then(() => {})

  // Position approximative (centre de la commune) et logements de la même région
  const [centre, { data: autres }] = await Promise.all([
    centreCommune(vitrine.code_postal, vitrine.ville),
    vitrine.region
      ? supabase
          .from('vitrines')
          .select('id, titre, ville, prix_nuit, photos, type_logement, statut, equipements')
          .eq('region', vitrine.region)
          .eq('statut', 'active')
          .neq('id', vitrine.id)
          .order('created_at', { ascending: false })
          .limit(4)
      : Promise.resolve({ data: [] as Voisin[] }),
  ])

  const regionSlug = slugRegion(vitrine.region)
  const fil = [
    { nom: 'Logements', href: '/logements' },
    ...(regionSlug ? [{ nom: vitrine.region as string, href: `/location-vacances/${regionSlug}` }] : []),
    ...(regionSlug && vitrine.ville
      ? [{ nom: vitrine.ville as string, href: `/location-vacances/${regionSlug}/${slugifier(vitrine.ville)}` }]
      : []),
  ]

  // Données structurées pour Google
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'VacationRental',
      name: vitrine.titre,
      description: vitrine.description_courte || vitrine.description_longue || `${vitrine.titre} à ${vitrine.ville}`,
      identifier: vitrine.id,
      url: `${SITE_URL}/vitrine/${vitrine.id}`,
      image: (vitrine.photos || []).slice(0, 8),
      address: {
        '@type': 'PostalAddress',
        addressLocality: vitrine.ville,
        postalCode: vitrine.code_postal || undefined,
        addressRegion: vitrine.region || undefined,
        addressCountry: 'FR',
      },
      geo: centre ? { '@type': 'GeoCoordinates', latitude: centre[1], longitude: centre[0] } : undefined,
      containsPlace: {
        '@type': 'Accommodation',
        additionalType: vitrine.type_logement || undefined,
        occupancy: vitrine.capacite ? { '@type': 'QuantitativeValue', value: Number(vitrine.capacite) } : undefined,
        numberOfBedrooms: vitrine.nb_chambres ? Number(vitrine.nb_chambres) : undefined,
        numberOfRooms: vitrine.nb_pieces ? Number(vitrine.nb_pieces) : undefined,
        floorSize: vitrine.surface ? { '@type': 'QuantitativeValue', value: Number(vitrine.surface), unitCode: 'MTK' } : undefined,
        petsAllowed: (vitrine.equipements || []).includes('chien_10kg') || (vitrine.equipements || []).includes('animaux'),
      },
      priceRange: vitrine.prix_nuit ? `${vitrine.prix_nuit} € la nuit` : undefined,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
        ...fil.map((f, i) => ({ '@type': 'ListItem', position: i + 2, name: f.nom, item: `${SITE_URL}${f.href}` })),
        { '@type': 'ListItem', position: fil.length + 2, name: vitrine.titre },
      ],
    },
  ]

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <VitrineClient
        vitrine={vitrine}
        isLoggedIn={isLoggedIn}
        centre={centre}
        fil={fil}
        voisins={(autres || []) as Voisin[]}
      />
    </>
  )
}
