'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/site/Logo'
import PhotoLightbox from '@/components/PhotoLightbox'
import { Champ } from '@/components/forms/Champ'
import { Case, Choix, Grille, TeleversementPhotos, Zone } from '@/components/espace/briques'
import { METIERS } from '@/lib/prestataires'
import { PAYS } from '@/lib/regions'

/* ───────────── Types ───────────── */

type Proprio = { directloca_users?: { email: string } | null }

type Vitrine = Proprio & {
  id: string
  titre: string | null
  ville: string | null
  pays?: string | null
  region?: string | null
  code_postal?: string | null
  type_logement?: string | null
  prix_nuit: number | null
  prix_semaine?: number | null
  prix_mois?: number | null
  statut: string
  photos: string[] | null
  description_courte: string | null
  description_longue?: string | null
  whatsapp: string | null
  numero_enregistrement?: string | null
  video_url?: string | null
  visite_3d_url?: string | null
  equipements?: string[] | null
  motif_refus?: string | null
  nb_vues?: number | null
  created_at: string
}

type Prestataire = Proprio & {
  id: string
  nom: string | null
  prenom: string | null
  siret: string | null
  adresse_siege: string | null
  ville: string | null
  code_postal: string | null
  region: string | null
  activite: string | null
  description: string | null
  telephone: string | null
  whatsapp: string | null
  site_web?: string | null
  tarif_horaire: number | null
  sur_devis: boolean | null
  flyer_url: string | null
  photos: string[] | null
  statut: string
  motif_refus?: string | null
  nb_vues?: number | null
  created_at: string
}

type Onglet = 'logements' | 'prestataires'

const STATUTS: Record<string, { label: string; classes: string }> = {
  en_attente: { label: 'À valider', classes: 'bg-dog text-[#7a5200]' },
  active: { label: 'En ligne', classes: 'bg-mint text-mint-ink' },
  deja_loue: { label: 'Déjà loué', classes: 'bg-surface text-ink-soft' },
  bientot_dispo: { label: 'Bientôt disponible', classes: 'bg-brand-soft text-brand-strong' },
  suspendue: { label: 'Suspendue', classes: 'bg-surface text-ink-soft' },
  refuse: { label: 'Refusée', classes: 'bg-[#fef3f2] text-[#912018]' },
}

const FILTRES: Record<Onglet, string[]> = {
  logements: ['en_attente', 'active', 'deja_loue', 'bientot_dispo', 'suspendue', 'tous'],
  prestataires: ['en_attente', 'active', 'suspendue', 'refuse', 'tous'],
}

const bouton = 'inline-flex min-h-[44px] items-center justify-center rounded-[12px] px-4 text-base font-semibold no-underline disabled:opacity-60'
const clair = `${bouton} bg-white text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface`
const violet = `${bouton} bg-brand text-white hover:bg-brand-strong`
const vert = `${bouton} bg-mint-ink text-white hover:bg-[#095640]`
const danger = `${bouton} text-[#912018] hover:bg-[#fef3f2]`
const carte = 'rounded-[22px] bg-white shadow-[0_0_0_1px_#e4e3ee,0_4px_16px_rgba(23,22,42,0.04)]'

const date = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
const nomPresta = (p: Prestataire) => [p.prenom, p.nom].filter(Boolean).join(' ') || 'Sans nom'

async function envoyer(url: string, corps: object) {
  const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corps) })
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Échec')
}

/* ───────────── Tableau de bord ───────────── */

