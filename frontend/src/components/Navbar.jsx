import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../utils/constants'
import logo from '../assets/foodbridge-logo.png'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:scale-105 ${
    isActive ? 'bg-emerald-100 text-emerald-900 shadow-sm' : 'text-slate-700'
  }`

export default function Navbar() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()
  const role = profile?.role

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100/80 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="group flex items-center gap-2 font-semibold text-emerald-800 transition-all hover:scale-105">
          <div className="relative">
            <img 
              src={logo} 
              alt="FoodBridge logo" 
              className="h-10 w-10 rounded-xl object-cover shadow-md transition-all group-hover:shadow-lg" 
            />
            <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 blur transition-opacity group-hover:opacity-30" />
          </div>
          <span className="hidden bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent sm:inline">
            FoodBridge
          </span>
        </Link>

        <nav className="flex flex-1 flex-wrap items-center justify-end gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={linkClass}>
                Register
              </NavLink>
            </>
          )}

          {user && role === ROLES.DONOR && (
            <NavLink to="/donor" className={linkClass}>
              Donor
            </NavLink>
          )}
          {user && role === ROLES.NGO && (
            <NavLink to="/ngo" className={linkClass}>
              NGO
            </NavLink>
          )}
          {user && role === ROLES.ADMIN && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}

          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:scale-105 hover:bg-red-50 hover:text-red-600"
            >
              Log out
            </button>
          )}

          <div className="mx-1 hidden h-6 w-px bg-gradient-to-b from-transparent via-emerald-200 to-transparent sm:block" />
          
          <Link
            to="/donate"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="relative z-10">Donate Food</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </nav>
      </div>
    </header>
  )
}
