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

const TYPES_LOGEMENT = ['Appartement', 'Maison', 'Villa', 'Chalet', 'Studio', 'Chambre', 'Autre']
const TYPES_LOCATION = ['Courte durée', 'Longue durée', 'Les deux']
const DUREES_MIN = ['1 nuit', '2 nuits', '1 semaine', '1 mois']

const EQUIPEMENTS = [
  { id: 'wifi', icon: '📶', label: 'WiFi' },
  { id: 'parking', icon: '🅿️', label: 'Parking' },
  { id: 'piscine', icon: '🌊', label: 'Piscine' },
  { id: 'baignoire', icon: '🛁', label: 'Baignoire' },
  { id: 'douche', icon: '🚿', label: 'Douche' },
  { id: 'cuisine', icon: '🍳', label: 'Cuisine équipée' },
  { id: 'lave_linge', icon: '🧺', label: 'Lave-linge' },
  { id: 'seche_linge', icon: '🌀', label: 'Sèche-linge' },
  { id: 'clim', icon: '❄️', label: 'Climatisation' },
  { id: 'chauffage', icon: '🔥', label: 'Chauffage' },
  { id: 'tv', icon: '📺', label: 'Télévision' },
  { id: 'sport', icon: '🏋️', label: 'Salle de sport' },
  { id: 'animaux', icon: '🐾', label: 'Animaux acceptés' },
  { id: 'fumeurs', icon: '🚬', label: 'Fumeurs acceptés' },
  { id: 'handicap', icon: '♿', label: 'Accès handicapé' },
  { id: 'vue_mer', icon: '🏖️', label: 'Vue mer' },
  { id: 'vue_montagne', icon: '🏔️', label: 'Vue montagne' },
  { id: 'vue_ville', icon: '🌇', label: 'Vue ville' },
  { id: 'jardin', icon: '🌿', label: 'Jardin / Terrasse' },
  { id: 'barbecue', icon: '🅱️', label: 'Barbecue' },
  { id: 'ascenseur', icon: '🛗', label: 'Ascenseur' },
  { id: 'digicode', icon: '🔒', label: 'Digicode / Accès autonome' },
]

