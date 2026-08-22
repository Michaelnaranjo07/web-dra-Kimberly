import type { JourneyContent } from '@/content/types'

type JourneyProps = {
  journey: JourneyContent
}

export function Journey({ journey }: JourneyProps) {
  return (
    <section id="recorrido" className="bg-bg pt-6 sm:pt-14">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-20 xl:max-w-7xl">
        <div className="scroll-reveal grid gap-4 sm:gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-12">
          <p className="max-w-sm text-sm leading-relaxed text-muted">{journey.intro}</p>
          <h2 className="font-display text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-right lg:text-[2.75rem] lg:leading-[1.1]">
            {journey.title}
          </h2>
        </div>

        <ol className="scroll-reveal mt-10 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {journey.steps.map((step, index) => {
            const active = index === journey.activeStepIndex
            return (
              <li
                key={step.id}
                className={[
                  'rounded-2xl border bg-white px-5 py-6 transition-[transform,box-shadow,border-color] duration-200 ease-out-strong',
                  active
                    ? 'surface-lift border-signal/20'
                    : 'surface-soft border-line/60',
                ].join(' ')}
              >
                <p className="font-display text-xs font-bold tracking-[0.16em] text-signal tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display mt-4 text-sm font-extrabold tracking-[0.06em] text-ink uppercase">
                  {step.title}
                </h3>
                <div
                  className={[
                    'mt-3 h-px w-8',
                    active ? 'bg-signal/40' : 'bg-line',
                  ].join(' ')}
                />
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </li>
            )
          })}
        </ol>

        <p className="scroll-reveal mt-10 flex gap-x-3 gap-y-2 overflow-x-auto pb-1 text-[10px] font-semibold tracking-[0.14em] text-muted uppercase sm:mt-12 sm:flex-wrap sm:items-center sm:justify-center sm:overflow-visible sm:pb-0 sm:text-[11px] sm:tracking-[0.16em]">
          {journey.flowLabels.map((label, index) => (
            <span key={label} className="inline-flex shrink-0 items-center gap-3">
              {index > 0 ? (
                <span aria-hidden="true" className="text-ember/45">
                  →
                </span>
              ) : null}
              {label}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
