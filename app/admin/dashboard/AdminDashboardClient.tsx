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

export default function AdminDashboardClient({
  vitrines,
  prestataires,
}: {
  vitrines: Vitrine[]
  prestataires: Prestataire[]
}) {
  const router = useRouter()
  const [tab, setTab] = useState<'vitrines' | 'prestataires'>('vitrines')

  const [filterV, setFilterV] = useState('en_attente')
  const [filterP, setFilterP] = useState('en_attente')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [refusMotifV, setRefusMotifV] = useState<Record<string, string>>({})
  const [refusMotifP, setRefusMotifP] = useState<Record<string, string>>({})
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)

  const filteredV = vitrines.filter(v => filterV === 'tous' || v.statut === filterV)
  const filteredP = prestataires.filter(p => filterP === 'tous' || p.statut === filterP)

  const countsV = {
    en_attente: vitrines.filter(v => v.statut === 'en_attente').length,
    active: vitrines.filter(v => v.statut === 'active').length,
    deja_loue: vitrines.filter(v => v.statut === 'deja_loue').length,
    bientot_dispo: vitrines.filter(v => v.statut === 'bientot_dispo').length,
    suspendue: vitrines.filter(v => v.statut === 'suspendue').length,
  }

  const countsP = {
    en_attente: prestataires.filter(p => p.statut === 'en_attente').length,
    active: prestataires.filter(p => p.statut === 'active').length,
    refuse: prestataires.filter(p => p.statut === 'refuse').length,
  }

  const handleValiderV = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'active' }),
    })
    router.refresh()
    setProcessingId(null)
  }
  const handleRefuserV = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'suspendue', motif_refus: refusMotifV[id] || 'Annonce refusée' }),
    })
    router.refresh()
    setProcessingId(null)
  }
  const handleChangeStatutV = async (id: string, statut: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut }),
    })
    router.refresh()
    setProcessingId(null)
  }

  const handleValiderP = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'active' }),
    })
    router.refresh()
    setProcessingId(null)
  }
  const handleRefuserP = async (id: string) => {
    setProcessingId(id)
    await fetch('/api/admin-update-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut: 'refuse', motif_refus: refusMotifP[id] || 'Profil refusé' }),
    })
    router.refresh()
    setProcessingId(null)
  }
  const handleChangeStatutP = async (id: string, statut: string) => {
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
        <h1 style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 14 }}>🔐 Admin LocaDirect</h1>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setTab('vitrines')}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              background: tab === 'vitrines' ? ORANGE : GRAY,
              color: tab === 'vitrines' ? WHITE : TEXT_DIM,
            }}
          >
            🏠 Logements ({vitrines.length})
          </button>
          <button
            onClick={() => setTab('prestataires')}
            style={{
              padding: '10px 18px',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              background: tab === 'prestataires' ? ORANGE : GRAY,
              color: tab === 'prestataires' ? WHITE : TEXT_DIM,
            }}
          >
            🛠️ Prestataires ({prestataires.length})
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

        {tab === 'vitrines' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[
                { id: 'en_attente', label: `⏳ En attente (${countsV.en_attente})` },
                { id: 'active', label: `✅ Actives (${countsV.active})` },
                { id: 'deja_loue', label: `🔴 Déjà louées (${countsV.deja_loue})` },
                { id: 'bientot_dispo', label: `🟡 Bientôt dispo (${countsV.bientot_dispo})` },
                { id: 'suspendue', label: `⏸️ Suspendues (${countsV.suspendue})` },
                { id: 'tous', label: `Tous (${vitrines.length})` },
              ].map(f => (
                <button key={f.id} onClick={() => setFilterV(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filterV === f.id ? ORANGE : WHITE, color: filterV === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filterV === f.id ? ORANGE : BORDER}` }}>
                  {f.label}
                </button>
              ))}
            </div>

            {filteredV.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucune vitrine dans cette catégorie</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredV.map(v => {
                  const photos = v.photos || []
                  return (
                    <div key={v.id} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {photos.length > 0 && (
                        <div
                          style={{ position: 'relative', cursor: 'zoom-in', flexShrink: 0 }}
                          onClick={() => setLightbox({ photos, index: 0 })}
                        >
                          <img src={photos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                          {photos.length > 1 && (
                            <span style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: WHITE, fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>
                              +{photos.length - 1}
                            </span>
                          )}
                        </div>
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
                            <button onClick={() => handleValiderV(v.id)} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>
                              ✅ Valider
                            </button>
                            <textarea
                              value={refusMotifV[v.id] || ''}
                              onChange={e => setRefusMotifV(m => ({ ...m, [v.id]: e.target.value }))}
                              placeholder="Motif de refus (optionnel)"
                              rows={2}
                              style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }}
                            />
                            <button onClick={() => handleRefuserV(v.id)} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>
                              ❌ Refuser
                            </button>
                          </>
                        )}
                        {v.statut === 'active' && (
                          <>
                            <button onClick={() => handleChangeStatutV(v.id, 'deja_loue')} disabled={processingId === v.id} style={{ background: GRAY, color: TEXT, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: `1px solid ${BORDER}` }}>
                              🔴 Marquer déjà loué
                            </button>
                            <button onClick={() => handleChangeStatutV(v.id, 'bientot_dispo')} disabled={processingId === v.id} style={{ background: '#FFFBEB', color: '#D97706', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FDE68A' }}>
                              🟡 Marquer bientôt dispo
                            </button>
                            <button onClick={() => handleChangeStatutV(v.id, 'suspendue')} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FECACA' }}>
                              ⏸️ Suspendre
                            </button>
                          </>
                        )}
                        {(v.statut === 'deja_loue' || v.statut === 'bientot_dispo' || v.statut === 'suspendue') && (
                          <button onClick={() => handleChangeStatutV(v.id, 'active')} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>
                            ✅ Réactiver
                          </button>
                        )}
                        <a href={`https://loca-direct.fr/vitrine/${v.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>
                          Voir la page publique
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {tab === 'prestataires' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[
                { id: 'en_attente', label: `⏳ En attente (${countsP.en_attente})` },
                { id: 'active', label: `✅ Actifs (${countsP.active})` },
                { id: 'refuse', label: `❌ Refusés (${countsP.refuse})` },
                { id: 'tous', label: `Tous (${prestataires.length})` },
              ].map(f => (
                <button key={f.id} onClick={() => setFilterP(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filterP === f.id ? ORANGE : WHITE, color: filterP === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filterP === f.id ? ORANGE : BORDER}` }}>
                  {f.label}
                </button>
              ))}
            </div>

            {filteredP.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}>
                <p style={{ fontSize: 14, color: TEXT_DIM }}>Aucun prestataire dans cette catégorie</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredP.map(p => {
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
                            <button onClick={() => handleValiderP(p.id)} disabled={processingId === p.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>
                              ✅ Valider
                            </button>
                            <textarea
                              value={refusMotifP[p.id] || ''}
                              onChange={e => setRefusMotifP(m => ({ ...m, [p.id]: e.target.value }))}
                              placeholder="Motif de refus (optionnel)"
                              rows={2}
                              style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }}
                            />
                            <button onClick={() => handleRefuserP(p.id)} disabled={processingId === p.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>
                              ❌ Refuser
                            </button>
                          </>
                        )}
                        {(p.statut === 'active' || p.statut === 'refuse') && (
                          <button onClick={() => handleChangeStatutP(p.id, p.statut === 'active' ? 'refuse' : 'active')} disabled={processingId === p.id} style={{ background: p.statut === 'active' ? '#FEF2F2' : GREEN, color: p.statut === 'active' ? RED : WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: p.statut === 'active' ? '1px solid #FECACA' : 'none' }}>
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
          </>
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