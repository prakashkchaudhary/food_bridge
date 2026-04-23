import { useEffect, useMemo, useState } from 'react'
import AddFoodForm from '../components/AddFoodForm'
import Loader from '../components/Loader'
import StatusTracker from '../components/StatusTracker'
import { useAuth } from '../context/AuthContext'
import { subscribeFoodsByDonor, subscribeRequestsByDonor } from '../services/firestoreService'

export default function DonorDashboard() {
  const { user } = useAuth()
  const [foods, setFoods] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return undefined
    setLoading(true)
    const unsubFoods = subscribeFoodsByDonor(
      user.id,
      (rows) => {
        setFoods(rows)
        setLoading(false)
      },
      (err) => {
        console.error(err)
        setLoading(false)
      }
    )
    const unsubReq = subscribeRequestsByDonor(user.id, setRequests, console.error)
    return () => {
      unsubFoods()
      unsubReq()
    }
  }, [user])

  const requestsByFoodId = useMemo(() => {
    const m = {}
    requests.filter((r) => r.status === 'pending').forEach((r) => {
      m[r.foodId] = r
    })
    return m
  }, [requests])

  if (!user) return null

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Donor dashboard</h1>
        <p className="mt-2 text-slate-600">
          Share surplus food with a photo, expiry, and pickup coordinates.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AddFoodForm />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <Loader label="Fetching data..." />
          ) : (
            <StatusTracker foods={foods} requestsByFoodId={requestsByFoodId} />
          )}
        </div>
      </div>
    </div>
  )
}
