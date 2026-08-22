import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Field, TextInput } from '@/components/ui/Field'
import { useAuth } from '@/hooks/use-auth'

export function AdminLoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const ok = login(password)
    if (!ok) {
      setError('Contraseña incorrecta')
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-6">
      <p className="font-display text-3xl font-extrabold tracking-tight text-ink">Admin</p>
      <p className="mt-2 text-sm text-muted">
        Accede para blog, pagos, testimonios y analytics.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
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
        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>
    </div>
  )
}
