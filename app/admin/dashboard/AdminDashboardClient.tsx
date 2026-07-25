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

const ACTIVITES = [
  'Conciergerie', 'Ménage / Entretien', 'Photographe', 'Aide au digital / Communication',
  'Maintenance / Bricolage', 'Jardinage / Extérieur', 'Décoration / Aménagement',
  "Kits & paniers d'accueil", 'Autre',
]

export default function AdminDashboardClient({ vitrines, prestataires }: { vitrines: Vitrine[]; prestataires: Prestataire[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<'vitrines' | 'prestataires'>('vitrines')
  const [filterV, setFilterV] = useState('en_attente')
  const [filterP, setFilterP] = useState('en_attente')
  const [processingId, setProcessingId] = useState<string | null>(null)
  const [refusMotifV, setRefusMotifV] = useState<Record<string, string>>({})
  const [refusMotifP, setRefusMotifP] = useState<Record<string, string>>({})
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)

  // Edition vitrines
  const [editingVId, setEditingVId] = useState<string | null>(null)
  const [editVData, setEditVData] = useState<any>({})
  const [uploadingVPhoto, setUploadingVPhoto] = useState(false)
  const [savingV, setSavingV] = useState(false)

  // Edition prestataires
  const [editingPId, setEditingPId] = useState<string | null>(null)
  const [editPData, setEditPData] = useState<any>({})
  const [uploadingPPhoto, setUploadingPPhoto] = useState(false)
  const [uploadingPFlyer, setUploadingPFlyer] = useState(false)
  const [savingP, setSavingP] = useState(false)

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

  // Actions vitrines
  const handleValiderV = async (id: string) => { setProcessingId(id); await fetch('/api/admin-update-vitrine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut: 'active' }) }); router.refresh(); setProcessingId(null) }
  const handleRefuserV = async (id: string) => { setProcessingId(id); await fetch('/api/admin-update-vitrine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut: 'suspendue', motif_refus: refusMotifV[id] || 'Annonce refusée' }) }); router.refresh(); setProcessingId(null) }
  const handleChangeStatutV = async (id: string, statut: string) => { setProcessingId(id); await fetch('/api/admin-update-vitrine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut }) }); router.refresh(); setProcessingId(null) }
  const handleSupprimerV = async (id: string) => {
  if (!confirm('Supprimer cette vitrine définitivement ?')) return
  setProcessingId(id)
  await fetch('/api/admin-supprimer-vitrine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
  setProcessingId(null)
  router.refresh()
}

const handleSupprimerP = async (id: string) => {
  if (!confirm('Supprimer ce prestataire définitivement ?')) return
  setProcessingId(id)
  await fetch('/api/admin-supprimer-prestataire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
  setProcessingId(null)
  router.refresh()
}
  const handleStartEditV = (v: Vitrine) => {
    setEditingVId(v.id)
    setEditVData({ titre: v.titre || '', ville: v.ville || '', pays: v.pays || 'France', region: v.region || '', prix_nuit: v.prix_nuit || '', prix_semaine: v.prix_semaine || '', prix_mois: v.prix_mois || '', description_courte: v.description_courte || '', description_longue: v.description_longue || '', whatsapp: v.whatsapp || '', photos: v.photos || [] })
  }
  const handleSaveV = async (id: string) => {
    setSavingV(true)
    await fetch('/api/admin-update-vitrine', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...editVData }) })
    setSavingV(false); setEditingVId(null); router.refresh()
  }
  const handleUploadVPhoto = async (file: File) => {
    if (editVData.photos.length >= 10) return
    setUploadingVPhoto(true)
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) setEditVData((d: any) => ({ ...d, photos: [...d.photos, result.url] }))
    } catch (e) { console.error(e) }
    setUploadingVPhoto(false)
  }

  // Actions prestataires
  const handleValiderP = async (id: string) => { setProcessingId(id); await fetch('/api/admin-update-prestataire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut: 'active' }) }); router.refresh(); setProcessingId(null) }
  const handleRefuserP = async (id: string) => { setProcessingId(id); await fetch('/api/admin-update-prestataire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut: 'refuse', motif_refus: refusMotifP[id] || 'Profil refusé' }) }); router.refresh(); setProcessingId(null) }
  const handleChangeStatutP = async (id: string, statut: string) => { setProcessingId(id); await fetch('/api/admin-update-prestataire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, statut }) }); router.refresh(); setProcessingId(null) }

  const handleStartEditP = (p: Prestataire) => {
    setEditingPId(p.id)
    setEditPData({ nom: p.nom || '', prenom: p.prenom || '', siret: p.siret || '', adresse_siege: p.adresse_siege || '', ville: p.ville || '', code_postal: p.code_postal || '', region: p.region || '', activite: p.activite || 'Conciergerie', description: p.description || '', telephone: p.telephone || '', whatsapp: p.whatsapp || '', tarif_horaire: p.tarif_horaire || '', sur_devis: p.sur_devis || false, flyer_url: p.flyer_url || '', photos: p.photos || [] })
  }
  const handleSaveP = async (id: string) => {
    setSavingP(true)
    await fetch('/api/admin-update-prestataire', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...editPData }) })
    setSavingP(false); setEditingPId(null); router.refresh()
  }
  const handleUploadPPhoto = async (file: File) => {
    if (editPData.photos.length >= 10) return
    setUploadingPPhoto(true)
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) setEditPData((d: any) => ({ ...d, photos: [...d.photos, result.url] }))
    } catch (e) { console.error(e) }
    setUploadingPPhoto(false)
  }
  const handleUploadPFlyer = async (file: File) => {
    setUploadingPFlyer(true)
    try {
      const formData = new FormData(); formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) setEditPData((d: any) => ({ ...d, flyer_url: result.url }))
    } catch (e) { console.error(e) }
    setUploadingPFlyer(false)
  }

  const setV = (key: string, value: any) => setEditVData((d: any) => ({ ...d, [key]: value }))
  const setP = (key: string, value: any) => setEditPData((d: any) => ({ ...d, [key]: value }))

  const inputStyle = { width: '100%', padding: '8px 12px', borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 13, outline: 'none', background: WHITE }
  const labelStyle = { fontSize: 11, fontWeight: 600, color: TEXT_DIM, display: 'block', marginBottom: 4 } as any

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, sans-serif' }}>
      <style>{`* { box-sizing: border-box; } button { cursor: pointer; border: none; font-family: inherit; } textarea, input, select { font-family: inherit; }`}</style>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '16px 20px' }}>
        <h1 style={{ fontSize: 18, fontWeight: 800, color: TEXT, marginBottom: 14 }}>🔐 Admin LocaDirect</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTab('vitrines')} style={{ padding: '10px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: tab === 'vitrines' ? ORANGE : GRAY, color: tab === 'vitrines' ? WHITE : TEXT_DIM }}>🏠 Logements ({vitrines.length})</button>
          <button onClick={() => setTab('prestataires')} style={{ padding: '10px 18px', borderRadius: 10, fontSize: 14, fontWeight: 700, background: tab === 'prestataires' ? ORANGE : GRAY, color: tab === 'prestataires' ? WHITE : TEXT_DIM }}>🛠️ Prestataires ({prestataires.length})</button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

        {/* ===== VITRINES ===== */}
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
                <button key={f.id} onClick={() => setFilterV(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filterV === f.id ? ORANGE : WHITE, color: filterV === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filterV === f.id ? ORANGE : BORDER}` }}>{f.label}</button>
              ))}
            </div>

            {filteredV.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}><p style={{ fontSize: 14, color: TEXT_DIM }}>Aucune vitrine dans cette catégorie</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredV.map(v => {
                  const photos = v.photos || []
                  const isEditing = editingVId === v.id
                  return (
                    <div key={v.id} style={{ background: WHITE, border: `1px solid ${isEditing ? ORANGE : BORDER}`, borderRadius: 16, padding: 18 }}>

                      {/* MODE NORMAL */}
                      {!isEditing && (
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          {photos.length > 0 && (
                            <div style={{ position: 'relative', cursor: 'zoom-in', flexShrink: 0 }} onClick={() => setLightbox({ photos, index: 0 })}>
                              <img src={photos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                              {photos.length > 1 && <span style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: WHITE, fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>+{photos.length - 1}</span>}
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
                            <button onClick={() => handleStartEditV(v)} style={{ background: ORANGE_LIGHT, color: ORANGE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, border: `1px solid ${ORANGE}` }}>✏️ Modifier</button>
                            {v.statut === 'en_attente' && (
                              <>
                                <button onClick={() => handleValiderV(v.id)} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>✅ Valider</button>
                                <textarea value={refusMotifV[v.id] || ''} onChange={e => setRefusMotifV(m => ({ ...m, [v.id]: e.target.value }))} placeholder="Motif de refus (optionnel)" rows={2} style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }} />
                                <button onClick={() => handleRefuserV(v.id)} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>❌ Refuser</button>
                              </>
                            )}
                            {v.statut === 'active' && (
                              <>
                                <button onClick={() => handleChangeStatutV(v.id, 'deja_loue')} disabled={processingId === v.id} style={{ background: GRAY, color: TEXT, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: `1px solid ${BORDER}` }}>🔴 Déjà loué</button>
                                <button onClick={() => handleChangeStatutV(v.id, 'bientot_dispo')} disabled={processingId === v.id} style={{ background: '#FFFBEB', color: '#D97706', borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FDE68A' }}>🟡 Bientôt dispo</button>
                                <button onClick={() => handleChangeStatutV(v.id, 'suspendue')} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600, border: '1px solid #FECACA' }}>⏸️ Suspendre</button>
                              </>
                            )}
                            {(v.statut === 'deja_loue' || v.statut === 'bientot_dispo' || v.statut === 'suspendue') && (
                              <button onClick={() => handleChangeStatutV(v.id, 'active')} disabled={processingId === v.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 600 }}>✅ Réactiver</button>
                            )}
                            <button onClick={() => handleSupprimerV(v.id)} disabled={processingId === v.id} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
  🗑️ Supprimer
</button>
                            <a href={`https://loca-direct.fr/vitrine/${v.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>Voir la page publique</a>
                          </div>
                        </div>
                      )}

                      {/* MODE ÉDITION VITRINE */}
                      {isEditing && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: ORANGE }}>✏️ Modification du logement</p>
                            <button onClick={() => setEditingVId(null)} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>Annuler</button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                            <div><label style={labelStyle}>Titre</label><input value={editVData.titre} onChange={e => setV('titre', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Ville</label><input value={editVData.ville} onChange={e => setV('ville', e.target.value)} style={inputStyle} /></div>
                            <div>
                              <label style={labelStyle}>Pays</label>
                              <select value={editVData.pays} onChange={e => setV('pays', e.target.value)} style={inputStyle}>
                                <option value="France">🇫🇷 France</option>
                                <option value="Belgique">🇧🇪 Belgique</option>
                                <option value="Suisse">🇨🇭 Suisse</option>
                                <option value="Espagne">🇪🇸 Espagne</option>
                              </select>
                            </div>
                            <div><label style={labelStyle}>Région</label><input value={editVData.region} onChange={e => setV('region', e.target.value)} placeholder="ex: Grand Est" style={inputStyle} /></div>
                            <div><label style={labelStyle}>Prix / nuit (€)</label><input type="number" value={editVData.prix_nuit} onChange={e => setV('prix_nuit', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>WhatsApp</label><input value={editVData.whatsapp} onChange={e => setV('whatsapp', e.target.value)} style={inputStyle} /></div>
                          </div>
                          <div style={{ marginBottom: 10 }}><label style={labelStyle}>Description courte</label><textarea value={editVData.description_courte} onChange={e => setV('description_courte', e.target.value)} rows={2} style={{ ...inputStyle, resize: 'none' }} /></div>
                          <div style={{ marginBottom: 14 }}><label style={labelStyle}>Description complète</label><textarea value={editVData.description_longue} onChange={e => setV('description_longue', e.target.value)} rows={5} style={{ ...inputStyle, resize: 'none' }} /></div>

                          <div style={{ marginBottom: 14 }}>
                            <label style={labelStyle}>Photos ({editVData.photos.length}/10)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                              {editVData.photos.map((url: string, i: number) => (
                                <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden' }}>
                                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  <button onClick={() => setV('photos', editVData.photos.filter((p: string) => p !== url))} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.7)', color: WHITE, borderRadius: '50%', width: 20, height: 20, fontSize: 10 }}>✕</button>
                                  {i === 0 && <span style={{ position: 'absolute', bottom: 2, left: 2, background: ORANGE, color: WHITE, fontSize: 8, fontWeight: 700, borderRadius: 4, padding: '1px 4px' }}>Principale</span>}
                                </div>
                              ))}
                              {editVData.photos.length < 10 && (
                                <div onClick={() => !uploadingVPhoto && document.getElementById('admin-v-photo')?.click()} style={{ aspectRatio: '1', borderRadius: 8, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 2 }}>
                                  {uploadingVPhoto ? <span style={{ fontSize: 10, color: TEXT_DIM }}>...</span> : <><span style={{ fontSize: 20, color: TEXT_DIM }}>+</span><span style={{ fontSize: 9, color: TEXT_DIM }}>Ajouter</span></>}
                                </div>
                              )}
                            </div>
                            <input id="admin-v-photo" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadVPhoto(f) }} />
                          </div>

                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingVId(null)} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600 }}>Annuler</button>
                            <button onClick={() => handleSaveV(v.id)} disabled={savingV} style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 700, opacity: savingV ? 0.7 : 1 }}>{savingV ? 'Enregistrement...' : '✓ Enregistrer'}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* ===== PRESTATAIRES ===== */}
        {tab === 'prestataires' && (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {[
                { id: 'en_attente', label: `⏳ En attente (${countsP.en_attente})` },
                { id: 'active', label: `✅ Actifs (${countsP.active})` },
                { id: 'refuse', label: `❌ Refusés (${countsP.refuse})` },
                { id: 'tous', label: `Tous (${prestataires.length})` },
              ].map(f => (
                <button key={f.id} onClick={() => setFilterP(f.id)} style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, background: filterP === f.id ? ORANGE : WHITE, color: filterP === f.id ? WHITE : TEXT_DIM, border: `1px solid ${filterP === f.id ? ORANGE : BORDER}` }}>{f.label}</button>
              ))}
            </div>

            {filteredP.length === 0 ? (
              <div style={{ background: WHITE, borderRadius: 16, padding: 40, textAlign: 'center', border: `1px solid ${BORDER}` }}><p style={{ fontSize: 14, color: TEXT_DIM }}>Aucun prestataire dans cette catégorie</p></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {filteredP.map(p => {
                  const photos = p.photos || []
                  const allPhotos = [...(p.flyer_url ? [p.flyer_url] : []), ...photos]
                  const isEditing = editingPId === p.id
                  return (
                    <div key={p.id} style={{ background: WHITE, border: `1px solid ${isEditing ? ORANGE : BORDER}`, borderRadius: 16, padding: 18 }}>

                      {/* MODE NORMAL */}
                      {!isEditing && (
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                          {allPhotos.length > 0 && (
                            <div style={{ position: 'relative', cursor: 'zoom-in', flexShrink: 0 }} onClick={() => setLightbox({ photos: allPhotos, index: 0 })}>
                              <img src={allPhotos[0]} alt="" style={{ width: 100, height: 100, borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                              {allPhotos.length > 1 && <span style={{ position: 'absolute', bottom: 4, right: 4, background: 'rgba(0,0,0,0.65)', color: WHITE, fontSize: 10, fontWeight: 700, borderRadius: 10, padding: '2px 7px' }}>+{allPhotos.length - 1}</span>}
                            </div>
                          )}
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{p.prenom} {p.nom}</p>
                            <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 4 }}>{p.activite} · {p.ville}{p.region ? ` (${p.region})` : ''}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM }}>SIRET : {p.siret}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM }}>{p.adresse_siege}, {p.code_postal} {p.ville}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM }}>📞 {p.telephone} · WhatsApp {p.whatsapp}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM }}>{p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire}€/h` : 'Tarif non précisé'}</p>
                            <p style={{ fontSize: 12, color: TEXT_DIM }}>Compte : {p.directloca_users?.email}</p>
                            <p style={{ fontSize: 11, color: TEXT_DIM }}>Inscrit le {new Date(p.created_at).toLocaleDateString('fr-FR')}</p>
                            {p.description && <p style={{ fontSize: 12, color: TEXT, marginTop: 6 }}>{p.description}</p>}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
                            <button onClick={() => handleStartEditP(p)} style={{ background: ORANGE_LIGHT, color: ORANGE, borderRadius: 10, padding: '8px 14px', fontSize: 12, fontWeight: 700, border: `1px solid ${ORANGE}` }}>✏️ Modifier</button>
                            {p.statut === 'en_attente' && (
                              <>
                                <button onClick={() => handleValiderP(p.id)} disabled={processingId === p.id} style={{ background: GREEN, color: WHITE, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700 }}>✅ Valider</button>
                                <textarea value={refusMotifP[p.id] || ''} onChange={e => setRefusMotifP(m => ({ ...m, [p.id]: e.target.value }))} placeholder="Motif de refus (optionnel)" rows={2} style={{ width: '100%', padding: 8, borderRadius: 8, border: `1px solid ${BORDER}`, fontSize: 12, outline: 'none', resize: 'none' }} />
                                <button onClick={() => handleRefuserP(p.id)} disabled={processingId === p.id} style={{ background: '#FEF2F2', color: RED, borderRadius: 10, padding: '10px 16px', fontSize: 13, fontWeight: 700, border: '1px solid #FECACA' }}>❌ Refuser</button>
                              </>
                            )}
                          <>
  {(p.statut === 'active' || p.statut === 'refuse') && (
    <button onClick={() => handleChangeStatutP(p.id, p.statut === 'active' ? 'suspendue' : 'active')} disabled={processingId === p.id} style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB', borderRadius: 8, padding: '8px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
      {p.statut === 'active' ? '⏸ Désactiver' : '✅ Réactiver'}
    </button>
  )}
  <button onClick={() => handleSupprimerP(p.id)} disabled={processingId === p.id} style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: 8, padding: '8px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
    🗑️ Supprimer
  </button>
</>
                            {p.statut === 'active' && <a href={`https://loca-direct.fr/prestataires/${p.id}`} target="_blank" rel="noreferrer" style={{ fontSize: 11, color: ORANGE, textAlign: 'center', textDecoration: 'underline' }}>Voir la page publique</a>}
                          </div>
                        </div>
                      )}

                      {/* MODE ÉDITION PRESTATAIRE */}
                      {isEditing && (
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontSize: 15, fontWeight: 700, color: ORANGE }}>✏️ Modification du prestataire</p>
                            <button onClick={() => setEditingPId(null)} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>Annuler</button>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                            <div><label style={labelStyle}>Prénom</label><input value={editPData.prenom} onChange={e => setP('prenom', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Nom</label><input value={editPData.nom} onChange={e => setP('nom', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>SIRET</label><input value={editPData.siret} onChange={e => setP('siret', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Activité</label>
                              <select value={editPData.activite} onChange={e => setP('activite', e.target.value)} style={inputStyle}>
                                {ACTIVITES.map(a => <option key={a} value={a}>{a}</option>)}
                              </select>
                            </div>
                            <div><label style={labelStyle}>Ville</label><input value={editPData.ville} onChange={e => setP('ville', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Code postal</label><input value={editPData.code_postal} onChange={e => setP('code_postal', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Région</label><input value={editPData.region} onChange={e => setP('region', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Téléphone</label><input value={editPData.telephone} onChange={e => setP('telephone', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>WhatsApp</label><input value={editPData.whatsapp} onChange={e => setP('whatsapp', e.target.value)} style={inputStyle} /></div>
                            <div><label style={labelStyle}>Tarif horaire (€)</label><input type="number" value={editPData.tarif_horaire} onChange={e => setP('tarif_horaire', e.target.value)} disabled={editPData.sur_devis} style={{ ...inputStyle, opacity: editPData.sur_devis ? 0.5 : 1 }} /></div>
                          </div>
                          <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input type="checkbox" checked={editPData.sur_devis} onChange={e => setP('sur_devis', e.target.checked)} id="sur_devis" />
                            <label htmlFor="sur_devis" style={{ fontSize: 13, color: TEXT }}>Sur devis</label>
                          </div>
                          <div style={{ marginBottom: 14 }}><label style={labelStyle}>Description</label><textarea value={editPData.description} onChange={e => setP('description', e.target.value)} rows={5} style={{ ...inputStyle, resize: 'none' }} /></div>

                          {/* FLYER */}
                          <div style={{ marginBottom: 14 }}>
                            <label style={labelStyle}>Flyer / Visuel principal</label>
                            {editPData.flyer_url ? (
                              <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src={editPData.flyer_url} alt="" style={{ width: '100%', maxHeight: 120, objectFit: 'cover', borderRadius: 8, display: 'block' }} />
                                <button onClick={() => setP('flyer_url', '')} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', color: WHITE, borderRadius: '50%', width: 22, height: 22, fontSize: 11 }}>✕</button>
                              </div>
                            ) : (
                              <div onClick={() => !uploadingPFlyer && document.getElementById('admin-p-flyer')?.click()} style={{ height: 80, borderRadius: 8, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 6 }}>
                                {uploadingPFlyer ? <span style={{ fontSize: 12, color: TEXT_DIM }}>Envoi...</span> : <><span style={{ fontSize: 20, color: TEXT_DIM }}>+</span><span style={{ fontSize: 12, color: TEXT_DIM }}>Ajouter un flyer</span></>}
                              </div>
                            )}
                            <input id="admin-p-flyer" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadPFlyer(f) }} />
                          </div>

                          {/* PHOTOS */}
                          <div style={{ marginBottom: 14 }}>
                            <label style={labelStyle}>Photos de réalisations ({editPData.photos.length}/10)</label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                              {editPData.photos.map((url: string, i: number) => (
                                <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 8, overflow: 'hidden' }}>
                                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  <button onClick={() => setP('photos', editPData.photos.filter((ph: string) => ph !== url))} style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(0,0,0,0.7)', color: WHITE, borderRadius: '50%', width: 20, height: 20, fontSize: 10 }}>✕</button>
                                </div>
                              ))}
                              {editPData.photos.length < 10 && (
                                <div onClick={() => !uploadingPPhoto && document.getElementById('admin-p-photo')?.click()} style={{ aspectRatio: '1', borderRadius: 8, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 2 }}>
                                  {uploadingPPhoto ? <span style={{ fontSize: 10, color: TEXT_DIM }}>...</span> : <><span style={{ fontSize: 20, color: TEXT_DIM }}>+</span><span style={{ fontSize: 9, color: TEXT_DIM }}>Ajouter</span></>}
                                </div>
                              )}
                            </div>
                            <input id="admin-p-photo" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadPPhoto(f) }} />
                          </div>

                          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button onClick={() => setEditingPId(null)} style={{ background: GRAY, color: TEXT_DIM, borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600 }}>Annuler</button>
                            <button onClick={() => handleSaveP(p.id)} disabled={savingP} style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 24px', fontSize: 13, fontWeight: 700, opacity: savingP ? 0.7 : 1 }}>{savingP ? 'Enregistrement...' : '✓ Enregistrer'}</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>

      {lightbox && <PhotoLightbox photos={lightbox.photos} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}
    </div>
  )
}
