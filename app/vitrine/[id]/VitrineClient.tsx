'use client'

import { useState } from 'react'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const GREEN = '#16A34A'

const EQUIPEMENTS_LABELS: Record<string, { icon: string, label: string }> = {
  wifi: { icon: '📶', label: 'WiFi' },
  parking: { icon: '🅿️', label: 'Parking' },
  piscine: { icon: '🌊', label: 'Piscine' },
  baignoire: { icon: '🛁', label: 'Baignoire' },
  douche: { icon: '🚿', label: 'Douche' },
  cuisine: { icon: '🍳', label: 'Cuisine équipée' },
  lave_linge: { icon: '🧺', label: 'Lave-linge' },
  seche_linge: { icon: '🌀', label: 'Sèche-linge' },
  clim: { icon: '❄️', label: 'Climatisation' },
  chauffage: { icon: '🔥', label: 'Chauffage' },
  tv: { icon: '📺', label: 'Télévision' },
  sport: { icon: '🏋️', label: 'Salle de sport' },
  animaux: { icon: '🐾', label: 'Animaux acceptés' },
  fumeurs: { icon: '🚬', label: 'Fumeurs acceptés' },
  handicap: { icon: '♿', label: 'Accès handicapé' },
  vue_mer: { icon: '🏖️', label: 'Vue mer' },
  vue_montagne: { icon: '🏔️', label: 'Vue montagne' },
  vue_ville: { icon: '🌇', label: 'Vue ville' },
  jardin: { icon: '🌿', label: 'Jardin / Terrasse' },
  barbecue: { icon: '🅱️', label: 'Barbecue' },
  ascenseur: { icon: '🛗', label: 'Ascenseur' },
  digicode: { icon: '🔒', label: 'Accès autonome' },
}

const statutInfo: Record<string, { label: string, color: string, bg: string }> = {
  active: { label: '✅ Disponible', color: GREEN, bg: '#F0FDF4' },
  deja_loue: { label: '🔴 Déjà loué', color: '#DC2626', bg: '#FEF2F2' },
  bientot_dispo: { label: '🟡 Bientôt disponible', color: '#D97706', bg: '#FFFBEB' },
  en_attente: { label: '⏳ En cours de vérification', color: '#D97706', bg: '#FFFBEB' },
  suspendue: { label: '⏸️ Indisponible', color: TEXT_DIM, bg: GRAY },
}

