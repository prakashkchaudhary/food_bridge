import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

/**
 * Guards routes that require auth and an optional role.
 */
export default function ProtectedRoute({ children, roles }) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Loader label="Checking session..." fullPage />
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (roles?.length && !roles.includes(profile?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
