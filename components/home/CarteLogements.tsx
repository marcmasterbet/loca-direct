'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as MapLibreMap, Marker } from 'maplibre-gl'
import Supercluster from 'supercluster'
import 'maplibre-gl/dist/maplibre-gl.css'

export type PointLogement = {
  id: string
  titre: string
  ville: string
  prix: number | null
  chien: boolean
  lngLat: [number, number]
}

type Filtre = 'tous' | 'chien'

// Emprise de la France métropolitaine, Corse comprise.
const FRANCE: [[number, number], [number, number]] = [
  [-5.3, 41.2],
  [9.7, 51.2],
]

// Fond de carte vectoriel gratuit et sans clé (OpenFreeMap, données OpenStreetMap).
const STYLE = 'https://tiles.openfreemap.org/styles/positron'

function etiquette(p: PointLogement) {
  const el = document.createElement('button')
  el.type = 'button'
  el.textContent = p.prix ? `${Math.round(p.prix)} €` : 'Voir'
  el.setAttribute('aria-label', `${p.titre}, ${p.ville}${p.prix ? `, ${Math.round(p.prix)} € la nuit` : ''}`)
  el.className = p.chien
    ? 'rounded-full bg-[#ffcf4d] px-2.5 py-1 text-[13px] font-extrabold text-ink shadow-[0_4px_12px_rgba(23,22,42,0.25)] ring-2 ring-white'
    : 'rounded-full bg-brand px-2.5 py-1 text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(23,22,42,0.25)] ring-2 ring-white'
  return el
}

function miniFiche(p: PointLogement) {
  const box = document.createElement('div')
  box.className = 'flex min-w-[200px] flex-col gap-1 font-sans text-ink'
  const titre = document.createElement('strong')
  titre.className = 'text-[15px]'
  titre.textContent = p.titre
  const lieu = document.createElement('span')
  lieu.className = 'text-[13px] text-muted'
  lieu.textContent = p.chien ? `${p.ville}, grand chien bienvenu` : p.ville
  const lien = document.createElement('a')
  lien.href = `/vitrine/${p.id}`
  lien.className = 'mt-2 rounded-[10px] bg-brand px-3 py-2 text-center text-[13px] font-bold text-white no-underline'
  lien.textContent = 'Voir le logement'
  box.append(titre, lieu, lien)
  return box
}

function bulleGroupe(nombre: number) {
  const el = document.createElement('button')
  el.type = 'button'
  el.textContent = `${nombre} logements`
  el.setAttribute('aria-label', `${nombre} logements à cet endroit, zoomer pour les voir`)
  el.className =
    'rounded-full bg-ink px-3 py-1.5 text-[13px] font-extrabold text-white shadow-[0_4px_12px_rgba(23,22,42,0.3)] ring-2 ring-white'
  return el
}

function listeCommune(liste: PointLogement[]) {
  const box = document.createElement('div')
  box.className = 'flex min-w-[220px] flex-col gap-2 font-sans text-ink'
  const titre = document.createElement('strong')
  titre.className = 'text-[15px]'
  titre.textContent = `${liste.length} logements à ${liste[0]?.ville ?? ''}`
  const items = document.createElement('div')
  items.className = '-m-1 flex max-h-[136px] flex-col gap-2 overflow-y-auto p-1'
  box.append(titre, items)
  for (const p of liste) {
    const a = document.createElement('a')
    a.href = `/vitrine/${p.id}`
    a.className = 'flex justify-between gap-3 rounded-[10px] bg-surface px-3 py-2 text-[13px] text-ink no-underline hover:bg-brand-soft'
    const nom = document.createElement('span')
    nom.textContent = p.chien ? `${p.titre} (chien accepté)` : p.titre
    const prix = document.createElement('strong')
    prix.className = 'shrink-0 whitespace-nowrap'
    prix.textContent = p.prix ? `${Math.round(p.prix)} €` : ''
    a.append(nom, prix)
    items.append(a)
  }
  return box
}

// Les repères sont ancrés par le bas : la fiche s'ouvre au-dessus sans les cacher.
const DECALAGE_POPUP: Record<'top' | 'bottom' | 'left' | 'right' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', [number, number]> = {
  center: [0, 0], top: [0, 6], 'top-left': [0, 6], 'top-right': [0, 6],
  bottom: [0, -44], 'bottom-left': [0, -44], 'bottom-right': [0, -44],
  left: [20, -20], right: [-20, -20],
}

// Au-delà de ce zoom, des logements encore groupés sont dans la même commune :
// on affiche leur liste au lieu de zoomer.
const ZOOM_MAX_GROUPES = 12

