import { useSyncExternalStore } from 'react'
import {
  getContentSnapshot,
  resetContent,
  subscribeContent,
  updateContent,
  updateContentSection,
} from '@/lib/content-store'
import type { SiteContent } from '@/content/types'

export function useSiteContent() {
  const content = useSyncExternalStore(
    subscribeContent,
    getContentSnapshot,
    getContentSnapshot,
  )

  return {
    content,
    setContent: (next: SiteContent) => updateContent(next),
    setSection: updateContentSection,
    reset: resetContent,
  }
}