export default function MaVitrinePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const totalSteps = 8

  const [data, setData] = useState<any>({
    titre: '',
    numero_enregistrement: '',
    type_logement: 'Appartement',
    ville: '',
    code_postal: '',
    quartier: '',
    surface: '',
    nb_pieces: '',
    nb_chambres: '',
    capacite: '',
    etage: '',
    description_courte: '',
    description_longue: '',
    prix_nuit: '',
    prix_semaine: '',
    prix_mois: '',
    caution: '',
    charges_incluses: false,
    taxe_sejour: false,
    disponible_du: '',
    type_location: 'Courte durée',
    duree_min: '1 nuit',
    equipements: [] as string[],
    photos: [] as string[],
    whatsapp: '',
    regles: '',
    animaux: 'Non',
    fumeurs: 'Non',
    fetes: 'Non',
    enfants: 'Oui',
    heure_arrivee: '',
    heure_depart: '',
  })

  const set = (key: string, value: any) => setData((d: any) => ({ ...d, [key]: value }))

  const toggleEquipement = (id: string) => {
    setData((d: any) => ({
      ...d,
      equipements: d.equipements.includes(id)
        ? d.equipements.filter((e: string) => e !== id)
        : [...d.equipements, id],
    }))
  }

  const validateStep = (s: number) => {
    if (s === 1) {
      if (!data.titre.trim()) return 'Le titre est requis'
      if (!data.ville.trim()) return 'La ville est requise'
      if (!data.code_postal.trim()) return 'Le code postal est requis'
      if (!data.surface) return 'La surface est requise'
      if (!data.nb_pieces) return 'Le nombre de pièces est requis'
      if (!data.nb_chambres) return 'Le nombre de chambres est requis'
      if (!data.capacite) return 'La capacité est requise'
    }
    if (s === 3) {
      if (!data.prix_nuit) return 'Le prix par nuit est requis'
    }
    if (s === 6) {
      if (data.photos.length === 0) return 'Au moins 1 photo est requise'
    }
    if (s === 7) {
      if (!data.whatsapp.trim()) return 'Le numéro WhatsApp est requis'
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
    const err = validateStep(7)
    if (err) { setError(err); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/save-vitrine', {
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
      router.push('/espace/ma-vitrine/succes')
    } catch (e) {
      setError('Une erreur est survenue')
      setLoading(false)
    }
  }

  return (
    <div style={{ background: GRAY, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select, textarea { font-family: inherit; }
      `}</style>

      <div style={{ background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/espace" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px 16px 60px' }}>
        <Link href="/espace" style={{ fontSize: 13, color: ORANGE, marginBottom: 16, display: 'inline-block' }}>← Retour à mon espace</Link>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: TEXT, marginBottom: 4 }}>Publier mon logement</h1>
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

          {step === 1 && <Step1 data={data} set={set} />}
          {step === 2 && <Step2 data={data} set={set} />}
          {step === 3 && <Step3 data={data} set={set} />}
          {step === 4 && <Step4 data={data} set={set} />}
          {step === 5 && <Step5 data={data} toggleEquipement={toggleEquipement} />}
          {step === 6 && <Step6 data={data} set={set} />}
          {step === 7 && <Step7 data={data} set={set} />}
          {step === 8 && <Step8 data={data} />}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, gap: 12 }}>
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} style={{ padding: '12px 20px', borderRadius: 10, background: GRAY, color: TEXT_DIM, fontSize: 14, fontWeight: 600 }}>
                ← Retour
              </button>
            ) : <div />}
            {step < totalSteps ? (
              <button onClick={handleNext} style={{ padding: '12px 24px', borderRadius: 10, background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700 }}>
                Continuer →
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} style={{ padding: '12px 24px', borderRadius: 10, background: ORANGE, color: WHITE, fontSize: 14, fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Envoi en cours...' : '✓ Publier mon annonce'}
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

function Input({ value, onChange, placeholder, type = 'text' }: { value: any, onChange: (v: any) => void, placeholder?: string, type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14 }}
    />
  )
}

function Select({ value, onChange, options }: { value: string, onChange: (v: string) => void, options: string[] }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, background: WHITE }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function Textarea({ value, onChange, placeholder, rows = 4 }: { value: string, onChange: (v: string) => void, placeholder?: string, rows?: number }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{ width: '100%', padding: '11px 14px', borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 14, outline: 'none', color: TEXT, marginBottom: 14, resize: 'none' }}
    />
  )
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 16 }}>{children}</h2>
}

function Step1({ data, set }: any) {
  return (
    <div>
      <StepTitle>🏠 Informations générales</StepTitle>
      <Label>Titre de l'annonce</Label>
      <Input value={data.titre} onChange={v => set('titre', v)} placeholder="Appartement lumineux centre-ville" />
      <Label>Numéro d'enregistrement (optionnel)</Label>
      <Input value={data.numero_enregistrement} onChange={v => set('numero_enregistrement', v)} placeholder="Ex: 7500100123456" />
      <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: -10, marginBottom: 14 }}>Obligatoire dans certaines villes (Paris...) pour la location courte durée</p>
      <Label>Type de logement</Label>
      <Select value={data.type_logement} onChange={v => set('type_logement', v)} options={TYPES_LOGEMENT} />
      <Label>Ville</Label>
      <Input value={data.ville} onChange={v => set('ville', v)} placeholder="Strasbourg" />
      <Label>Code postal</Label>
      <Input value={data.code_postal} onChange={v => set('code_postal', v)} placeholder="67000" />
      <Label>Quartier (optionnel)</Label>
      <Input value={data.quartier} onChange={v => set('quartier', v)} placeholder="Centre historique" />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label>Surface (m²)</Label>
          <Input type="number" value={data.surface} onChange={v => set('surface', v)} placeholder="45" />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Étage</Label>
          <Input type="number" value={data.etage} onChange={v => set('etage', v)} placeholder="2" />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label>Pièces</Label>
          <Input type="number" value={data.nb_pieces} onChange={v => set('nb_pieces', v)} placeholder="3" />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Chambres</Label>
          <Input type="number" value={data.nb_chambres} onChange={v => set('nb_chambres', v)} placeholder="2" />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Capacité</Label>
          <Input type="number" value={data.capacite} onChange={v => set('capacite', v)} placeholder="4" />
        </div>
      </div>
    </div>
  )
}

function Step2({ data, set }: any) {
  return (
    <div>
      <StepTitle>📝 Description</StepTitle>
      <Label>Description courte (résumé, max 150 caractères)</Label>
      <Textarea value={data.description_courte} onChange={v => set('description_courte', v.slice(0, 150))} placeholder="Bel appartement rénové, idéal pour 2-4 personnes" rows={2} />
      <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: -10, marginBottom: 14 }}>{data.description_courte.length}/150</p>
      <Label>Description complète</Label>
      <Textarea value={data.description_longue} onChange={v => set('description_longue', v.slice(0, 1000))} placeholder="Décrivez votre logement en détail : ambiance, environnement, points forts..." rows={6} />
      <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: -10 }}>{data.description_longue.length}/1000</p>
    </div>
  )
}

function Step3({ data, set }: any) {
  return (
    <div>
      <StepTitle>💰 Tarifs</StepTitle>
      <Label>Prix par nuit (€)</Label>
      <Input type="number" value={data.prix_nuit} onChange={v => set('prix_nuit', v)} placeholder="65" />
      <Label>Prix par semaine (€) — optionnel</Label>
      <Input type="number" value={data.prix_semaine} onChange={v => set('prix_semaine', v)} placeholder="400" />
      <Label>Prix par mois (€) — optionnel</Label>
      <Input type="number" value={data.prix_mois} onChange={v => set('prix_mois', v)} placeholder="1200" />
      <Label>Caution (€) — optionnel</Label>
      <Input type="number" value={data.caution} onChange={v => set('caution', v)} placeholder="300" />
      <Checkbox checked={data.charges_incluses} onChange={v => set('charges_incluses', v)} label="Charges incluses" />
      <Checkbox checked={data.taxe_sejour} onChange={v => set('taxe_sejour', v)} label="Taxe de séjour en sus" />
    </div>
  )
}

function Step4({ data, set }: any) {
  return (
    <div>
      <StepTitle>📅 Disponibilité</StepTitle>
      <Label>Disponible à partir du</Label>
      <Input type="date" value={data.disponible_du} onChange={v => set('disponible_du', v)} />
      <Label>Type de location</Label>
      <Select value={data.type_location} onChange={v => set('type_location', v)} options={TYPES_LOCATION} />
      <Label>Durée minimum</Label>
      <Select value={data.duree_min} onChange={v => set('duree_min', v)} options={DUREES_MIN} />
    </div>
  )
}

function Step5({ data, toggleEquipement }: any) {
  return (
    <div>
      <StepTitle>✨ Équipements</StepTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {EQUIPEMENTS.map(eq => {
          const checked = data.equipements.includes(eq.id)
          return (
            <button key={eq.id} onClick={() => toggleEquipement(eq.id)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10, border: `1.5px solid ${checked ? ORANGE : BORDER}`, background: checked ? ORANGE_LIGHT : WHITE, textAlign: 'left' }}>
              <span style={{ fontSize: 16 }}>{eq.icon}</span>
              <span style={{ fontSize: 12, color: TEXT, fontWeight: checked ? 700 : 400 }}>{eq.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Step6({ data, set }: any) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (file: File) => {
    if (data.photos.length >= 10) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload-photo', { method: 'POST', body: formData })
      const result = await res.json()
      if (result.url) set('photos', [...data.photos, result.url])
    } catch (e) { console.error(e) }
    setUploading(false)
  }

  const removePhoto = (url: string) => {
    set('photos', data.photos.filter((p: string) => p !== url))
  }

  return (
    <div>
      <StepTitle>📸 Photos ({data.photos.length}/10)</StepTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
        {data.photos.map((url: string, i: number) => (
          <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button onClick={() => removePhoto(url)} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.6)', color: WHITE, borderRadius: '50%', width: 22, height: 22, fontSize: 12 }}>✕</button>
            {i === 0 && <span style={{ position: 'absolute', bottom: 4, left: 4, background: ORANGE, color: WHITE, fontSize: 9, fontWeight: 700, borderRadius: 6, padding: '2px 6px' }}>Principale</span>}
          </div>
        ))}
        {data.photos.length < 10 && (
          <div
            onClick={() => !uploading && document.getElementById('photo-upload')?.click()}
            style={{ aspectRatio: '1', borderRadius: 10, border: `2px dashed ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexDirection: 'column', gap: 4 }}
          >
            {uploading ? (
              <span style={{ fontSize: 11, color: TEXT_DIM }}>...</span>
            ) : (
              <>
                <span style={{ fontSize: 24, color: TEXT_DIM }}>+</span>
                <span style={{ fontSize: 10, color: TEXT_DIM }}>Ajouter</span>
              </>
            )}
          </div>
        )}
      </div>
      <input id="photo-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f) }} />
      <p style={{ fontSize: 11, color: TEXT_DIM }}>La première photo sera votre photo principale. JPG, PNG ou WEBP, 5MB max.</p>
    </div>
  )
}

