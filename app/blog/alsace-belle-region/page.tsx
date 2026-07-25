import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'L\'Alsace, une si belle région — portrait d\'une terre unique | LocaDirect',
  description: 'Entre France et Allemagne, l\'Alsace est une région à part. Ses traditions, sa gastronomie, ses paysages, son histoire — portrait d\'une terre qui ne ressemble à aucune autre.',
}

const ORANGE = '#EA580C'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'
const ALSACE = '#C41E3A'
const ALSACE_LIGHT = '#FFF1F2'

export default function ArticleAlsaceRegionPage() {
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
        blockquote { border-left: 4px solid #C41E3A; padding: 16px 24px; background: #FFF1F2; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #C41E3A; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/location-vacances/grand-est" style={{ background: ALSACE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Logements Alsace</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 520 }}>
        <img src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1400&q=85" alt="Paysage alsacien vignes et villages" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ALSACE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>🌸 Portrait de région</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 10 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            L'Alsace, une si belle région — portrait d'une terre unique
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>
        <blockquote>
          "L'Alsace est peut-être la seule région de France où vous pouvez commander un Riesling dans un bistrot, voir une cigogne nichée sur la cheminée d'en face et entendre parler alsacien à la table d'à côté. C'est une région qui n'existe nulle part ailleurs."
        </blockquote>

        <p>Il y a des régions que l'on visite. Et il y en a d'autres que l'on ressent. L'Alsace fait partie de ces dernières. Coincée entre le Rhin et les Vosges, entre la France et l'Allemagne, elle a forgé au fil des siècles une identité si forte, si particulière, qu'elle ne ressemble à aucune autre région au monde. Un voyage en Alsace, c'est un voyage dans une région qui a réussi l'impossible : être profondément française et profondément elle-même en même temps.</p>

        <h2>Une histoire singulière — entre deux pays</h2>
        <p>L'Alsace a changé de nationalité quatre fois entre 1870 et 1945 — allemande de 1871 à 1918, française de 1918 à 1940, allemande à nouveau de 1940 à 1945, puis définitivement française. Cette histoire tumultueuse a forgé une culture hybride unique : des noms de famille et de villages à consonance germanique, une architecture alsacienne que l'on ne trouve nulle part ailleurs, une gastronomie qui emprunte autant à la tradition française qu'aux influences rhénanes, et une langue — l'alsacien — qui résiste encore aujourd'hui.</p>

        <p>Loin d'être un handicap, cette dualité est la plus grande richesse de la région. L'Alsacien est à l'aise dans les deux cultures — il cite Goethe et Hugo avec la même aisance, il boit du Riesling avec une choucroute et du Pinot Gris avec un foie gras, il célèbre Noël avec la même ferveur qu'un Bavarois et la même générosité qu'un Français.</p>

        <h2>Les paysages — une région en trois étages</h2>

        <h3>🌲 Les Vosges — la montagne protectrice</h3>
        <p>À l'ouest, les Vosges forment une barrière naturelle qui protège l'Alsace des vents humides de l'Atlantique — c'est pourquoi l'Alsace est l'une des régions les plus ensoleillées de France malgré sa latitude. Les Hautes-Vosges (jusqu'au Grand Ballon, point culminant à 1 424 m) offrent randonnées, lacs d'altitude et ski alpin. Les Basses-Vosges, couvertes de forêts de sapins, abritent les villages de grès rose et les châteaux médiévaux les plus romantiques de France.</p>

        <h3>🍇 Le Piémont vosgien — le cœur de l'Alsace</h3>
        <p>Entre la montagne et la plaine, sur une bande de territoire d'une vingtaine de kilomètres de large et 170 km de long, se concentre l'essentiel de ce qui fait l'Alsace : les vignobles, les villages à colombages, les marchés de Noël, les châteaux en ruines perchés sur leurs promontoires. C'est ici que l'Alsace est la plus belle, la plus dense, la plus elle-même.</p>

        <h3>🌾 La plaine du Rhin — entre tradition et modernité</h3>
        <p>À l'est, la plaine alsacienne est l'une des plus fertiles de France. Maïs, houblon, tabac, brasseries — la plaine alsacienne est une terre de production. Strasbourg y trône comme une île, Capitale européenne avec le Parlement et le Conseil de l'Europe, cosmopolite et dynamique tout en restant profondément alsacienne.</p>

        <h2>Les traditions — un art de vivre unique</h2>

        <h3>🦢 La cigogne — l'animal emblème</h3>
        <p>La cigogne blanche est le symbole de l'Alsace. Après avoir failli disparaître dans les années 1970 (moins de 10 couples nicheurs), elle a été réintroduite avec succès et compte aujourd'hui plus de 700 couples en Alsace. Voir une cigogne nicher sur le toit d'une maison à colombages est l'image la plus alsacienne qui soit.</p>

        <h3>🎄 Noël — la grande tradition</h3>
        <p>Noël en Alsace n'est pas une façade touristique — c'est une tradition vivante. L'Avent est célébré avec une ferveur authentique : couronne de l'Avent sur la table, calendrier de l'Avent fait main, bredele cuits en famille, sapin décoré selon des codes transmis de génération en génération. Les marchés de Noël sont l'expression publique de cette foi en la beauté de décembre.</p>

        <h3>🏡 L'habitat — les maisons à colombages</h3>
        <p>Les maisons à colombages alsaciennes (Fachwerkhäuser) sont uniques en France. Leur structure en bois apparent, peinte de couleurs vives — rouge, vert, bleu — et décorée de géraniums rouges en été, est le visage le plus reconnaissable de la région. Eguisheim, Riquewihr, Kaysersberg, Obernai — dans ces villages, presque chaque maison est un chef-d'œuvre d'architecture populaire.</p>

        <h2>La gastronomie — une identité dans l'assiette</h2>
        <p>La cuisine alsacienne est peut-être la plus cohérente et la plus identitaire de France. Elle a su rester vraie sans devenir muséifiée :</p>
        <ul>
          <li>La choucroute, le baeckeoffe et la tarte flambée sont encore préparés selon les recettes d'antan</li>
          <li>Les vins alsaciens (Riesling, Gewurztraminer, Pinot Gris) sont parmi les plus originaux et les plus gastronomiques de France</li>
          <li>La bière alsacienne (Kronenbourg, Fischer, Météor, Licorne) tient une place à part dans la culture locale</li>
          <li>La pâtisserie alsacienne (kouglof, bredele, pain d'épices) est une tradition vivante dans chaque famille</li>
        </ul>

        <h2>Strasbourg — une capitale à part</h2>
        <p>Strasbourg est une anomalie heureuse. Capitale de l'Alsace, siège du Parlement Européen et du Conseil de l'Europe, ville universitaire de 300 000 habitants — elle est tout cela à la fois. Sa Grande Île, classée au patrimoine mondial de l'UNESCO depuis 1988, est l'un des centres historiques les mieux préservés d'Europe. La cathédrale Notre-Dame rose, les maisons de la Petite France, les ponts couverts — Strasbourg est une ville qui mérite plusieurs jours.</p>

        <h2>Quand visiter l'Alsace ?</h2>
        <ul>
          <li><strong>Printemps (avril-mai)</strong> — vergers en fleurs, premières terrasses, peu de touristes</li>
          <li><strong>Été (juin-août)</strong> — haute saison, vignobles verts, festivals, plein air</li>
          <li><strong>Automne (septembre-octobre)</strong> — vendanges, couleurs d'or des vignes, Route des Vins au meilleur</li>
          <li><strong>Hiver (décembre)</strong> — les marchés de Noël, la magie, l'Alsace dans toute sa splendeur</li>
        </ul>

        <p>En vérité, il n'y a pas de mauvaise saison pour visiter l'Alsace. C'est l'une des rares régions de France qui offre une expérience authentique et mémorable quelle que soit la période de l'année.</p>

        <div style={{ background: `linear-gradient(135deg, ${ALSACE} 0%, #991B1B 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🌸</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Vivez l'Alsace de l'intérieur</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 20 }}>Maisons à colombages, gîtes chez les vignerons, appartements en vieille ville. Louez directement chez les propriétaires alsaciens.</p>
          <a href="/location-vacances/grand-est" style={{ display: 'inline-block', background: WHITE, color: ALSACE, borderRadius: 12, padding: '14px 28px', fontSize: 15, fontWeight: 800 }}>
            Voir les logements en Alsace →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'vignobles-alsace', titre: 'Vignobles alsaciens — la Route des Vins d\'Alsace' },
              { slug: 'marches-noel-alsace', titre: 'Les plus beaux marchés de Noël d\'Alsace' },
              { slug: 'chateaux-illumines-alsace', titre: 'Les plus beaux châteaux illuminés d\'Alsace' },
              { slug: 'restaurants-alsace-noel', titre: 'Les meilleurs restaurants d\'Alsace à Noël' },
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
