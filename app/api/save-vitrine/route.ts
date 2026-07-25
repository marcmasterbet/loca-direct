import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)
const ADMIN_EMAIL = 'marc.masterbet@gmail.com'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('loca_session')?.value
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const data = await req.json()

    if (!data.titre || !data.ville || !data.prix_nuit || !data.whatsapp) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 })
    }
    if (!data.photos || data.photos.length === 0) {
      return NextResponse.json({ error: 'Au moins 1 photo est requise' }, { status: 400 })
    }

    const { data: vitrine, error } = await supabase
      .from('vitrines')
      .insert({
        user_id: userId,
        titre: data.titre,
        numero_enregistrement: data.numero_enregistrement || null,
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
        statut: 'en_attente',
      })
      .select()
      .single()

    if (error) {
      console.error('Erreur création vitrine:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    try {
      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: ADMIN_EMAIL,
        subject: `🏠 Nouvelle annonce à valider : ${vitrine.titre}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
            <h1 style="color: #EA580C; font-size: 22px;">🏠 Nouvelle annonce LocaDirect</h1>
            <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
              <strong>${vitrine.titre}</strong><br />
              ${vitrine.ville}${vitrine.region ? `, ${vitrine.region}` : ''} · ${vitrine.pays || 'France'} · ${vitrine.prix_nuit}€/nuit · ${vitrine.type_logement}
            </p>
            <a href="https://loca-direct.fr/admin/dashboard" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
              Voir et valider l'annonce
            </a>
          </div>
        `,
      })
    } catch (e) {
      console.error('Erreur envoi email notification admin:', e)
    }

    return NextResponse.json({ success: true, vitrine })
  } catch (e) {
    console.error('Erreur save-vitrine:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}
