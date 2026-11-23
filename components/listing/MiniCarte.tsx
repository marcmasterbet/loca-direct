'use client'

import { useEffect, useRef } from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'

const STYLE = 'https://tiles.openfreemap.org/styles/positron'

/**
 * Petite carte de la commune du logement. On montre une zone autour du centre
 * de la commune, jamais l'adresse exacte.
 */
export default function MiniCarte({ centre, ville }: { centre: [number, number]; ville: string }) {
  const conteneur = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let map: import('maplibre-gl').Map | null = null
    let annule = false
    import('maplibre-gl').then(maplibregl => {
      // MapLibre 6 : le « worker » est servi depuis /public (copié à l'installation)
      maplibregl.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs')
      if (annule || !conteneur.current) return
      map = new maplibregl.Map({
        container: conteneur.current,
        style: STYLE,
        center: centre,
        zoom: 11,
        minZoom: 7,
        maxZoom: 13,
        attributionControl: { compact: true },
        cooperativeGestures: true,
        dragRotate: false,
      })
      map.touchZoomRotate.disableRotation()
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => {
        if (!map) return
        map.addSource('zone', { type: 'geojson', data: { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: centre } } })
        map.addLayer({
          id: 'zone',
          type: 'circle',
          source: 'zone',
          paint: {
            // Un cercle d'environ 2 km de rayon, quelle que soit l'échelle
            'circle-radius': ['interpolate', ['exponential', 2], ['zoom'], 7, 2.4, 13, 151],
            'circle-color': '#5534e8',
            'circle-opacity': 0.14,
            'circle-stroke-color': '#5534e8',
            'circle-stroke-width': 2,
            'circle-stroke-opacity': 0.5,
          },
        })
      })
    })
    return () => {
      annule = true
      map?.remove()
    }
  }, [centre])

  return (
    <div
      ref={conteneur}
      role="region"
      aria-label={`Carte de ${ville}`}
      className="h-[280px] w-full overflow-hidden rounded-[22px] bg-surface sm:h-[340px]"
    />
  )
}
