import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSessionUserId } from '@/lib/session'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId()
    if (!userId) return NextResponse.json({ error: 'Non connecté' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Format non supporté (JPG, PNG, WEBP uniquement)' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (5MB max)' }, { status: 400 })
    }

    const ext = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' } as Record<string, string>)[file.type]
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