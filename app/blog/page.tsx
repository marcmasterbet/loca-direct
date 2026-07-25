import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Conseils location vacances, guides régionaux & propriétaires | LocaDirect',
  description: 'Conseils pour voyageurs et propriétaires, guides régionaux, marchés de Noël, destinations incontournables. Tout ce qu\'il faut savoir pour louer malin et voyager bien.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

const ARTICLES = [
  {
    slug: 'vacances-grand-chien-france',
    titre: 'Vacances avec un grand chien — les meilleures destinations en France',
    description: 'Voyager avec un chien de plus de 10 kg peut vite devenir un casse-tête. Découvrez les régions et logements qui accueillent vraiment vos grands compagnons.',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
    categorie: 'Voyageurs',
    date: '4 juillet 2026',
    lecture: '5 min',
  },
  {
    slug: 'reserver-direct-plutot-airbnb',
    titre: 'Pourquoi réserver en direct plutôt qu\'Airbnb ?',
    description: 'Contact limité, prix gonflés... Voici pourquoi de plus en plus de voyageurs et propriétaires choisissent la location directe.',
    photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    categorie: 'Conseils',
    date: '4 juillet 2026',
    lecture: '6 min',
  },
  {
    slug: 'eviter-arnaques-location-saisonniere',
    titre: 'Comment éviter les arnaques en location saisonnière ?',
    description: '5 règles simples pour ne jamais se faire avoir en réservant un logement de vacances.',
    photo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    categorie: 'Conseils',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'louer-sans-airbnb-proprietaire',
    titre: 'Propriétaire — comment louer sans passer par les grandes plateformes ?',
    description: 'Gardez 100% de vos revenus. Voici comment mettre en location votre logement en direct et attirer des locataires sérieux.',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    categorie: 'Propriétaires',
    date: '4 juillet 2026',
    lecture: '8 min',
  },
  {
    slug: 'vacances-bretagne-guide',
    titre: 'Vacances en Bretagne — le guide complet pour bien choisir son logement',
    description: 'Côte sauvage, crêperies, menhirs... La Bretagne est la région la plus demandée en location saisonnière.',
    photo: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '6 min',
  },
  {
    slug: 'photographier-logement-location',
    titre: 'Comment bien photographier son logement pour le louer ?',
    description: 'Des photos de qualité peuvent doubler vos réservations. Les techniques des professionnels, applicables avec un smartphone.',
    photo: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
    categorie: 'Propriétaires',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'plages-corse',
    titre: 'Les plus belles plages de Corse — notre sélection complète',
    description: 'Palombaggia, Santa Giulia, Rondinara, Saleccia... La Corse possède les plus belles plages de France.',
    photo: 'https://images.unsplash.com/photo-1601628828688-632f38a5a5b2?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '8 min',
  },
  {
    slug: 'gorges-verdon-guide',
    titre: 'Que faire dans les Gorges du Verdon ? Le guide complet',
    description: 'Kayak, randonnée, escalade, baignades... Le Grand Canyon européen vous attend.',
    photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'vendee-guide',
    titre: 'Tour en Vendée — que voir, que faire ? Le guide complet',
    description: 'Puy du Fou, Marais Poitevin, plages atlantiques... La Vendée réserve bien des surprises.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'zoo-sigean-reserve',
    titre: 'Réserve Africaine de Sigean — visite, animaux et conseils pratiques',
    description: 'La plus grande réserve animalière d\'Europe. Girafes, rhinocéros, lions en liberté... Notre guide complet.',
    photo: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80',
    categorie: 'Famille & Activités',
    date: '4 juillet 2026',
    lecture: '6 min',
  },
  {
    slug: 'marseille-guide',
    titre: 'Visiter Marseille — que voir, que faire ? Le guide du local',
    description: 'Vieux-Port, Calanques, MuCEM, Panier, bouillabaisse... Marseille comme vous ne l\'avez jamais vue.',
    photo: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
    categorie: 'Guides villes',
    date: '4 juillet 2026',
    lecture: '8 min',
  },
  {
    slug: 'cathedrales-france',
    titre: 'Les plus belles cathédrales de France — notre sélection des 10 incontournables',
    description: 'Notre-Dame de Paris, Chartres, Reims, Strasbourg... La France possède les plus belles cathédrales gothiques au monde.',
    photo: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',
    categorie: 'Patrimoine',
    date: '4 juillet 2026',
    lecture: '8 min',
  },
  {
    slug: 'vignobles-alsace',
    titre: 'Vignobles alsaciens — la Route des Vins d\'Alsace',
    description: 'Riesling, Gewurztraminer, Pinot Gris... La Route des Vins d\'Alsace traverse 170 km de villages de conte de fées.',
    photo: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'chateaux-de-la-loire',
    titre: 'Les châteaux de la Loire — guide complet pour organiser votre visite',
    description: 'Chambord, Chenonceau, Amboise, Villandry... La vallée de la Loire classée au patrimoine mondial de l\'UNESCO.',
    photo: 'https://images.unsplash.com/photo-1592878897400-8a1e4bff0de4?w=800&q=80',
    categorie: 'Patrimoine',
    date: '4 juillet 2026',
    lecture: '9 min',
  },
  {
    slug: 'marches-noel-alsace',
    titre: 'Les plus beaux marchés de Noël d\'Alsace',
    description: 'Strasbourg, Colmar, Kaysersberg, Ribeauvillé... L\'Alsace possède les plus beaux marchés de Noël de France.',
    photo: 'https://images.unsplash.com/photo-1544985361-b420d7a77043?w=800&q=80',
    categorie: 'Noël en Alsace',
    date: '4 juillet 2026',
    lecture: '8 min',
  },
  {
    slug: 'logement-alsace-noel',
    titre: 'Comment trouver un logement en Alsace pendant les marchés de Noël ?',
    description: 'Les logements partent des mois à l\'avance. Nos conseils pour trouver la perle rare au bon prix.',
    photo: 'https://images.unsplash.com/photo-1543918075-f13d0bbea1f1?w=800&q=80',
    categorie: 'Noël en Alsace',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'meilleur-marche-noel-alsace',
    titre: 'Quel est le plus beau marché de Noël d\'Alsace ? On tranche.',
    description: 'Strasbourg ou Colmar ? Kaysersberg ou Ribeauvillé ? Notre comparatif complet sans langue de bois.',
    photo: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&q=80',
    categorie: 'Noël en Alsace',
    date: '4 juillet 2026',
    lecture: '6 min',
  },
  {
    slug: 'restaurants-alsace-noel',
    titre: 'Les meilleurs restaurants d\'Alsace à Noël',
    description: 'Winstub, étoilés Michelin, brasseries traditionnelles... Nos meilleures adresses gourmandes pour Noël en Alsace.',
    photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    categorie: 'Noël en Alsace',
    date: '4 juillet 2026',
    lecture: '7 min',
  },
  {
    slug: 'chateaux-illumines-alsace',
    titre: 'Les plus beaux châteaux illuminés d\'Alsace à Noël',
    description: 'Haut-Koenigsbourg, Fleckenstein, Saint-Ulrich... Les châteaux alsaciens illuminés à Noël sont un spectacle inoubliable.',
    photo: 'https://images.unsplash.com/photo-1520681279154-51b3fb4ea0b7?w=800&q=80',
    categorie: 'Noël en Alsace',
    date: '4 juillet 2026',
    lecture: '6 min',
  },
  {
    slug: 'alsace-belle-region',
    titre: 'L\'Alsace, une si belle région — portrait d\'une terre unique',
    description: 'Entre France et Allemagne, l\'Alsace est une région à part. Traditions, gastronomie, paysages, histoire — un portrait sincère.',
    photo: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    categorie: 'Guides régionaux',
    date: '4 juillet 2026',
    lecture: '10 min',
  },
]

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