export default function AdminDashboardClient({
  ongletInitial,
  vitrines,
  prestataires,
  nbComptes,
}: {
  ongletInitial: Onglet
  vitrines: Vitrine[]
  prestataires: Prestataire[]
  nbComptes: number | null
}) {
  const router = useRouter()
  const [onglet, setOnglet] = useState<Onglet>(ongletInitial)
  const [filtre, setFiltre] = useState('en_attente')
  const [recherche, setRecherche] = useState('')

  const liste: (Vitrine | Prestataire)[] = onglet === 'logements' ? vitrines : prestataires
  const compte = (s: string) => (s === 'tous' ? liste.length : liste.filter(x => x.statut === s).length)

  const visibles = useMemo(() => {
    const q = recherche.trim().toLowerCase()
    return liste.filter(x => {
      if (filtre !== 'tous' && x.statut !== filtre) return false
      if (!q) return true
      const texte =
        onglet === 'logements'
          ? [(x as Vitrine).titre, x.ville, x.directloca_users?.email]
          : [nomPresta(x as Prestataire), (x as Prestataire).activite, x.ville, x.directloca_users?.email, (x as Prestataire).siret]
      return texte.join(' ').toLowerCase().includes(q)
    })
  }, [liste, filtre, recherche, onglet])

  const changerOnglet = (o: Onglet) => {
    setOnglet(o)
    setFiltre('en_attente')
    setRecherche('')
    window.history.replaceState(null, '', o === 'logements' ? '/admin/dashboard' : '/admin/dashboard?onglet=prestataires')
  }

  const deconnecter = async () => {
    await fetch('/api/deconnexion', { method: 'POST' })
    router.push('/admin')
  }

  const aValider = vitrines.filter(v => v.statut === 'en_attente').length + prestataires.filter(p => p.statut === 'en_attente').length
  const chiffres = [
    { label: 'À valider', valeur: aValider, fort: aValider > 0 },
    { label: 'Logements en ligne', valeur: vitrines.filter(v => v.statut === 'active').length },
    { label: 'Prestataires en ligne', valeur: prestataires.filter(p => p.statut === 'active').length },
    { label: 'Comptes', valeur: nbComptes ?? '—' },
  ]

  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Voir le site" className="flex min-h-[44px] items-center">
              <Logo />
            </Link>
            <span className="rounded-[8px] bg-night px-2.5 py-1 text-sm font-semibold text-white">Admin</span>
          </div>
          <div className="flex gap-2">
            <Link href="/" className={clair}>
              Voir le site
            </Link>
            <button type="button" onClick={deconnecter} className={clair}>
              Se déconnecter
            </button>
          </div>
        </div>
      </header>

      <main id="contenu" className="mx-auto flex max-w-[1120px] flex-col gap-6 px-5 py-8 sm:px-8">
        <h1 className="text-[28px] font-bold tracking-[-0.03em]">Tableau de bord</h1>

        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {chiffres.map(c => (
            <div key={c.label} className={`flex flex-col-reverse gap-1 rounded-[18px] p-4 ${c.fort ? 'bg-dog' : 'bg-white shadow-[0_0_0_1px_#e4e3ee]'}`}>
              <dt className="text-base text-ink-soft">{c.label}</dt>
              <dd className="text-[28px] font-bold tabular-nums">{c.valeur}</dd>
            </div>
          ))}
        </dl>

        <nav aria-label="Rubriques" className="flex gap-1.5 self-start rounded-[14px] bg-white p-1.5 shadow-[0_0_0_1px_#e4e3ee]">
          {(['logements', 'prestataires'] as Onglet[]).map(o => (
            <button
              key={o}
              type="button"
              onClick={() => changerOnglet(o)}
              aria-current={onglet === o ? 'page' : undefined}
              className={`min-h-[44px] rounded-[10px] px-4 text-base font-semibold ${onglet === o ? 'bg-brand-soft text-brand-strong' : 'text-ink-soft hover:bg-surface'}`}
            >
              {o === 'logements' ? `Logements (${vitrines.length})` : `Prestataires (${prestataires.length})`}
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div role="group" aria-label="Filtrer par état" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
            {FILTRES[onglet].map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFiltre(s)}
                aria-pressed={filtre === s}
                className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 text-base font-semibold ${
                  filtre === s ? 'bg-ink text-white' : 'bg-white text-ink-soft shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:text-ink'
                }`}
              >
                {s === 'tous' ? 'Tous' : STATUTS[s]?.label} <span className="tabular-nums opacity-70">{compte(s)}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 lg:w-[320px]">
            <label htmlFor="recherche-admin" className="text-sm font-semibold">
              Rechercher
            </label>
            <input
              id="recherche-admin"
              type="search"
              value={recherche}
              onChange={e => setRecherche(e.target.value)}
              placeholder={onglet === 'logements' ? 'Titre, ville, e-mail…' : 'Nom, métier, ville, SIRET…'}
              className="min-h-[48px] w-full rounded-[14px] border-0 bg-white px-4 text-base shadow-[inset_0_0_0_1.5px_#e4e3ee] placeholder:text-muted focus:shadow-[inset_0_0_0_2px_#5534e8]"
            />
          </div>
        </div>

        {visibles.length === 0 ? (
          <div className={`${carte} flex flex-col items-start gap-3 p-6`}>
            <p className="text-base text-ink-soft">
              {filtre === 'en_attente' && !recherche ? 'Rien à valider pour le moment.' : 'Aucun résultat pour ce filtre.'}
            </p>
            {(filtre !== 'tous' || recherche) && (
              <button type="button" onClick={() => { setFiltre('tous'); setRecherche('') }} className={clair}>
                Tout afficher
              </button>
            )}
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {onglet === 'logements'
              ? (visibles as Vitrine[]).map(v => <CarteLogement key={v.id} v={v} />)
              : (visibles as Prestataire[]).map(p => <CartePrestataire key={p.id} p={p} />)}
          </ul>
        )}
      </main>
    </div>
  )
}

/* ───────────── Briques ───────────── */

function Statut({ statut }: { statut: string }) {
  const s = STATUTS[statut] ?? { label: statut, classes: 'bg-surface text-ink-soft' }
  return <span className={`inline-flex self-start rounded-[8px] px-2.5 py-1 text-sm font-semibold ${s.classes}`}>{s.label}</span>
}

function Vignettes({ photos, alt }: { photos: string[]; alt: string }) {
  const [ouverte, setOuverte] = useState<number | null>(null)
  if (!photos.length) return <div className="flex h-[96px] items-center justify-center rounded-[14px] bg-surface px-4 text-sm text-muted">Aucune photo</div>
  return (
    <>
      <ul className="flex gap-2 overflow-x-auto">
        {photos.map((src, i) => (
          <li key={src} className="shrink-0">
            <button
              type="button"
              onClick={() => setOuverte(i)}
              aria-label={`Agrandir la photo ${i + 1} de ${alt}`}
              className="relative block h-[96px] w-[128px] overflow-hidden rounded-[12px] bg-surface hover:opacity-90"
            >
              <Image src={src} alt="" fill sizes="128px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
      {ouverte !== null && <PhotoLightbox photos={photos} startIndex={ouverte} onClose={() => setOuverte(null)} />}
    </>
  )
}

function Infos({ lignes }: { lignes: [string, ReactNode][] }) {
  return (
    <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-base sm:grid-cols-2">
      {lignes
        .filter(([, v]) => v !== null && v !== undefined && v !== '')
        .map(([k, v]) => (
          <div key={k} className="flex min-w-0 gap-2">
            <dt className="shrink-0 text-ink-soft">{k}&nbsp;:</dt>
            <dd className="min-w-0 break-words font-semibold">{v}</dd>
          </div>
        ))}
    </dl>
  )
}

/** Actions de modération communes : valider, refuser avec motif, changer d'état, supprimer */
function Moderation({
  nom,
  statut,
  api,
  apiSupprimer,
  id,
  statutRefus,
  changements,
  onModifier,
}: {
  nom: string
  statut: string
  api: string
  apiSupprimer: string
  id: string
  statutRefus: string
  changements: { statut: string; label: string }[]
  onModifier: () => void
}) {
  const router = useRouter()
  const [action, setAction] = useState<string | null>(null)
  const [mode, setMode] = useState<'refus' | 'suppression' | null>(null)
  const [motif, setMotif] = useState('')
  const [erreur, setErreur] = useState('')

  const faire = async (cle: string, fn: () => Promise<void>) => {
    setAction(cle)
    setErreur('')
    try {
      await fn()
      setMode(null)
      router.refresh()
    } catch (e) {
      setErreur(`${(e as Error).message}. Réessayez.`)
    }
    setAction(null)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {statut === 'en_attente' && (
          <>
            <button type="button" disabled={!!action} onClick={() => faire('valider', () => envoyer(api, { id, statut: 'active' }))} className={vert}>
              {action === 'valider' ? 'Validation…' : 'Valider et mettre en ligne'}
            </button>
            <button type="button" disabled={!!action} onClick={() => setMode('refus')} className={clair}>
              Refuser
            </button>
          </>
        )}
        {changements.map(c => (
          <button key={c.statut} type="button" disabled={!!action} onClick={() => faire(c.statut, () => envoyer(api, { id, statut: c.statut }))} className={clair}>
            {action === c.statut ? 'Mise à jour…' : c.label}
          </button>
        ))}
        <button type="button" onClick={onModifier} className={clair}>
          Modifier
        </button>
        <button type="button" onClick={() => setMode('suppression')} className={`${danger} sm:ml-auto`}>
          Supprimer
        </button>
      </div>

      {mode === 'refus' && (
        <div className="flex flex-col gap-3 rounded-[14px] bg-surface p-4">
          <Zone
            label="Motif du refus, visible par l’annonceur"
            rows={2}
            value={motif}
            onChange={setMotif}
            placeholder="Ex. Les photos sont floues : ajoutez des photos nettes de chaque pièce."
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={!!action}
              onClick={() => faire('refus', () => envoyer(api, { id, statut: statutRefus, motif_refus: motif.trim() || 'Annonce refusée' }))}
              className={`${bouton} bg-[#b42318] text-white hover:bg-[#912018]`}
            >
              {action === 'refus' ? 'Envoi…' : 'Refuser'}
            </button>
            <button type="button" onClick={() => setMode(null)} className={clair}>
              Annuler
            </button>
          </div>
        </div>
      )}

      {mode === 'suppression' && (
        <div role="alertdialog" aria-label="Confirmer la suppression" className="flex flex-col gap-3 rounded-[14px] bg-[#fef3f2] p-4">
          <p className="text-base text-[#7a271a]">Supprimer «&nbsp;{nom}&nbsp;» ? Elle sera effacée définitivement de la base.</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={!!action} onClick={() => faire('suppr', () => envoyer(apiSupprimer, { id }))} className={`${bouton} bg-[#b42318] text-white hover:bg-[#912018]`}>
              {action === 'suppr' ? 'Suppression…' : 'Supprimer définitivement'}
            </button>
            <button type="button" onClick={() => setMode(null)} className={clair} autoFocus>
              Garder
            </button>
          </div>
        </div>
      )}

      {erreur && (
        <p role="alert" className="text-base font-semibold text-[#b42318]">
          {erreur}
        </p>
      )}
    </div>
  )
}

/** Panneau de modification : enregistre uniquement les champs affichés */
function Edition({ children, onAnnuler, onEnregistrer }: { children: ReactNode; onAnnuler: () => void; onEnregistrer: () => Promise<void> }) {
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState('')
  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        setEnvoi(true)
        setErreur('')
        try {
          await onEnregistrer()
        } catch (err) {
          setErreur(`${(err as Error).message}. Les modifications ne sont pas enregistrées.`)
          setEnvoi(false)
        }
      }}
      className="flex flex-col gap-4 rounded-[18px] bg-surface p-4 sm:p-5"
    >
      {children}
      {erreur && (
        <p role="alert" className="text-base font-semibold text-[#b42318]">
          {erreur}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={envoi} className={violet}>
          {envoi ? 'Enregistrement…' : 'Enregistrer'}
        </button>
        <button type="button" onClick={onAnnuler} className={clair}>
          Annuler
        </button>
      </div>
    </form>
  )
}

