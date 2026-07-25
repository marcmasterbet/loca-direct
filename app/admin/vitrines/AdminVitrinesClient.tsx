'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhotoLightbox from '@/components/PhotoLightbox'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
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
  pays?: string
  region?: string
  prix_nuit: number
  prix_semaine?: number
  prix_mois?: number
  statut: string
  photos: string[]
  description_courte: string
  description_longue?: string
  whatsapp: string
  created_at: string
  directloca_users: { email: string }
}

export default function AdminVitrinesClient({ vitrines }: { vitrines: Vitrine[] }) {
  const router = useRouter()
  const [filter, setFilter] = useState('en_attente')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [refusMotif, setRefusMotif] = useState<Record<string, string>>({})
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState<any>({})
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [savingEdit, setSavingEdit] = useState(false)

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

  const handleStartEdit = (v: Vitrine) => {
    setEditingId(v.id)
    setEditData({
      titre: v.titre || '',
      ville: v.ville || '',
      pays: v.pays || 'France',
      region: v.region || '',
      prix_nuit: v.prix_nuit || '',
      prix_semaine: v.prix_semaine || '',
      prix_mois: v.prix_mois || '',
      description_courte: v.description_courte || '',
      description_longue: v.description_longue || '',
      whatsapp: v.whatsapp || '',
      photos: v.photos || [],
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleSaveEdit = async (id: string) => {
    setSavingEdit(true)
    await fetch('/api/admin-update-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...editData }),
    })
    setSavingEdit(false)
    setEditingId(null)
    router.refresh()
  }

  const handleUploadPhoto = async (file: File) => {
    if (editData.photos.length >= 10) return
    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) setEditData((d: any) => ({ ...d, photos: [...d.photos, result.url] }))
    } catch (e) { console.error(e) }
    setUploadingPhoto(false)
  }

  const handleRemovePhoto = (url: string) => {
    setEditData((d: any) => ({ ...d, photos: d.photos.filter((p: string) => p !== url) }))
  }

  const setEdit = (key: string, value: any) => setEditData((d: any) => ({ ...d, [key]: value }))

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, sans-serif' }}>
      <style>{`* { box-sizing: border-box; } button { cursor: pointer; border: none; font-family: inherit; } textarea, input, select { font-family: inherit; }`}</style>

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
            {filtered.map(v => {
              const photos = v.photos || []
              const isEditing = editingId === v.id

              return (
                <div key={v.id} style={{ background: WHITE, border: `1px solid ${isEditing ? ORANGE : BORDER}`, borderRadius: 16, padding: 18 }}>

                  {/* MODE NORMAL */}
                  {!isEditing && (
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      {photos.length > 0 && (
                        <div style={{ flexShrink: 0 }}>
                          <div style={{ position: 'relative', cursor: 'zoom-in' }} onClick={() => setLightbox({ photos, index: 0 })}>
                            <img src={photos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                            {photos.length > 1 && (
                              <span style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: WHITE, fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>+{photos.length - 1}</span>
                            )}
                          </div>
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{v.titre}</p>
                        <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 4 }}>{v.ville}{v.region ? `, ${v.region}` : ''}{v.pays && v.pays !== 'France' ? ` · ${v.pays}` : ''} · {v.prix_nuit}€/nuit</p>
                        <p style={{ fontSize: 12, color: TEXT_DIM }}>Par : {v.directloca_users?.email}</p>
                        <p style={{ fontSize: 11, color: TEXT_DIM }}>Publié le {new Date(v.created_at).toLocaleDateString('fr-FR')}</p>
                        <p style={{ fontSize: 12, color: TEXT, marginTop: 6 }}>{v.description_courte}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                        {/* Bouton éditer */}
                        <button onClick={() => handleStartEdit(v)} style={{ background: ORANGE_LIGHT, color: ORANGE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, border: `1px solid ${ORANGE}` }}>
                          ✏️ Modifier
                        </button>

                        {v.statut === 'en_attente' && (
                          <>
                            <button onClick={() => handleValider(v.id)} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>✅ Valider</button>
                            <textarea value={refusMotif[v.id] || ''} onChange={e => setRefusMotif(m => ({ ...m, [v.id]: e.target.value }))} placeholder="Motif de refus (optionnel)" rows={2} style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }} />
                            <button onClick={() => handleRefuser(v.id)} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>❌ Refuser</button>
                          </>
                        )}
                        {v.statut === 'active' && (
                          <>
                            <button onClick={() => handleChangeStatut(v.id, 'deja_loue')} disabled={processingId === v.id} style={{ background: GRAY, color: TEXT, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: `1px solid ${BORDER}` }}>🔴 Déjà loué</button>
                            <button onClick={() => handleChangeStatut(v.id, 'bientot_dispo')} disabled={processingId === v.id} style={{ background: '#FFFBEB', color: '#D97706', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FDE68A' }}>🟡 Bientôt dispo</button>
                            <button onClick={() => handleChangeStatut(v.id, 'suspendue')} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FECACA' }}>⏸️ Suspendre</button>
                          </>
                        )}
                        {(v.statut === 'deja_loue' || v.statut === 'bientot_dispo' || v.statut === 'suspendue') && (
                          <button onClick={() => handleChangeStatut(v.id, 'active')} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>✅ Réactiver</button>
                        )}
                        <a href={`https://loca-direct.fr/vitrine/${v.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>Voir la page publique</a>
                      </div>
                    </div>
                  )}

                  {/* MODE ÉDITION */}
                  {isEditing && (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: ORANGE }}>✏️ Modification de l'annonce</p>
                        <button onClick={handleCancelEdit} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>Annuler</button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Titre</label>
                          <input value={editData.titre} onChange={e => setEdit('titre', e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Ville</label>
                          <input value={editData.ville} onChange={e => setEdit('ville', e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Pays</label>
                          <select value={editData.pays} onChange={e => setEdit('pays', e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', background: WHITE }}>
                            <option value="France">🇫🇷 France</option>
                            <option value="Belgique">🇧🇪 Belgique</option>
                            <option value="Suisse">🇨🇭 Suisse</option>
                            <option value="Espagne">🇪🇸 Espagne</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Région</label>
                          <input value={editData.region} onChange={e => setEdit('region', e.target.value)} placeholder="ex: Grand Est" style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Prix / nuit (€)</label>
                          <input type="number" value={editData.prix_nuit} onChange={e => setEdit('prix_nuit', e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>WhatsApp</label>
                          <input value={editData.whatsapp} onChange={e => setEdit('whatsapp', e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none' }} />
                        </div>
                      </div>

                      <div style={{ marginBottom: 10 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Description courte</label>
                        <textarea value={editData.description_courte} onChange={e => setEdit('description_courte', e.target.value)} rows={2} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', resize: 'none' }} />
                      </div>

                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 }}>Description complète</label>
                        <textarea value={editData.description_longue} onChange={e => setEdit('description_longue', e.target.value)} rows={5} style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', resize: 'none' }} />
                      </div>

                      {/* PHOTOS */}
                      <div style={{ marginBottom: 14 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 8 }}>Photos ({editData.photos.length}/10)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                          {editData.photos.map((url: string, i: number) => (
                            <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden' }}>
                              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button onClick={() => handleRemovePhoto(url)} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.7)', color: WHITE, borderRadius: '50%', width: 20, height: 20, fontSize: 10 }}>✕</button>
                              {i === 0 && <span style={{ position: 'absolute', bottom: 2, left: 2, background: ORANGE, color: WHITE, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: '1px 4px' }}>Principale</span>}
                            </div>
                          ))}
                          {editData.photos.length < 10 && (
                            <div onClick={() => !uploadingPhoto && document.getElementById('admin-photo-upload')?.click()} style={{ aspectRatio: '1', borderRadius: 8, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 2 }}>
                              {uploadingPhoto ? <span style={{ fontSize: 10, color: TEXT_DIM }}>...</span> : <><span style={{ fontSize: 20, color: TEXT_DIM }}>+</span><span style={{ fontSize: 9, color: TEXT_DIM }}>Ajouter</span></>}
                            </div>
                          )}
                        </div>
                        <input id="admin-photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadPhoto(f) }} />
                      </div>

                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button onClick={handleCancelEdit} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600 }}>Annuler</button>
                        <button onClick={() => handleSaveEdit(v.id)} disabled={savingEdit} style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 700, opacity: savingEdit ? 0.7 : 1 }}>
                          {savingEdit ? 'Enregistrement...' : '✓ Enregistrer'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {lightbox && (
        <PhotoLightbox photos={lightbox.photos} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </div>
  )
}
