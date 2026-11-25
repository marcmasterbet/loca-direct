import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'
import { centreCommune } from '@/lib/geo'
import { accepteGrandChien } from '@/lib/france'
import { projeteur, traceFrance } from '@/lib/france-contour'

// Image affichée quand on partage loca-direct.fr (Facebook, WhatsApp, LinkedIn…) :
// la carte de France avec les vrais logements, mise à jour toutes les heures.

export const alt = 'LocaDirect : la carte des locations de vacances entre particuliers en France'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 3600

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const CARTE = { l: 560, h: 590 }

export default async function Image() {
  const { data } = await supabase
    .from('vitrines')
    .select('code_postal, ville, pays, equipements')
    .in('statut', ['active', 'deja_loue', 'bientot_dispo'])
  const vitrines = (data || []).filter(v => !v.pays || v.pays === 'France')
  const points = (
    await Promise.all(
      vitrines.map(async v => {
        const c = await centreCommune(v.code_postal, v.ville)
        return c ? { c, chien: accepteGrandChien(v.equipements) } : null
      })
    )
  ).filter((p): p is { c: [number, number]; chien: boolean } => p !== null)

  const p = projeteur(CARTE.l, CARTE.h, 10)
  const trace = traceFrance(CARTE.l, CARTE.h, 10)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#f4f3fb', fontFamily: 'sans-serif' }}>
        <div style={{ width: 620, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 64px', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: '#5534e8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 30, fontWeight: 700 }}>
              L
            </div>
            <div style={{ fontSize: 36, fontWeight: 700, color: '#17162a' }}>locadirect</div>
          </div>
          <div style={{ fontSize: 58, fontWeight: 700, color: '#17162a', lineHeight: 1.05, letterSpacing: -2 }}>
            Location de vacances en direct entre particuliers
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ display: 'flex', background: '#dff7ec', color: '#0b6b4f', fontSize: 26, fontWeight: 700, padding: '10px 18px', borderRadius: 14 }}>
              0 € de commission
            </div>
            <div style={{ display: 'flex', background: '#fff4d6', color: '#7a5200', fontSize: 26, fontWeight: 700, padding: '10px 18px', borderRadius: 14 }}>
              Chien accepté
            </div>
          </div>
          <div style={{ fontSize: 28, color: '#55536b' }}>
            {points.length > 0 ? `${points.length} logements sur la carte · loca-direct.fr` : 'loca-direct.fr'}
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={CARTE.l} height={CARTE.h} viewBox={`0 0 ${CARTE.l} ${CARTE.h}`}>
            <path d={trace} fill="#ffffff" stroke="#c9bffb" strokeWidth={2} strokeLinejoin="round" />
            {points.map((pt, i) => {
              const [x, y] = p(pt.c)
              return (
                <circle key={i} cx={x} cy={y} r={pt.chien ? 11 : 9} fill={pt.chien ? '#ffcf4d' : '#5534e8'} stroke="#ffffff" strokeWidth={3} />
              )
            })}
          </svg>
        </div>
      </div>
    ),
    size
  )
}
