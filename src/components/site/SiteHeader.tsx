import { useLayoutEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SiteHeaderProps = {
  brand: string
  logoUrl: string
  whatsappUrl: string
  /** over-hero: absolute on home hero; solid: sticky bar on inner pages */
  variant?: 'over-hero' | 'solid'
}

type NavItem =
  | { kind: 'route'; to: string; label: string }
  | { kind: 'hash'; hash: string; label: string }

const navItems: NavItem[] = [
  { kind: 'hash', hash: 'inicio', label: 'Inicio' },
  { kind: 'hash', hash: 'recorrido', label: 'Recorrido' },
  { kind: 'route', to: '/servicios', label: 'Servicios' },
  { kind: 'hash', hash: 'confianza', label: 'Nosotros' },
  { kind: 'hash', hash: 'voces', label: 'Pacientes' },
  { kind: 'hash', hash: 'visita', label: 'Contacto' },
]

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16" strokeLinecap="round" />
          <path d="M4 12h16" strokeLinecap="round" />
          <path d="M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export function SiteHeader({
  brand,
  logoUrl,
  whatsappUrl,
  variant = 'over-hero',
}: SiteHeaderProps) {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)

  useLayoutEffect(() => {
    setOpen(false)
  }, [pathname])

  useLayoutEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const hashHref = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`)

  const close = () => setOpen(false)

  const navClass =
    'rounded-full px-3 py-2 text-sm font-medium text-muted transition-[color,background-color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper hover:text-ink active:scale-97'

  const mobileNavClass =
    'flex w-full items-center rounded-xl px-4 py-3.5 text-base font-semibold text-ink transition-[background-color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper active:scale-97'

  const bar = (
    <div className="mx-auto max-w-6xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5 xl:max-w-7xl">
      <div className="surface-soft pointer-events-auto relative z-50 flex items-center justify-between gap-2 rounded-full border border-line/60 bg-white px-2.5 py-2 sm:gap-3 sm:px-4 sm:py-2.5">
        <Link
          to="/"
          onClick={close}
          className="flex min-w-0 items-center gap-2 pl-1 sm:gap-2.5"
        >
          <img
            src={logoUrl}
            alt={brand}
            className="h-8 w-auto object-contain sm:h-10"
          />
          <span className="hidden truncate font-display text-sm font-bold tracking-tight text-ink min-[380px]:inline sm:text-[0.95rem]">
            Dra. Kimberly Martínez
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Principal">
          {navItems.map((item) =>
            item.kind === 'route' ? (
              <Link key={item.to} to={item.to} className={navClass}>
                {item.label}
              </Link>
            ) : (
              <a key={item.hash} href={hashHref(item.hash)} className={navClass}>
                {item.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-signal px-3 py-2 text-xs font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar cita</span>
            <span className="hidden sm:inline">
              <ArrowIcon />
            </span>
          </a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-[background-color,transform] duration-150 ease-out-strong hover:bg-paper active:scale-97 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {/* Panel móvil */}
      <div
        id="mobile-nav"
        className={[
          'pointer-events-auto lg:hidden',
          open ? 'visible' : 'invisible',
        ].join(' ')}
      >
        {open ? (
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={close}
          />
        ) : null}

        <div
          className={[
            'relative z-50 mt-2 origin-top overflow-hidden rounded-2xl border border-line/60 bg-white shadow-[0_18px_50px_rgba(21,26,36,0.12)] transition-[opacity,transform] duration-200 ease-out-strong',
            open
              ? 'translate-y-0 scale-100 opacity-100'
              : 'pointer-events-none -translate-y-1 scale-[0.98] opacity-0',
          ].join(' ')}
        >
          <nav className="flex flex-col gap-0.5 p-2" aria-label="Menú móvil">
            {navItems.map((item) =>
              item.kind === 'route' ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={mobileNavClass}
                  onClick={close}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.hash}
                  href={hashHref(item.hash)}
                  className={mobileNavClass}
                  onClick={close}
                >
                  {item.label}
                </a>
              ),
            )}
          </nav>
          <div className="border-t border-line p-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
              onClick={close}
            >
              Agendar por WhatsApp
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  if (variant === 'solid') {
    return (
      <header className="sticky top-0 z-40 border-b border-line/40 bg-bg/90 backdrop-blur-md">
        <div className="pb-3">{bar}</div>
      </header>
    )
  }

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      {bar}
    </header>
  )
}
