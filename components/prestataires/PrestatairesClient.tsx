'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PrestataireCard from './PrestataireCard'
import { METIERS, type PrestatairePublic } from '@/lib/prestataires'
import { REGIONS_METRO } from '@/lib/france'

const PAR_PAGE = 24

function normaliser(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
}

type Props = {
  prestataires: PrestatairePublic[]
  chemin: string
  metierFixe?: boolean
  regionFixe?: boolean
}

/** Annuaire : filtres (métier, région, ville) et liste des prestataires */
export default function PrestatairesClient({ prestataires, chemin, metierFixe = false, regionFixe = false }: Props) {
  const params = useSearchParams()
  const [ville, setVille] = useState(params.get('ville') ?? '')
  const [metier, setMetier] = useState(params.get('metier') ?? '')
  const [region, setRegion] = useState(params.get('region') ?? '')
  const cle = [ville, metier, region].join('|')
  const [pagination, setPagination] = useState({ cle, nombre: PAR_PAGE })
  const nombre = pagination.cle === cle ? pagination.nombre : PAR_PAGE

  useEffect(() => {
    const q = new URLSearchParams()
    if (ville) q.set('ville', ville)
    if (metier) q.set('metier', metier)
    if (region) q.set('region', region)
    const s = q.toString()
    window.history.replaceState(null, '', s ? `${chemin}?${s}` : chemin)
  }, [ville, metier, region, chemin])

  const resultats = useMemo(() => {
    const cible = normaliser(ville)
    const nomMetier = METIERS.find(m => m.slug === metier)?.nom
    return prestataires.filter(
      p =>
        (!cible || normaliser(p.ville || '').includes(cible)) &&
        (!nomMetier || p.activite === nomMetier) &&
        (!region || p.region === region)
    )
  }, [prestataires, ville, metier, region])

  const champ =
    'min-h-[48px] rounded-[14px] border-0 bg-white px-4 text-base text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] focus:shadow-[inset_0_0_0_2px_#5534e8]'
  const filtres = !!(ville || metier || region)

  return (
    <div className="flex flex-col gap-8">
      <div className="sticky top-0 z-30 -mx-5 flex flex-col gap-3 border-b border-line bg-white px-5 py-3 sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap gap-2.5">
          <label className="flex min-w-[200px] flex-1 flex-col gap-1">
            <span className="text-sm font-semibold text-ink-soft">Ville</span>
            <input
              type="search"
              name="ville"
              autoComplete="off"
              value={ville}
              onChange={e => setVille(e.target.value)}
              placeholder="Ex. Annecy…"
              className={`${champ} w-full`}
            />
          </label>
          {!metierFixe && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink-soft">Métier</span>
              <select value={metier} onChange={e => setMetier(e.target.value)} className={`${champ} pr-9`}>
                <option value="">Tous les métiers</option>
                {METIERS.map(m => (
                  <option key={m.slug} value={m.slug}>
                    {m.court}
                  </option>
                ))}
              </select>
            </label>
          )}
          {!regionFixe && (
            <label className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-ink-soft">Région</span>
              <select value={region} onChange={e => setRegion(e.target.value)} className={`${champ} pr-9`}>
                <option value="">Toutes les régions</option>
                {REGIONS_METRO.map(r => (
                  <option key={r.slug} value={r.nom}>
                    {r.nom}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <p className="text-sm text-ink-soft" aria-live="polite">
          <strong className="tabular-nums text-ink">{resultats.length}</strong> prestataire{resultats.length > 1 ? 's' : ''}
          {filtres && (
            <button
              type="button"
              onClick={() => {
                setVille('')
                setMetier('')
                setRegion('')
              }}
              className="ml-3 min-h-[44px] font-semibold text-brand hover:underline"
            >
              Effacer les filtres
            </button>
          )}
        </p>
      </div>

      {resultats.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-[26px] bg-surface p-8 sm:p-10">
          <h2 className="text-xl font-bold">Aucun prestataire ne correspond à ces filtres</h2>
          <p className="text-base text-ink-soft">
            L’annuaire s’agrandit chaque semaine. Élargissez la recherche à toute la région ou à tous les métiers.
          </p>
          {filtres && (
            <button
              type="button"
              onClick={() => {
                setVille('')
                setMetier('')
                setRegion('')
              }}
              className="mt-2 flex min-h-[48px] items-center rounded-[14px] bg-brand px-5 text-base font-bold text-white hover:bg-brand-strong"
            >
              Effacer les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {resultats.slice(0, nombre).map((p, i) => (
              <PrestataireCard key={p.id} p={p} priorite={i < 4} />
            ))}
          </div>
          {resultats.length > nombre && (
            <button
              type="button"
              onClick={() => setPagination({ cle, nombre: nombre + PAR_PAGE })}
              className="flex min-h-[48px] items-center self-center rounded-[14px] px-6 text-base font-bold text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
            >
              Voir plus de prestataires ({resultats.length - nombre})
            </button>
          )}
        </>
      )}
    </div>
  )
}