export default function CarteLogements({ points }: { points: PointLogement[] }) {
  const conteneur = useRef<HTMLDivElement>(null)
  const carte = useRef<MapLibreMap | null>(null)
  const reperes = useRef<Marker[]>([])
  const [prete, setPrete] = useState(false)
  const [filtre, setFiltre] = useState<Filtre>('tous')

  const visibles = useMemo(
    () => (filtre === 'chien' ? points.filter(p => p.chien) : points),
    [points, filtre]
  )

  // Création de la carte, une seule fois.
  useEffect(() => {
    let annule = false
    import('maplibre-gl').then(({ default: maplibregl }) => {
      if (annule || !conteneur.current) return
      const map = new maplibregl.Map({
        container: conteneur.current,
        style: STYLE,
        bounds: FRANCE,
        fitBoundsOptions: { padding: 24 },
        attributionControl: { compact: true },
        cooperativeGestures: true,
      })
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
      map.on('load', () => setPrete(true))
      carte.current = map
    })
    return () => {
      annule = true
      carte.current?.remove()
      carte.current = null
    }
  }, [])

  // Regroupement des logements proches : « 5 logements », qui se sépare quand on zoome.
  const index = useMemo(() => {
    const sc = new Supercluster<PointLogement>({ radius: 48, maxZoom: ZOOM_MAX_GROUPES })
    sc.load(visibles.map(p => ({ type: 'Feature', properties: p, geometry: { type: 'Point', coordinates: p.lngLat } })))
    return sc
  }, [visibles])

  // Repères, recalculés à chaque déplacement de la carte et à chaque changement de filtre.
  useEffect(() => {
    const map = carte.current
    if (!map || !prete) return
    let annule = false
    let maplib: typeof import('maplibre-gl') | null = null

    const dessiner = () => {
      if (annule || !maplib) return
      const lib = maplib
      reperes.current.forEach(m => m.remove())
      const b = map.getBounds()
      const groupes = index.getClusters([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()], Math.round(map.getZoom()))
      reperes.current = groupes.map(g => {
        const [lng, lat] = g.geometry.coordinates as [number, number]
        if ('cluster' in g.properties && g.properties.cluster) {
          const id = g.properties.cluster_id
          const el = bulleGroupe(g.properties.point_count)
          const repere = new lib.Marker({ element: el, anchor: 'bottom' }).setLngLat([lng, lat])
          const zoomSuivant = index.getClusterExpansionZoom(id)
          if (zoomSuivant > ZOOM_MAX_GROUPES) {
            const liste = index.getLeaves(id, Infinity).map(f => f.properties as PointLogement)
            repere.setPopup(new lib.Popup({ offset: DECALAGE_POPUP, maxWidth: '300px' }).setDOMContent(listeCommune(liste)))
          } else {
            el.addEventListener('click', e => {
              e.stopPropagation()
              map.easeTo({ center: [lng, lat], zoom: zoomSuivant })
            })
          }
          return repere.addTo(map)
        }
        const p = g.properties as PointLogement
        return new lib.Marker({ element: etiquette(p), anchor: 'bottom' })
          .setLngLat([lng, lat])
          .setPopup(new lib.Popup({ offset: DECALAGE_POPUP, closeButton: true, maxWidth: '260px' }).setDOMContent(miniFiche(p)))
          .addTo(map)
      })
    }

    import('maplibre-gl').then(({ default: lib }) => {
      maplib = lib
      dessiner()
    })
    map.on('moveend', dessiner)
    return () => {
      annule = true
      map.off('moveend', dessiner)
    }
  }, [index, prete])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Afficher sur la carte" className="flex gap-1.5 rounded-[14px] bg-white p-1.5 text-sm font-bold">
          <button
            type="button"
            aria-pressed={filtre === 'tous'}
            onClick={() => setFiltre('tous')}
            className={`rounded-[10px] px-3.5 py-2 ${filtre === 'tous' ? 'bg-brand text-white' : 'text-ink-soft hover:text-ink'}`}
          >
            Tous les logements
          </button>
          <button
            type="button"
            aria-pressed={filtre === 'chien'}
            onClick={() => setFiltre('chien')}
            className={`rounded-[10px] px-3.5 py-2 ${filtre === 'chien' ? 'bg-[#ffcf4d] text-ink' : 'text-ink-soft hover:text-ink'}`}
          >
            Chien accepté
          </button>
        </div>
        <span className="text-sm text-ink-soft">
          {visibles.length} logement{visibles.length > 1 ? 's' : ''} sur la carte
        </span>
      </div>
      <div
        ref={conteneur}
        role="region"
        aria-label="Carte des logements en France"
        className="h-[360px] w-full overflow-hidden rounded-[22px] bg-surface sm:h-[460px]"
      />
      <p className="text-xs text-muted">Les logements sont placés au centre de leur commune. L&apos;adresse exacte est donnée par le propriétaire.</p>
    </div>
  )
}
