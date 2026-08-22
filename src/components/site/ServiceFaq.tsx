import type { ServiceFaq as ServiceFaqItem } from '@/content/types'

type ServiceFaqProps = {
  faqs: ServiceFaqItem[]
}

export function ServiceFaq({ faqs }: ServiceFaqProps) {
  if (!faqs.length) return null

  return (
    <section className="atmosphere-paper border-t border-line/50">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
          Dudas frecuentes
        </p>
        <h2 className="font-display mt-3 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Preguntas frecuentes
        </h2>
        <ul className="mt-8 space-y-3">
          {faqs.map((faq) => (
            <li key={faq.id}>
              <details className="group surface-soft overflow-hidden rounded-2xl border border-line/60 bg-white open:border-signal/25">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-ink marker:content-none sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal/10 text-signal transition-transform duration-200 ease-out-strong group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div className="border-t border-line/50 px-5 pb-5 pt-3 sm:px-6 sm:pb-6">
                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
