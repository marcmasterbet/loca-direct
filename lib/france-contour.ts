import carte from '@/public/carte-france.json'

// Contour de la France métropolitaine (Corse comprise), en tracé SVG,
// pour les images de partage (Facebook, WhatsApp…).

export const BORNES = { ouest: -5.3, est: 9.7, nord: 51.2, sud: 41.3 }
const LAT_MOY = ((BORNES.nord + BORNES.sud) / 2) * (Math.PI / 180)

/** Projette [lng, lat] dans un cadre de largeur × hauteur (France centrée, proportions gardées) */
export function projeteur(largeur: number, hauteur: number, marge = 0) {
  const lx = (BORNES.est - BORNES.ouest) * Math.cos(LAT_MOY)
  const ly = BORNES.nord - BORNES.sud
  const echelle = Math.min((largeur - 2 * marge) / lx, (hauteur - 2 * marge) / ly)
  const dx = (largeur - lx * echelle) / 2
  const dy = (hauteur - ly * echelle) / 2
  return ([lng, lat]: [number, number]): [number, number] => [
    Math.round((dx + (lng - BORNES.ouest) * Math.cos(LAT_MOY) * echelle) * 10) / 10,
    Math.round((dy + (BORNES.nord - lat) * echelle) * 10) / 10,
  ]
}

type Geo = { features: { properties: { role: string }; geometry: { type: string; coordinates: number[][][][] } }[] }

export function traceFrance(largeur: number, hauteur: number, marge = 0): string {
  const p = projeteur(largeur, hauteur, marge)
  const france = (carte as unknown as Geo).features.find(f => f.properties.role === 'france')
  if (!france) return ''
  return france.geometry.coordinates
    .map(poly => poly[0])
    .filter(anneau =>
      anneau.some(([lng, lat]) => lng > BORNES.ouest && lng < BORNES.est && lat > BORNES.sud && lat < BORNES.nord)
    )
    .map(anneau => 'M' + anneau.map(c => p(c as [number, number]).join(',')).join('L') + 'Z')
    .join('')
}
