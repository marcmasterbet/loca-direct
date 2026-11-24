// Vidéo et visite 3D des annonces : on n'intègre que des services connus,
// pour ne jamais afficher une page inconnue dans le site.

export type Media = { type: 'video' | 'visite' | 'fichier'; embed: string; source: string }

export const BUCKET_VIDEOS = 'vitrines-videos'
export const TAILLE_MAX_VIDEO = 100 * 1024 * 1024
export const TYPES_VIDEO: Record<string, string> = { 'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm' }

function url(brut: string | null | undefined): URL | null {
  let t = (brut || '').trim()
  // Un code d'intégration collé tel quel : on garde l'adresse du src
  const src = t.match(/<iframe[^>]+src=["']([^"']+)["']/i)?.[1]
  if (src) t = src
  if (!t) return null
  try {
    const u = new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`)
    return u.protocol === 'https:' || u.protocol === 'http:' ? u : null
  } catch {
    return null
  }
}

const hote = (u: URL) => u.hostname.replace(/^www\.|^m\./, '').toLowerCase()

/** Vidéo envoyée sur LocaDirect, YouTube (dont Shorts) ou Vimeo */
export function lireVideo(brut: string | null | undefined): Media | null {
  const u = url(brut)
  if (!u) return null
  const h = hote(u)
  if (h.endsWith('.supabase.co') && u.pathname.startsWith(`/storage/v1/object/public/${BUCKET_VIDEOS}/`)) {
    return { type: 'fichier', source: 'Vidéo du propriétaire', embed: u.toString() }
  }
  let id: string | null = null
  if (h === 'youtu.be') id = u.pathname.slice(1).split('/')[0]
  else if (h === 'youtube.com' || h === 'youtube-nocookie.com') {
    id = u.searchParams.get('v') || u.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/)?.[1] || null
  }
  if (id && /^[\w-]{6,20}$/.test(id)) {
    return { type: 'video', source: 'YouTube', embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0` }
  }
  if (h === 'vimeo.com' || h === 'player.vimeo.com') {
    const v = u.pathname.match(/(\d{6,})/)?.[1]
    if (v) return { type: 'video', source: 'Vimeo', embed: `https://player.vimeo.com/video/${v}?dnt=1` }
  }
  return null
}

/** Visites 3D et 360° des services les plus courants */
const VISITES: { hotes: string[]; source: string; embed: (u: URL) => string | null }[] = [
  {
    hotes: ['my.matterport.com', 'matterport.com'],
    source: 'Matterport',
    embed: u => {
      const m = u.searchParams.get('m')
      return m && /^[\w]{6,20}$/.test(m) ? `https://my.matterport.com/show/?m=${m}&play=0` : null
    },
  },
  {
    hotes: ['poly.cam'],
    source: 'Polycam',
    embed: u => {
      const id = u.pathname.match(/^\/(?:capture|embed)\/([\w-]{6,})/)?.[1]
      return id ? `https://poly.cam/capture/${id}/embed` : null
    },
  },
  {
    hotes: ['kuula.co'],
    source: 'Kuula',
    embed: u => {
      const id = u.pathname.match(/^\/(?:post|share|share\/collection)\/([\w]{4,})/)?.[1]
      return id ? `https://kuula.co/share/${id}?fs=1&vr=0&thumbs=1&info=0&logo=0` : null
    },
  },
]

export function lireVisite3d(brut: string | null | undefined): Media | null {
  const u = url(brut)
  if (!u) return null
  const h = hote(u)
  for (const s of VISITES) {
    if (!s.hotes.includes(h)) continue
    const embed = s.embed(u)
    if (embed) return { type: 'visite', source: s.source, embed }
  }
  return null
}

export const SERVICES_VIDEO = 'YouTube ou Vimeo'
export const SERVICES_VISITE = 'Matterport, Polycam ou Kuula'
