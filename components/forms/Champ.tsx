'use client'

import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label: string
  value: string
  onChange: (v: string) => void
  erreur?: string
  aide?: ReactNode
}

const base =
  'min-h-[48px] w-full rounded-[14px] border-0 bg-white px-4 text-base text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] placeholder:text-muted focus:shadow-[inset_0_0_0_2px_#5534e8]'

/** Champ de formulaire avec libellé visible, aide et message d'erreur reliés au champ */
export function Champ({ label, value, onChange, erreur, aide, type = 'text', ...reste }: Props) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const motDePasse = type === 'password'
  const decrit = [aide ? `${id}-aide` : '', erreur ? `${id}-erreur` : ''].filter(Boolean).join(' ') || undefined
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={motDePasse && visible ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          aria-invalid={erreur ? true : undefined}
          aria-describedby={decrit}
          className={`${base} ${motDePasse ? 'pr-14' : ''} ${erreur ? 'shadow-[inset_0_0_0_2px_#b42318]' : ''}`}
          {...reste}
        />
        {motDePasse && (
          <button
            type="button"
            onClick={() => setVisible(v => !v)}
            aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={visible}
            className="absolute right-1 top-1/2 flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-[12px] text-ink-soft hover:bg-surface hover:text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              {!visible && <path d="M4 20 20 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />}
            </svg>
          </button>
        )}
      </div>
      {aide && !erreur && (
        <p id={`${id}-aide`} className="text-sm text-muted">
          {aide}
        </p>
      )}
      {erreur && (
        <p id={`${id}-erreur`} className="text-sm font-semibold text-[#b42318]">
          {erreur}
        </p>
      )}
    </div>
  )
}

/** Bouton principal d'un formulaire, avec état de chargement */
export function BoutonPrincipal({ children, chargement, libelleChargement }: { children: ReactNode; chargement?: boolean; libelleChargement?: string }) {
  return (
    <button
      type="submit"
      disabled={chargement}
      aria-busy={chargement || undefined}
      className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] bg-brand px-5 text-base font-bold text-white hover:bg-brand-strong disabled:opacity-70"
    >
      {chargement ? libelleChargement ?? 'Un instant…' : children}
    </button>
  )
}

/** Message d'erreur général d'un formulaire */
export function ErreurFormulaire({ children }: { children: ReactNode }) {
  if (!children) return null
  return (
    <p role="alert" className="rounded-[14px] bg-[#fef3f2] px-4 py-3 text-base text-[#912018]">
      {children}
    </p>
  )
}

/** Règle du mot de passe, partagée par l'inscription et la réinitialisation */
export function erreurMotDePasse(m: string): string | null {
  if (m.length < 8) return '8 caractères minimum.'
  if (!/[A-Z]/.test(m)) return 'Ajoutez au moins une majuscule.'
  if (!/[0-9]/.test(m)) return 'Ajoutez au moins un chiffre.'
  if (!/[!@#$%^&*(),.?":{}|<>_\-]/.test(m)) return 'Ajoutez au moins un caractère spécial (! ? @ # …).'
  return null
}

export const emailValide = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())
