import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les plus belles cathédrales de France — guide complet | LocaDirect',
  description: 'Notre-Dame de Paris, Chartres, Reims, Strasbourg, Bourges... La France possède certaines des plus belles cathédrales gothiques au monde. Notre sélection des 10 incontournables.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const PURPLE = '#6D28D9'
const PURPLE_LIGHT = '#F5F3FF'

export default function ArticleCathedralesPage() {
  return (
    <div style={{ background: WHITE, minHeight: '100vh', fontFamily: 'Georgia, serif', color: TEXT }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; color: inherit; }
        p { line-height: 1.85; margin-bottom: 20px; font-size: 17px; color: #374151; }
        h2 { font-size: 24px; font-weight: 800; margin: 40px 0 16px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        h3 { font-size: 19px; font-weight: 700; margin: 28px 0 12px; color: #1F2937; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        ul { padding-left: 24px; margin-bottom: 20px; }
        ul li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 8px; }
        blockquote { border-left: 4px solid #6D28D9; padding: 16px 24px; background: #F5F3FF; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #6D28D9; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/logements" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Trouver un logement</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1400&q=85" alt="Cathédrale Notre-Dame de Paris" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: PURPLE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>⛪ Patrimoine</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 8 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Les plus belles cathédrales de France — notre sélection des 10 incontournables
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Entrer dans la cathédrale de Chartres, c'est comprendre pourquoi des hommes ont consacré leur vie entière à construire quelque chose d'aussi grand." — Victor Hugo
        </blockquote>

        <p>La France est le pays des cathédrales gothiques. Nulle part ailleurs dans le monde la concentration de chef-d'œuvres architecturaux religieux n'est aussi dense. Du XIIe au XVe siècle, des générations d'architectes, de tailleurs de pierre et de verriers ont rivalisé d'audace pour élever vers le ciel des édifices d'une beauté surnaturelle. Voici les dix que vous devez absolument voir.</p>

        <h2>🥇 Notre-Dame de Paris — la renaissance d'un symbole</h2>
        <p>Après l'incendie dévastateur d'avril 2019 et cinq ans de restauration exceptionnelle, Notre-Dame de Paris a rouvert ses portes en décembre 2024. La cathédrale retrouvée est encore plus belle que l'originale dans certains détails — les artisans ont utilisé les techniques médiévales authentiques. Construite entre 1163 et 1345, elle reste le monument le plus visité de France avec 12 millions de visiteurs par an.</p>
        <div style={{ background: PURPLE_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #DDD6FE` }}>
          <p style={{ fontSize: 13, color: PURPLE, marginBottom: 0 }}>💡 Réservez votre visite en ligne sur le site officiel. L'entrée est gratuite mais les visites des tours nécessitent une réservation (15€).</p>
        </div>

        <h2>🥈 Cathédrale de Chartres — la perfection gothique</h2>
        <p>Classée au patrimoine mondial de l'UNESCO, la cathédrale Notre-Dame de Chartres est considérée par les spécialistes comme le chef-d'œuvre absolu de l'art gothique. Construite entre 1194 et 1220 (une vitesse record pour l'époque), elle conserve ses deux flèches d'origine et surtout ses vitraux du XIIe siècle, d'une qualité et d'une conservation exceptionnelles. Le bleu de Chartres est unique au monde.</p>

        <h2>🥉 Cathédrale de Reims — le sacre des rois de France</h2>
        <p>C'est dans cette cathédrale que 25 rois de France ont été sacrés, de Clovis à Charles X. La façade occidentale est l'une des plus riches et des mieux conservées du monde gothique, avec ses 2 303 statues. Gravement endommagée pendant la Première Guerre mondiale, elle a été entièrement restaurée. Les vitraux de Marc Chagall dans la chapelle axiale sont un incontournable.</p>

        <h2>La Sainte-Chapelle de Paris — le chef-d'œuvre de lumière</h2>
        <p>Techniquement une chapelle royale et non une cathédrale, la Sainte-Chapelle mérite néanmoins sa place dans cette liste. Construite en seulement 7 ans (1242-1248) pour abriter les reliques de la Passion, elle est recouverte sur 75% de sa surface par des vitraux du XIIIe siècle. Par temps ensoleillé, l'intérieur se transforme en un kaléidoscope de lumière colorée d'une beauté à couper le souffle.</p>

        <h2>Cathédrale de Strasbourg — la dentelle de grès rose</h2>
        <p>Pendant 229 ans (1647-1874), la cathédrale de Strasbourg a été l'édifice le plus haut du monde. Son grès rose des Vosges lui donne une couleur chaude et unique. La façade occidentale, commencée en 1277, est un dentelle de pierre d'une complexité vertigineuse. À l'intérieur, l'horloge astronomique du XVIe siècle est une merveille mécanique qui sonne tous les jours à 12h30.</p>

        <h2>Cathédrale de Bourges — l'espace et la lumière</h2>
        <p>Classée au patrimoine mondial de l'UNESCO, la cathédrale Saint-Étienne de Bourges frappe par son absence de transept — une configuration rare qui crée un espace intérieur d'une ampleur impressionnante. Ses vitraux des XIIe et XIIIe siècles sont parmi les mieux conservés de France, avec des représentations narratives de la Bible d'une finesse incomparable.</p>

        <h2>Cathédrale d'Amiens — la plus grande de France</h2>
        <p>La cathédrale Notre-Dame d'Amiens est la plus grande cathédrale de France par son volume intérieur (200 000 m³). Son chœur, construit en seulement 40 ans (1220-1270), a servi de modèle à toutes les grandes cathédrales gothiques suivantes. Les soirs d'été, un spectacle sons et lumières restitue les couleurs originales de la façade, peinte au Moyen Âge.</p>

        <h2>Cathédrale de Rouen — la cathédrale de Monet</h2>
        <p>Claude Monet a peint la façade de la cathédrale de Rouen plus de 30 fois, à différentes heures et dans différentes lumières. C'est la cathédrale gothique la plus haute de France avec sa flèche de 151 mètres. Son trésor architectural est immense : portails sculptés, verrières médiévales, tombeaux de Richard Cœur de Lion et des ducs de Normandie.</p>

        <h2>Cathédrale de Lyon — entre deux fleuves</h2>
        <p>La primatiale Saint-Jean de Lyon, construite entre 1175 et 1480, mêle art roman et gothique dans un mariage surprenant. Son horloge astronomique du XIVe siècle sonne à 12h, 14h, 15h et 16h avec la mise en mouvement de ses figurines automatiques. Lyon, entre Rhône et Saône, mérite à elle seule un séjour de plusieurs jours.</p>

        <h2>Cathédrale de Metz — la lanterne divine</h2>
        <p>Surnommée la "Lanterne du Bon Dieu", la cathédrale Saint-Étienne de Metz possède la plus grande surface vitrée de France : 6 500 m² de vitraux couvrant 70% de sa surface. Parmi eux, des vitraux de Marc Chagall et de Jacques Villon côtoient des œuvres médiévales du XIIIe siècle. Une symphonie de lumière colorée unique.</p>

        <div style={{ background: `linear-gradient(135deg, ${PURPLE} 0%, #5B21B6 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⛪</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Séjournez près des plus belles cathédrales</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Logements en direct à Paris, Chartres, Reims, Strasbourg... Contact direct sans commission.</p>
          <a href="/logements" style={{ display: 'inline-block', background: WHITE, color: PURPLE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir tous les logements →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'vignobles-alsace', titre: 'Visite des vignobles alsaciens — la Route des Vins' },
              { slug: 'chateaux-de-la-loire', titre: 'Les châteaux de la Loire — guide de visite' },
              { slug: 'reserver-direct-plutot-airbnb', titre: 'Pourquoi réserver en direct plutôt qu\'Airbnb ?' },
            ].map(a => (
              <a key={a.slug} href={`/blog/${a.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: GRAY, borderRadius: 12, border: `1px solid ${BORDER}` }}>
                <span style={{ fontSize: 18 }}>📖</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{a.titre}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
