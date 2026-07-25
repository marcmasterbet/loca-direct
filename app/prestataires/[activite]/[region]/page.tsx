import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PrestatairesRegionClient from './PrestatairesRegionClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ACTIVITES_SLUGS: Record<string, string> = {
  'conciergerie': 'Conciergerie',
  'menage': 'Ménage / Entretien',
  'photographe': 'Photographe',
  'digital': 'Aide au digital / Communication',
  'maintenance': 'Maintenance / Bricolage',
  'jardinage': 'Jardinage / Extérieur',
  'decoration': 'Décoration / Aménagement',
  'kits-accueil': "Kits & paniers d'accueil",
  'autre': 'Autre',
}

const REGIONS_SLUGS: Record<string, string> = {
  'bretagne': 'Bretagne',
  'nouvelle-aquitaine': 'Nouvelle-Aquitaine',
  'occitanie': 'Occitanie',
  'provence-alpes-cote-dazur': "Provence-Alpes-Côte d'Azur",
  'auvergne-rhone-alpes': 'Auvergne-Rhône-Alpes',
  'normandie': 'Normandie',
  'grand-est': 'Grand Est',
  'pays-de-la-loire': 'Pays de la Loire',
  'bourgogne-franche-comte': 'Bourgogne-Franche-Comté',
  'centre-val-de-loire': 'Centre-Val de Loire',
  'corse': 'Corse',
  'hauts-de-france': 'Hauts-de-France',
  'ile-de-france': 'Île-de-France',
  'guadeloupe': 'Guadeloupe',
  'martinique': 'Martinique',
  'guyane': 'Guyane',
  'la-reunion': 'La Réunion',
  'mayotte': 'Mayotte',
}

type Props = { params: Promise<{ activite: string; region: string }> }

export async function generateStaticParams() {
  const params = []
  for (const activite of Object.keys(ACTIVITES_SLUGS)) {
    for (const region of Object.keys(REGIONS_SLUGS)) {
      params.push({ activite, region })
    }
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { activite: activiteSlug, region: regionSlug } = await params
  const activiteName = ACTIVITES_SLUGS[activiteSlug]
  const regionName = REGIONS_SLUGS[regionSlug]
  if (!activiteName || !regionName) return { title: 'Introuvable' }

  return {
    title: `${activiteName} en ${regionName} — Annuaire prestataires | LocaDirect`,
    description: `Trouvez un prestataire ${activiteName.toLowerCase()} en ${regionName} pour votre location saisonnière. Contact direct WhatsApp, sans intermédiaire.`,
    openGraph: {
      title: `${activiteName} ${regionName} | LocaDirect`,
      description: `Prestataires ${activiteName.toLowerCase()} disponibles en ${regionName}.`,
    },
  }
}

export default async function PrestatairesRegionPage({ params }: Props) {
  const { activite: activiteSlug, region: regionSlug } = await params
  const activiteName = ACTIVITES_SLUGS[activiteSlug]
  const regionName = REGIONS_SLUGS[regionSlug]
  if (!activiteName || !regionName) notFound()

  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: prestataires } = await supabase
    .from('prestataires')
    .select('*')
    .eq('statut', 'active')
    .eq('activite', activiteName)
    .eq('region', regionName)
    .order('created_at', { ascending: false })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${activiteName} en ${regionName}`,
    description: `Prestataires ${activiteName} pour location saisonnière en ${regionName}`,
    numberOfItems: prestataires?.length || 0,
    itemListElement: (prestataires || []).slice(0, 10).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.loca-direct.fr/prestataires/${p.id}`,
      name: `${p.prenom} ${p.nom} — ${p.activite}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PrestatairesRegionClient
        prestataires={prestataires || []}
        activiteName={activiteName}
        activiteSlug={activiteSlug}
        regionName={regionName}
        regionSlug={regionSlug}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}
