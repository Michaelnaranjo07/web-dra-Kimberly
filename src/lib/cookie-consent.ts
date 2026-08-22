const STORAGE_KEY = 'dra-kimberly-cookie-consent'

export type CookieConsentValue = 'accepted' | 'necessary'

type Listener = () => void

const listeners = new Set<Listener>()

function readStored(): CookieConsentValue | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'accepted' || raw === 'necessary') return raw
  } catch {
    /* private mode / blocked storage */
  }
  return null
}

let consent: CookieConsentValue | null =
  typeof window !== 'undefined' ? readStored() : null

function notify() {
  listeners.forEach((listener) => listener())
}

export function subscribeCookieConsent(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getCookieConsentSnapshot() {
  return consent
}

export function getCookieConsentServerSnapshot(): CookieConsentValue | null {
  return null
}

export function setCookieConsent(value: CookieConsentValue) {
  consent = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* ignore */
  }
  notify()
}
