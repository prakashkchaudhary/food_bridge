import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './utils/constants'
import { trackPageView } from './utils/analytics'
import AdminDashboard from './pages/AdminDashboard'
import DonateFood from './pages/DonateFood'
import DonorDashboard from './pages/DonorDashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import NGODashboard from './pages/NGODashboard'
import Register from './pages/Register'

/**
 * Application shell + route map (role-gated dashboards).
 */
export default function App() {
  const location = useLocation()

  // Track page view on every route change
  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location])

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={<DonateFood />} />

          <Route
            path="/donor"
            element={
              <ProtectedRoute roles={[ROLES.DONOR]}>
                <DonorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ngo"
            element={
              <ProtectedRoute roles={[ROLES.NGO]}>
                <NGODashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
