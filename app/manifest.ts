import type { MetadataRoute } from 'next'

// Permet d'installer LocaDirect sur l'écran d'accueil d'un téléphone, comme une appli.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LocaDirect — locations de vacances entre particuliers',
    short_name: 'LocaDirect',
    description: 'Locations de vacances en direct avec le propriétaire, sans commission.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5534e8',
    lang: 'fr',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
