import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextArea, TextInput } from '@/components/ui/Field'
import type { AnalyticsContent } from '@/content/types'
import { useSiteContent } from '@/hooks/use-site-content'

export function AdminAnalyticsPage() {
  const { content, setSection } = useSiteContent()
  const [draft, setDraft] = useState<AnalyticsContent>(content.analytics)
  const [saved, setSaved] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSection('analytics', draft)
    setSaved(true)
  }

  const connected =
    Boolean(draft.googleAnalyticsId.trim()) ||
    Boolean(draft.googleTagManagerId.trim())

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-signal uppercase">
          Medición
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink">
          Analytics
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Conecta Google Analytics 4 o Tag Manager. Los scripts se inyectan en el
          sitio cuando hay un ID válido.
        </p>
      </div>

      <div
        className={[
          'rounded-2xl border px-4 py-3 text-sm font-semibold',
          connected
            ? 'border-signal/25 bg-signal/5 text-signal'
            : 'border-line bg-bg text-muted',
        ].join(' ')}
      >
        {connected
          ? 'Medición configurada — activa en el sitio público.'
          : 'Sin IDs aún — el sitio no carga scripts de analytics.'}
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-4 rounded-2xl border border-line bg-bg p-5"
      >
        <Field
          label="Google Analytics 4"
          hint="Formato G-XXXXXXXXXX"
        >
          <TextInput
            value={draft.googleAnalyticsId}
            onChange={(e) => {
              setSaved(false)
              setDraft({ ...draft, googleAnalyticsId: e.target.value })
            }}
            placeholder="G-XXXXXXXXXX"
          />
        </Field>
        <Field
          label="Google Tag Manager"
          hint="Opcional · Formato GTM-XXXXXXX"
        >
          <TextInput
            value={draft.googleTagManagerId}
            onChange={(e) => {
              setSaved(false)
              setDraft({ ...draft, googleTagManagerId: e.target.value })
            }}
            placeholder="GTM-XXXXXXX"
          />
        </Field>
        <Field label="Notas internas">
          <TextArea
            value={draft.notes}
            onChange={(e) => {
              setSaved(false)
              setDraft({ ...draft, notes: e.target.value })
            }}
          />
        </Field>
        <div className="flex items-center gap-3">
          <Button type="submit">Guardar analytics</Button>
          {saved ? (
            <p className="text-sm font-semibold text-signal">Guardado</p>
          ) : null}
        </div>
      </form>
    </div>
  )
}
