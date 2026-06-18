import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('loca_session')?.value
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Format non supporté (JPG, PNG, WEBP uniquement)' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (5MB max)' }, { status: 400 })
    }

    const ext = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const buffer = await file.arrayBuffer()

    const { error: uploadError } = await supabase.storage
      .from('vitrines-photos')
      .upload(fileName, buffer, { contentType: file.type })

    if (uploadError) {
      console.error('Erreur upload:', uploadError)
      return NextResponse.json({ error: 'Erreur upload' }, { status: 500 })
    }

    const { data: urlData } = supabase.storage
      .from('vitrines-photos')
      .getPublicUrl(fileName)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch (e) {
    console.error('Erreur upload-photo:', e)
    return NextResponse.json({ error: 'Une erreur est survenue' }, { status: 500 })
  }
}