const AUTH_KEY = 'dra-kimberly:auth'
const DEFAULT_PASSWORD = 'kimberly-admin'

type Listener = () => void

let memoryAuth: boolean | null = null
const listeners = new Set<Listener>()

function getExpectedPassword() {
  return import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_PASSWORD
}

function readAuth(): boolean {
  if (memoryAuth !== null) return memoryAuth
  try {
    memoryAuth = sessionStorage.getItem(AUTH_KEY) === '1'
    return memoryAuth
  } catch {
    memoryAuth = false
    return false
  }
}

function writeAuth(value: boolean) {
  memoryAuth = value
  if (value) sessionStorage.setItem(AUTH_KEY, '1')
  else sessionStorage.removeItem(AUTH_KEY)
  listeners.forEach((listener) => listener())
}

export function getAuthSnapshot() {
  if (typeof window === 'undefined') return false
  return readAuth()
}

export function subscribeAuth(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function login(password: string) {
  if (password !== getExpectedPassword()) return false
  writeAuth(true)
  return true
}

export function logout() {
  writeAuth(false)
}
