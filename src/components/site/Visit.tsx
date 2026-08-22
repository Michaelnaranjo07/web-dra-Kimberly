import type { VisitContent } from '@/content/types'

type VisitProps = {
  visit: VisitContent
  whatsappUrl: string
}

export function Visit({ visit, whatsappUrl }: VisitProps) {
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
                <p className="mt-2 font-semibold text-ink">{visit.phone}</p>
              ) : null}
              {visit.email && !visit.email.startsWith('[') ? (
                <p className="mt-1 font-semibold text-ink">{visit.email}</p>
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

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong-ink active:scale-97 sm:w-auto"
            >
              Coordinar por WhatsApp
            </a>
          </div>

          <div className="scroll-reveal overflow-hidden rounded-2xl border border-line/60 surface-soft">
            <iframe
              title={`Mapa: ${visit.address}`}
              src={visit.mapEmbedUrl}
              className="h-60 w-full border-0 sm:h-full sm:min-h-90"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
