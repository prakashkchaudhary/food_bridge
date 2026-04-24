import axios from 'axios'

// Production backend URL — hardcoded as fallback so it always works on Vercel
const PRODUCTION_API_URL = 'https://food-bridge-6-zn3t.onrender.com/api'

function resolveApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_BASE_URL

  // Use env var if explicitly set, otherwise use production URL
  const raw = envUrl && envUrl.trim() ? envUrl.trim() : PRODUCTION_API_URL

  if (typeof window === 'undefined') return raw

  try {
    const url = new URL(raw)
    const currentHost = window.location.hostname
    const isLocalHostUrl = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
    const isDifferentClient =
      currentHost &&
      currentHost !== 'localhost' &&
      currentHost !== '127.0.0.1' &&
      currentHost !== url.hostname

    // When app is opened from another device, localhost in env points to that device.
    if (isLocalHostUrl && isDifferentClient) {
      url.hostname = currentHost
      return url.toString().replace(/\/$/, '')
    }
  } catch {
    // Keep original value if env URL is not parseable.
  }

  return raw
}

const API_BASE_URL = resolveApiBaseUrl()

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('foodbridge_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
export { API_BASE_URL }
