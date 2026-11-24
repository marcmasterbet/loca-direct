'use client'

import { useId, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'

/** Briques communes aux formulaires de l’espace */

export function Bloc({ id, titre, intro, children, focusable }: { id?: string; titre: string; intro?: string; children: ReactNode; focusable?: boolean }) {
  return (
    <section id={id} className="flex scroll-mt-6 flex-col gap-5 rounded-[22px] bg-white p-5 shadow-[0_0_0_1px_#e4e3ee,0_4px_16px_rgba(23,22,42,0.04)] sm:p-7">
      <header className="flex flex-col gap-1.5">
        <h2 tabIndex={focusable ? -1 : undefined} className="text-[22px] font-bold tracking-[-0.02em] outline-none">
          {titre}
        </h2>
        {intro && <p className="max-w-[60ch] text-base leading-relaxed text-ink-soft">{intro}</p>}
      </header>
      {children}
    </section>
  )
}

export const champBase =
  'min-h-[48px] w-full rounded-[14px] border-0 bg-white px-4 text-base text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] focus:shadow-[inset_0_0_0_2px_#5534e8]'

export function Choix({ label, value, onChange, options, aide }: { label: string; value: string; onChange: (v: string) => void; options: string[]; aide?: string }) {
  const id = useId()
  const liste = options.includes(value) || !value ? options : [value, ...options]
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} aria-describedby={aide ? `${id}-a` : undefined} className={`${champBase} appearance-auto pr-3`}>
        {liste.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {aide && (
        <p id={`${id}-a`} className="text-sm text-muted">
          {aide}
        </p>
      )}
    </div>
  )
}

export function Zone({ label, value, onChange, max, rows = 4, aide, placeholder }: { label: string; value: string; onChange: (v: string) => void; max?: number; rows?: number; aide?: string; placeholder?: string }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        maxLength={max}
        onChange={e => onChange(e.target.value)}
        aria-describedby={`${id}-a`}
        className={`${champBase} resize-y py-3 leading-relaxed placeholder:text-muted`}
      />
      <p id={`${id}-a`} className="flex justify-between gap-3 text-sm text-muted">
        <span>{aide}</span>
        {max && (
          <span className="tabular-nums">
            {value.length}&nbsp;/&nbsp;{max}
          </span>
        )}
      </p>
    </div>
  )
}

export function Case({ label, checked, onChange, mis }: { label: string; checked: boolean; onChange: (v: boolean) => void; mis?: boolean }) {
  return (
    <label
      className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-[14px] px-4 text-base ${
        checked ? 'bg-brand-soft font-semibold text-brand-strong shadow-[inset_0_0_0_1.5px_#c9bffb]' : 'bg-white shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface'
      } ${mis ? '!bg-dog !text-[#5c3d00] !shadow-[inset_0_0_0_1.5px_#ffcf4d]' : ''}`}
    >
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="h-5 w-5 shrink-0 accent-[#5534e8]" />
      {label}
    </label>
  )
}

export const Grille = ({ children }: { children: ReactNode }) => <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>


/** Envoi de photos : plusieurs à la fois, photo principale, retrait */
export function TeleversementPhotos({
  photos,
  onChange,
  max = 10,
  erreur,
  principale: libellePrincipale = 'Photo principale',
  id = 'photos',
}: {
  photos: string[]
  onChange: (p: string[]) => void
  max?: number
  erreur?: string
  principale?: string | null
  id?: string
}) {
  const [envoi, setEnvoi] = useState(0)
  const [probleme, setProbleme] = useState('')
  const entree = useRef<HTMLInputElement>(null)
  const place = max - photos.length

  const televerser = async (fichiers: FileList | null) => {
    if (!fichiers?.length) return
    setProbleme('')
    const liste = Array.from(fichiers).slice(0, place)
    const ajoutees: string[] = []
    setEnvoi(liste.length)
    for (const f of liste) {
      try {
        const fd = new FormData()
        fd.append('file', f)
        const res = await fetch('/api/upload-photo', { method: 'POST', body: fd })
        const r = await res.json().catch(() => ({}))
        if (r.url) ajoutees.push(r.url)
        else setProbleme(`${f.name} : ${r.error || 'envoi impossible'}. Formats acceptés : JPG, PNG ou WEBP, 5 Mo maximum.`)
      } catch {
        setProbleme(`${f.name} n’a pas pu être envoyée. Vérifiez votre connexion et réessayez.`)
      }
      setEnvoi(n => n - 1)
    }
    if (ajoutees.length) onChange([...photos, ...ajoutees].slice(0, max))
    if (entree.current) entree.current.value = ''
  }

  const retirer = (url: string) => onChange(photos.filter(p => p !== url))
  const principale = (url: string) => onChange([url, ...photos.filter(p => p !== url)])

  return (
    <div className="flex flex-col gap-4">
      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {photos.map((url, i) => (
            <li key={url} className="flex flex-col gap-1.5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-surface">
                <Image src={url} alt={`Photo ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 240px" className="object-cover" />
                {i === 0 && libellePrincipale && <span className="absolute left-2 top-2 rounded-[8px] bg-white px-2 py-1 text-sm font-bold text-brand-strong">{libellePrincipale}</span>}
              </div>
              <div className="flex flex-wrap">
                {i > 0 && libellePrincipale && (
                  <button type="button" onClick={() => principale(url)} aria-label={`Mettre la photo ${i + 1} en principale`} className="min-h-[44px] rounded-[10px] px-2 text-sm font-semibold text-brand-strong hover:bg-brand-soft">
                    Principale
                  </button>
                )}
                <button type="button" onClick={() => retirer(url)} aria-label={`Retirer la photo ${i + 1}`} className="min-h-[44px] rounded-[10px] px-2 text-sm font-semibold text-ink-soft hover:bg-surface">
                  Retirer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {place > 0 && (
        <div className="flex flex-col items-start gap-2">
          <input ref={entree} type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" tabIndex={-1} aria-hidden="true" onChange={e => televerser(e.target.files)} />
          <button
            type="button"
            onClick={() => entree.current?.click()}
            disabled={envoi > 0}
            data-erreur={erreur ? 'true' : undefined}
            aria-describedby={`${id}-aide`}
            className={`inline-flex min-h-[52px] items-center rounded-[14px] px-5 text-base font-bold ${
              photos.length ? 'bg-white text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:bg-surface' : 'bg-brand text-white hover:bg-brand-strong'
            } ${erreur ? 'shadow-[inset_0_0_0_2px_#c2410c]' : ''} disabled:opacity-70`}
          >
            {envoi > 0 ? `Envoi en cours (${envoi})…` : photos.length ? 'Ajouter des photos' : 'Choisir des photos'}
          </button>
          <p id={`${id}-aide`} className="text-sm text-muted">
            JPG, PNG ou WEBP, 5&nbsp;Mo maximum par photo. Encore {place} possible{place > 1 ? 's' : ''}.
          </p>
        </div>
      )}
      {(erreur || probleme) && (
        <p role="alert" className="text-sm font-semibold text-[#c2410c]">
          {probleme || erreur}
        </p>
      )}
    </div>
  )
}

