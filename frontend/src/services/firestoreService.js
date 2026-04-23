import apiClient from './apiClient'

function normalizeFood(food) {
  if (!food) return null
  return {
    ...food,
    id: food.id || food._id,
    donorId: food.donorId || food.donor?._id,
  }
}

function normalizeRequest(item) {
  if (!item) return null
  const foodId = typeof item.food === 'string' ? item.food : item.food?._id
  return {
    ...item,
    id: item.id || item._id,
    foodId,
    ngoId: item.ngoId || item.ngo?._id,
    donorId: item.donorId || item.food?.donor?._id,
  }
}

function startPolling(fetchFn, onNext, onError, intervalMs = 7000) {
  let active = true
  const run = async () => {
    try {
      const rows = await fetchFn()
      if (active) onNext(rows)
    } catch (error) {
      if (active) onError?.(error)
    }
  }
  run()
  const timer = window.setInterval(run, intervalMs)
  return () => {
    active = false
    window.clearInterval(timer)
  }
}

export async function createFoodItem({
  name,
  quantity,
  imageUrl,
  location,
  expiry,
  pickupAddress,
  contact,
  trackerUrl,
  imageGallery,
  isPublic = false,
}) {
  const payload = {
    name,
    quantity,
    image: imageUrl,
    imageGallery: imageGallery || (imageUrl ? [imageUrl] : []),
    location: {
      address: pickupAddress || location?.address || '',
      lat: location?.lat,
      lng: location?.lng,
    },
    expiry,
    contact,
    trackerUrl,
  }
  const endpoint = isPublic ? '/food/add-public' : '/food/add'
  const { data } = await apiClient.post(endpoint, payload)
  return normalizeFood(data?.data)
}

export async function fetchFoods(params = {}) {
  const { data } = await apiClient.get('/food', { params })
  return (data?.data || []).map(normalizeFood)
}

export function subscribeFoodsByDonor(donorId, onNext, onError) {
  return startPolling(
    async () => {
      const rows = await fetchFoods()
      return rows.filter((item) => item.donorId === donorId)
    },
    onNext,
    onError
  )
}

export function subscribeAvailableFoods(onNext, onError) {
  return startPolling(() => fetchFoods({ status: 'available' }), onNext, onError)
}

export async function requestFoodItem(foodId) {
  await apiClient.post('/request/create', { foodId })
}

export async function acceptRequestForFood(requestId) {
  await apiClient.put(`/request/update/${requestId}`, { status: 'accepted' })
}

export async function markFoodDelivered(foodId) {
  await apiClient.put(`/food/update/${foodId}`, { status: 'delivered' })
}

export async function fetchMyRequests() {
  const { data } = await apiClient.get('/request/my')
  return (data?.data || []).map(normalizeRequest)
}

export function subscribeRequestsByDonor(_donorId, onNext, onError) {
  return startPolling(fetchMyRequests, onNext, onError)
}

export function subscribeRequestsByNgo(_ngoId, onNext, onError) {
  return startPolling(fetchMyRequests, onNext, onError)
}

export async function fetchAdminStats() {
  const { data } = await apiClient.get('/admin/stats')
  return data?.data || {}
}

export async function fetchAdminFoods() {
  const { data } = await apiClient.get('/admin/foods', { params: { limit: 1000 } })
  return (data?.data || []).map(normalizeFood)
}

export async function fetchAdminRequests() {
  const { data } = await apiClient.get('/admin/requests', { params: { limit: 1000 } })
  return (data?.data || []).map(normalizeRequest)
}

export async function fetchAdminUsers() {
  const { data } = await apiClient.get('/admin/users', { params: { limit: 1000 } })
  return data?.data || []
}

export async function adminUpdateFood(foodId, payload) {
  const { data } = await apiClient.put(`/admin/foods/${foodId}`, payload)
  return normalizeFood(data?.data)
}

export async function adminDeleteFood(foodId) {
  await apiClient.delete(`/admin/foods/${foodId}`)
}

export async function adminUpdateRequest(requestId, status) {
  const { data } = await apiClient.put(`/admin/requests/${requestId}`, { status })
  return normalizeRequest(data?.data)
}

export async function adminUpdateUser(userId, payload) {
  const { data } = await apiClient.put(`/admin/users/${userId}`, payload)
  return data?.data
}
