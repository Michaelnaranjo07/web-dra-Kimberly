import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextArea, TextInput } from '@/components/ui/Field'
import type { PaymentMethod } from '@/content/types'
import { useSiteContent } from '@/hooks/use-site-content'

export function AdminPaymentsPage() {
  const { content, setSection } = useSiteContent()
  const [methods, setMethods] = useState<PaymentMethod[]>(
    content.hero.paymentMethods,
  )
  const [saved, setSaved] = useState(false)

  function persist(next: PaymentMethod[]) {
    setMethods(next)
    setSection('hero', { ...content.hero, paymentMethods: next })
    setSaved(true)
  }

  function update(index: number, patch: Partial<PaymentMethod>) {
    persist(
      methods.map((method, i) =>
        i === index ? { ...method, ...patch } : method,
      ),
    )
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= methods.length) return
    const next = [...methods]
    const [item] = next.splice(index, 1)
    next.splice(target, 0, item)
    persist(next)
  }

  function addMethod() {
    persist([
      ...methods,
      {
        id: `p-${Date.now()}`,
        label: 'Nuevo medio',
        logoUrl: '',
        notes: '',
        enabled: true,
      },
    ])
  }

  function remove(index: number) {
    persist(methods.filter((_, i) => i !== index))
  }

  const visible = methods.filter((method) => method.enabled).length

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-signal uppercase">
            Sitio
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Métodos de pago
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Nombre, logo y observaciones. {visible} visibles de {methods.length}.
          </p>
        </div>
        <Button type="button" onClick={addMethod}>
          Añadir medio
        </Button>
      </div>

      <div className="space-y-3">
        {methods.map((method, index) => (
          <article
            key={method.id}
            className={[
              'rounded-2xl border bg-bg p-4 sm:p-5',
              method.enabled
                ? 'border-line'
                : 'border-dashed border-line/80 opacity-70',
            ].join(' ')}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {method.logoUrl ? (
                  <img
                    src={method.logoUrl}
                    alt=""
                    className="h-10 w-10 rounded-lg object-contain bg-paper p-1"
                  />
                ) : (
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 font-bold text-signal">
                    {method.label.slice(0, 1).toUpperCase()}
                  </span>
                )}
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    {method.label}
                  </p>
                  <p className="text-xs text-muted">#{index + 1}</p>
                </div>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
                <input
                  type="checkbox"
                  checked={method.enabled}
                  onChange={(e) =>
                    update(index, { enabled: e.target.checked })
                  }
                  className="h-4 w-4 accent-[var(--color-signal)]"
                />
                Visible
              </label>
            </div>

            <div className="mt-4 grid gap-3">
              <Field label="Nombre">
                <TextInput
                  value={method.label}
                  onChange={(e) => update(index, { label: e.target.value })}
                />
              </Field>
              <Field label="Logo (URL)" hint="PNG o SVG recomendado">
                <TextInput
                  value={method.logoUrl}
                  onChange={(e) => update(index, { logoUrl: e.target.value })}
                  placeholder="https://…"
                />
              </Field>
              <Field label="Observaciones">
                <TextArea
                  value={method.notes}
                  onChange={(e) => update(index, { notes: e.target.value })}
                  placeholder="Notas internas o detalle para el equipo"
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                type="button"
                disabled={index === 0}
                onClick={() => move(index, -1)}
                className="!py-2 !px-4"
              >
                Subir
              </Button>
              <Button
                variant="ghost"
                type="button"
                disabled={index === methods.length - 1}
                onClick={() => move(index, 1)}
                className="!py-2 !px-4"
              >
                Bajar
              </Button>
              <Button
                variant="danger"
                type="button"
                onClick={() => remove(index)}
                className="!py-2 !px-4"
              >
                Eliminar
              </Button>
            </div>
          </article>
        ))}
      </div>

      {saved ? (
        <p className="text-sm font-semibold text-signal">Guardado en el sitio.</p>
      ) : null}
    </div>
  )
}
