import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Field, TextArea, TextInput } from '@/components/ui/Field'
import type { BlogContent, BlogPost } from '@/content/types'
import { useSiteContent } from '@/hooks/use-site-content'

function emptyPost(): BlogPost {
  return {
    id: `b-${Date.now()}`,
    title: 'Nuevo artículo',
    slug: `articulo-${Date.now()}`,
    excerpt: '',
    coverUrl: '',
    status: 'draft',
    publishedAt: '',
    seoTitle: '',
    seoDescription: '',
  }
}

export function AdminBlogPage() {
  const { content, setSection } = useSiteContent()
  const [draft, setDraft] = useState<BlogContent>(content.blog)
  const [editingId, setEditingId] = useState<string | null>(
    content.blog.posts[0]?.id ?? null,
  )
  const [saved, setSaved] = useState(false)

  const editing =
    draft.posts.find((post) => post.id === editingId) ?? draft.posts[0]

  function persist(next: BlogContent) {
    setDraft(next)
    setSection('blog', next)
    setSaved(true)
  }

  function updatePost(id: string, patch: Partial<BlogPost>) {
    const next = {
      ...draft,
      posts: draft.posts.map((post) =>
        post.id === id ? { ...post, ...patch } : post,
      ),
    }
    persist(next)
  }

  function addPost() {
    const post = emptyPost()
    const next = { ...draft, posts: [post, ...draft.posts] }
    setEditingId(post.id)
    persist(next)
  }

  function removePost(id: string) {
    const nextPosts = draft.posts.filter((post) => post.id !== id)
    const next = { ...draft, posts: nextPosts }
    setEditingId(nextPosts[0]?.id ?? null)
    persist(next)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-signal uppercase">
            Contenido
          </p>
          <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink">
            Blog
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Mockup de publicaciones. El listado público se podrá conectar después;
            aquí ya guardas estructura SEO y estados.
          </p>
        </div>
        <Button type="button" onClick={addPost}>
          Nuevo post
        </Button>
      </div>

      <div className="grid gap-3 rounded-2xl border border-line bg-bg p-4 sm:grid-cols-2">
        <Field label="Título de sección blog">
          <TextInput
            value={draft.title}
            onChange={(e) => {
              setSaved(false)
              persist({ ...draft, title: e.target.value })
            }}
          />
        </Field>
        <Field label="Intro">
          <TextInput
            value={draft.intro}
            onChange={(e) => {
              setSaved(false)
              persist({ ...draft, intro: e.target.value })
            }}
          />
        </Field>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <ul className="space-y-2">
          {draft.posts.map((post) => (
            <li key={post.id}>
              <button
                type="button"
                onClick={() => {
                  setEditingId(post.id)
                  setSaved(false)
                }}
                className={[
                  'w-full rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,transform] duration-150 ease-out-strongcale-[0.99]',
                  editing?.id === post.id
                    ? 'border-signal/30 bg-signal/5'
                    : 'border-line bg-bg hover:bg-paper',
                ].join(' ')}
              >
                <p className="line-clamp-2 text-sm font-bold text-ink">
                  {post.title}
                </p>
                <p className="mt-1 text-[11px] font-semibold tracking-[0.12em] uppercase">
                  <span
                    className={
                      post.status === 'published' ? 'text-signal' : 'text-muted'
                    }
                  >
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </p>
              </button>
            </li>
          ))}
          {draft.posts.length === 0 ? (
            <li className="rounded-2xl border border-dashed border-line bg-bg p-4 text-sm text-muted">
              Sin posts. Crea el primero.
            </li>
          ) : null}
        </ul>

        {editing ? (
          <div className="space-y-4 rounded-2xl border border-line bg-bg p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-display text-lg font-bold text-ink">Editar post</p>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  type="button"
                  className="py-2! px-4!"
                  onClick={() =>
                    updatePost(editing.id, {
                      status:
                        editing.status === 'published' ? 'draft' : 'published',
                      publishedAt:
                        editing.status === 'published'
                          ? ''
                          : new Date().toISOString().slice(0, 10),
                    })
                  }
                >
                  {editing.status === 'published'
                    ? 'Pasar a borrador'
                    : 'Publicar'}
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="py-2! px-4!"
                  onClick={() => removePost(editing.id)}
                >
                  Eliminar
                </Button>
              </div>
            </div>

            <Field label="Título">
              <TextInput
                value={editing.title}
                onChange={(e) => updatePost(editing.id, { title: e.target.value })}
              />
            </Field>
            <Field label="Slug" hint="URL futura: /blog/slug">
              <TextInput
                value={editing.slug}
                onChange={(e) => updatePost(editing.id, { slug: e.target.value })}
              />
            </Field>
            <Field label="Extracto">
              <TextArea
                value={editing.excerpt}
                onChange={(e) =>
                  updatePost(editing.id, { excerpt: e.target.value })
                }
              />
            </Field>
            <Field label="Cover URL">
              <TextInput
                value={editing.coverUrl}
                onChange={(e) =>
                  updatePost(editing.id, { coverUrl: e.target.value })
                }
              />
            </Field>
            <Field label="SEO title">
              <TextInput
                value={editing.seoTitle}
                onChange={(e) =>
                  updatePost(editing.id, { seoTitle: e.target.value })
                }
              />
            </Field>
            <Field label="SEO description">
              <TextArea
                value={editing.seoDescription}
                onChange={(e) =>
                  updatePost(editing.id, { seoDescription: e.target.value })
                }
              />
            </Field>

            {editing.coverUrl ? (
              <div className="overflow-hidden rounded-xl bg-fog">
                <img
                  src={editing.coverUrl}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      {saved ? (
        <p className="text-sm font-semibold text-signal">Blog actualizado.</p>
      ) : null}
    </div>
  )
}
