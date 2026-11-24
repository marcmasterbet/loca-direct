'use client'

import { useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Champ, ErreurFormulaire } from '@/components/forms/Champ'
import { PAYS, REGIONS_PAR_PAYS } from '@/lib/regions'
import { lireVideo, lireVisite3d, SERVICES_VIDEO, SERVICES_VISITE } from '@/lib/medias'
import { Bloc, Case, Choix, Grille, TeleversementPhotos, Zone } from './briques'

import { LOGEMENT_VIDE, type DonneesLogement } from '@/lib/formulaire-logement'

const TYPES_LOGEMENT = ['Appartement', 'Maison', 'Villa', 'Chalet', 'Studio', 'Chambre', 'Autre']
const TYPES_LOCATION = ['Courte durée', 'Longue durée', 'Les deux']
const DUREES_MIN = ['1 nuit', '2 nuits', '1 semaine', '1 mois']
const MAX_PHOTOS = 10

/** Mêmes identifiants qu'avant : les annonces existantes gardent leurs équipements */
const EQUIPEMENTS: { groupe: string; items: { id: string; label: string }[] }[] = [
  {
    groupe: 'Animaux',
    items: [
      { id: 'animaux', label: 'Animaux acceptés' },
      { id: 'chien_10kg', label: 'Chiens de plus de 10 kg acceptés' },
    ],
  },
  {
    groupe: 'Confort',
    items: [
      { id: 'wifi', label: 'Wi-Fi' },
      { id: 'cuisine', label: 'Cuisine équipée' },
      { id: 'lave_linge', label: 'Lave-linge' },
      { id: 'seche_linge', label: 'Sèche-linge' },
      { id: 'clim', label: 'Climatisation' },
      { id: 'chauffage', label: 'Chauffage' },
      { id: 'tv', label: 'Télévision' },
      { id: 'douche', label: 'Douche' },
      { id: 'baignoire', label: 'Baignoire' },
    ],
  },
  {
    groupe: 'Extérieur et loisirs',
    items: [
      { id: 'jardin', label: 'Jardin ou terrasse' },
      { id: 'barbecue', label: 'Barbecue' },
      { id: 'cuisine_ext', label: 'Cuisine extérieure' },
      { id: 'piscine', label: 'Piscine' },
      { id: 'piscine_priv', label: 'Piscine privée' },
      { id: 'piscine_spa', label: 'Spa ou jacuzzi' },
      { id: 'sport', label: 'Salle de sport' },
    ],
  },
  {
    groupe: 'Vue',
    items: [
      { id: 'vue_mer', label: 'Vue mer' },
      { id: 'vue_montagne', label: 'Vue montagne' },
      { id: 'vue_ville', label: 'Vue ville' },
    ],
  },
  {
    groupe: 'Accès',
    items: [
      { id: 'parking', label: 'Parking' },
      { id: 'ascenseur', label: 'Ascenseur' },
      { id: 'handicap', label: 'Accès handicapé' },
      { id: 'digicode', label: 'Arrivée autonome (digicode, boîte à clés)' },
      { id: 'fumeurs', label: 'Fumeurs acceptés' },
    ],
  },
]

type Erreurs = Partial<Record<keyof DonneesLogement, string>>
type Maj = <K extends keyof DonneesLogement>(cle: K, valeur: DonneesLogement[K]) => void
type PropsEtape = { d: DonneesLogement; maj: Maj; erreurs: Erreurs; creation: boolean }

/* ───────────── Étapes ───────────── */

type Etape = {
  id: string
  titre: string
  intro?: string
  champs: (keyof DonneesLogement)[]
  Contenu: (p: PropsEtape) => ReactNode
}

