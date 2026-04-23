export function getApiErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (!error) return fallback

  const apiMessage = error?.response?.data?.message
  if (typeof apiMessage === 'string' && apiMessage.trim()) return apiMessage

  const nestedApiMessage = error?.response?.data?.error?.message
  if (typeof nestedApiMessage === 'string' && nestedApiMessage.trim()) return nestedApiMessage

  const genericMessage = error?.message
  if (typeof genericMessage === 'string' && genericMessage.trim()) return genericMessage

  return fallback
}
