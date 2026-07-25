import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import RegionClient from './RegionClient'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const REGIONS_SLUGS: Record<string, string> = {
  'auvergne-rhone-alpes': 'Auvergne-Rhône-Alpes',
  'bourgogne-franche-comte': 'Bourgogne-Franche-Comté',
  'bretagne': 'Bretagne',
  'centre-val-de-loire': 'Centre-Val de Loire',
  'corse': 'Corse',
  'grand-est': 'Grand Est',
  'hauts-de-france': 'Hauts-de-France',
  'ile-de-france': 'Île-de-France',
  'normandie': 'Normandie',
  'nouvelle-aquitaine': 'Nouvelle-Aquitaine',
  'occitanie': 'Occitanie',
  'pays-de-la-loire': 'Pays de la Loire',
  'provence-alpes-cote-dazur': "Provence-Alpes-Côte d'Azur",
  'guadeloupe': 'Guadeloupe',
  'martinique': 'Martinique',
  'guyane': 'Guyane',
  'la-reunion': 'La Réunion',
  'mayotte': 'Mayotte',
}

type Props = { params: Promise<{ region: string }> }

export async function generateStaticParams() {
  return Object.keys(REGIONS_SLUGS).map(slug => ({ region: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { region: slug } = await params
  const regionName = REGIONS_SLUGS[slug]
  if (!regionName) return { title: 'Région introuvable' }

  return {
    title: `Location vacances ${regionName} — sans commission | LocaDirect`,
    description: `Trouvez votre logement de vacances en ${regionName}. Location directe entre particuliers, sans commission. Contact WhatsApp direct avec le propriétaire.`,
    openGraph: {
      title: `Location vacances ${regionName} | LocaDirect`,
      description: `Logements disponibles en ${regionName}. Location directe sans intermédiaire.`,
    },
  }
}

export default async function RegionPage({ params }: Props) {
  const { region: slug } = await params
  const regionName = REGIONS_SLUGS[slug]
  if (!regionName) notFound()

  const cookieStore = await cookies()
  const isLoggedIn = !!cookieStore.get('loca_session')?.value

  const { data: logements } = await supabase
    .from('vitrines')
    .select('*')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
    .eq('region', regionName)
    .order('created_at', { ascending: false })

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Location vacances ${regionName}`,
    description: `Logements en location directe en ${regionName}, sans commission`,
    numberOfItems: logements?.length || 0,
    itemListElement: (logements || []).slice(0, 10).map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.loca-direct.fr/vitrine/${v.id}`,
      name: v.titre,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RegionClient
        logements={logements || []}
        regionName={regionName}
        slug={slug}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}
