import { useState } from 'react'
import type { VisitContent } from '@/content/types'
import { trackWhatsAppClick } from '@/lib/site'

type VisitProps = {
  visit: VisitContent
  whatsappUrl: string
}

type MapView = 'map' | 'facade'

export function Visit({ visit, whatsappUrl }: VisitProps) {
  const [view, setView] = useState<MapView>('map')
  const showFacade = view === 'facade' && Boolean(visit.facadeImageUrl)

  return (
    <section id="visita" className="bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-24 xl:max-w-7xl">
        <div className="scroll-reveal grid gap-4 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
          <p className="max-w-sm text-sm leading-relaxed text-muted">{visit.intro}</p>
          <div className="lg:text-right">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
              Ubicación
            </p>
            <h2 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl">
              {visit.title}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="scroll-reveal space-y-6 rounded-2xl border border-line/60 bg-white p-5 surface-soft sm:p-8">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                Dirección
              </p>
              <p className="mt-2 text-sm font-semibold text-ink sm:text-base">
                {visit.address}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                Horarios
              </p>
              <p className="mt-2 text-sm font-semibold text-ink sm:text-base">
                {visit.hours}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase">
                Contacto
              </p>
              {visit.phone && !visit.phone.startsWith('[') ? (
                <a
                  href={`tel:${visit.phone.replace(/\s/g, '')}`}
                  className="mt-2 block font-semibold text-ink transition-colors hover:text-signal"
                >
                  {visit.phone}
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  Teléfono: agrégalo en el contenido para completar NAP y schema.
                </p>
              )}
              {visit.email && !visit.email.startsWith('[') ? (
                <a
                  href={`mailto:${visit.email}`}
                  className="mt-1 block font-semibold text-ink transition-colors hover:text-signal"
                >
                  {visit.email}
                </a>
              ) : null}
              <a
                href={visit.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex font-semibold text-ink transition-colors duration-150 hover:text-signal"
              >
                {visit.instagramHandle}
              </a>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick('visit')}
                className="inline-flex w-full items-center justify-center rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
              >
                Coordinar por WhatsApp
              </a>
              {visit.googleReviewsUrl ? (
                <a
                  href={visit.googleReviewsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-line bg-white px-5 py-3.5 text-sm font-semibold text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97 sm:w-auto"
                >
                  Ver en Google
                </a>
              ) : null}
            </div>
          </div>

          <div className="scroll-reveal overflow-hidden rounded-2xl border border-line/60 bg-white surface-soft">
            <div className="flex items-center justify-between gap-3 border-b border-line/50 px-4 py-3 sm:px-5">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                {showFacade ? 'Fachada' : 'Mapa'}
              </p>
              <div
                className="inline-flex rounded-full border border-line/70 bg-paper p-0.5"
                role="group"
                aria-label="Cambiar entre mapa y fachada"
              >
                <button
                  type="button"
                  aria-pressed={view === 'map'}
                  onClick={() => setView('map')}
                  className={[
                    'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-[transform,background-color,color] duration-150 ease-out-strong active:scale-97',
                    view === 'map'
                      ? 'bg-signal text-white'
                      : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  Mapa
                </button>
                <button
                  type="button"
                  aria-pressed={view === 'facade'}
                  onClick={() => setView('facade')}
                  className={[
                    'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-[transform,background-color,color] duration-150 ease-out-strong active:scale-97',
                    view === 'facade'
                      ? 'bg-signal text-white'
                      : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  Fachada
                </button>
              </div>
            </div>

            <div className="relative h-60 bg-fog sm:h-full sm:min-h-90">
              {showFacade ? (
                <img
                  src={visit.facadeImageUrl}
                  alt={visit.facadeImageAlt}
                  className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
                />
              ) : (
                <iframe
                  title={`Mapa: ${visit.address}`}
                  src={visit.mapEmbedUrl}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
