import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Créer un compte pour publier une annonce',
  description: 'Publiez gratuitement votre location de vacances ou rejoignez l’annuaire des prestataires, sans commission.',
  alternates: { canonical: '/inscription' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
