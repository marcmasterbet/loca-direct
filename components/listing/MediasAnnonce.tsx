'use client'

import { useState } from 'react'
import { lireVideo, lireVisite3d, type Media } from '@/lib/medias'
import { trackEvent } from '@/lib/analytics'

/**
 * Vidéo et visite 3D d'une annonce. Rien n'est chargé chez YouTube, Matterport…
 * avant le clic du visiteur : page plus rapide, et aucun cookie tiers sans action de sa part.
 */
export default function MediasAnnonce({ video, visite, photo, titre }: { video?: string | null; visite?: string | null; photo?: string; titre: string }) {
  const medias = [lireVisite3d(visite), lireVideo(video)].filter((m): m is Media => !!m)
  if (!medias.length) return null
  return (
    <section id="visite" className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-balance text-[22px] font-bold tracking-[-0.02em]">
        {medias.some(m => m.type === 'visite') ? 'Visitez le logement' : 'Le logement en vidéo'}
      </h2>
      {medias.map(m => (
        <Lecteur key={m.embed} media={m} photo={photo} titre={titre} />
      ))}
    </section>
  )
}

function Lecteur({ media, photo, titre }: { media: Media; photo?: string; titre: string }) {
  const [actif, setActif] = useState(false)
  // Vidéo hébergée chez LocaDirect : lecteur du navigateur, rien n'est chargé avant « lecture »
  if (media.type === 'fichier') {
    return (
      <video
        src={media.embed}
        poster={photo}
        controls
        playsInline
        preload="none"
        aria-label={`Vidéo : ${titre}`}
        onPlay={() => trackEvent('video', { source: 'fichier' })}
        className="aspect-video w-full rounded-[22px] bg-night object-contain"
      />
    )
  }
  const libelle = media.type === 'visite' ? 'Lancer la visite 3D' : 'Lire la vidéo'
  return (
    <div className="relative aspect-video overflow-hidden rounded-[22px] bg-night">
      {actif ? (
        <iframe
          src={media.embed}
          title={`${media.type === 'visite' ? 'Visite 3D' : 'Vidéo'} : ${titre}`}
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; xr-spatial-tracking; gyroscope; accelerometer; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            setActif(true)
            trackEvent(media.type === 'visite' ? 'visite_3d' : 'video', { source: media.source })
          }}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-white"
        >
          {photo && (
            // Image de fond décorative : la photo principale, assombrie
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
          )}
          <span className="relative flex min-h-[56px] items-center gap-2.5 rounded-full bg-white px-6 text-base font-bold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.2)] group-hover:bg-brand-soft">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {media.type === 'visite' ? (
                <path d="M12 3 3 8v8l9 5 9-5V8l-9-5Zm0 0v18M3 8l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              ) : (
                <path d="M8 5v14l11-7L8 5Z" fill="currentColor" />
              )}
            </svg>
            {libelle}
          </span>
          <span className="relative text-sm font-semibold text-white/90">{media.source}</span>
        </button>
      )}
    </div>
  )
}
