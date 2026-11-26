import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { emailACorriger, emailFicheEnLigne, EXPEDITEUR, REPONDRE_A } from '@/lib/emails'
import { isAdmin } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const adminOk = await isAdmin()
    if (!adminOk) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const data = await req.json()
    if (!data.id) return NextResponse.json({ error: 'ID manquant' }, { status: 400 })

    // Récupère l'état actuel AVANT modification
    const { data: prestataireAvant } = await supabase
      .from('prestataires')
      .select('statut, nom, prenom, activite, user_id, directloca_users(email)')
      .eq('id', data.id)
      .single()

    // Construit l'objet update dynamiquement
    const update: Record<string, unknown> = {}
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

    // Refus avec motif : l'annonceur reçoit ce qu'il faut corriger
    if (data.motif_refus && prestataireAvant?.statut === 'en_attente' && data.statut !== 'active') {
      const userEmail = (prestataireAvant as { directloca_users?: { email?: string } } | null)?.directloca_users?.email
      if (userEmail) {
        try {
          const { subject, html } = emailACorriger('fiche', [prestataireAvant.prenom, prestataireAvant.nom].filter(Boolean).join(' ') || 'Votre fiche', String(data.motif_refus), `https://www.loca-direct.fr/espace/devenir-prestataire/${encodeURIComponent(data.id)}/modifier`)
          await resend.emails.send({ from: EXPEDITEUR, replyTo: REPONDRE_A, to: userEmail, subject, html })
        } catch (e) {
          console.error('Erreur e-mail à corriger:', e)
        }
      }
    }

    // Email de confirmation uniquement lors du passage en_attente → active
    if (data.statut === 'active' && prestataireAvant?.statut === 'en_attente') {
      const userEmail = (prestataireAvant as { directloca_users?: { email?: string } } | null)?.directloca_users?.email
      if (userEmail) {
        try {
          const { subject, html } = emailFicheEnLigne({ id: data.id, prenom: prestataireAvant.prenom, nom: prestataireAvant.nom, activite: prestataireAvant.activite })
          await resend.emails.send({ from: EXPEDITEUR, replyTo: REPONDRE_A, to: userEmail, subject, html })
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