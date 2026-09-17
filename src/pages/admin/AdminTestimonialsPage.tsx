import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextArea, TextInput } from '@/components/ui/Field'
import type { Testimonial, TestimonialsContent } from '@/content/types'
import { useSiteContent } from '@/hooks/use-site-content'

function emptyItem(): Testimonial {
  return {
    id: `t-${Date.now()}`,
    quote: '',
    name: '',
    detail: '',
    imageUrl: '',
    imageAlt: '',
  }
}

export function AdminTestimonialsPage() {
  const { content, setSection } = useSiteContent()
  const [draft, setDraft] = useState<TestimonialsContent>(content.testimonials)
  const [editingId, setEditingId] = useState<string | null>(
    content.testimonials.items[0]?.id ?? null,
  )
  const [saved, setSaved] = useState(false)

  const editing =
    draft.items.find((item) => item.id === editingId) ?? draft.items[0]

  function persist(next: TestimonialsContent) {
    setDraft(next)
    setSection('testimonials', next)
    setSaved(true)
  }

  function updateItem(id: string, patch: Partial<Testimonial>) {
    persist({
      ...draft,
      items: draft.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    })
  }

  function addItem() {
    const item = emptyItem()
    setEditingId(item.id)
    persist({ ...draft, items: [item, ...draft.items] })
  }

  function removeItem(id: string) {
    const items = draft.items.filter((item) => item.id !== id)
    setEditingId(items[0]?.id ?? null)
    persist({ ...draft, items })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-signal uppercase">
            Sitio
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Testimonios
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Cards de #PacientesFelices en la landing.
          </p>
        </div>
        <Button type="button" onClick={addItem}>
          Añadir testimonio
        </Button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-line bg-bg p-4 sm:grid-cols-2">
        <Field label="Título línea 1">
          <TextInput
            value={draft.titleLineOne}
            onChange={(e) =>
              persist({ ...draft, titleLineOne: e.target.value })
            }
          />
        </Field>
        <Field label="Título línea 2">
          <TextInput
            value={draft.titleLineTwo}
            onChange={(e) =>
              persist({ ...draft, titleLineTwo: e.target.value })
            }
          />
        </Field>
        <Field label="Hashtag / línea 3">
          <TextInput
            value={draft.titleLineThree}
            onChange={(e) =>
              persist({ ...draft, titleLineThree: e.target.value })
            }
          />
        </Field>
        <Field label="Intro">
          <TextInput
            value={draft.intro}
            onChange={(e) => persist({ ...draft, intro: e.target.value })}
          />
        </Field>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ul className="space-y-2">
          {draft.items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => {
                  setEditingId(item.id)
                  setSaved(false)
                }}
                className={[
                  'w-full rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,transform] duration-150 ease-out-strong active:scale-[0.99]',
                  editing?.id === item.id
                    ? 'border-signal/30 bg-signal/5'
                    : 'border-line bg-bg hover:bg-paper',
                ].join(' ')}
              >
                <p className="text-sm font-bold text-ink">
                  {item.name || 'Sin nombre'}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                  {item.detail || item.quote || 'Sin detalle'}
                </p>
              </button>
            </li>
          ))}
        </ul>

        {editing ? (
          <div className="space-y-4 rounded-2xl border border-line bg-bg p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-lg font-bold text-ink">
                Editar testimonio
              </p>
              <Button
                variant="danger"
                type="button"
                className="py-2! px-4!"
                onClick={() => removeItem(editing.id)}
              >
                Eliminar
              </Button>
            </div>
            <Field label="Nombre / iniciales">
              <TextInput
                value={editing.name}
                onChange={(e) =>
                  updateItem(editing.id, { name: e.target.value })
                }
              />
            </Field>
            <Field label="Detalle (tratamiento)">
              <TextInput
                value={editing.detail}
                onChange={(e) =>
                  updateItem(editing.id, { detail: e.target.value })
                }
              />
            </Field>
            <Field label="Cita">
              <TextArea
                value={editing.quote}
                onChange={(e) =>
                  updateItem(editing.id, { quote: e.target.value })
                }
              />
            </Field>
            <Field label="Imagen (URL)">
              <TextInput
                value={editing.imageUrl}
                onChange={(e) =>
                  updateItem(editing.id, { imageUrl: e.target.value })
                }
              />
            </Field>
            <Field label="Alt imagen">
              <TextInput
                value={editing.imageAlt}
                onChange={(e) =>
                  updateItem(editing.id, { imageAlt: e.target.value })
                }
              />
            </Field>
            {editing.imageUrl ? (
              <div className="overflow-hidden rounded-xl bg-fog">
                <img
                  src={editing.imageUrl}
                  alt=""
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {saved ? (
        <p className="text-sm font-semibold text-signal">Testimonios guardados.</p>
      ) : null}
    </div>
  )
}
