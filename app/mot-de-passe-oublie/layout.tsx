import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  robots: { index: false, follow: true },
  description: 'Recevez un lien par e-mail pour choisir un nouveau mot de passe.',
  alternates: { canonical: '/mot-de-passe-oublie' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
