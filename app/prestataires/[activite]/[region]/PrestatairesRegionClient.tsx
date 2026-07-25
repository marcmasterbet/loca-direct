'use client'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

type Prestataire = {
  id: string
  nom: string
  prenom: string
  ville: string
  region: string | null
  activite: string
  description: string
  tarif_horaire: number | null
  sur_devis: boolean
  flyer_url: string | null
}

const AUTRES_ACTIVITES = [
  { slug: 'conciergerie', name: 'Conciergerie' },
  { slug: 'menage', name: 'Ménage' },
  { slug: 'photographe', name: 'Photographe' },
  { slug: 'digital', name: 'Digital' },
  { slug: 'maintenance', name: 'Maintenance' },
  { slug: 'jardinage', name: 'Jardinage' },
  { slug: 'decoration', name: 'Décoration' },
]

const AUTRES_REGIONS = [
  { slug: 'bretagne', name: 'Bretagne' },
  { slug: 'nouvelle-aquitaine', name: 'Nouvelle-Aquitaine' },
  { slug: 'occitanie', name: 'Occitanie' },
  { slug: 'provence-alpes-cote-dazur', name: 'PACA' },
  { slug: 'normandie', name: 'Normandie' },
  { slug: 'grand-est', name: 'Grand Est' },
  { slug: 'pays-de-la-loire', name: 'Pays de la Loire' },
  { slug: 'auvergne-rhone-alpes', name: 'Auvergne-RA' },
]

export default function PrestatairesRegionClient({ prestataires, activiteName, activiteSlug, regionName, regionSlug, isLoggedIn = false }: {
  prestataires: Prestataire[]
  activiteName: string
  activiteSlug: string
  regionName: string
  regionSlug: string
  isLoggedIn?: boolean
}) {
  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 768px) { .grid-3 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          {isLoggedIn ? (
            <a href="/espace" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>Mon espace →</a>
          ) : (
            <>
              <a href="/connexion" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>Connexion</a>
              <a href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>🏠 Publier</a>
            </>
          )}
        </div>
      </nav>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 20px 80px' }}>

        {/* HERO */}
        <div style={{ background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 100%)`, borderRadius: 20, padding: '36px 32px', marginBottom: 36 }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Annuaire prestataires</p>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: TEXT, marginBottom: 8 }}>
            {activiteName} en {regionName}
          </h1>
          <p style={{ fontSize: 15, color: TEXT_DIM, marginBottom: 16, lineHeight: 1.6 }}>
            {prestataires.length} prestataire{prestataires.length > 1 ? 's' : ''} {activiteName.toLowerCase()} disponible{prestataires.length > 1 ? 's' : ''} en {regionName}. Contact direct WhatsApp.
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/prestataires" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>
              Voir tout l'annuaire →
            </a>
            <a href="/espace/devenir-prestataire" style={{ background: WHITE, border: `1px solid ${ORANGE}`, color: ORANGE, borderRadius: 10, padding: '10px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Devenir prestataire
            </a>
          </div>
        </div>

        {/* PRESTATAIRES */}
        {prestataires.length === 0 ? (
          <div style={{ background: GRAY, borderRadius: 16, padding: 48, textAlign: 'center', border: `1px solid ${BORDER}`, marginBottom: 32 }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🛠️</p>
            <p style={{ fontSize: 15, color: TEXT_DIM, marginBottom: 20 }}>
              Aucun prestataire {activiteName.toLowerCase()} en {regionName} pour le moment.
            </p>
            <a href="/espace/devenir-prestataire" style={{ background: ORANGE, color: WHITE, borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
              Rejoindre l'annuaire →
            </a>
          </div>
        ) : (
          <div className="grid-3" style={{ marginBottom: 40 }}>
            {prestataires.map(p => (
              <a key={p.id} href={`/prestataires/${p.id}`} style={{ border: `1px solid ${BORDER}`, borderRadius: 16, overflow: 'hidden', display: 'block', background: WHITE, textDecoration: 'none' }}>
                <div style={{ width: '100%', aspectRatio: '16/9', background: GRAY }}>
                  {p.flyer_url ? (
                    <img src={p.flyer_url} alt={`${p.prenom} ${p.nom}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🛠️</div>
                  )}
                </div>
                <div style={{ padding: 14 }}>
                  <p style={{ fontSize: 11, color: ORANGE, fontWeight: 700, marginBottom: 4 }}>{p.activite}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4 }}>{p.prenom} {p.nom}</p>
                  <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 8 }}>📍 {p.ville}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: ORANGE }}>
                    {p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire}€/h` : ''}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* AUTRES ACTIVITÉS DANS CETTE RÉGION */}
        <div style={{ background: GRAY, borderRadius: 16, padding: '24px', marginBottom: 24, border: `1px solid ${BORDER}` }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 14 }}>Autres activités en {regionName}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AUTRES_ACTIVITES.filter(a => a.slug !== activiteSlug).map(a => (
              <a key={a.slug} href={`/prestataires/${a.slug}/${regionSlug}`} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '6px 14px', fontSize: 13, color: TEXT, textDecoration: 'none' }}>
                {a.name}
              </a>
            ))}
          </div>
        </div>

        {/* MÊME ACTIVITÉ DANS AUTRES RÉGIONS */}
        <div style={{ background: GRAY, borderRadius: 16, padding: '24px', border: `1px solid ${BORDER}` }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 14 }}>{activiteName} dans d'autres régions</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {AUTRES_REGIONS.filter(r => r.slug !== regionSlug).map(r => (
              <a key={r.slug} href={`/prestataires/${activiteSlug}/${r.slug}`} style={{ background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '6px 14px', fontSize: 13, color: TEXT, textDecoration: 'none' }}>
                {r.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
