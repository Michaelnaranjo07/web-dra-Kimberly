import type { ServiceItem, SiteContent } from '@/content/types'

type ServiceJsonLdProps = {
  service: ServiceItem
  content: SiteContent
  url: string
}

/** Schema Service + Dentist provider for service landing pages */
export function ServiceJsonLd({ service, content, url }: ServiceJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url,
    image: service.imageUrl,
    provider: {
      '@type': 'Dentist',
      name: content.hero.brand,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Calle 3A Sur #72-45',
        addressLocality: 'Bogotá',
        addressRegion: 'Cundinamarca',
        addressCountry: 'CO',
      },
      sameAs: [content.visit.instagram].filter(Boolean),
    },
    areaServed: {
      '@type': 'City',
      name: 'Bogotá',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
