import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/use-auth'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-xl px-3 py-2.5 text-sm font-semibold transition-[background-color,color,transform] duration-150 ease-(--ease-out-strong) active:scale-97',
    isActive
      ? 'bg-signal text-white'
      : 'text-muted hover:bg-paper hover:text-ink',
  ].join(' ')

const nav = [
  { to: '/admin', label: 'Inicio', end: true },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/admin/pagos', label: 'Métodos de pago' },
  { to: '/admin/testimonios', label: 'Testimonios' },
  { to: '/admin/analytics', label: 'Analytics' },
]

export function AdminShell() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-dvh bg-paper">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
              Panel Dra. Kimberly
            </p>
            <p className="text-xs text-muted">
              Blog · Pagos · Testimonios · Analytics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-3 py-2 text-sm font-semibold text-muted transition-[background-color,color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper hover:text-ink active:scale-97"
            >
              Ver sitio
            </a>
            <Button variant="ghost" onClick={logout} className="!py-2 !px-4">
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-[220px_1fr]">
        <nav
          className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:pb-0"
          aria-label="Admin"
        >
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={linkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
