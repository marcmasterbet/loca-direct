'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoLightbox from '@/components/PhotoLightbox'

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'
const RED = '#DC2626'

type Prestataire = {
  id: string
  nom: string
  prenom: string
  siret: string
  adresse_siege: string
  ville: string
  code_postal: string
  region: string | null
  activite: string
  description: string
  telephone: string
  whatsapp: string
  tarif_horaire: number | null
  sur_devis: boolean
  flyer_url: string | null
  photos: string[]
  statut: string
  created_at: string
  directloca_users: { email: string }
}

export default function AdminPrestatairesClient({ prestataires }: { prestataires: Prestataire[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState('en_attente')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [refusMotif, setRefusMotif] = useState<Record<string, string>>({})
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)

  const filtered = prestataires.filter(p => filter === 'tous' || p.statut === filter)

  const counts = {
    en_attente: prestataires.filter(p => p.statut === 'en_attente').length,
    active: prestataires.filter(p => p.statut === 'active').length,
    refuse: prestataires.filter(p => p.statut === 'refuse').length,
  }

  const handleValider = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'active' }),
    })
    router.refresh()
    setProcessingId(null)
  }

  const handleRefuser = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'refuse', motif_refus: refusMotif[id] || 'Profil refusé' }),
    })
    router.refresh()
    setProcessingId(null)
  }

  const handleChangeStatut = async (id: string, statut: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-prestataire', {
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
        <h1 style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>🔐 Admin — Modération prestataires</h1>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {[
            { id: 'en_attente', label: `⏳ En attente (${counts.en_attente})` },
            { id: 'active', label: `✅ Actifs (${counts.active})` },
            { id: 'refuse', label: `❌ Refusés (${counts.refuse})` },
            { id: 'tous', label: `Tous (${prestataires.length})` },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filter === f.id ? ORANGE : WHITE, color: filter === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filter === f.id ? ORANGE : BORDER}` }}>
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucun prestataire dans cette catégorie</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map(p => {
              const photos = p.photos || []
              const allPhotos = [...(p.flyer_url ? [p.flyer_url] : []), ...photos]

              return (
                <div key={p.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {allPhotos.length > 0 && (
                    <div
                      style={{ position: 'relative', cursor: 'zoom-in', flexShrink: 0 }}
                      onClick={() => setLightbox({ photos: allPhotos, index: 0 })}
                    >
                      <img src={allPhotos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                      {allPhotos.length > 1 && (
                        <span style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: WHITE, fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>
                          +{allPhotos.length - 1}
                        </span>
                      )}
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{p.prenom} {p.nom}</p>
                    <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 4 }}>{p.activite} · {p.ville}{p.region ? ` (${p.region})` : ''}</p>
                    <p style={{ fontSize: 12, color: TEXT_DIM }}>SIRET : {p.siret}</p>
                    <p style={{ fontSize: 12, color: TEXT_DIM }}>{p.adresse_siege}, {p.code_postal} {p.ville}</p>
                    <p style={{ fontSize: 12, color: TEXT_DIM }}>📞 {p.telephone} · WhatsApp {p.whatsapp}</p>
                    <p style={{ fontSize: 12, color: TEXT_DIM }}>
                      {p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire}€/h` : 'Tarif non précisé'}
                    </p>
                    <p style={{ fontSize: 12, color: TEXT_DIM }}>Compte : {p.directloca_users?.email}</p>
                    <p style={{ fontSize: 11, color: TEXT_DIM }}>Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                    {p.description && <p style={{ fontSize: 12, color: TEXT, marginTop: 6 }}>{p.description}</p>}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                    {p.statut === 'en_attente' && (
                      <>
                        <button onClick={() => handleValider(p.id)} disabled={processingId === p.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>
                          ✅ Valider
                        </button>
                        <textarea
                          value={refusMotif[p.id] || ''}
                          onChange={e => setRefusMotif(m => ({ ...m, [p.id]: e.target.value }))}
                          placeholder="Motif de refus (optionnel)"
                          rows={2}
                          style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }}
                        />
                        <button onClick={() => handleRefuser(p.id)} disabled={processingId === p.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>
                          ❌ Refuser
                        </button>
                      </>
                    )}
                    {(p.statut === 'active' || p.statut === 'refuse') && (
                      <button onClick={() => handleChangeStatut(p.id, p.statut === 'active' ? 'refuse' : 'active')} disabled={processingId === p.id} style={{ background: p.statut === 'active' ? '#FEF2F2' : GREEN, color: p.statut === 'active' ? RED : WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: p.statut === 'active' ? '1px solid #FECACA' : 'none' }}>
                        {p.statut === 'active' ? '⏸️ Désactiver' : '✅ Réactiver'}
                      </button>
                    )}
                    {p.statut === 'active' && (
                      <a href={`https://loca-direct.fr/prestataires/${p.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>
                        Voir la page publique
                      </a>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {lightbox && (
        <PhotoLightbox
          photos={lightbox.photos}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  )
}
