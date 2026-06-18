'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'

type User = {
  id: string
  email: string
  est_voyageur: boolean
  est_hebergeur: boolean
  created_at: string
  ref_code: string
}

type Vitrine = {
  id: string
  titre: string
  ville: string
  statut: string
  prix_nuit: number
  nb_vues: number
  created_at: string
  motif_refus?: string
  photos?: string[]
  type_logement?: string
}

type Favori = {
  id: string
  vitrine_id: string
  vitrines: Vitrine
}

type Alerte = {
  id: string
  ville: string
  active: boolean
}

const statutLabel: Record<string, { label: string; color: string }> = {
  en_attente: { label: '⏳ En attente de validation', color: '#F59E0B' },
  active: { label: '✅ Disponible', color: '#16A34A' },
  deja_loue: { label: '🔴 Déjà loué', color: '#EF4444' },
  bientot_dispo: { label: '🟡 Bientôt disponible', color: '#F59E0B' },
  suspendue: { label: '⏸️ Suspendue', color: '#6B7280' },
}

export default function EspaceClient({
  user,
  vitrines,
  favoris,
  alertes,
  toutesVitrines,
}: {
  user: User
  vitrines: Vitrine[]
  favoris: Favori[]
  alertes: Alerte[]
  toutesVitrines: Vitrine[]
}) {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('accueil')
  const [searchVille, setSearchVille] = useState('')
  const [newAlerteVille, setNewAlerteVille] = useState('')
  const [addingAlerte, setAddingAlerte] = useState(false)
  const [copiedRef, setCopiedRef] = useState(false)
  const [copiedVitrineId, setCopiedVitrineId] = useState<string | null>(null)
  const [changingStatutId, setChangingStatutId] = useState<string | null>(null)

  const handleLogout = async () => {
    await fetch('/api/deconnexion', { method: 'POST' })
    router.push('/')
  }

  const handleAddAlerte = async () => {
    if (!newAlerteVille.trim()) return

    setAddingAlerte(true)

    await fetch('/api/save-alerte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ville: newAlerteVille.trim() }),
    })

    setNewAlerteVille('')
    router.refresh()
    setAddingAlerte(false)
  }

  const handleRemoveAlerte = async (id: string) => {
    await fetch('/api/save-alerte', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })

    router.refresh()
  }

  const handleRemoveFavori = async (vitrineId: string) => {
    await fetch('/api/toggle-favori', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vitrineId }),
    })

    router.refresh()
  }

  const handleCopyVitrine = async (link: string, id: string) => {
    await navigator.clipboard.writeText(link)
    setCopiedVitrineId(id)
    setTimeout(() => setCopiedVitrineId(null), 2000)
  }

  const handleToggleStatut = async (id: string, currentStatut: string) => {
    const newStatut = currentStatut === 'active' ? 'deja_loue' : 'active'

    setChangingStatutId(id)

    await fetch('/api/mes-vitrines-statut', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: newStatut }),
    })

    router.refresh()
    setChangingStatutId(null)
  }

  const refLink = `https://loca-direct.fr?ref=${user.ref_code}`

  const filteredVitrines = toutesVitrines.filter((v) =>
    !searchVille || v.ville.toLowerCase().includes(searchVille.toLowerCase())
  )

  const navItems = [
    { id: 'accueil', icon: '🏠', label: 'Accueil' },
    { id: 'rechercher', icon: '🔍', label: 'Rechercher' },
    { id: 'publier', icon: '➕', label: 'Publier', primary: true },
    { id: 'favoris', icon: '❤️', label: 'Favoris' },
    { id: 'profil', icon: '👤', label: 'Profil' },
  ]

  return (
    <div
      style={{
        background: GRAY,
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input { font-family: inherit; }
      `}</style>

      <div
        style={{
          background: WHITE,
          borderBottom: `1px solid ${BORDER}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              background: ORANGE,
              borderRadius: 9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            🏠
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>
            Loca<span style={{ color: ORANGE }}>Direct</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          style={{
            background: 'transparent',
            color: TEXT_DIM,
            fontSize: 13,
            padding: '8px 12px',
          }}
        >
          Déconnexion
        </button>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px 100px' }}>
        {activeTab === 'accueil' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div
              style={{
                background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 100%)`,
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                padding: 28,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: ORANGE,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Bienvenue
              </p>

              <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 8 }}>
                Bonjour 👋
              </h1>

              <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 20, lineHeight: 1.6 }}>
                {user.email}
              </p>

              {user.est_hebergeur && (
                <button
                  onClick={() => setActiveTab('publier')}
                  style={{
                    background: ORANGE,
                    color: WHITE,
                    borderRadius: 12,
                    padding: '12px 22px',
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  + Publier mon logement
                </button>
              )}
            </div>

            {user.est_hebergeur && (
              <div
                style={{
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                }}
              >
                <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 14 }}>
                  Mes vitrines ({vitrines.length})
                </h2>

                {vitrines.length === 0 ? (
                  <p style={{ fontSize: 13, color: TEXT_DIM }}>
                    Vous n'avez pas encore publié de vitrine.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {vitrines.map((v) => {
                      const vitrineLink = `https://loca-direct.fr/vitrine/${v.id}`
                      const shareText = `Découvrez mon logement "${v.titre}" sur LocaDirect, sans commission !`
                      const canManage = v.statut === 'active' || v.statut === 'deja_loue'
                      const canShare =
                        v.statut === 'active' ||
                        v.statut === 'deja_loue' ||
                        v.statut === 'bientot_dispo'

                      return (
                        <div key={v.id} style={{ padding: 14, background: GRAY, borderRadius: 12 }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 8,
                              gap: 10,
                            }}
                          >
                            <div>
                              <p style={{ fontSize: 13, fontWeight: 600, color: TEXT }}>
                                {v.titre}
                              </p>
                              <p style={{ fontSize: 12, color: TEXT_DIM }}>
                                {v.ville} · {v.prix_nuit}€/nuit · 👁️ {v.nb_vues} vues
                              </p>
                            </div>

                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: statutLabel[v.statut]?.color || TEXT_DIM,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {statutLabel[v.statut]?.label || v.statut}
                            </span>
                          </div>

                          {v.motif_refus && (
                            <p
                              style={{
                                fontSize: 12,
                                color: '#DC2626',
                                background: '#FEF2F2',
                                borderRadius: 8,
                                padding: 8,
                                marginBottom: 8,
                              }}
                            >
                              Motif : {v.motif_refus}
                            </p>
                          )}

                          {canShare && (
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                background: WHITE,
                                border: `1px solid ${BORDER}`,
                                borderRadius: 8,
                                padding: '8px 10px',
                                marginBottom: 8,
                              }}
                            >
                              <span
                                style={{
                                  fontSize: 11,
                                  color: TEXT,
                                  flex: 1,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {vitrineLink}
                              </span>
                            </div>
                          )}

                          {canManage && (
                            <button
                              onClick={() => handleToggleStatut(v.id, v.statut)}
                              disabled={changingStatutId === v.id}
                              style={{
                                width: '100%',
                                marginBottom: 8,
                                padding: '9px 12px',
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 700,
                                background: v.statut === 'active' ? '#FEF2F2' : '#F0FDF4',
                                color: v.statut === 'active' ? '#DC2626' : GREEN,
                                border: `1px solid ${
                                  v.statut === 'active' ? '#FECACA' : '#BBF7D0'
                                }`,
                                opacity: changingStatutId === v.id ? 0.6 : 1,
                              }}
                            >
                              {changingStatutId === v.id
                                ? 'Mise à jour...'
                                : v.statut === 'active'
                                  ? '🔴 Marquer déjà loué'
                                  : '✅ Remettre disponible'}
                            </button>
                          )}

                          <Link
                            href={`/espace/ma-vitrine/${v.id}/modifier`}
                            style={{
                              display: 'block',
                              width: '100%',
                              textAlign: 'center',
                              marginBottom: canShare ? 8 : 0,
                              padding: '9px 12px',
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 600,
                              background: WHITE,
                              color: TEXT,
                              border: `1px solid ${BORDER}`,
                            }}
                          >
                            ✏️ Modifier mon annonce
                          </Link>

                          {canShare && (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <a
                                href={`https://wa.me/?text=${encodeURIComponent(
                                  shareText + ' ' + vitrineLink
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  flex: 1,
                                  textAlign: 'center',
                                  background: '#25D366',
                                  color: WHITE,
                                  borderRadius: 8,
                                  padding: '8px 4px',
                                  fontSize: 16,
                                }}
                              >
                                💬
                              </a>

                              <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                  vitrineLink
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  flex: 1,
                                  textAlign: 'center',
                                  background: '#1877F2',
                                  color: WHITE,
                                  borderRadius: 8,
                                  padding: '8px 4px',
                                  fontSize: 16,
                                }}
                              >
                                📘
                              </a>

                              <button
                                onClick={() => handleCopyVitrine(vitrineLink, v.id)}
                                style={{
                                  flex: 1,
                                  textAlign: 'center',
                                  background: copiedVitrineId === v.id ? GREEN : WHITE,
                                  color: copiedVitrineId === v.id ? WHITE : TEXT,
                                  borderRadius: 8,
                                  padding: '8px 4px',
                                  fontSize: 12,
                                  fontWeight: 600,
                                  border: `1px solid ${BORDER}`,
                                }}
                              >
                                {copiedVitrineId === v.id ? '✓' : '🔗 Copier'}
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            {user.est_voyageur && (
              <button
                onClick={() => setActiveTab('rechercher')}
                style={{
                  background: WHITE,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                  display: 'block',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
                  🔍 Rechercher un logement
                </h2>
              </button>
            )}
          </div>
        )}

        {activeTab === 'rechercher' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>
              Rechercher un logement
            </h1>

            <input
              value={searchVille}
              onChange={(e) => setSearchVille(e.target.value)}
              placeholder="🔍 Rechercher par ville..."
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: 12,
                border: `1px solid ${BORDER}`,
                fontSize: 15,
                outline: 'none',
                background: WHITE,
              }}
            />

            {filteredVitrines.length === 0 ? (
              <div
                style={{
                  background: WHITE,
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'center',
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucune annonce trouvée</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {filteredVitrines.map((v) => (
                  <Link
                    key={v.id}
                    href={`/vitrine/${v.id}`}
                    style={{
                      background: WHITE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 16,
                      overflow: 'hidden',
                      display: 'block',
                    }}
                  >
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4/3',
                        background: GRAY,
                      }}
                    >
                      {v.photos?.[0] ? (
                        <img
                          src={v.photos[0]}
                          alt={v.titre}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 32,
                          }}
                        >
                          🏠
                        </div>
                      )}

                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        {v.statut === 'active' && (
                          <span
                            style={{
                              background: GREEN,
                              color: WHITE,
                              borderRadius: 20,
                              padding: '3px 9px',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            ✅ Disponible
                          </span>
                        )}

                        {v.statut === 'deja_loue' && (
                          <span
                            style={{
                              background: '#EF4444',
                              color: WHITE,
                              borderRadius: 20,
                              padding: '3px 9px',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            🔴 Loué
                          </span>
                        )}

                        {v.statut === 'bientot_dispo' && (
                          <span
                            style={{
                              background: '#F59E0B',
                              color: WHITE,
                              borderRadius: 20,
                              padding: '3px 9px',
                              fontSize: 10,
                              fontWeight: 700,
                            }}
                          >
                            🟡 Bientôt
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ padding: 12 }}>
                      <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 2 }}>
                        {v.type_logement} · {v.ville}
                      </p>

                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: TEXT,
                          marginBottom: 6,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {v.titre}
                      </p>

                      <p style={{ fontSize: 15, fontWeight: 800, color: ORANGE }}>
                        {v.prix_nuit}€
                        <span style={{ fontSize: 11, fontWeight: 400, color: TEXT_DIM }}>
                          /nuit
                        </span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'publier' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>
              Publier mon logement
            </h1>

            <div
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 24,
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>

              <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 20 }}>
                Publiez gratuitement votre logement et louez sans commission.
              </p>

              <Link
                href="/espace/ma-vitrine"
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
                Créer ma vitrine
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'favoris' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Mes favoris</h1>

            {favoris.length === 0 ? (
              <div
                style={{
                  background: WHITE,
                  borderRadius: 16,
                  padding: 32,
                  textAlign: 'center',
                  border: `1px solid ${BORDER}`,
                }}
              >
                <p style={{ fontSize: 32, marginBottom: 12 }}>❤️</p>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>
                  Vous n'avez pas encore de favoris
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {favoris.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      background: WHITE,
                      border: `1px solid ${BORDER}`,
                      borderRadius: 14,
                      padding: 16,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link href={`/vitrine/${f.vitrines.id}`} style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>
                        {f.vitrines.titre}
                      </p>
                      <p style={{ fontSize: 12, color: TEXT_DIM }}>
                        {f.vitrines.ville} · {f.vitrines.prix_nuit}€/nuit
                      </p>
                    </Link>

                    <button
                      onClick={() => handleRemoveFavori(f.vitrine_id)}
                      style={{ background: 'transparent', fontSize: 18, padding: 8 }}
                    >
                      ❤️
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>
                🔔 Mes alertes par ville
              </h2>

              <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 14 }}>
                Recevez un email à chaque nouvelle annonce dans ces villes
              </p>

              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <input
                  value={newAlerteVille}
                  onChange={(e) => setNewAlerteVille(e.target.value)}
                  placeholder="Ajouter une ville..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: `1px solid ${BORDER}`,
                    fontSize: 14,
                    outline: 'none',
                  }}
                />

                <button
                  onClick={handleAddAlerte}
                  disabled={addingAlerte}
                  style={{
                    background: ORANGE,
                    color: WHITE,
                    borderRadius: 10,
                    padding: '10px 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    opacity: addingAlerte ? 0.6 : 1,
                  }}
                >
                  {addingAlerte ? '...' : '+ Ajouter'}
                </button>
              </div>

              {alertes.length === 0 ? (
                <p style={{ fontSize: 13, color: TEXT_DIM }}>Aucune alerte configurée</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {alertes.map((a) => (
                    <div
                      key={a.id}
                      style={{
                        background: ORANGE_LIGHT,
                        borderRadius: 20,
                        padding: '6px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600 }}>
                        📍 {a.ville}
                      </span>

                      <button
                        onClick={() => handleRemoveAlerte(a.id)}
                        style={{ background: 'transparent', color: ORANGE, fontSize: 14, padding: 0 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'profil' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Mon profil</h1>

            <div
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: ORANGE,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 14,
                }}
              >
                Informations
              </p>

              <Row label="Email" value={user.email} />
              <Row
                label="Profil"
                value={[user.est_voyageur && 'Voyageur', user.est_hebergeur && 'Hébergeur']
                  .filter(Boolean)
                  .join(' + ')}
              />
              <Row
                label="Membre depuis"
                value={new Date(user.created_at).toLocaleDateString('fr-FR')}
              />
            </div>

            <div
              style={{
                background: WHITE,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: ORANGE,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                🤝 Mon lien de parrainage
              </p>

              <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12 }}>
                Partagez ce lien, chaque inscription via votre lien compte !
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  background: GRAY,
                  borderRadius: 10,
                  padding: '10px 14px',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: TEXT,
                    flex: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {refLink}
                </span>

                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(refLink)
                    setCopiedRef(true)
                    setTimeout(() => setCopiedRef(false), 2000)
                  }}
                  style={{
                    background: copiedRef ? GREEN : ORANGE,
                    color: WHITE,
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {copiedRef ? '✓ Copié' : 'Copier'}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                borderRadius: 12,
                padding: 14,
                fontSize: 14,
                color: '#DC2626',
                fontWeight: 600,
              }}
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: WHITE,
          borderTop: `1px solid ${BORDER}`,
          display: 'flex',
          zIndex: 20,
          paddingBottom: 'env(safe-area-inset-bottom)',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              flex: 1,
              padding: '10px 4px 8px',
              background: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {item.primary ? (
              <div
                style={{
                  width: 44,
                  height: 44,
                  background: ORANGE,
                  borderRadius: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  marginTop: -16,
                  boxShadow: '0 4px 12px rgba(234,88,12,0.4)',
                }}
              >
                {item.icon}
              </div>
            ) : (
              <span style={{ fontSize: 22, opacity: activeTab === item.id ? 1 : 0.4 }}>
                {item.icon}
              </span>
            )}

            <span
              style={{
                fontSize: 10,
                color: activeTab === item.id ? ORANGE : TEXT_DIM,
                fontWeight: activeTab === item.id ? 700 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 0',
        borderBottom: `1px solid ${BORDER}`,
      }}
    >
      <span style={{ fontSize: 13, color: TEXT_DIM }}>{label}</span>
      <span style={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>{value}</span>
    </div>
  )
}