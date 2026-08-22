import type { SeoContent } from '@/content/types'
import { absoluteUrl, SITE_URL } from '@/lib/site'

type SeoProps = {
  seo: SeoContent
  canonicalPath?: string
}

/** React 19 hoists title/meta to <head> — no useEffect. */
export function Seo({ seo, canonicalPath }: SeoProps) {
  const canonical = canonicalPath
    ? absoluteUrl(canonicalPath)
    : undefined
  const image = absoluteUrl(seo.ogImage || '/logo-dra-kimberly.jpg')

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="es_CO" />
      <meta property="og:site_name" content="Dra. Kimberly Martínez" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={image} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:image:alt" content={seo.title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={image} />
      <link rel="home" href={SITE_URL} />
    </>
  )
}