const ETAPES: Etape[] = [
  {
    id: 'logement',
    titre: 'Le logement',
    intro: 'Les informations de base que les voyageurs regardent en premier.',
    champs: ['titre', 'surface', 'nb_pieces', 'nb_chambres', 'capacite'],
    Contenu: EtapeLogement,
  },
  {
    id: 'adresse',
    titre: 'Où se trouve-t-il ?',
    intro: 'L’adresse exacte n’est jamais affichée : la carte montre seulement le secteur.',
    champs: ['ville', 'code_postal'],
    Contenu: EtapeAdresse,
  },
  {
    id: 'description',
    titre: 'Description',
    intro: 'Parlez du logement comme à un ami : ce qu’on y voit, ce qu’on y fait, ce qu’il y a autour.',
    champs: [],
    Contenu: EtapeDescription,
  },
  {
    id: 'prix',
    titre: 'Prix et disponibilités',
    intro: 'Pas de commission : le prix affiché est celui que le voyageur vous paie.',
    champs: ['prix_nuit'],
    Contenu: EtapePrix,
  },
  {
    id: 'equipements',
    titre: 'Équipements',
    intro: 'Cochez tout ce qui est disponible. Ces critères servent aux filtres de recherche.',
    champs: [],
    Contenu: EtapeEquipements,
  },
  {
    id: 'photos',
    titre: 'Photos et vidéo',
    intro: 'Jusqu’à 10 photos. La première est celle qui s’affiche dans les résultats. La vidéo et la visite 3D sont facultatives.',
    champs: ['photos', 'video_url', 'visite_3d_url'],
    Contenu: EtapePhotos,
  },
  {
    id: 'contact',
    titre: 'Contact et règles',
    champs: ['whatsapp'],
    Contenu: EtapeContact,
  },
]

const CHAMPS_REQUIS_CREATION: (keyof DonneesLogement)[] = [
  'titre',
  'surface',
  'nb_pieces',
  'nb_chambres',
  'capacite',
  'ville',
  'code_postal',
  'prix_nuit',
  'photos',
  'whatsapp',
]
// Les anciennes annonces n'avaient pas toutes ces informations : on n'en bloque aucune
const CHAMPS_REQUIS_MODIFICATION: (keyof DonneesLogement)[] = ['titre', 'surface', 'ville', 'prix_nuit', 'photos', 'whatsapp']

const MESSAGES: Partial<Record<keyof DonneesLogement, string>> = {
  titre: 'Donnez un titre à votre annonce.',
  surface: 'Indiquez la surface en m².',
  nb_pieces: 'Indiquez le nombre de pièces.',
  nb_chambres: 'Indiquez le nombre de chambres (0 pour un studio).',
  capacite: 'Indiquez combien de personnes peuvent dormir sur place.',
  ville: 'Indiquez la ville.',
  code_postal: 'Indiquez le code postal.',
  prix_nuit: 'Indiquez le prix d’une nuit.',
  photos: 'Ajoutez au moins une photo.',
  whatsapp: 'Indiquez le numéro WhatsApp où les voyageurs vous écriront.',
}

function verifier(d: DonneesLogement, champs: (keyof DonneesLogement)[], requis: (keyof DonneesLogement)[]): Erreurs {
  const e: Erreurs = {}
  for (const c of champs) {
    if (!requis.includes(c)) continue
    const v = d[c]
    const vide = Array.isArray(v) ? v.length === 0 : typeof v === 'string' ? !v.trim() : false
    if (vide) e[c] = MESSAGES[c]
  }
  if (champs.includes('whatsapp') && d.whatsapp.trim() && d.whatsapp.replace(/\D/g, '').length < 9) {
    e.whatsapp = 'Ce numéro paraît incomplet. Exemple : 06 12 34 56 78.'
  }
  // Facultatifs : on vérifie seulement qu'un lien rempli est lisible
  if (champs.includes('video_url') && d.video_url.trim() && !lireVideo(d.video_url)) {
    e.video_url = `Ce lien n’est pas reconnu. Collez le lien d’une vidéo ${SERVICES_VIDEO}.`
  }
  if (champs.includes('visite_3d_url') && d.visite_3d_url.trim() && !lireVisite3d(d.visite_3d_url)) {
    e.visite_3d_url = `Ce lien n’est pas reconnu. Collez le lien de partage ${SERVICES_VISITE}.`
  }
  if (champs.includes('prix_nuit') && d.prix_nuit && !(Number(d.prix_nuit) > 0)) {
    e.prix_nuit = 'Le prix doit être supérieur à 0.'
  }
  return e
}

