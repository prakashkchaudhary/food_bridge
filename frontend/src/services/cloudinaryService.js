/**
 * Cloudinary unsigned image upload via REST (multipart/form-data).
 * Requires an upload preset with "Unsigned" allowed in Cloudinary dashboard.
 */
import axios from 'axios'

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset)

/**
 * Upload a File/Blob and return the secure HTTPS URL.
 * @param {File} file - Image file from an <input type="file" />
 * @returns {Promise<string>} secure_url
 */
export async function uploadImage(file) {
  if (!isCloudinaryConfigured) {
    throw new Error(
      'Missing Cloudinary env: set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env'
    )
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', uploadPreset)

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

  const { data } = await axios.post(url, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 120000,
  })

  if (!data?.secure_url) {
    throw new Error('Cloudinary response did not include secure_url')
  }

  return data.secure_url
}
