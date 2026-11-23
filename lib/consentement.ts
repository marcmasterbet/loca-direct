// Consentement aux cookies de mesure d'audience (Google Analytics).
// Rien n'est chargé tant que le visiteur n'a pas accepté (recommandations CNIL).
// Le choix est gardé 6 mois, puis redemandé.

export const GA_ID = 'G-Q5WD3F2NJD'
const CLE = 'ld_consentement'
const DUREE = 1000 * 60 * 60 * 24 * 182
export const EVENEMENT_OUVRIR = 'ld:cookies'

export type Choix = 'oui' | 'non'

export function lireChoix(): Choix | null {
  try {
    const brut = localStorage.getItem(CLE)
    if (!brut) return null
    const { choix, date } = JSON.parse(brut) as { choix: Choix; date: number }
    if (Date.now() - date > DUREE) return null
    return choix === 'oui' || choix === 'non' ? choix : null
  } catch {
    return null
  }
}

export function enregistrerChoix(choix: Choix) {
  try {
    localStorage.setItem(CLE, JSON.stringify({ choix, date: Date.now() }))
  } catch {}
  if (choix === 'oui') chargerAnalytics()
  else effacerCookiesGA()
}

let charge = false
export function chargerAnalytics() {
  if (charge || typeof window === 'undefined') return
  charge = true
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...a: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', GA_ID)
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

/** Retire les cookies Google Analytics déjà posés quand le visiteur refuse */
function effacerCookiesGA() {
  const domaine = location.hostname.replace(/^www\./, '')
  for (const c of document.cookie.split(';')) {
    const nom = c.split('=')[0].trim()
    if (nom === '_ga' || nom.startsWith('_ga_') || nom === '_gid') {
      for (const d of ['', `; domain=.${domaine}`, `; domain=${domaine}`]) {
        document.cookie = `${nom}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`
      }
    }
  }
}

export function rouvrirBandeau() {
  window.dispatchEvent(new Event(EVENEMENT_OUVRIR))
}