function Step7({ data, set }: any) {
  return (
    <div>
      <StepTitle>📞 Contact & Règles</StepTitle>
      <Label>Numéro WhatsApp</Label>
      <Input value={data.whatsapp} onChange={v => set('whatsapp', v)} placeholder="+33 6 12 34 56 78" />
      <p style={{ fontSize: 11, color: TEXT_DIM, marginTop: -10, marginBottom: 14 }}>Visible uniquement par les membres inscrits</p>
      <Label>Règlement intérieur (optionnel)</Label>
      <Textarea value={data.regles} onChange={v => set('regles', v)} placeholder="Règles spécifiques à votre logement..." rows={3} />
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <Label>Heure d'arrivée</Label>
          <Input value={data.heure_arrivee} onChange={v => set('heure_arrivee', v)} placeholder="15h00" />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Heure de départ</Label>
          <Input value={data.heure_depart} onChange={v => set('heure_depart', v)} placeholder="11h00" />
        </div>
      </div>
      <Label>Animaux</Label>
      <Select value={data.animaux} onChange={v => set('animaux', v)} options={['Non', 'Oui', 'Sur demande']} />
      <Label>Fumeurs</Label>
      <Select value={data.fumeurs} onChange={v => set('fumeurs', v)} options={['Non', 'Oui']} />
      <Label>Fêtes</Label>
      <Select value={data.fetes} onChange={v => set('fetes', v)} options={['Non', 'Oui']} />
      <Label>Enfants</Label>
      <Select value={data.enfants} onChange={v => set('enfants', v)} options={['Oui', 'Non', 'Sur demande']} />
    </div>
  )
}

