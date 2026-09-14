import type { AboutContent } from '@/content/types'
import { absoluteUrl } from '@/lib/site'

type PersonJsonLdProps = {
  about: AboutContent
  brand: string
}

export function PersonJsonLd({ about, brand }: PersonJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.title || brand,
    jobTitle: about.specialty,
    description: about.bio,
    image: absoluteUrl(about.imageUrl),
    worksFor: {
      '@type': 'Dentist',
      name: brand,
    },
    alumniOf: about.university
      ? { '@type': 'CollegeOrUniversity', name: about.university }
      : undefined,
    knowsAbout: [
      'Rehabilitación oral',
      'Odontología estética',
      'Prótesis dentales',
      'Coronas',
      'Carillas',
      'Diseño de sonrisa',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
