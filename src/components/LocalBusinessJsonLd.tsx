import type { SiteContent } from '@/content/types'

type LocalBusinessJsonLdProps = {
  content: SiteContent
}

/** Schema Dentist / LocalBusiness — horarios cuando estén confirmados */
export function LocalBusinessJsonLd({ content }: LocalBusinessJsonLdProps) {
  const hoursConfirmed = !content.visit.hours.startsWith('[')

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: content.hero.brand,
    description: content.seo.description,
    image: content.hero.logoUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle 3A Sur #72-45',
      addressLocality: 'Bogotá',
      addressRegion: 'Cundinamarca',
      addressCountry: 'CO',
    },
    sameAs: [content.visit.instagram].filter(Boolean),
  }

  if (hoursConfirmed) {
    data.openingHours = content.visit.hours
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
