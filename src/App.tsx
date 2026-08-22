import { useLayoutEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { ServicePage } from '@/pages/ServicePage'
import { ServicesIndexPage } from '@/pages/ServicesIndexPage'
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios" element={<ServicesIndexPage />} />
        <Route path="/servicios/:slug" element={<ServicePage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<AdminHomePage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="pagos" element={<AdminPaymentsPage />} />
          <Route path="testimonios" element={<AdminTestimonialsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
