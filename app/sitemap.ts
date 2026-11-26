import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { ARTICLES, articleDate } from '@/lib/articles'
import { MIN_ANNONCES_INDEX, MIN_PRESTATAIRES_INDEX } from '@/lib/seo'
import { slugifier, accepteGrandChien } from '@/lib/france'
import { departementDuCodePostal } from '@/lib/departements'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Régénéré toutes les heures : les nouvelles annonces y apparaissent sans redéploiement.
export const revalidate = 3600

const BASE_URL = 'https://www.loca-direct.fr'

// Date de la dernière mise à jour des pages légales
const PAGES_LEGALES = new Date('2026-11-24')

/** Vraie date de dernière modification d'une annonce */
function dateDe(v: { created_at?: string | null; updated_at?: string | null }): Date {
  const d = v.updated_at || v.created_at
  return d ? new Date(d) : new Date()
}

/** Date la plus récente d'une liste d'annonces */
function plusRecente(liste: { created_at?: string | null; updated_at?: string | null }[]): Date {
  return liste.reduce((max, v) => (dateDe(v) > max ? dateDe(v) : max), new Date(0))
}

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

const ACTIVITES_SLUGS: Record<string, string> = {
  'conciergerie': 'Conciergerie',
  'menage': 'Ménage / Entretien',
  'photographe': 'Photographe',
  'digital': 'Aide au digital / Communication',
  'maintenance': 'Maintenance / Bricolage',
  'jardinage': 'Jardinage / Extérieur',
  'decoration': 'Décoration / Aménagement',
  'kits-accueil': "Kits d'accueil",
  'autre': 'Autre',
}

