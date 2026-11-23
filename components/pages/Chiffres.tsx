/** Chiffres clés d'une page (nombre de logements, prix, chiens) */
export default function Chiffres({ elements }: { elements: { valeur: string; label: string }[] }) {
  if (!elements.length) return null
  return (
    <dl className="flex flex-wrap gap-x-10 gap-y-3">
      {elements.map(e => (
        <div key={e.label} className="flex flex-col">
          <dt className="order-2 text-sm text-muted">{e.label}</dt>
          <dd className="text-2xl font-bold tabular-nums tracking-[-0.02em]">{e.valeur}</dd>
        </div>
      ))}
    </dl>
  )
}
