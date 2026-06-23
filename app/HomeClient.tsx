'use client'

import { useState } from 'react'
import Link from 'next/link'

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const ORANGE_DARK = '#C2410C'
const GREEN = '#16A34A'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

type Vitrine = {
  id: string
  titre: string
  ville: string
  type_logement: string
  prix_nuit: number
  surface?: number
  nb_chambres?: number
  statut: string
  photos?: string[]
}

type Prestataire = {
  id: string
  nom: string
  prenom: string
  ville: string
  activite: string
  tarif_horaire: number | null
  sur_devis: boolean
  flyer_url: string | null
}

const statutBadge: Record<string, { label: string; bg: string }> = {
  active: { label: '✅ Disponible', bg: GREEN },
  deja_loue: { label: '🔴 Déjà loué', bg: '#EF4444' },
  bientot_dispo: { label: '🟡 Bientôt dispo', bg: '#F59E0B' },
}

const FAQ = [
  {
    q: 'Comment suis-je payé par le voyageur ?',
    r: "Le paiement se fait directement entre vous et le voyageur (virement, espèces, etc.), sans passer par LocaDirect. Vous gardez 100% du montant, sans aucune commission prélevée.",
  },
  {
    q: 'Comment se passe la réservation ?',
    r: "Le voyageur vous contacte directement via WhatsApp depuis votre annonce. Vous échangez ensemble sur les dates, le prix et les modalités, comme vous le feriez par téléphone ou en personne.",
  },
  {
    q: 'Comment éviter les arnaques ?',
    r: "Chaque annonce est vérifiée manuellement par notre équipe avant publication, et chaque utilisateur doit confirmer son email à l'inscription. Nous recommandons aussi les mêmes précautions que pour toute transaction entre particuliers : échanger avant de s'engager, demander des garanties si besoin.",
  },
  {
    q: 'Pourquoi utiliser LocaDirect plutôt qu\'Airbnb ?',
    r: "Airbnb prélève 15 à 20% de commission sur chaque réservation. LocaDirect est 100% gratuit, sans commission ni abonnement obligatoire : vous gardez l'intégralité de vos revenus locatifs.",
  },
  {
    q: 'Est-ce vraiment gratuit ?',
    r: "Oui, la publication d'annonces est gratuite et le restera. Des options payantes optionnelles (mise en avant, badge vérifié) seront proposées plus tard pour ceux qui le souhaitent, mais l'usage de base reste gratuit.",
  },
]

