import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

export function PrivacyPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`
  const email = content.visit.email || 'consultar en la clínica'
  const address = content.visit.address || 'Barrio Perdomo, Bogotá'
  const whatsapp = content.visit.whatsapp || whatsappUrl

  return (
    <>
      <Seo
        seo={{
          title: 'Política de privacidad — Clínica Dra. Kimberly Martinez',
          description:
            'Tratamiento de datos personales conforme a la Ley 1581 de 2012 (habeas data) en el Clínica Dra. Kimberly Martinez, Barrio Perdomo, Bogotá.',
          keywords:
            'política de privacidad, habeas data, Ley 1581, odontología Bogotá, Clínica Dra. Kimberly Martinez',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/politica-de-privacidad"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Política de privacidad', path: '/politica-de-privacidad' },
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
              <span className="text-ink">Política de privacidad</span>
            </nav>

            <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
              Habeas data
            </p>
            <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
              Política de privacidad
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              En cumplimiento de la Ley 1581 de 2012 y demás normas aplicables en
              Colombia sobre protección de datos personales, informamos cómo
              tratamos la información de pacientes y visitantes del sitio.
            </p>

            <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-muted sm:text-base">
              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  1. Responsable del tratamiento
                </h2>
                <p className="mt-3">
                  El responsable del tratamiento de datos personales es la{' '}
                  <strong className="font-semibold text-ink">
                    Clínica Dra. Kimberly Martinez
                  </strong>
                  , ubicada en {address}. Canales de contacto: correo {email};
                  WhatsApp {whatsapp}.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  2. Datos que podemos recopilar
                </h2>
                <p className="mt-3">
                  Según la interacción (sitio web, WhatsApp, llamada o atención
                  en la clínica), podemos tratar datos de identificación y
                  contacto (nombre, teléfono, correo), datos de ubicación
                  relativos a la cita, y datos de salud bucal necesarios para la
                  valoración y el tratamiento clínico, cuando usted los aporta o
                  se generan en el marco de la atención odontológica.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  3. Finalidad del tratamiento
                </h2>
                <p className="mt-3">
                  Los datos se usan para agendar y confirmar citas, prestar
                  servicios odontológicos, dar seguimiento clínico, responder
                  consultas y, cuando corresponda, cumplir obligaciones legales
                  o de historia clínica. No comercializamos sus datos a terceros
                  con fines publicitarios.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  4. Cookies y analítica
                </h2>
                <p className="mt-3">
                  El sitio puede usar cookies técnicas necesarias para su
                  funcionamiento y, solo si usted las acepta, cookies de
                  medición (por ejemplo Google Analytics o Tag Manager) para
                  entender el uso del sitio de forma agregada. Puede elegir
                  “Solo necesarias” en el aviso de cookies; en ese caso no
                  cargamos scripts de analítica.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  5. Derechos ARCO y habeas data
                </h2>
                <p className="mt-3">
                  Usted puede ejercer los derechos de conocer, actualizar,
                  rectificar y solicitar la eliminación de sus datos personales,
                  así como revocar la autorización cuando proceda, conforme a la
                  Ley 1581 de 2012. Para ejercerlos, escríbanos a los canales
                  indicados arriba e indíquenos con claridad su solicitud.
                </p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold tracking-tight text-ink">
                  6. Contacto
                </h2>
                <p className="mt-3">
                  Para consultas sobre privacidad o habeas data:{' '}
                  {address}. Correo: {email}. WhatsApp:{' '}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-signal transition-colors hover:text-ink"
                  >
                    escribir a la clínica
                  </a>
                  .
                </p>
              </section>

              <p className="rounded-2xl border border-line/60 bg-white px-5 py-4 text-sm text-muted">
                Este texto es informativo y no constituye asesoría legal. La
                política puede actualizarse; la versión vigente se publica en
                esta página.
              </p>
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
