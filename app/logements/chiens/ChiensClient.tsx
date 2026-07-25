'use client'

import { useState } from 'react'
import { REGIONS_FRANCE, REGIONS_BELGIQUE, REGIONS_SUISSE, REGIONS_ESPAGNE } from '@/lib/regions'

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'
const BROWN = '#78350F'
const GOLD = '#FCD34D'
const GOLD_LIGHT = '#FFFBEB'

const REGIONS_PAR_PAYS: Record<string, string[]> = {
  'France': REGIONS_FRANCE,
  'Belgique': REGIONS_BELGIQUE,
  'Suisse': REGIONS_SUISSE,
  'Espagne': REGIONS_ESPAGNE,
}

type Logement = {
  id: string
  titre: string
  ville: string
  pays?: string
  region?: string
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

const TYPES = ['Tous', 'Appartement', 'Maison', 'Villa', 'Chalet', 'Studio', 'Chambre', 'Autre']

export default function ChiensClient({ logements, isLoggedIn = false }: { logements: Logement[], isLoggedIn?: boolean }) {
  const [pays, setPays] = useState('Tous les pays')
  const [region, setRegion] = useState('Toutes les régions')
  const [searchVille, setSearchVille] = useState('')
  const [type, setType] = useState('Tous')

  const regionsDisponibles = pays === 'Tous les pays'
    ? ['Toutes les régions']
    : ['Toutes les régions', ...(REGIONS_PAR_PAYS[pays] || [])]

  const handlePaysChange = (p: string) => {
    setPays(p)
    setRegion('Toutes les régions')
  }

  const filtered = logements.filter(v => {
    const matchPays = pays === 'Tous les pays' || !v.pays || v.pays === pays
    const matchRegion = region === 'Toutes les régions' || v.region === region
    const matchVille = !searchVille || v.ville.toLowerCase().includes(searchVille.toLowerCase())
    const matchType = type === 'Tous' || v.type_logement === type
    return matchPays && matchRegion && matchVille && matchType
  })

  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .filters { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 900px) { .grid-4 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .grid-4 { grid-template-columns: 1fr; } .filters { flex-direction: column; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {isLoggedIn ? (
            <a href="/espace" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
              Mon espace →
            </a>
          ) : (
            <>
              <a href="/connexion" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>Connexion</a>
              <a href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>🏠 Publier</a>
            </>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 80px' }}>

        {/* HERO CHIENS */}
        <div style={{ background: `linear-gradient(135deg, ${BROWN} 0%, #92400E 100%)`, borderRadius: 20, padding: '40px 32px', margin: '32px 0', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <img
  src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=200&q=80"
  alt="Golden retriever"
  style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '4px solid #FCD34D' }}
/>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: GOLD, borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 800, color: BROWN, marginBottom: 12 }}>
              🐾 RUBRIQUE EXCLUSIVE
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: WHITE, marginBottom: 8, lineHeight: 1.3 }}>
              Location vacances<br />chiens +10 kg acceptés
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>
              Trouvez votre logement idéal — nos propriétaires accueillent vos grands chiens avec plaisir. Contact direct WhatsApp, sans commission.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 13, fontWeight: 700 }}>
                ✓ {logements.length} logement{logements.length > 1 ? 's' : ''} disponible{logements.length > 1 ? 's' : ''}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                ✓ Contact direct WhatsApp
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
                ✓ Sans commission
              </div>
            </div>
          </div>
        </div>

        {/* FILTRES */}
        <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 16 }}>{filtered.length} logement{filtered.length > 1 ? 's' : ''} trouvé{filtered.length > 1 ? 's' : ''}</p>
        <div className="filters" style={{ marginBottom: 28 }}>
          <select value={pays} onChange={e => handlePaysChange(e.target.value)} style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', background: WHITE, fontWeight: 600 }}>
            <option value="Tous les pays">🌍 Tous les pays</option>
            <option value="France">🇫🇷 France</option>
            <option value="Belgique">🇧🇪 Belgique</option>
            <option value="Suisse">🇨🇭 Suisse</option>
            <option value="Espagne">🇪🇸 Espagne</option>
          </select>
          <select value={region} onChange={e => setRegion(e.target.value)} style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', background: WHITE }}>
            {regionsDisponibles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input value={searchVille} onChange={e => setSearchVille(e.target.value)} placeholder="🔍 Ville..." style={{ flex: 1, minWidth: 160, padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none' }} />
          <select value={type} onChange={e => setType(e.target.value)} style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', background: WHITE }}>
            {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* ANNONCES */}
        {filtered.length === 0 ? (
          <div style={{ background: GOLD_LIGHT, borderRadius: 16, padding: 48, textAlign: 'center', border: `1.5px dashed ${GOLD}` }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🐾</p>
            <p style={{ fontSize: 15, color: BROWN, fontWeight: 600, marginBottom: 8 }}>Aucun logement trouvé pour cette sélection.</p>
            <p style={{ fontSize: 13, color: '#B45309', marginBottom: 20 }}>Essayez d'élargir votre recherche ou revenez bientôt !</p>
            <a href="/inscription" style={{ background: BROWN, color: WHITE, borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
              Vous acceptez les grands chiens ? Publiez →
            </a>
          </div>
        ) : (
          <div className="grid-4">
            {filtered.map(v => {
              const badge = statutBadge[v.statut] || { label: v.statut, bg: TEXT_DIM }
              return (
                <a key={v.id} href={`/vitrine/${v.id}`} style={{ borderRadius: 16, overflow: 'hidden', border: `2px solid ${GOLD}`, display: 'block', background: WHITE, textDecoration: 'none' }}>
                  <div style={{ position: 'relative' }}>
                    {v.photos?.[0] ? (
                      <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', height: 160, background: GOLD_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🐕</div>
                    )}
                    <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <span style={{ background: badge.bg, color: WHITE, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{badge.label}</span>
                      <span style={{ background: BROWN, color: GOLD, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🐕 +10 kg</span>
                    </div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 4 }}>{v.type_logement}{v.surface ? ` · ${v.surface}m²` : ''}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.ville}{v.pays && v.pays !== 'France' ? ` · ${v.pays}` : ''}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ fontSize: 16, fontWeight: 800, color: ORANGE }}>{v.prix_nuit}€<span style={{ fontSize: 11, fontWeight: 400, color: TEXT_DIM }}>/nuit</span></p>
                      {v.nb_chambres != null && <p style={{ fontSize: 12, color: TEXT_DIM }}>{v.nb_chambres} ch.</p>}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* CTA propriétaire */}
        <div style={{ marginTop: 48, background: GOLD_LIGHT, borderRadius: 16, padding: '28px 24px', textAlign: 'center', border: `1px solid ${GOLD}` }}>
          <p style={{ fontSize: 20, marginBottom: 8 }}>🏠</p>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: BROWN, marginBottom: 8 }}>Vous acceptez les grands chiens ?</h2>
          <p style={{ fontSize: 13, color: '#B45309', marginBottom: 16 }}>Publiez votre annonce et rejoignez cette rubrique exclusive. Des milliers de voyageurs avec grands chiens vous cherchent !</p>
          <a href="/inscription" style={{ background: BROWN, color: WHITE, borderRadius: 12, padding: '13px 28px', fontSize: 14, fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
            Publier mon logement →
          </a>
        </div>
      </div>
    </div>
  )
}