export default function HomeClient({ vitrines, prestataires }: { vitrines: Vitrine[]; prestataires: Prestataire[] }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div style={{ background: WHITE, color: TEXT, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', minHeight: '100vh' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        button { font-family: inherit; cursor: pointer; border: none; }
        input, select { font-family: inherit; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .card { transition: transform 0.2s, box-shadow 0.2s; }
        .card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.12); }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr; }
          .grid-3 { grid-template-columns: 1fr; }
          .grid-4 { grid-template-columns: 1fr 1fr; }
          .hero-title { font-size: 26px !important; }
          .section-title { font-size: 22px !important; }
          .hide-mobile { display: none !important; }
          .search-bar { flex-direction: column !important; }
          .hero-btns { flex-direction: column !important; }
          .hero-section { padding: 80px 16px 40px !important; }
          .section-pad { padding: 48px 16px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .footer-links { flex-wrap: wrap !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: 1fr; }
          .hero-title { font-size: 24px !important; }
        }
        @media (display-mode: standalone) {
          nav { padding-top: env(safe-area-inset-top) !important; }
          .bottom-nav { padding-bottom: env(safe-area-inset-bottom) !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </Link>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/prestataires" className="hide-mobile" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8 }}>
            Prestataires
          </Link>
          <Link href="/connexion" className="hide-mobile" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8 }}>
            Connexion
          </Link>
          <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
            🏠 Publier gratuitement
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ padding: '80px 20px 48px', background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 60%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: WHITE, border: `1px solid ${ORANGE}`, borderRadius: 20, padding: '6px 14px', fontSize: 12, color: ORANGE, fontWeight: 700 }}>
              🎉 100% GRATUIT — ZÉRO COMMISSION
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: TEXT, color: WHITE, borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 700, textAlign: 'center' }}>
              🚀 Plateforme en lancement — decouvrez nos prestataires et loueurs
            </div>
          </div>

          <h1 className="hero-title" style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: TEXT }}>
            Louez votre logement<br />
            <span style={{ color: ORANGE }}>sans payer de commission</span>
          </h1>

          <p style={{ fontSize: 16, color: TEXT_DIM, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Publiez votre annonce gratuitement. Les locataires vous contactent directement sur WhatsApp. Airbnb prend 15-20%, nous prenons <strong style={{ color: ORANGE }}>0%</strong>.
          </p>

          {/* BARRE RECHERCHE */}
          <div className="search-bar" style={{ background: WHITE, borderRadius: 16, padding: 8, display: 'flex', gap: 8, maxWidth: 560, margin: '0 auto 28px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: `1px solid ${BORDER}` }}>
            <input
              placeholder="🔍 Ville, quartier..."
              style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 14px', fontSize: 15, borderRadius: 10, color: TEXT, minWidth: 0 }}
            />
            <select style={{ border: 'none', outline: 'none', padding: '12px 10px', fontSize: 13, borderRadius: 10, color: TEXT_DIM, background: GRAY, minWidth: 0 }}>
              <option>Tous types</option>
              <option>Appartement</option>
              <option>Maison</option>
              <option>Villa</option>
              <option>Studio</option>
              <option>Chalet</option>
            </select>
            <button style={{ background: ORANGE, color: WHITE, border: 'none', borderRadius: 10, padding: '12px 20px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
              Rechercher
            </button>
          </div>

          {/* BOUTONS HERO */}
          <div className="hero-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 14, padding: '15px 28px', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              🏠 Publier mon logement gratuit
            </Link>
            <Link href="/inscription" style={{ background: WHITE, border: `2px solid ${ORANGE}`, color: ORANGE, borderRadius: 14, padding: '15px 28px', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔍 Trouver un logement
            </Link>
          </div>

          <p style={{ fontSize: 12, color: TEXT_DIM, marginTop: 20 }}>
            ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Sans engagement &nbsp;·&nbsp; ✓ Annonce vérifiée par notre équipe
          </p>
        </div>
      </section>

      {/* PRESTATAIRES — bannière + cartes, juste après le hero/stats */}
      <section className="section-pad" style={{ padding: '48px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${TEXT} 0%, #374151 100%)`, borderRadius: 20, padding: '32px 28px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Annuaire</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Découvrez nos prestataires</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Conciergerie, ménage, photographe, digital... trouvez les bons partenaires pour votre logement, gratuitement.
            </p>
          </div>
          <Link href="/prestataires" style={{ background: ORANGE, color: WHITE, borderRadius: 12, padding: '13px 26px', fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>
            Voir l'annuaire →
          </Link>
        </div>

        {prestataires.length > 0 && (
          <div className="grid-4">
            {prestataires.map((p) => (
              <Link href={`/prestataires/${p.id}`} key={p.id} className="card" style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${BORDER}`, display: 'block', background: WHITE }}>
                <div style={{ width: '100%', aspectRatio: '4/3', background: GRAY }}>
                  {p.flyer_url ? (
                    <img src={p.flyer_url} alt={`${p.prenom} ${p.nom}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>🛠️</div>
                  )}
                </div>
                <div style={{ padding: 14 }}>
                  <p style={{ fontSize: 11, color: ORANGE, fontWeight: 700, marginBottom: 4 }}>{p.activite}</p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.prenom} {p.nom}</p>
                  <p style={{ fontSize: 12, color: TEXT_DIM }}>📍 {p.ville}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* DERNIÈRES VITRINES — VRAIES ANNONCES */}
      <section className="section-pad" style={{ padding: '56px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Annonces récentes</p>
            <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Les derniers logements</h2>
          </div>
          {vitrines.length > 0 && (
            <Link href="/inscription" style={{ background: ORANGE_LIGHT, color: ORANGE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600 }}>
              Voir tout →
            </Link>
          )}
        </div>

        {vitrines.length === 0 ? (
          <div style={{ background: GRAY, borderRadius: 16, padding: 48, textAlign: 'center', border: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🏠</p>
            <p style={{ fontSize: 15, color: TEXT_DIM, marginBottom: 20 }}>Aucune annonce publiée pour le moment.</p>
            <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, display: 'inline-block' }}>
              Soyez le premier à publier →
            </Link>
          </div>
        ) : (
          <>
            <div className="grid-4">
              {vitrines.map((v) => {
                const badge = statutBadge[v.statut] || { label: v.statut, bg: TEXT_DIM }
                return (
                  <Link href={`/vitrine/${v.id}`} key={v.id} className="card" style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${BORDER}`, display: 'block', background: WHITE }}>
                    <div style={{ position: 'relative' }}>
                      {v.photos?.[0] ? (
                        <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: 160, background: GRAY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🏠</div>
                      )}
                      <div style={{ position: 'absolute', top: 8, left: 8 }}>
                        <span style={{ background: badge.bg, color: WHITE, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{badge.label}</span>
                      </div>
                    </div>
                    <div style={{ padding: 14 }}>
                      <p style={{ fontSize: 12, color: TEXT_DIM, marginBottom: 4 }}>{v.type_logement}{v.surface ? ` · ${v.surface}m²` : ''}</p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v.ville}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: 16, fontWeight: 800, color: ORANGE }}>{v.prix_nuit}€<span style={{ fontSize: 11, fontWeight: 400, color: TEXT_DIM }}>/nuit</span></p>
                        {v.nb_chambres != null && <p style={{ fontSize: 12, color: TEXT_DIM }}>{v.nb_chambres} ch.</p>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 14, padding: '14px 32px', fontSize: 15, fontWeight: 700, display: 'inline-block' }}>
                Voir toutes les annonces →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section-pad" style={{ padding: '56px 20px', background: GRAY }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Simple & Rapide</p>
            <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Comment ça marche ?</h2>
          </div>
          <div className="grid-4">
            {[
              { num: '01', icon: '👤', title: 'Créez votre compte', desc: 'Inscription gratuite en 30 secondes. Aucune carte bancaire.' },
              { num: '02', icon: '📸', title: 'Publiez votre annonce', desc: 'Photos, description, prix. Notre équipe vérifie et valide votre annonce.' },
              { num: '03', icon: '🔗', title: 'Partagez votre lien', desc: 'Facebook, WhatsApp, Instagram. Votre réseau voit votre logement.' },
              { num: '04', icon: '💬', title: 'Contact WhatsApp direct', desc: 'Les locataires vous contactent. Zéro commission, zéro intermédiaire.' },
            ].map(item => (
              <div key={item.num} style={{ background: WHITE, borderRadius: 16, padding: 24, border: `1px solid ${BORDER}`, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: ORANGE, fontWeight: 700, letterSpacing: '0.2em', marginBottom: 12 }}>{item.num}</div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POURQUOI LOCADIRECT */}
      <section className="section-pad" style={{ padding: '56px 20px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Nos avantages</p>
          <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Pourquoi LocaDirect ?</h2>
        </div>
        <div className="grid-2">
          {[
            { icon: '💰', title: '0% de commission', desc: 'Airbnb prend 15-20% sur chaque réservation. Nous prenons 0%. Votre argent reste dans votre poche.' },
            { icon: '🎉', title: '100% gratuit', desc: 'Publiez autant d\'annonces que vous voulez. Aucun abonnement, aucune carte bancaire requise.' },
            { icon: '💬', title: 'Contact direct WhatsApp', desc: 'Les locataires vous contactent directement sur WhatsApp. Simple, rapide, sans intermédiaire.' },
            { icon: '🔍', title: 'Indexé sur Google', desc: 'Chaque annonce a sa propre page Google. Vos logements apparaissent dans les recherches.' },
            { icon: '📱', title: '100% mobile', desc: 'Votre vitrine est optimisée pour tous les téléphones. Partageable en 1 clic sur les réseaux.' },
            { icon: '🔒', title: 'Sécurisé', desc: 'Vos coordonnées sont protégées. Seuls les membres inscrits peuvent vous contacter.' },
          ].map(item => (
            <div key={item.title} style={{ display: 'flex', gap: 16, padding: 20, background: GRAY, borderRadius: 14, border: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 32, flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARAISON */}
      <section className="section-pad" style={{ padding: '56px 20px', background: ORANGE_LIGHT }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>LocaDirect vs les autres</h2>
          </div>
          <div style={{ background: WHITE, borderRadius: 20, overflow: 'hidden', border: `1px solid ${BORDER}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: ORANGE }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: WHITE, fontWeight: 600 }}>Fonctionnalité</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: WHITE, fontWeight: 700 }}>LocaDirect</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Airbnb</th>
                  <th style={{ padding: '14px 16px', textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>Leboncoin</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Commission', '0%', '15-20%', '0%'],
                  ['Publication', '✅ Gratuit', '✅ Gratuit', '✅ Gratuit'],
                  ['Spécialisé location', '✅ Oui', '✅ Oui', '❌ Non'],
                  ['Contact direct', '✅ WhatsApp', '❌ Via appli', '✅ Oui'],
                  ['Annonce vérifiée', '✅ Oui', '❌ Non', '❌ Non'],
                  ['Google indexé', '✅ Oui', '✅ Oui', '✅ Oui'],
                ].map(([feature, loca, airbnb, lbc], i) => (
                  <tr key={feature} style={{ background: i % 2 === 0 ? WHITE : GRAY }}>
                    <td style={{ padding: '12px 16px', color: TEXT, fontWeight: 500 }}>{feature}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: GREEN, fontWeight: 700 }}>{loca}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: TEXT_DIM }}>{airbnb}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: TEXT_DIM }}>{lbc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONFIANCE */}
      <section className="section-pad" style={{ padding: '56px 20px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Engagement</p>
          <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Pourquoi nous faire confiance ?</h2>
        </div>
        <div className="grid-4">
          {[
            { icon: '✅', title: 'Annonces vérifiées', desc: 'Chaque annonce est validée manuellement par notre équipe avant mise en ligne.' },
            { icon: '🪪', title: 'Propriétaires identifiés', desc: 'Inscription obligatoire avec email vérifié pour publier une annonce.' },
            { icon: '💰', title: 'Zéro commission', desc: 'Aucun frais caché, aucun abonnement obligatoire. Le service reste gratuit.' },
            { icon: '🇫🇷', title: 'Plateforme française', desc: 'Conçue et hébergée en France, conforme au RGPD.' },
          ].map(item => (
            <div key={item.title} style={{ background: GRAY, borderRadius: 16, padding: 20, border: `1px solid ${BORDER}`, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: TEXT, marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: 12, color: TEXT_DIM, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad" style={{ padding: '56px 20px', background: GRAY }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Questions fréquentes</p>
            <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Vous avez des questions ?</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {FAQ.map((item, i) => {
              const isOpen = openFaq === i
              return (
                <div key={i} style={{ background: WHITE, borderRadius: 14, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ width: '100%', textAlign: 'left', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, background: WHITE }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 700, color: TEXT }}>{item.q}</span>
                    <span style={{ fontSize: 18, color: ORANGE, flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 18px 16px' }}>
                      <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.7 }}>{item.r}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-pad" style={{ padding: '56px 20px', background: ORANGE, textAlign: 'center' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏠</div>
          <h2 className="section-title" style={{ fontSize: 32, fontWeight: 800, color: WHITE, marginBottom: 16, lineHeight: 1.2 }}>
            Prêt à louer sans commission ?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32, lineHeight: 1.7 }}>
            LocaDirect démarre tout juste : rejoignez les premiers propriétaires et profitez d'une visibilité maximale dès le lancement.
          </p>
          <Link href="/inscription" style={{ background: WHITE, color: ORANGE, borderRadius: 14, padding: '16px 40px', fontSize: 16, fontWeight: 800, display: 'inline-block', marginBottom: 16 }}>
            Publier mon logement gratuitement →
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            ✓ 100% gratuit &nbsp;·&nbsp; ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Annonce vérifiée par notre équipe
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: TEXT, padding: '40px 20px', paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, justifyContent: 'center' }}>
            <div style={{ width: 32, height: 32, background: ORANGE, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🏠</div>
            <span style={{ fontSize: 18, fontWeight: 800, color: WHITE }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
          </div>
          <div className="footer-links" style={{ display: 'flex', gap: 20, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
            <Link href="/inscription" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Publier une annonce</Link>
            <Link href="/inscription" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Chercher un logement</Link>
            <Link href="/prestataires" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Annuaire prestataires</Link>
            <Link href="/mentions-legales" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Mentions légales</Link>
            <Link href="/cgu" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>CGU</Link>
            <Link href="/politique-confidentialite" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Confidentialité</Link>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>© 2026 LocaDirect · loca-direct.fr</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 6 }}>
              Un service proposé par <Link href="https://montableaudigital.fr" style={{ color: 'rgba(255,255,255,0.3)' }}>Mon Tableau Digital</Link>
            </p>
          </div>
        </div>
      </footer>

      {/* BARRE NAV BAS MOBILE */}
      <div className="bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: WHITE, borderTop: `1px solid ${BORDER}`, display: 'flex', zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
        {[
          { icon: '🏠', label: 'Accueil', href: '/' },
          { icon: '🔍', label: 'Rechercher', href: '/inscription' },
          { icon: '➕', label: 'Publier', href: '/inscription', primary: true },
          { icon: '❤️', label: 'Favoris', href: '/inscription' },
          { icon: '👤', label: 'Profil', href: '/connexion' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{ flex: 1, padding: '10px 4px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            {item.primary ? (
              <div style={{ width: 44, height: 44, background: ORANGE, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginTop: -16, boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>
                {item.icon}
              </div>
            ) : (
              <span style={{ fontSize: 22 }}>{item.icon}</span>
            )}
            <span style={{ fontSize: 10, color: item.primary ? ORANGE : TEXT_DIM, fontWeight: item.primary ? 700 : 400 }}>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
