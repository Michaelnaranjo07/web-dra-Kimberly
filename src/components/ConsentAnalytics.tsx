import { useSyncExternalStore } from 'react'
import { AnalyticsSnippet } from '@/components/AnalyticsSnippet'
import { useSiteContent } from '@/hooks/use-site-content'
import {
  getCookieConsentServerSnapshot,
  getCookieConsentSnapshot,
  subscribeCookieConsent,
} from '@/lib/cookie-consent'

/** Carga GA/GTM solo si el visitante aceptó cookies de medición. */
export function ConsentAnalytics() {
  const { content } = useSiteContent()
  const consent = useSyncExternalStore(
    subscribeCookieConsent,
    getCookieConsentSnapshot,
    getCookieConsentServerSnapshot,
  )

  if (consent !== 'accepted') return null
  return <AnalyticsSnippet analytics={content.analytics} />
}
