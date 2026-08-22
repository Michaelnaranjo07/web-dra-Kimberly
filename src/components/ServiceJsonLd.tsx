import type { ServiceItem, SiteContent } from '@/content/types'
import { absoluteUrl } from '@/lib/site'

type ServiceJsonLdProps = {
  service: ServiceItem
  content: SiteContent
  url: string
}

export function ServiceJsonLd({ service, content, url }: ServiceJsonLdProps) {
  const { visit } = content
  const phone = visit.phone.trim()

  const serviceData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.seoDescription,
    url,
    image: absoluteUrl(service.imageUrl),
    provider: {
      '@type': 'Dentist',
      name: content.hero.brand,
      ...(phone ? { telephone: phone } : {}),
      address: {
        '@type': 'PostalAddress',
        streetAddress: visit.streetAddress,
        addressLocality: visit.addressLocality,
        addressRegion: visit.addressRegion,
        postalCode: visit.postalCode,
        addressCountry: visit.addressCountry,
      },
      sameAs: [visit.instagram].filter(Boolean),
    },
    areaServed: {
      '@type': 'City',
      name: 'Bogotá',
    },
  }

  const graph: Record<string, unknown>[] = [serviceData]

  if (service.faqs?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
