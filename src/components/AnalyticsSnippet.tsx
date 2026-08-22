import type { AnalyticsContent } from '@/content/types'

type AnalyticsSnippetProps = {
  analytics: AnalyticsContent
}

/** Injects GA4 / GTM when IDs are configured in admin. React 19 head hoist. */
export function AnalyticsSnippet({ analytics }: AnalyticsSnippetProps) {
  const ga = analytics.googleAnalyticsId.trim()
  const gtm = analytics.googleTagManagerId.trim()

  return (
    <>
      {ga ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(ga)});`,
            }}
          />
        </>
      ) : null}
      {gtm ? (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtm)});`,
            }}
          />
          <noscript>
            <iframe
              title="Google Tag Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtm)}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      ) : null}
    </>
  )
}
