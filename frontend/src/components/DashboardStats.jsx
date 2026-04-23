/**
 * KPI cards for admin overview.
 */
export default function DashboardStats({ totalFoods, totalRequests, loading }) {
  const cards = [
    { label: 'Total food listings', value: totalFoods },
    { label: 'Total NGO requests', value: totalRequests },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          <p className="text-sm font-medium text-slate-600">{c.label}</p>
          <p className="mt-2 text-3xl font-bold text-emerald-800">
            {loading ? '—' : c.value}
          </p>
        </div>
      ))}
    </div>
  )
}
