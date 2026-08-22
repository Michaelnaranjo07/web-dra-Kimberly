import { Link, Navigate, useParams } from 'react-router-dom'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { FinalCta } from '@/components/site/FinalCta'
import { ServiceFaq } from '@/components/site/ServiceFaq'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Seo } from '@/components/Seo'
import { ServiceJsonLd } from '@/components/ServiceJsonLd'
import { useSiteContent } from '@/hooks/use-site-content'
import { trackWhatsAppClick } from '@/lib/site'

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-signal"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M4 10.5l4 4L16 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>()
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  const service = content.services.items.find((item) => item.slug === slug)
  if (!service) {
    return <Navigate to="/servicios" replace />
  }

  const related = content.services.items.filter((item) => item.id !== service.id)
  const path = `/servicios/${service.slug}`
  const absoluteUrl =
    typeof window !== 'undefined' ? `${window.location.origin}${path}` : path

  const featured = service.slug === 'odontologia-gestantes'

  return (
    <>
      <Seo
        seo={{
          title: service.seoTitle,
          description: service.seoDescription,
          keywords: service.seoKeywords,
          ogImage: service.imageUrl,
        }}
        canonicalPath={path}
      />
      <ServiceJsonLd
        service={service}
        content={content}
        url={absoluteUrl}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
          { name: service.title, path },
        ]}
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <section className="atmosphere-paper border-b border-line/50">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:max-w-7xl">
            <div className="min-w-0">
              <nav
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
                aria-label="Migas de pan"
              >
                <Link to="/" className="transition-colors hover:text-signal">
                  Inicio
                </Link>
                <span className="text-line">/</span>
                <Link
                  to="/servicios"
                  className="transition-colors hover:text-signal"
                >
                  Servicios
                </Link>
                <span className="text-line">/</span>
                <span className="truncate text-ink">{service.title}</span>
              </nav>

              <p className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-signal uppercase sm:mt-6">
                Servicio
              </p>
              <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                {service.title}
              </h1>
              <p className="mt-3 text-base font-semibold text-ink/85 sm:mt-4 sm:text-lg">
                {service.benefit}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {service.description}
              </p>
              {featured ? (
                <p className="mt-4 text-[11px] font-semibold tracking-[0.14em] text-ember uppercase">
                  Diferenciador del consultorio
                </p>
              ) : null}
              <div className="mt-7 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick(`servicio_${service.slug}`)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
                >
                  Agendar valoración
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex w-full items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97 sm:w-auto"
                >
                  Ver todos los servicios
                </Link>
              </div>
            </div>

            <div className="surface-soft order-first overflow-hidden rounded-[1.25rem] bg-fog ring-1 ring-black/5 sm:rounded-[1.75rem] lg:order-0">
              <img
                src={service.imageUrl}
                alt={service.imageAlt}
                className="aspect-4/3 w-full object-cover sm:aspect-5/4"
              />
            </div>
          </div>
        </section>

        <section className="bg-bg">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] xl:max-w-7xl">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                En el consultorio
              </p>
              <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Cómo te acompañamos
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {service.pageBody}
              </p>
              <p className="mt-6 text-base font-semibold text-ink">
                {service.audience}
              </p>
            </div>

            <div className="surface-soft rounded-2xl border border-line/60 bg-paper p-6 sm:p-7">
              <p className="font-display text-sm font-bold tracking-tight text-ink">
                Qué puedes esperar
              </p>
              <ul className="mt-5 space-y-3">
                {service.highlights.map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/10">
                      <CheckIcon />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick(`servicio_sidebar_${service.slug}`)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
              >
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {service.faqs?.length ? (
          <section className="border-t border-line/50 bg-bg">
            <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
              <ServiceFaq faqs={service.faqs} />
            </div>
          </section>
        ) : null}

        <section className="atmosphere-paper border-t border-line/50">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16 xl:max-w-7xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                  Más tratamientos
                </p>
                <h2 className="font-display mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                  Otros servicios del consultorio
                </h2>
              </div>
              <Link
                to="/servicios"
                className="text-sm font-semibold text-signal transition-colors hover:text-ink"
              >
                Ver todos →
              </Link>
            </div>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/servicios/${item.slug}`}
                    className="group surface-soft block overflow-hidden rounded-2xl border border-line/60 bg-white transition-[transform,box-shadow] duration-200 ease-out-strong hover:shadow-md active:scale-[0.99]"
                  >
                    <div className="aspect-4/3 overflow-hidden bg-fog">
                      <img
                        src={item.imageUrl}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-base font-bold text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted">
                        {item.benefit}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
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
