import { Link } from 'react-router-dom'
import logo from '../assets/foodbridge-logo.png'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="FoodBridge" className="h-12 w-12 rounded-xl object-cover shadow-sm" />
              <span className="text-xl font-bold text-emerald-800">FoodBridge</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Connecting food donors with NGOs to reduce waste and feed communities. 
              A smart, real-time platform for surplus food management with transparent tracking 
              from donation to delivery.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50 hover:shadow-md"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  Donate Food
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-900">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#about" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-slate-600 transition hover:text-emerald-600">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid gap-6 rounded-2xl border border-emerald-100 bg-white/50 p-6 backdrop-blur-sm sm:grid-cols-3">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">1000+</p>
            <p className="mt-1 text-sm text-slate-600">Meals Donated</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">50+</p>
            <p className="mt-1 text-sm text-slate-600">NGO Partners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">100+</p>
            <p className="mt-1 text-sm text-slate-600">Active Donors</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-emerald-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-600">
            © {year} <span className="font-semibold text-emerald-800">FoodBridge</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="#privacy" className="text-sm text-slate-600 transition hover:text-emerald-600">
              Privacy Policy
            </a>
            <a href="#terms" className="text-sm text-slate-600 transition hover:text-emerald-600">
              Terms of Service
            </a>
            <a href="#cookies" className="text-sm text-slate-600 transition hover:text-emerald-600">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-center">
          <p className="text-sm font-medium text-white">
            🌱 Together, we're building a world with zero food waste and zero hunger.
          </p>
        </div>
      </div>
    </footer>
  )
}
