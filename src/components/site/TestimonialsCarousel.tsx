import { useEffect, useState, useSyncExternalStore } from 'react'
import type { Testimonial } from '@/content/types'

type TestimonialsCarouselProps = {
  items: Testimonial[]
  /** Borde de la card: home usa white/80, opiniones line/60 */
  cardBorderClass?: string
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function subscribeViewport(onStoreChange: () => void) {
  window.addEventListener('resize', onStoreChange)
  return () => window.removeEventListener('resize', onStoreChange)
}

function getVisibleCount() {
  if (typeof window === 'undefined') return 4
  if (window.matchMedia('(min-width: 1024px)').matches) return 4
  if (window.matchMedia('(min-width: 640px)').matches) return 2
  return 1
}

function TestimonialCard({
  item,
}: {
  item: Testimonial
  cardBorderClass?: string
}) {
  const avatar = '4.85rem'
  const notch = '2.7rem' // radio del hueco (foto + aire)
  const notchX = '3.625rem' // left-4 (1rem) + mitad del avatar
  const notchY = '0.425rem' // centro del avatar respecto al top de la card

  return (
    <article className="relative h-full pt-8">
      <div
        className="absolute top-0 left-4 z-20 overflow-hidden rounded-full bg-fog"
        style={{ width: avatar, height: avatar }}
      >
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          className="h-full w-full object-cover object-[center_12%]"
          loading="lazy"
          draggable={false}
        />
      </div>

      <div
        className="relative flex min-h-44 flex-col bg-white pt-5 pr-5 pb-5 pl-5"
        style={{
          borderRadius: '2.85rem 1.35rem 1.6rem 1.45rem',
          // Hueco limpio para la foto (se ve el fondo de la sección)
          WebkitMaskImage: `radial-gradient(circle ${notch} at ${notchX} ${notchY}, transparent 98%, #000 100%)`,
          maskImage: `radial-gradient(circle ${notch} at ${notchX} ${notchY}, transparent 98%, #000 100%)`,
          // drop-shadow respeta la máscara; evita esquinas oscuras del box-shadow+borde
          filter: 'drop-shadow(0 12px 22px rgba(21, 26, 36, 0.10))',
        }}
      >
        <div className="flex min-h-[3.1rem] items-center pl-[4.6rem]">
          <div className="min-w-0">
            <p className="font-display text-[0.95rem] leading-snug font-bold tracking-tight text-ink">
              {item.name}
            </p>
            <p className="mt-0.5 text-xs leading-snug text-muted">{item.detail}</p>
          </div>
        </div>

        {item.quote ? (
          <p className="relative mt-4 text-sm leading-relaxed text-ink">
            <span
              aria-hidden="true"
              className="font-display absolute -top-1 -left-0.5 text-[1.65rem] leading-none text-signal/35"
            >
              “
            </span>
            <span className="relative pl-3.5">{item.quote}</span>
          </p>
        ) : null}
      </div>
    </article>
  )
}

export function TestimonialsCarousel({
  items,
}: TestimonialsCarouselProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => true,
  )
  const visible = useSyncExternalStore(
    subscribeViewport,
    getVisibleCount,
    () => 4,
  )
  const maxIndex = Math.max(0, items.length - visible)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const safeIndex = Math.min(index, maxIndex)

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex)
  }, [index, maxIndex])

  useEffect(() => {
    if (reducedMotion || paused || maxIndex === 0) return
    const id = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, 5500)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, maxIndex])

  const gap = 20

  return (
    <div
      className="mt-10 sm:mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className="relative">
        <div
          className="overflow-hidden"
          style={{ containerType: 'inline-size' }}
        >
          <ul
            className="flex transition-transform duration-500 ease-out-strong motion-reduce:transition-none"
            style={{
              gap,
              transform: `translate3d(calc(-${safeIndex} * ((100cqw - ${(visible - 1) * gap}px) / ${visible} + ${gap}px)), 0, 0)`,
            }}
          >
            {items.map((item) => (
              <li
                key={item.id}
                className="min-w-0 shrink-0"
                style={{
                  width: `calc((100cqw - ${(visible - 1) * gap}px) / ${visible})`,
                }}
              >
                <TestimonialCard item={item} />
              </li>
            ))}
          </ul>
        </div>

        {maxIndex > 0 ? (
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex gap-1.5">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ver grupo ${i + 1}`}
                  aria-current={i === safeIndex ? 'true' : undefined}
                  onClick={() => setIndex(i)}
                  className={[
                    'h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out-strong',
                    i === safeIndex
                      ? 'w-6 bg-signal'
                      : 'w-1.5 bg-line hover:bg-muted',
                  ].join(' ')}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Anterior"
                onClick={() =>
                  setIndex((current) =>
                    current <= 0 ? maxIndex : current - 1,
                  )
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={() =>
                  setIndex((current) =>
                    current >= maxIndex ? 0 : current + 1,
                  )
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line/70 bg-white text-ink transition-[transform,background-color] duration-150 ease-out-strong hover:bg-paper active:scale-97"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