function slugify(value: string) {
  return decodeURIComponent(value)
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getRegionSlug(regionName: string) {
  return Object.entries(REGIONS_SLUGS).find(
    ([, name]) => name === regionName
  )?.[0]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Pages statiques
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/logements`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    { url: `${BASE_URL}/publier`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/rejoindre-annuaire`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    {
      url: `${BASE_URL}/logements/chiens`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/prestataires`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/alternative-airbnb`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/cgu`,
      lastModified: PAGES_LEGALES,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: PAGES_LEGALES,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politique-confidentialite`,
      lastModified: PAGES_LEGALES,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: PAGES_LEGALES,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Articles du guide
  const articlesPages: MetadataRoute.Sitemap = ARTICLES.map(article => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: articleDate(article) ?? now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Logements
  const { data: vitrines, error: vitrinesError } = await supabase
    .from('vitrines')
    .select('id, ville, region, code_postal, equipements, created_at, updated_at')
    .in('statut', [
      'active',
      'deja_loue',
      'bientot_dispo',
    ])

  if (vitrinesError) {
    console.error('Erreur sitemap vitrines :', vitrinesError)
  }

  // Fiches logements
  const vitrinesPages: MetadataRoute.Sitemap =
    (vitrines || []).map(vitrine => ({
      url: `${BASE_URL}/vitrine/${vitrine.id}`,
      lastModified: dateDe(vitrine),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Pages régions : seulement celles qui ont assez d'annonces
  type V = NonNullable<typeof vitrines>[number]
  const grouper = (cle: (v: V) => string | undefined) => {
    const m = new Map<string, V[]>()
    for (const v of vitrines || []) {
      const k = cle(v)
      if (k) m.set(k, [...(m.get(k) || []), v])
    }
    return Array.from(m.entries()).filter(([, l]) => l.length >= MIN_ANNONCES_INDEX)
  }

  // Pages « chien accepté » par région et pages département
  const chiensRegionsPages: MetadataRoute.Sitemap = grouper(v =>
    v.region && accepteGrandChien(v.equipements) ? getRegionSlug(v.region) : undefined
  ).map(([regionSlug, liste]) => ({
    url: `${BASE_URL}/logements/chiens/${regionSlug}`,
    lastModified: plusRecente(liste),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))
  const departementsPages: MetadataRoute.Sitemap = grouper(v => departementDuCodePostal(v.code_postal)?.slug).map(
    ([slug, liste]) => ({
      url: `${BASE_URL}/location-vacances/departement/${slug}`,
      lastModified: plusRecente(liste),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })
  )

  const regionsPages: MetadataRoute.Sitemap = grouper(v => (v.region ? getRegionSlug(v.region) : undefined))
    .map(([regionSlug, liste]) => ({
      url: `${BASE_URL}/location-vacances/${regionSlug}`,
      lastModified: plusRecente(liste),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  // Pages villes
  const villesMap = new Map<
    string,
    {
      regionSlug: string
      villeSlug: string
      lastModified: Date
      nb: number
    }
  >()

  for (const vitrine of vitrines || []) {
    if (!vitrine.ville || !vitrine.region) continue

    const regionSlug = getRegionSlug(vitrine.region)
    if (!regionSlug) continue

    const villeSlug = slugify(vitrine.ville)
    if (!villeSlug) continue

    const key = `${regionSlug}/${villeSlug}`

    const lastModified = dateDe(vitrine)

    const existing = villesMap.get(key)

    villesMap.set(key, {
      regionSlug,
      villeSlug,
      lastModified:
        existing && existing.lastModified > lastModified
          ? existing.lastModified
          : lastModified,
      nb: (existing?.nb || 0) + 1,
    })
  }

  const villesPages: MetadataRoute.Sitemap =
    Array.from(villesMap.values())
      .filter(ville => ville.nb >= MIN_ANNONCES_INDEX)
      .map(ville => ({
      url:
        `${BASE_URL}/location-vacances/` +
        `${ville.regionSlug}/${ville.villeSlug}`,
      lastModified: ville.lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  // Prestataires dynamiques
  const { data: prestataires, error: prestatairesError } =
    await supabase
      .from('prestataires')
      .select('id, created_at, activite, region, ville')
      .eq('statut', 'active')

  if (prestatairesError) {
    console.error(
      'Erreur sitemap prestataires :',
      prestatairesError
    )
  }

  const prestatairesPages: MetadataRoute.Sitemap =
    (prestataires || []).map(prestataire => ({
      url: `${BASE_URL}/prestataires/${prestataire.id}`,
      lastModified: prestataire.created_at
        ? new Date(prestataire.created_at)
        : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Pages métier + région : seulement celles qui ont des prestataires
  const metierRegion = new Map<string, number>()
  for (const p of prestataires || []) {
    const activiteSlug = Object.entries(ACTIVITES_SLUGS).find(([, nom]) => nom === p.activite)?.[0]
    const regionSlug = p.region ? getRegionSlug(p.region) : undefined
    if (!activiteSlug || !regionSlug) continue
    const key = `${activiteSlug}/${regionSlug}`
    metierRegion.set(key, (metierRegion.get(key) || 0) + 1)
  }
  const prestatairesRegionsPages: MetadataRoute.Sitemap = Array.from(metierRegion.entries())
    .filter(([, nb]) => nb >= MIN_PRESTATAIRES_INDEX)
    .map(([key]) => ({
      url: `${BASE_URL}/prestataires/${key}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Pages métier + ville (/prestataires/conciergerie/bordeaux) : dès un professionnel
  const metierVille = new Set<string>()
  const slugsRegions = new Set(Object.keys(REGIONS_SLUGS))
  for (const p of prestataires || []) {
    const activiteSlug = Object.entries(ACTIVITES_SLUGS).find(([, nom]) => nom === p.activite)?.[0]
    const villeSlug = p.ville ? slugifier(p.ville) : ''
    if (activiteSlug && villeSlug && !slugsRegions.has(villeSlug)) metierVille.add(`${activiteSlug}/${villeSlug}`)
  }
  const prestatairesVillesPages: MetadataRoute.Sitemap = Array.from(metierVille).map(key => ({
    url: `${BASE_URL}/prestataires/${key}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Pages métier (/prestataires/conciergerie…) : celles qui ont au moins un prestataire
  const metiersPresents = new Set(Array.from(metierRegion.keys()).map(k => k.split('/')[0]))
  for (const p of prestataires || []) {
    const slug = Object.entries(ACTIVITES_SLUGS).find(([, nom]) => nom === p.activite)?.[0]
    if (slug) metiersPresents.add(slug)
  }
  const metiersPages: MetadataRoute.Sitemap = Array.from(metiersPresents).map(slug => ({
    url: `${BASE_URL}/prestataires/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return [
    ...staticPages,
    ...articlesPages,
    ...regionsPages,
    ...departementsPages,
    ...chiensRegionsPages,
    ...villesPages,
    ...metiersPages,
    ...prestatairesRegionsPages,
    ...prestatairesVillesPages,
    ...vitrinesPages,
    ...prestatairesPages,
  ]
}
