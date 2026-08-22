import type { TrustContent } from '@/content/types'

type TrustProps = {
  trust: TrustContent
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="h-4 w-4 text-signal"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="M4 10.5l4 4L16 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Trust({ trust }: TrustProps) {
  return (
    <section id="confianza" className="overflow-x-clip bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:gap-12 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 xl:max-w-7xl">
        <div className="scroll-reveal relative mx-auto mb-8 w-full max-w-[20rem] overflow-visible sm:mb-10 sm:max-w-md lg:mb-0 lg:max-w-lg">
          {/* Silueta de fondo (papel) */}
          <div
            aria-hidden="true"
            className="absolute top-6 -left-3 h-[88%] w-[92%] bg-paper sm:-left-5"
            style={{
              borderRadius: '58% 42% 48% 52% / 42% 55% 45% 58%',
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -top-2 right-4 h-20 w-20 rounded-full bg-signal/12 blur-xl"
          />

          {/* Retrato con forma orgánica */}
          <div
            className="relative z-10 mx-auto aspect-4/5 w-[88%] overflow-hidden bg-fog shadow-[0_24px_60px_-28px_rgba(21,26,36,0.45)]"
            style={{
              borderRadius: '62% 38% 48% 52% / 44% 52% 48% 56%',
            }}
          >
            <img
              src={trust.imageUrl}
              alt={trust.imageAlt}
              className="h-full w-full object-cover object-[center_20%]"
            />
          </div>

          {/* Consultorio: óvalo suave, no cuadrado */}
          <div
            className="absolute right-0 bottom-0 z-20 w-[40%] overflow-hidden bg-fog ring-[5px] ring-bg sm:-right-3 sm:bottom-4 sm:w-[40%] sm:ring-8"
            style={{
              borderRadius: '48% 52% 55% 45% / 52% 48% 52% 48%',
            }}
          >
            <img
              src={trust.secondaryImageUrl}
              alt={trust.secondaryImageAlt}
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="scroll-reveal">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
            {trust.eyebrow}
          </p>
          <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
            {trust.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            {trust.body}
          </p>

          <ul className="mt-8 space-y-3">
            {trust.highlights.map((item) => (
              <li key={item.id} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal/10">
                  <CheckIcon />
                </span>
                <span className="text-sm font-semibold text-ink sm:text-base">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={trust.ctaHref}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
          >
            {trust.ctaLabel}
          </a>

          <dl className="mt-10 hidden divide-y divide-line border-y border-line sm:block">
            {trust.credentials.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="flex items-baseline justify-between gap-6 py-3"
              >
                <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
                  {item.label}
                </dt>
                <dd className="text-right text-sm font-semibold text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
