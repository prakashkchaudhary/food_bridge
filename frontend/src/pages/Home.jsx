import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import imgWasteBin from '../assets/photos/waste-bin.png'
import imgCompost from '../assets/photos/compost-getty.png'
import imgZeroWasteCover from '../assets/photos/zero-waste-cover.png'
import imgZeroWasteBoard from '../assets/photos/zero-waste-board.png'
import imgWasteMgmt from '../assets/photos/food-waste-management.png'
import imgReduceIllustration from '../assets/photos/reduce-waste-illustration.png'
import logo from '../assets/foodbridge-logo.png'

const features = [
  {
    title: 'Donors list surplus fast',
    body: 'Photo, quantity, expiry, and GPS pickup location — uploaded securely via Cloudinary.',
  },
  {
    title: 'NGOs see live inventory',
    body: 'Fast API polling keeps the food board fresh so teams can respond immediately.',
  },
  {
    title: 'Transparent lifecycle',
    body: 'Track each listing from available → requested → accepted → delivered.',
  },
]

const gallery = [
  { src: imgWasteMgmt, alt: 'Food waste management' },
  { src: imgZeroWasteBoard, alt: 'Zero waste message with food items' },
  { src: imgReduceIllustration, alt: 'Reducing food waste illustration' },
  { src: imgZeroWasteCover, alt: 'Zero waste with food cover' },
  { src: imgCompost, alt: 'Composting food scraps' },
  { src: imgWasteBin, alt: 'Food waste bin' },
]

const storyStrip = [
  { src: imgReduceIllustration, title: 'Awareness' },
  { src: imgCompost, title: 'Collection' },
  { src: imgWasteMgmt, title: 'Distribution' },
]

export default function Home() {
  const { apiConfigured } = useAuth()

  return (
    <div className="bg-gradient-to-b from-emerald-50/80 via-lime-50/40 to-white">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 sm:pt-20">
        {/* Decorative background elements */}
        <div className="absolute left-0 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute right-0 top-40 -z-10 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
        
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="animate-slide-in-left">
            <p className="inline-flex animate-pulse-glow rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
              Smart Food Waste Management
            </p>
            <h1 className="mt-4 bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-800 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
              FoodBridge connects surplus food with communities who need it.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
              A production-ready dashboard experience for donors and NGOs — real-time data,
              role-based access, and image-backed listings.
            </p>

            {!apiConfigured && (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                <p className="font-semibold">Backend API isn’t configured yet.</p>
                <p className="mt-1 text-amber-900/80">
                  Copy <code className="rounded bg-amber-100 px-1 py-0.5">.env.example</code> to{' '}
                  <code className="rounded bg-amber-100 px-1 py-0.5">.env</code>, set{' '}
                  <code className="rounded bg-amber-100 px-1 py-0.5">VITE_API_BASE_URL</code>, then
                  restart <code className="rounded bg-amber-100 px-1 py-0.5">npm run dev</code>.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/donate"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="relative z-10">Donate food now</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-700 to-teal-700 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl border-2 border-emerald-600 bg-white px-6 py-3 text-sm font-semibold text-emerald-600 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-50 hover:shadow-lg"
              >
                Find food (NGO)
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:scale-105 hover:text-emerald-700"
              >
                I already have an account
              </Link>
            </div>
          </div>
          <div className="relative animate-slide-in-right">
            <div className="absolute -inset-6 -z-10 animate-pulse-glow rounded-[2.5rem] bg-gradient-to-r from-emerald-200 via-teal-200 to-emerald-200 blur-2xl" />
            <div className="rounded-3xl border-2 border-emerald-100 bg-white p-6 shadow-2xl backdrop-blur-sm">
              <div className="mb-4 flex justify-center">
                <div className="animate-float">
                  <img src={logo} alt="FoodBridge" className="h-28 w-28 object-contain drop-shadow-lg" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900">Live impact</p>
                <span className="animate-pulse rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  Real-time
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="card-hover rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-emerald-900">For donors</p>
                  <p className="mt-2 text-sm text-emerald-900/80">
                    Publish surplus in minutes with photo + location.
                  </p>
                </div>
                <div className="card-hover rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 shadow-sm">
                  <p className="text-xs font-medium text-slate-900">For NGOs</p>
                  <p className="mt-2 text-sm text-slate-700">
                    Request items as soon as they appear on the board.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 px-4 pb-20 pt-10 shadow-inner">
        <h2 className="animate-fade-in text-center text-3xl font-bold text-slate-900">
          Why teams use <span className="gradient-text">FoodBridge</span>
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((f, index) => (
            <div
              key={f.title}
              className="card-hover animate-scale-in rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-md">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-emerald-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Strip Section */}
      <section className="mx-auto mt-10 max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-1 shadow-xl">
          <div className="grid gap-4 rounded-[22px] bg-white p-4 sm:grid-cols-3">
            {storyStrip.map((item, index) => (
              <article 
                key={item.title} 
                className="card-hover animate-fade-in-up overflow-hidden rounded-2xl border-2 border-emerald-100 shadow-md"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 hover:scale-110 hover:rotate-1"
                  />
                </div>
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="mx-auto mt-16 max-w-6xl px-4 pb-24">

        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl font-bold text-slate-900">
              Impact <span className="gradient-text">Gallery</span>
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Visuals used across FoodBridge to reinforce the mission.
            </p>
          </div>
          <p className="animate-slide-in-right rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-2 text-xs font-medium text-emerald-800 shadow-sm">
            Green/white startup theme
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gallery.map((g, index) => (
            <figure
              key={g.alt}
              className="group animate-fade-in-up overflow-hidden rounded-2xl border-2 border-emerald-100 bg-gradient-to-b from-white to-emerald-50 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:rotate-1 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50">
                <img
                  src={g.src}
                  alt={g.alt}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
              </div>
              <figcaption className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-xs font-medium text-white">
                {g.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}

