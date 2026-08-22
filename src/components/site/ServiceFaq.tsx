import type { ServiceFaq as ServiceFaqItem } from '@/content/types'

type ServiceFaqProps = {
  faqs: ServiceFaqItem[]
  eyebrow?: string
  title?: string
  /** page: bloque en ficha de servicio; section: home u otras secciones */
  variant?: 'page' | 'section'
}

export function ServiceFaq({
  faqs,
  eyebrow = 'Dudas frecuentes',
  title = 'Preguntas frecuentes',
  variant = 'page',
}: ServiceFaqProps) {
  if (!faqs.length) return null

  const shell =
    variant === 'section'
      ? 'bg-bg'
      : 'border-t border-line/40 bg-bg'

  return (
    <section className={shell}>
      <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="atmosphere-faq surface-soft overflow-hidden rounded-[1.75rem] px-5 py-10 sm:rounded-[2.25rem] sm:px-8 sm:py-12">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
            {eyebrow}
          </p>
          <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {title}
          </h2>
          <ul className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <li key={faq.id}>
                <details className="group overflow-hidden rounded-2xl border border-white/70 bg-white/85 open:border-signal/30 open:bg-white sm:rounded-[1.25rem]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-ink marker:content-none sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal transition-transform duration-200 ease-out-strong group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="border-t border-line/40 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
