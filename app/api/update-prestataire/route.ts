import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { getRegionFromCodePostal } from '@/lib/regions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('loca_session')?.value
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const data = await req.json()

    if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    if (!data.nom || !data.prenom || !data.siret || !data.adresse_siege || !data.ville || !data.code_postal) {
      return NextResponse.json({ error: 'Champs identité manquants' }, { status: 400 })
    }
    if (!data.activite) {
      return NextResponse.json({ error: 'Activité manquante' }, { status: 400 })
    }
    if (!data.telephone || !data.whatsapp) {
      return NextResponse.json({ error: 'Champs contact manquants' }, { status: 400 })
    }

    // Vérifie que la fiche appartient bien à cet utilisateur
    const { data: existing, error: fetchError } = await supabase
      .from('prestataires')
      .select('id')
      .eq('id', data.id)
      .eq('user_id', userId)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Profil introuvable ou non autorisé' }, { status: 403 })
    }

    const { data: prestataire, error } = await supabase
      .from('prestataires')
      .update({
        nom: data.nom,
        prenom: data.prenom,
        siret: data.siret,
        adresse_siege: data.adresse_siege,
        ville: data.ville,
        code_postal: data.code_postal,
        region: getRegionFromCodePostal(data.code_postal),
        activite: data.activite,
        description: data.description || null,
        telephone: data.telephone,
        whatsapp: data.whatsapp,
        tarif_horaire: data.sur_devis ? null : (data.tarif_horaire ? parseFloat(data.tarif_horaire) : null),
        sur_devis: !!data.sur_devis,
        flyer_url: data.flyer_url || null,
        photos: data.photos || [],
      })
      .eq('id', data.id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      console.error('Erreur update prestataire:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    return NextResponse.json({ success: true, prestataire })
  } catch (e) {
    console.error('Erreur update-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}