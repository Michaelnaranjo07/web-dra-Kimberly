import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

export function NotFoundPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <Seo
        seo={{
          title: 'Página no encontrada — Clínica Dra. Kimberly Martinez',
          description:
            'La página que buscas no existe. Vuelve al inicio o agenda por WhatsApp.',
          keywords: 'odontología Bogotá, dra kimberly martinez',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/404"
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main className="atmosphere-paper">
        <div className="mx-auto max-w-2xl px-5 pt-28 pb-20 text-center sm:px-6 sm:pt-32 sm:pb-28">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
            Error 404
          </p>
          <h1 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Esta página no existe
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Puede que el enlace haya cambiado. Puedes volver al inicio, ver
            tratamientos o escribirnos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-bold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
            >
              Ir al inicio
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97"
            >
              Ver servicios
            </Link>
          </div>
        </div>
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
