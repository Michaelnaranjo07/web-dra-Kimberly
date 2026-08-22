import type { HeroContent } from '@/content/types'
import { PaymentCarousel } from '@/components/site/PaymentCarousel'
import { trackWhatsAppClick } from '@/lib/site'

type HeroProps = {
  hero: HeroContent
  whatsappUrl: string
  showPayments?: boolean
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 13L13 3M13 3H6M13 3v7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Hero({ hero, whatsappUrl, showPayments = true }: HeroProps) {
  const paymentMethods = hero.paymentMethods.filter((method) => method.enabled)
  const showPay = showPayments && paymentMethods.length > 0
  const trustLine = hero.stats.slice(0, 2)

  return (
    <section
      id="inicio"
      className={[
        'relative isolate flex flex-col',
        showPay ? 'h-svh max-h-svh min-h-128' : 'min-h-[min(80svh,44rem)]',
      ].join(' ')}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <img
          src={hero.doctorImageUrl}
          alt="Consultorio odontológico"
          className="absolute inset-0 h-full w-full object-cover object-[42%_40%]"
        />
        {/* Tint uniforme + viñeta suave (sin manchas de blur) */}
        <div aria-hidden="true" className="absolute inset-0 bg-signal/20" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ink/35 via-ink/15 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 50% 42%, rgb(21 26 36 / 0.52) 0%, rgb(21 26 36 / 0.22) 48%, transparent 74%)',
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-start px-5 pt-20 pb-10 sm:px-6 sm:pt-24 sm:pb-12 xl:max-w-7xl">
          <div className="relative mx-auto w-full max-w-2xl text-center sm:mt-6 lg:mt-10">
            {trustLine.length > 0 ? (
              <p className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-wide text-white sm:mb-5 sm:text-xs [text-shadow:0_1px_2px_rgb(21_26_36_/_0.55)]">
                {trustLine.map((stat, index) => (
                  <span key={stat.id} className="inline-flex items-center gap-3">
                    {index > 0 ? (
                      <span className="text-white/50" aria-hidden="true">
                        ·
                      </span>
                    ) : null}
                    <span>
                      <span className="text-[#7EE9FF]">{stat.value}</span>{' '}
                      <span className="font-medium text-white/90">{stat.label}</span>
                    </span>
                  </span>
                ))}
              </p>
            ) : null}

            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/35 bg-ink/50 px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white uppercase sm:text-[11px]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember"
                aria-hidden="true"
              />
              <span className="truncate">{hero.eyebrow}</span>
            </p>

            <h1 className="font-display mt-4 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-[1.05] lg:text-[3.35rem] [text-shadow:0_1px_2px_rgb(21_26_36_/_0.5),0_4px_16px_rgb(21_26_36_/_0.35)]">
              {hero.lineOne}{' '}
              <span className="text-[#7EE9FF]">{hero.accentWord}</span>
              {hero.lineTwo ? <> {hero.lineTwo}</> : null}
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white sm:mt-5 sm:text-lg [text-shadow:0_1px_2px_rgb(21_26_36_/_0.5),0_3px_12px_rgb(21_26_36_/_0.3)]">
              {hero.promise}
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-bold text-white transition-[transform,background-color] duration-150 ease-(--ease-out-strong) hover:bg-ink active:scale-97"
              >
                {hero.primaryCtaLabel}
                <ArrowIcon />
              </a>
              <a
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-white/85 bg-ink/40 px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-150 ease-(--ease-out-strong) hover:border-white hover:bg-ink/55 active:scale-97"
              >
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>

      {showPay ? (
        <div className="relative z-20 shrink-0 bg-bg pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pt-4 sm:pb-4">
          <PaymentCarousel methods={paymentMethods} />
        </div>
      ) : null}
    </section>
  )
}
