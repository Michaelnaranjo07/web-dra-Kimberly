import { Link } from 'react-router-dom'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { FinalCta } from '@/components/site/FinalCta'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'
import { trackWhatsAppClick } from '@/lib/site'

export function ServicesIndexPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <Seo
        seo={{
          title: 'Servicios odontológicos en Bogotá — Dra. Kimberly Martínez',
          description:
            'Ortodoncia, blanqueamiento, prótesis, endodoncia y odontología para gestantes en Barrio Perdomo, Bogotá. Agenda con la Dra. Kimberly Martínez.',
          keywords:
            'servicios odontológicos Bogotá, ortodoncia, blanqueamiento, prótesis, endodoncia, odontología gestantes, Perdomo',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/servicios"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
        ]}
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <section className="atmosphere-paper">
          <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 sm:py-16 xl:max-w-7xl">
            <nav className="text-sm text-muted" aria-label="Migas de pan">
              <Link to="/" className="transition-colors hover:text-signal">
                Inicio
              </Link>
              <span className="mx-2 text-line">/</span>
              <span className="text-ink">Servicios</span>
            </nav>

            <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                  {content.services.eyebrow}
                </p>
                <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  {content.services.title}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {content.services.intro}
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick('servicios_index')}
                className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
              >
                {content.services.ctaLabel}
              </a>
            </div>

            <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {content.services.items.map((item, index) => {
                const featured = item.slug === 'odontologia-gestantes'
                return (
                  <li key={item.id}>
                    <Link
                      to={`/servicios/${item.slug}`}
                      className={[
                        'group block overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow] duration-200 ease-out-strong',
                        featured
                          ? 'surface-lift border-signal/20'
                          : 'surface-soft border-line/60',
                      ].join(' ')}
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-fog">
                        <img
                          src={item.imageUrl}
                          alt={item.imageAlt}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out-strongs group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-signal font-display text-xs font-bold text-white tabular-nums">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="p-5 sm:p-6">
                        <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                          {item.title}
                        </h2>
                        <p className="mt-2 text-sm font-semibold text-ink/80">
                          {item.benefit}
                        </p>
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                          {item.description}
                        </p>
                        {featured ? (
                          <p className="mt-3 text-[11px] font-semibold tracking-[0.14em] text-ember uppercase">
                            Diferenciador del consultorio
                          </p>
                        ) : null}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors duration-150 group-hover:text-ink">
                          Ver servicio
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
        <FinalCta finalCta={content.finalCta} whatsappUrl={whatsappUrl} />
      </main>
      <SiteFooter
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        visit={content.visit}
        footer={content.footer}
      />
    </>
  )
}
