'use client'

import { useState } from 'react'
import Link from 'next/link'
import { REGIONS_FRANCE } from '@/lib/regions'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

const ACTIVITES = [
  'Toutes',
  'Conciergerie',
  'Ménage / Entretien',
  'Photographe',
  'Aide au digital / Communication',
  'Maintenance / Bricolage',
  'Jardinage / Extérieur',
  'Décoration / Aménagement',
  "Kits & paniers d'accueil",
  'Autre',
]

const REGIONS = ['Toutes les régions', ...REGIONS_FRANCE]

type Prestataire = {
  id: string
  nom: string
  prenom: string
  ville: string
  region: string | null
  activite: string
  description: string
  tarif_horaire: number | null
  sur_devis: boolean
  flyer_url: string | null
}

export default function PrestatairesClient({ prestataires }: { prestataires: Prestataire[] }) {
  const [region, setRegion] = useState('Toutes les régions')
  const [searchVille, setSearchVille] = useState('')
  const [activite, setActivite] = useState('Toutes')

  const filtered = prestataires.filter(p => {
    const matchRegion = region === 'Toutes les régions' || p.region === region
    const matchVille = !searchVille || p.ville.toLowerCase().includes(searchVille.toLowerCase())
    const matchActivite = activite === 'Toutes' || p.activite === activite
    return matchRegion && matchVille && matchActivite
  })

  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .filters { display: flex; gap: 10px; flex-wrap: wrap; }
        @media (max-width: 768px) {
          .grid-3 { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .grid-3 { grid-template-columns: 1fr; }
          .filters { flex-direction: column; }
        }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
        <Link href="/espace/devenir-prestataire" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>
          Devenir prestataire
        </Link>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 80px' }}>
        <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Annuaire</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 8 }}>Prestataires partenaires</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 28 }}>Conciergerie, ménage, photographe, digital... trouvez les bons partenaires pour votre logement, gratuitement.</p>

        <div className="filters" style={{ marginBottom: 28 }}>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', background: WHITE, fontWeight: 600 }}
          >
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input
            value={searchVille}
            onChange={e => setSearchVille(e.target.value)}
            placeholder="🔍 Affiner par ville..."
            style={{ flex: 1, minWidth: 180, padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none' }}
          />
          <select
            value={activite}
            onChange={e => setActivite(e.target.value)}
            style={{ padding: '12px 16px', borderRadius: 12, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', background: WHITE }}
          >
            {ACTIVITES.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: GRAY, borderRadius: 16, padding: 48, textAlign: 'center', border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🛠️</p>
            <p style={{ fontSize: 15, color: TEXT_DIM, marginBottom: 20 }}>Aucun prestataire trouvé pour cette sélection.</p>
            <Link href="/espace/devenir-prestataire" style={{ background: ORANGE, color: WHITE, borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, display: 'inline-block' }}>
              Soyez le premier inscrit →
            </Link>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map(p => (
              <Link key={p.id} href={`/prestataires/${p.id}`} style={{ border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', display: 'block', background: WHITE }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: GRAY }}>
                  {p.flyer_url ? (
                    <img src={p.flyer_url} alt={`${p.prenom} ${p.nom}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🛠️</div>
                  )}
                </div>
                <div style={{ padding: 14 }}>
                  <p style={{ fontSize: 11, color: ORANGE, fontWeight: 700, marginBottom: 4 }}>{p.activite}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{p.prenom} {p.nom}</p>
                  <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 8 }}>📍 {p.ville}{p.region ? ` · ${p.region}` : ''}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: ORANGE }}>
                    {p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire}€/h` : ''}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
