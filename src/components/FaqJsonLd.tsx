import type { ServiceFaq } from '@/content/types'

type FaqJsonLdProps = {
  faqs: ServiceFaq[]
}

/** FAQPage schema for clinic or service FAQ lists. */
export function FaqJsonLd({ faqs }: FaqJsonLdProps) {
  if (!faqs.length) return null

  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
