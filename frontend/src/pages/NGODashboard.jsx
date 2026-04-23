import { useEffect, useState } from 'react'
import FoodCard from '../components/FoodCard'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { requestFoodItem, subscribeAvailableFoods, subscribeRequestsByNgo } from '../services/firestoreService'
import { getApiErrorMessage } from '../utils/apiError'

export default function NGODashboard() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [foods, setFoods] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [actingId, setActingId] = useState(null)

  useEffect(() => {
    if (!user) return undefined
    const unsubFoods = subscribeAvailableFoods(
      (rows) => {
        setFoods(rows)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        showToast(getApiErrorMessage(err, 'Could not load food listings.'), 'error')
        setLoading(false)
      }
    )
    const unsubReq = subscribeRequestsByNgo(user.id, setRequests, console.error)
    return () => {
      unsubFoods()
      unsubReq()
    }
  }, [user, showToast])

  async function handleRequest(food) {
    if (!user) return
    setActingId(food.id)
    try {
      await requestFoodItem(food.id)
      showToast('Request submitted. The donor will review it.', 'success')
    } catch (e) {
      console.error(e)
      showToast(getApiErrorMessage(e, 'Could not request this item.'), 'error')
    } finally {
      setActingId(null)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">NGO dashboard</h1>
          <p className="mt-2 text-slate-600">
            Live surplus listings update in real time. Request what you can distribute.
          </p>
        </div>
        <p className="text-sm text-slate-500">
          {loading ? 'Syncing...' : `${foods.length} available listing${foods.length === 1 ? '' : 's'}`}
        </p>
      </header>

      {loading ? (
        <Loader label="Fetching data..." fullPage />
      ) : foods.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/50 p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">No food available right now</p>
          <p className="mt-2 text-sm text-slate-600">
            Check back soon — donors publish new surplus throughout the day.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              showRequestButton
              requestDisabled={actingId === food.id}
              onRequest={handleRequest}
            />
          ))}
        </div>
      )}

      {!loading && requests.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-slate-900">Your recent requests</h2>
          <ul className="mt-4 divide-y divide-emerald-100 rounded-2xl border border-emerald-100 bg-white">
            {requests.slice(0, 8).map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                <span className="font-medium text-slate-800">Food ID: {r.foodId}</span>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold capitalize text-emerald-900">
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
