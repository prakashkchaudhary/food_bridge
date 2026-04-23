/**
 * Full-page or inline loading indicator.
 */
export default function Loader({ label = 'Loading...', fullPage = false }) {
  const wrap = fullPage
    ? 'min-h-[40vh] flex flex-col items-center justify-center gap-3'
    : 'flex flex-col items-center justify-center gap-2 py-8'

  return (
    <div className={wrap} role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600"
        aria-hidden
      />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  )
}
