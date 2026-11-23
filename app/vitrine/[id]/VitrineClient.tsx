'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { trackEvent } from '@/lib/analytics'
import PhotoLightbox from '@/components/PhotoLightbox'
import SiteHeader from '@/components/site/SiteHeader'
import ListingCard, { type ListingCardData } from '@/components/listing/ListingCard'

const MiniCarte = dynamic(() => import('@/components/listing/MiniCarte'), {
  ssr: false,
  loading: () => <div className="h-[280px] w-full rounded-[22px] bg-surface sm:h-[340px]" />,
})

export type Voisin = ListingCardData & { equipements?: string[] | null }

const EQUIPEMENTS: Record<string, string> = {
  chien_10kg: 'Chiens de plus de 10 kg acceptés',
  animaux: 'Animaux acceptés',
  wifi: 'Wifi',
  parking: 'Parking',
  piscine_priv: 'Piscine privée',
  piscine: 'Piscine',
  piscine_spa: 'Spa ou jacuzzi',
  jardin: 'Jardin ou terrasse',
  barbecue: 'Barbecue',
  cuisine_ext: 'Cuisine extérieure',
  cuisine: 'Cuisine équipée',
  lave_linge: 'Lave-linge',
  seche_linge: 'Sèche-linge',
  clim: 'Climatisation',
  chauffage: 'Chauffage',
  tv: 'Télévision',
  baignoire: 'Baignoire',
  douche: 'Douche',
  vue_mer: 'Vue mer',
  vue_montagne: 'Vue montagne',
  vue_ville: 'Vue ville',
  ascenseur: 'Ascenseur',
  digicode: 'Arrivée autonome',
  handicap: 'Accessible en fauteuil roulant',
  sport: 'Salle de sport',
  fumeurs: 'Fumeurs acceptés',
}

const STATUTS: Record<string, { label: string; classe: string }> = {
  active: { label: 'Disponible', classe: 'bg-mint text-mint-ink' },
  deja_loue: { label: 'Déjà loué', classe: 'bg-surface text-ink-soft' },
  bientot_dispo: { label: 'Bientôt disponible', classe: 'bg-brand-soft text-brand-strong' },
}

const NB_EQUIPEMENTS_VISIBLES = 10

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  vitrine: any
  isLoggedIn: boolean
  centre: [number, number] | null
  fil: { nom: string; href: string }[]
  voisins: Voisin[]
}

function euros(v: unknown) {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? `${Math.round(n)} €` : null
}

function texte(v: unknown) {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  return s ? s : null
}

