'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'
const RED = '#DC2626'

type Vitrine = {
  id: string
  titre: string
  ville: string
  prix_nuit: number
  statut: string
  photos: string[]
  description_courte: string
  whatsapp: string
  created_at: string
  directloca_users: { email: string }
}

export default function AdminVitrinesClient({ vitrines }: { vitrines: Vitrine[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState('en_attente')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [refusMotif, setRefusMotif] = useState<Record<string, string>>({})

  const filtered = vitrines.filter(v => filter === 'tous' || v.statut === filter)

  const counts = {
    en_attente: vitrines.filter(v => v.statut === 'en_attente').length,
    active: vitrines.filter(v => v.statut === 'active').length,
    deja_loue: vitrines.filter(v => v.statut === 'deja_loue').length,
    bientot_dispo: vitrines.filter(v => v.statut === 'bientot_dispo').length,
    suspendue: vitrines.filter(v => v.statut === 'suspendue').length,
  }

  const handleValider = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'active' }),
    })
    router.refresh()
    setProcessingId(null)
  }

  const handleRefuser = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'suspendue', motif_refus: refusMotif[id] || 'Annonce refusée' }),
    })
    router.refresh()
    setProcessingId(null)
  }

  const handleChangeStatut = async (id: string, statut: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut }),
    })
    router.refresh()
    setProcessingId(null)
  }

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, sans-serif' }}>
      <style>{`* { box-sizing: border-box; } button { cursor: pointer; border: none; font-family: inherit; } textarea, input { font-family: inherit; }`}</style>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '16px 20px' }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>🔐 Admin — Modération vitrines</h1>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { id: 'en_attente', label: `⏳ En attente (${counts.en_attente})` },
            { id: 'active', label: `✅ Actives (${counts.active})` },
            { id: 'deja_loue', label: `🔴 Déjà louées (${counts.deja_loue})` },
            { id: 'bientot_dispo', label: `🟡 Bientôt dispo (${counts.bientot_dispo})` },
            { id: 'suspendue', label: `⏸️ Suspendues (${counts.suspendue})` },
            { id: 'tous', label: `Tous (${vitrines.length})` },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filter === f.id ? ORANGE : WHITE, color: filter === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filter === f.id ? ORANGE : BORDER}` }}>
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucune vitrine dans cette catégorie</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(v => (
              <div key={v.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                {v.photos?.[0] && (
                  <img src={v.photos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{v.titre}</p>
                  <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 4 }}>{v.ville} · {v.prix_nuit}€/nuit</p>
                  <p style={{ fontSize: 12, color: TEXT_DIM }}>Par : {v.directloca_users?.email}</p>
                  <p style={{ fontSize: 11, color: TEXT_DIM }}>Publié le {new Date(v.created_at).toLocaleDateString('fr-FR')}</p>
                  <p style={{ fontSize: 12, color: TEXT, marginTop: 6 }}>{v.description_courte}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                  {v.statut === 'en_attente' && (
                    <>
                      <button onClick={() => handleValider(v.id)} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>
                        ✅ Valider
                      </button>
                      <textarea
                        value={refusMotif[v.id] || ''}
                        onChange={e => setRefusMotif(m => ({ ...m, [v.id]: e.target.value }))}
                        placeholder="Motif de refus (optionnel)"
                        rows={2}
                        style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }}
                      />
                      <button onClick={() => handleRefuser(v.id)} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>
                        ❌ Refuser
                      </button>
                    </>
                  )}
                  {v.statut === 'active' && (
                    <>
                      <button onClick={() => handleChangeStatut(v.id, 'deja_loue')} disabled={processingId === v.id} style={{ background: GRAY, color: TEXT, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: `1px solid ${BORDER}` }}>
                        🔴 Marquer déjà loué
                      </button>
                      <button onClick={() => handleChangeStatut(v.id, 'bientot_dispo')} disabled={processingId === v.id} style={{ background: '#FFFBEB', color: '#D97706', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FDE68A' }}>
                        🟡 Marquer bientôt dispo
                      </button>
                      <button onClick={() => handleChangeStatut(v.id, 'suspendue')} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FECACA' }}>
                        ⏸️ Suspendre
                      </button>
                    </>
                  )}
                  {(v.statut === 'deja_loue' || v.statut === 'bientot_dispo' || v.statut === 'suspendue') && (
                    <button onClick={() => handleChangeStatut(v.id, 'active')} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>
                      ✅ Réactiver
                    </button>
                  )}
                  <a href={`https://loca-direct.fr/vitrine/${v.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>
                    Voir la page publique
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}