export default function VitrineClient({ vitrine }: { vitrine: any }) {
  const [photoIndex, setPhotoIndex] = useState(0)

  const photos = vitrine.photos || []
  const equipements = vitrine.equipements || []
  const regles = vitrine.regles || {}
  const statut = statutInfo[vitrine.statut] || statutInfo.suspendue
  const canContact = vitrine.statut === 'active'

  const whatsappLink = `https://wa.me/${(vitrine.whatsapp || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour, je suis intéressé(e) par votre annonce "${vitrine.titre}" sur LocaDirect.`)}`

  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        button { font-family: inherit; cursor: pointer; border: none; }
        .grid-equip { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (min-width: 640px) { .grid-equip { grid-template-columns: 1fr 1fr 1fr; } }

        .photo-outer { padding: 0; background: ${GRAY}; }
        @media (min-width: 640px) { .photo-outer { padding: 16px 20px 0; } }

        .photo-main-wrap { position: relative; width: 100%; max-width: 700px; margin: 0 auto; aspect-ratio: 4 / 3; background: #e5e5e5; overflow: hidden; }
        @media (min-width: 640px) { .photo-main-wrap { aspect-ratio: 16 / 9; border-radius: 16px; } }

        .photo-main-img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; image-rendering: auto; }

        .photo-thumbs { display: flex; gap: 6px; padding: 10px 16px; overflow-x: auto; max-width: 700px; margin: 0 auto; }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: WHITE, zIndex: 10 }}>
        <Link href="/espace" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
        <Link href="/espace" style={{ fontSize: 13, color: TEXT_DIM }}>← Retour</Link>
      </div>

      {/* GALERIE PHOTOS */}
      <div className="photo-outer">
        <div className="photo-main-wrap">
          {photos.length > 0 ? (
            <>
              <img
                src={photos[photoIndex]}
                alt={vitrine.titre}
                className="photo-main-img"
                style={{ cursor: photos.length > 1 ? 'pointer' : 'default' }}
                onClick={() => photos.length > 1 && setPhotoIndex(i => (i + 1) % photos.length)}
              />
              {photos.length > 1 && (
                <>
                  <div style={{ position: 'absolute', bottom: 12, right: 12, background: 'rgba(0,0,0,0.6)', color: WHITE, fontSize: 12, fontWeight: 600, borderRadius: 20, padding: '4px 12px' }}>
                    {photoIndex + 1} / {photos.length}
                  </div>
                  <button onClick={() => setPhotoIndex(i => (i - 1 + photos.length) % photos.length)} style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 36, height: 36, fontSize: 16 }}>‹</button>
                  <button onClick={() => setPhotoIndex(i => (i + 1) % photos.length)} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: 36, height: 36, fontSize: 16 }}>›</button>
                </>
              )}
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 48 }}>🏠</span>
            </div>
          )}
        </div>

        {/* Miniatures */}
        {photos.length > 1 && (
          <div className="photo-thumbs">
            {photos.map((p: string, i: number) => (
              <img
                key={i}
                src={p}
                onClick={() => setPhotoIndex(i)}
                style={{ width: 56, height: 56, borderRadius: 8, objectFit: 'cover', flexShrink: 0, cursor: 'pointer', border: i === photoIndex ? `2px solid ${ORANGE}` : '2px solid transparent' }}
              />
            ))}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px 20px 100px' }}>

        {/* Statut */}
        <div style={{ display: 'inline-block', background: statut.bg, color: statut.color, borderRadius: 20, padding: '6px 14px', fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
          {statut.label}
        </div>

        {/* Titre & lieu */}
        <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 6 }}>{vitrine.titre}</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 6 }}>
          {vitrine.type_logement} · {vitrine.ville} {vitrine.quartier && `(${vitrine.quartier})`} · {vitrine.surface}m²
        </p>
        {vitrine.numero_enregistrement && (
          <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 16 }}>📋 N° d'enregistrement : {vitrine.numero_enregistrement}</p>
        )}

        {/* Prix */}
        <div style={{ background: ORANGE_LIGHT, borderRadius: 14, padding: 18, marginBottom: 20, marginTop: vitrine.numero_enregistrement ? 0 : 10 }}>
          <p style={{ fontSize: 26, fontWeight: 800, color: ORANGE }}>
            {vitrine.prix_nuit}€<span style={{ fontSize: 14, fontWeight: 400, color: TEXT_DIM }}>/nuit</span>
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 6, flexWrap: 'wrap' }}>
            {vitrine.prix_semaine && <p style={{ fontSize: 13, color: TEXT_DIM }}>{vitrine.prix_semaine}€/semaine</p>}
            {vitrine.prix_mois && <p style={{ fontSize: 13, color: TEXT_DIM }}>{vitrine.prix_mois}€/mois</p>}
          </div>
        </div>

        {/* Infos clés */}
        <div className="grid-equip" style={{ marginBottom: 24 }}>
          <InfoBox icon="👥" label="Capacité" value={`${vitrine.capacite || '-'} pers.`} />
          <InfoBox icon="🛏️" label="Chambres" value={`${vitrine.nb_chambres || '-'}`} />
          <InfoBox icon="🚪" label="Pièces" value={`${vitrine.nb_pieces || '-'}`} />
        </div>

        {/* Description */}
        {vitrine.description_longue && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Description</h2>
            <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{vitrine.description_longue}</p>
          </div>
        )}

        {/* Équipements */}
        {equipements.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Équipements</h2>
            <div className="grid-equip">
              {equipements.map((id: string) => {
                const eq = EQUIPEMENTS_LABELS[id]
                if (!eq) return null
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: GRAY, borderRadius: 10 }}>
                    <span style={{ fontSize: 16 }}>{eq.icon}</span>
                    <span style={{ fontSize: 13, color: TEXT }}>{eq.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Règles */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Règles du logement</h2>
          <div style={{ background: GRAY, borderRadius: 14, padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {regles.heure_arrivee && <RuleRow label="Arrivée" value={regles.heure_arrivee} />}
            {regles.heure_depart && <RuleRow label="Départ" value={regles.heure_depart} />}
            <RuleRow label="Animaux" value={regles.animaux || 'Non précisé'} />
            <RuleRow label="Fumeurs" value={regles.fumeurs || 'Non précisé'} />
            <RuleRow label="Fêtes" value={regles.fetes || 'Non précisé'} />
            <RuleRow label="Enfants" value={regles.enfants || 'Non précisé'} />
            {regles.texte && (
              <p style={{ fontSize: 13, color: TEXT, lineHeight: 1.6, marginTop: 8, paddingTop: 8, borderTop: `1px solid ${BORDER}` }}>{regles.texte}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
          {canContact ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Intéressé par ce logement ?</p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: WHITE, borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700 }}>
                💬 Contacter sur WhatsApp
              </a>
            </>
          ) : (
            <p style={{ fontSize: 14, color: TEXT_DIM, textAlign: 'center' }}>
              Ce logement n'est pas disponible au contact pour le moment.
            </p>
          )}
        </div>

        {/* Signalement */}
        <button style={{ background: 'transparent', color: TEXT_DIM, fontSize: 12, textDecoration: 'underline', display: 'block', margin: '0 auto 20px' }}>
          ⚑ Signaler cette annonce
        </button>

        {/* Bandeau Mon Tableau Digital */}
        <div style={{ background: GRAY, borderRadius: 16, padding: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 10 }}>🖼️ Vous êtes hébergeur Airbnb ?</p>
          <p style={{ fontSize: 13, color: TEXT, marginBottom: 14 }}>Offrez un guide digital premium à vos voyageurs</p>
          <a href="https://montableaudigital.fr" target="_blank" rel="noreferrer" style={{ fontSize: 13, color: ORANGE, fontWeight: 700 }}>
            Découvrir Mon Tableau Digital →
          </a>
        </div>

      </div>
    </div>
  )
}

function InfoBox({ icon, label, value }: { icon: string, label: string, value: string }) {
  return (
    <div style={{ background: GRAY, borderRadius: 12, padding: 14, textAlign: 'center' }}>
      <p style={{ fontSize: 20, marginBottom: 4 }}>{icon}</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{value}</p>
      <p style={{ fontSize: 11, color: TEXT_DIM }}>{label}</p>
    </div>
  )
}

function RuleRow({ label, value }: { label: string, value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 13, color: TEXT_DIM }}>{label}</span>
      <span style={{ fontSize: 13, color: TEXT, fontWeight: 600 }}>{value}</span>
    </div>
  )
}