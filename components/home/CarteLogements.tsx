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

// On ne peut pas sortir de la France : la carte bloque le déplacement au-delà.
// Large à l'ouest (pour caler la France à droite du bloc de recherche) et en hauteur
// (pour qu'elle tienne entière sur un téléphone en plein écran).
const LIMITES: [[number, number], [number, number]] = [
  [-28, 28],
  [22, 62],
]

// Contour de la France métropolitaine (Natural Earth) : tout ce qui est hors de France
// est recouvert, pour n'afficher que la France. Le cache s'efface quand on zoome
// sur une ville, pour ne jamais masquer une côte.
const CONTOUR_FRANCE = '/carte-france.json'
const COULEUR_HORS_FRANCE = '#eceaf4'

// Sur grand écran, le bloc de recherche recouvre la gauche de la carte :
// on cale la France à sa droite.
function marges(pleinEcran: boolean) {
  if (typeof window === 'undefined' || pleinEcran || window.innerWidth < 1024) {
    return { top: 70, bottom: 30, left: 20, right: 20 }
  }
  // Même calcul que la position du bloc de recherche sur la page d'accueil.
  const bordDroitDuBloc = Math.max(32, (window.innerWidth - 1280) / 2 + 32) + 500
  if (window.innerWidth - bordDroitDuBloc < 420) return { top: 90, bottom: 30, left: 20, right: 20 }
  return { top: 90, bottom: 40, left: bordDroitDuBloc + 40, right: 60 }
}

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

// Groupe de logements : une pastille ronde avec le nombre, plus grosse quand il y en a beaucoup.
function bulleGroupe(nombre: number) {
  const el = document.createElement('button')
  el.type = 'button'
  el.textContent = String(nombre)
  el.title = `${nombre} logements`
  el.setAttribute('aria-label', `${nombre} logements à cet endroit, zoomer pour les voir`)
  const taille = nombre < 5 ? 34 : nombre < 15 ? 40 : 48
  el.style.width = `${taille}px`
  el.style.height = `${taille}px`
  el.className =
    'flex items-center justify-center rounded-full bg-ink text-[14px] font-extrabold text-white shadow-[0_0_0_5px_rgba(85,52,232,0.25),0_4px_12px_rgba(23,22,42,0.3)] ring-2 ring-white hover:bg-brand'
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
  const enveloppe = useRef<HTMLDivElement>(null)
  const conteneur = useRef<HTMLDivElement>(null)
  const [pleinEcran, setPleinEcran] = useState(false)
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
        fitBoundsOptions: { padding: marges(false) },
        maxBounds: LIMITES,
        attributionControl: { compact: true },
        cooperativeGestures: true,
        dragRotate: false,
        pitchWithRotate: false,
      })
      map.touchZoomRotate.disableRotation()
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')
      // Tant que le visiteur n'a pas touché la carte, on la recadre sur la France
      // quand sa taille change (fenêtre redimensionnée, téléphone tourné…).
      let touchee = false
      map.on('dragstart', () => { touchee = true })
      map.on('zoomstart', e => { if (e.originalEvent) touchee = true })
      map.on('resize', () => {
        if (!touchee) map.fitBounds(FRANCE, { padding: marges(false), duration: 0 })
      })
      map.on('load', () => {
        // Pas de dézoom au-delà de la France entière.
        map.setMinZoom(Math.max(3.5, map.getZoom() - 0.4))
        map.addSource('contour-france', { type: 'geojson', data: CONTOUR_FRANCE })
        map.addLayer({
          id: 'hors-france',
          type: 'fill',
          source: 'contour-france',
          filter: ['==', ['get', 'role'], 'masque'],
          paint: {
            'fill-color': COULEUR_HORS_FRANCE,
            'fill-opacity': ['interpolate', ['linear'], ['zoom'], 8, 1, 10, 0],
          },
        })
        map.addLayer({
          id: 'bord-france',
          type: 'line',
          source: 'contour-france',
          filter: ['==', ['get', 'role'], 'france'],
          paint: {
            'line-color': '#c9bffb',
            'line-width': 1.5,
            'line-opacity': ['interpolate', ['linear'], ['zoom'], 8, 1, 10, 0],
          },
        })
        setPrete(true)
      })
      carte.current = map
    })
    return () => {
      annule = true
      carte.current?.remove()
      carte.current = null
    }
  }, [])

  // Plein écran : la carte prend toute la fenêtre (fonctionne aussi sur iPhone,
  // contrairement au plein écran du navigateur). On déplace la carte d'un doigt.
  useEffect(() => {
    const map = carte.current
    if (!map) return
    map.resize()
    // On recadre sur la France entière à chaque ouverture ou fermeture.
    map.fitBounds(FRANCE, { padding: marges(pleinEcran), duration: 0 })
    if (pleinEcran) map.cooperativeGestures.disable()
    else map.cooperativeGestures.enable()
    if (!pleinEcran) return
    const avant = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const echap = (e: KeyboardEvent) => e.key === 'Escape' && setPleinEcran(false)
    window.addEventListener('keydown', echap)
    return () => {
      document.body.style.overflow = avant
      window.removeEventListener('keydown', echap)
    }
  }, [pleinEcran, prete])

  // Regroupement des logements proches : « 5 logements », qui se sépare quand on zoome.
  const index = useMemo(() => {
    const sc = new Supercluster<PointLogement>({ radius: 60, maxZoom: ZOOM_MAX_GROUPES })
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

  const bouton = 'rounded-[10px] px-3.5 py-2'

  return (
    <div
      ref={enveloppe}
      className={pleinEcran ? 'fixed inset-0 z-[60] bg-white' : 'relative h-full w-full overflow-hidden lg:rounded-none'}
    >
      <div
        ref={conteneur}
        role="region"
        aria-label="Carte des logements en France"
        className="h-full w-full bg-[#eceaf4]"
      />

      <div
        className={`pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap items-start justify-between gap-2 ${
          pleinEcran ? '' : 'lg:left-auto lg:right-6 lg:top-6 lg:justify-end'
        }`}
      >
        <div
          role="group"
          aria-label="Afficher sur la carte"
          className="pointer-events-auto flex gap-1 rounded-[14px] bg-white p-1 text-sm font-bold shadow-[0_6px_20px_rgba(23,22,42,0.15)]"
        >
          <button
            type="button"
            aria-pressed={filtre === 'tous'}
            onClick={() => setFiltre('tous')}
            className={`${bouton} ${filtre === 'tous' ? 'bg-brand text-white' : 'text-ink-soft hover:text-ink'}`}
          >
            Tous ({points.length})
          </button>
          <button
            type="button"
            aria-pressed={filtre === 'chien'}
            onClick={() => setFiltre('chien')}
            className={`${bouton} ${filtre === 'chien' ? 'bg-[#ffcf4d] text-ink' : 'text-ink-soft hover:text-ink'}`}
          >
            Chien accepté ({points.filter(p => p.chien).length})
          </button>
        </div>
        <button
          type="button"
          onClick={() => setPleinEcran(v => !v)}
          aria-pressed={pleinEcran}
          className="pointer-events-auto rounded-[14px] bg-white px-3.5 py-3 text-sm font-bold text-ink shadow-[0_6px_20px_rgba(23,22,42,0.15)] hover:text-brand"
        >
          {pleinEcran ? 'Fermer' : 'Plein écran'}
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-2 left-3 z-10 max-w-[60%] rounded-lg bg-white/85 px-2 py-1 text-[11px] text-ink-soft">
        Logements placés au centre de leur commune
      </p>
    </div>
  )
}