function Step8({ data }: any) {
  return (
    <div>
      <StepTitle>✅ Récapitulatif</StepTitle>
      <div style={{ background: GRAY, borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{data.titre || 'Sans titre'}</p>
        <p style={{ fontSize: 13, color: TEXT_DIM }}>{data.type_logement} · {data.ville} · {data.surface}m²</p>
        <p style={{ fontSize: 16, fontWeight: 800, color: ORANGE, marginTop: 8 }}>{data.prix_nuit}€/nuit</p>
        <p style={{ fontSize: 12, color: TEXT_DIM, marginTop: 8 }}>{data.photos.length} photo(s)</p>
        {data.numero_enregistrement && (
          <p style={{ fontSize: 12, color: TEXT_DIM, marginTop: 4 }}>N° enregistrement : {data.numero_enregistrement}</p>
        )}
      </div>
      <div style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}`, borderRadius: 12, padding: 16 }}>
        <p style={{ fontSize: 13, color: ORANGE, lineHeight: 1.6 }}>
          ⏳ Votre annonce sera vérifiée par notre équipe avant publication.
          Vous recevrez un email dès qu'elle sera en ligne (généralement sous 24-48h).
        </p>
      </div>
    </div>
  )
}

function Checkbox({ checked, onChange, label }: { checked: boolean, onChange: (v: boolean) => void, label: string }) {
  return (
    <button onClick={() => onChange(!checked)} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, background: 'transparent' }}>
      <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? ORANGE : BORDER}`, background: checked ? ORANGE : WHITE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {checked && <span style={{ color: WHITE, fontSize: 12 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: TEXT }}>{label}</span>
    </button>
  )
}