'use client'

import { useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SiteHeader from '@/components/site/SiteHeader'
import ListingCard from '@/components/listing/ListingCard'
import PhotoLightbox from '@/components/PhotoLightbox'

export type Onglet = 'annonces' | 'favoris' | 'compte'

type User = {
  id: string
  email: string
  est_voyageur: boolean
  est_hebergeur: boolean
  est_prestataire: boolean
  created_at: string
  ref_code: string
}

type Vitrine = {
  id: string
  titre: string | null
  ville: string | null
  statut: string
  prix_nuit: number | null
  nb_vues: number | null
  motif_refus?: string | null
  photos?: string[] | null
  type_logement?: string | null
}

type Prestataire = {
  id: string
  nom: string | null
  prenom: string | null
  ville: string | null
  activite: string | null
  statut: string
  nb_vues: number | null
  motif_refus?: string | null
  flyer_url: string | null
}

type Favori = { id: string; vitrine_id: string; vitrines: Vitrine | null }
type FavoriPrestataire = { id: string; prestataire_id: string; prestataires: Prestataire | null }
type Alerte = { id: string; ville: string; active: boolean }

const STATUTS: Record<string, { label: string; classes: string }> = {
  en_attente: { label: 'En cours de vérification', classes: 'bg-dog text-[#7a5200]' },
  active: { label: 'En ligne', classes: 'bg-mint text-mint-ink' },
  deja_loue: { label: 'Déjà loué', classes: 'bg-surface text-ink-soft' },
  bientot_dispo: { label: 'Bientôt disponible', classes: 'bg-brand-soft text-brand-strong' },
  suspendue: { label: 'Suspendue', classes: 'bg-surface text-ink-soft' },
  refuse: { label: 'Refusée', classes: 'bg-[#fff1ec] text-[#9a3412]' },
}

const ONGLETS: { id: Onglet; label: string }[] = [
  { id: 'annonces', label: 'Mes annonces' },
  { id: 'favoris', label: 'Favoris et alertes' },
  { id: 'compte', label: 'Mon compte' },
]

const bouton =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[12px] px-4 text-base font-semibold no-underline'
const boutonClair = `${bouton} bg-white text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface`
const boutonViolet = `${bouton} bg-brand text-white hover:bg-brand-strong`
const carte = 'rounded-[22px] bg-white shadow-[0_0_0_1px_#e4e3ee,0_4px_16px_rgba(23,22,42,0.04)]'

const nomPresta = (p: Prestataire) => [p.prenom, p.nom].filter(Boolean).join(' ') || p.activite || 'Ma fiche'

export default function EspaceClient({
  ongletInitial,
  user,
  vitrines,
  prestataires,
  favoris,
  favorisPrestataires,
  alertes,
}: {
  ongletInitial: Onglet
  user: User
  vitrines: Vitrine[]
  prestataires: Prestataire[]
  favoris: Favori[]
  favorisPrestataires: FavoriPrestataire[]
  alertes: Alerte[]
}) {
  const router = useRouter()
  const [onglet, setOnglet] = useState<Onglet>(ongletInitial)

  const changerOnglet = (o: Onglet) => {
    setOnglet(o)
    window.history.replaceState(null, '', o === 'annonces' ? '/espace' : `/espace?tab=${o}`)
  }

  const deconnecter = async () => {
    await fetch('/api/deconnexion', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen flex-col bg-surface text-ink">
      <div className="bg-white">
        <SiteHeader isLoggedIn />
      </div>

      <main id="contenu" className="mx-auto flex w-full max-w-[960px] flex-1 flex-col gap-6 px-5 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h1 className="text-[28px] font-bold leading-tight tracking-[-0.03em] sm:text-[34px]">Mon espace</h1>
            <p className="truncate text-base text-ink-soft">{user.email}</p>
          </div>
          <Link href="/espace/ma-vitrine" className={boutonViolet}>
            Publier un logement
          </Link>
        </header>

        <nav aria-label="Rubriques de mon espace" className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-1.5 rounded-[14px] bg-white p-1.5 shadow-[0_0_0_1px_#e4e3ee]">
            {ONGLETS.map(o => (
              <button
                key={o.id}
                type="button"
                onClick={() => changerOnglet(o.id)}
                aria-current={onglet === o.id ? 'page' : undefined}
                className={`min-h-[44px] whitespace-nowrap rounded-[10px] px-4 text-base font-semibold ${
                  onglet === o.id ? 'bg-brand-soft text-brand-strong' : 'text-ink-soft hover:bg-surface hover:text-ink'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </nav>

        {onglet === 'annonces' && <MesAnnonces vitrines={vitrines} prestataires={prestataires} />}
        {onglet === 'favoris' && (
          <Favoris favoris={favoris} favorisPrestataires={favorisPrestataires} alertes={alertes} />
        )}
        {onglet === 'compte' && <Compte user={user} onDeconnexion={deconnecter} />}
      </main>
    </div>
  )
}

/* ───────────── Mes annonces ───────────── */

function Section({ titre, action, children }: { titre: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[20px] font-bold tracking-[-0.02em]">{titre}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

function Vide({ titre, texte, lien, libelle }: { titre: string; texte: string; lien: string; libelle: string }) {
  return (
    <div className={`${carte} flex flex-col items-start gap-3 p-6`}>
      <h3 className="text-[18px] font-bold">{titre}</h3>
      <p className="max-w-[56ch] text-base leading-relaxed text-ink-soft">{texte}</p>
      <Link href={lien} className={boutonViolet}>
        {libelle}
      </Link>
    </div>
  )
}

function Statut({ statut }: { statut: string }) {
  const s = STATUTS[statut] ?? { label: statut, classes: 'bg-surface text-ink-soft' }
  return <span className={`inline-flex self-start rounded-[8px] px-2.5 py-1 text-sm font-semibold ${s.classes}`}>{s.label}</span>
}

function Vignette({ src, alt, photos = [] }: { src?: string | null; alt: string; photos?: string[] }) {
  const [ouverte, setOuverte] = useState(false)
  const cadre = 'relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-[14px] bg-surface sm:h-[104px] sm:w-[136px]'
  if (!src) {
    return (
      <div className={cadre}>
        <span className="flex h-full items-center justify-center px-2 text-center text-sm text-muted">Pas de photo</span>
      </div>
    )
  }
  const liste = photos.length ? photos : [src]
  return (
    <>
      <button type="button" onClick={() => setOuverte(true)} aria-label={`Voir les photos de ${alt}`} className={`${cadre} hover:opacity-90`}>
        <Image src={src} alt={alt} fill sizes="136px" className="object-cover" />
        {liste.length > 1 && (
          <span className="absolute bottom-1.5 right-1.5 rounded-full bg-ink/80 px-2 py-0.5 text-sm font-semibold tabular-nums text-white">{liste.length}</span>
        )}
      </button>
      {ouverte && <PhotoLightbox photos={liste} startIndex={0} onClose={() => setOuverte(false)} />}
    </>
  )
}

function MesAnnonces({ vitrines, prestataires }: { vitrines: Vitrine[]; prestataires: Prestataire[] }) {
  return (
    <div className="flex flex-col gap-10">
      <Section
        titre={`Mes logements (${vitrines.length})`}
        action={
          vitrines.length > 0 ? (
            <Link href="/espace/ma-vitrine" className={boutonClair}>
              Ajouter un logement
            </Link>
          ) : null
        }
      >
        {vitrines.length === 0 ? (
          <Vide
            titre="Publiez votre premier logement"
            texte="Gratuit et sans commission : les voyageurs vous écrivent directement sur WhatsApp. Votre annonce est vérifiée puis mise en ligne."
            lien="/espace/ma-vitrine"
            libelle="Publier un logement"
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {vitrines.map(v => (
              <LigneLogement key={v.id} v={v} />
            ))}
          </ul>
        )}
      </Section>

      <Section
        titre={`Ma fiche dans l’annuaire (${prestataires.length})`}
        action={
          prestataires.length > 0 ? (
            <Link href="/espace/devenir-prestataire" className={boutonClair}>
              Ajouter une fiche
            </Link>
          ) : null
        }
      >
        {prestataires.length === 0 ? (
          <Vide
            titre="Proposez vos services aux propriétaires"
            texte="Conciergerie, ménage, linge, photo, travaux : créez votre fiche dans l’annuaire. Les propriétaires vous contactent directement."
            lien="/espace/devenir-prestataire"
            libelle="Créer ma fiche"
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {prestataires.map(p => (
              <LignePrestataire key={p.id} p={p} />
            ))}
          </ul>
        )}
      </Section>
    </div>
  )
}

function LigneLogement({ v }: { v: Vitrine }) {
  const router = useRouter()
  const [enCours, setEnCours] = useState(false)
  const [confirmer, setConfirmer] = useState(false)
  const [copie, setCopie] = useState(false)
  const titre = v.titre?.trim() || v.type_logement || 'Mon logement'
  const lien = `https://loca-direct.fr/vitrine/${v.id}`
  const visible = ['active', 'deja_loue', 'bientot_dispo'].includes(v.statut)
  const basculable = v.statut === 'active' || v.statut === 'deja_loue'
  const partage = `Découvrez mon logement « ${titre} » sur LocaDirect : ${lien}`

  const basculer = async () => {
    setEnCours(true)
    await fetch('/api/mes-vitrines-statut', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id, statut: v.statut === 'active' ? 'deja_loue' : 'active' }),
    })
    router.refresh()
    setEnCours(false)
  }

  const supprimer = async () => {
    setEnCours(true)
    await fetch('/api/supprimer-vitrine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: v.id }),
    })
    router.refresh()
  }

  const copier = async () => {
    await navigator.clipboard.writeText(lien)
    setCopie(true)
    setTimeout(() => setCopie(false), 2000)
  }

  return (
    <li className={`${carte} flex flex-col gap-4 p-4 sm:p-5`}>
      <div className="flex gap-4">
        <Vignette src={v.photos?.[0]} alt={titre} photos={v.photos || []} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Statut statut={v.statut} />
          <h3 className="truncate text-[18px] font-bold">{titre}</h3>
          <p className="text-base text-ink-soft">
            {[v.ville, v.prix_nuit ? `${Math.round(v.prix_nuit)} € / nuit` : null].filter(Boolean).join(' · ')}
          </p>
          <p className="text-sm text-muted">
            <span className="tabular-nums">{v.nb_vues ?? 0}</span> visite{(v.nb_vues ?? 0) > 1 ? 's' : ''} de l’annonce
          </p>
        </div>
      </div>

      {v.statut === 'en_attente' && (
        <p className="rounded-[14px] bg-dog-soft px-4 py-3 text-base text-ink-soft">
          Nous vérifions votre annonce. Elle sera en ligne sous 24 à 48&nbsp;heures et vous recevrez un e-mail.
        </p>
      )}
      {v.motif_refus && (
        <p className="rounded-[14px] bg-[#fff1ec] px-4 py-3 text-base text-[#9a3412]">
          <strong className="font-semibold">À corriger&nbsp;:</strong> {v.motif_refus}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Link href={`/espace/ma-vitrine/${v.id}/modifier`} className={boutonViolet}>
          Modifier
        </Link>
        {visible && (
          <Link href={`/vitrine/${v.id}`} className={boutonClair}>
            Voir l’annonce
          </Link>
        )}
        {basculable && (
          <button type="button" onClick={basculer} disabled={enCours} aria-busy={enCours || undefined} className={boutonClair}>
            {enCours ? 'Mise à jour…' : v.statut === 'active' ? 'Marquer comme loué' : 'Remettre disponible'}
          </button>
        )}
        {visible && (
          <details className="group relative">
            <summary className={`${boutonClair} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}>Partager</summary>
            <div className="absolute left-0 z-10 mt-2 flex w-[240px] flex-col gap-1 rounded-[16px] bg-white p-2 shadow-[0_0_0_1px_#e4e3ee,0_8px_24px_rgba(23,22,42,0.08)]">
              <a href={`https://wa.me/?text=${encodeURIComponent(partage)}`} target="_blank" rel="noreferrer" className={`${bouton} justify-start text-ink hover:bg-surface`}>
                Sur WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(lien)}`} target="_blank" rel="noreferrer" className={`${bouton} justify-start text-ink hover:bg-surface`}>
                Sur Facebook
              </a>
              <button type="button" onClick={copier} className={`${bouton} justify-start text-ink hover:bg-surface`}>
                <span aria-live="polite">{copie ? 'Lien copié' : 'Copier le lien'}</span>
              </button>
            </div>
          </details>
        )}
        {!confirmer && (
          <button
            type="button"
            onClick={() => setConfirmer(true)}
            className={`${bouton} text-[#9a3412] hover:bg-[#fff1ec] sm:ml-auto`}
          >
            Supprimer
          </button>
        )}
      </div>

      {confirmer && (
        <div role="alertdialog" aria-label="Confirmer la suppression" className="flex flex-col gap-3 rounded-[14px] bg-[#fff1ec] p-4">
          <p className="text-base text-[#7c2d12]">
            Supprimer «&nbsp;{titre}&nbsp;» ? L’annonce sera effacée définitivement.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={supprimer}
              disabled={enCours}
              className={`${bouton} bg-[#c2410c] text-white hover:bg-[#9a3412]`}
            >
              {enCours ? 'Suppression…' : 'Supprimer l’annonce'}
            </button>
            <button type="button" onClick={() => setConfirmer(false)} className={boutonClair} autoFocus>
              Garder l’annonce
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

function LignePrestataire({ p }: { p: Prestataire }) {
  const router = useRouter()
  const [confirmer, setConfirmer] = useState(false)
  const [enCours, setEnCours] = useState(false)
  const nom = nomPresta(p)
  const supprimer = async () => {
    setEnCours(true)
    await fetch('/api/supprimer-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: p.id }),
    })
    router.refresh()
  }
  const enLigne = p.statut === 'active'
  return (
    <li className={`${carte} flex flex-col gap-4 p-4 sm:p-5`}>
      <div className="flex gap-4">
        <Vignette src={p.flyer_url && !p.flyer_url.endsWith('.pdf') ? p.flyer_url : null} alt={nom} />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <Statut statut={p.statut} />
          <h3 className="truncate text-[18px] font-bold">{nom}</h3>
          <p className="text-base text-ink-soft">{[p.activite, p.ville].filter(Boolean).join(' · ')}</p>
          <p className="text-sm text-muted">
            <span className="tabular-nums">{p.nb_vues ?? 0}</span> visite{(p.nb_vues ?? 0) > 1 ? 's' : ''} de la fiche
          </p>
        </div>
      </div>
      {p.statut === 'en_attente' && (
        <p className="rounded-[14px] bg-dog-soft px-4 py-3 text-base text-ink-soft">
          Nous vérifions votre fiche. Elle sera en ligne sous 24 à 48&nbsp;heures.
        </p>
      )}
      {p.motif_refus && (
        <p className="rounded-[14px] bg-[#fff1ec] px-4 py-3 text-base text-[#9a3412]">
          <strong className="font-semibold">À corriger&nbsp;:</strong> {p.motif_refus}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Link href={`/espace/devenir-prestataire/${p.id}/modifier`} className={boutonViolet}>
          Modifier ma fiche
        </Link>
        {enLigne && (
          <Link href={`/prestataires/${p.id}`} className={boutonClair}>
            Voir ma fiche
          </Link>
        )}
        {!confirmer && (
          <button type="button" onClick={() => setConfirmer(true)} className={`${bouton} text-[#9a3412] hover:bg-[#fff1ec] sm:ml-auto`}>
            Supprimer
          </button>
        )}
      </div>
      {confirmer && (
        <div role="alertdialog" aria-label="Confirmer la suppression" className="flex flex-col gap-3 rounded-[14px] bg-[#fff1ec] p-4">
          <p className="text-base text-[#7c2d12]">
            Supprimer la fiche «&nbsp;{nom}&nbsp;» de l’annuaire ? Elle sera effacée définitivement.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={supprimer} disabled={enCours} className={`${bouton} bg-[#c2410c] text-white hover:bg-[#9a3412]`}>
              {enCours ? 'Suppression…' : 'Supprimer la fiche'}
            </button>
            <button type="button" onClick={() => setConfirmer(false)} className={boutonClair} autoFocus>
              Garder la fiche
            </button>
          </div>
        </div>
      )}
    </li>
  )
}

/* ───────────── Favoris et alertes ───────────── */

function Favoris({
  favoris,
  favorisPrestataires,
  alertes,
}: {
  favoris: Favori[]
  favorisPrestataires: FavoriPrestataire[]
  alertes: Alerte[]
}) {
  const router = useRouter()
  const [ville, setVille] = useState('')
  const [ajout, setAjout] = useState(false)
  const logements = favoris.filter(f => f.vitrines)
  const pros = favorisPrestataires.filter(f => f.prestataires)

  const retirerLogement = async (vitrineId: string) => {
    await fetch('/api/toggle-favori', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vitrineId }),
    })
    router.refresh()
  }

  const retirerPro = async (prestataireId: string) => {
    await fetch('/api/toggle-favori-prestataire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prestataireId }),
    })
    router.refresh()
  }

  const ajouterAlerte = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ville.trim()) return
    setAjout(true)
    await fetch('/api/save-alerte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ville: ville.trim() }),
    })
    setVille('')
    router.refresh()
    setAjout(false)
  }

  const retirerAlerte = async (id: string) => {
    await fetch('/api/save-alerte', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-10">
      <Section titre={`Logements favoris (${logements.length})`}>
        {logements.length === 0 ? (
          <Vide
            titre="Aucun logement en favori"
            texte="Parcourez les logements et gardez ici ceux qui vous plaisent."
            lien="/logements"
            libelle="Voir les logements"
          />
        ) : (
          <ul className="grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {logements.map(f => (
              <li key={f.id} className="flex min-w-0 flex-col gap-2">
                <ListingCard v={f.vitrines!} />
                <button
                  type="button"
                  onClick={() => retirerLogement(f.vitrine_id)}
                  className={`${bouton} self-start px-2 text-ink-soft hover:bg-white hover:text-ink`}
                >
                  Retirer des favoris
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {pros.length > 0 && (
        <Section titre={`Prestataires favoris (${pros.length})`}>
          <ul className="flex flex-col gap-3">
            {pros.map(f => (
              <li key={f.id} className={`${carte} flex flex-wrap items-center justify-between gap-3 p-4`}>
                <Link href={`/prestataires/${f.prestataires!.id}`} className="flex min-h-[44px] min-w-0 flex-col justify-center text-ink no-underline">
                  <strong className="truncate text-base font-bold">{nomPresta(f.prestataires!)}</strong>
                  <span className="text-sm text-muted">
                    {[f.prestataires!.activite, f.prestataires!.ville].filter(Boolean).join(' · ')}
                  </span>
                </Link>
                <button type="button" onClick={() => retirerPro(f.prestataire_id)} className={boutonClair}>
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section titre="Mes alertes par ville">
        <div className={`${carte} flex flex-col gap-4 p-5 sm:p-6`}>
          <p className="text-base leading-relaxed text-ink-soft">
            Recevez un e-mail dès qu’un nouveau logement est publié dans une de ces villes.
          </p>
          <form onSubmit={ajouterAlerte} className="flex flex-col gap-1.5">
            <label htmlFor="alerte-ville" className="text-sm font-semibold">
              Ville à surveiller
            </label>
            <div className="flex gap-2">
              <input
                id="alerte-ville"
                value={ville}
                onChange={e => setVille(e.target.value)}
                autoComplete="address-level2"
                placeholder="Ex. La Rochelle"
                className="min-h-[48px] min-w-0 flex-1 rounded-[14px] border-0 bg-white px-4 text-base shadow-[inset_0_0_0_1.5px_#e4e3ee] placeholder:text-muted focus:shadow-[inset_0_0_0_2px_#5534e8]"
              />
              <button type="submit" disabled={ajout} aria-busy={ajout || undefined} className={`${boutonViolet} min-h-[48px]`}>
                {ajout ? 'Ajout…' : 'Ajouter'}
              </button>
            </div>
          </form>
          {alertes.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Villes surveillées">
              {alertes.map(a => (
                <li key={a.id} className="flex items-center rounded-[12px] bg-brand-soft pl-4 text-base font-semibold text-brand-strong">
                  {a.ville}
                  <button
                    type="button"
                    onClick={() => retirerAlerte(a.id)}
                    aria-label={`Supprimer l’alerte pour ${a.ville}`}
                    className="flex h-[44px] w-[44px] items-center justify-center rounded-[12px] hover:bg-brand-tint"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
    </div>
  )
}

/* ───────────── Mon compte ───────────── */

function Compte({ user, onDeconnexion }: { user: User; onDeconnexion: () => void }) {
  const [copie, setCopie] = useState(false)
  const lienParrainage = `https://loca-direct.fr?ref=${user.ref_code}`
  const profils = [
    user.est_hebergeur && 'Propriétaire',
    user.est_prestataire && 'Prestataire',
    user.est_voyageur && 'Voyageur',
  ].filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <section className={`${carte} flex flex-col p-5 sm:p-6`} aria-labelledby="titre-infos">
        <h2 id="titre-infos" className="mb-2 text-[20px] font-bold tracking-[-0.02em]">
          Mes informations
        </h2>
        <dl className="flex flex-col">
          <Ligne label="Adresse e-mail" valeur={user.email} />
          <Ligne label="Profil" valeur={profils.join(', ') || '—'} />
          <Ligne label="Membre depuis" valeur={new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })} />
        </dl>
        <Link href="/mot-de-passe-oublie" className={`${boutonClair} mt-4 self-start`}>
          Changer mon mot de passe
        </Link>
      </section>

      {user.ref_code && (
        <section className={`${carte} flex flex-col gap-3 p-5 sm:p-6`} aria-labelledby="titre-parrainage">
          <h2 id="titre-parrainage" className="text-[20px] font-bold tracking-[-0.02em]">
            Mon lien de parrainage
          </h2>
          <p className="text-base leading-relaxed text-ink-soft">
            Partagez ce lien avec d’autres propriétaires : chaque inscription passée par votre lien vous est comptée.
          </p>
          <div className="flex flex-wrap items-center gap-2 rounded-[14px] bg-surface p-2 pl-4">
            <span className="min-w-0 flex-1 truncate text-base">{lienParrainage}</span>
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(lienParrainage)
                setCopie(true)
                setTimeout(() => setCopie(false), 2000)
              }}
              className={boutonViolet}
            >
              <span aria-live="polite">{copie ? 'Lien copié' : 'Copier le lien'}</span>
            </button>
          </div>
        </section>
      )}

      <button type="button" onClick={onDeconnexion} className={`${boutonClair} self-start`}>
        Se déconnecter
      </button>
    </div>
  )
}

function Ligne({ label, valeur }: { label: string; valeur: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line py-3 last:border-0 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="text-base text-ink-soft">{label}</dt>
      <dd className="min-w-0 break-words text-base font-semibold">{valeur}</dd>
    </div>
  )
}
