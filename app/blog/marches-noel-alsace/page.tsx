import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Les plus beaux marchés de Noël d\'Alsace — guide complet 2026 | LocaDirect',
  description: 'Strasbourg, Colmar, Kaysersberg, Ribeauvillé... L\'Alsace possède les plus beaux marchés de Noël de France et d\'Europe. Notre sélection et tous nos conseils pratiques.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const NOEL = '#B91C1C'
const NOEL_LIGHT = '#FEF2F2'
const OR = '#92400E'
const OR_LIGHT = '#FFFBEB'

export default function ArticleMarchesNoelPage() {
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
        blockquote { border-left: 4px solid #B91C1C; padding: 16px 24px; background: #FEF2F2; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #B91C1C; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/blog/logement-alsace-noel" style={{ background: NOEL, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>🎄 Logements Alsace Noël</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 500 }}>
        <img src="https://images.unsplash.com/photo-1544985361-b420d7a77043?w=1400&q=85" alt="Marché de Noël Alsace illuminé" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: NOEL, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🎄 Noël en Alsace</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 8 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Les plus beaux marchés de Noël d'Alsace — notre sélection complète
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "Visiter l'Alsace à Noël, c'est vivre dans un conte de Grimm. Les maisons à colombages éclairées aux bougies, l'odeur du vin chaud et des bretzels chauds, la neige sur les toits... Rien de tel nulle part en France."
        </blockquote>

        <p>L'Alsace est la région des marchés de Noël. Depuis 1570 à Strasbourg — le plus ancien de France — jusqu'aux plus intimes villages du vignoble, l'Alsace vit Noël comme nulle autre région. Chaque week-end de l'Avent, des millions de visiteurs affluent de toute l'Europe pour vivre cette magie unique. Voici notre sélection des marchés que vous ne pouvez pas manquer.</p>

        <h2>🥇 Le Marché de Noël de Strasbourg — le plus grand et le plus ancien</h2>
        <p>Le Christkindelsmärik (Marché de l'Enfant Jésus) de Strasbourg est le plus ancien marché de Noël de France, fondé en 1570. Chaque année, ses 300 chalets en bois répartis sur 11 sites différents dans le centre historique accueillent plus de 2 millions de visiteurs pendant les 4 semaines de l'Avent. La Grande Sapin de la Place Kléber, haut de 30 mètres, est allumé chaque premier vendredi de décembre lors d'une cérémonie très suivie.</p>
        <div style={{ background: NOEL_LIGHT, borderRadius: 12, padding: 16, marginBottom: 20, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid #FECACA` }}>
          <p style={{ fontSize: 13, color: NOEL, marginBottom: 4, fontWeight: 700 }}>📅 Dates 2026 : 27 novembre — 27 décembre</p>
          <p style={{ fontSize: 13, color: '#991B1B', marginBottom: 0 }}>⚠️ Réservez votre logement 6 à 8 mois à l'avance pour les week-ends. Les prix triplent en décembre.</p>
        </div>

        <p>Les sites incontournables du marché de Strasbourg :</p>
        <ul>
          <li><strong>Place Broglie</strong> — le marché principal avec les chalets en bois, l'arbre géant et la patinoire</li>
          <li><strong>Place de la Cathédrale</strong> — face à la façade rose de Notre-Dame, ambiance inégalable</li>
          <li><strong>Place du Marché aux Cochons de Lait</strong> — le marché des saveurs, gastronomie alsacienne</li>
          <li><strong>Place du Château</strong> — le marché des arts et traditions populaires</li>
          <li><strong>Place Saint-Thomas</strong> — le marché des arts de la table</li>
        </ul>

        <h2>🥈 Le Marché de Noël de Colmar — le plus romantique</h2>
        <p>Si Strasbourg est le plus grand, Colmar est le plus beau. La "Petite Venise" alsacienne avec ses canaux, ses maisons à colombages multicolores et ses ruelles pavées offre un décor de conte de fées incomparable. Ses cinq marchés thématiques se déroulent en différents points de la vieille ville, chacun avec son ambiance propre.</p>
        <ul>
          <li><strong>Marché des Dominicains</strong> — le plus traditionnel, sous les voûtes d'une église gothique</li>
          <li><strong>Marché de la Place de l'Ancienne Douane</strong> — le plus animé</li>
          <li><strong>Marché de la Petite Venise</strong> — le plus photographique, sur les berges de la Lauch</li>
          <li><strong>Marché des Jouets</strong> — Place des Six Montagnes Noires</li>
          <li><strong>Marché des Gourmets</strong> — Place de la Cathédrale</li>
        </ul>

        <h2>🥉 Le Marché de Noël de Kaysersberg — le plus authentique</h2>
        <p>Kaysersberg, classé parmi les Plus Beaux Villages de France, organise l'un des marchés de Noël les plus authentiques d'Alsace. Petit (une quarantaine de chalets), intime, avec des artisans locaux qui proposent des créations uniques. Pas de tourisme de masse, pas de stands de camelote — que de l'artisanat véritable. À faire absolument en semaine pour éviter l'afflux du week-end.</p>

        <h2>🎄 Ribeauvillé — le marché des vins chauds</h2>
        <p>Ribeauvillé propose chaque week-end de l'Avent un marché médiéval éclairé aux flambeaux. Le particularité : les stands proposent uniquement des produits régionaux et artisanaux, et le vin chaud est servi dans des verrines en verre réutilisables. L'ambiance est intimiste et chaleureuse, très différente des grands marchés urbains.</p>

        <h2>✨ Eguisheim — le village de crèches</h2>
        <p>Chaque maison d'Eguisheim expose une crèche dans sa fenêtre pendant l'Avent. Se promener dans les rues circulaires de ce village, lanterne à la main, est une expérience inoubliable. Le marché est petit mais délicieux — bredele (petits gâteaux alsaciens), pain d'épices maison, décorations en bois sculptées à la main.</p>

        <h2>🌟 Hunawihr et Zellenberg — les secrets bien gardés</h2>
        <p>Ces deux petits villages du vignoble organisent des marchés confidentiels, connus principalement des habitants. Pas de foule, des prix raisonnables, une authenticité totale. Parfaits pour une escapade en couple loin de l'agitation des grands marchés.</p>

        <h2>Les indispensables à goûter</h2>
        <ul>
          <li><strong>Le vin chaud (Glühwein)</strong> — évidemment. Chaque village a sa recette secrète</li>
          <li><strong>Les bredele</strong> — petits gâteaux de Noël alsaciens en dizaines de variétés</li>
          <li><strong>Le pain d'épices de Gertwiller</strong> — capital mondiale du pain d'épices à 10 min de Strasbourg</li>
          <li><strong>Les bretzel chauds</strong> — à manger immédiatement à la sortie du four</li>
          <li><strong>La soupe à l'oignon</strong> — indispensable pour se réchauffer</li>
          <li><strong>Le Flammekueche</strong> — tarte flambée au fromage blanc, lardons et oignons</li>
          <li><strong>La Forêt Noire</strong> — le gâteau emblématique d'Alsace</li>
        </ul>

        <h2>Nos conseils pour bien préparer votre visite</h2>
        <ul>
          <li><strong>Réservez votre logement tôt</strong> — 6 à 8 mois à l'avance pour les week-ends de décembre</li>
          <li><strong>Préférez la semaine</strong> — les marchés sont bien plus agréables du lundi au jeudi</li>
          <li><strong>Habillez-vous chaudement</strong> — les températures descendent à -5°C certaines nuits</li>
          <li><strong>Privilégiez les transports en commun</strong> — le stationnement est un cauchemar en décembre</li>
          <li><strong>Combinez plusieurs marchés</strong> — les villages sont très proches, idéal pour une journée itinérante en voiture</li>
        </ul>

        <div style={{ background: `linear-gradient(135deg, ${NOEL} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎄</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez votre logement pour Noël en Alsace</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Maisons à colombages, appartements en vieille ville, gîtes de charme. Réservez vite — les logements partent des mois à l'avance.</p>
          <a href="/blog/logement-alsace-noel" style={{ display: 'inline-block', background: WHITE, color: NOEL, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Trouver un logement pour Noël →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'logement-alsace-noel', titre: 'Comment trouver un logement en Alsace à Noël ?' },
              { slug: 'restaurants-alsace-noel', titre: 'Les meilleurs restaurants d\'Alsace à Noël' },
              { slug: 'chateaux-illumines-alsace', titre: 'Les plus beaux châteaux illuminés d\'Alsace' },
              { slug: 'alsace-belle-region', titre: 'L\'Alsace, une si belle région' },
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
