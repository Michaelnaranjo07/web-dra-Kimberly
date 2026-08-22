import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSiteContent } from '@/hooks/use-site-content'
import { trackWhatsAppClick } from '@/lib/site'

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
  | { kind: 'mega'; label: string }

const navItems: NavItem[] = [
  { kind: 'hash', hash: 'inicio', label: 'Inicio' },
  { kind: 'mega', label: 'Servicios' },
  { kind: 'route', to: '/nosotros', label: 'Nosotros' },
  { kind: 'route', to: '/blog', label: 'Blog' },
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

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={[
        'h-3.5 w-3.5 transition-transform duration-200 ease-(--ease-out-strong)',
        open ? 'rotate-180' : '',
      ].join(' ')}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
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
  variant: _variant = 'over-hero',
}: SiteHeaderProps) {
  const { pathname } = useLocation()
  const { content } = useSiteContent()
  const onHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const megaTimer = useRef<number | null>(null)
  const services = content.services.items

  useLayoutEffect(() => {
    setOpen(false)
    setMegaOpen(false)
    setMobileServicesOpen(false)
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

  const openMega = () => {
    if (megaTimer.current) window.clearTimeout(megaTimer.current)
    setMegaOpen(true)
  }

  const closeMegaSoon = () => {
    if (megaTimer.current) window.clearTimeout(megaTimer.current)
    megaTimer.current = window.setTimeout(() => setMegaOpen(false), 120)
  }

  const navClass =
    'rounded-full px-3 py-2 text-sm font-medium text-muted transition-[color,background-color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper hover:text-ink active:scale-97'

  const mobileNavClass =
    'flex w-full items-center rounded-xl px-4 py-3.5 text-base font-semibold text-ink transition-[background-color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper active:scale-97'

  const bar = (
    <div className="relative mx-auto max-w-6xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-5 xl:max-w-7xl">
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
          {navItems.map((item) => {
            if (item.kind === 'mega') {
              return (
                <div
                  key="mega-servicios"
                  className="relative"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMegaSoon}
                >
                  <button
                    type="button"
                    className={[
                      navClass,
                      'inline-flex items-center gap-1',
                      megaOpen || pathname.startsWith('/servicios')
                        ? 'bg-paper text-ink'
                        : '',
                    ].join(' ')}
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onClick={() => setMegaOpen((value) => !value)}
                    onFocus={openMega}
                  >
                    {item.label}
                    <ChevronIcon open={megaOpen} />
                  </button>
                </div>
              )
            }
            if (item.kind === 'route') {
              return (
                <Link key={item.to} to={item.to} className={navClass}>
                  {item.label}
                </Link>
              )
            }
            return (
              <a key={item.hash} href={hashHref(item.hash)} className={navClass}>
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackWhatsAppClick('header')}
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

      {/* Megamenú desktop */}
      {megaOpen ? (
        <div
          className="pointer-events-auto absolute inset-x-4 top-full z-50 mt-2 hidden lg:block sm:inset-x-6"
          onMouseEnter={openMega}
          onMouseLeave={closeMegaSoon}
        >
          <div className="origin-top rounded-2xl border border-line/60 bg-white p-4 shadow-[0_18px_50px_rgba(21,26,36,0.12)] sm:p-5">
            <div className="mb-3 flex items-end justify-between gap-3 px-1">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                  Tratamientos
                </p>
                <p className="mt-1 text-sm text-muted">
                  Elige el que mejor encaja con lo que buscas.
                </p>
              </div>
              <Link
                to="/servicios"
                onClick={() => setMegaOpen(false)}
                className="shrink-0 text-sm font-semibold text-signal transition-colors hover:text-ink"
              >
                Ver todos →
              </Link>
            </div>
            <ul className="grid gap-1 sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/servicios/${service.slug}`}
                    onClick={() => setMegaOpen(false)}
                    className="group flex gap-3 rounded-xl p-3 transition-[background-color,transform] duration-150 ease-(--ease-out-strong) hover:bg-paper active:scale-97"
                  >
                    <img
                      src={service.imageUrl}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-lg object-cover"
                    />
                    <span className="min-w-0">
                      <span className="font-display block text-sm font-bold text-ink">
                        {service.title}
                      </span>
                      <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted">
                        {service.benefit}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {open ? (
        <div
          id="mobile-nav"
          className="pointer-events-auto absolute inset-x-4 top-full z-50 mt-2 lg:hidden sm:inset-x-6"
        >
          <button
            type="button"
            aria-label="Cerrar menú"
            className="fixed inset-0 z-40 bg-ink/40"
            onClick={close}
          />

          <div className="relative z-50 origin-top overflow-hidden rounded-2xl border border-line/60 bg-white shadow-[0_18px_50px_rgba(21,26,36,0.12)]">
            <nav className="flex flex-col gap-0.5 p-2" aria-label="Menú móvil">
              {navItems.map((item) => {
                if (item.kind === 'mega') {
                  return (
                    <div key="mobile-servicios">
                      <button
                        type="button"
                        className={[mobileNavClass, 'justify-between'].join(' ')}
                        aria-expanded={mobileServicesOpen}
                        onClick={() =>
                          setMobileServicesOpen((value) => !value)
                        }
                      >
                        {item.label}
                        <ChevronIcon open={mobileServicesOpen} />
                      </button>
                      {mobileServicesOpen ? (
                        <ul className="mb-1 ml-2 space-y-0.5 border-l border-line/80 pl-3">
                          <li>
                            <Link
                              to="/servicios"
                              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-signal"
                              onClick={close}
                            >
                              Ver todos
                            </Link>
                          </li>
                          {services.map((service) => (
                            <li key={service.id}>
                              <Link
                                to={`/servicios/${service.slug}`}
                                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-paper"
                                onClick={close}
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  )
                }
                if (item.kind === 'route') {
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={mobileNavClass}
                      onClick={close}
                    >
                      {item.label}
                    </Link>
                  )
                }
                return (
                  <a
                    key={item.hash}
                    href={hashHref(item.hash)}
                    className={mobileNavClass}
                    onClick={close}
                  >
                    {item.label}
                  </a>
                )
              })}
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
      ) : null}
    </div>
  )

  // Sin franja detrás del menú: el pill flota sobre la atmósfera de la página
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      {bar}
    </header>
  )
}
