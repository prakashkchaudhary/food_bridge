import { useEffect, useMemo, useState } from 'react'
import { useToast } from '../context/ToastContext'
import { isCloudinaryConfigured, uploadImage } from '../services/cloudinaryService'
import { createFoodItem } from '../services/firestoreService'
import { getApiErrorMessage } from '../utils/apiError'

export default function DonateFood() {
  const { showToast } = useToast()

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expiry, setExpiry] = useState('')
  const [pickupAddress, setPickupAddress] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [photoFiles, setPhotoFiles] = useState([])
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [locationLoading, setLocationLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const mapUrl = useMemo(() => {
    if (lat == null || lng == null) return null
    return `https://www.google.com/maps?q=${lat},${lng}`
  }, [lat, lng])

  const [photoPreviews, setPhotoPreviews] = useState([])

  useEffect(() => {
    const next = photoFiles.map((file) => ({ name: file.name, url: URL.createObjectURL(file) }))
    setPhotoPreviews(next)
    return () => {
      next.forEach((item) => URL.revokeObjectURL(item.url))
    }
  }, [photoFiles])

  function handlePhotoChange(files) {
    setPhotoFiles(files ? [...files].slice(0, 4) : [])
  }

  function capturePickupLocation() {
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        setLocationLoading(false)
        showToast('Pickup location captured.', 'success')
      },
      () => {
        setLocationLoading(false)
        showToast('Unable to read location. Please allow browser location access.', 'error')
      },
      { enableHighAccuracy: true, timeout: 15000 }
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !quantity.trim() || !expiry || !contactName.trim() || !contactPhone.trim()) {
      showToast('Please complete food and contact fields.', 'error')
      return
    }

    if (lat == null || lng == null) {
      showToast('Please capture pickup location for Google tracking.', 'error')
      return
    }

    if (isCloudinaryConfigured && photoFiles.length === 0) {
      showToast('Please upload at least one donation photo.', 'error')
      return
    }

    setSubmitting(true)
    setUploading(isCloudinaryConfigured && photoFiles.length > 0)
    try {
      let uploadedUrls = []
      if (isCloudinaryConfigured && photoFiles.length > 0) {
        const uploadJobs = photoFiles.map((file) => uploadImage(file))
        uploadedUrls = await Promise.all(uploadJobs)
      } else if (!isCloudinaryConfigured && photoFiles.length > 0) {
        showToast('Cloudinary is not configured. Saving donation without photos.', 'warning')
      }
      setUploading(false)

      await createFoodItem({
        name: name.trim(),
        quantity: quantity.trim(),
        imageUrl: uploadedUrls[0] || '',
        location: { lat, lng },
        expiry,
        pickupAddress: pickupAddress.trim(),
        contact: {
          name: contactName.trim(),
          phone: contactPhone.trim(),
          email: contactEmail.trim(),
        },
        trackerUrl: mapUrl,
        imageGallery: uploadedUrls,
        isPublic: true,
      })

      showToast('Donation submitted successfully.', 'success')
      setName('')
      setQuantity('')
      setExpiry('')
      setPickupAddress('')
      setContactName('')
      setContactPhone('')
      setContactEmail('')
      setPhotoFiles([])
    } catch (err) {
      console.error(err)
      showToast(getApiErrorMessage(err, 'Could not submit donation.'), 'error')
      setUploading(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900">Food Donation Pickup Form</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add contact details, pickup tracker location, and food photos in one place. No login required.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Food name
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Quantity
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Expiry
              <input
                type="date"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </label>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Contact person
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Contact phone
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700 sm:col-span-2">
              Contact email (optional)
              <input
                type="email"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
              />
            </label>
          </section>

          <section className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
            <h2 className="text-sm font-semibold text-emerald-900">Pickup tracker (Google Maps)</h2>
            <label className="mt-3 block text-sm font-medium text-slate-700">
              Pickup address (optional)
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-300"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
              />
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={capturePickupLocation}
                disabled={locationLoading}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {locationLoading ? 'Detecting location...' : 'Capture pickup location'}
              </button>
              {mapUrl && (
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-emerald-700 underline"
                >
                  Open Google tracker
                </a>
              )}
            </div>
            {lat != null && lng != null && (
              <p className="mt-2 text-xs text-slate-600">
                Coordinates: {lat.toFixed(5)}, {lng.toFixed(5)}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 p-4">
            <h2 className="text-sm font-semibold text-slate-900">Photo section for donation</h2>
            <p className="mt-1 text-xs text-slate-600">
              Upload up to 4 photos (first photo becomes cover image). If Cloudinary env is missing, donation still
              saves without photos.
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handlePhotoChange(e.target.files)}
              className="mt-3 block w-full text-sm"
            />
            {photoPreviews.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {photoPreviews.map((photo) => (
                  <figure key={photo.name} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img src={photo.url} alt={photo.name} className="aspect-square w-full object-cover" />
                    <figcaption className="truncate px-2 py-1 text-xs text-slate-600">{photo.name}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </section>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 sm:w-auto"
          >
            {uploading ? 'Uploading photo...' : submitting ? 'Submitting donation...' : 'Submit donation pickup'}
          </button>
        </form>
      </div>
    </div>
  )
}
