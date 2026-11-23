import { redirect } from 'next/navigation'

// Ancienne page : tout est réuni dans le tableau de bord
export default function AncienneAdminPrestataires() {
  redirect('/admin/dashboard?onglet=prestataires')
}
