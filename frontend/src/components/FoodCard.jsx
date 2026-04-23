/**
 * Card UI for a food listing (donor or NGO views).
 */
export default function FoodCard({
  food,
  onRequest,
  requestDisabled,
  showRequestButton,
  footer,
}) {
  const loc = food.location
  const locLabel =
    loc && typeof loc.lat === 'number' && typeof loc.lng === 'number'
      ? `${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`
      : 'Location not set'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        {food.image ? (
          <img
            src={food.image}
            alt={food.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-emerald-700/70">
            No image
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold capitalize text-emerald-800 shadow-sm">
          {food.status || '—'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg font-semibold text-slate-900">{food.name}</h3>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-800">Qty:</span> {food.quantity}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-800">Expires:</span> {food.expiry || '—'}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-medium text-slate-800">Location:</span>{' '}
          <a
            className="text-emerald-700 underline-offset-2 hover:underline"
            href={`https://www.google.com/maps?q=${loc?.lat},${loc?.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            {locLabel}
          </a>
        </p>

        {footer}

        {showRequestButton && (
          <button
            type="button"
            disabled={requestDisabled}
            onClick={() => onRequest?.(food)}
            className="mt-auto w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Request food
          </button>
        )}
      </div>
    </article>
  )
}
