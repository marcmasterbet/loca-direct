'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import ListingCard from '@/components/listing/ListingCard'
import { REGIONS_METRO } from '@/lib/france'

export type Logement = {
  id: string
  titre: string | null
  ville: string | null
  pays?: string | null
  region?: string | null
  type_logement: string | null
  prix_nuit: number | null
  capacite?: number | string | null
  nb_chambres?: number | null
  statut: string
  photos?: string[] | null
  equipements?: string[] | null
  created_at?: string | null
}

const TYPES = ['Appartement', 'Maison', 'Villa', 'Chalet', 'Studio', 'Chambre', 'Autre']

const TRIS = {
  recents: 'Les plus récents',
  prix_bas: 'Prix croissant',
  prix_haut: 'Prix décroissant',
} as const
type Tri = keyof typeof TRIS

const PAR_PAGE = 24

function normaliser(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

const chienOk = (v: Logement) => Array.isArray(v.equipements) && v.equipements.includes('chien_10kg')

export default function LogementsClient({ logements }: { logements: Logement[] }) {
  const params = useSearchParams()
  const [ville, setVille] = useState(params.get('ville') ?? '')
  const [region, setRegion] = useState(params.get('region') ?? '')
  const [type, setType] = useState(params.get('type') ?? '')
  const [chien, setChien] = useState(params.get('chien') === '1')
  const [tri, setTri] = useState<Tri>((params.get('tri') as Tri) in TRIS ? (params.get('tri') as Tri) : 'recents')
  // Nombre de logements affichés : revient à une page quand un filtre change.
  const cle = [ville, region, type, chien, tri].join('|')
  const [pagination, setPagination] = useState({ cle, nombre: PAR_PAGE })
  const nombre = pagination.cle === cle ? pagination.nombre : PAR_PAGE

  // Les filtres restent dans l'adresse : on peut partager une recherche.
  useEffect(() => {
    const q = new URLSearchParams()
    if (ville) q.set('ville', ville)
    if (region) q.set('region', region)
    if (type) q.set('type', type)
    if (chien) q.set('chien', '1')
    if (tri !== 'recents') q.set('tri', tri)
    const s = q.toString()
    window.history.replaceState(null, '', s ? `/logements?${s}` : '/logements')
  }, [ville, region, type, chien, tri])

  const resultats = useMemo(() => {
    const cible = normaliser(ville)
    const liste = logements.filter(
      v =>
        (!cible || normaliser(v.ville || '').includes(cible)) &&
        (!region || v.region === region) &&
        (!type || v.type_logement === type) &&
        (!chien || chienOk(v))
    )
    const dispo = (v: Logement) => (v.statut === 'active' ? 0 : 1)
    return liste.sort((a, b) => {
      if (dispo(a) !== dispo(b)) return dispo(a) - dispo(b)
      if (tri === 'prix_bas') return (a.prix_nuit ?? Infinity) - (b.prix_nuit ?? Infinity)
      if (tri === 'prix_haut') return (b.prix_nuit ?? -1) - (a.prix_nuit ?? -1)
      return (b.created_at ?? '').localeCompare(a.created_at ?? '')
    })
  }, [logements, ville, region, type, chien, tri])

  const filtresActifs = !!(ville || region || type || chien)
  const regionChoisie = REGIONS_METRO.find(r => r.nom === region)

  const champ =
    'min-h-[48px] rounded-[14px] border-0 bg-white px-4 text-[15px] text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] outline-none focus:shadow-[inset_0_0_0_2px_#5534e8]'

  return (
    <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-5 pb-20 pt-4 sm:px-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-[48px]">
          {chien ? 'Locations de vacances avec chien' : 'Locations de vacances en France'}
        </h1>
        <p className="max-w-[640px] text-[17px] leading-relaxed text-ink-soft">
          {logements.length} maisons et appartements loués par leurs propriétaires. Vous écrivez directement au
          propriétaire, sans commission.
        </p>
      </div>

      {/* Filtres */}
      <div className="sticky top-0 z-30 -mx-5 flex flex-col gap-3 bg-white/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap gap-2.5">
          <label className="flex min-w-[200px] flex-1">
            <span className="sr-only">Ville</span>
            <input
              type="search"
              value={ville}
              onChange={e => setVille(e.target.value)}
              placeholder="Une ville"
              className={`${champ} w-full`}
            />
          </label>
          <label className="flex">
            <span className="sr-only">Région</span>
            <select value={region} onChange={e => setRegion(e.target.value)} className={`${champ} pr-9`}>
              <option value="">Toutes les régions</option>
              {REGIONS_METRO.map(r => (
                <option key={r.slug} value={r.nom}>
                  {r.nom}
                </option>
              ))}
            </select>
          </label>
          <label className="flex">
            <span className="sr-only">Type de logement</span>
            <select value={type} onChange={e => setType(e.target.value)} className={`${champ} pr-9`}>
              <option value="">Tous les types</option>
              {TYPES.map(t => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={chien}
            onClick={() => setChien(c => !c)}
            className={`min-h-[48px] rounded-[14px] px-4 text-[15px] font-bold ${
              chien ? 'bg-[#ffcf4d] text-ink' : 'bg-dog-soft text-ink shadow-[inset_0_0_0_1.5px_#f3e3b0]'
            }`}
          >
            Chien accepté
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-ink-soft">
            <strong className="text-ink">{resultats.length}</strong> logement{resultats.length > 1 ? 's' : ''}
            {filtresActifs && (
              <button
                type="button"
                onClick={() => {
                  setVille('')
                  setRegion('')
                  setType('')
                  setChien(false)
                }}
                className="ml-3 font-semibold text-brand hover:underline"
              >
                Effacer les filtres
              </button>
            )}
          </p>
          <label className="flex items-center gap-2 text-ink-soft">
            Trier
            <select
              value={tri}
              onChange={e => setTri(e.target.value as Tri)}
              className="rounded-[10px] border-0 bg-surface px-3 py-2 font-semibold text-ink outline-none"
            >
              {Object.entries(TRIS).map(([k, l]) => (
                <option key={k} value={k}>
                  {l}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {resultats.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
          <strong className="text-xl">Aucun logement ne correspond à ces filtres</strong>
          <p className="text-[15px] text-ink-soft">
            {ville
              ? `Pas encore de logement à « ${ville} ». Essayez une ville voisine ou toute la région.`
              : 'Retirez un filtre pour voir plus de logements.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setVille('')
              setType('')
              setChien(false)
            }}
            className="mt-2 rounded-[14px] bg-brand px-5 py-3 text-[15px] font-bold text-white hover:bg-brand-strong"
          >
            Voir tous les logements{region ? ` en ${region}` : ''}
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultats.slice(0, nombre).map((v, i) => (
              <ListingCard key={v.id} v={v} priorite={i < 4} badge={chienOk(v) ? 'Chien accepté' : undefined} />
            ))}
          </div>
          {resultats.length > nombre && (
            <button
              type="button"
              onClick={() => setPagination({ cle, nombre: nombre + PAR_PAGE })}
              className="self-center rounded-[14px] px-6 py-3.5 text-[15px] font-bold text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
            >
              Voir plus de logements ({resultats.length - nombre})
            </button>
          )}
        </>
      )}

      {/* Liens vers les pages région, utiles aux visiteurs et à Google */}
      <nav aria-label="Locations par région" className="flex flex-col gap-4 border-t border-line pt-10">
        <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">
          {regionChoisie ? `Plus de locations en ${regionChoisie.nom}` : 'Locations de vacances par région'}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {(regionChoisie ? [regionChoisie] : REGIONS_METRO).map(r => (
            <li key={r.slug}>
              <Link
                href={`/location-vacances/${r.slug}`}
                className="block rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink no-underline hover:bg-brand-soft hover:text-brand-strong"
              >
                Location de vacances en {r.nom}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  )
}
