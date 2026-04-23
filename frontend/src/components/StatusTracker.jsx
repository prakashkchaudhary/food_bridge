import { acceptRequestForFood, markFoodDelivered } from '../services/firestoreService'
import { useToast } from '../context/ToastContext'
import { FOOD_STATUS_ORDER } from '../utils/constants'
import { getApiErrorMessage } from '../utils/apiError'

const steps = [
  { key: 'available', label: 'Listed' },
  { key: 'requested', label: 'Requested' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'delivered', label: 'Delivered' },
]

/**
 * Visual pipeline for each donor food row + actions (accept / delivered).
 */
export default function StatusTracker({ foods, requestsByFoodId, onAction }) {
  const { showToast } = useToast()

  async function handleAccept(food) {
    const req = requestsByFoodId?.[food.id]
    if (!req?.id) {
      showToast('No pending request found for this item.', 'error')
      return
    }
    try {
      await acceptRequestForFood(req.id)
      showToast('Request accepted.', 'success')
      onAction?.()
    } catch (e) {
      console.error(e)
      showToast(getApiErrorMessage(e, 'Could not accept request.'), 'error')
    }
  }

  async function handleDelivered(food) {
    try {
      await markFoodDelivered(food.id)
      showToast('Marked as delivered.', 'success')
      onAction?.()
    } catch (e) {
      console.error(e)
      showToast(getApiErrorMessage(e, 'Could not update status.'), 'error')
    }
  }

  if (!foods?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-8 text-center text-sm text-slate-600">
        No food listings yet. Add your first surplus item above.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Status tracker</h2>
      <ul className="space-y-4">
        {foods.map((food) => {
          const idx = FOOD_STATUS_ORDER.indexOf(food.status)
          return (
            <li
              key={food.id}
              className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{food.name}</p>
                  <p className="text-sm text-slate-600">Qty: {food.quantity}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {food.status === 'requested' && (
                    <button
                      type="button"
                      onClick={() => handleAccept(food)}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                    >
                      Accept request
                    </button>
                  )}
                  {food.status === 'accepted' && (
                    <button
                      type="button"
                      onClick={() => handleDelivered(food)}
                      className="rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-50"
                    >
                      Mark delivered
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {steps.map((s, i) => {
                  const active = idx >= i
                  return (
                    <div key={s.key} className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className={`text-xs font-medium ${active ? 'text-emerald-900' : 'text-slate-500'}`}>
                        {s.label}
                      </span>
                      {i < steps.length - 1 && (
                        <span className="hidden text-slate-300 sm:inline">→</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
