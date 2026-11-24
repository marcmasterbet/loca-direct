import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { champsMedias, colonneAbsente } from '@/lib/medias-serveur'
import { getSessionUserId } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId()
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const data = await req.json()
    if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })
    if (!data.titre || !data.ville || !data.prix_nuit || !data.whatsapp) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }

    // Vérifie que la vitrine appartient bien à cet utilisateur
    const { data: existing, error: fetchError } = await supabase
      .from('vitrines')
      .select('id')
      .eq('id', data.id)
      .eq('user_id', userId)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json({ error: 'Annonce introuvable ou non autorisée' }, { status: 403 })
    }

    const champs = {
        titre: data.titre,
        description_courte: data.description_courte,
        description_longue: data.description_longue,
        type_logement: data.type_logement,
        pays: data.pays || 'France',
        region: data.region || null,
        ville: data.ville,
        code_postal: data.code_postal,
        quartier: data.quartier,
        surface: parseInt(data.surface) || null,
        nb_pieces: parseInt(data.nb_pieces) || null,
        nb_chambres: parseInt(data.nb_chambres) || null,
        capacite: parseInt(data.capacite) || null,
        etage: data.etage ? parseInt(data.etage) : null,
        prix_nuit: parseFloat(data.prix_nuit),
        prix_semaine: data.prix_semaine ? parseFloat(data.prix_semaine) : null,
        prix_mois: data.prix_mois ? parseFloat(data.prix_mois) : null,
        caution: data.caution ? parseFloat(data.caution) : null,
        charges_incluses: !!data.charges_incluses,
        taxe_sejour: !!data.taxe_sejour,
        menage_inclus: !!data.menage_inclus,
        disponible_du: data.disponible_du || null,
        type_location: data.type_location,
        duree_min: data.duree_min,
        equipements: data.equipements || [],
        regles: {
          texte: data.regles,
          animaux: data.animaux,
          fumeurs: data.fumeurs,
          fetes: data.fetes,
          enfants: data.enfants,
          heure_arrivee: data.heure_arrivee,
          heure_depart: data.heure_depart,
        },
        whatsapp: data.whatsapp,
        site_web: data.site_web || null,
        photos: data.photos,
        // Seulement si le formulaire l'envoie : une ancienne version du formulaire ne l'efface pas
        ...('numero_enregistrement' in data ? { numero_enregistrement: data.numero_enregistrement || null } : {}),
      }
    const envoyer = (valeurs: Record<string, unknown>) =>
      supabase
        .from('vitrines')
        .update(valeurs)
        .eq('id', data.id)
        .eq('user_id', userId)
        .select()
        .single()
    let { data: vitrine, error } = await envoyer({ ...champs, ...champsMedias(data) })
    // Tant que les colonnes vidéo / visite 3D n'existent pas en base, on enregistre le reste
    if (colonneAbsente(error)) ({ data: vitrine, error } = await envoyer(champs))

    if (error) {
      console.error('Erreur update vitrine:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    return NextResponse.json({ success: true, vitrine })
  } catch (e) {
    console.error('Erreur update-vitrine:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}