import type { FooterContent, VisitContent } from '@/content/types'

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
            <p className="font-display text-sm font-bold text-ink">
              Dra. Kimberly Martínez
            </p>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {footer.note}
          </p>
        </div>

        <div className="text-sm text-muted">
          <p className="font-semibold text-ink">Contacto</p>
          <div className="mt-3 space-y-1.5">
            <p className="leading-relaxed">{visit.address}</p>
            {!isPlaceholder(visit.phone) ? <p>{visit.phone}</p> : null}
            {!isPlaceholder(visit.email) ? <p>{visit.email}</p> : null}
            <a
              href={visit.instagram}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex ${linkClass}`}
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
            <a href="/servicios" className={linkClass}>
              Servicios
            </a>
            <a
              href={visit.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className={linkClass}
            >
              WhatsApp
            </a>
            <a href={footer.privacyHref} className={linkClass}>
              {footer.privacyLabel}
            </a>
            <a href={footer.termsHref} className={linkClass}>
              {footer.termsLabel}
            </a>
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
