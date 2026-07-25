'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { REGIONS_FRANCE, REGIONS_BELGIQUE, REGIONS_SUISSE, REGIONS_ESPAGNE } from '@/lib/regions'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'
const GREEN_LIGHT = '#F0FDF4'
const RED = '#EF4444'
const RED_LIGHT = '#FEF2F2'
const WHATSAPP = '#25D366'
const FACEBOOK = '#1877F2'

const REGIONS_PAR_PAYS: Record<string, string[]> = {
  'France': REGIONS_FRANCE,
  'Belgique': REGIONS_BELGIQUE,
  'Suisse': REGIONS_SUISSE,
  'Espagne': REGIONS_ESPAGNE,
}

type User = {
  id: string
  email: string
  est_voyageur: boolean
  est_hebergeur: boolean
  est_prestataire: boolean
  created_at: string
  ref_code: string
}

type Vitrine = {
  id: string
  titre: string
  ville: string
  pays?: string
  region?: string
  statut: string
  prix_nuit: number
  nb_vues: number
  created_at: string
  motif_refus?: string
  photos?: string[]
  type_logement?: string
}

type Prestataire = {
  id: string
  nom: string
  prenom: string
  ville: string
  region: string | null
  activite: string
  statut: string
  nb_vues: number
  motif_refus?: string
  flyer_url: string | null
}

type Favori = {
  id: string
  vitrine_id: string
  vitrines: Vitrine
}

type FavoriPrestataire = {
  id: string
  prestataire_id: string
  prestataires: {
    id: string
    nom: string
    prenom: string
    ville: string
    activite: string
    flyer_url: string | null
  }
}

type Alerte = {
  id: string
  ville: string
  active: boolean
}

const statutConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  en_attente: { label: 'En attente', color: '#92400E', bg: '#FEF3C7', dot: '#F59E0B' },
  active: { label: 'Disponible', color: '#166534', bg: '#DCFCE7', dot: '#16A34A' },
  deja_loue: { label: 'Déjà loué', color: '#991B1B', bg: '#FEE2E2', dot: '#EF4444' },
  bientot_dispo: { label: 'Bientôt dispo', color: '#92400E', bg: '#FEF3C7', dot: '#F59E0B' },
  suspendue: { label: 'Suspendue', color: '#374151', bg: '#F3F4F6', dot: '#9CA3AF' },
  refuse: { label: 'Refusé', color: '#991B1B', bg: '#FEE2E2', dot: '#EF4444' },
}

