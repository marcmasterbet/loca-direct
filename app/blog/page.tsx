import { Metadata } from 'next'
import { ARTICLES } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Blog — Conseils location vacances, guides régionaux & propriétaires',
  description: 'Conseils pour voyageurs et propriétaires, guides régionaux, marchés de Noël, destinations incontournables. Tout ce qu\'il faut savoir pour louer malin et voyager bien.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'


const CATEGORIES_COULEURS: Record<string, string> = {
  'Voyageurs': '#0F766E',
  'Conseils': '#EA580C',
  'Propriétaires': '#7C3AED',
  'Guides régionaux': '#1D4ED8',
  'Famille & Activités': '#B45309',
  'Guides villes': '#0369A1',
  'Patrimoine': '#6D28D9',
  'Noël en Alsace': '#B91C1C',
}

export default function BlogPage() {
  const articleUne = ARTICLES[0]
  const autresArticles = ARTICLES.slice(1)

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .card { transition: transform 0.2s, box-shadow 0.2s; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
        .une-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 900px) { .grid-3 { grid-template-columns: 1fr 1fr; } .une-grid { grid-template-columns: 1fr; } }
        @media (max-width: 560px) { .grid-3 { grid-template-columns: 1fr; } }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: '#FFFFFF', borderBottom: '1px solid #E5E7EB', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/logements" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8 }}>Logements</a>
          <a href="/prestataires" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px', borderRadius: 8 }}>Prestataires</a>
          <a href="/inscription" style={{ background: ORANGE, color: '#FFFFFF', borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Publier</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', padding: '60px 20px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>Le magazine LocaDirect</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', marginBottom: 16, lineHeight: 1.2 }}>
          Conseils, guides & inspiration
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          Tout ce qu'il faut savoir pour louer malin, voyager bien et découvrir les plus belles régions de France.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* ARTICLE À LA UNE */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>À la une</p>
          <a href={`/blog/${articleUne.slug}`} className="card" style={{ display: 'block', background: GRAY, borderRadius: 20, overflow: 'hidden', border: '1px solid #E5E7EB' }}>
            <div className="une-grid">
              <img src={articleUne.photo} alt={articleUne.titre} style={{ width: '100%', height: 340, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '40px 32px 40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ display: 'inline-block', background: CATEGORIES_COULEURS[articleUne.categorie] || ORANGE, color: '#FFFFFF', borderRadius: 20, padding: '4px 14px', fontSize: 11, fontWeight: 700, marginBottom: 16, width: 'fit-content' }}>
                  {articleUne.categorie}
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: TEXT, marginBottom: 12, lineHeight: 1.3 }}>{articleUne.titre}</h2>
                <p style={{ fontSize: 14, color: TEXT_DIM, lineHeight: 1.7, marginBottom: 20 }}>{articleUne.description}</p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: TEXT_DIM }}>{articleUne.date}</span>
                  <span style={{ fontSize: 12, color: TEXT_DIM }}>· {articleUne.lecture} de lecture</span>
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* TOUS LES ARTICLES */}
        <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 24 }}>Tous les articles</p>
        <div className="grid-3">
          {autresArticles.map(article => (
            <a key={article.slug} href={`/blog/${article.slug}`} className="card" style={{ border: '1px solid #E5E7EB', borderRadius: 16, overflow: 'hidden', display: 'block', background: '#FFFFFF' }}>
              <div style={{ position: 'relative' }}>
                <img src={article.photo} alt={article.titre} style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: CATEGORIES_COULEURS[article.categorie] || ORANGE, color: '#FFFFFF', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 700 }}>
                  {article.categorie}
                </span>
              </div>
              <div style={{ padding: 20 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: TEXT, marginBottom: 8, lineHeight: 1.4 }}>{article.titre}</h2>
                <p style={{ fontSize: 13, color: TEXT_DIM, lineHeight: 1.6, marginBottom: 16 }}>{article.description}</p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: TEXT_DIM }}>{article.date}</span>
                  <span style={{ fontSize: 12, color: TEXT_DIM }}>· {article.lecture}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12 }}>LocaDirect</p>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Prêt à louer ou à partir en vacances ?</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 28, maxWidth: 440, margin: '0 auto 28px' }}>
            Des centaines de logements en location directe, sans commission. Contact WhatsApp direct avec les propriétaires.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/logements" style={{ background: ORANGE, color: '#FFFFFF', borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 700 }}>
              Trouver un logement →
            </a>
            <a href="/inscription" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.2)' }}>
              Publier mon logement
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
