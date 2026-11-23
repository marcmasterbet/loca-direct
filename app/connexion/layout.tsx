import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Se connecter',
  description: 'Connectez-vous pour gérer vos annonces, vos favoris et vos alertes sur LocaDirect.',
  alternates: { canonical: '/connexion' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
