import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_EMAIL = 'marc.masterbet@gmail.com'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('loca_session')?.value
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const data = await req.json()

    if (!data.nom || !data.prenom || !data.siret || !data.ville || !data.telephone || !data.whatsapp) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    const { data: prestataire, error } = await supabase
      .from('prestataires')
      .insert({
        user_id: userId,
        nom: data.nom,
        prenom: data.prenom,
        siret: data.siret,
        adresse_siege: data.adresse_siege,
        ville: data.ville,
        code_postal: data.code_postal,
        activite: data.activite,
        description: data.description,
        telephone: data.telephone,
        whatsapp: data.whatsapp,
        site_web: data.site_web || null,
        tarif_horaire: data.sur_devis ? null : (data.tarif_horaire ? parseFloat(data.tarif_horaire) : null),
        sur_devis: !!data.sur_devis,
        flyer_url: data.flyer_url || null,
        photos: data.photos || [],
        statut: 'en_attente',
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur création prestataire:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    return NextResponse.json({ success: true, prestataire })
  } catch (e) {
    console.error('Erreur save-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}