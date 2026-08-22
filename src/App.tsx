import { useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ConsentAnalytics } from '@/components/ConsentAnalytics'
import { CookieConsent } from '@/components/site/CookieConsent'
import { HomePage } from '@/pages/HomePage'
import { ServicePage } from '@/pages/ServicePage'
import { ServicesIndexPage } from '@/pages/ServicesIndexPage'
import { AboutPage } from '@/pages/AboutPage'
import { BlogIndexPage } from '@/pages/BlogIndexPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { PrivacyPage } from '@/pages/PrivacyPage'
import { ReviewsPage } from '@/pages/ReviewsPage'
import { TermsPage } from '@/pages/TermsPage'
import { AdminAnalyticsPage } from '@/pages/admin/AdminAnalyticsPage'
import { AdminBlogPage } from '@/pages/admin/AdminBlogPage'
import { AdminHomePage } from '@/pages/admin/AdminHomePage'
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage'
import { AdminPaymentsPage } from '@/pages/admin/AdminPaymentsPage'
import { AdminShell } from '@/pages/admin/AdminShell'
import { AdminTestimonialsPage } from '@/pages/admin/AdminTestimonialsPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ConsentAnalytics />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesIndexPage />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/opiniones" element={<ReviewsPage />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPage />} />
        <Route path="/terminos-y-condiciones" element={<TermsPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminHomePage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="pagos" element={<AdminPaymentsPage />} />
          <Route path="testimonios" element={<AdminTestimonialsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
