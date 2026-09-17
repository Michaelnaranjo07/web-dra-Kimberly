type ServicesMarqueeProps = {
  labels: string[]
}

export function ServicesMarquee({ labels }: ServicesMarqueeProps) {
  const loop = [...labels, ...labels]

  return (
    <div className="bg-signal" aria-label="Servicios de la clínica">
      <div className="services-marquee overflow-hidden py-4 sm:py-5">
        <ul className="services-marquee-track flex w-max items-center gap-8 px-4 sm:gap-12">
          {loop.map((label, index) => (
            <li
              key={`${label}-${index}`}
              className="flex items-center gap-8 sm:gap-12"
            >
              <span className="font-display text-sm font-bold tracking-[0.04em] whitespace-nowrap text-white sm:text-base">
                {label}
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/70"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
