import { useSyncExternalStore } from 'react'
import {
  getAuthReadySnapshot,
  getAuthSnapshot,
  getAuthUserSnapshot,
  login,
  logout,
  subscribeAuth,
} from '@/lib/auth-store'

export function useAuth() {
  const isReady = useSyncExternalStore(
    subscribeAuth,
    getAuthReadySnapshot,
    () => false,
  )
  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => false,
  )
  const user = useSyncExternalStore(
    subscribeAuth,
    getAuthUserSnapshot,
    () => null,
  )

  return { isReady, isAuthenticated, user, login, logout }
}
