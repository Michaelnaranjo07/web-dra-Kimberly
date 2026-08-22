import { defaultContent } from '@/content/defaults'
import type { PaymentMethod, ServiceItem, SiteContent } from '@/content/types'

const STORAGE_KEY = 'dra-kimberly:content:v30'

type Listener = () => void

let memoryCache: SiteContent | null = null
const listeners = new Set<Listener>()

function mergeServiceItems(parsed?: ServiceItem[]): ServiceItem[] {
  const source = parsed?.length ? parsed : defaultContent.services.items
  return source.map((item) => {
    const fallback =
      defaultContent.services.items.find((entry) => entry.id === item.id) ??
      defaultContent.services.items[0]
    return {
      ...fallback,
      ...item,
      highlights: item.highlights?.length
        ? item.highlights
        : fallback.highlights,
    }
  })
}

function mergeContent(parsed: Partial<SiteContent>): SiteContent {
  return {
    seo: { ...defaultContent.seo, ...parsed.seo },
    hero: {
      ...defaultContent.hero,
      ...(parsed.hero ?? {}),
      highlights: parsed.hero?.highlights?.length
        ? parsed.hero.highlights
        : defaultContent.hero.highlights,
      stats: parsed.hero?.stats?.length
        ? parsed.hero.stats
        : defaultContent.hero.stats,
      paymentMethods: (
        parsed.hero?.paymentMethods?.length
          ? parsed.hero.paymentMethods
          : defaultContent.hero.paymentMethods
      ).map((method) => {
        const legacy = method as PaymentMethod & { kind?: string }
        return {
          id: legacy.id,
          label: legacy.label,
          logoUrl: legacy.logoUrl ?? '',
          notes: legacy.notes ?? '',
          enabled: legacy.enabled ?? true,
        }
      }),
    },
    journey: {
      ...defaultContent.journey,
      ...(parsed.journey ?? {}),
      steps: parsed.journey?.steps?.length
        ? parsed.journey.steps
        : defaultContent.journey.steps,
      flowLabels: parsed.journey?.flowLabels?.length
        ? parsed.journey.flowLabels
        : defaultContent.journey.flowLabels,
    },
    services: {
      ...defaultContent.services,
      ...parsed.services,
      items: mergeServiceItems(parsed.services?.items),
    },
    trust: {
      ...defaultContent.trust,
      ...parsed.trust,
      credentials: parsed.trust?.credentials?.length
        ? parsed.trust.credentials
        : defaultContent.trust.credentials,
      highlights: parsed.trust?.highlights?.length
        ? parsed.trust.highlights
        : defaultContent.trust.highlights,
    },
    testimonials: {
      ...defaultContent.testimonials,
      ...parsed.testimonials,
      items: parsed.testimonials?.items?.length
        ? parsed.testimonials.items
        : defaultContent.testimonials.items,
    },
    visit: { ...defaultContent.visit, ...parsed.visit },
    finalCta: { ...defaultContent.finalCta, ...parsed.finalCta },
    footer: { ...defaultContent.footer, ...parsed.footer },
    blog: {
      ...defaultContent.blog,
      ...parsed.blog,
      posts: parsed.blog?.posts?.length
        ? parsed.blog.posts
        : defaultContent.blog.posts,
    },
    modules: {
      items: parsed.modules?.items?.length
        ? defaultContent.modules.items.map((mod) => {
            const override = parsed.modules?.items.find(
              (item) => item.key === mod.key,
            )
            return override ? { ...mod, ...override, key: mod.key } : mod
          })
        : defaultContent.modules.items,
    },
    analytics: {
      ...defaultContent.analytics,
      ...parsed.analytics,
    },
  }
}

function readStorage(): SiteContent {
  if (memoryCache) return memoryCache

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      memoryCache = defaultContent
      return memoryCache
    }
    memoryCache = mergeContent(JSON.parse(raw) as Partial<SiteContent>)
    return memoryCache
  } catch {
    memoryCache = defaultContent
    return memoryCache
  }
}

function writeStorage(content: SiteContent) {
  memoryCache = content
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  listeners.forEach((listener) => listener())
}

export function getContentSnapshot(): SiteContent {
  if (typeof window === 'undefined') return defaultContent
  return readStorage()
}

export function subscribeContent(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function updateContent(next: SiteContent) {
  writeStorage(next)
}

export function updateContentSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K],
) {
  const current = getContentSnapshot()
  writeStorage({ ...current, [key]: value })
}

export function resetContent() {
  memoryCache = defaultContent
  localStorage.removeItem(STORAGE_KEY)
  listeners.forEach((listener) => listener())
}