/* ───────────── Logement ───────────── */

function CarteLogement({ v }: { v: Vitrine }) {
  const router = useRouter()
  const [edition, setEdition] = useState(false)
  const titre = v.titre?.trim() || 'Sans titre'
  const enLigne = ['active', 'deja_loue', 'bientot_dispo'].includes(v.statut)
  const t = (x: unknown) => (x === null || x === undefined ? '' : String(x))
  const [d, setD] = useState({
    titre: t(v.titre),
    ville: t(v.ville),
    pays: t(v.pays) || 'France',
    region: t(v.region),
    prix_nuit: t(v.prix_nuit),
    prix_semaine: t(v.prix_semaine),
    prix_mois: t(v.prix_mois),
    description_courte: t(v.description_courte),
    description_longue: t(v.description_longue),
    whatsapp: t(v.whatsapp),
    photos: v.photos || [],
  })
  const maj = <K extends keyof typeof d>(k: K, val: (typeof d)[K]) => setD(p => ({ ...p, [k]: val }))

  const changements =
    v.statut === 'active'
      ? [
          { statut: 'deja_loue', label: 'Déjà loué' },
          { statut: 'bientot_dispo', label: 'Bientôt disponible' },
          { statut: 'suspendue', label: 'Suspendre' },
        ]
      : v.statut === 'en_attente'
        ? []
        : [{ statut: 'active', label: 'Remettre en ligne' }]

  return (
    <li className={`${carte} flex flex-col gap-4 p-4 sm:p-5`}>
      <Vignettes photos={v.photos || []} alt={titre} />
      <div className="flex flex-col gap-2">
        <Statut statut={v.statut} />
        <h2 className="text-[20px] font-bold leading-snug">
          {enLigne ? (
            <Link href={`/vitrine/${v.id}`} target="_blank" className="text-ink underline-offset-4 hover:underline">
              {titre}
            </Link>
          ) : (
            titre
          )}
        </h2>
        {v.description_courte && <p className="max-w-[70ch] text-base text-ink-soft">{v.description_courte}</p>}
      </div>
      <Infos
        lignes={[
          ['Lieu', [v.ville, v.code_postal, v.region, v.pays !== 'France' ? v.pays : null].filter(Boolean).join(', ')],
          ['Prix', v.prix_nuit ? `${v.prix_nuit} € / nuit` : ''],
          ['Type', v.type_logement],
          ['Propriétaire', v.directloca_users?.email],
          ['WhatsApp', v.whatsapp],
          ['N° d’enregistrement', v.numero_enregistrement],
          ['Vidéo', v.video_url],
          ['Visite 3D', v.visite_3d_url],
          ['Chien de plus de 10 kg', v.equipements?.includes('chien_10kg') ? 'Accepté' : ''],
          ['Publiée le', date(v.created_at)],
          ['Visites', v.nb_vues ?? 0],
        ]}
      />
      {v.motif_refus && v.statut !== 'active' && (
        <p className="rounded-[14px] bg-[#fef3f2] px-4 py-3 text-base text-[#912018]">
          <strong className="font-semibold">Motif envoyé&nbsp;:</strong> {v.motif_refus}
        </p>
      )}

      {edition ? (
        <Edition
          onAnnuler={() => setEdition(false)}
          onEnregistrer={async () => {
            await envoyer('/api/admin-update-vitrine', { id: v.id, ...d })
            setEdition(false)
            router.refresh()
          }}
        >
          <Champ label="Titre" value={d.titre} onChange={x => maj('titre', x)} />
          <Grille>
            <Champ label="Ville" value={d.ville} onChange={x => maj('ville', x)} />
            <Champ label="Région" value={d.region} onChange={x => maj('region', x)} />
            <Choix label="Pays" value={d.pays} onChange={x => maj('pays', x)} options={PAYS} />
            <Champ label="WhatsApp" type="tel" value={d.whatsapp} onChange={x => maj('whatsapp', x)} />
            <Champ label="Prix par nuit (€)" type="number" value={d.prix_nuit} onChange={x => maj('prix_nuit', x)} />
            <Champ label="Prix par semaine (€)" type="number" value={d.prix_semaine} onChange={x => maj('prix_semaine', x)} />
            <Champ label="Prix par mois (€)" type="number" value={d.prix_mois} onChange={x => maj('prix_mois', x)} />
          </Grille>
          <Zone label="Résumé" rows={2} value={d.description_courte} onChange={x => maj('description_courte', x)} />
          <Zone label="Description complète" rows={6} value={d.description_longue} onChange={x => maj('description_longue', x)} />
          <TeleversementPhotos id={`photos-${v.id}`} photos={d.photos} onChange={p => maj('photos', p)} />
        </Edition>
      ) : (
        <Moderation
          nom={titre}
          statut={v.statut}
          id={v.id}
          api="/api/admin-update-vitrine"
          apiSupprimer="/api/admin-supprimer-vitrine"
          statutRefus="suspendue"
          changements={changements}
          onModifier={() => setEdition(true)}
        />
      )}
    </li>
  )
}

