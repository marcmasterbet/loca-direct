'use client'

import { useEffect, useState } from 'react'

const WHITE = '#FFFFFF'

type PhotoLightboxProps = {
  photos: string[]
  startIndex: number
  onClose: () => void
}

/**
 * Visionneuse plein écran réutilisable.
 * Usage : gérer un état `lightboxIndex: number | null` dans la page parente,
 * puis afficher <PhotoLightbox photos={...} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
 * quand lightboxIndex !== null.
 */
export default function PhotoLightbox({ photos, startIndex, onClose }: PhotoLightboxProps) {
  const [index, setIndex] = useState(startIndex)

  useEffect(() => {
    setIndex(startIndex)
  }, [startIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + photos.length) % photos.length)
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [photos.length, onClose])

  if (photos.length === 0) return null

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i - 1 + photos.length) % photos.length)
  }
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIndex(i => (i + 1) % photos.length)
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.92)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          color: WHITE,
          fontSize: 22,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Fermer"
      >
        ✕
      </button>

      {/* Compteur */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: WHITE,
          fontSize: 14,
          fontWeight: 600,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 20,
          padding: '6px 16px',
        }}
      >
        {index + 1} / {photos.length}
      </div>

      {/* Flèche précédente */}
      {photos.length > 1 && (
        <button
          onClick={goPrev}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            color: WHITE,
            fontSize: 24,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Photo précédente"
        >
          ‹
        </button>
      )}

      {/* Image */}
      <img
        src={photos[index]}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '92vw',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: 8,
        }}
      />

      {/* Flèche suivante */}
      {photos.length > 1 && (
        <button
          onClick={goNext}
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            color: WHITE,
            fontSize: 24,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Photo suivante"
        >
          ›
        </button>
      )}

      {/* Miniatures en bas */}
      {photos.length > 1 && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8,
            maxWidth: '90vw',
            overflowX: 'auto',
            padding: '4px',
          }}
        >
          {photos.map((url, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: 48,
                height: 48,
                borderRadius: 6,
                overflow: 'hidden',
                border: i === index ? `2px solid ${WHITE}` : '2px solid transparent',
                opacity: i === index ? 1 : 0.5,
                padding: 0,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
