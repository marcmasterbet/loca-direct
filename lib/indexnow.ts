// IndexNow : prévient Bing (et les moteurs qui s'appuient sur lui, dont ChatGPT et Yandex)
// dès qu'une page est mise en ligne, au lieu d'attendre leur prochain passage.
// La clé est vérifiée par le fichier public/f56fd333c38c59fa5d7759e3a2c8a5ab.txt.

const CLE = 'f56fd333c38c59fa5d7759e3a2c8a5ab'
const HOTE = 'www.loca-direct.fr'

export async function signalerPages(chemins: string[]): Promise<void> {
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOTE,
        key: CLE,
        keyLocation: `https://${HOTE}/${CLE}.txt`,
        urlList: chemins.map(c => `https://${HOTE}${c}`),
      }),
      signal: AbortSignal.timeout(4000),
    })
  } catch (e) {
    console.error('IndexNow :', e)
  }
}
