import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

type Listener = () => void

let session: Session | null = null
let ready = false
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener())
}

function setSession(next: Session | null) {
  session = next
  ready = true
  notify()
}

if (supabase) {
  void supabase.auth.getSession().then(({ data }) => {
    setSession(data.session)
  })

  supabase.auth.onAuthStateChange((_event, next) => {
    setSession(next)
  })
} else {
  ready = true
}

export function subscribeAuth(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getAuthReadySnapshot() {
  return ready
}

export function getAuthSnapshot() {
  return Boolean(session)
}

export function getAuthUserSnapshot(): User | null {
  return session?.user ?? null
}

export type LoginResult = { ok: true } | { ok: false; message: string }

export async function login(
  email: string,
  password: string,
): Promise<LoginResult> {
  if (!supabase || !isSupabaseConfigured) {
    return {
      ok: false,
      message:
        'Supabase no está configurado. Añade VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.',
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    return { ok: false, message: mapAuthError(error.message) }
  }

  return { ok: true }
}

export async function logout() {
  if (!supabase) {
    setSession(null)
    return
  }
  await supabase.auth.signOut()
}

function mapAuthError(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes('invalid login credentials')) {
    return 'Correo o contraseña incorrectos'
  }
  if (lower.includes('email not confirmed')) {
    return 'Confirma el correo antes de entrar'
  }
  return message
}
