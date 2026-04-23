import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './utils/constants'
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
