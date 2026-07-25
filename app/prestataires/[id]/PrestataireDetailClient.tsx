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

export default function PrestataireDetailClient({ prestataire, isLoggedIn }: { prestataire: any, isLoggedIn: boolean }) {
  const [lightbox, setLightbox] = useState<{ photos: string[]; index: number } | null>(null)

  const photos = prestataire.photos || []
  const allPhotos = [...(prestataire.flyer_url ? [prestataire.flyer_url] : []), ...photos]

  const rawPhone = (prestataire.whatsapp || '').replace(/[^0-9+]/g, '')
  const formattedPhone = rawPhone.startsWith('00') ? rawPhone.slice(2) : rawPhone.startsWith('0') ? '33' + rawPhone.slice(1) : rawPhone.startsWith('+') ? rawPhone.slice(1) : rawPhone
  const whatsappLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`Bonjour ${prestataire.prenom}, j'ai trouvé votre profil sur LocaDirect et je souhaite vous contacter.`)}`

  const siteWebUrl = prestataire.site_web
    ? prestataire.site_web.startsWith('http') ? prestataire.site_web : `https://${prestataire.site_web}`
    : null

  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`* { box-sizing: border-box; margin: 0; padding: 0; } a { text-decoration: none; } button { font-family: inherit; cursor: pointer; border: none; }`}</style>

      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: WHITE, zIndex: 10 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
          <span style={{ fontSize: 16, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
        <Link href="/prestataires" style={{ fontSize: 13, color: TEXT_DIM }}>← Annuaire</Link>
      </div>

      {/* FLYER PRINCIPAL */}
      {prestataire.flyer_url && (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '16px 20px 0' }}>
          <img
            src={prestataire.flyer_url}
            alt={`${prestataire.prenom} ${prestataire.nom}`}
            style={{ width: '100%', borderRadius: 16, display: 'block', cursor: 'zoom-in' }}
            onClick={() => setLightbox({ photos: allPhotos, index: 0 })}
          />
        </div>
      )}

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px 20px 100px' }}>

        {/* IDENTITÉ */}
        <p style={{ fontSize: 11, color: ORANGE, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{prestataire.activite}</p>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 6 }}>{prestataire.prenom} {prestataire.nom}</h1>
        <p style={{ fontSize: 14, color: TEXT_DIM, marginBottom: 16 }}>📍 {prestataire.ville}{prestataire.region ? ` (${prestataire.region})` : ''}</p>

        {/* TARIF */}
        <div style={{ background: ORANGE_LIGHT, borderRadius: 14, padding: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 20, fontWeight: 800, color: ORANGE }}>
            {prestataire.sur_devis ? 'Sur devis' : prestataire.tarif_horaire ? `${prestataire.tarif_horaire}€/h` : 'Tarif non précisé'}
          </p>
        </div>

        {/* DESCRIPTION */}
        {prestataire.description && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10 }}>À propos</h2>
            <p style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prestataire.description}</p>
          </div>
        )}

        {/* PHOTOS DE RÉALISATIONS */}
        {photos.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: TEXT, marginBottom: 10 }}>Réalisations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {photos.map((url: string, i: number) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden', cursor: 'zoom-in' }} onClick={() => setLightbox({ photos: allPhotos, index: prestataire.flyer_url ? i + 1 : i })}>
                  <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        <div style={{ background: ORANGE_LIGHT, border: `1px solid ${ORANGE}`, borderRadius: 16, padding: 20, marginBottom: 24 }}>
          {isLoggedIn ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 12 }}>Contacter ce prestataire</p>
              <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: WHITE, borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700, marginBottom: 10 }}>
                💬 Contacter sur WhatsApp
              </a>
              {prestataire.telephone && (
                <a href={`tel:${prestataire.telephone}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: WHITE, color: TEXT, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600, marginBottom: siteWebUrl ? 10 : 0 }}>
                  📞 Appeler : {prestataire.telephone}
                </a>
              )}
              {siteWebUrl && (
                <a href={siteWebUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: WHITE, color: ORANGE, border: `1.5px solid ${ORANGE}`, borderRadius: 12, padding: 12, fontSize: 14, fontWeight: 600 }}>
                  🌐 Voir le site du prestataire
                </a>
              )}
            </>
          ) : (
            <>
              <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8 }}>Intéressé par ce prestataire ?</p>
              <p style={{ fontSize: 13, color: TEXT_DIM, marginBottom: 14 }}>Inscrivez-vous gratuitement pour contacter ce prestataire directement.</p>
              <Link href="/inscription" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: ORANGE, color: WHITE, borderRadius: 12, padding: 14, fontSize: 15, fontWeight: 700 }}>
                🔓 S'inscrire pour contacter
              </Link>
            </>
          )}
        </div>
      </div>

      {lightbox && (
        <PhotoLightbox photos={lightbox.photos} startIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </div>
  )
}
