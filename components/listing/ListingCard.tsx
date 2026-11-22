import Image from 'next/image'
import Link from 'next/link'

export type ListingCardData = {
  id: string
  titre: string | null
  ville: string | null
  prix_nuit: number | null
  photos: string[] | null
  type_logement?: string | null
  statut?: string | null
}

type Props = {
  v: ListingCardData
  badge?: string
  surFond?: boolean
  priorite?: boolean
}

export default function ListingCard({ v, badge, surFond = false, priorite = false }: Props) {
  const photo = v.photos?.[0]
  const titre = v.titre?.trim() || v.type_logement || 'Logement'
  return (
    <Link
      href={`/vitrine/${v.id}`}
      className={`group flex flex-col gap-3 text-ink no-underline ${surFond ? 'rounded-[22px] bg-white p-2.5 pb-4' : ''}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-surface">
        {photo ? (
          <Image
            src={photo}
            alt={titre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priorite}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[13px] text-muted">Photo à venir</div>
        )}
        {badge && (
          <span className="absolute left-3 top-3 rounded-[10px] bg-white px-2.5 py-1.5 text-[13px] font-bold text-brand-strong">
            {badge}
          </span>
        )}
        {v.statut === 'deja_loue' && (
          <span className="absolute bottom-3 left-3 rounded-[10px] bg-white px-2.5 py-1.5 text-[13px] font-semibold text-muted">
            Déjà loué
          </span>
        )}
      </div>
      <div className={`flex items-start justify-between gap-3 ${surFond ? 'px-1.5' : 'px-0.5'}`}>
        <div className="flex min-w-0 flex-col gap-0.5">
          <strong className="truncate text-base font-bold">{titre}</strong>
          <span className="truncate text-sm text-muted">{v.ville}</span>
        </div>
        {v.prix_nuit ? (
          <span className="whitespace-nowrap text-[15px]">
            <strong className="font-extrabold">{Math.round(v.prix_nuit)} €</strong>
            <span className="text-muted"> /nuit</span>
          </span>
        ) : null}
      </div>
    </Link>
  )
}
