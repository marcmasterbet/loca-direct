// Liste des articles du guide : utilisée par la page /blog et par le sitemap.
// Pour publier un article : créer app/blog/<slug>/page.tsx puis l'ajouter ici.

export type Article = {
  slug: string
  titre: string
  description: string
  photo: string
  categorie: string
  date: string
  lecture: string
  /** Date de dernière mise à jour au format AAAA-MM-JJ (sitemap). */
  maj?: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'vacances-grand-chien-france',
    titre: 'Partir en vacances avec un grand chien : le guide complet',
    description: "Logement qui l'accepte vraiment, papiers, train, plages, parcs nationaux et santé : tout ce qu'il faut savoir avant de partir avec un chien de plus de 10 kg.",
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
    categorie: 'Voyageurs',
    date: '16 novembre 2026',
    lecture: '12 min',
    maj: '2026-11-16',
  },
  {
    slug: 'louer-en-securite',
    titre: 'Location de vacances entre particuliers : comment payer en sécurité',
    description: 'Contrat, arrhes ou acompte, dépôt de garantie, moyens de paiement à éviter et réflexes en cas d’arnaque.',
    photo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
    categorie: 'Conseils',
    date: '23 novembre 2026',
    lecture: '8 min',
    maj: '2026-11-23',
  },
  {
    slug: 'vendee-avec-son-chien',
    titre: 'La Vendée avec son chien : plages autorisées, horaires et balades',
    description: 'Saint-Jean-de-Monts, Noirmoutier, Les Sables-d’Olonne, Saint-Gilles : les plages où votre chien est accepté, commune par commune.',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    categorie: 'Voyageurs',
    date: '23 novembre 2026',
    lecture: '8 min',
    maj: '2026-11-23',
  },
  {
    slug: 'prix-conciergerie-airbnb',
    titre: 'Combien coûte une conciergerie Airbnb ? Prix, commission et frais cachés',
    description: 'Commission de 15 à 30 %, forfait ou services à la carte : ce que coûte vraiment une conciergerie, et les questions à poser avant de signer.',
    photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    categorie: 'Propriétaires',
    date: '23 novembre 2026',
    lecture: '7 min',
    maj: '2026-11-23',
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
    photo: 'https://images.unsplash.com/photo-1618052290830-4d4892d7296d?w=800&q=80',
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
    photo: 'https://images.unsplash.com/photo-1571301092535-61a418b457dd?w=800&q=80',
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
    photo: 'https://images.unsplash.com/photo-1701943523362-4fc34a738dc4?w=800&q=80',
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
    photo: 'https://images.unsplash.com/photo-1730470566893-7199c999cae3?w=800&q=80',
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

const MOIS: Record<string, string> = {
  janvier: '01', fevrier: '02', février: '02', mars: '03', avril: '04', mai: '05', juin: '06',
  juillet: '07', aout: '08', août: '08', septembre: '09', octobre: '10', novembre: '11', decembre: '12', décembre: '12',
}

/** Convertit « 4 juillet 2026 » en objet Date (ou undefined si illisible). */
export function articleDate(a: Article): Date | undefined {
  if (a.maj) return new Date(a.maj)
  const m = a.date.trim().toLowerCase().match(/^(\d{1,2})\s+(\S+)\s+(\d{4})$/)
  if (!m || !MOIS[m[2]]) return undefined
  return new Date(`${m[3]}-${MOIS[m[2]]}-${m[1].padStart(2, '0')}`)
}
