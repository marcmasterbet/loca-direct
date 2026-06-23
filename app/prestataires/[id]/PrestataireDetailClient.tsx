'use client'

import { useState } from 'react'
import Link from 'next/link'
import PhotoLightbox from '@/components/PhotoLightbox'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const WHATSAPP = '#25D366'

export default function PrestataireDetailClient({ prestataire: p }: { prestataire: any }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const whatsappLink = `https://wa.me/${p.whatsapp.replace(/[^0-9]/g, '')}`
  const telLink = `tel:${p.telephone.replace(/\s/g, '')}`
  const photos: string[] = p.photos || []

  // Galerie complète pour le lightbox : flyer en premier (s'il existe), puis les réalisations
  const allPhotos: string[] = [...(p.flyer_url ? [p.flyer_url] : []), ...photos]

  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; color: inherit; } button { font-family: inherit; cursor: pointer; border: none; }`}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px' }}>
        <Link href="/prestataires" style={{ fontSize: 14, color: ORANGE, fontWeight: 600 }}>← Retour à l'annuaire</Link>
      </nav>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '32px 20px 80px' }}>
        <div
          style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: GRAY, marginBottom: 24, cursor: p.flyer_url ? 'zoom-in' : 'default' }}
          onClick={() => p.flyer_url && setLightboxIndex(0)}
        >
          {p.flyer_url ? (
            <img src={p.flyer_url} alt={`${p.prenom} ${p.nom}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48 }}>🛠️</div>
          )}
        </div>

        <p style={{ fontSize: 11, color: ORANGE, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>{p.activite}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: TEXT, marginBottom: 8 }}>{p.prenom} {p.nom}</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 20 }}>📍 {p.ville}{p.region ? ` (${p.region})` : ''}</p>

        <p style={{ fontSize: 18, fontWeight: 800, color: ORANGE, marginBottom: 24 }}>
          {p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire}€/h` : 'Tarif non précisé'}
        </p>

        {p.description && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 10 }}>À propos</h2>
            <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{p.description}</p>
          </div>
        )}

        {photos.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Réalisations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {photos.map((url, i) => {
                // Index dans allPhotos = i + 1 si un flyer existe, sinon i
                const globalIndex = p.flyer_url ? i + 1 : i
                return (
                  <div
                    key={i}
                    style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden', background: GRAY, cursor: 'zoom-in' }}
                    onClick={() => setLightboxIndex(globalIndex)}
                  >
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: WHATSAPP, color: WHITE, borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700 }}>
            💬 WhatsApp
          </a>
          <a href={telLink} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ORANGE, color: WHITE, borderRadius: 12, padding: '14px', fontSize: 14, fontWeight: 700 }}>
            📞 Appeler
          </a>
        </div>

        <div style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}`, borderRadius: 12, padding: 16 }}>
          <p style={{ fontSize: 12, color: ORANGE, lineHeight: 1.6 }}>
            ✅ Profil vérifié par notre équipe LocaDirect.
          </p>
        </div>
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={allPhotos}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}