/* ───────────── Formulaire ───────────── */

export default function FormulaireLogement({ initial, id }: { initial?: DonneesLogement; id?: string }) {
  const router = useRouter()
  const creation = !id
  const [d, setD] = useState<DonneesLogement>(initial ?? LOGEMENT_VIDE)
  const [erreurs, setErreurs] = useState<Erreurs>({})
  const [erreurGenerale, setErreurGenerale] = useState('')
  const [envoi, setEnvoi] = useState(false)
  const [etape, setEtape] = useState(0)
  const [enregistre, setEnregistre] = useState(false)
  const haut = useRef<HTMLDivElement>(null)

  const maj: Maj = (cle, valeur) => {
    setD(prev => ({ ...prev, [cle]: valeur }))
    setEnregistre(false)
    if (erreurs[cle]) setErreurs(prev => ({ ...prev, [cle]: undefined }))
  }

  const focaliserErreur = () =>
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>('[aria-invalid="true"], [data-erreur="true"]')
      el?.focus()
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    })

  const allerA = (i: number) => {
    setEtape(i)
    requestAnimationFrame(() => {
      haut.current?.scrollIntoView({ block: 'start' })
      haut.current?.querySelector<HTMLElement>('h2')?.focus()
    })
  }

  const suivant = () => {
    const e = verifier(d, ETAPES[etape].champs, CHAMPS_REQUIS_CREATION)
    setErreurs(e)
    if (Object.keys(e).length) return focaliserErreur()
    allerA(etape + 1)
  }

  const envoyer = async () => {
    const tous = ETAPES.flatMap(e => e.champs)
    const e = verifier(d, tous, creation ? CHAMPS_REQUIS_CREATION : CHAMPS_REQUIS_MODIFICATION)
    setErreurs(e)
    if (Object.keys(e).length) {
      if (creation) {
        const i = ETAPES.findIndex(et => et.champs.some(c => e[c]))
        if (i >= 0) allerA(i)
      }
      setErreurGenerale('Certaines informations manquent : elles sont signalées en rouge.')
      return focaliserErreur()
    }
    setEnvoi(true)
    setErreurGenerale('')
    try {
      const res = await fetch(creation ? '/api/save-vitrine' : '/api/update-vitrine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(creation ? d : { id, ...d }),
      })
      const r = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErreurGenerale(r.error ? `${r.error}. Vos informations sont conservées, réessayez.` : 'L’envoi n’a pas abouti. Vos informations sont conservées, réessayez.')
        setEnvoi(false)
        return
      }
      if (creation) {
        router.push('/espace/ma-vitrine/succes')
      } else {
        setEnregistre(true)
        setEnvoi(false)
        router.refresh()
      }
    } catch {
      setErreurGenerale('Connexion perdue. Vos informations sont conservées, réessayez.')
      setEnvoi(false)
    }
  }

  /* Modification : toutes les rubriques sur une page, enregistrement à tout moment */
  if (!creation) {
    return (
      <div className="flex flex-col gap-6">
        <nav aria-label="Rubriques de l’annonce" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <ul className="flex w-max gap-1.5">
            {ETAPES.map(e => (
              <li key={e.id}>
                <a
                  href={`#${e.id}`}
                  className="flex min-h-[44px] items-center whitespace-nowrap rounded-[12px] bg-white px-4 text-base font-semibold text-ink-soft no-underline shadow-[0_0_0_1px_#e4e3ee] hover:text-ink"
                >
                  {e.titre}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ErreurFormulaire>{erreurGenerale}</ErreurFormulaire>
        {ETAPES.map(e => (
          <Bloc key={e.id} id={e.id} titre={e.titre} intro={e.intro}>
            <e.Contenu d={d} maj={maj} erreurs={erreurs} creation={false} />
          </Bloc>
        ))}
        <div className="sticky bottom-0 -mx-5 flex flex-wrap items-center justify-end gap-3 border-t border-line bg-white px-5 py-3 sm:mx-0 sm:rounded-[18px] sm:border sm:px-4">
          <p aria-live="polite" className="mr-auto text-base font-semibold text-mint-ink">
            {enregistre ? 'Modifications enregistrées' : ''}
          </p>
          <Link href="/espace" className="inline-flex min-h-[48px] items-center rounded-[14px] px-4 text-base font-semibold text-ink-soft no-underline hover:bg-surface">
            Retour à mon espace
          </Link>
          <button
            type="button"
            onClick={envoyer}
            disabled={envoi}
            aria-busy={envoi || undefined}
            className="inline-flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white hover:bg-brand-strong disabled:opacity-70"
          >
            {envoi ? 'Enregistrement…' : 'Enregistrer les modifications'}
          </button>
        </div>
      </div>
    )
  }

  /* Création : une étape à la fois */
  const recap = etape === ETAPES.length
  const courante = ETAPES[etape]
  const total = ETAPES.length + 1

  return (
    <div ref={haut} className="flex scroll-mt-6 flex-col gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-base font-semibold text-ink-soft">
          Étape {etape + 1} sur {total}
        </p>
        <div
          className="h-2 overflow-hidden rounded-full bg-brand-tint"
          role="progressbar"
          aria-label="Progression"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={etape + 1}
        >
          <div className="h-full rounded-full bg-brand transition-[width] duration-300 motion-reduce:transition-none" style={{ width: `${((etape + 1) / total) * 100}%` }} />
        </div>
      </div>

      <ErreurFormulaire>{erreurGenerale}</ErreurFormulaire>

      {recap ? (
        <Bloc titre="Vérifier et publier" focusable>
          <Recapitulatif d={d} onModifier={allerA} />
        </Bloc>
      ) : (
        <Bloc titre={courante.titre} intro={courante.intro} focusable>
          <courante.Contenu d={d} maj={maj} erreurs={erreurs} creation />
        </Bloc>
      )}

      <div className="flex items-center justify-between gap-3">
        {etape > 0 ? (
          <button
            type="button"
            onClick={() => allerA(etape - 1)}
            className="inline-flex min-h-[52px] items-center rounded-[14px] px-4 text-base font-semibold text-ink-soft hover:bg-white hover:text-ink"
          >
            Étape précédente
          </button>
        ) : (
          <Link href="/espace" className="inline-flex min-h-[52px] items-center rounded-[14px] px-4 text-base font-semibold text-ink-soft no-underline hover:bg-white">
            Annuler
          </Link>
        )}
        <button
          type="button"
          onClick={recap ? envoyer : suivant}
          disabled={envoi}
          aria-busy={envoi || undefined}
          className="inline-flex min-h-[52px] items-center rounded-[14px] bg-brand px-6 text-base font-bold text-white hover:bg-brand-strong disabled:opacity-70"
        >
          {recap ? (envoi ? 'Envoi…' : 'Publier mon annonce') : 'Continuer'}
        </button>
      </div>
    </div>
  )
}

/* ───────────── Contenu des étapes ───────────── */

function EtapeLogement({ d, maj, erreurs, creation }: PropsEtape) {
  return (
    <>
      <Champ
        label="Titre de l’annonce"
        value={d.titre}
        onChange={v => maj('titre', v)}
        erreur={erreurs.titre}
        maxLength={90}
        placeholder="Ex. Maison avec jardin à 300 m de la plage"
        aide="Dites ce qui rend le logement unique : la vue, la plage, le jardin, le chien accepté…"
      />
      <Choix label="Type de logement" value={d.type_logement} onChange={v => maj('type_logement', v)} options={TYPES_LOGEMENT} />
      <Grille>
        <Champ label="Surface (m²)" type="number" inputMode="numeric" min={1} value={d.surface} onChange={v => maj('surface', v)} erreur={erreurs.surface} />
        <Champ label={creation ? 'Étage (facultatif)' : 'Étage'} type="number" inputMode="numeric" value={d.etage} onChange={v => maj('etage', v)} aide="0 pour un rez-de-chaussée" />
        <Champ label="Nombre de pièces" type="number" inputMode="numeric" min={1} value={d.nb_pieces} onChange={v => maj('nb_pieces', v)} erreur={erreurs.nb_pieces} />
        <Champ label="Nombre de chambres" type="number" inputMode="numeric" min={0} value={d.nb_chambres} onChange={v => maj('nb_chambres', v)} erreur={erreurs.nb_chambres} />
        <Champ label="Couchages (personnes)" type="number" inputMode="numeric" min={1} value={d.capacite} onChange={v => maj('capacite', v)} erreur={erreurs.capacite} />
      </Grille>
      <Champ
        label="Numéro d’enregistrement (facultatif)"
        value={d.numero_enregistrement}
        onChange={v => maj('numero_enregistrement', v)}
        aide="Obligatoire dans certaines communes (Paris, Lyon, Bordeaux…) pour la location courte durée. Il est délivré par votre mairie."
      />
    </>
  )
}

function EtapeAdresse({ d, maj, erreurs }: PropsEtape) {
  const regions = REGIONS_PAR_PAYS[d.pays] || []
  return (
    <>
      <Grille>
        <Choix
          label="Pays"
          value={d.pays}
          onChange={v => {
            maj('pays', v)
            maj('region', '')
          }}
          options={PAYS}
        />
        <Choix label="Région" value={d.region || '—'} onChange={v => maj('region', v === '—' ? '' : v)} options={['—', ...regions]} />
        <Champ label="Ville" value={d.ville} onChange={v => maj('ville', v)} erreur={erreurs.ville} autoComplete="address-level2" />
        <Champ label="Code postal" value={d.code_postal} onChange={v => maj('code_postal', v)} erreur={erreurs.code_postal} inputMode="numeric" autoComplete="postal-code" />
      </Grille>
      <Champ label="Quartier ou lieu-dit (facultatif)" value={d.quartier} onChange={v => maj('quartier', v)} placeholder="Ex. Vieux port" />
    </>
  )
}

function EtapeDescription({ d, maj }: PropsEtape) {
  return (
    <>
      <Zone
        label="Résumé"
        rows={2}
        max={150}
        value={d.description_courte}
        onChange={v => maj('description_courte', v)}
        aide="Une phrase qui donne envie, visible sous le titre."
        placeholder="Ex. Maison au calme avec jardin clos, idéale avec un chien."
      />
      <Zone
        label="Description complète"
        rows={8}
        max={1000}
        value={d.description_longue}
        onChange={v => maj('description_longue', v)}
        aide="Pièces, couchages, extérieur, commerces et plages à proximité."
      />
    </>
  )
}

function EtapePrix({ d, maj, erreurs }: PropsEtape) {
  return (
    <>
      <Grille>
        <Champ label="Prix par nuit (€)" type="number" inputMode="decimal" min={1} value={d.prix_nuit} onChange={v => maj('prix_nuit', v)} erreur={erreurs.prix_nuit} />
        <Champ label="Prix par semaine (€, facultatif)" type="number" inputMode="decimal" value={d.prix_semaine} onChange={v => maj('prix_semaine', v)} />
        <Champ label="Prix par mois (€, facultatif)" type="number" inputMode="decimal" value={d.prix_mois} onChange={v => maj('prix_mois', v)} />
        <Champ label="Caution (€, facultatif)" type="number" inputMode="decimal" value={d.caution} onChange={v => maj('caution', v)} />
      </Grille>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1.5 text-sm font-semibold">Compris dans le prix</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Case label="Charges incluses" checked={d.charges_incluses} onChange={v => maj('charges_incluses', v)} />
          <Case label="Ménage inclus" checked={d.menage_inclus} onChange={v => maj('menage_inclus', v)} />
          <Case label="Taxe de séjour en plus" checked={d.taxe_sejour} onChange={v => maj('taxe_sejour', v)} />
        </div>
      </fieldset>
      <Grille>
        <Champ label="Disponible à partir du" type="date" value={d.disponible_du} onChange={v => maj('disponible_du', v)} />
        <Choix label="Durée minimum" value={d.duree_min} onChange={v => maj('duree_min', v)} options={DUREES_MIN} />
        <Choix label="Type de location" value={d.type_location} onChange={v => maj('type_location', v)} options={TYPES_LOCATION} />
      </Grille>
    </>
  )
}

function EtapeEquipements({ d, maj }: PropsEtape) {
  const basculer = (id: string, oui: boolean) =>
    maj('equipements', oui ? [...d.equipements.filter(e => e !== id), id] : d.equipements.filter(e => e !== id))
  return (
    <div className="flex flex-col gap-6">
      {EQUIPEMENTS.map(g => (
        <fieldset key={g.groupe} className="flex flex-col gap-2">
          <legend className="mb-1.5 text-base font-bold">{g.groupe}</legend>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {g.items.map(it => (
              <Case key={it.id} label={it.label} checked={d.equipements.includes(it.id)} onChange={v => basculer(it.id, v)} mis={it.id === 'chien_10kg' && d.equipements.includes(it.id)} />
            ))}
          </div>
          {g.groupe === 'Animaux' && (
            <p className="text-sm text-muted">« Chiens de plus de 10 kg » fait apparaître votre logement dans la rubrique Chien accepté, très recherchée.</p>
          )}
        </fieldset>
      ))}
    </div>
  )
}

function EtapePhotos({ d, maj, erreurs }: PropsEtape) {
  return (
    <>
      <TeleversementPhotos photos={d.photos} onChange={p => maj('photos', p)} max={MAX_PHOTOS} erreur={erreurs.photos} />
      <div className="flex flex-col gap-4 border-t border-line pt-5">
        <h3 className="text-base font-bold">Vidéo et visite 3D (facultatif)</h3>
        <Champ
          label="Lien de la vidéo (facultatif)"
          type="url"
          inputMode="url"
          value={d.video_url}
          onChange={v => maj('video_url', v)}
          erreur={erreurs.video_url}
          placeholder="https://youtu.be/…"
          aide={`Mettez votre vidéo sur ${SERVICES_VIDEO}, puis collez son lien ici.`}
        />
        <Champ
          label="Lien de la visite 3D (facultatif)"
          type="url"
          inputMode="url"
          value={d.visite_3d_url}
          onChange={v => maj('visite_3d_url', v)}
          erreur={erreurs.visite_3d_url}
          placeholder="https://poly.cam/capture/…"
          aide={`Les voyageurs se promènent dans le logement. Créez-la gratuitement avec ${SERVICES_VISITE}, puis collez le lien de partage.`}
        />
      </div>
    </>
  )
}

function EtapeContact({ d, maj, erreurs }: PropsEtape) {
  return (
    <>
      <Champ
        label="Numéro WhatsApp"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        value={d.whatsapp}
        onChange={v => maj('whatsapp', v)}
        erreur={erreurs.whatsapp}
        placeholder="06 12 34 56 78"
        aide="Votre numéro n’est jamais écrit sur la page. Les voyageurs vous écrivent en touchant le bouton WhatsApp de l’annonce."
      />
      <Champ label="Site internet (facultatif)" type="url" inputMode="url" value={d.site_web} onChange={v => maj('site_web', v)} placeholder="https://" />
      <Grille>
        <Champ label="Arrivée à partir de" value={d.heure_arrivee} onChange={v => maj('heure_arrivee', v)} placeholder="16 h" />
        <Champ label="Départ avant" value={d.heure_depart} onChange={v => maj('heure_depart', v)} placeholder="10 h" />
        <Choix label="Animaux" value={d.animaux} onChange={v => maj('animaux', v)} options={['Non', 'Oui', 'Sur demande']} />
        <Choix label="Enfants" value={d.enfants} onChange={v => maj('enfants', v)} options={['Oui', 'Non', 'Sur demande']} />
        <Choix label="Fumeurs" value={d.fumeurs} onChange={v => maj('fumeurs', v)} options={['Non', 'Oui']} />
        <Choix label="Fêtes" value={d.fetes} onChange={v => maj('fetes', v)} options={['Non', 'Oui']} />
      </Grille>
      <Zone label="Règlement intérieur (facultatif)" rows={3} value={d.regles} onChange={v => maj('regles', v)} aide="Ce que les voyageurs doivent savoir avant de réserver." />
    </>
  )
}

function Recapitulatif({ d, onModifier }: { d: DonneesLogement; onModifier: (i: number) => void }) {
  const lignes: { etape: number; label: string; valeur: string }[] = [
    { etape: 0, label: 'Titre', valeur: d.titre },
    { etape: 0, label: 'Logement', valeur: [d.type_logement, d.surface && `${d.surface} m²`, d.capacite && `${d.capacite} pers.`].filter(Boolean).join(' · ') },
    { etape: 1, label: 'Adresse', valeur: [d.ville, d.code_postal, d.region, d.pays !== 'France' && d.pays].filter(Boolean).join(', ') },
    { etape: 3, label: 'Prix', valeur: d.prix_nuit ? `${d.prix_nuit} € la nuit` : '' },
    { etape: 4, label: 'Équipements', valeur: d.equipements.length ? `${d.equipements.length} coché${d.equipements.length > 1 ? 's' : ''}` : 'Aucun' },
    { etape: 5, label: 'Photos', valeur: `${d.photos.length}` },
    { etape: 6, label: 'WhatsApp', valeur: d.whatsapp },
  ]
  return (
    <div className="flex flex-col gap-5">
      {d.photos[0] && (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[18px] bg-surface">
          <Image src={d.photos[0]} alt="Photo principale" fill sizes="640px" className="object-cover" />
        </div>
      )}
      <dl className="flex flex-col">
        {lignes.map(l => (
          <div key={l.label} className="flex items-center justify-between gap-3 border-b border-line py-2 last:border-0">
            <div className="flex min-w-0 flex-col sm:flex-row sm:gap-4">
              <dt className="w-32 shrink-0 text-base text-ink-soft">{l.label}</dt>
              <dd className="min-w-0 break-words text-base font-semibold">{l.valeur || '—'}</dd>
            </div>
            <button type="button" onClick={() => onModifier(l.etape)} aria-label={`Modifier : ${l.label}`} className="min-h-[44px] shrink-0 rounded-[10px] px-3 text-base font-semibold text-brand-strong hover:bg-brand-soft">
              Modifier
            </button>
          </div>
        ))}
      </dl>
      <p className="rounded-[14px] bg-dog-soft px-4 py-3 text-base leading-relaxed text-ink-soft">
        Nous vérifions chaque annonce avant sa mise en ligne, sous 24 à 48&nbsp;heures. Vous recevrez un e-mail dès qu’elle sera visible.
      </p>
    </div>
  )
}
