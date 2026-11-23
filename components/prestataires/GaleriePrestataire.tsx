'use client'

import { useState } from 'react'
import Image from 'next/image'
import PhotoLightbox from '@/components/PhotoLightbox'

/** Flyer et photos du prestataire, agrandis au clic */
export default function GaleriePrestataire({ images, nom }: { images: string[]; nom: string }) {
  const [ouverte, setOuverte] = useState<number | null>(null)
  if (!images.length) return null
  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {images.map((src, i) => (
          <li key={src + i}>
            <button
              type="button"
              onClick={() => setOuverte(i)}
              aria-label={`Agrandir l’image ${i + 1} de ${nom}`}
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-surface"
            >
              <Image src={src} alt="" fill sizes="(max-width: 640px) 50vw, 260px" className="object-cover hover:opacity-90" />
            </button>
          </li>
        ))}
      </ul>
      {ouverte !== null && <PhotoLightbox photos={images} startIndex={ouverte} onClose={() => setOuverte(null)} />}
    </>
  )
}
