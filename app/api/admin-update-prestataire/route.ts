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

    const { id, statut, motif_refus } = await req.json()
    if (!id || !statut) return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })

    // Récupère l'état actuel AVANT modification, pour savoir si c'est une première validation
    const { data: prestataireAvant } = await supabase
      .from('prestataires')
      .select('statut, nom, prenom, activite, user_id, directloca_users(email)')
      .eq('id', id)
      .single()

    const updateData: any = { statut }
    if (motif_refus !== undefined) updateData.motif_refus = motif_refus

    const { error } = await supabase
      .from('prestataires')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('Erreur update prestataire:', error)
      return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
    }

    // Email de confirmation : uniquement lors du passage en_attente → active (première validation)
    if (statut === 'active' && prestataireAvant?.statut === 'en_attente') {
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
                <a href="https://loca-direct.fr/prestataires/${id}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
                  Voir mon profil en ligne
                </a>
                <p style="font-size: 13px; color: #6B7280;">
                  N'hésitez pas à le partager sur vos réseaux pour augmenter votre visibilité !
                </p>
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