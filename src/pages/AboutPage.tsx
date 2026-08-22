import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { PersonJsonLd } from '@/components/PersonJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'
import { trackWhatsAppClick } from '@/lib/site'

export function AboutPage() {
  const { content } = useSiteContent()
  const { about, trust } = content
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <Seo
        seo={{
          title: 'Dra. Kimberly Martínez — Odontóloga en Perdomo',
          description: about.intro,
          keywords:
            'Dra. Kimberly Martínez, odontóloga Bogotá, Perdomo, odontología gestantes, RETHUS',
          ogImage: about.imageUrl || content.seo.ogImage,
        }}
        canonicalPath="/nosotros"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Nosotros', path: '/nosotros' },
        ]}
      />
      <PersonJsonLd about={about} brand={content.hero.brand} />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <section className="atmosphere-paper border-b border-line/50">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 pt-24 pb-10 sm:gap-10 sm:px-6 sm:pt-28 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center xl:max-w-7xl">
            <div className="min-w-0">
              <nav className="text-sm text-muted" aria-label="Migas de pan">
                <Link to="/" className="transition-colors hover:text-signal">
                  Inicio
                </Link>
                <span className="mx-2 text-line">/</span>
                <span className="text-ink">Nosotros</span>
              </nav>

              <p className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-signal uppercase sm:mt-6">
                El consultorio
              </p>
              <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">
                {about.title}
              </h1>
              <p className="mt-3 text-base font-semibold text-ink/85 sm:mt-4 sm:text-lg">
                {about.specialty}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {about.intro}
              </p>
              <div className="mt-7 flex w-full flex-col gap-2.5 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick('nosotros')}
                  className="inline-flex w-full items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
                >
                  Agendar por WhatsApp
                </a>
                <Link
                  to="/servicios"
                  className="inline-flex w-full items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97 sm:w-auto"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            <div className="surface-soft order-first overflow-hidden rounded-[1.25rem] bg-fog ring-1 ring-black/5 sm:rounded-[1.75rem] lg:order-0">
              <img
                src={about.imageUrl}
                alt={about.imageAlt}
                className="aspect-4/3 w-full object-cover object-top sm:aspect-5/4"
              />
            </div>
          </div>
        </section>

        <section className="bg-bg">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] xl:max-w-7xl">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                Trayectoria
              </p>
              <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                Quién te atiende
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {about.bio}
              </p>
              <p className="mt-6 text-base font-semibold text-ink">
                {about.formation}
              </p>
              {about.university ? (
                <p className="mt-3 text-sm text-muted">
                  Formación: {about.university}
                </p>
              ) : null}
            </div>

            <div className="surface-soft rounded-2xl border border-line/60 bg-paper p-6 sm:p-7">
              <p className="font-display text-sm font-bold tracking-tight text-ink">
                Credenciales
              </p>
              <ul className="mt-5 space-y-4">
                {trust.credentials.map((item) => (
                  <li key={item.id}>
                    <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {item.value}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                {about.credentialsNote}
              </p>
              <p className="mt-3 text-sm text-muted">
                RETHUS: {about.rethus}. La verificación oficial se confirma en
                consultorio.
              </p>
            </div>
          </div>
        </section>

        <section className="atmosphere-paper border-t border-line/50">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-14 xl:max-w-7xl">
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
                Más sobre el consultorio
              </h2>
              <p className="mt-2 text-sm text-muted">
                Lee opiniones de pacientes o explora los tratamientos.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link
                to="/opiniones"
                className="inline-flex items-center justify-center rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97"
              >
                Ver opiniones
              </Link>
              <Link
                to="/servicios"
                className="inline-flex items-center justify-center rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
              >
                Ir a servicios
              </Link>
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
