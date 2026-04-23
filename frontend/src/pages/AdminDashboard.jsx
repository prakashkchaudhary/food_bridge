import { useEffect, useMemo, useState } from 'react'
import DashboardStats from '../components/DashboardStats'
import Loader from '../components/Loader'
import {
  adminDeleteFood,
  adminUpdateFood,
  adminUpdateRequest,
  adminUpdateUser,
  fetchAdminFoods,
  fetchAdminRequests,
  fetchAdminStats,
  fetchAdminUsers,
} from '../services/firestoreService'
import { useToast } from '../context/ToastContext'
import { getApiErrorMessage } from '../utils/apiError'
import { FOOD_STATUS_ORDER, ROLES } from '../utils/constants'

const REQUEST_STATUSES = ['pending', 'accepted', 'rejected', 'completed', 'cancelled']
const USER_ROLES = [ROLES.DONOR, ROLES.NGO, ROLES.ADMIN]
const DELIVERY_STATUSES = ['pending', 'in-transit', 'delivered']

export default function AdminDashboard() {
  const { showToast } = useToast()
  const [totalFoods, setTotalFoods] = useState(0)
  const [totalRequests, setTotalRequests] = useState(0)
  const [breakdown, setBreakdown] = useState({
    available: 0,
    requested: 0,
    accepted: 0,
    delivered: 0,
  })
  const [loading, setLoading] = useState(true)
  const [foods, setFoods] = useState([])
  const [requests, setRequests] = useState([])
  const [users, setUsers] = useState([])
  const [foodDrafts, setFoodDrafts] = useState({})
  const [requestDrafts, setRequestDrafts] = useState({})
  const [userDrafts, setUserDrafts] = useState({})
  const [deliveryDrafts, setDeliveryDrafts] = useState({})
  const [busyKey, setBusyKey] = useState('')

  useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const [stats, foodsRows, requestRows, userRows] = await Promise.all([
          fetchAdminStats(),
          fetchAdminFoods(),
          fetchAdminRequests(),
          fetchAdminUsers(),
        ])
        if (!active) return
        setTotalFoods(stats.totalFoodItems || 0)
        setTotalRequests(stats.totalRequests || 0)
        const next = { available: 0, requested: 0, accepted: 0, delivered: 0 }
        foodsRows.forEach((item) => {
          const s = item.status
          if (next[s] !== undefined) next[s] += 1
        })
        setBreakdown(next)
        setFoods(foodsRows)
        setRequests(requestRows)
        setUsers(userRows)
      } catch (error) {
        console.error(error)
        if (active) showToast(getApiErrorMessage(error, 'Could not load admin metrics.'), 'error')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    const timer = window.setInterval(load, 12000)
    return () => {
      active = false
      window.clearInterval(timer)
    }
  }, [showToast])

  const sortedFoods = useMemo(() => [...foods].slice(0, 20), [foods])
  const sortedRequests = useMemo(() => [...requests].slice(0, 20), [requests])
  const sortedUsers = useMemo(() => [...users].slice(0, 20), [users])

  function getFoodDraft(food) {
    return (
      foodDrafts[food.id] || {
        name: food.name || '',
        quantity: food.quantity || '',
        expiry: food.expiry ? new Date(food.expiry).toISOString().slice(0, 10) : '',
        status: food.status || 'available',
      }
    )
  }

  function setFoodDraft(foodId, patch) {
    setFoodDrafts((prev) => ({
      ...prev,
      [foodId]: {
        ...(prev[foodId] || {}),
        ...patch,
      },
    }))
  }

  async function saveFood(food) {
    const draft = getFoodDraft(food)
    const key = `food-save-${food.id}`
    setBusyKey(key)
    try {
      await adminUpdateFood(food.id, draft)
      showToast('Food listing updated.', 'success')
      setFoods((prev) =>
        prev.map((item) =>
          item.id === food.id
            ? {
                ...item,
                ...draft,
              }
            : item
        )
      )
    } catch (error) {
      console.error(error)
      showToast(getApiErrorMessage(error, 'Could not update food listing.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function removeFood(foodId) {
    const key = `food-delete-${foodId}`
    setBusyKey(key)
    try {
      await adminDeleteFood(foodId)
      setFoods((prev) => prev.filter((item) => item.id !== foodId))
      setRequests((prev) => prev.filter((item) => item.foodId !== foodId))
      showToast('Food listing deleted.', 'success')
    } catch (error) {
      console.error(error)
      showToast(getApiErrorMessage(error, 'Could not delete food listing.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function saveRequest(request) {
    const nextStatus = requestDrafts[request.id] || request.status
    const key = `request-${request.id}`
    setBusyKey(key)
    try {
      const updated = await adminUpdateRequest(request.id, nextStatus)
      setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, ...updated } : item)))
      showToast('Order/request updated.', 'success')
    } catch (error) {
      console.error(error)
      showToast(getApiErrorMessage(error, 'Could not update order/request.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function saveUser(user) {
    const nextRole = userDrafts[user.id] || user.role
    const key = `user-${user.id}`
    setBusyKey(key)
    try {
      const updated = await adminUpdateUser(user.id, { role: nextRole })
      setUsers((prev) => prev.map((item) => (item.id === user.id || item._id === user.id ? updated : item)))
      showToast('User role updated.', 'success')
    } catch (error) {
      console.error(error)
      showToast(getApiErrorMessage(error, 'Could not update user role.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  async function saveDeliveryStatus(request) {
    const nextStatus = deliveryDrafts[request.id] || request.deliveryStatus || 'pending'
    const key = `delivery-${request.id}`
    setBusyKey(key)
    try {
      const updated = await adminUpdateRequest(request.id, request.status, { deliveryStatus: nextStatus })
      setRequests((prev) => prev.map((item) => (item.id === request.id ? { ...item, deliveryStatus: nextStatus } : item)))
      showToast('Delivery status updated.', 'success')
    } catch (error) {
      console.error(error)
      showToast(getApiErrorMessage(error, 'Could not update delivery status.'), 'error')
    } finally {
      setBusyKey('')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin dashboard</h1>
        <p className="mt-2 text-slate-600">
          Operations control center for listings, orders, and users.
        </p>
      </header>

      {loading ? (
        <Loader label="Fetching data..." />
      ) : (
        <>
          <DashboardStats totalFoods={totalFoods} totalRequests={totalRequests} loading={false} />
          <div className="mt-6 grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 text-sm text-slate-700 sm:grid-cols-4">
            <div>Available: {breakdown.available}</div>
            <div>Requested: {breakdown.requested}</div>
            <div>Accepted: {breakdown.accepted}</div>
            <div>Delivered: {breakdown.delivered}</div>
          </div>

          <section className="mt-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Food inventory management</h2>
            <p className="mt-1 text-sm text-slate-600">
              Edit listing details, mark as sold out/unavailable, or remove invalid items.
            </p>
            <div className="mt-5 space-y-4">
              {sortedFoods.map((food) => {
                const draft = getFoodDraft(food)
                return (
                  <div key={food.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="grid gap-3 sm:grid-cols-4">
                      <input
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        value={draft.name}
                        onChange={(e) => setFoodDraft(food.id, { name: e.target.value })}
                        placeholder="Food name"
                      />
                      <input
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        value={draft.quantity}
                        onChange={(e) => setFoodDraft(food.id, { quantity: e.target.value })}
                        placeholder="Quantity"
                      />
                      <input
                        type="date"
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        value={draft.expiry}
                        onChange={(e) => setFoodDraft(food.id, { expiry: e.target.value })}
                      />
                      <select
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize"
                        value={draft.status}
                        onChange={(e) => setFoodDraft(food.id, { status: e.target.value })}
                      >
                        {FOOD_STATUS_ORDER.map((status) => (
                          <option key={status} value={status}>
                            {status.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <span>Donor: {food?.donor?.email || 'Public/Unknown donor'}</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveFood(food)}
                          disabled={busyKey === `food-save-${food.id}`}
                          className="rounded-lg bg-emerald-600 px-3 py-1.5 text-white disabled:opacity-60"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFood(food.id)}
                          disabled={busyKey === `food-delete-${food.id}`}
                          className="rounded-lg bg-rose-600 px-3 py-1.5 text-white disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Order/request management</h2>
            <p className="mt-1 text-sm text-slate-600">
              Accept, reject, complete, or cancel NGO requests at operational level.
            </p>
            <div className="mt-5 space-y-3">
              {sortedRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-slate-500">Food</p>
                      <p className="text-sm font-medium text-slate-800">{request?.food?.name || 'Deleted food item'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">NGO</p>
                      <p className="text-sm font-medium text-slate-800">{request?.ngo?.email || 'Unknown NGO'}</p>
                    </div>
                    <div className="flex items-end gap-2">
                      <select
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize"
                        value={requestDrafts[request.id] || request.status}
                        onChange={(e) =>
                          setRequestDrafts((prev) => ({
                            ...prev,
                            [request.id]: e.target.value,
                          }))
                        }
                      >
                        {REQUEST_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => saveRequest(request)}
                        disabled={busyKey === `request-${request.id}`}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white disabled:opacity-60"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Distribution Management</h2>
            <p className="mt-1 text-sm text-slate-600">
              Track deliveries for accepted food items to NGOs.
            </p>
            <div className="mt-5 space-y-3">
              {sortedRequests
                .filter((request) => request.status === 'accepted')
                .map((request) => (
                  <div key={request.id} className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                    <div className="grid gap-3 sm:grid-cols-4">
                      <div>
                        <p className="text-xs text-slate-500">Food Item</p>
                        <p className="text-sm font-medium text-slate-800">{request?.food?.name || 'Deleted food item'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Receiving NGO</p>
                        <p className="text-sm font-medium text-slate-800">{request?.ngo?.email || 'Unknown NGO'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Quantity</p>
                        <p className="text-sm font-medium text-slate-800">{request?.food?.quantity || 'N/A'}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <select
                          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm capitalize"
                          value={deliveryDrafts[request.id] || request.deliveryStatus || 'pending'}
                          onChange={(e) =>
                            setDeliveryDrafts((prev) => ({
                              ...prev,
                              [request.id]: e.target.value,
                            }))
                          }
                        >
                          {DELIVERY_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => saveDeliveryStatus(request)}
                          disabled={busyKey === `delivery-${request.id}`}
                          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white disabled:opacity-60 whitespace-nowrap"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              {sortedRequests.filter((request) => request.status === 'accepted').length === 0 && (
                <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-600">
                  No accepted requests awaiting delivery.
                </p>
              )}
            </div>
          </section>

          <section className="mt-10 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">User role management</h2>
            <p className="mt-1 text-sm text-slate-600">Promote/demote users between donor, NGO, and admin roles.</p>
            <div className="mt-5 space-y-3">
              {sortedUsers.map((user) => {
                const userId = user.id || user._id
                return (
                  <div key={userId} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-800">{user.name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        value={userDrafts[userId] || user.role}
                        onChange={(e) =>
                          setUserDrafts((prev) => ({
                            ...prev,
                            [userId]: e.target.value,
                          }))
                        }
                      >
                        {USER_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => saveUser({ ...user, id: userId })}
                        disabled={busyKey === `user-${userId}`}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white disabled:opacity-60"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
