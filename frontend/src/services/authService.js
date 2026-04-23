import apiClient from './apiClient'

const TOKEN_KEY = 'foodbridge_token'
const USER_KEY = 'foodbridge_user'

function persistSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

function normalizeUser(user) {
  if (!user) return null
  return {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}

export function getStoredSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const raw = localStorage.getItem(USER_KEY)
  if (!token || !raw) return null
  try {
    return { token, user: JSON.parse(raw) }
  } catch {
    clearSession()
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export async function registerUser(email, password, name, role) {
  const { data } = await apiClient.post('/auth/register', { email, password, name, role })
  const token = data?.data?.token
  const user = normalizeUser(data?.data?.user)
  if (!token || !user) throw new Error('Invalid register response')
  persistSession(token, user)
  return user
}

export async function loginUser(email, password) {
  const { data } = await apiClient.post('/auth/login', { email, password })
  const token = data?.data?.token
  const user = normalizeUser(data?.data?.user)
  if (!token || !user) throw new Error('Invalid login response')
  persistSession(token, user)
  return user
}

export function logoutUser() {
  clearSession()
}
