type Props = { size?: number; withName?: boolean; className?: string }

/** Symbole LocaDirect : un repère de carte qui contient une bulle de discussion. */
export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#5534e8" />
      <path d="M20 9c-5.5 0-9.5 4-9.5 9.2 0 6.6 9.5 13.8 9.5 13.8s9.5-7.2 9.5-13.8C29.5 13 25.5 9 20 9z" fill="#ffffff" />
      <path
        d="M15.5 17.5a2 2 0 0 1 2-2h5a2 2 0 0 1 2 2v2.6a2 2 0 0 1-2 2h-3.2l-2.3 1.8v-1.9a2 2 0 0 1-1.5-1.9z"
        fill="#5534e8"
      />
    </svg>
  )
}

export default function Logo({ size = 40, withName = true, className = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withName && <span className="text-[22px] font-extrabold tracking-[-0.04em] text-ink">locadirect</span>}
    </span>
  )
}
