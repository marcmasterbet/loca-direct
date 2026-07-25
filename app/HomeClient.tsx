'use client'

import React, { useState } from 'react'
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
const DOG_GOLD = '#B8860B'
const DOG_GOLD_LIGHT = '#FFFBEB'

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
  equipements?: string[]
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
    q: "Pourquoi utiliser LocaDirect ?",
    r: "LocaDirect met en relation directe propriétaires et voyageurs, sans intermédiaire. Vous échangez directement sur WhatsApp, sans frais imposés par une plateforme.",
  },
  {
    q: 'La publication est-elle gratuite ?',
    r: "Oui, la publication d'annonces est gratuite et le restera. Des options optionnelles (mise en avant, badge vérifié) seront proposées plus tard pour ceux qui le souhaitent.",
  },
]

export default function HomeClient({ vitrines, prestataires, isLoggedIn = false }: { vitrines: Vitrine[]; prestataires: Prestataire[]; isLoggedIn?: boolean }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Filtrer les annonces chiens +10 kg
  const vitrinasChiens = vitrines.filter(v =>
    Array.isArray(v.equipements) && v.equipements.includes('chien_10kg')
  )

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
          <a href="/prestataires" className="hide-mobile" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>
            Prestataires
          </a>
          <a href="/blog" className="hide-mobile" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>
            Blog
          </a>
          {isLoggedIn ? (
            <a href="/espace" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
              Mon espace →
            </a>
          ) : (
            <>
              <a href="/connexion" className="hide-mobile" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8, textDecoration: 'none' }}>
                Connexion
              </a>
              <a href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none' }}>
                🏠 Publier
              </a>
            </>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{ padding: '80px 20px 48px', background: `linear-gradient(135deg, ${ORANGE_LIGHT} 0%, ${WHITE} 60%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: TEXT, color: WHITE, borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 700, textAlign: 'center' }}>
              🚀 Plateforme en lancement — découvrez nos prestataires et loueurs
            </div>
          </div>

          <h1 className="hero-title" style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.2, marginBottom: 16, color: TEXT }}>
            Louez votre logement<br />
            <span style={{ color: ORANGE }}>en contact direct</span>
          </h1>

          <p style={{ fontSize: 16, color: TEXT_DIM, lineHeight: 1.7, marginBottom: 32, maxWidth: 500, margin: '0 auto 32px' }}>
            Publiez votre annonce. Les locataires vous contactent directement sur WhatsApp, sans intermédiaire.
          </p>

          {/* BOUTONS HERO */}
          <div className="hero-btns" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/inscription" style={{ background: ORANGE, color: WHITE, borderRadius: 14, padding: '15px 28px', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              🏠 Publier mon logement
            </Link>
            <a href="#logements" style={{ background: WHITE, border: `2px solid ${ORANGE}`, color: ORANGE, borderRadius: 14, padding: '15px 28px', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              🔍 Trouver un logement
            </a>
          </div>

          <p style={{ fontSize: 12, color: TEXT_DIM, marginTop: 20 }}>
            ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Sans engagement &nbsp;·&nbsp; ✓ Annonce vérifiée par notre équipe
          </p>
        </div>
      </section>

      {/* BANNIÈRE FAIREDESDEVIS */}
<div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 20px 0' }}>
  <a href="https://fairedesdevis.fr" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
    <div style={{
      width: '100%',
      borderRadius: 14,
      background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
      padding: '18px 28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 16,
      cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ fontSize: 36, flexShrink: 0 }}>📄</div>
        <div>
          <p style={{ fontSize: 11, color: '#93c5fd', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>
            Partenaire officiel
          </p>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', marginBottom: 2 }}>
            FaireDesDevis — Le devis pro pour les prestataires
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
            Conciergerie, ménage, photographe · Signature électronique · Factures en 1 clic
          </p>
        </div>
      </div>
      <div style={{
        background: '#ffffff',
        color: '#2563eb',
        borderRadius: 10,
        padding: '10px 20px',
        fontSize: 13,
        fontWeight: 800,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}>
        Essayer 7 jours gratuits →
      </div>
    </div>
  </a>
</div>

      {/* RUBRIQUE CHIENS +10 KG */}
      <section id="logements-chiens" className="section-pad" style={{ padding: '48px 20px', maxWidth: 1000, margin: '0 auto' }}>
        {/* Bannière chiens */}
        <div style={{
          background: `linear-gradient(135deg, #78350F 0%, #92400E 100%)`,
          borderRadius: 20,
          padding: '28px 28px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
        }}>
          <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 52, flexShrink: 0 }}>🐕</div>
            <div>
              <p style={{ fontSize: 11, color: '#FCD34D', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
                Rubrique exclusive
              </p>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: WHITE, marginBottom: 6, lineHeight: 1.3 }}>
                Vous voyagez avec un grand chien ?
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                Trouvez votre logement ici — nos propriétaires acceptent les chiens de +10 kg.
              </p>
            </div>
          </div>
          <a href="/logements?chien=1" style={{ background: '#FCD34D', color: '#78350F', borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0, textDecoration: 'none' }}>
            Voir les logements 🐾
          </a>
        </div>

        {/* Annonces chiens ou message vide */}
        {vitrinasChiens.length === 0 ? (
          <div style={{ background: DOG_GOLD_LIGHT, borderRadius: 14, padding: '28px 24px', textAlign: 'center', border: `1px dashed ${DOG_GOLD}` }}>
            <p style={{ fontSize: 28, marginBottom: 8 }}>🐾</p>
            <p style={{ fontSize: 14, color: '#92400E', fontWeight: 600, marginBottom: 6 }}>
              Vous acceptez les grands chiens ?
            </p>
            <p style={{ fontSize: 13, color: '#B45309', marginBottom: 16 }}>
              Publiez votre annonce et rejoignez cette rubrique exclusive.
            </p>
            <Link href="/inscription" style={{ background: '#92400E', color: WHITE, borderRadius: 10, padding: '11px 22px', fontSize: 13, fontWeight: 700, display: 'inline-block' }}>
              Publier mon logement →
            </Link>
          </div>
        ) : (
          <div className="grid-4">
            {vitrinasChiens.slice(0, 4).map((v) => {
              const badge = statutBadge[v.statut] || { label: v.statut, bg: TEXT_DIM }
              return (
                <Link href={`/vitrine/${v.id}`} key={v.id} className="card" style={{ borderRadius: 16, overflow: 'hidden', border: `2px solid #FCD34D`, display: 'block', background: WHITE }}>
                  <div style={{ position: 'relative' }}>
                    {v.photos?.[0] ? (
                      <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{ width: '100%', height: 160, background: DOG_GOLD_LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🐕</div>
                    )}
                    <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      <span style={{ background: badge.bg, color: WHITE, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{badge.label}</span>
                      <span style={{ background: '#78350F', color: '#FCD34D', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🐕 +10 kg bienvenus</span>
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
        )}
      </section>

      {/* PRESTATAIRES — bannière + cartes */}
      <section className="section-pad" style={{ padding: '48px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ background: `linear-gradient(135deg, ${TEXT} 0%, #374151 100%)`, borderRadius: 20, padding: '32px 28px', marginBottom: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Annuaire</p>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Découvrez nos prestataires</h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Conciergerie, ménage, photographe, digital... trouvez les bons partenaires pour votre logement.
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

      {/* DERNIÈRES VITRINES */}
      <section id="logements" className="section-pad" style={{ padding: '56px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Annonces récentes</p>
            <h2 className="section-title" style={{ fontSize: 28, fontWeight: 800, color: TEXT }}>Les derniers logements</h2>
          </div>
          {vitrines.length > 0 && (
            <a href="/logements" style={{ background: ORANGE_LIGHT, color: ORANGE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Voir tout →
            </a>
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
                const hasChien = Array.isArray(v.equipements) && v.equipements.includes('chien_10kg')
                return (
                  <Link href={`/vitrine/${v.id}`} key={v.id} className="card" style={{ borderRadius: 16, overflow: 'hidden', border: `1px solid ${BORDER}`, display: 'block', background: WHITE }}>
                    <div style={{ position: 'relative' }}>
                      {v.photos?.[0] ? (
                        <img src={v.photos[0]} alt={v.titre} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                      ) : (
                        <div style={{ width: '100%', height: 160, background: GRAY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>🏠</div>
                      )}
                      <div style={{ position: 'absolute', top: 8, left: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        <span style={{ background: badge.bg, color: WHITE, borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>{badge.label}</span>
                        {hasChien && (
                          <span style={{ background: '#78350F', color: '#FCD34D', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>🐕 +10 kg</span>
                        )}
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
              <a href="/logements" style={{ background: ORANGE, color: WHITE, borderRadius: 14, padding: '14px 32px', fontSize: 15, fontWeight: 700, display: 'inline-block', textDecoration: 'none' }}>
                Voir toutes les annonces →
              </a>
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
              { num: '01', icon: '👤', title: 'Créez votre compte', desc: 'Inscription rapide. Aucune carte bancaire.' },
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
            { icon: '💰', title: 'Contact direct, sans commission', desc: 'Échangez directement avec les locataires sur WhatsApp. Aucun frais de plateforme sur vos transactions.' },
            { icon: '🐕', title: 'Grands chiens bienvenus', desc: 'LocaDirect est la seule plateforme avec une rubrique dédiée aux logements acceptant les chiens de +10 kg.' },
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
            { icon: '💬', title: 'Contact direct', desc: 'Échangez directement avec les propriétaires, sans passer par une messagerie imposée.' },
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
            Prêt à louer en direct ?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 32, lineHeight: 1.7 }}>
            LocaDirect démarre tout juste : rejoignez les premiers propriétaires et profitez d'une visibilité maximale dès le lancement.
          </p>
          <Link href="/inscription" style={{ background: WHITE, color: ORANGE, borderRadius: 14, padding: '16px 40px', fontSize: 16, fontWeight: 800, display: 'inline-block', marginBottom: 16 }}>
            Publier mon logement →
          </Link>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            ✓ Publication gratuite &nbsp;·&nbsp; ✓ Sans carte bancaire &nbsp;·&nbsp; ✓ Annonce vérifiée par notre équipe
          </p>
        </div>
      </section>


      {/* NEWSLETTER */}
      <section className="section-pad" style={{ padding: '56px 20px', background: `linear-gradient(135deg, ${TEXT} 0%, #374151 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: WHITE, marginBottom: 8 }}>
            Recevez les dernières annonces
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 24, lineHeight: 1.6 }}>
            Inscrivez-vous pour être alerté des nouveaux logements disponibles.
          </p>
          <NewsletterForm />
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
          </div>
        </div>
      </footer>

      {/* BARRE NAV BAS MOBILE */}
      <div className="bottom-nav" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: WHITE, borderTop: `1px solid ${BORDER}`, display: 'flex', zIndex: 100, paddingBottom: 'env(safe-area-inset-bottom)', boxShadow: '0 -4px 20px rgba(0,0,0,0.08)' }}>
        {isLoggedIn ? (
          // NAV CONNECTÉ
          <>
            <a href="/" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🏠</span>
              <span style={{ fontSize: 9, color: ORANGE, fontWeight: 700 }}>Accueil</span>
            </a>
            <a href="/espace?tab=rechercher" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🔍</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Rechercher</span>
            </a>
            <a href="/espace/ma-vitrine" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, background: ORANGE, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginTop: -14, boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>➕</div>
              <span style={{ fontSize: 9, color: ORANGE, fontWeight: 700 }}>Publier</span>
            </a>
            <a href="/espace?tab=mes-annonces" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>📋</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Mes annonces</span>
            </a>
            <a href="/espace?tab=favoris" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>❤️</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Favoris</span>
            </a>
            <a href="/espace?tab=profil" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>👤</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Profil</span>
            </a>
          </>
        ) : (
          // NAV NON CONNECTÉ
          <>
            <a href="/" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🏠</span>
              <span style={{ fontSize: 9, color: ORANGE, fontWeight: 700 }}>Accueil</span>
            </a>
            <a href="/logements" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>🔍</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Rechercher</span>
            </a>
            <a href="/inscription" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, background: ORANGE, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginTop: -14, boxShadow: '0 4px 12px rgba(234,88,12,0.4)' }}>➕</div>
              <span style={{ fontSize: 9, color: ORANGE, fontWeight: 700 }}>Publier</span>
            </a>
            <a href="/connexion" style={{ flex: 1, padding: '10px 2px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, textDecoration: 'none' }}>
              <span style={{ fontSize: 20 }}>👤</span>
              <span style={{ fontSize: 9, color: TEXT_DIM }}>Connexion</span>
            </a>
          </>
        )}
      </div>
    </div>
  )

function NewsletterForm() {
  const [email, setEmail] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleSubmit = async () => {
    if (!email.includes('@')) { setError('Email invalide'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    if (!res.ok) { setError(data.error); setLoading(false); return }
    setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: '20px 24px', color: WHITE }}>
      <p style={{ fontSize: 20, marginBottom: 8 }}>✅</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>Vous êtes inscrit !</p>
      <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>Vous recevrez les prochaines annonces par email.</p>
    </div>
  )

  return (
    <div>
      {error && <p style={{ fontSize: 13, color: '#FCA5A5', marginBottom: 12 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 8, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' }}>
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setError('') }}
          placeholder="votre@email.com"
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          style={{ flex: 1, minWidth: 200, padding: '13px 16px', borderRadius: 12, border: 'none', fontSize: 14, outline: 'none', color: '#1F2937' }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ background: '#EA580C', color: WHITE, borderRadius: 12, padding: '13px 20px', fontSize: 14, fontWeight: 700, opacity: loading ? 0.7 : 1, whiteSpace: 'nowrap', border: 'none', cursor: 'pointer' }}
        >
          {loading ? '...' : "S'inscrire →"}
        </button>
      </div>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 12 }}>Aucun spam. Désinscription en 1 clic.</p>
    </div>
  )
}

}