export default function VitrineClient({ vitrine, isLoggedIn, centre, fil, voisins }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [photoMobile, setPhotoMobile] = useState(0)
  const [tousEquipements, setTousEquipements] = useState(false)

  const photos: string[] = (vitrine.photos || []).filter(Boolean)
  const equipements: string[] = (vitrine.equipements || []).filter((e: string) => EQUIPEMENTS[e])
  // Le chien en premier, il a sa propre mise en avant
  equipements.sort((a, b) => (a === 'chien_10kg' ? -1 : b === 'chien_10kg' ? 1 : 0))
  const chien = equipements.includes('chien_10kg')
  const titre = texte(vitrine.titre) || vitrine.type_logement || 'Logement'

  const regles =
    typeof vitrine.regles === 'object' && vitrine.regles !== null && !Array.isArray(vitrine.regles) ? vitrine.regles : {}
  const reglesTexte = typeof vitrine.regles === 'string' ? texte(vitrine.regles) : texte(regles.texte)

  const statut = STATUTS[vitrine.statut] || STATUTS.active
  const peutContacter = vitrine.statut === 'active' && vitrine.a_whatsapp

  const siteWebUrl = vitrine.site_web
    ? vitrine.site_web.startsWith('http')
      ? vitrine.site_web
      : `https://${vitrine.site_web}`
    : null

  const faits = [
    vitrine.capacite && { valeur: vitrine.capacite, label: Number(vitrine.capacite) > 1 ? 'voyageurs' : 'voyageur' },
    vitrine.nb_chambres && { valeur: vitrine.nb_chambres, label: Number(vitrine.nb_chambres) > 1 ? 'chambres' : 'chambre' },
    vitrine.nb_pieces && { valeur: vitrine.nb_pieces, label: Number(vitrine.nb_pieces) > 1 ? 'pièces' : 'pièce' },
    vitrine.surface && { valeur: `${vitrine.surface} m²`, label: 'surface' },
  ].filter(Boolean) as { valeur: string | number; label: string }[]

  const bonASavoir = [
    ['Arrivée', texte(regles.heure_arrivee)],
    ['Départ', texte(regles.heure_depart)],
    ['Durée minimum', texte(vitrine.duree_min)],
    ['Caution', euros(vitrine.caution)],
    ['Ménage', vitrine.menage_inclus ? 'Inclus' : null],
    ['Charges', vitrine.charges_incluses ? 'Incluses' : null],
    ['Taxe de séjour', vitrine.taxe_sejour ? 'Incluse' : null],
    ['Animaux', texte(regles.animaux)],
    ['Enfants', texte(regles.enfants)],
    ['Fumeurs', texte(regles.fumeurs)],
    ['Fêtes', texte(regles.fetes)],
  ].filter(([, v]) => v) as [string, string][]

  const prix = euros(vitrine.prix_nuit)

  const contact = (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        {prix ? (
          <p className="text-[15px] text-ink-soft">
            <strong className="text-[32px] font-extrabold tracking-[-0.03em] text-ink">{prix}</strong> la nuit
          </p>
        ) : (
          <p className="text-[15px] text-ink-soft">Prix à voir avec le propriétaire</p>
        )}
        <span className={`rounded-full px-3 py-1.5 text-[13px] font-bold ${statut.classe}`}>{statut.label}</span>
      </div>
      {(euros(vitrine.prix_semaine) || euros(vitrine.prix_mois)) && (
        <div className="flex gap-4 text-sm text-ink-soft">
          {euros(vitrine.prix_semaine) && <span>{euros(vitrine.prix_semaine)} la semaine</span>}
          {euros(vitrine.prix_mois) && <span>{euros(vitrine.prix_mois)} le mois</span>}
        </div>
      )}

      {!peutContacter ? (
        <p className="rounded-2xl bg-surface p-4 text-sm leading-relaxed text-ink-soft">
          {vitrine.statut === 'deja_loue'
            ? 'Ce logement est déjà loué pour le moment. Regardez les autres logements de la région, plus bas.'
            : vitrine.statut === 'bientot_dispo'
              ? 'Ce logement sera bientôt disponible. Revenez dans quelques jours pour contacter le propriétaire.'
              : 'Le propriétaire n\'a pas encore indiqué de numéro WhatsApp.'}
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          <a
            href={`/api/whatsapp?logement=${vitrine.id}`}
            target="_blank"
            rel="nofollow noreferrer"
            onClick={() => trackEvent('clic_whatsapp_logement', { logement_id: vitrine.id, ville: vitrine.ville })}
            className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 text-[17px] font-bold text-white no-underline hover:bg-[#1ebe5b]"
          >
            <IconeWhatsapp />
            Écrire au propriétaire
          </a>
          {siteWebUrl && (
            <a
              href={siteWebUrl}
              target="_blank"
              rel="noreferrer"
              className="flex min-h-[48px] items-center justify-center rounded-2xl px-5 text-[15px] font-bold text-brand no-underline shadow-[inset_0_0_0_1.5px_#c9bffb] hover:bg-brand-soft"
            >
              Voir le site du propriétaire
            </a>
          )}
        </div>
      )}

      <p className="border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
        0 € de commission : vous réglez le séjour directement avec le propriétaire.
      </p>
    </div>
  )

  return (
    <div className="bg-white pb-24 text-ink lg:pb-0">
      <SiteHeader isLoggedIn={isLoggedIn} current="logements" />

      <main className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 pb-16 sm:px-8">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="text-muted no-underline hover:text-ink">
                Accueil
              </Link>
            </li>
            {fil.map(f => (
              <li key={f.href} className="flex items-center gap-2">
                <span aria-hidden>›</span>
                <Link href={f.href} className="text-muted no-underline hover:text-ink">
                  {f.nom}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Titre */}
        <div className="flex flex-col gap-3">
          <h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-[42px]">{titre}</h1>
          <div className="flex flex-wrap items-center gap-2 text-[15px] text-ink-soft">
            <span>
              {[vitrine.type_logement, vitrine.ville, vitrine.quartier].filter(Boolean).join(', ')}
            </span>
            {chien && (
              <span className="rounded-full bg-dog px-3 py-1 text-[13px] font-bold text-ink">Chien accepté</span>
            )}
          </div>
        </div>

        {/* Photos */}
        {photos.length > 0 ? (
          <>
            {/* Téléphone : on fait défiler du doigt */}
            <div className="relative -mx-5 sm:hidden">
              <div
                className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
                onScroll={e => {
                  const el = e.currentTarget
                  setPhotoMobile(Math.round(el.scrollLeft / el.clientWidth))
                }}
              >
                {photos.map((p, i) => (
                  <button
                    key={p + i}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    className="relative aspect-[4/3] w-full shrink-0 snap-center bg-surface"
                    aria-label={`Agrandir la photo ${i + 1}`}
                  >
                    <Image src={p} alt={`${titre}, photo ${i + 1}`} fill sizes="100vw" priority={i === 0} className="object-cover" />
                  </button>
                ))}
              </div>
              {photos.length > 1 && (
                <span className="absolute bottom-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-[13px] font-bold text-white">
                  {photoMobile + 1} / {photos.length}
                </span>
              )}
            </div>

            {/* Ordinateur : une grande photo et quatre petites */}
            <div
              className={`relative hidden gap-2 overflow-hidden rounded-[26px] sm:grid ${
                photos.length >= 5 ? 'h-[460px] grid-cols-4 grid-rows-2' : photos.length >= 2 ? 'h-[420px] grid-cols-3' : 'h-[480px] grid-cols-1'
              }`}
            >
              {photos.slice(0, photos.length >= 5 ? 5 : photos.length >= 2 ? 3 : 1).map((p, i) => (
                <button
                  key={p + i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Agrandir la photo ${i + 1}`}
                  className={`group relative bg-surface ${
                    i === 0 ? (photos.length >= 5 ? 'col-span-2 row-span-2' : photos.length >= 2 ? 'col-span-2' : '') : ''
                  }`}
                >
                  <Image
                    src={p}
                    alt={`${titre}, photo ${i + 1}`}
                    fill
                    sizes={i === 0 ? '(max-width: 1180px) 66vw, 780px' : '(max-width: 1180px) 33vw, 390px'}
                    priority={i === 0}
                    className="object-cover transition-opacity group-hover:opacity-90"
                  />
                </button>
              ))}
              {photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(0)}
                  className="absolute bottom-4 right-4 rounded-[12px] bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-[0_6px_20px_rgba(23,22,42,0.2)] hover:text-brand"
                >
                  Voir les {photos.length} photos
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex h-[220px] items-center justify-center rounded-[26px] bg-surface text-muted">
            Le propriétaire n&apos;a pas encore ajouté de photo.
          </div>
        )}

        <div className="grid gap-12 pt-4 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="flex flex-col gap-10">
            {faits.length > 0 && (
              <dl className="flex flex-wrap gap-x-10 gap-y-4 border-b border-line pb-8">
                {faits.map(f => (
                  <div key={f.label} className="flex flex-col">
                    <dt className="order-2 text-sm text-muted">{f.label}</dt>
                    <dd className="text-[26px] font-extrabold tracking-[-0.03em]">{f.valeur}</dd>
                  </div>
                ))}
              </dl>
            )}

            {chien && (
              <div className="flex flex-col gap-1 rounded-[22px] bg-dog p-6">
                <strong className="text-lg">Votre chien est le bienvenu</strong>
                <p className="text-[15px] leading-relaxed text-ink-soft">
                  Le propriétaire accepte les chiens, y compris ceux de plus de 10 kg. Précisez sa taille et sa race dans
                  votre premier message.{' '}
                  <Link href="/logements/chiens" className="font-semibold text-ink">
                    Voir tous les logements où le chien est accepté
                  </Link>
                </p>
              </div>
            )}

            {(texte(vitrine.description_courte) || texte(vitrine.description_longue)) && (
              <section className="flex flex-col gap-4">
                <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">Le logement</h2>
                {texte(vitrine.description_courte) && (
                  <p className="text-lg leading-relaxed text-ink">{vitrine.description_courte}</p>
                )}
                {texte(vitrine.description_longue) && (
                  <p className="max-w-[68ch] whitespace-pre-line text-base leading-[1.75] text-ink-soft">
                    {vitrine.description_longue}
                  </p>
                )}
              </section>
            )}

            {equipements.length > 0 && (
              <section className="flex flex-col gap-4">
                <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">Équipements</h2>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {(tousEquipements ? equipements : equipements.slice(0, NB_EQUIPEMENTS_VISIBLES)).map(e => (
                    <li key={e} className="flex items-center gap-3 text-[15px]">
                      <span
                        aria-hidden
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${e === 'chien_10kg' ? 'bg-[#ffcf4d]' : 'bg-brand-soft'}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6.2 5 8.5l4.5-5" stroke={e === 'chien_10kg' ? '#17162a' : '#5534e8'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className={e === 'chien_10kg' ? 'font-bold' : ''}>{EQUIPEMENTS[e]}</span>
                    </li>
                  ))}
                </ul>
                {equipements.length > NB_EQUIPEMENTS_VISIBLES && (
                  <button
                    type="button"
                    onClick={() => setTousEquipements(v => !v)}
                    className="self-start rounded-[12px] px-4 py-2.5 text-sm font-bold text-ink shadow-[inset_0_0_0_1.5px_#e4e3ee] hover:shadow-[inset_0_0_0_1.5px_#17162a]"
                  >
                    {tousEquipements ? 'Afficher moins' : `Voir les ${equipements.length} équipements`}
                  </button>
                )}
              </section>
            )}

            {(bonASavoir.length > 0 || reglesTexte) && (
              <section className="flex flex-col gap-4">
                <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">Bon à savoir</h2>
                {bonASavoir.length > 0 && (
                  <dl className="grid gap-x-8 sm:grid-cols-2">
                    {bonASavoir.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4 border-b border-line py-3 text-[15px]">
                        <dt className="text-ink-soft">{k}</dt>
                        <dd className="text-right font-semibold">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {reglesTexte && (
                  <p className="max-w-[68ch] whitespace-pre-line text-[15px] leading-relaxed text-ink-soft">{reglesTexte}</p>
                )}
              </section>
            )}

            {centre && (
              <section className="flex flex-col gap-4">
                <h2 className="text-[22px] font-extrabold tracking-[-0.02em]">Où se trouve le logement</h2>
                <MiniCarte centre={centre} ville={vitrine.ville} />
                <p className="text-sm text-muted">
                  {vitrine.ville}
                  {vitrine.code_postal ? ` (${vitrine.code_postal})` : ''}. Le propriétaire vous donnera l&apos;adresse exacte.
                </p>
              </section>
            )}

            {texte(vitrine.numero_enregistrement) && (
              <p className="text-[13px] text-muted">Numéro d&apos;enregistrement en mairie : {vitrine.numero_enregistrement}</p>
            )}
          </div>

          {/* Contact, toujours visible sur ordinateur */}
          <aside id="contact" className="scroll-mt-6">
            <div className="flex flex-col gap-3 lg:sticky lg:top-6">
              <div className="rounded-[26px] bg-white p-6 shadow-[0_0_0_1px_#e4e3ee,0_24px_60px_-30px_rgba(23,22,42,0.35)]">
                {contact}
              </div>
              <a
                href={`mailto:bienvenue@loca-direct.fr?subject=${encodeURIComponent(`Signalement de l'annonce ${vitrine.id}`)}`}
                className="text-center text-[13px] text-muted no-underline hover:text-ink hover:underline"
              >
                Signaler cette annonce
              </a>
            </div>
          </aside>
        </div>

        {voisins.length > 0 && (
          <section className="flex flex-col gap-6 border-t border-line pt-12">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[26px] font-extrabold tracking-[-0.03em]">Autres logements en {vitrine.region}</h2>
              {fil[1] && (
                <Link href={fil[1].href} className="text-[15px] font-bold text-brand no-underline hover:underline">
                  Tous les logements en {vitrine.region}
                </Link>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {voisins.map(v => (
                <ListingCard
                  key={v.id}
                  v={v}
                  badge={Array.isArray(v.equipements) && v.equipements.includes('chien_10kg') ? 'Chien accepté' : undefined}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Barre de contact en bas de l'écran sur téléphone */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-line bg-white/95 px-5 py-3 backdrop-blur lg:hidden">
        <p className="text-sm text-ink-soft">
          {prix ? (
            <>
              <strong className="text-xl font-extrabold text-ink">{prix}</strong> la nuit
            </>
          ) : (
            vitrine.ville
          )}
        </p>
        {peutContacter ? (
          <a
            href={`/api/whatsapp?logement=${vitrine.id}`}
            target="_blank"
            rel="nofollow noreferrer"
            onClick={() => trackEvent('clic_whatsapp_logement', { logement_id: vitrine.id, ville: vitrine.ville, endroit: 'barre_mobile' })}
            className="flex min-h-[48px] items-center gap-2 rounded-2xl bg-[#25D366] px-5 text-[15px] font-bold text-white no-underline"
          >
            <IconeWhatsapp />
            Écrire au propriétaire
          </a>
        ) : (
          <a href="#contact" className="flex min-h-[48px] items-center rounded-2xl bg-brand px-5 text-[15px] font-bold text-white no-underline">
            Voir les détails
          </a>
        )}
      </div>

      {lightboxIndex !== null && (
        <PhotoLightbox photos={photos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  )
}

function IconeWhatsapp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.23 3.7 8.23 8.24 0 4.55-3.7 8.24-8.23 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}
