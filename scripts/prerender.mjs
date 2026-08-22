#!/usr/bin/env node
/**
 * Post-build: genera HTML estáticos por ruta con meta SEO
 * para crawlers que no ejecutan JS (WhatsApp, FB, IG).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = join(root, 'dist')
const site = process.env.VITE_SITE_URL?.replace(/\/$/, '') || 'https://web-dra-kimberly.vercel.app'

if (!existsSync(join(dist, 'index.html'))) {
  console.error('dist/index.html no existe. Corre npm run build primero.')
  process.exit(1)
}

const content = JSON.parse(
  readFileSync(join(root, 'scripts/default-content.json'), 'utf8'),
)

/** @type {{ path: string, title: string, description: string, image: string }[]} */
const routes = [
  {
    path: '/',
    title: content.seo.title,
    description: content.seo.description,
    image: content.seo.ogImage,
  },
  {
    path: '/servicios',
    title: 'Servicios odontológicos en Bogotá — Dra. Kimberly Martínez',
    description: content.services.intro,
    image: content.seo.ogImage,
  },
  ...content.services.items.map((s) => ({
    path: `/servicios/${s.slug}`,
    title: s.seoTitle,
    description: s.seoDescription,
    image: s.imageUrl,
  })),
  {
    path: '/nosotros',
    title: `${content.about.title} — Nosotros`,
    description: content.about.intro,
    image: content.about.imageUrl,
  },
  {
    path: '/blog',
    title: `${content.blog.title} — Dra. Kimberly Martínez`,
    description: content.blog.intro,
    image: content.seo.ogImage,
  },
  ...content.blog.posts
    .filter((p) => p.status === 'published')
    .map((p) => ({
      path: `/blog/${p.slug}`,
      title: p.seoTitle || p.title,
      description: p.seoDescription || p.excerpt,
      image: p.coverUrl,
    })),
  {
    path: '/opiniones',
    title: `${content.reviews.title} — Dra. Kimberly Martínez`,
    description: content.reviews.intro,
    image: content.seo.ogImage,
  },
  {
    path: '/politica-de-privacidad',
    title: 'Política de privacidad — Dra. Kimberly Martínez',
    description:
      'Política de tratamiento de datos personales del consultorio Dra. Kimberly Martínez.',
    image: content.seo.ogImage,
  },
  {
    path: '/terminos-y-condiciones',
    title: 'Términos y condiciones — Dra. Kimberly Martínez',
    description: 'Términos de uso del sitio web del consultorio.',
    image: content.seo.ogImage,
  },
]

function abs(url) {
  if (!url) return `${site}/logo-dra-kimberly.jpg`
  if (/^https?:\/\//i.test(url)) return url
  return `${site}${url.startsWith('/') ? url : `/${url}`}`
}

function injectMeta(html, route) {
  const canonical = `${site}${route.path === '/' ? '/' : route.path}`
  const image = abs(route.image)
  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')

  let out = html
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${esc(route.title)}</title>`)
  out = out.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${esc(route.description)}" />`,
  )
  out = out.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${esc(canonical)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${esc(route.title)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${esc(route.description)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${esc(image)}" />`,
  )
  out = out.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${esc(canonical)}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${esc(route.title)}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${esc(route.description)}" />`,
  )
  out = out.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  )
  return out
}

const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8')

for (const route of routes) {
  const html = injectMeta(indexHtml, route)
  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
    continue
  }
  const dir = join(dist, route.path.replace(/^\//, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

console.log(`Prerender: ${routes.length} rutas en dist/`)
