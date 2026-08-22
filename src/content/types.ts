export type ServiceHighlight = {
  id: string
  label: string
}

export type ServiceItem = {
  id: string
  title: string
  benefit: string
  description: string
  pageBody: string
  audience: string
  slug: string
  imageUrl: string
  imageAlt: string
  highlights: ServiceHighlight[]
  seoTitle: string
  seoDescription: string
  seoKeywords: string
}

export type Credential = {
  id: string
  label: string
  value: string
}

export type Testimonial = {
  id: string
  quote: string
  name: string
  detail: string
  imageUrl: string
  imageAlt: string
}

export type SeoContent = {
  title: string
  description: string
  keywords: string
  ogImage: string
}

export type HeroHighlight = {
  id: string
  label: string
}

export type PaymentMethod = {
  id: string
  label: string
  logoUrl: string
  notes: string
  enabled: boolean
}

export type HeroStat = {
  id: string
  value: string
  label: string
}

export type HeroContent = {
  brand: string
  logoUrl: string
  eyebrow: string
  lineOne: string
  accentWord: string
  lineTwo: string
  promise: string
  watermark: string
  primaryCtaLabel: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
  doctorImageUrl: string
  floatingCardTitle: string
  floatingCardBody: string
  highlights: HeroHighlight[]
  paymentMethods: PaymentMethod[]
  paymentTitle: string
  stats: HeroStat[]
  trustStatValue: string
  trustStatLabel: string
}

export type JourneyStep = {
  id: string
  title: string
  description: string
}

export type JourneyContent = {
  title: string
  intro: string
  watermark: string
  activeStepIndex: number
  steps: JourneyStep[]
  flowLabels: string[]
}

export type ServicesContent = {
  eyebrow: string
  title: string
  intro: string
  ctaLabel: string
  ctaHref: string
  items: ServiceItem[]
}

export type TrustHighlight = {
  id: string
  label: string
}

export type TrustContent = {
  eyebrow: string
  title: string
  body: string
  imageUrl: string
  imageAlt: string
  secondaryImageUrl: string
  secondaryImageAlt: string
  highlights: TrustHighlight[]
  ctaLabel: string
  ctaHref: string
  credentials: Credential[]
}

export type TestimonialsContent = {
  titleLineOne: string
  titleLineTwo: string
  titleLineThree: string
  intro: string
  hashtag: string
  watermark: string
  items: Testimonial[]
}

export type VisitContent = {
  title: string
  intro: string
  address: string
  hours: string
  phone: string
  email: string
  whatsapp: string
  whatsappUrl: string
  mapEmbedUrl: string
  instagram: string
  instagramHandle: string
  facebook: string
}

export type FinalCtaContent = {
  title: string
  body: string
  ctaLabel: string
}

export type FooterContent = {
  note: string
  privacyLabel: string
  privacyHref: string
  termsLabel: string
  termsHref: string
}

export type BlogPostStatus = 'draft' | 'published'

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  coverUrl: string
  status: BlogPostStatus
  publishedAt: string
  seoTitle: string
  seoDescription: string
}

export type BlogContent = {
  title: string
  intro: string
  posts: BlogPost[]
}

export type SiteModuleKey =
  | 'paymentMarquee'
  | 'journey'
  | 'services'
  | 'servicesMarquee'
  | 'trust'
  | 'testimonials'
  | 'visit'
  | 'finalCta'

export type SiteModule = {
  id: string
  key: SiteModuleKey
  label: string
  description: string
  enabled: boolean
}

export type ModulesContent = {
  items: SiteModule[]
}

export type AnalyticsContent = {
  googleAnalyticsId: string
  googleTagManagerId: string
  notes: string
}

export type SiteContent = {
  seo: SeoContent
  hero: HeroContent
  journey: JourneyContent
  services: ServicesContent
  trust: TrustContent
  testimonials: TestimonialsContent
  visit: VisitContent
  finalCta: FinalCtaContent
  footer: FooterContent
  blog: BlogContent
  modules: ModulesContent
  analytics: AnalyticsContent
}
