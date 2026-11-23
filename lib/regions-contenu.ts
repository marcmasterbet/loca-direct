// Textes des pages région : ce qui donne envie de partir, et ce qu'il faut savoir
// quand on part avec son chien. Écrits pour les voyageurs (et pour Google).

export type ContenuRegion = {
  /** Deux ou trois phrases d'introduction */
  intro: string
  /** Idées de séjour, du plus connu au moins connu */
  envies: { titre: string; texte: string }[]
  /** Conseil pour partir avec un chien dans cette région */
  chien: string
  /** Régions voisines (slugs), pour les liens en bas de page */
  voisines: string[]
}

export const CONTENU_REGIONS: Record<string, ContenuRegion> = {
  'auvergne-rhone-alpes': {
    intro:
      "Des Alpes au Massif central, l'Auvergne-Rhône-Alpes se vit dehors : ski l'hiver, randonnée et lacs l'été. Entre les volcans d'Auvergne, les lacs d'Annecy et du Bourget et les villages de l'Ardèche, chacun trouve son rythme.",
    envies: [
      { titre: 'Montagne', texte: 'Chalets et appartements en station, en Savoie et en Haute-Savoie, pour le ski ou la randonnée.' },
      { titre: 'Lacs', texte: 'Annecy, le Bourget, Aiguebelette : baignade, paddle et sentiers en bord d’eau.' },
      { titre: 'Volcans', texte: 'La chaîne des Puys et le Cantal, pour marcher au grand air loin de la foule.' },
      { titre: 'Ardèche', texte: 'Gorges, canoë et villages de pierre, avec un air déjà méridional.' },
    ],
    chien:
      "La montagne est un paradis pour les chiens, mais les cœurs de parc national (Vanoise, Écrins) leur sont interdits, même tenus en laisse. Préférez les sentiers hors parc et les sites Natura 2000, où la laisse suffit souvent.",
    voisines: ['bourgogne-franche-comte', 'provence-alpes-cote-dazur', 'occitanie', 'nouvelle-aquitaine', 'centre-val-de-loire'],
  },
  'bourgogne-franche-comte': {
    intro:
      "Vignobles, canaux et forêts du Jura : la Bourgogne-Franche-Comté est la région des séjours au calme. On y vient pour la table, les balades à vélo le long des canaux et les lacs du Jura.",
    envies: [
      { titre: 'Vignobles', texte: 'La route des grands crus, entre Dijon et Beaune, et les villages viticoles.' },
      { titre: 'Jura', texte: 'Lacs, cascades du Hérisson et forêts de sapins, été comme hiver.' },
      { titre: 'Canaux', texte: 'Le canal de Bourgogne et le Nivernais, à pied, à vélo ou en bateau.' },
      { titre: 'Morvan', texte: 'Un parc naturel régional de lacs et de forêts, idéal pour se ressourcer.' },
    ],
    chien:
      "Les chemins de halage des canaux sont plats, ombragés et longs : parfaits pour marcher avec un chien. Pensez à la laisse près des écluses et des troupeaux.",
    voisines: ['grand-est', 'auvergne-rhone-alpes', 'centre-val-de-loire', 'ile-de-france'],
  },
  bretagne: {
    intro:
      "Plus de 2 000 km de côtes, des îles, des ports et des landes : la Bretagne se découvre le long du sentier des douaniers. Le climat y reste doux l'été, idéal pour marcher et pour ceux qui fuient la chaleur.",
    envies: [
      { titre: 'Côte de Granit rose', texte: 'Rochers roses de Ploumanac’h et de Trégastel, criques et sentier côtier.' },
      { titre: 'Golfe du Morbihan', texte: 'Îles, mégalithes de Carnac et petits ports, à découvrir en bateau.' },
      { titre: 'Finistère', texte: 'Pointe du Raz, presqu’île de Crozon, phares et grandes plages sauvages.' },
      { titre: 'Brocéliande', texte: 'Forêts et légendes arthuriennes, à quelques kilomètres de Rennes.' },
    ],
    chien:
      "Le sentier des douaniers (GR34) longe presque toute la côte et se fait très bien avec un chien. L'été, beaucoup de plages leur sont interdites en journée : renseignez-vous auprès de la mairie et visez les plages autorisées.",
    voisines: ['normandie', 'pays-de-la-loire'],
  },
  'centre-val-de-loire': {
    intro:
      "Châteaux de la Loire, forêts et rivières : le Centre-Val de Loire est la destination idéale pour un séjour en famille à moins de deux heures de Paris. On y circule à vélo sur la Loire à Vélo.",
    envies: [
      { titre: 'Châteaux', texte: 'Chambord, Chenonceau, Amboise, Villandry et des dizaines d’autres.' },
      { titre: 'Loire à Vélo', texte: 'Un itinéraire cyclable balisé le long du fleuve, accessible à tous.' },
      { titre: 'Sologne', texte: 'Étangs, forêts et brame du cerf à l’automne.' },
      { titre: 'Berry', texte: 'Campagne paisible, villages et maisons de George Sand.' },
    ],
    chien:
      "Les parcs de nombreux châteaux acceptent les chiens tenus en laisse, mais rarement l'intérieur : vérifiez avant la visite. Les bords de Loire offrent de longues balades faciles.",
    voisines: ['ile-de-france', 'pays-de-la-loire', 'nouvelle-aquitaine', 'bourgogne-franche-comte', 'normandie', 'auvergne-rhone-alpes'],
  },
  corse: {
    intro:
      "Mer turquoise, montagne à pic et villages perchés : la Corse réunit plage et randonnée sur une même île. Les plus belles saisons sont le printemps et le début de l'automne, plus calmes que l'été.",
    envies: [
      { titre: 'Plages', texte: 'Palombaggia, Saleccia, Rondinara : eau claire et sable fin.' },
      { titre: 'Randonnée', texte: 'Le GR20 pour les sportifs, et des sentiers côtiers pour tous.' },
      { titre: 'Villages', texte: 'La Balagne, le Cap Corse et leurs villages accrochés aux collines.' },
      { titre: 'Réserve de Scandola', texte: 'Falaises rouges et criques, à découvrir en bateau depuis Calvi ou Porto.' },
    ],
    chien:
      "Pour venir en Corse avec un chien, le bateau est souvent plus simple que l'avion : la plupart des compagnies acceptent les chiens, en cabine dédiée ou au chenil. Réservez tôt l'été.",
    voisines: ['provence-alpes-cote-dazur'],
  },
  'grand-est': {
    intro:
      "Marchés de Noël d'Alsace, route des vins, Vosges et lacs : le Grand Est se visite toute l'année. Ses villages à colombages et sa cuisine font sa réputation.",
    envies: [
      { titre: 'Alsace', texte: 'Colmar, Riquewihr, Eguisheim et la route des vins.' },
      { titre: 'Vosges', texte: 'Lacs de Gérardmer et de Longemer, crêtes et ski de fond.' },
      { titre: 'Champagne', texte: 'Coteaux, maisons et caves de Reims et d’Épernay.' },
      { titre: 'Marchés de Noël', texte: 'Strasbourg, Colmar et Kaysersberg en décembre.' },
    ],
    chien:
      "Les Vosges offrent des centaines de kilomètres de sentiers balisés, faciles à faire avec un chien. Dans les marchés de Noël très fréquentés, mieux vaut le laisser au logement.",
    voisines: ['hauts-de-france', 'ile-de-france', 'bourgogne-franche-comte'],
  },
  'hauts-de-france': {
    intro:
      "Grandes plages de la Côte d'Opale, baie de Somme et villes de briques : les Hauts-de-France sont la mer la plus proche de Paris. On y vient pour l'air du large et les grands espaces.",
    envies: [
      { titre: 'Côte d’Opale', texte: 'Caps Blanc-Nez et Gris-Nez, dunes et plages immenses.' },
      { titre: 'Baie de Somme', texte: 'Phoques, oiseaux et balades à marée basse avec un guide.' },
      { titre: 'Lille et Arras', texte: 'Places flamandes, beffrois et estaminets.' },
      { titre: 'Forêts', texte: 'Compiègne et Saint-Gobain pour la marche et le vélo.' },
    ],
    chien:
      "Les grandes plages du Nord laissent de la place, mais beaucoup interdisent les chiens l'été en journée. Les dunes et les sentiers des caps sont de bonnes alternatives.",
    voisines: ['normandie', 'ile-de-france', 'grand-est'],
  },
  'ile-de-france': {
    intro:
      "Paris, bien sûr, mais aussi Versailles, Fontainebleau et les bords de Marne : l'Île-de-France se prête aux courts séjours. Les forêts autour de Paris offrent un vrai bol d'air.",
    envies: [
      { titre: 'Paris', texte: 'Musées, quartiers et balades le long de la Seine.' },
      { titre: 'Châteaux', texte: 'Versailles, Fontainebleau, Vaux-le-Vicomte.' },
      { titre: 'Forêt de Fontainebleau', texte: 'Rochers, sentiers et escalade de blocs.' },
      { titre: 'Bords de Marne', texte: 'Guinguettes et promenades au bord de l’eau.' },
    ],
    chien:
      "À Paris, les chiens sont acceptés dans de nombreux parcs tenus en laisse, mais pas tous. La forêt de Fontainebleau est idéale pour les longues sorties.",
    voisines: ['normandie', 'hauts-de-france', 'grand-est', 'bourgogne-franche-comte', 'centre-val-de-loire'],
  },
  normandie: {
    intro:
      "Falaises d'Étretat, plages du Débarquement, Mont-Saint-Michel et bocage : la Normandie mêle mer, histoire et campagne. Ses maisons à colombages et ses produits du terroir font le reste.",
    envies: [
      { titre: 'Côte d’Albâtre', texte: 'Falaises d’Étretat et de Fécamp, galets et sentiers en hauteur.' },
      { titre: 'Mont-Saint-Michel', texte: 'La baie, ses marées et ses traversées à pied avec un guide.' },
      { titre: 'Plages du Débarquement', texte: 'Omaha, Utah, Juno et leurs musées.' },
      { titre: 'Pays d’Auge', texte: 'Bocage, manoirs, cidre et fromages.' },
    ],
    chien:
      "Le GR21 le long des falaises est superbe avec un chien, mais restez à distance du bord. Hors saison, beaucoup de plages normandes accueillent les chiens.",
    voisines: ['bretagne', 'pays-de-la-loire', 'centre-val-de-loire', 'ile-de-france', 'hauts-de-france'],
  },
  'nouvelle-aquitaine': {
    intro:
      "Plages de l'Atlantique, dune du Pilat, vignobles de Bordeaux et Pays basque : la Nouvelle-Aquitaine est la plus grande région de France. On y trouve aussi bien le surf que les villages du Périgord.",
    envies: [
      { titre: 'Côte atlantique', texte: 'Lacanau, Arcachon, Biarritz : grandes vagues et forêts de pins.' },
      { titre: 'Pays basque', texte: 'Villages blancs et rouges, montagne et océan à quelques minutes.' },
      { titre: 'Périgord', texte: 'Châteaux, grottes préhistoriques et marchés de producteurs.' },
      { titre: 'Îles', texte: 'Ré et Oléron, à vélo entre marais salants et plages.' },
    ],
    chien:
      "La côte landaise compte quelques plages où les chiens sont acceptés toute l'année : la mairie de chaque commune les indique. La forêt des Landes offre des pistes cyclables et des chemins à perte de vue.",
    voisines: ['occitanie', 'pays-de-la-loire', 'centre-val-de-loire', 'auvergne-rhone-alpes'],
  },
  occitanie: {
    intro:
      "De la Méditerranée aux Pyrénées, l'Occitanie offre plages, montagne et villages médiévaux. Carcassonne, le canal du Midi et les gorges du Tarn y attirent chaque été les familles.",
    envies: [
      { titre: 'Méditerranée', texte: 'Plages du Languedoc, de Port-Leucate à la Grande-Motte.' },
      { titre: 'Pyrénées', texte: 'Randonnée, lacs d’altitude et stations thermales.' },
      { titre: 'Cités médiévales', texte: 'Carcassonne, Cordes-sur-Ciel, Rocamadour.' },
      { titre: 'Canal du Midi', texte: 'À vélo ou en bateau, sous les platanes.' },
    ],
    chien:
      "Les Pyrénées sont idéales avec un chien, mais attention aux patous qui gardent les troupeaux : on contourne le troupeau et on garde son chien en laisse. L'été, préférez la montagne à la plage pour lui.",
    voisines: ['nouvelle-aquitaine', 'provence-alpes-cote-dazur', 'auvergne-rhone-alpes'],
  },
  'pays-de-la-loire': {
    intro:
      "Plages de Vendée, La Baule, Nantes et les vignobles de la Loire : les Pays de la Loire sont une valeur sûre pour les vacances en famille. Les pistes cyclables y sont nombreuses et plates.",
    envies: [
      { titre: 'Vendée', texte: 'Saint-Jean-de-Monts, les Sables-d’Olonne et 250 km de côte.' },
      { titre: 'Îles', texte: 'Noirmoutier et l’île d’Yeu, à pied, à vélo ou en bateau.' },
      { titre: 'La Baule', texte: 'Sa grande plage de sable fin et la presqu’île de Guérande, avec ses marais salants.' },
      { titre: 'Anjou', texte: 'Châteaux, caves troglodytes et vignobles autour de Saumur.' },
    ],
    chien:
      "La Vendée compte des plages où les chiens sont acceptés, souvent en bout de plage ou hors saison. Les pistes cyclables du littoral et la forêt de Monts se font très bien avec eux.",
    voisines: ['bretagne', 'normandie', 'centre-val-de-loire', 'nouvelle-aquitaine'],
  },
  'provence-alpes-cote-dazur': {
    intro:
      "Calanques, Luberon, gorges du Verdon et Côte d'Azur : la Provence-Alpes-Côte d'Azur cumule les paysages célèbres. Lavande en juillet, montagne toute l'année et mer bleue.",
    envies: [
      { titre: 'Côte d’Azur', texte: 'Nice, Antibes, Saint-Tropez et l’Esterel.' },
      { titre: 'Luberon', texte: 'Villages perchés, lavande et marchés provençaux.' },
      { titre: 'Gorges du Verdon', texte: 'Lac de Sainte-Croix, canoë et sentier Blanc-Martel.' },
      { titre: 'Alpes du Sud', texte: 'Serre-Ponçon, Écrins et stations de ski.' },
    ],
    chien:
      "L'été, la chaleur est le premier danger pour un chien : sorties tôt le matin et le soir, toujours de l'eau. Les calanques ferment parfois en cas de risque d'incendie, vérifiez avant de partir.",
    voisines: ['occitanie', 'auvergne-rhone-alpes', 'corse'],
  },
}
