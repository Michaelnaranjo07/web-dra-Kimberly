export const SITE_URL =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '') ||
  'https://web-dra-kimberly.vercel.app'

export function absoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return SITE_URL
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_URL}${path}`
}

export function trackWhatsAppClick(label = 'whatsapp_cta') {
  if (typeof window === 'undefined') return
  const w = window as Window & {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({
    event: 'whatsapp_click',
    event_category: 'conversion',
    event_label: label,
  })
  if (typeof w.gtag === 'function') {
    w.gtag('event', 'whatsapp_click', {
      event_category: 'conversion',
      event_label: label,
    })
  }
}