export default function EspaceClient({
  user, vitrines, prestataires, favoris, favorisPrestataires = [], alertes, toutesVitrines,
}: {
  user: User
  vitrines: Vitrine[]
  prestataires: Prestataire[]
  favoris: Favori[]
  favorisPrestataires?: FavoriPrestataire[]
  alertes: Alerte[]
  toutesVitrines: Vitrine[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'mes-annonces')
  const [searchVille, setSearchVille] = useState('')
  const [searchPays, setSearchPays] = useState('Tous les pays')
  const [searchRegion, setSearchRegion] = useState('Toutes les régions')
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

  const handleRemoveFavoriPrestataire = async (prestataireId: string) => {
    await fetch('/api/toggle-favori-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prestataireId }),
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

  const handlePaysChange = (p: string) => {
    setSearchPays(p)
    setSearchRegion('Toutes les régions')
  }

  const regionsDisponibles = searchPays === 'Tous les pays'
    ? ['Toutes les régions']
    : ['Toutes les régions', ...(REGIONS_PAR_PAYS[searchPays] || [])]

  const refLink = `https://loca-direct.fr?ref=${user.ref_code}`

  const filteredVitrines = toutesVitrines.filter((v) => {
    const matchPays = searchPays === 'Tous les pays' || !v.pays || v.pays === searchPays
    const matchRegion = searchRegion === 'Toutes les régions' || v.region === searchRegion
    const matchVille = !searchVille || v.ville.toLowerCase().includes(searchVille.toLowerCase())
    return matchPays && matchRegion && matchVille
  })

  const navItems = [
    { id: 'accueil-home', icon: '🏠', label: 'Accueil', href: '/' },
    { id: 'rechercher', icon: '🔍', label: 'Rechercher' },
    { id: 'publier', icon: '➕', label: 'Publier', primary: true },
    { id: 'mes-annonces', icon: '📋', label: 'Mes annonces' },
    { id: 'favoris', icon: '❤️', label: 'Favoris' },
    { id: 'profil', icon: '👤', label: 'Profil' },
  ]

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
      `}</style>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <button onClick={handleLogout} style={{ background: 'transparent', color: TEXT_DIM, fontSize: 13, padding: '8px 12px' }}>
          Déconnexion
        </button>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px 120px' }}>

        {/* ===== ONGLET MES ANNONCES ===== */}
        {activeTab === 'mes-annonces' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Mes annonces</h1>
              <button onClick={() => setActiveTab('publier')} style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '9px 16px', fontSize: 13, fontWeight: 700 }}>
                ➕ Publier
              </button>
            </div>

            {/* MES LOGEMENTS */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 16 }}>🏠 Mes logements ({vitrines.length})</h2>
              {vitrines.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>
                  <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 14 }}>Vous n'avez pas encore publié de logement.</p>
                  <Link href="/espace/ma-vitrine" style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700 }}>
                    + Publier un logement
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {vitrines.map((v) => {
                    const vitrineLink = `https://loca-direct.fr/vitrine/${v.id}`
                    const shareText = `Découvrez mon logement "${v.titre}" sur LocaDirect !`
                    const canManage = v.statut === 'active' || v.statut === 'deja_loue'
                    const canShare = v.statut === 'active' || v.statut === 'deja_loue' || v.statut === 'bientot_dispo'
                    const statut = statutConfig[v.statut] || { label: v.statut, color: TEXT_DIM, bg: GRAY, dot: TEXT_DIM }
                    return (
                      <div key={v.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
                        <Link href={`/vitrine/${v.id}`} style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'flex-start' }}>
                          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: GRAY }}>
                            {v.photos?.[0] ? (
                              <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏠</div>
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.titre}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 6 }}>{v.ville} · {v.prix_nuit}€/nuit · 👁 {v.nb_vues} vues</p>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: statut.bg, borderRadius: 20, padding: '3px 10px' }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statut.dot, display: 'inline-block' }} />
                              <span style={{ fontSize: 11, fontWeight: 600, color: statut.color }}>{statut.label}</span>
                            </span>
                          </div>
                        </Link>
                        {v.motif_refus && (
                          <div style={{ margin: '0 14px 10px', background: RED_LIGHT, borderRadius: 8, padding: '8px 12px' }}>
                            <p style={{ fontSize: 12, color: '#DC2626' }}>⚠️ {v.motif_refus}</p>
                          </div>
                        )}
                        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                          {canManage && (
                            <button onClick={() => handleToggleStatut(v.id, v.statut)} disabled={changingStatutId === v.id} style={{ width: '100%', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: v.statut === 'active' ? RED_LIGHT : GREEN_LIGHT, color: v.statut === 'active' ? '#DC2626' : GREEN, border: `1px solid ${v.statut === 'active' ? '#FECACA' : '#BBF7D0'}`, opacity: changingStatutId === v.id ? 0.6 : 1 }}>
                              {changingStatutId === v.id ? 'Mise à jour...' : v.statut === 'active' ? '🔴 Marquer comme déjà loué' : '✅ Remettre disponible'}
                            </button>
                          )}
                          <Link href={`/espace/ma-vitrine/${v.id}/modifier`} style={{ display: 'block', textAlign: 'center', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: WHITE, color: TEXT, border: `1px solid ${BORDER}` }}>
                            ✏️ Modifier mon annonce
                          </Link>
                          <button
  onClick={async () => {
    if (!confirm('Supprimer cette annonce définitivement ?')) return
    await fetch('/api/supprimer-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id }),
    })
    router.refresh()
  }}
  style={{ display: 'block', width: '100%', textAlign: 'center', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', cursor: 'pointer' }}
>
                            🗑️ Supprimer l'annonce
                          </button>
                          {canShare && (
                            <div style={{ display: 'flex', gap: 8 }}>
                              <a href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + vitrineLink)}`} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: WHATSAPP, color: WHITE, borderRadius: 10, padding: '10px 8px', fontSize: 12, fontWeight: 700 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                                WA
                              </a>
                              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(vitrineLink)}`} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: FACEBOOK, color: WHITE, borderRadius: 10, padding: '10px 8px', fontSize: 12, fontWeight: 700 }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                FB
                              </a>
                              <button onClick={() => handleCopyVitrine(vitrineLink, v.id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: copiedVitrineId === v.id ? GREEN : WHITE, color: copiedVitrineId === v.id ? WHITE : TEXT, borderRadius: 10, padding: '10px 8px', fontSize: 12, fontWeight: 600, border: `1px solid ${copiedVitrineId === v.id ? GREEN : BORDER}` }}>
                                {copiedVitrineId === v.id ? '✓' : '🔗'}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* MES PRESTATIONS */}
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 16 }}>🛠️ Mes prestations ({prestataires.length})</h2>
              {prestataires.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{ fontSize: 32, marginBottom: 12 }}>🛠️</p>
                  <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 14 }}>Vous n'avez pas encore créé de profil prestataire.</p>
                  <Link href="/espace/devenir-prestataire" style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700 }}>
                    + Créer mon profil prestataire
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {prestataires.map((p) => {
                    const statut = statutConfig[p.statut] || { label: p.statut, color: TEXT_DIM, bg: GRAY, dot: TEXT_DIM }
                    const canShare = p.statut === 'active'
                    return (
                      <div key={p.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden' }}>
                        <Link href={canShare ? `/prestataires/${p.id}` : '#'} style={{ display: 'flex', gap: 12, padding: 14, alignItems: 'flex-start' }}>
                          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: GRAY }}>
                            {p.flyer_url ? <img src={p.flyer_url} alt={`${p.prenom} ${p.nom}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🛠️</div>}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{p.prenom} {p.nom}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 6 }}>{p.activite} · {p.ville} · 👁 {p.nb_vues} vues</p>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: statut.bg, borderRadius: 20, padding: '3px 10px' }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statut.dot, display: 'inline-block' }} />
                              <span style={{ fontSize: 11, fontWeight: 600, color: statut.color }}>{statut.label}</span>
                            </span>
                          </div>
                        </Link>
                        {p.motif_refus && <div style={{ margin: '0 14px 10px', background: RED_LIGHT, borderRadius: 8, padding: '8px 12px' }}><p style={{ fontSize: 12, color: '#DC2626' }}>⚠️ {p.motif_refus}</p></div>}
                        <div style={{ padding: '0 14px 14px' }}>
                          <Link href={`/espace/devenir-prestataire/${p.id}/modifier`} style={{ display: 'block', textAlign: 'center', padding: '10px 12px', borderRadius: 10, fontSize: 13, fontWeight: 600, background: WHITE, color: TEXT, border: `1px solid ${BORDER}` }}>
                            ✏️ Modifier mon profil
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET RECHERCHER ===== */}
        {activeTab === 'rechercher' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Rechercher un logement</h1>
            <select value={searchPays} onChange={e => handlePaysChange(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', background: WHITE, fontWeight: 600 }}>
              <option value="Tous les pays">🌍 Tous les pays</option>
              <option value="France">🇫🇷 France</option>
              <option value="Belgique">🇧🇪 Belgique</option>
              <option value="Suisse">🇨🇭 Suisse</option>
              <option value="Espagne">🇪🇸 Espagne</option>
            </select>
            <select value={searchRegion} onChange={e => setSearchRegion(e.target.value)} style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', background: WHITE }}>
              {regionsDisponibles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <input value={searchVille} onChange={(e) => setSearchVille(e.target.value)} placeholder="🔍 Affiner par ville..." style={{ width: '100%', padding: '14px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 15, outline: 'none', background: WHITE }} />
            {filteredVitrines.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 32, textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>🏠</p>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucune annonce trouvée</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {filteredVitrines.map((v) => (
                  <Link key={v.id} href={`/vitrine/${v.id}`} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', display: 'block' }}>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', background: GRAY }}>
                      {v.photos?.[0] ? <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🏠</div>}
                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        {v.statut === 'active' && <span style={{ background: GREEN, color: WHITE, borderRadius: 20, padding: '3px 9px', fontSize: 10, fontWeight: 700 }}>✅ Dispo</span>}
                        {v.statut === 'deja_loue' && <span style={{ background: '#EF4444', color: WHITE, borderRadius: 20, padding: '3px 9px', fontSize: 10, fontWeight: 700 }}>🔴 Loué</span>}
                        {v.statut === 'bientot_dispo' && <span style={{ background: '#F59E0B', color: WHITE, borderRadius: 20, padding: '3px 9px', fontSize: 10, fontWeight: 700 }}>🟡 Bientôt</span>}
                      </div>
                    </div>
                    <div style={{ padding: 12 }}>
                      <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 2 }}>{v.ville}{v.pays && v.pays !== 'France' ? ` · ${v.pays}` : ''}</p>
                      <p style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.titre}</p>
                      <p style={{ fontSize: 15, fontWeight: 800, color: ORANGE }}>{v.prix_nuit}€<span style={{ fontSize: 11, fontWeight: 400, color: TEXT_DIM }}>/nuit</span></p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== ONGLET PUBLIER ===== */}
        {activeTab === 'publier' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Que souhaitez-vous publier ?</h1>
            <Link href="/espace/ma-vitrine" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: ORANGE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>🏠</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Un logement</h2>
                <p style={{ fontSize: 13, color: TEXT_DIM }}>Publiez votre logement et louez sans commission.</p>
              </div>
              <span style={{ fontSize: 18, color: TEXT_DIM }}>→</span>
            </Link>
            <Link href="/espace/devenir-prestataire" style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: ORANGE_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>🛠️</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Un service</h2>
                <p style={{ fontSize: 13, color: TEXT_DIM }}>Conciergerie, ménage, photographe... rejoignez l'annuaire.</p>
              </div>
              <span style={{ fontSize: 18, color: TEXT_DIM }}>→</span>
            </Link>
          </div>
        )}

        {/* ===== ONGLET FAVORIS ===== */}
        {activeTab === 'favoris' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Mes favoris</h1>
            {favoris.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 32, textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>❤️</p>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>Vous n'avez pas encore de favoris</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {favoris.map((f) => (
                  <div key={f.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href={`/vitrine/${f.vitrines.id}`} style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{f.vitrines.titre}</p>
                      <p style={{ fontSize: 12, color: TEXT_DIM }}>{f.vitrines.ville} · {f.vitrines.prix_nuit}€/nuit</p>
                    </Link>
                    <button onClick={() => handleRemoveFavori(f.vitrine_id)} style={{ background: 'transparent', fontSize: 18, padding: 8 }}>❤️</button>
                  </div>
                ))}
              </div>
            )}
            {/* FAVORIS PRESTATAIRES */}
            <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT }}>🛠️ Prestataires favoris</h2>
            {favorisPrestataires.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 13, color: TEXT_DIM }}>Aucun prestataire en favori</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {favorisPrestataires.map((f) => (
                  <div key={f.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 14, padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href={`/prestataires/${f.prestataires.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{f.prestataires.prenom} {f.prestataires.nom}</p>
                      <p style={{ fontSize: 12, color: TEXT_DIM }}>{f.prestataires.activite} · {f.prestataires.ville}</p>
                    </a>
                    <button onClick={() => handleRemoveFavoriPrestataire(f.prestataire_id)} style={{ background: 'transparent', fontSize: 18, padding: 8 }}>❤️</button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>🔔 Mes alertes par ville</h2>
              <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 14 }}>Recevez un email à chaque nouvelle annonce dans ces villes</p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <input value={newAlerteVille} onChange={(e) => setNewAlerteVille(e.target.value)} placeholder="Ajouter une ville..." style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none' }} />
                <button onClick={handleAddAlerte} disabled={addingAlerte} style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, opacity: addingAlerte ? 0.6 : 1 }}>{addingAlerte ? '...' : '+ Ajouter'}</button>
              </div>
              {alertes.length === 0 ? (
                <p style={{ fontSize: 13, color: TEXT_DIM }}>Aucune alerte configurée</p>
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {alertes.map((a) => (
                    <div key={a.id} style={{ background: ORANGE_LIGHT, borderRadius: 20, padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 13, color: ORANGE, fontWeight: 600 }}>📍 {a.ville}</span>
                      <button onClick={() => handleRemoveAlerte(a.id)} style={{ background: 'transparent', color: ORANGE, fontSize: 14, padding: 0 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== ONGLET PROFIL ===== */}
        {activeTab === 'profil' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT }}>Mon profil</h1>
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>Informations</p>
              <Row label="Email" value={user.email} />
              <Row label="Profil" value={[user.est_voyageur && 'Voyageur', user.est_hebergeur && 'Hébergeur', user.est_prestataire && 'Prestataire'].filter(Boolean).join(' + ')} />
              <Row label="Membre depuis" value={new Date(user.created_at).toLocaleDateString('fr-FR')} />
            </div>
            <div style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 20 }}>
              <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>🤝 Mon lien de parrainage</p>
              <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 12 }}>Partagez ce lien, chaque inscription via votre lien compte !</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', background: GRAY, borderRadius: 10, padding: '10px 14px' }}>
                <span style={{ fontSize: 12, color: TEXT, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{refLink}</span>
                <button onClick={async () => { await navigator.clipboard.writeText(refLink); setCopiedRef(true); setTimeout(() => setCopiedRef(false), 2000) }} style={{ background: copiedRef ? GREEN : ORANGE, color: WHITE, borderRadius: 8, padding: '6px 12px', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{copiedRef ? '✓ Copié' : 'Copier'}</button>
              </div>
            </div>
            <button onClick={handleLogout} style={{ background: RED_LIGHT, border: '1px solid #FECACA', borderRadius: 12, padding: 14, fontSize: 14, color: '#DC2626', fontWeight: 600 }}>
              Se déconnecter
            </button>
          </div>
        )}
      </div>

      {/* ===== NAV BAS 6 ONGLETS ===== */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: WHITE, borderTop: `1px solid ${BORDER}`, display: 'flex', zIndex: 20, paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}>
        {navItems.map((item: any) => {
          if (item.href) {
            return (
              <a key={item.id} href={item.href} style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
                <span style={{ fontSize: 20, opacity: 0.5 }}>{item.icon}</span>
                <span style={{ fontSize: 9, color: TEXT_DIM, fontWeight: 400 }}>{item.label}</span>
              </a>
            )
          }
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{ flex: 1, padding: '10px 2px 8px', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              {item.primary ? (
                <div style={{ width: 40, height: 40, background: ORANGE, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginTop: -14, boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>{item.icon}</div>
              ) : (
                <span style={{ fontSize: 20, opacity: activeTab === item.id ? 1 : 0.4 }}>{item.icon}</span>
              )}
              <span style={{ fontSize: 9, color: activeTab === item.id ? ORANGE : TEXT_DIM, fontWeight: activeTab === item.id ? 700 : 400 }}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ fontSize: 13, color: TEXT_DIM }}>{label}</span>
      <span style={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>{value}</span>
    </div>
  )
}
