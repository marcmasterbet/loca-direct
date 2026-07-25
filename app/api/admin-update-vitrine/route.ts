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

  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

  // Récupère l'état actuel AVANT modification
  const { data: vitrineAvant } = await supabase
    .from('vitrines')
    .select('statut, titre, ville, user_id, directloca_users(email)')
    .eq('id', data.id)
    .single()

  // Construit l'objet update dynamiquement — ne touche jamais au champ regles
  const update: any = {}
  if (data.statut !== undefined) update.statut = data.statut
  if (data.motif_refus !== undefined) update.motif_refus = data.motif_refus
  if (data.titre !== undefined) update.titre = data.titre
  if (data.ville !== undefined) update.ville = data.ville
  if (data.pays !== undefined) update.pays = data.pays
  if (data.region !== undefined) update.region = data.region
  if (data.prix_nuit !== undefined) update.prix_nuit = parseFloat(data.prix_nuit)
  if (data.prix_semaine !== undefined) update.prix_semaine = data.prix_semaine ? parseFloat(data.prix_semaine) : null
  if (data.prix_mois !== undefined) update.prix_mois = data.prix_mois ? parseFloat(data.prix_mois) : null
  if (data.description_courte !== undefined) update.description_courte = data.description_courte
  if (data.description_longue !== undefined) update.description_longue = data.description_longue
  if (data.whatsapp !== undefined) update.whatsapp = data.whatsapp
  if (data.photos !== undefined) update.photos = data.photos
  if (data.type_logement !== undefined) update.type_logement = data.type_logement
  if (data.code_postal !== undefined) update.code_postal = data.code_postal
  if (data.quartier !== undefined) update.quartier = data.quartier
  if (data.surface !== undefined) update.surface = parseInt(data.surface) || null
  if (data.nb_pieces !== undefined) update.nb_pieces = parseInt(data.nb_pieces) || null
  if (data.nb_chambres !== undefined) update.nb_chambres = parseInt(data.nb_chambres) || null
  if (data.capacite !== undefined) update.capacite = parseInt(data.capacite) || null
  if (data.equipements !== undefined) update.equipements = data.equipements
  update.updated_at = new Date().toISOString()

  const { error } = await supabase
    .from('vitrines')
    .update(update)
    .eq('id', data.id)

  if (error) {
    console.error('Erreur admin-update-vitrine:', error)
    return NextResponse.json({ error: 'Erreur' }, { status: 500 })
  }

  // Email de confirmation uniquement lors du passage en_attente → active
  if (data.statut === 'active' && vitrineAvant?.statut === 'en_attente') {
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
              <a href="https://loca-direct.fr/vitrine/${data.id}" style="display: inline-block; background: #EA580C; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; margin: 20px 0;">
                Voir mon annonce en ligne
              </a>
              <p style="font-size: 13px; color: #6B7280;">N'hésitez pas à la partager sur vos réseaux pour augmenter sa visibilité !</p>
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
