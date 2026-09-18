import { Link } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

function formatDate(iso: string) {
  if (!iso) return ''
  const date = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogIndexPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`
  const posts = content.blog.posts
    .filter((post) => post.status === 'published')
    .slice()
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))

  return (
    <>
      <Seo
        seo={{
          title: `${content.blog.title} — Clínica Dra. Kimberly Martinez`,
          description: content.blog.intro,
          keywords:
            'blog odontología Bogotá, salud bucal, gestantes, Clínica Dra. Kimberly Martinez',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/blog"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <section className="atmosphere-paper">
          <div className="mx-auto max-w-6xl px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16 xl:max-w-7xl">
            <nav className="text-sm text-muted" aria-label="Migas de pan">
              <Link to="/" className="transition-colors hover:text-signal">
                Inicio
              </Link>
              <span className="mx-2 text-line">/</span>
              <span className="text-ink">Blog</span>
            </nav>

            <div className="mt-6 max-w-2xl sm:mt-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                Contenido
              </p>
              <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {content.blog.title}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {content.blog.intro}
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="mt-12 rounded-2xl border border-line/60 bg-white px-6 py-10 text-center sm:mt-16 sm:px-10">
                <p className="font-display text-xl font-bold text-ink">
                  Pronto habrá artículos nuevos
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  Mientras tanto, puedes revisar los tratamientos del
                  clínica y agendar una valoración.
                </p>
                <Link
                  to="/servicios"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97"
                >
                  Ver servicios
                </Link>
              </div>
            ) : (
              <ul className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {posts.map((post) => (
                  <li key={post.id}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group surface-soft block overflow-hidden rounded-2xl border border-line/60 bg-white transition-[transform,box-shadow] duration-200 ease-out-strong hover:shadow-md active:scale-[0.99]"
                    >
                      <div className="aspect-4/3 overflow-hidden bg-fog">
                        <img
                          src={post.coverUrl}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-300 ease-out-strong group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="p-5 sm:p-6">
                        {post.publishedAt ? (
                          <time
                            dateTime={post.publishedAt}
                            className="text-[11px] font-semibold tracking-[0.14em] text-signal uppercase"
                          >
                            {formatDate(post.publishedAt)}
                          </time>
                        ) : null}
                        <h2 className="font-display mt-2 text-xl font-bold tracking-tight text-ink">
                          {post.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                          {post.excerpt}
                        </p>
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal transition-colors duration-150 group-hover:text-ink">
                          Leer artículo
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        visit={content.visit}
        footer={content.footer}
      />
    </>
  )
}
