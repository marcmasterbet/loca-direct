'use client'

import { useState } from 'react'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'

type Logement = {
  id: string
  titre: string
  ville: string
  type_logement: string
  prix_nuit: number
  surface?: number
  nb_chambres?: number
  statut: string
  photos?: string[]
  equipements?: string[]
}

const statutBadge: Record<string, { label: string; bg: string }> = {
  active: { label: '✅ Disponible', bg: GREEN },
  deja_loue: { label: '🔴 Déjà loué', bg: '#EF4444' },
  bientot_dispo: { label: '🟡 Bientôt dispo', bg: '#F59E0B' },
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

export default function RegionClient({
  logements,
  regionName,
  slug,
  isLoggedIn = false,
}: {
  logements: Logement[]
  regionName: string
  slug: string
  isLoggedIn?: boolean
}) {
  const [searchVille, setSearchVille] = useState('')

  const filtered = logements.filter(logement => {
    if (!searchVille) return true
    if (!logement.ville) return false

    return logement.ville
      .toLowerCase()
      .includes(searchVille.toLowerCase())
  })

  const villes = Object.values(
    logements.reduce(
      (acc, logement) => {
        if (!logement.ville) return acc

        const nom = logement.ville.trim()
        if (!nom) return acc

        const villeSlug = slugify(nom)

        if (!acc[villeSlug]) {
          acc[villeSlug] = {
            nom,
            slug: villeSlug,
            count: 0,
          }
        }

        acc[villeSlug].count += 1

        return acc
      },
      {} as Record<
        string,
        {
          nom: string
          slug: string
          count: number
        }
      >
    )
  ).sort((a, b) => a.nom.localeCompare(b.nom, 'fr'))

  return (
    <div
      style={{
        background: WHITE,
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        input {
          font-family: inherit;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .destination-link {
          transition: all 0.15s ease;
        }

        .destination-link:hover {
          border-color: #EA580C !important;
          transform: translateY(-1px);
        }

        .logement-card {
          transition: all 0.15s ease;
        }

        .logement-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        @media (max-width: 900px) {
          .grid-4 {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .grid-4 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: WHITE,
          borderBottom: `1px solid ${BORDER}`,
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <a
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              background: ORANGE,
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            🏠
          </div>

          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: TEXT,
            }}
          >
            Loca
            <span style={{ color: ORANGE }}>
              Direct
            </span>
          </span>
        </a>

        <div
          style={{
            display: 'flex',
            gap: 8,
          }}
        >
          {isLoggedIn ? (
            <a
              href="/espace"
              style={{
                background: ORANGE,
                color: WHITE,
                borderRadius: 10,
                padding: '10px 18px',
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Mon espace →
            </a>
          ) : (
            <>
              <a
                href="/connexion"
                style={{
                  fontSize: 14,
                  color: TEXT_DIM,
                  padding: '8px 14px',
                }}
              >
                Connexion
              </a>

              <a
                href="/inscription"
                style={{
                  background: ORANGE,
                  color: WHITE,
                  borderRadius: 10,
                  padding: '10px 18px',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                🏠 Publier
              </a>
            </>
          )}
        </div>
      </nav>

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '40px 20px 80px',
        }}
      >
        <section
          style={{
            background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 100%)`,
            borderRadius: 20,
            padding: '36px 32px',
            marginBottom: 36,
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: ORANGE,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Location vacances
          </p>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: TEXT,
              marginBottom: 8,
            }}
          >
            Location vacances {regionName}
          </h1>

          <p
            style={{
              fontSize: 15,
              color: TEXT_DIM,
              marginBottom: 20,
              lineHeight: 1.6,
            }}
          >
            {logements.length} logement
            {logements.length > 1 ? 's' : ''} en location directe en{' '}
            {regionName} — sans commission, contact direct avec les propriétaires.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 13, color: TEXT_DIM }}>
              ✓ Sans commission
            </span>

            <span style={{ fontSize: 13, color: TEXT_DIM }}>
              ✓ Contact direct
            </span>

            <span style={{ fontSize: 13, color: TEXT_DIM }}>
              ✓ Annonces vérifiées
            </span>
          </div>
        </section>

        {villes.length > 0 && (
          <section
            style={{
              marginBottom: 32,
              padding: 24,
              background: GRAY,
              borderRadius: 16,
              border: `1px solid ${BORDER}`,
            }}
          >
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: TEXT,
                marginBottom: 8,
              }}
            >
              Destinations en {regionName}
            </h2>

            <p
              style={{
                fontSize: 14,
                color: TEXT_DIM,
                lineHeight: 1.6,
                marginBottom: 18,
              }}
            >
              Découvrez les locations de vacances disponibles en contact direct
              avec les propriétaires dans les différentes destinations de{' '}
              {regionName}.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
              }}
            >
              {villes.map(ville => (
                <a
                  key={ville.slug}
                  className="destination-link"
                  href={`/location-vacances/${slug}/${ville.slug}`}
                  style={{
                    background: WHITE,
                    border: `1px solid ${BORDER}`,
                    borderRadius: 30,
                    padding: '9px 15px',
                    fontSize: 13,
                    color: TEXT,
                    fontWeight: 600,
                  }}
                >
                  📍 {ville.nom}

                  <span
                    style={{
                      color: TEXT_DIM,
                      fontWeight: 400,
                      marginLeft: 5,
                    }}
                  >
                    ({ville.count})
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        <div
          style={{
            marginBottom: 24,
          }}
        >
          <input
            value={searchVille}
            onChange={e => setSearchVille(e.target.value)}
            placeholder="🔍 Filtrer par ville..."
            aria-label="Filtrer les locations par ville"
            style={{
              width: '100%',
              maxWidth: 400,
              padding: '12px 16px',
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              fontSize: 14,
              outline: 'none',
            }}
          />

          <p
            style={{
              fontSize: 13,
              color: TEXT_DIM,
              marginTop: 8,
            }}
          >
            {filtered.length} logement
            {filtered.length > 1 ? 's' : ''} trouvé
            {filtered.length > 1 ? 's' : ''}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              background: GRAY,
              borderRadius: 16,
              padding: 48,
              textAlign: 'center',
              border: `1px solid ${BORDER}`,
            }}
          >
            <p style={{ fontSize: 40, marginBottom: 12 }}>
              🏠
            </p>

            <p
              style={{
                fontSize: 15,
                color: TEXT_DIM,
                marginBottom: 20,
              }}
            >
              Aucune annonce pour le moment en {regionName}.
            </p>

            <a
              href="/inscription"
              style={{
                background: ORANGE,
                color: WHITE,
                borderRadius: 12,
                padding: '12px 24px',
                fontSize: 14,
                fontWeight: 700,
                display: 'inline-block',
              }}
            >
              Publier un logement en {regionName} →
            </a>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map(logement => {
              const badge =
                statutBadge[logement.statut] || {
                  label: logement.statut,
                  bg: TEXT_DIM,
                }

              const hasChien =
                Array.isArray(logement.equipements) &&
                logement.equipements.includes('chien_10kg')

              return (
                <a
                  key={logement.id}
                  className="logement-card"
                  href={`/vitrine/${logement.id}`}
                  style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    border: `1px solid ${BORDER}`,
                    display: 'block',
                    background: WHITE,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                    }}
                  >
                    {logement.photos?.[0] ? (
                      <img
                        src={logement.photos[0]}
                        alt={`${logement.titre} - location vacances ${logement.ville}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 160,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: 160,
                          background: GRAY,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 36,
                        }}
                      >
                        🏠
                      </div>
                    )}

                    <div
                      style={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        display: 'flex',
                        gap: 4,
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          background: badge.bg,
                          color: WHITE,
                          borderRadius: 20,
                          padding: '3px 10px',
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {badge.label}
                      </span>

                      {hasChien && (
                        <span
                          style={{
                            background: '#78350F',
                            color: '#FCD34D',
                            borderRadius: 20,
                            padding: '3px 10px',
                            fontSize: 11,
                            fontWeight: 700,
                          }}
                        >
                          🐕 +10 kg
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: 14,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 12,
                        color: TEXT_DIM,
                        marginBottom: 4,
                      }}
                    >
                      {logement.type_logement}
                      {logement.surface
                        ? ` · ${logement.surface}m²`
                        : ''}
                      {' · '}
                      {logement.ville}
                    </p>

                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: TEXT,
                        marginBottom: 8,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {logement.titre}
                    </p>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: ORANGE,
                        }}
                      >
                        {logement.prix_nuit}€
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 400,
                            color: TEXT_DIM,
                          }}
                        >
                          /nuit
                        </span>
                      </p>

                      {logement.nb_chambres != null && (
                        <p
                          style={{
                            fontSize: 12,
                            color: TEXT_DIM,
                          }}
                        >
                          {logement.nb_chambres} ch.
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        <section
          style={{
            marginTop: 48,
            padding: '28px 24px',
            background: ORANGE_LIGHT,
            borderRadius: 16,
          }}
        >
          <h2
            style={{
              fontSize: 21,
              fontWeight: 800,
              color: TEXT,
              marginBottom: 12,
            }}
          >
            Location de vacances en {regionName} sans commission
          </h2>

          <p
            style={{
              fontSize: 14,
              color: TEXT_DIM,
              lineHeight: 1.8,
            }}
          >
            LocaDirect permet de découvrir des locations de vacances en{' '}
            {regionName} et de contacter directement les propriétaires.
            Consultez les logements disponibles par destination et organisez
            votre séjour sans commission de réservation ajoutée par la plateforme.
          </p>
        </section>
      </div>
    </div>
  )
}