/* ───────────── Prestataire ───────────── */

function CartePrestataire({ p }: { p: Prestataire }) {
  const router = useRouter()
  const [edition, setEdition] = useState(false)
  const nom = nomPresta(p)
  const t = (x: unknown) => (x === null || x === undefined ? '' : String(x))
  const [d, setD] = useState({
    prenom: t(p.prenom),
    nom: t(p.nom),
    siret: t(p.siret),
    adresse_siege: t(p.adresse_siege),
    ville: t(p.ville),
    code_postal: t(p.code_postal),
    region: t(p.region),
    activite: t(p.activite) || 'Conciergerie',
    description: t(p.description),
    telephone: t(p.telephone),
    whatsapp: t(p.whatsapp),
    site_web: t(p.site_web),
    tarif_horaire: t(p.tarif_horaire),
    sur_devis: !!p.sur_devis,
    flyer_url: t(p.flyer_url),
    photos: p.photos || [],
  })
  const maj = <K extends keyof typeof d>(k: K, val: (typeof d)[K]) => setD(x => ({ ...x, [k]: val }))
  const photos = [p.flyer_url, ...(p.photos || [])].filter((x): x is string => !!x && !x.toLowerCase().endsWith('.pdf'))

  return (
    <li className={`${carte} flex flex-col gap-4 p-4 sm:p-5`}>
      <Vignettes photos={photos} alt={nom} />
      <div className="flex flex-col gap-2">
        <Statut statut={p.statut} />
        <h2 className="text-[20px] font-bold leading-snug">
          {p.statut === 'active' ? (
            <Link href={`/prestataires/${p.id}`} target="_blank" className="text-ink underline-offset-4 hover:underline">
              {nom}
            </Link>
          ) : (
            nom
          )}
        </h2>
        {p.description && <p className="line-clamp-3 max-w-[70ch] text-base text-ink-soft">{p.description}</p>}
      </div>
      <Infos
        lignes={[
          ['Métier', p.activite],
          ['Lieu', [p.ville, p.code_postal, p.region].filter(Boolean).join(', ')],
          ['SIRET', p.siret],
          ['Siège', p.adresse_siege],
          ['Tarif', p.sur_devis ? 'Sur devis' : p.tarif_horaire ? `${p.tarif_horaire} € / h` : ''],
          ['Compte', p.directloca_users?.email],
          ['Téléphone', p.telephone],
          ['WhatsApp', p.whatsapp],
          ['Site', p.site_web],
          ['Inscrit le', date(p.created_at)],
        ]}
      />
      {p.siret && (
        <a
          href={`https://annuaire-entreprises.data.gouv.fr/rechercher?terme=${encodeURIComponent(p.siret.replace(/\s/g, ''))}`}
          target="_blank"
          rel="noreferrer"
          className={`${clair} self-start`}
        >
          Vérifier le SIRET sur l’annuaire des entreprises
        </a>
      )}
      {p.motif_refus && p.statut !== 'active' && (
        <p className="rounded-[14px] bg-[#fef3f2] px-4 py-3 text-base text-[#912018]">
          <strong className="font-semibold">Motif envoyé&nbsp;:</strong> {p.motif_refus}
        </p>
      )}

      {edition ? (
        <Edition
          onAnnuler={() => setEdition(false)}
          onEnregistrer={async () => {
            await envoyer('/api/admin-update-prestataire', { id: p.id, ...d })
            setEdition(false)
            router.refresh()
          }}
        >
          <Grille>
            <Champ label="Prénom" value={d.prenom} onChange={x => maj('prenom', x)} />
            <Champ label="Nom" value={d.nom} onChange={x => maj('nom', x)} />
            <Choix label="Métier" value={d.activite} onChange={x => maj('activite', x)} options={METIERS.map(m => m.nom)} />
            <Champ label="SIRET" value={d.siret} onChange={x => maj('siret', x)} />
            <Champ label="Ville" value={d.ville} onChange={x => maj('ville', x)} />
            <Champ label="Code postal" value={d.code_postal} onChange={x => maj('code_postal', x)} />
            <Champ label="Région" value={d.region} onChange={x => maj('region', x)} />
            <Champ label="Adresse du siège" value={d.adresse_siege} onChange={x => maj('adresse_siege', x)} />
            <Champ label="Téléphone" type="tel" value={d.telephone} onChange={x => maj('telephone', x)} />
            <Champ label="WhatsApp" type="tel" value={d.whatsapp} onChange={x => maj('whatsapp', x)} />
            <Champ label="Site internet" value={d.site_web} onChange={x => maj('site_web', x)} />
            {!d.sur_devis && <Champ label="Tarif horaire (€)" type="number" value={d.tarif_horaire} onChange={x => maj('tarif_horaire', x)} />}
          </Grille>
          <Case label="Sur devis" checked={d.sur_devis} onChange={x => maj('sur_devis', x)} />
          <Zone label="Présentation" rows={5} value={d.description} onChange={x => maj('description', x)} />
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">Logo ou flyer</h3>
            <TeleversementPhotos id={`flyer-${p.id}`} photos={d.flyer_url ? [d.flyer_url] : []} onChange={x => maj('flyer_url', x[0] ?? '')} max={1} principale={null} />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-bold">Réalisations</h3>
            <TeleversementPhotos id={`real-${p.id}`} photos={d.photos} onChange={x => maj('photos', x)} principale={null} />
          </div>
        </Edition>
      ) : (
        <Moderation
          nom={nom}
          statut={p.statut}
          id={p.id}
          api="/api/admin-update-prestataire"
          apiSupprimer="/api/admin-supprimer-prestataire"
          statutRefus="refuse"
          changements={p.statut === 'active' ? [{ statut: 'suspendue', label: 'Suspendre' }] : p.statut === 'en_attente' ? [] : [{ statut: 'active', label: 'Remettre en ligne' }]}
          onModifier={() => setEdition(true)}
        />
      )}
    </li>
  )
}
