import { useState } from 'react'
import { isCloudinaryConfigured, uploadImage } from '../services/cloudinaryService'
import { createFoodItem } from '../services/firestoreService'
import { useToast } from '../context/ToastContext'
import { getApiErrorMessage } from '../utils/apiError'

/**
 * Donor form: metadata + Cloudinary image + browser geolocation.
 */
export default function AddFoodForm({ onCreated }) {
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expiry, setExpiry] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [locLoading, setLocLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  function onPickFile(f) {
    setFile(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(f ? URL.createObjectURL(f) : null)
  }

  function captureLocation() {
    setLocLoading(true)
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by this browser.', 'error')
      setLocLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        setLocLoading(false)
        showToast('Location captured.', 'success')
      },
      () => {
        setLocLoading(false)
        showToast('Could not read your location. Enable permissions and try again.', 'error')
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !quantity.trim() || !expiry) {
      showToast('Please fill name, quantity, and expiry.', 'error')
      return
    }
    if (isCloudinaryConfigured && !file) {
      showToast('Please choose an image.', 'error')
      return
    }
    if (lat == null || lng == null) {
      showToast('Please capture your location before submitting.', 'error')
      return
    }

    setSubmitting(true)
    setUploading(isCloudinaryConfigured && Boolean(file))
    let imageUrl = ''
    if (isCloudinaryConfigured && file) {
      try {
        imageUrl = await uploadImage(file)
      } catch (err) {
        console.error(err)
        showToast(
          getApiErrorMessage(err, 'Image upload failed. Check Cloudinary preset and env vars.'),
          'error'
        )
        setUploading(false)
        setSubmitting(false)
        return
      }
    } else if (!isCloudinaryConfigured && file) {
      showToast('Cloudinary is not configured. Saving listing without image.', 'warning')
    }
    setUploading(false)

    try {
      await createFoodItem({
        name: name.trim(),
        quantity: quantity.trim(),
        imageUrl,
        location: { lat, lng },
        expiry,
      })
      showToast('Food listing created.', 'success')
      setName('')
      setQuantity('')
      setExpiry('')
      setFile(null)
      if (preview) URL.revokeObjectURL(preview)
      setPreview(null)
      onCreated?.()
    } catch (err) {
      console.error(err)
      showToast(getApiErrorMessage(err, 'Could not save listing.'), 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
    >
      <h2 className="text-lg font-semibold text-slate-900">Add surplus food</h2>
      <p className="mt-1 text-sm text-slate-600">
        Upload a photo, add details, and capture pickup location.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Name
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Fresh bread trays"
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Quantity
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 20 loaves"
            required
          />
        </label>
        <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
          Expiry
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-slate-900 outline-none ring-emerald-500/30 focus:ring-2"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium text-slate-700">Image</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-start">
          <label className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-emerald-200 bg-emerald-50/50 px-4 py-3 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50">
            Choose file
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickFile(e.target.files?.[0] || null)}
            />
          </label>
          {preview && (
            <div className="overflow-hidden rounded-xl border border-emerald-100 bg-white">
              <img src={preview} alt="Preview" className="h-32 w-auto max-w-full object-cover" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={captureLocation}
          disabled={locLoading}
          className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50 disabled:opacity-60"
        >
          {locLoading ? 'Getting location...' : 'Use my location'}
        </button>
        {lat != null && lng != null && (
          <span className="text-sm text-slate-600">
            Lat {lat.toFixed(5)}, Lng {lng.toFixed(5)}
          </span>
        )}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {uploading ? 'Uploading image...' : submitting ? 'Saving...' : 'Publish listing'}
        </button>
      </div>
    </form>
  )
}
