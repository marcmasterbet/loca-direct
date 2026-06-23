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
  const cookieStore = await cookies()
  const isAdmin = cookieStore.get('admin_session')?.value
  if (!isAdmin) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id, statut, motif_refus } = await req.json()

  // Récupère l'état actuel AVANT modification, pour savoir si c'est une première validation
  const { data: vitrineAvant } = await supabase
    .from('vitrines')
    .select('statut, titre, ville, user_id, directloca_users(email)')
    .eq('id', id)
    .single()

  const updateData: any = { statut, updated_at: new Date().toISOString() }
  if (motif_refus) updateData.motif_refus = motif_refus

  const { error } = await supabase
    .from('vitrines')
    .update(updateData)
    .eq('id', id)

  if (error) {
    console.error('Erreur update vitrine:', error)
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }

  // Email de confirmation : uniquement lors du passage en_attente → active (première validation)
  if (statut === 'active' && vitrineAvant?.statut === 'en_attente') {
    const userEmail = (vitrineAvant as any)?.directloca_users?.email
    if (userEmail) {
      try {
        await resend.emails.send({
          from: 'LocaDirect <bienvenue@loca-direct.fr>',
          to: userEmail,
          subject: `✅ Votre annonce "${vitrineAvant.titre}" est en ligne !`,
          html: `
            <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 20px;">
              <h1 style="color: #EA580C; font-size: 22px;">🏠 LocaDirect</h1>
              <p style="font-size: 15px; color: #1F2937; line-height: 1.6;">
                Bonne nouvelle ! Votre annonce <strong>"${vitrineAvant.titre}"</strong> à ${vitrineAvant.ville} a été vérifiée et est maintenant visible par tous les voyageurs.
              </p>
              <a href="https://loca-direct.fr/vitrine/${id}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
                Voir mon annonce en ligne
              </a>
              <p style="font-size: 13px; color: #6B7280;">
                N'hésitez pas à la partager sur vos réseaux pour augmenter sa visibilité !
              </p>
            </div>
          `,
        })
      } catch (e) {
        console.error('Erreur envoi email confirmation vitrine:', e)
      }
    }
  }

  return NextResponse.json({ success: true })
}