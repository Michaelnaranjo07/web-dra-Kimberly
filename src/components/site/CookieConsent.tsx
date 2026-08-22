import { useSyncExternalStore } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  setCookieConsent,
  subscribeCookieConsent,
} from '@/lib/cookie-consent'

export function CookieConsent() {
  const { pathname } = useLocation()
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  )

  if (pathname.startsWith('/admin') || consent !== null) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-start p-4 sm:p-5"
    >
      <div className="pointer-events-auto w-full max-w-sm origin-bottom animate-[reveal-up_280ms_var(--ease-out-strong)_both] rounded-2xl border border-line/70 bg-white p-4 shadow-[0_18px_50px_rgba(21,26,36,0.14)] sm:p-5">
        <p className="font-display text-sm font-bold tracking-tight text-ink">
          Cookies
        </p>
        <p className="mt-1.5 text-sm leading-snug text-muted">
          Usamos cookies propias y de medición para mejorar el sitio.{' '}
          <Link
            to="/politica-de-privacidad"
            className="font-semibold text-signal transition-colors hover:text-ink"
          >
            Política de privacidad
          </Link>
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setCookieConsent('accepted')}
            className="inline-flex flex-1 items-center justify-center rounded-full bg-signal px-4 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:flex-none"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent('necessary')}
            className="inline-flex flex-1 items-center justify-center rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97 sm:flex-none"
          >
            Solo necesarias
          </button>
        </div>
      </div>
    </div>
  )
}
