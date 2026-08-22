import type { SiteContent } from '@/content/types'
import { absoluteUrl } from '@/lib/site'

type LocalBusinessJsonLdProps = {
  content: SiteContent
}

export function LocalBusinessJsonLd({ content }: LocalBusinessJsonLdProps) {
  const { visit } = content
  const phone = visit.phone.trim()

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: content.hero.brand,
    description: content.seo.description,
    image: absoluteUrl(content.hero.logoUrl || content.seo.ogImage),
    url: absoluteUrl('/'),
    priceRange: visit.priceRange || '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: visit.streetAddress,
      addressLocality: visit.addressLocality,
      addressRegion: visit.addressRegion,
      postalCode: visit.postalCode,
      addressCountry: visit.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: visit.latitude,
      longitude: visit.longitude,
    },
    sameAs: [visit.instagram, visit.facebook, visit.googleReviewsUrl].filter(
      Boolean,
    ),
  }

  if (phone) data.telephone = phone
  if (visit.email.trim()) data.email = visit.email.trim()

  if (visit.openingHours?.length) {
    data.openingHoursSpecification = visit.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days.split(',').map((day) => day.trim()),
      opens: slot.opens,
      closes: slot.closes,
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
