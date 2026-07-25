'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { REGIONS_FRANCE, REGIONS_BELGIQUE, REGIONS_SUISSE, REGIONS_ESPAGNE } from '@/lib/regions'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

const ACTIVITES = [
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

const PAYS = ['France', 'Belgique', 'Suisse', 'Espagne']

const REGIONS_PAR_PAYS: Record<string, string[]> = {
  'France': REGIONS_FRANCE,
  'Belgique': REGIONS_BELGIQUE,
  'Suisse': REGIONS_SUISSE,
  'Espagne': REGIONS_ESPAGNE,
}

export default function DevenirPrestatairePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const totalSteps = 5

  const [data, setData] = useState<any>({
    nom: '',
    prenom: '',
    siret: '',
    adresse_siege: '',
    pays: 'France',
    region: '',
    ville: '',
    code_postal: '',
    activite: 'Conciergerie',
    description: '',
    telephone: '',
    whatsapp: '',
    site_web: '',
    tarif_horaire: '',
    sur_devis: false,
    flyer_url: '',
    photos: [] as string[],
  })

  const set = (key: string, value: any) => setData((d: any) => ({ ...d, [key]: value }))

  const handlePaysChange = (pays: string) => {
    setData((d: any) => ({ ...d, pays, region: '' }))
  }

  const validateStep = (s: number) => {
    if (s === 1) {
      if (!data.nom.trim()) return 'Le nom est requis'
      if (!data.prenom.trim()) return 'Le prénom est requis'
      if (!data.siret.trim()) return 'Le SIRET est requis'
      if (!data.adresse_siege.trim()) return "L'adresse du siège est requise"
      if (!data.ville.trim()) return 'La ville est requise'
      if (!data.code_postal.trim()) return 'Le code postal est requis'
    }
    if (s === 2) {
      if (!data.activite) return "L'activité est requise"
    }
    if (s === 3) {
      if (!data.sur_devis && !data.tarif_horaire) return 'Indiquez un tarif ou cochez "Sur devis"'
    }
    if (s === 4) {
      if (!data.telephone.trim()) return 'Le téléphone est requis'
      if (!data.whatsapp.trim()) return 'Le WhatsApp est requis'
    }
    return ''
  }

  const handleNext = () => {
    const err = validateStep(step)
    if (err) { setError(err); return }
    setError('')
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/save-prestataire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) {
        setError(result.error || 'Une erreur est survenue')
        setLoading(false)
        return
      }
      router.push('/espace')
    } catch (e) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } button { font-family: inherit; cursor: pointer; border: none; } input, select, textarea { font-family: inherit; }`}</style>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/espace" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px 60px' }}>
        <Link href="/espace" style={{ fontSize: 13, color: ORANGE, marginBottom: 16, display: 'inline-block' }}>← Retour à mon espace</Link>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 4 }}>Devenir prestataire</h1>
        <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 20 }}>Étape {step} sur {totalSteps}</p>
        <div style={{ height: 6, background: BORDER, borderRadius: 3, marginBottom: 24, overflow: 'hidden' }}>
          <div style={{ height: '100%', background: ORANGE, width: `${(step / totalSteps) * 100}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ background: WHITE, borderRadius: 20, padding: 24, boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
          {error && (
            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: 12, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#DC2626' }}>{error}</p>
            </div>
          )}
          {step === 1 && <Step1 data={data} set={set} handlePaysChange={handlePaysChange} />}
          {step === 2 && <Step2 data={data} set={set} />}
          {step === 3 && <Step3 data={data} set={set} />}
          {step === 4 && <Step4 data={data} set={set} />}
          {step === 5 && <Step5 data={data} set={set} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 12 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ padding: '12px 20px', borderRadius: 10, background: GRAY, color: TEXT_DIM, fontSize: 14, fontWeight: 600 }}>← Retour</button>
            ) : <div />}
            {step < totalSteps ? (
              <button onClick={handleNext} style={{ padding: '12px 24px', borderRadius: 10, background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700 }}>Continuer →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={{ padding: '12px 24px', borderRadius: 10, background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Envoi en cours...' : '✓ Envoyer ma demande'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 12, fontWeight: 600, color: TEXT, marginBottom: 6, display: 'block' }}>{children}</label>
}
function Input({ value, onChange, placeholder, type = 'text' }: any) {
  return <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14 }} />
}
function Select({ value, onChange, options }: any) {
  return <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, background: WHITE }}>{options.map((o: string) => <option key={o} value={o}>{o}</option>)}</select>
}
function Textarea({ value, onChange, placeholder, rows = 4 }: any) {
  return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, resize: 'none' }} />
}
function Checkbox({ checked, onChange, label }: any) {
  return (
    <button onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, background: 'transparent' }}>
      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? ORANGE : BORDER}`, background: checked ? ORANGE : WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ color: WHITE, fontSize: 12 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: TEXT }}>{label}</span>
    </button>
  )
}
function StepTitle({ children }: any) {
  return <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 16 }}>{children}</h2>
}

function Step1({ data, set, handlePaysChange }: any) {
  const regions = REGIONS_PAR_PAYS[data.pays] || []
  const paysFlags: Record<string, string> = { 'France': '🇫🇷', 'Belgique': '🇧🇪', 'Suisse': '🇨🇭', 'Espagne': '🇪🇸' }
  return (
    <div>
      <StepTitle>🪪 Identité</StepTitle>
      <Label>Nom</Label>
      <Input value={data.nom} onChange={(v: string) => set('nom', v)} placeholder="Dupont" />
      <Label>Prénom</Label>
      <Input value={data.prenom} onChange={(v: string) => set('prenom', v)} placeholder="Marie" />
      <Label>SIRET</Label>
      <Input value={data.siret} onChange={(v: string) => set('siret', v)} placeholder="123 456 789 00012" />
      <Label>Adresse du siège</Label>
      <Input value={data.adresse_siege} onChange={(v: string) => set('adresse_siege', v)} placeholder="12 rue de la Paix" />
      <Label>Pays</Label>
      <select value={data.pays} onChange={e => handlePaysChange(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, background: WHITE }}>
        {PAYS.map(p => <option key={p} value={p}>{paysFlags[p]} {p}</option>)}
      </select>
      <Label>Région</Label>
      <select value={data.region} onChange={e => set('region', e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, background: WHITE }}>
        <option value="">— Sélectionner une région —</option>
        {regions.map((r: string) => <option key={r} value={r}>{r}</option>)}
      </select>
      <Label>Ville</Label>
      <Input value={data.ville} onChange={(v: string) => set('ville', v)} placeholder="Strasbourg" />
      <Label>Code postal</Label>
      <Input value={data.code_postal} onChange={(v: string) => set('code_postal', v)} placeholder="67000" />
      <p style={{ fontSize: 11, color: TEXT_DIM }}>Ces informations permettent de vérifier votre activité avant publication.</p>
    </div>
  )
}

function Step2({ data, set }: any) {
  return (
    <div>
      <StepTitle>🛠️ Activité</StepTitle>
      <Label>Type d'activité</Label>
      <Select value={data.activite} onChange={(v: string) => set('activite', v)} options={ACTIVITES} />
      <Label>Description de votre activité</Label>
      <Textarea value={data.description} onChange={(v: string) => set('description', v.slice(0, 600))} placeholder="Décrivez vos services, votre expérience, votre zone d'intervention..." rows={6} />
      <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: -10 }}>{data.description.length}/600</p>
    </div>
  )
}

function Step3({ data, set }: any) {
  return (
    <div>
      <StepTitle>💰 Tarif</StepTitle>
      <Checkbox checked={data.sur_devis} onChange={(v: boolean) => set('sur_devis', v)} label="Sur devis (pas de tarif fixe)" />
      {!data.sur_devis && (
        <>
          <Label>Tarif horaire (€)</Label>
          <Input type="number" value={data.tarif_horaire} onChange={(v: string) => set('tarif_horaire', v)} placeholder="35" />
        </>
      )}
    </div>
  )
}

function Step4({ data, set }: any) {
  return (
    <div>
      <StepTitle>📞 Contact</StepTitle>
      <Label>Téléphone</Label>
      <Input value={data.telephone} onChange={(v: string) => set('telephone', v)} placeholder="+33 6 12 34 56 78" />
      <Label>WhatsApp</Label>
      <Input value={data.whatsapp} onChange={(v: string) => set('whatsapp', v)} placeholder="+33 6 12 34 56 78" />
      <Label>Site internet (optionnel)</Label>
      <Input value={data.site_web} onChange={(v: string) => set('site_web', v)} placeholder="https://www.monsite.fr" />
    </div>
  )
}

function Step5({ data, set }: any) {
  const [uploadingFlyer, setUploadingFlyer] = useState(false)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  const handleUploadFlyer = async (file: File) => {
    setUploadingFlyer(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) set('flyer_url', result.url)
    } catch (e) { console.error(e) }
    setUploadingFlyer(false)
  }

  const handleUploadPhoto = async (file: File) => {
    if (data.photos.length >= 10) return
    setUploadingPhoto(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) set('photos', [...data.photos, result.url])
    } catch (e) { console.error(e) }
    setUploadingPhoto(false)
  }

  const removePhoto = (url: string) => set('photos', data.photos.filter((p: string) => p !== url))

  return (
    <div>
      <StepTitle>🖼️ Flyer / Visuel principal (optionnel)</StepTitle>
      {data.flyer_url ? (
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <img src={data.flyer_url} alt="" style={{ width: '100%', borderRadius: 12, display: 'block' }} />
          <button onClick={() => set('flyer_url', '')} style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: WHITE, borderRadius: '50%', width: 28, height: 28, fontSize: 14 }}>✕</button>
        </div>
      ) : (
        <div onClick={() => !uploadingFlyer && document.getElementById('flyer-upload')?.click()} style={{ aspectRatio: '16/9', borderRadius: 12, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
          {uploadingFlyer ? <span style={{ fontSize: 13, color: TEXT_DIM }}>Envoi en cours...</span> : <><span style={{ fontSize: 28, color: TEXT_DIM }}>+</span><span style={{ fontSize: 12, color: TEXT_DIM }}>Ajouter un flyer ou visuel</span></>}
        </div>
      )}
      <input id="flyer-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadFlyer(f) }} />

      <StepTitle>📸 Photos de réalisations ({data.photos.length}/10)</StepTitle>
      <p style={{ fontSize: 12, color: TEXT_DIM, marginTop: -10, marginBottom: 14 }}>Montrez des exemples de votre travail (optionnel)</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {data.photos.map((url: string, i: number) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => removePhoto(url)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: WHITE, borderRadius: '50%', width: 22, height: 22, fontSize: 12 }}>✕</button>
          </div>
        ))}
        {data.photos.length < 10 && (
          <div onClick={() => !uploadingPhoto && document.getElementById('photo-upload-presta')?.click()} style={{ aspectRatio: '1', borderRadius: 10, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 4 }}>
            {uploadingPhoto ? <span style={{ fontSize: 11, color: TEXT_DIM }}>...</span> : <><span style={{ fontSize: 24, color: TEXT_DIM }}>+</span><span style={{ fontSize: 10, color: TEXT_DIM }}>Ajouter</span></>}
          </div>
        )}
      </div>
      <input id="photo-upload-presta" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUploadPhoto(f) }} />

      <div style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}`, borderRadius: 12, padding: 16, marginTop: 10 }}>
        <p style={{ fontSize: 13, color: ORANGE, lineHeight: 1.6 }}>
          ⏳ Votre profil sera vérifié par notre équipe avant publication dans l'annuaire. Vous recevrez un email dès qu'il sera en ligne.
        </p>
      </div>
    </div>
  )
}
