// Coordonnées des communes françaises, depuis l'API officielle geo.api.gouv.fr
// (gratuite, sans clé). On place les logements au centre de leur commune,
// jamais à l'adresse exacte. Les réponses sont mises en cache 30 jours.

type Commune = { nom: string; centre?: { coordinates: [number, number] } }

const UN_MOIS = 60 * 60 * 24 * 30

function normaliser(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Centre de la commune [longitude, latitude], ou null si introuvable. */
export async function centreCommune(codePostal: string | null, ville: string | null): Promise<[number, number] | null> {
  if (!codePostal || !/^\d{5}$/.test(codePostal.trim())) return null
  try {
    const res = await fetch(
      `https://geo.api.gouv.fr/communes?codePostal=${codePostal.trim()}&fields=nom,centre&format=json`,
      { next: { revalidate: UN_MOIS } }
    )
    if (!res.ok) return null
    const communes = (await res.json()) as Commune[]
    if (!communes.length) return null
    const cible = ville ? normaliser(ville) : ''
    const trouvee =
      communes.find(c => normaliser(c.nom) === cible) ??
      communes.find(c => cible && (normaliser(c.nom).includes(cible) || cible.includes(normaliser(c.nom)))) ??
      communes[0]
    return trouvee.centre?.coordinates ?? null
  } catch {
    return null
  }
}
