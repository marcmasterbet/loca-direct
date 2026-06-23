import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { getRegionFromCodePostal } from '@/lib/regions'
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

    if (!data.nom || !data.prenom || !data.siret || !data.adresse_siege || !data.ville || !data.code_postal) {
      return NextResponse.json({ error: 'Champs identité manquants' }, { status: 400 })
    }
    if (!data.activite) {
      return NextResponse.json({ error: 'Activité manquante' }, { status: 400 })
    }
    if (!data.telephone || !data.whatsapp) {
      return NextResponse.json({ error: 'Champs contact manquants' }, { status: 400 })
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
        region: getRegionFromCodePostal(data.code_postal),
        activite: data.activite,
        description: data.description || null,
        telephone: data.telephone,
        whatsapp: data.whatsapp,
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

    // Notification email à l'admin — ne bloque jamais la réponse si ça échoue
    try {
      await resend.emails.send({
        from: 'LocaDirect <bienvenue@loca-direct.fr>',
        to: ADMIN_EMAIL,
        subject: `🛠️ Nouveau prestataire à valider : ${prestataire.prenom} ${prestataire.nom}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
            <h1 style="color: #EA580C; font-size: 22px;">🛠️ Nouveau prestataire LocaDirect</h1>
            <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
              <strong>${prestataire.prenom} ${prestataire.nom}</strong><br />
              ${prestataire.activite} · ${prestataire.ville}${prestataire.region ? ` (${prestataire.region})` : ''}<br />
              SIRET : ${prestataire.siret}
            </p>
            <a href="https://loca-direct.fr/admin/prestataires" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
              Voir et valider le profil
            </a>
          </div>
        `,
      })
    } catch (e) {
      console.error('Erreur envoi email notification admin:', e)
    }

    return NextResponse.json({ success: true, prestataire })
  } catch (e) {
    console.error('Erreur save-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}