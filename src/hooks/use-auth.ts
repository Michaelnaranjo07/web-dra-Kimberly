import { useSyncExternalStore } from 'react'
import {
  getAuthSnapshot,
  login,
  logout,
  subscribeAuth,
} from '@/lib/auth-store'

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => false,
  )

  return { isAuthenticated, login, logout }
}
