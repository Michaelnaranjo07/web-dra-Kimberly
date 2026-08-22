import type { PaymentMethod } from '@/content/types'

type PaymentCarouselProps = {
  methods: PaymentMethod[]
}

function PaymentMark({ method }: { method: PaymentMethod }) {
  if (method.logoUrl) {
    const enlarge =
      method.id === 'p1' || // Codensa
      method.id === 'p3' || // Visa
      /codensa|visa/i.test(method.logoUrl)

    return (
      <span
        title={method.notes || method.label}
        className="flex h-10 items-center justify-center rounded-lg px-2"
      >
        <img
          src={method.logoUrl}
          alt={method.label}
          className={[
            'h-8 w-auto max-w-[9.5rem] object-contain origin-center',
            enlarge ? 'scale-[1.55] max-w-[11rem]' : '',
          ].join(' ')}
        />
      </span>
    )
  }

  return (
    <span
      className="flex items-center gap-2"
      title={method.notes || method.label}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-signal/10 text-xs font-bold text-signal">
        {method.label.slice(0, 1).toUpperCase()}
      </span>
      <span className="font-display text-base font-bold tracking-tight text-ink">
        {method.label}
      </span>
    </span>
  )
}

function PaymentRow({
  methods,
  ariaHidden,
}: {
  methods: PaymentMethod[]
  ariaHidden?: boolean
}) {
  return (
    <ul
      className="flex shrink-0 items-stretch gap-3 sm:gap-4"
      aria-hidden={ariaHidden || undefined}
    >
      {methods.map((method) => (
        <li
          key={method.id}
          className="flex min-w-[11.5rem] items-center justify-center px-4 py-3"
        >
          <PaymentMark method={method} />
        </li>
      ))}
    </ul>
  )
}

export function PaymentCarousel({ methods }: PaymentCarouselProps) {
  if (methods.length === 0) return null

  return (
    <div className="payment-marquee relative overflow-hidden py-2" aria-label="Medios de pago">
      <div className="payment-marquee-track flex w-max items-stretch">
        <PaymentRow methods={methods} />
        <PaymentRow methods={methods} ariaHidden />
      </div>
    </div>
  )
}
