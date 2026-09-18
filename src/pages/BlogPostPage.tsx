import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'
import { absoluteUrl, trackWhatsAppClick } from '@/lib/site'

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

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  const post = content.blog.posts.find((item) => item.slug === slug)
  if (!post || post.status !== 'published') {
    return <Navigate to="/blog" replace />
  }

  const path = `/blog/${post.slug}`
  const paragraphs = post.body.split(/\n\n+/).filter(Boolean)
  const related = post.relatedServiceSlug
    ? content.services.items.find((s) => s.slug === post.relatedServiceSlug)
    : undefined

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.publishedAt || undefined,
    image: absoluteUrl(post.coverUrl),
    author: {
      '@type': 'Person',
      name: 'Clínica Dra. Kimberly Martinez',
      jobTitle: content.about.specialty,
    },
    publisher: {
      '@type': 'Organization',
      name: content.hero.brand,
      logo: absoluteUrl(content.hero.logoUrl),
    },
    mainEntityOfPage: absoluteUrl(path),
    description: post.seoDescription || post.excerpt,
  }

  return (
    <>
      <Seo
        seo={{
          title: post.seoTitle || `${post.title} — Clínica Dra. Kimberly Martinez`,
          description: post.seoDescription || post.excerpt,
          keywords: content.seo.keywords,
          ogImage: post.coverUrl || content.seo.ogImage,
        }}
        canonicalPath={path}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <article>
          <section className="atmosphere-paper border-b border-line/50">
            <div className="mx-auto max-w-3xl px-5 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-16">
              <nav
                className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted"
                aria-label="Migas de pan"
              >
                <Link to="/" className="transition-colors hover:text-signal">
                  Inicio
                </Link>
                <span className="text-line">/</span>
                <Link
                  to="/blog"
                  className="transition-colors hover:text-signal"
                >
                  Blog
                </Link>
                <span className="text-line">/</span>
                <span className="truncate text-ink">{post.title}</span>
              </nav>

              <p className="mt-6 text-[11px] font-semibold tracking-[0.18em] text-signal uppercase">
                Artículo
              </p>
              <h1 className="font-display mt-3 text-[1.75rem] leading-tight font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.08]">
                {post.title}
              </h1>
              {post.publishedAt ? (
                <time
                  dateTime={post.publishedAt}
                  className="mt-4 block text-sm text-muted"
                >
                  {formatDate(post.publishedAt)}
                </time>
              ) : null}

              <div className="surface-soft mt-8 overflow-hidden rounded-[1.25rem] bg-fog ring-1 ring-black/5 sm:rounded-[1.75rem]">
                <img
                  src={post.coverUrl}
                  alt=""
                  className="aspect-16/10 w-full object-cover"
                />
              </div>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-muted sm:mt-10 sm:text-lg">
                {paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <aside className="surface-soft mt-10 rounded-2xl border border-line/60 bg-white p-6 sm:p-7">
                <p className="font-display text-lg font-bold tracking-tight text-ink">
                  Clínica Dra. Kimberly Martinez
                </p>
                <p className="mt-1 text-sm font-semibold text-ink/80">
                  {content.about.specialty}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {content.about.credentialsNote}
                </p>
              </aside>

              {related ? (
                <p className="mt-8 text-sm text-muted">
                  Relacionado:{' '}
                  <Link
                    to={`/servicios/${related.slug}`}
                    className="font-semibold text-signal transition-colors hover:text-ink"
                  >
                    {related.title}
                  </Link>
                </p>
              ) : null}

              <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-line/60 bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                <div>
                  <p className="font-display text-lg font-bold text-ink">
                    ¿Tienes una duda sobre este tema?
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    Escríbenos por WhatsApp y te orientamos con calma.
                  </p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsAppClick('blog_post')}
                  className="inline-flex w-full shrink-0 items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white transition-[transform,background-color] duration-150 ease-out-strong hover:bg-ink active:scale-97 sm:w-auto"
                >
                  Escribir por WhatsApp
                </a>
              </div>

              <Link
                to="/blog"
                className="mt-8 inline-flex text-sm font-semibold text-signal transition-colors hover:text-ink"
              >
                ← Volver al blog
              </Link>
            </div>
          </section>
        </article>
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
