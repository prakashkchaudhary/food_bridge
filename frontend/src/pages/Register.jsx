import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ROLES } from '../utils/constants'
import { getApiErrorMessage } from '../utils/apiError'

export default function Register() {
  const { register } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(ROLES.DONOR)
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) {
      showToast('Password should be at least 6 characters.', 'error')
      return
    }
    setBusy(true)
    try {
      const profile = await register(email.trim(), password, name.trim(), role)
      showToast('Account created. You are signed in.', 'success')
      const dest =
        profile?.role === ROLES.DONOR
          ? '/donor'
          : profile?.role === ROLES.NGO
            ? '/ngo'
            : profile?.role === ROLES.ADMIN
              ? '/admin'
              : '/'
      navigate(dest, { replace: true })
    } catch (err) {
      console.error(err)
      showToast(getApiErrorMessage(err, 'Registration failed.'), 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-600">
          Already registered?{' '}
          <Link className="font-semibold text-emerald-700 hover:underline" to="/login">
            Sign in
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Full name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            />
          </label>

          <fieldset>
            <legend className="text-sm font-medium text-slate-700">I am a</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-emerald-50">
                <input
                  type="radio"
                  name="role"
                  checked={role === ROLES.DONOR}
                  onChange={() => setRole(ROLES.DONOR)}
                />
                Donor
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm hover:bg-emerald-50">
                <input
                  type="radio"
                  name="role"
                  checked={role === ROLES.NGO}
                  onChange={() => setRole(ROLES.NGO)}
                />
                NGO
              </label>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Admin accounts are assigned by system admins for security (not self-registered).
            </p>
          </fieldset>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
          >
            {busy ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}
