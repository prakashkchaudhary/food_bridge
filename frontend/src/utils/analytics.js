/**
 * Google Analytics GA4 utility
 * Tracks page views and custom events throughout the app
 */

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'REPLACE_WITH_YOUR_GA_ID'

/**
 * Send a page view event to GA4
 * Called on every route change
 */
export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', GA_ID, {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  })
}

/**
 * Send a custom event to GA4
 * @param {string} eventName - e.g. 'food_donated', 'food_requested', 'user_registered'
 * @param {object} params - additional event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', eventName, params)
}

// Predefined event helpers for FoodBridge actions
export const Analytics = {
  // User events
  userRegistered: (role) => trackEvent('user_registered', { role }),
  userLoggedIn: (role) => trackEvent('user_logged_in', { role }),
  userLoggedOut: () => trackEvent('user_logged_out'),

  // Food events
  foodDonated: (foodName) => trackEvent('food_donated', { food_name: foodName }),
  foodRequested: (foodName) => trackEvent('food_requested', { food_name: foodName }),
  foodDelivered: (foodName) => trackEvent('food_delivered', { food_name: foodName }),

  // Page events
  pageView: (path, title) => trackPageView(path, title),
}
