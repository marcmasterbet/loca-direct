import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const isAdmin = cookieStore.get('admin_session')?.value
    if (!isAdmin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const data = await req.json()
    if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

    // Récupère l'état actuel AVANT modification
    const { data: prestataireAvant } = await supabase
      .from('prestataires')
      .select('statut, nom, prenom, activite, user_id, directloca_users(email)')
      .eq('id', data.id)
      .single()

    // Construit l'objet update dynamiquement
    const update: any = {}
    if (data.statut !== undefined) update.statut = data.statut
    if (data.motif_refus !== undefined) update.motif_refus = data.motif_refus
    if (data.nom !== undefined) update.nom = data.nom
    if (data.prenom !== undefined) update.prenom = data.prenom
    if (data.siret !== undefined) update.siret = data.siret
    if (data.adresse_siege !== undefined) update.adresse_siege = data.adresse_siege
    if (data.ville !== undefined) update.ville = data.ville
    if (data.code_postal !== undefined) update.code_postal = data.code_postal
    if (data.region !== undefined) update.region = data.region
    if (data.activite !== undefined) update.activite = data.activite
    if (data.description !== undefined) update.description = data.description
    if (data.telephone !== undefined) update.telephone = data.telephone
    if (data.whatsapp !== undefined) update.whatsapp = data.whatsapp
    if (data.site_web !== undefined) update.site_web = data.site_web || null
    if (data.tarif_horaire !== undefined) update.tarif_horaire = data.tarif_horaire ? parseFloat(data.tarif_horaire) : null
    if (data.sur_devis !== undefined) update.sur_devis = !!data.sur_devis
    if (data.flyer_url !== undefined) update.flyer_url = data.flyer_url || null
    if (data.photos !== undefined) update.photos = data.photos

    const { error } = await supabase
      .from('prestataires')
      .update(update)
      .eq('id', data.id)

    if (error) {
      console.error('Erreur update prestataire:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    // Email de confirmation uniquement lors du passage en_attente → active
    if (data.statut === 'active' && prestataireAvant?.statut === 'en_attente') {
      const userEmail = (prestataireAvant as any)?.directloca_users?.email
      if (userEmail) {
        try {
          await resend.emails.send({
            from: 'LocaDirect <bienvenue@loca-direct.fr>',
            to: userEmail,
            subject: `✅ Votre profil prestataire est en ligne !`,
            html: `
              <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
                <h1 style="color: #EA580C; font-size: 22px;">🛠️ LocaDirect</h1>
                <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
                  Bonne nouvelle ! Votre profil <strong>${prestataireAvant.prenom} ${prestataireAvant.nom}</strong> (${prestataireAvant.activite}) a été vérifié et figure maintenant dans l'annuaire des prestataires LocaDirect.
                </p>
                <a href="https://loca-direct.fr/prestataires/${data.id}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
                  Voir mon profil en ligne
                </a>
                <p style="font-size: 13px; color: #6B7280;">N'hésitez pas à le partager sur vos réseaux pour augmenter votre visibilité !</p>
              </div>
            `,
          })
        } catch (e) {
          console.error('Erreur envoi email confirmation prestataire:', e)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Erreur admin-update-prestataire:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}