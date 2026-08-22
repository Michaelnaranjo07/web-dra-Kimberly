import { Link } from 'react-router-dom'
import type { ServicesContent } from '@/content/types'

type ServicesProps = {
  services: ServicesContent
}

export function Services({ services }: ServicesProps) {
  return (
    <section id="tratamientos" className="atmosphere-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-24 xl:max-w-7xl">
        <div className="scroll-reveal flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
              {services.eyebrow}
            </p>
            <h2 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {services.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {services.intro}
            </p>
          </div>
          <Link
            to="/servicios"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-signal px-5 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong-ink active:scale-97 sm:w-auto sm:self-start lg:self-auto"
          >
            Explorar servicios
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.items.map((item, index) => {
            const featured = item.slug === 'odontologia-gestantes'
            return (
              <li
                key={item.id}
                id={`servicio-${item.slug}`}
                className={[
                  'scroll-reveal group overflow-hidden rounded-2xl border bg-white transition-[transform,box-shadow] duration-200 ease-out-strong',
                  featured
                    ? 'surface-lift border-signal/20'
                    : 'surface-soft border-line/60',
                ].join(' ')}
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <Link to={`/servicios/${item.slug}`} className="block">
                  <div className="relative aspect-4/3 overflow-hidden bg-fog">
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-signal font-display text-xs font-bold text-white tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-xl font-bold tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-ink/80">
                      {item.benefit}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
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
  )
}
