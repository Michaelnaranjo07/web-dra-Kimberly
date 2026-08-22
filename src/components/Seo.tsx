import type { SeoContent } from '@/content/types'

type SeoProps = {
  seo: SeoContent
  /** Absolute or site path for canonical / og:url */
  canonicalPath?: string
}

/** React 19 hoists title/meta to <head> — no useEffect. */
export function Seo({ seo, canonicalPath }: SeoProps) {
  const origin =
    typeof window !== 'undefined' ? window.location.origin : ''
  const canonical =
    canonicalPath && origin ? `${origin}${canonicalPath}` : undefined

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.ogImage} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.ogImage} />
    </>
  )
}
