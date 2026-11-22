// Envoi d'événements à Google Analytics 4 (gtag est chargé dans app/layout.tsx).

type Gtag = (command: 'event', name: string, params?: Record<string, unknown>) => void

export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  const gtag = (window as unknown as { gtag?: Gtag }).gtag
  if (typeof gtag === 'function') gtag('event', name, params)
}
