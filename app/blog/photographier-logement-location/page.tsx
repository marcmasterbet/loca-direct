import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comment bien photographier son logement pour le louer ? | LocaDirect',
  description: 'Des photos de qualité peuvent doubler vos réservations. Voici les techniques simples utilisées par les professionnels, applicables avec un simple smartphone.',
}

const ORANGE = '#EA580C'
const ORANGE_LIGHT = '#FFF7ED'
const WHITE = '#FFFFFF'
const GRAY = '#F9FAFB'
const TEXT = '#1F2937'
const TEXT_DIM = '#6B7280'
const BORDER = '#E5E7EB'

export default function ArticlePhotoPage() {
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
        ol { padding-left: 24px; margin-bottom: 20px; }
        ol li { font-size: 17px; line-height: 1.8; color: #374151; margin-bottom: 12px; }
        blockquote { border-left: 4px solid #EA580C; padding: 16px 24px; background: #FFF7ED; border-radius: 0 12px 12px 0; margin: 28px 0; font-style: italic; color: #92400E; }
      `}</style>

      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: WHITE, borderBottom: `1px solid ${BORDER}`, padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 34, height: 34, background: ORANGE, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🏠</div>
          <span style={{ fontSize: 18, fontWeight: 800, color: TEXT }}>Loca<span style={{ color: ORANGE }}>Direct</span></span>
        </a>
        <div style={{ display: 'flex', gap: 8, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <a href="/blog" style={{ fontSize: 14, color: TEXT_DIM, padding: '8px 14px' }}>← Blog</a>
          <a href="/prestataires/photographe/ile-de-france" style={{ background: ORANGE, color: WHITE, borderRadius: 10, padding: '10px 18px', fontSize: 14, fontWeight: 700 }}>Trouver un photographe</a>
        </div>
      </nav>

      <div style={{ position: 'relative', height: 460 }}>
        <img src="https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80" alt="Photographier un intérieur" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '40px 20px', maxWidth: 780, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            <span style={{ background: ORANGE, color: WHITE, borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 800 }}>📸 Propriétaires</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>4 juillet 2026 · 7 min de lecture</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 900, color: WHITE, lineHeight: 1.2, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', maxWidth: 700 }}>
            Comment bien photographier son logement pour le louer ?
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '48px 20px 80px' }}>

        <blockquote>
          "J'ai refait mes photos un dimanche matin avec mon iPhone. La semaine suivante, j'avais reçu 3 fois plus de demandes." — Sophie, propriétaire à Lyon
        </blockquote>

        <p>
          Les photos sont la première chose que voit un futur locataire. Avant de lire la description, avant de regarder le prix, avant même de regarder la localisation — les photos déterminent si quelqu'un va s'arrêter ou passer à la suivante. Des études montrent que de bonnes photos peuvent augmenter les réservations de 40 à 60%.
        </p>

        <h2>Le matériel — votre smartphone suffit</h2>

        <p>
          Inutile d'investir dans un appareil photo professionnel. Un iPhone ou un Samsung récent fait des photos largement suffisantes. Ce qui compte, c'est la lumière et la composition, pas le matériel.
        </p>

        <ul>
          <li><strong>Smartphone récent</strong> — mode portrait désactivé pour les pièces (trop de flou artificiel)</li>
          <li><strong>Trépied</strong> — 15€ sur Amazon, essentiel pour éviter le flou et avoir des angles parfaits</li>
          <li><strong>Application</strong> — Lightroom Mobile (gratuit) pour retoucher rapidement</li>
        </ul>

        <h2>La lumière — le secret de tout</h2>

        <p>
          C'est le facteur numéro un. Une pièce mal éclairée semblera sombre et triste même si elle est magnifique. Voici comment maîtriser la lumière :
        </p>

        <h3>Le bon moment</h3>
        <p>
          Photographiez le matin tôt ou en fin d'après-midi. La lumière est douce et chaude. Évitez la mi-journée (lumière trop dure) et les jours nuageux épais (lumière plate et grise).
        </p>

        <h3>Maximisez la lumière naturelle</h3>
        <ul>
          <li>Ouvrez tous les volets et rideaux au maximum</li>
          <li>Allumez toutes les lampes, même en pleine journée</li>
          <li>Si une pièce est sombre, évitez de la photographier face à la fenêtre</li>
          <li>Un miroir bien placé peut doubler la luminosité perçue</li>
        </ul>

        <h2>La composition — l'art de montrer l'espace</h2>

        <h3>Photographiez depuis le coin de la pièce</h3>
        <p>
          La règle d'or : placez-vous dans un coin de la pièce et photographiez vers l'angle opposé. Cette technique capture le maximum d'espace et donne une sensation de volume. Ne photographiez jamais face à un mur.
        </p>

        <h3>L'angle de prise de vue</h3>
        <p>
          Hauteur : environ 1,20 m (à la hauteur d'un plan de travail). Pas trop bas (ça déforme), pas trop haut (ça rapetisse). Le trépied est votre meilleur ami pour trouver le bon angle à chaque fois.
        </p>

        <h3>L'horizontalité</h3>
        <p>
          Vérifiez que vos photos sont parfaitement horizontales. Une photo légèrement penchée est très désagréable visuellement. Activez la grille sur votre smartphone (Paramètres › Appareil photo › Grille).
        </p>

        <h2>La mise en scène — le home staging</h2>

        <p>
          Avant de photographier, préparez chaque pièce comme si vous receviez des invités importants :
        </p>

        <ol>
          <li><strong>Désencombrez</strong> — retirez tout ce qui traîne. Les photos avec des objets personnels font "appartement habité", pas "location de vacances"</li>
          <li><strong>La cuisine</strong> — un bol de fruits frais, une cafetière propre, des verres bien alignés</li>
          <li><strong>Le salon</strong> — coussins bien placés, plaid joliment posé sur le canapé, une plante verte</li>
          <li><strong>La chambre</strong> — lit fait impeccablement, oreillers bien gonflés, lumière de chevet allumée</li>
          <li><strong>La salle de bain</strong> — serviettes pliées en hôtel, pas d'articles de toilette visibles</li>
          <li><strong>L'extérieur</strong> — table de jardin dressée avec quelques éléments décoratifs</li>
        </ol>

        <h2>Les photos indispensables</h2>

        <p>Une annonce efficace doit comporter au minimum 10 à 15 photos :</p>

        <ul>
          <li>Photo extérieure (façade, entrée, vue depuis la rue)</li>
          <li>2-3 photos du salon depuis différents angles</li>
          <li>2-3 photos de la cuisine</li>
          <li>1-2 photos de chaque chambre</li>
          <li>1-2 photos de la salle de bain</li>
          <li>Photos de la terrasse ou du jardin (depuis l'intérieur et de l'extérieur)</li>
          <li>Photo de la vue depuis les fenêtres si elle est belle</li>
          <li>Photo du quartier ou de la rue si l'environnement est agréable</li>
        </ul>

        <h2>La retouche — simple et rapide</h2>

        <p>Avec Lightroom Mobile (gratuit), 3 réglages suffisent :</p>
        <ul>
          <li><strong>Exposition</strong> : +0,5 à +1 pour éclaircir légèrement</li>
          <li><strong>Blanc chaud</strong> : température légèrement vers le chaud (plus accueillant)</li>
          <li><strong>Clarté</strong> : +10 à +20 pour faire ressortir les détails</li>
        </ul>

        <p>Attention à ne pas sur-retoucher. Des photos trop parfaites créent des attentes déçues et de mauvais avis.</p>

        <h2>Faire appel à un professionnel — quand est-ce rentable ?</h2>

        <p>
          Un photographe spécialisé en location saisonnière coûte entre 150 et 400€. Pour un logement à 80€/nuit, si les bonnes photos permettent de louer 5 nuits supplémentaires par an, l'investissement est rentabilisé en quelques mois.
        </p>

        <div style={{ background: ORANGE_LIGHT, borderRadius: 16, padding: '20px 24px', marginBottom: 28, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', border: `1px solid ${ORANGE}` }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: ORANGE, marginBottom: 8 }}>💡 Notre conseil</p>
          <p style={{ fontSize: 13, color: '#92400E', lineHeight: 1.6, marginBottom: 0 }}>
            Commencez par faire vos photos vous-même avec les conseils de cet article. Si après 3 mois vos résultats sont insuffisants, investissez dans un photographe professionnel. LocaDirect référence des photographes spécialisés dans votre région.
          </p>
        </div>

        <div style={{ background: `linear-gradient(135deg, #1F2937 0%, #374151 100%)`, borderRadius: 20, padding: '32px 28px', marginTop: 40, textAlign: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: WHITE, marginBottom: 8 }}>Trouvez un photographe professionnel</h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 20 }}>Des photographes spécialisés en location saisonnière près de chez vous.</p>
          <a href="/prestataires/photographe/ile-de-france" style={{ display: 'inline-block', background: ORANGE, color: WHITE, borderRadius: 12, padding: '13px 24px', fontSize: 14, fontWeight: 700 }}>
            Trouver un photographe →
          </a>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: `1px solid ${BORDER}`, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
          <p style={{ fontSize: 11, color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>À lire aussi</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { slug: 'louer-sans-airbnb-proprietaire', titre: 'Propriétaire — comment louer sans passer par Airbnb ?' },
              { slug: 'conciergerie-location-saisonniere', titre: 'Conciergerie Airbnb — tout ce qu\'il faut savoir' },
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
