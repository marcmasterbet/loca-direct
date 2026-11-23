import Image from 'next/image'
import Link from 'next/link'
import { estImage, metierParNom, nomAffiche, type PrestatairePublic } from '@/lib/prestataires'

function initiales(p: PrestatairePublic) {
  return [p.prenom, p.nom]
    .filter(Boolean)
    .map(x => x!.trim()[0]?.toUpperCase())
    .join('')
    .slice(0, 2)
}

export function tarif(p: Pick<PrestatairePublic, 'tarif_horaire' | 'sur_devis'>) {
  if (p.sur_devis) return 'Sur devis'
  const n = Number(p.tarif_horaire)
  return Number.isFinite(n) && n > 0 ? `${Math.round(n)} € de l’heure` : null
}

export default function PrestataireCard({ p, priorite = false }: { p: PrestatairePublic; priorite?: boolean }) {
  const image = [p.flyer_url, ...(p.photos || [])].find(estImage)
  const metier = metierParNom(p.activite)
  const prix = tarif(p)
  return (
    <Link href={`/prestataires/${p.id}`} className="group flex min-w-0 flex-col gap-3 text-ink no-underline">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-brand-soft">
        {image ? (
          <Image
            src={image}
            alt={`${nomAffiche(p)}, ${metier?.court ?? p.activite ?? 'prestataire'}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={priorite}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-brand" aria-hidden="true">
            {initiales(p)}
          </div>
        )}
        {metier && (
          <span className="absolute left-3 top-3 rounded-[10px] bg-white px-2.5 py-1.5 text-sm font-bold text-brand-strong">
            {metier.court}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-0.5 px-0.5">
        <strong className="truncate text-base font-bold">{nomAffiche(p)}</strong>
        <span className="truncate text-sm text-muted">
          {[p.ville, prix].filter(Boolean).join(' · ')}
        </span>
      </div>
    </Link>
  )
}
