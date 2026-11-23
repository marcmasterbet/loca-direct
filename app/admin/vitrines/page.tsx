import { redirect } from 'next/navigation'

// Ancienne page : tout est réuni dans le tableau de bord
export default function AncienneAdminVitrines() {
  redirect('/admin/dashboard')
}
