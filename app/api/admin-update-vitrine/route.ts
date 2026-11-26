import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { emailACorriger, emailAnnonceEnLigne, EXPEDITEUR, REPONDRE_A } from '@/lib/emails'
import { isAdmin } from '@/lib/session'
import { signalerPages } from '@/lib/indexnow'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const adminOk = await isAdmin()
  if (!adminOk) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const data = await req.json()
  if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

  // Récupère l'état actuel AVANT modification
  const { data: vitrineAvant } = await supabase
    .from('vitrines')
    .select('statut, titre, ville, user_id, directloca_users(email)')
    .eq('id', data.id)
    .single()

  // Construit l'objet update dynamiquement — ne touche jamais au champ regles
  const update: Record<string, unknown> = {}
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

  // Refus avec motif : l'annonceur reçoit ce qu'il faut corriger
  if (data.motif_refus && vitrineAvant?.statut === 'en_attente' && data.statut !== 'active') {
    const userEmail = (vitrineAvant as { directloca_users?: { email?: string } } | null)?.directloca_users?.email
    if (userEmail) {
      try {
        const { subject, html } = emailACorriger('annonce', String(vitrineAvant.titre || 'Votre logement'), String(data.motif_refus), `https://www.loca-direct.fr/espace/ma-vitrine/${encodeURIComponent(data.id)}/modifier`)
        await resend.emails.send({ from: EXPEDITEUR, replyTo: REPONDRE_A, to: userEmail, subject, html })
      } catch (e) {
        console.error('Erreur e-mail à corriger:', e)
      }
    }
  }

  // Email de confirmation uniquement lors du passage en_attente → active
  if (data.statut === 'active' && vitrineAvant?.statut === 'en_attente') {
    await signalerPages([`/vitrine/${data.id}`])
    const userEmail = (vitrineAvant as { directloca_users?: { email?: string } } | null)?.directloca_users?.email
    if (userEmail) {
      try {
        const { subject, html } = emailAnnonceEnLigne({ id: data.id, titre: vitrineAvant.titre, ville: vitrineAvant.ville })
        await resend.emails.send({ from: EXPEDITEUR, replyTo: REPONDRE_A, to: userEmail, subject, html })
      } catch (e) {
        console.error('Erreur envoi email confirmation vitrine:', e)
      }
    }
  }

  return NextResponse.json({ success: true })
}
