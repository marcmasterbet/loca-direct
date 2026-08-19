import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

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

type Props = {
  params: Promise<{
    region: string
    ville: string
  }>
}

type Logement = {
  id: string
  titre: string
  ville: string
  region: string
  type_logement: string
  prix_nuit: number
  surface?: number
  nb_chambres?: number
  statut: string
  photos?: string[]
  equipements?: string[]
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

async function getVilleData(
  regionSlug: string,
  villeSlug: string
) {
  const regionName =
    REGIONS_SLUGS[regionSlug]

  if (!regionName) {
    return {
      regionName: null,
      villeName: null,
      logements: [] as Logement[],
    }
  }

  const { data, error } = await supabase
    .from('vitrines')
    .select(`
      id,
      titre,
      ville,
      region,
      type_logement,
      prix_nuit,
      surface,
      nb_chambres,
      statut,
      photos,
      equipements,
      created_at
    `)
    .eq('region', regionName)
    .in('statut', [
      'active',
      'deja_loue',
      'bientot_dispo',
    ])
    .order('created_at', {
      ascending: false,
    })

  if (error) {
    console.error(
      'Erreur récupération ville :',
      error
    )

    return {
      regionName,
      villeName: null,
      logements: [] as Logement[],
    }
  }

  const normalizedVilleSlug =
    slugify(villeSlug)

  const logements =
    ((data || []) as Logement[]).filter(
      logement => {
        if (!logement.ville) return false

        return (
          slugify(logement.ville) ===
          normalizedVilleSlug
        )
      }
    )

  const villeName =
    logements[0]?.ville || null

  return {
    regionName,
    villeName,
    logements,
  }
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { region, ville } =
    await params

  const {
    regionName,
    villeName,
    logements,
  } = await getVilleData(
    region,
    ville
  )

  if (
    !regionName ||
    !villeName ||
    logements.length === 0
  ) {
    return {
      title:
        'Location de vacances | LocaDirect',
      robots: {
        index: false,
        follow: true,
      },
    }
  }

  const canonical =
    `https://www.loca-direct.fr/location-vacances/${region}/${ville}`

  const title =
    `Location vacances ${villeName} — sans commission | LocaDirect`

  const description =
    `Découvrez ${logements.length} location` +
    `${logements.length > 1 ? 's' : ''} de vacances à ${villeName}, ` +
    `en ${regionName}. Contact direct avec les propriétaires, sans commission.`

  return {
    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'LocaDirect',
      type: 'website',
    },
  }
}

