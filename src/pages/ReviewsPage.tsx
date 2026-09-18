import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { TestimonialsCarousel } from '@/components/site/TestimonialsCarousel'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

export function ReviewsPage() {
  const { content } = useSiteContent()
  const { reviews, testimonials } = content
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`
  const googleUrl = reviews.googleUrl || content.visit.googleReviewsUrl

  return (
    <>
      <Seo
        seo={{
          title: `${reviews.title} — Clínica Dra. Kimberly Martinez`,
          description: reviews.intro,
          keywords:
            'opiniones odontólogo Bogotá, reseñas Clínica Dra. Kimberly Martinez, pacientes Perdomo',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/opiniones"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Opiniones', path: '/opiniones' },
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
          <div className="mx-auto max-w-6xl px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16 xl:max-w-7xl">
            <nav className="text-sm text-muted" aria-label="Migas de pan">
              <Link to="/" className="transition-colors hover:text-signal">
                Inicio
              </Link>
              <span className="mx-2 text-line">/</span>
              <span className="text-ink">Opiniones</span>
            </nav>

            <div className="mt-6 flex flex-col gap-5 sm:mt-8 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                  Pacientes felices
                </p>
                <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  {reviews.title}
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {reviews.intro}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                  Aquí compartimos pacientes reales de la clínica. En Google
                  encontrarás más reseñas y podrás dejar la tuya.
                </p>
              </div>
              <a
                href={googleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
              >
                {reviews.ctaLabel}
              </a>
            </div>

            <TestimonialsCarousel
              items={testimonials.items}
              cardBorderClass="border-line/60"
            />

            <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-line/60 bg-white p-6 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
                  ¿Quieres ver más reseñas?
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Abre el perfil en Google para leer opiniones completas y
                  compartir tu experiencia.
                </p>
              </div>
              <a
                href={googleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-signal active:scale-97 sm:w-auto"
              >
                {reviews.ctaLabel} →
              </a>
            </div>
          </div>
        </section>
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
