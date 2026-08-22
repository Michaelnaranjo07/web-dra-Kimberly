import { Link } from 'react-router-dom'
import { useSiteContent } from '@/hooks/use-site-content'

const cards = [
  {
    to: '/admin/blog',
    title: 'Blog',
    body: 'Artículos, borradores, portadas y SEO por post.',
    badge: 'Contenido',
  },
  {
    to: '/admin/pagos',
    title: 'Métodos de pago',
    body: 'Nombre, logo y observaciones del carrusel del hero.',
    badge: 'Pagos',
  },
  {
    to: '/admin/testimonios',
    title: 'Testimonios',
    body: 'Citas, fotos y tratamientos de #PacientesFelices.',
    badge: 'Social',
  },
  {
    to: '/admin/analytics',
    title: 'Analytics',
    body: 'Google Analytics 4 y Tag Manager.',
    badge: 'Medición',
  },
]

export function AdminHomePage() {
  const { content } = useSiteContent()
  const publishedPosts = content.blog.posts.filter(
    (post) => post.status === 'published',
  ).length
  const enabledPayments = content.hero.paymentMethods.filter(
    (method) => method.enabled,
  ).length
  const testimonials = content.testimonials.items.length
  const analyticsOn = Boolean(
    content.analytics.googleAnalyticsId.trim() ||
      content.analytics.googleTagManagerId.trim(),
  )

  return (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.16em] text-signal uppercase">
          Administración
        </p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Panel
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
          Solo lo dinámico: blog, pagos, testimonios y analytics.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-bg p-4">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Posts publicados
          </p>
          <p className="font-display mt-2 text-3xl font-extrabold text-ink tabular-nums">
            {publishedPosts}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-bg p-4">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Pagos visibles
          </p>
          <p className="font-display mt-2 text-3xl font-extrabold text-ink tabular-nums">
            {enabledPayments}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-bg p-4">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Testimonios
          </p>
          <p className="font-display mt-2 text-3xl font-extrabold text-ink tabular-nums">
            {testimonials}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-bg p-4">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
            Analytics
          </p>
          <p className="font-display mt-2 text-xl font-extrabold text-ink">
            {analyticsOn ? 'Activo' : 'Pendiente'}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-2xl border border-line bg-bg p-5 transition-[transform,box-shadow,border-color] duration-150 ease-(--ease-out-strong) hover:border-signal/25 hover:shadow-[0_12px_32px_rgba(21,26,36,0.06)] active:scale-[0.99]"
          >
            <p className="text-[10px] font-semibold tracking-[0.14em] text-signal uppercase">
              {card.badge}
            </p>
            <p className="font-display mt-2 text-xl font-bold text-ink">
              {card.title}
            </p>
            <p className="mt-2 text-sm text-muted">{card.body}</p>
            <p className="mt-4 text-sm font-semibold text-signal transition-colors group-hover:text-ink">
              Abrir →
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
