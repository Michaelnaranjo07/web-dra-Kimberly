import { useEffect, useState, useSyncExternalStore } from 'react'
import type { HeroContent, HeroSlide } from '@/content/types'
import { MediaCover } from '@/components/site/MediaCover'
import { trackWhatsAppClick } from '@/lib/site'

type HeroProps = {
  hero: HeroContent
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

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function resolveSlides(hero: HeroContent): HeroSlide[] {
  if (hero.slides?.length) return hero.slides
  return [
    {
      id: 'hero-default',
      imageUrl: hero.doctorImageUrl || '/images/fachada-clinica.png',
      videoUrl: hero.videoUrl,
      alt: 'Fachada del consultorio Dra. Kimberly Martínez',
      align: 'center',
      objectPosition: 'center 40%',
    },
  ]
}

export function Hero({ hero, whatsappUrl }: HeroProps) {
  const trustLine = hero.stats.slice(0, 2)
  const slides = resolveSlides(hero)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  )
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const active = slides[Math.min(index, slides.length - 1)] ?? slides[0]
  const alignLeft = active.align === 'left'

  useEffect(() => {
    if (reducedMotion || paused || slides.length < 2) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, slides.length])

  const eyebrow = active.eyebrow ?? hero.eyebrow
  const lineOne = active.lineOne ?? hero.lineOne
  const accentWord = active.accentWord ?? hero.accentWord
  const lineTwo = active.lineTwo ?? hero.lineTwo
  const promise = active.promise ?? hero.promise

  return (
    <section
      id="inicio"
      className="relative isolate flex h-svh max-h-svh min-h-128 flex-col"
    >
      <div
        className="relative min-h-0 flex-1 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => {
          const isActive = i === index
          return (
            <div
              key={slide.id}
              className={[
                'absolute inset-0 transition-opacity duration-700 ease-out-strong motion-reduce:transition-none',
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0',
              ].join(' ')}
              aria-hidden={!isActive}
            >
              <MediaCover
                imageUrl={slide.imageUrl}
                videoUrl={slide.videoUrl}
                alt={slide.alt}
                className="absolute inset-0"
                mediaClassName="h-full w-full object-cover"
                objectPosition={slide.objectPosition ?? 'center center'}
                objectPositionMobile={slide.objectPositionMobile}
              />
            </div>
          )
        })}

        <div aria-hidden="true" className="absolute inset-0 bg-signal/15" />
        <div
          aria-hidden="true"
          className={[
            'absolute inset-0 transition-opacity duration-700 ease-out-strong',
            alignLeft
              ? 'bg-linear-to-r from-ink/75 via-ink/40 to-ink/10'
              : 'bg-linear-to-b from-ink/35 via-ink/15 to-transparent',
          ].join(' ')}
        />
        {!alignLeft ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 58% 52% at 50% 42%, rgb(21 26 36 / 0.52) 0%, rgb(21 26 36 / 0.22) 48%, transparent 74%)',
            }}
          />
        ) : null}

        <div
          className={[
            'relative z-10 flex h-full flex-col justify-center pt-28 pb-20',
            alignLeft
              ? 'w-full max-w-none px-5 sm:px-8 lg:px-10 xl:px-12 2xl:px-14'
              : 'mx-auto max-w-6xl px-5 sm:px-6 xl:max-w-7xl',
          ].join(' ')}
        >
          <div
            key={active.id}
            className={[
              'relative w-full motion-safe:animate-[reveal-up_500ms_var(--ease-out-strong)_both]',
              alignLeft
                ? 'max-w-lg text-left sm:max-w-xl lg:max-w-[34rem] xl:max-w-[36rem]'
                : 'mx-auto max-w-2xl text-center',
            ].join(' ')}
          >
            {trustLine.length > 0 ? (
              <p
                className={[
                  'mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold tracking-wide text-white sm:mb-5 sm:text-xs [text-shadow:0_1px_2px_rgb(21_26_36_/_0.55)]',
                  alignLeft ? 'justify-start' : 'justify-center',
                ].join(' ')}
              >
                {trustLine.map((stat, i) => (
                  <span key={stat.id} className="inline-flex items-center gap-3">
                    {i > 0 ? (
                      <span className="text-white/50" aria-hidden="true">
                        ·
                      </span>
                    ) : null}
                    <span>
                      <span className="text-[#7EE9FF]">{stat.value}</span>{' '}
                      <span className="font-medium text-white/90">
                        {stat.label}
                      </span>
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
              <span className="truncate">{eyebrow}</span>
            </p>

            <h1 className="font-display mt-4 text-[2rem] leading-[1.1] font-extrabold tracking-tight text-white sm:mt-5 sm:text-5xl sm:leading-[1.05] lg:text-[3.35rem] [text-shadow:0_1px_2px_rgb(21_26_36_/_0.5),0_4px_16px_rgb(21_26_36_/_0.35)]">
              {lineOne}{' '}
              <span className="text-[#7EE9FF]">{accentWord}</span>
              {lineTwo ? <> {lineTwo}</> : null}
            </h1>

            <p
              className={[
                'mt-4 text-[0.95rem] leading-relaxed text-white sm:mt-5 sm:text-lg [text-shadow:0_1px_2px_rgb(21_26_36_/_0.5),0_3px_12px_rgb(21_26_36_/_0.3)]',
                alignLeft ? 'max-w-md' : 'mx-auto max-w-lg',
              ].join(' ')}
            >
              {promise}
            </p>

            <div
              className={[
                'mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center',
                alignLeft ? 'sm:justify-start' : 'sm:justify-center',
              ].join(' ')}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackWhatsAppClick('hero')}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-bold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
              >
                {hero.primaryCtaLabel}
                <ArrowIcon />
              </a>
              <a
                href={hero.secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-full border border-white/85 bg-ink/40 px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-150 ease-out-strong hover:border-white hover:bg-ink/55 active:scale-97"
              >
                {hero.secondaryCtaLabel}
              </a>
            </div>
          </div>

          {slides.length > 1 ? (
            <div
              className={[
                'absolute bottom-6 flex items-center gap-2 sm:bottom-8 lg:bottom-10',
                alignLeft
                  ? 'left-5 justify-start sm:left-8 lg:left-10 xl:left-12 2xl:left-14'
                  : 'inset-x-5 justify-center sm:inset-x-6 sm:justify-start',
              ].join(' ')}
            >
              {slides.map((slide, i) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Ver imagen ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  className={[
                    'h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out-strong',
                    i === index
                      ? 'w-7 bg-white'
                      : 'w-1.5 bg-white/45 hover:bg-white/70',
                  ].join(' ')}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
