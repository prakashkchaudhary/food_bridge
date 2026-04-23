import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getStoredSession, loginUser, logoutUser, registerUser } from '../services/authService'
import { API_BASE_URL } from '../services/apiClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = getStoredSession()
    if (session?.user) {
      setUser(session.user)
      setProfile(session.user)
    }
    setLoading(false)
    return undefined
  }, [])

  const value = useMemo(
    () => ({
      user,
      profile,
      loading,
      apiConfigured: !!API_BASE_URL,
      role: profile?.role ?? null,
      async register(email, password, name, role) {
        const nextUser = await registerUser(email, password, name, role)
        setUser(nextUser)
        setProfile(nextUser)
        return nextUser
      },
      async login(email, password) {
        const nextUser = await loginUser(email, password)
        setUser(nextUser)
        setProfile(nextUser)
        return nextUser
      },
      logout() {
        logoutUser()
        setUser(null)
        setProfile(null)
      },
    }),
    [user, profile, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
