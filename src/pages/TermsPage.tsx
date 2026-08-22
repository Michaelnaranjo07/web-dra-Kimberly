import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

export function TermsPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <Seo
        seo={{
          title: 'Términos y condiciones — Dra. Kimberly Martínez',
          description:
            'Términos de uso del sitio web del consultorio de la Dra. Kimberly Martínez en Barrio Perdomo, Bogotá. Contenido informativo, no contrato médico.',
          keywords:
            'términos y condiciones, sitio web odontológico, Dra. Kimberly Martínez, Bogotá',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/terminos-y-condiciones"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Términos y condiciones', path: '/terminos-y-condiciones' },
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
          <div className="mx-auto max-w-3xl px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16">
            <nav className="text-sm text-muted" aria-label="Migas de pan">
              <Link to="/" className="transition-colors hover:text-signal">
                Inicio
              </Link>
              <span className="mx-2 text-line">/</span>
              <span className="text-ink">Términos y condiciones</span>
            </nav>

            <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
              Uso del sitio
            </p>
            <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
              Términos y condiciones
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Estos términos regulan el uso del sitio web del consultorio de la
              Dra. Kimberly Martínez. No constituyen un contrato de prestación
              de servicios médicos ni sustituyen la relación clínica en
              consultorio.
            </p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  1. Objeto
                </h2>
                <p className="mt-3">
                  El sitio ofrece información general sobre el consultorio,
                  servicios, ubicación y canales de contacto. Al navegarlo,
                  usted acepta estos términos.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  2. Contenido informativo
                </h2>
                <p className="mt-3">
                  Textos, descripciones de tratamientos, artículos del blog y
                  testimonios tienen carácter informativo y educativo. No
                  reemplazan una valoración profesional personalizada.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  3. Valoración profesional
                </h2>
                <p className="mt-3">
                  Cualquier plan de tratamiento, indicación o decisión clínica
                  requiere evaluación presencial (o el medio que el consultorio
                  determine) por personal calificado. La agenda por WhatsApp u
                  otros canales no implica aceptación automática de un
                  tratamiento concreto.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  4. Resultados no garantizados
                </h2>
                <p className="mt-3">
                  Los resultados odontológicos dependen de cada caso clínico,
                  hábitos, anatomía y adherencia al plan. El sitio no promete
                  resultados específicos ni plazos fijos.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  5. Propiedad intelectual
                </h2>
                <p className="mt-3">
                  Textos, imágenes, marca y materiales del sitio pertenecen al
                  consultorio o a sus titulares. Queda prohibida su reproducción
                  no autorizada con fines comerciales.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  6. Enlaces externos
                </h2>
                <p className="mt-3">
                  Enlaces a Google, redes sociales u otros sitios son de
                  referencia. No controlamos el contenido de terceros ni su
                  política de privacidad.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  7. Contacto
                </h2>
                <p className="mt-3">
                  Para dudas sobre estos términos, use los canales publicados en
                  la sección de visita del sitio o escriba por{' '}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-signal transition-colors hover:text-ink"
                  >
                    WhatsApp
                  </a>
                  . También puede revisar la{' '}
                  <Link
                    to="/politica-de-privacidad"
                    className="font-semibold text-signal transition-colors hover:text-ink"
                  >
                    política de privacidad
                  </Link>
                  .
                </p>
              </section>
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
