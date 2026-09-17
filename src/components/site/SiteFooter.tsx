import { Link } from 'react-router-dom'
import type { FooterContent, VisitContent } from '@/content/types'
import { trackWhatsAppClick } from '@/lib/site'

type SiteFooterProps = {
  brand: string
  logoUrl: string
  visit: VisitContent
  footer: FooterContent
}

function isPlaceholder(value: string) {
  return !value || value.startsWith('[')
}

const linkClass =
  'transition-colors duration-150 hover:text-signal'

export function SiteFooter({ brand, logoUrl, visit, footer }: SiteFooterProps) {
  const mapsUrl = visit.googleReviewsUrl

  return (
    <footer className="border-t border-line bg-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 sm:py-11 md:grid-cols-[1.4fr_1fr_0.9fr] md:items-start md:gap-10 xl:max-w-7xl">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt={brand}
              className="h-10 w-auto object-contain"
            />
            <p className="font-display text-sm font-bold text-ink">{brand}</p>
          </div>
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex max-w-sm items-start gap-2 text-sm leading-relaxed text-muted transition-colors duration-150 hover:text-signal"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{footer.note}</span>
            </a>
          ) : (
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {footer.note}
            </p>
          )}
        </div>

        <div className="text-sm text-muted">
          <p className="font-semibold text-ink">Contacto</p>
          <div className="mt-3 space-y-1.5">
            {mapsUrl ? (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`block font-semibold text-ink ${linkClass}`}
              >
                {brand}
              </a>
            ) : (
              <p className="leading-relaxed">{visit.address}</p>
            )}
            {!isPlaceholder(visit.phone) ? (
              <a
                href={`tel:${visit.phone.replace(/\s/g, '')}`}
                className={`block ${linkClass}`}
              >
                {visit.phone}
              </a>
            ) : null}
            {!isPlaceholder(visit.email) ? (
              <a
                href={`mailto:${visit.email}`}
                className={`block ${linkClass}`}
              >
                {visit.email}
              </a>
            ) : null}
            <a
              href={visit.instagram}
              target="_blank"
              rel="noreferrer"
              className={`block ${linkClass}`}
            >
              {visit.instagramHandle}
            </a>
          </div>
        </div>

        <div className="text-sm text-muted">
          <p className="font-semibold text-ink">Enlaces</p>
          <nav
            aria-label="Pie de página"
            className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2"
          >
            <Link to="/servicios" className={linkClass}>
              Servicios
            </Link>
            <Link to="/nosotros" className={linkClass}>
              Nosotros
            </Link>
            <Link to="/blog" className={linkClass}>
              Blog
            </Link>
            <Link to="/opiniones" className={linkClass}>
              Opiniones
            </Link>
            <a
              href={visit.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('footer')}
              className={linkClass}
            >
              WhatsApp
            </a>
            <Link to={footer.privacyHref} className={linkClass}>
              {footer.privacyLabel}
            </Link>
            <Link to={footer.termsHref} className={linkClass}>
              {footer.termsLabel}
            </Link>
          </nav>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 xl:max-w-7xl">
          <p>
            © {new Date().getFullYear()} {brand}
          </p>
          <p>
            Hecha con{' '}
            <span className="text-ember" aria-hidden="true">
              ♥
            </span>{' '}
            por{' '}
            <a
              href="https://mordecaitech.com"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink transition-colors duration-150 hover:text-signal"
            >
              Mordecai Technologies LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
