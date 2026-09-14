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
  cardBorderClass,
}: {
  item: Testimonial
  cardBorderClass: string
}) {
  return (
    <article
      className={[
        'surface-soft h-full overflow-hidden rounded-2xl border bg-white',
        cardBorderClass,
      ].join(' ')}
    >
      <div className="aspect-4/3 overflow-hidden bg-fog">
        <img
          src={item.imageUrl}
          alt={item.imageAlt}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
      </div>
      <div className="px-5 py-5">
        {item.quote ? (
          <p className="text-sm leading-relaxed text-ink">“{item.quote}”</p>
        ) : null}
        <p
          className={[
            'text-sm font-bold text-ink',
            item.quote ? 'mt-4' : '',
          ].join(' ')}
        >
          {item.name}
        </p>
        <p className="mt-0.5 text-sm text-muted">{item.detail}</p>
      </div>
    </article>
  )
}

export function TestimonialsCarousel({
  items,
  cardBorderClass = 'border-white/80',
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
                <TestimonialCard
                  item={item}
                  cardBorderClass={cardBorderClass}
                />
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