export default async function VillePage({
  params,
}: Props) {
  const { region, ville } =
    await params

  const {
    regionName,
    villeName,
    logements,
  } = await getVilleData(
    region,
    ville
  )

  if (
    !regionName ||
    !villeName ||
    logements.length === 0
  ) {
    notFound()
  }

  const cookieStore =
    await cookies()

  const isLoggedIn =
    !!cookieStore.get(
      'loca_session'
    )?.value

  const canonical =
    `https://www.loca-direct.fr/location-vacances/${region}/${ville}`

  const logementsAvecChien =
    logements.filter(
      logement =>
        Array.isArray(
          logement.equipements
        ) &&
        logement.equipements.includes(
          'chien_10kg'
        )
    ).length

  const jsonLd = {
    '@context':
      'https://schema.org',
    '@type': 'ItemList',

    name:
      `Locations de vacances à ${villeName}`,

    url: canonical,

    numberOfItems:
      logements.length,

    itemListElement:
      logements.map(
        (logement, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: logement.titre,
          url:
            `https://www.loca-direct.fr/vitrine/${logement.id}`,
        })
      ),
  }

  const breadcrumbLd = {
    '@context':
      'https://schema.org',

    '@type':
      'BreadcrumbList',

    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item:
          'https://www.loca-direct.fr/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: regionName,
        item:
          `https://www.loca-direct.fr/location-vacances/${region}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: villeName,
        item: canonical,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(jsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(
              breadcrumbLd
            ),
        }}
      />

      <main
        style={{
          minHeight: '100vh',
          background: '#FFFFFF',
          color: '#1F2937',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, sans-serif',
        }}
      >

        <nav
          style={{
            borderBottom:
              '1px solid #E5E7EB',
            padding: '12px 20px',
            background: '#FFFFFF',
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: '0 auto',
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                color: '#1F2937',
              }}
            >
              <span
                style={{
                  width: 34,
                  height: 34,
                  background:
                    '#EA580C',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >
                🏠
              </span>

              <strong
                style={{
                  fontSize: 18,
                }}
              >
                Loca
                <span
                  style={{
                    color:
                      '#EA580C',
                  }}
                >
                  Direct
                </span>
              </strong>
            </Link>

            {isLoggedIn ? (
              <Link
                href="/espace"
                style={{
                  background:
                    '#EA580C',
                  color:
                    '#FFFFFF',
                  padding:
                    '10px 18px',
                  borderRadius: 10,
                  textDecoration:
                    'none',
                  fontWeight: 700,
                }}
              >
                Mon espace →
              </Link>
            ) : (
              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems:
                    'center',
                }}
              >
                <Link
                  href="/connexion"
                  style={{
                    color:
                      '#6B7280',
                    padding:
                      '8px 14px',
                  }}
                >
                  Connexion
                </Link>

                <Link
                  href="/inscription"
                  style={{
                    background:
                      '#EA580C',
                    color:
                      '#FFFFFF',
                    padding:
                      '10px 18px',
                    borderRadius: 10,
                    fontWeight: 700,
                  }}
                >
                  🏠 Publier
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding:
              '32px 20px 80px',
          }}
        >

          <div
            style={{
              fontSize: 13,
              color: '#6B7280',
              marginBottom: 24,
            }}
          >
            <Link href="/">
              Accueil
            </Link>

            {' › '}

            <Link
              href={
                `/location-vacances/${region}`
              }
            >
              {regionName}
            </Link>

            {' › '}

            <span>
              {villeName}
            </span>
          </div>

          <section
            style={{
              background:
                'linear-gradient(135deg,#FFF7ED 0%,#FFFFFF 100%)',
              borderRadius: 20,
              padding:
                '36px 32px',
              marginBottom: 36,
            }}
          >
            <p
              style={{
                color:
                  '#EA580C',
                fontSize: 11,
                textTransform:
                  'uppercase',
                letterSpacing:
                  '0.2em',
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              LOCATION VACANCES
            </p>

            <h1
              style={{
                fontSize: 34,
                lineHeight: 1.2,
                marginBottom: 12,
              }}
            >
              Location vacances à{' '}
              {villeName}
            </h1>

            <p
              style={{
                color:
                  '#6B7280',
                lineHeight: 1.7,
                maxWidth: 750,
              }}
            >
              Découvrez les locations
              de vacances disponibles à{' '}
              {villeName}, en{' '}
              {regionName}. Contactez
              directement les
              propriétaires et
              organisez votre séjour
              sans commission de
              réservation.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                marginTop: 20,
                fontSize: 13,
                color:
                  '#6B7280',
              }}
            >
              <span>
                ✓ Sans commission
              </span>

              <span>
                ✓ Contact direct
              </span>

              <span>
                ✓ Annonces vérifiées
              </span>

              {logementsAvecChien >
                0 && (
                <span>
                  🐕{' '}
                  {logementsAvecChien}{' '}
                  logement
                  {logementsAvecChien >
                  1
                    ? 's'
                    : ''}{' '}
                  acceptant les grands
                  chiens
                </span>
              )}
            </div>
          </section>

          <section
            style={{
              marginBottom: 32,
              maxWidth: 850,
            }}
          >
            <h2
              style={{
                fontSize: 23,
                marginBottom: 12,
              }}
            >
              Trouver une location de
              vacances à {villeName}
            </h2>

            <p
              style={{
                color:
                  '#4B5563',
                lineHeight: 1.8,
              }}
            >
              LocaDirect met en relation
              les voyageurs avec les
              propriétaires proposant
              leur logement à{' '}
              {villeName}. Consultez les
              annonces et contactez
              directement le
              propriétaire pour
              connaître les
              disponibilités et les
              conditions du séjour.
            </p>
          </section>

          <section>
            <h2
              style={{
                fontSize: 23,
                marginBottom: 20,
              }}
            >
              {logements.length}{' '}
              location
              {logements.length > 1
                ? 's'
                : ''}{' '}
              à {villeName}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fit,minmax(240px,1fr))',
                gap: 18,
              }}
            >
              {logements.map(
                logement => {

                  const accepteChien =
                    Array.isArray(
                      logement.equipements
                    ) &&
                    logement.equipements.includes(
                      'chien_10kg'
                    )

                  return (
                    <Link
                      key={
                        logement.id
                      }
                      href={
                        `/vitrine/${logement.id}`
                      }
                      style={{
                        border:
                          '1px solid #E5E7EB',
                        borderRadius: 16,
                        overflow:
                          'hidden',
                        textDecoration:
                          'none',
                        color:
                          '#1F2937',
                        background:
                          '#FFFFFF',
                      }}
                    >
                      {logement
                        .photos?.[0] ? (
                        <img
                          src={
                            logement
                              .photos[0]
                          }
                          alt={
                            `${logement.titre} - location vacances ${villeName}`
                          }
                          style={{
                            width:
                              '100%',
                            height: 180,
                            objectFit:
                              'cover',
                            display:
                              'block',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            height: 180,
                            background:
                              '#F9FAFB',
                            display:
                              'flex',
                            alignItems:
                              'center',
                            justifyContent:
                              'center',
                            fontSize: 40,
                          }}
                        >
                          🏠
                        </div>
                      )}

                      <div
                        style={{
                          padding: 16,
                        }}
                      >
                        <p
                          style={{
                            fontSize: 12,
                            color:
                              '#6B7280',
                            marginBottom: 5,
                          }}
                        >
                          {
                            logement.type_logement
                          }

                          {logement.surface
                            ? ` · ${logement.surface} m²`
                            : ''}
                        </p>

                        <h3
                          style={{
                            fontSize: 15,
                            marginBottom: 10,
                          }}
                        >
                          {
                            logement.titre
                          }
                        </h3>

                        {accepteChien && (
                          <p
                            style={{
                              fontSize: 12,
                              marginBottom: 10,
                            }}
                          >
                            🐕 Grand chien
                            +10 kg bienvenu
                          </p>
                        )}

                        <div
                          style={{
                            display:
                              'flex',
                            justifyContent:
                              'space-between',
                            alignItems:
                              'center',
                          }}
                        >
                          <strong
                            style={{
                              color:
                                '#EA580C',
                              fontSize: 17,
                            }}
                          >
                            {
                              logement.prix_nuit
                            }{' '}
                            €

                            <span
                              style={{
                                color:
                                  '#6B7280',
                                fontWeight: 400,
                                fontSize: 11,
                              }}
                            >
                              /nuit
                            </span>
                          </strong>

                          {logement.nb_chambres !=
                            null && (
                            <span
                              style={{
                                color:
                                  '#6B7280',
                                fontSize: 12,
                              }}
                            >
                              {
                                logement.nb_chambres
                              }{' '}
                              ch.
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                }
              )}
            </div>
          </section>

          <section
            style={{
              marginTop: 50,
              padding: 28,
              background:
                '#F9FAFB',
              borderRadius: 16,
            }}
          >
            <h2
              style={{
                fontSize: 21,
                marginBottom: 12,
              }}
            >
              Réserver directement une
              location à {villeName}
            </h2>

            <p
              style={{
                color:
                  '#4B5563',
                lineHeight: 1.8,
                marginBottom: 14,
              }}
            >
              La location directe
              permet d'échanger avec le
              propriétaire avant votre
              séjour et de lui poser vos
              questions sur le logement,
              ses équipements et ses
              disponibilités.
            </p>

            <p
              style={{
                color:
                  '#4B5563',
                lineHeight: 1.8,
              }}
            >
              LocaDirect ne prélève pas
              de commission de
              réservation. La mise en
              relation s'effectue
              directement entre le
              voyageur et le
              propriétaire.
            </p>
          </section>

          <div
            style={{
              marginTop: 30,
            }}
          >
            <Link
              href={
                `/location-vacances/${region}`
              }
              style={{
                color:
                  '#EA580C',
                fontWeight: 700,
              }}
            >
              ← Toutes les locations en{' '}
              {regionName}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
