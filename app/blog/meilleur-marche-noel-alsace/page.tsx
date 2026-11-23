import type { Metadata } from 'next'
import Link from 'next/link'
import ArticleLayout, { articleStyles as s } from '@/components/article/ArticleLayout'
import { titreGoogle } from '@/lib/seo'

const SLUG = "meilleur-marche-noel-alsace"
const TITRE = "Quel est le plus beau marché de Noël d’Alsace ? On tranche."
const CHAPEAU = "Strasbourg ou Colmar ? Kaysersberg ou Ribeauvillé ? Notre comparatif complet sans langue de bois."

export const metadata: Metadata = {
  title: { absolute: titreGoogle("Quel est le plus beau marché de Noël d'Alsace ?") },
  description: "Strasbourg ou Colmar ? Kaysersberg ou Ribeauvillé ? On tranche. Notre comparatif complet pour choisir le marché de Noël alsacien qui correspond à votre voyage.",
  alternates: { canonical: `https://www.loca-direct.fr/blog/${SLUG}` },
  openGraph: { type: 'article', title: TITRE, description: CHAPEAU, url: `https://www.loca-direct.fr/blog/${SLUG}`, publishedTime: "2026-07-04" },
}

const SECTIONS = [{"id": "notre-verdict-kaysersberg-pour-l-authenticite", "titre": "Notre verdict : Kaysersberg pour l'authenticité"}, {"id": "strasbourg-pour-l-experience-complete", "titre": "Strasbourg — pour l'expérience complète"}, {"id": "colmar-pour-les-photos-et-le-romantisme", "titre": "Colmar — pour les photos et le romantisme"}, {"id": "notre-recommandation-selon-votre-profil", "titre": "Notre recommandation selon votre profil"}, {"id": "le-secret-des-locaux-les-marches-que-les-touristes-ne-connai", "titre": "Le secret des locaux — les marchés que les touristes ne connaissent pas"}]

export default function Article() {
  return (
    <ArticleLayout
      slug={SLUG}
      categorie="Noël en Alsace"
      titre={TITRE}
      chapeau={CHAPEAU}
      publie="2026-07-04"
      misAJour="2026-07-04"
      lecture="6 min"
      sections={SECTIONS}
    >
      <p>Chaque année, la même question revient : Strasbourg ou Colmar ? Le grand ou le pittoresque ? L’ambiance urbaine ou le village de conte ? Après des années à parcourir les marchés alsaciens, voici notre réponse honnête, sans langue de bois.</p>

      <h2 id="notre-verdict-kaysersberg-pour-l-authenticite">Notre verdict : Kaysersberg pour l’authenticité</h2>
      <p>Si vous ne devez en choisir qu’un seul et que vous cherchez l’authenticité, choisissez Kaysersberg. Ce village de 3 000 habitants classe ses chalets dans les ruelles médiévales — pas dans une grande place bétonnée. Les artisans sont de vrais artisans locaux. L’ambiance est intime. Le vin chaud est servi dans des chopes en céramique faites main. Et vous pouvez croiser les habitants qui font leurs courses entre les touristes.</p>
      <div className={s.note}>
      <p>Kaysersberg — notre coup de cœur</p>
      <p>Idéal pour : les couples, les amoureux de l’authentique, les visites en semaine<br/>À éviter : les week-ends du 8, 13 et 20 décembre — c’est la folie</p>
      </div>

      <h2 id="strasbourg-pour-l-experience-complete">Strasbourg — pour l’expérience complète</h2>
      <p>Strasbourg est le plus grand, le plus connu, le plus beau par son décor urbain. La cathédrale illuminée, l’arbre de 30 mètres, la patinoire, les 300 chalets — c’est une expérience à vivre au moins une fois. En revanche, c’est aussi le plus fréquenté : 2 millions de visiteurs en 4 semaines, c’est 70 000 personnes par jour certains week-ends. Notre conseil : venez en semaine, idéalement un lundi ou mardi.</p>
      <div>
      <p>Idéal pour : les familles, les premiers visiteurs, les amateurs de grande ambiance<br/> À éviter : les week-ends, les 13 et 20 décembre</p>
      </div>

      <h2 id="colmar-pour-les-photos-et-le-romantisme">Colmar — pour les photos et le romantisme</h2>
      <p>Colmar gagne haut la main le titre du marché le plus photogénique. La Petite Venise avec ses maisons colorées reflétées dans les canaux illuminés est une image qui fait le tour d’Instagram chaque décembre. C’est aussi le marché qui monte le plus en qualité depuis quelques années — les organisateurs ont fait un vrai effort pour sélectionner des artisans de qualité.</p>
      <div>
      <p>Idéal pour : les couples, la photo, les visites le soir<br/> À éviter : le dimanche après-midi — c’est ingérable</p>
      </div>

      <h2 id="notre-recommandation-selon-votre-profil">Notre recommandation selon votre profil</h2>

      <div>
      {[
      { emoji: '💑', profil: 'En couple romantique', conseil: 'Colmar le soir en semaine + Kaysersberg le lendemain matin' },
      { emoji: '👨‍👩‍👧‍👦', profil: 'En famille avec enfants', conseil: 'Strasbourg + spectacle de Saint-Nicolas le 6 décembre' },
      { emoji: '👯', profil: 'Entre amis', conseil: 'Ribeauvillé le vendredi soir + Colmar le samedi + Kaysersberg le dimanche matin' },
      { emoji: '🎨', profil: 'Amateur d\'artisanat', conseil: 'Kaysersberg + Eguisheim + Bergheim (moins connu, artisans locaux)' },
      { emoji: '📸', profil: 'Photographe', conseil: 'Colmar à l\'aube (avant 8h) + Strasbourg le soir en semaine' },
      { emoji: '🍷', profil: 'Amateur de gastronomie', conseil: 'La Route des Vins de Noël : Barr + Obernai + Molsheim' },
      ].map(item => (
      <div key={item.profil}>
      <span>{item.emoji}</span>
      <div>
      <p>{item.profil}</p>
      <p>{item.conseil}</p>
      </div>
      </div>
      ))}
      </div>

      <h2 id="le-secret-des-locaux-les-marches-que-les-touristes-ne-connai">Le secret des locaux — les marchés que les touristes ne connaissent pas</h2>
      <ul>
      <li><strong>Bergheim</strong> — village médiéval fortifié, marché très confidentiel, artisans uniquement locaux</li>
      <li><strong>Hunawihr</strong> — 600 habitants, marché d’une nuit seulement (le 2e samedi de décembre), magique</li>
      <li><strong>Andlau</strong> — entre deux abbayes romanes, un marché qui sent encore l’Alsace d’avant le tourisme</li>
      <li><strong>Selestat</strong> — la ville qui a inventé le sapin de Noël (1521). Marché sous-estimé avec une atmosphère unique</li>
      </ul>

      <div className={s.cta}>
        <h2>Préparez votre séjour de Noël en Alsace</h2>
        <p>Trouvez votre logement en direct avec les propriétaires alsaciens. Sans commission.</p>
        <Link href="/location-vacances/grand-est" className={s.ctaButton}>
          Voir les logements
        </Link>
      </div>
    </ArticleLayout>
  )
}
