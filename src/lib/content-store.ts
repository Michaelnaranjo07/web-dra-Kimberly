import { defaultContent } from '@/content/defaults'
import type {
  PaymentMethod,
  ServiceFaq,
  ServiceItem,
  SiteContent,
} from '@/content/types'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'

const STORAGE_KEY = 'dra-kimberly:content:v41'
const CONTENT_ROW_ID = 'main'

type Listener = () => void

let memoryCache: SiteContent | null = null
let hydrateStarted = false
const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((listener) => listener())
}

function mergeFaqs(
  parsed: ServiceFaq[] | undefined,
  fallback: ServiceFaq[],
): ServiceFaq[] {
  if (!parsed?.length) return fallback
  const seen = new Set(parsed.map((faq) => faq.id))
  const extras = fallback.filter((faq) => !seen.has(faq.id))
  return [...parsed, ...extras]
}

function mergeServiceItems(parsed?: ServiceItem[]): ServiceItem[] {
  const source = parsed?.length ? parsed : defaultContent.services.items
  return source.map((item) => {
    const fallback =
      defaultContent.services.items.find((entry) => entry.id === item.id) ??
      defaultContent.services.items[0]
    return {
      ...fallback,
      ...item,
      imageUrl: item.imageUrl || fallback.imageUrl,
      videoUrl: item.videoUrl ?? fallback.videoUrl,
      highlights: item.highlights?.length
        ? item.highlights
        : fallback.highlights,
      faqs: mergeFaqs(item.faqs, fallback.faqs),
    }
  })
}

function mergeContent(parsed: Partial<SiteContent>): SiteContent {
  return {
    seo: { ...defaultContent.seo, ...parsed.seo },
    hero: {
      ...defaultContent.hero,
      ...(parsed.hero ?? {}),
      // Media del hero siempre desde defaults (fachada actual)
      doctorImageUrl: defaultContent.hero.doctorImageUrl,
      videoUrl: defaultContent.hero.videoUrl,
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
    clinicFaqs: {
      ...defaultContent.clinicFaqs,
      ...parsed.clinicFaqs,
      items: mergeFaqs(
        parsed.clinicFaqs?.items,
        defaultContent.clinicFaqs.items,
      ),
    },
    visit: {
      ...defaultContent.visit,
      ...parsed.visit,
      // NAP / mapa siempre desde defaults (dirección actual)
      address: defaultContent.visit.address,
      streetAddress: defaultContent.visit.streetAddress,
      postalCode: defaultContent.visit.postalCode,
      latitude: defaultContent.visit.latitude,
      longitude: defaultContent.visit.longitude,
      mapEmbedUrl: defaultContent.visit.mapEmbedUrl,
      googleReviewsUrl: defaultContent.visit.googleReviewsUrl,
      hours: defaultContent.visit.hours,
      openingHours: defaultContent.visit.openingHours,
      email: defaultContent.visit.email,
    },
    finalCta: { ...defaultContent.finalCta, ...parsed.finalCta },
    footer: { ...defaultContent.footer, ...parsed.footer },
    blog: {
      ...defaultContent.blog,
      ...parsed.blog,
      posts: parsed.blog?.posts?.length
        ? parsed.blog.posts.map((post) => {
            const fallback =
              defaultContent.blog.posts.find((entry) => entry.id === post.id) ??
              defaultContent.blog.posts[0]
            return {
              ...fallback,
              ...post,
              body: post.body || fallback.body || '',
              relatedServiceSlug:
                post.relatedServiceSlug || fallback.relatedServiceSlug || '',
            }
          })
        : defaultContent.blog.posts,
    },
    about: { ...defaultContent.about, ...parsed.about },
    reviews: { ...defaultContent.reviews, ...parsed.reviews },
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

function readLocal(): SiteContent {
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

function writeLocal(content: SiteContent) {
  memoryCache = content
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch {
    // ignore quota / private mode
  }
  notify()
}

async function persistRemote(content: SiteContent) {
  if (!supabase || !isSupabaseConfigured) return
  const { error } = await supabase.from('site_content').upsert({
    id: CONTENT_ROW_ID,
    data: content,
    updated_at: new Date().toISOString(),
  })
  if (error) {
    console.warn('[content-store] No se pudo guardar en Supabase:', error.message)
  }
}

export async function hydrateContentFromSupabase() {
  if (!supabase || !isSupabaseConfigured) return
  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('id', CONTENT_ROW_ID)
    .maybeSingle()

  if (error) {
    console.warn('[content-store] No se pudo leer Supabase:', error.message)
    return
  }
  if (!data?.data) return

  writeLocal(mergeContent(data.data as Partial<SiteContent>))
}

function ensureHydration() {
  if (hydrateStarted || typeof window === 'undefined') return
  hydrateStarted = true
  void hydrateContentFromSupabase()
}

export function getContentSnapshot(): SiteContent {
  if (typeof window === 'undefined') return defaultContent
  ensureHydration()
  return readLocal()
}

export function subscribeContent(listener: Listener) {
  listeners.add(listener)
  ensureHydration()
  return () => listeners.delete(listener)
}

export function updateContent(next: SiteContent) {
  writeLocal(next)
  void persistRemote(next)
}

export function updateContentSection<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K],
) {
  const current = getContentSnapshot()
  updateContent({ ...current, [key]: value })
}

export function resetContent() {
  writeLocal(defaultContent)
  void persistRemote(defaultContent)
}
