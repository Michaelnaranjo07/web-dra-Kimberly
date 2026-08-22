import type { TestimonialsContent } from '@/content/types'

type TestimonialsProps = {
  testimonials: TestimonialsContent
  instagramUrl: string
}

export function Testimonials({ testimonials, instagramUrl }: TestimonialsProps) {
  return (
    <section id="voces" className="atmosphere-paper">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-24 xl:max-w-7xl">
        <div className="scroll-reveal grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
              Pacientes felices
            </p>
            <h2 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
              <span className="block text-ink">{testimonials.titleLineOne}</span>
              <span className="block text-ink">{testimonials.titleLineTwo}</span>
              <span className="block text-ember">{testimonials.titleLineThree}</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
              {testimonials.intro}
            </p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-signal transition-colors duration-150 hover:text-ink"
            >
              Ver {testimonials.hashtag} en Instagram →
            </a>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {testimonials.items.map((item, index) => (
            <li
              key={item.id}
              className="scroll-reveal surface-soft overflow-hidden rounded-2xl border border-white/80 bg-white"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="aspect-4/3 overflow-hidden bg-fog">
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="px-5 py-5">
                <p className="text-sm leading-relaxed text-ink">“{item.quote}”</p>
                <p className="mt-4 text-sm font-bold text-ink">{item.name}</p>
                <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
