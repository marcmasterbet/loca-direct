// Métiers de l'annuaire : nom tel qu'enregistré en base, adresse de la page,
// et textes pour Google et pour les propriétaires qui cherchent un prestataire.

export type Metier = {
  slug: string
  /** Valeur de la colonne `activite` en base, à ne pas modifier */
  nom: string
  /** Nom court affiché (filtres, étiquettes) */
  court: string
  /** Titre de la page métier */
  titre: string
  /** Présentation du métier pour un propriétaire */
  intro: string
  /** Ce qu'il faut demander avant de choisir */
  conseils: string[]
}

export const METIERS: Metier[] = [
  {
    slug: 'conciergerie',
    nom: 'Conciergerie',
    court: 'Conciergerie',
    titre: 'Conciergerie pour location saisonnière',
    intro:
      'Une conciergerie gère votre location à votre place : accueil des voyageurs, remise des clés, ménage, linge, petites réparations, et parfois les annonces et les prix. Idéal si vous habitez loin de votre logement ou si vous manquez de temps.',
    conseils: [
      'Demandez ce qui est compris : accueil, ménage, linge, gestion des annonces, état des lieux.',
      'Comparez la rémunération : pourcentage des loyers ou forfait par séjour.',
      'Vérifiez la zone couverte et le délai d’intervention en cas de problème.',
    ],
  },
  {
    slug: 'menage',
    nom: 'Ménage / Entretien',
    court: 'Ménage',
    titre: 'Ménage pour location saisonnière',
    intro:
      'Entre deux séjours, le logement doit être impeccable : ménage complet, changement du linge, réassort des produits. Un prestataire de ménage habitué à la location courte durée sait travailler vite, entre le départ du matin et l’arrivée de l’après-midi.',
    conseils: [
      'Demandez s’il fournit le linge et les produits, ou s’il utilise les vôtres.',
      'Vérifiez sa disponibilité le samedi et en haute saison.',
      'Convenez d’une liste de contrôle et de photos après chaque passage.',
    ],
  },
  {
    slug: 'photographe',
    nom: 'Photographe',
    court: 'Photographe',
    titre: 'Photographe immobilier pour location de vacances',
    intro:
      'Les photos décident du clic. Un photographe spécialisé sait rendre une pièce lumineuse et donner envie, avec le bon angle et la bonne lumière. Quelques séances suffisent souvent à faire la différence sur toutes vos annonces.',
    conseils: [
      'Regardez son portfolio d’intérieurs, pas seulement ses portraits.',
      'Demandez le nombre de photos livrées, le délai et les droits d’utilisation.',
      'Préparez le logement avant sa venue : rangé, lumineux, lits faits.',
    ],
  },
  {
    slug: 'digital',
    nom: 'Aide au digital / Communication',
    court: 'Digital',
    titre: 'Aide aux annonces et à la communication',
    intro:
      'Rédaction d’annonces, réseaux sociaux, site de réservation directe, gestion des avis : ces professionnels vous aident à être trouvé et choisi en ligne, sans y passer vos soirées.',
    conseils: [
      'Demandez des exemples d’annonces ou de comptes qu’il gère.',
      'Clarifiez ce qui est ponctuel et ce qui est un suivi mensuel.',
      'Gardez la propriété de vos comptes, de vos photos et de votre nom de domaine.',
    ],
  },
  {
    slug: 'maintenance',
    nom: 'Maintenance / Bricolage',
    court: 'Maintenance',
    titre: 'Maintenance et bricolage pour location saisonnière',
    intro:
      'Fuite, serrure, électroménager en panne : quand un voyageur est sur place, il faut quelqu’un de réactif. Un artisan de confiance proche du logement évite les mauvais avis et les séjours écourtés.',
    conseils: [
      'Demandez ses délais d’intervention en urgence, le week-end compris.',
      'Faites établir un devis pour les travaux qui ne sont pas urgents.',
      'Notez ses coordonnées dans votre livret d’accueil pour votre conciergerie.',
    ],
  },
  {
    slug: 'jardinage',
    nom: 'Jardinage / Extérieur',
    court: 'Jardinage',
    titre: 'Jardinage et entretien extérieur',
    intro:
      'Pelouse tondue, haies taillées, piscine propre : l’extérieur est souvent ce que les voyageurs remarquent en premier. Un jardinier régulier garde votre location accueillante toute la saison.',
    conseils: [
      'Précisez la fréquence de passage selon la saison.',
      'Demandez s’il s’occupe aussi de la piscine et de l’évacuation des déchets verts.',
      'Prévoyez ses passages en dehors des séjours, ou avec l’accord des voyageurs.',
    ],
  },
  {
    slug: 'decoration',
    nom: 'Décoration / Aménagement',
    court: 'Décoration',
    titre: 'Décoration et aménagement de location de vacances',
    intro:
      'Un intérieur pensé pour la location se loue mieux et plus cher : rangements, literie, ambiance, détails qui font une belle photo. Un décorateur vous aide à investir au bon endroit.',
    conseils: [
      'Fixez un budget global avant le premier rendez-vous.',
      'Demandez des photos avant / après de logements de location.',
      'Privilégiez le solide et le facile à entretenir.',
    ],
  },
  {
    slug: 'kits-accueil',
    nom: "Kits & paniers d'accueil",
    court: 'Accueil',
    titre: 'Kits et paniers d’accueil pour voyageurs',
    intro:
      'Produits locaux, café, gel douche, petit mot de bienvenue : un panier d’accueil soigné fait souvent la différence dans les avis. Des prestataires les préparent et les livrent avant chaque arrivée.',
    conseils: [
      'Demandez le contenu, le prix par panier et les délais de livraison.',
      'Pensez aux voyageurs avec enfants ou avec chien.',
      'Mettez en avant les produits de votre région.',
    ],
  },
  {
    slug: 'autre',
    nom: 'Autre',
    court: 'Autres services',
    titre: 'Autres services pour location saisonnière',
    intro:
      'Linge, blanchisserie, livraison, traduction, comptabilité de la location meublée : d’autres professionnels peuvent vous simplifier la saison.',
    conseils: ['Décrivez précisément votre besoin dans votre premier message.', 'Demandez un devis écrit.'],
  },
]

export const metierParSlug = (slug: string) => METIERS.find(m => m.slug === slug)
export const metierParNom = (nom: string | null | undefined) => METIERS.find(m => m.nom === nom)

/** Prestataire tel qu'affiché publiquement (jamais de numéro ni d'adresse) */
export type PrestatairePublic = {
  id: string
  prenom: string | null
  nom: string | null
  activite: string | null
  ville: string | null
  region: string | null
  description: string | null
  flyer_url: string | null
  photos: string[] | null
  tarif_horaire: number | null
  sur_devis: boolean | null
  created_at?: string | null
}

export const COLONNES_PUBLIQUES =
  'id, prenom, nom, activite, ville, region, description, flyer_url, photos, tarif_horaire, sur_devis, created_at'

export function nomAffiche(p: Pick<PrestatairePublic, 'prenom' | 'nom'>) {
  return [p.prenom, p.nom].filter(Boolean).join(' ').trim() || 'Prestataire'
}

/** Les images affichables (le flyer peut être un PDF) */
export const estImage = (url: string | null | undefined): url is string => !!url && !/\.pdf($|\?)/i.test(url)
