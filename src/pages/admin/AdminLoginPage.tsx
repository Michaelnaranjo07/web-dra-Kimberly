import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { useAuth } from '@/hooks/use-auth'
import { isSupabaseConfigured } from '@/lib/supabase'

export function AdminLoginPage() {
  const { isReady, isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  if (!isReady) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
        <p className="text-sm text-muted">Cargando sesión…</p>
      </div>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    const result = await login(email, password)
    setPending(false)
    if (!result.ok) {
      setError(result.message)
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
      <p className="font-display text-3xl font-extrabold tracking-tight text-ink">
        Admin
      </p>
      <p className="mt-2 text-sm text-muted">
        Accede con tu usuario de Supabase Auth.
      </p>

      {!isSupabaseConfigured ? (
        <p className="mt-6 rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-muted">
          Falta configurar <code className="text-ink">VITE_SUPABASE_URL</code> y{' '}
          <code className="text-ink">VITE_SUPABASE_ANON_KEY</code> en el entorno.
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <Field label="Correo">
          <TextInput
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
            required
          />
        </Field>
        <Field label="Contraseña">
          <TextInput
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              setError('')
            }}
            required
          />
        </Field>
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </div>
  )
}
