import { trackWhatsAppClick } from '@/lib/site'
import type { FinalCtaContent } from '@/content/types'

type FinalCtaProps = {
  finalCta: FinalCtaContent
  whatsappUrl: string
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

export function FinalCta({ finalCta, whatsappUrl }: FinalCtaProps) {
  return (
    <section id="cita" className="bg-bg pb-8 sm:pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="scroll-reveal surface-soft relative overflow-hidden rounded-2xl bg-ink px-5 py-10 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-radial-[at_100%_0%] from-signal/35 to-transparent to-55%"
          />
          <div className="relative">
            <h2 className="font-display text-[1.65rem] leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-white/65 sm:text-lg">
              {finalCta.body}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackWhatsAppClick('final_cta')}
              className="mt-7 inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-white hover:text-ink active:scale-97 sm:mt-8 sm:w-auto"
            >
              {finalCta.ctaLabel}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
