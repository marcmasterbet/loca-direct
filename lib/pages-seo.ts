// Données partagées des pages « chien accepté par région » et « département ».

import { createClient } from '@supabase/supabase-js'
import { STATUTS_VISIBLES } from '@/lib/seo'
import { accepteGrandChien } from '@/lib/france'
import { departementDuCodePostal, type Departement } from '@/lib/departements'
import type { Logement } from '@/app/logements/LogementsClient'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const COLONNES =
  'id, titre, ville, code_postal, pays, region, type_logement, prix_nuit, capacite, nb_chambres, statut, photos, equipements, created_at'

type AvecCp = Logement & { code_postal?: string | null }

async function logementsRegion(region: string): Promise<AvecCp[]> {
  const { data } = await supabase
    .from('vitrines')
    .select(COLONNES)
    .in('statut', STATUTS_VISIBLES)
    .eq('region', region)
    .order('created_at', { ascending: false })
  return (data || []) as AvecCp[]
}

/** Logements d'une région où les chiens de plus de 10 kg sont acceptés. */
export async function logementsChienRegion(region: string): Promise<Logement[]> {
  return (await logementsRegion(region)).filter(v => accepteGrandChien(v.equipements))
}

/** Logements d'un département, retrouvés par le code postal. */
export async function logementsDepartement(d: Departement): Promise<Logement[]> {
  return (await logementsRegion(d.region)).filter(v => departementDuCodePostal(v.code_postal)?.code === d.code)
}

/** Départements d'une liste d'annonces, avec leur nombre, du plus fourni au moins fourni. */
export function departementsPresents(liste: { code_postal?: string | null }[]) {
  const compte = new Map<string, { d: Departement; nombre: number }>()
  for (const v of liste) {
    const d = departementDuCodePostal(v.code_postal)
    if (!d) continue
    const ex = compte.get(d.code)
    if (ex) ex.nombre += 1
    else compte.set(d.code, { d, nombre: 1 })
  }
  return [...compte.values()].sort((a, b) => b.nombre - a.nombre || a.d.nom.localeCompare(b.d.nom, 'fr'))
}
