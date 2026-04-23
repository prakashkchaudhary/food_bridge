/**
 * Dismissible toast for success / error / info feedback.
 */
const styles = {
  success: 'bg-emerald-700 text-white border-emerald-800',
  error: 'bg-red-600 text-white border-red-700',
  info: 'bg-slate-800 text-white border-slate-900',
}

export default function Toast({ message, variant = 'info', onClose }) {
  return (
    <div
      className={`flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${styles[variant] ?? styles.info}`}
    >
      <p className="flex-1 text-sm leading-relaxed">{message}</p>
      <button
        type="button"
        onClick={onClose}
        className="rounded-lg px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white/90 hover:bg-white/10"
      >
        Close
      </button>
    </div>
  )
}
