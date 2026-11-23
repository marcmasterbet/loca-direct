/** Données du formulaire d'annonce, partagées entre le serveur et le formulaire */

export type DonneesLogement = {
  titre: string
  numero_enregistrement: string
  type_logement: string
  pays: string
  region: string
  ville: string
  code_postal: string
  quartier: string
  surface: string
  nb_pieces: string
  nb_chambres: string
  capacite: string
  etage: string
  description_courte: string
  description_longue: string
  prix_nuit: string
  prix_semaine: string
  prix_mois: string
  caution: string
  charges_incluses: boolean
  taxe_sejour: boolean
  menage_inclus: boolean
  disponible_du: string
  type_location: string
  duree_min: string
  equipements: string[]
  photos: string[]
  whatsapp: string
  site_web: string
  regles: string
  animaux: string
  fumeurs: string
  fetes: string
  enfants: string
  heure_arrivee: string
  heure_depart: string
}

export const LOGEMENT_VIDE: DonneesLogement = {
  titre: '',
  numero_enregistrement: '',
  type_logement: 'Appartement',
  pays: 'France',
  region: '',
  ville: '',
  code_postal: '',
  quartier: '',
  surface: '',
  nb_pieces: '',
  nb_chambres: '',
  capacite: '',
  etage: '',
  description_courte: '',
  description_longue: '',
  prix_nuit: '',
  prix_semaine: '',
  prix_mois: '',
  caution: '',
  charges_incluses: false,
  taxe_sejour: false,
  menage_inclus: false,
  disponible_du: '',
  type_location: 'Courte durée',
  duree_min: '1 nuit',
  equipements: [],
  photos: [],
  whatsapp: '',
  site_web: '',
  regles: '',
  animaux: 'Non',
  fumeurs: 'Non',
  fetes: 'Non',
  enfants: 'Oui',
  heure_arrivee: '',
  heure_depart: '',
}

const texte = (v: unknown) => (v === null || v === undefined ? '' : String(v))

/** Transforme une annonce lue en base en données du formulaire (rien n'est perdu) */
export function depuisVitrine(v: Record<string, unknown>): DonneesLogement {
  const r = (typeof v.regles === 'object' && v.regles !== null ? v.regles : {}) as Record<string, unknown>
  return {
    ...LOGEMENT_VIDE,
    titre: texte(v.titre),
    numero_enregistrement: texte(v.numero_enregistrement),
    type_logement: texte(v.type_logement) || 'Appartement',
    pays: texte(v.pays) || 'France',
    region: texte(v.region),
    ville: texte(v.ville),
    code_postal: texte(v.code_postal),
    quartier: texte(v.quartier),
    surface: texte(v.surface),
    nb_pieces: texte(v.nb_pieces),
    nb_chambres: texte(v.nb_chambres),
    capacite: texte(v.capacite),
    etage: texte(v.etage),
    description_courte: texte(v.description_courte),
    description_longue: texte(v.description_longue),
    prix_nuit: texte(v.prix_nuit),
    prix_semaine: texte(v.prix_semaine),
    prix_mois: texte(v.prix_mois),
    caution: texte(v.caution),
    charges_incluses: !!v.charges_incluses,
    taxe_sejour: !!v.taxe_sejour,
    menage_inclus: !!v.menage_inclus,
    disponible_du: texte(v.disponible_du).slice(0, 10),
    type_location: texte(v.type_location) || 'Courte durée',
    duree_min: texte(v.duree_min) || '1 nuit',
    equipements: Array.isArray(v.equipements) ? (v.equipements as string[]) : [],
    photos: Array.isArray(v.photos) ? (v.photos as string[]) : [],
    whatsapp: texte(v.whatsapp),
    site_web: texte(v.site_web),
    regles: texte(r.texte),
    animaux: texte(r.animaux) || 'Non',
    fumeurs: texte(r.fumeurs) || 'Non',
    fetes: texte(r.fetes) || 'Non',
    enfants: texte(r.enfants) || 'Oui',
    heure_arrivee: texte(r.heure_arrivee),
    heure_depart: texte(r.heure_depart),
  }
}

