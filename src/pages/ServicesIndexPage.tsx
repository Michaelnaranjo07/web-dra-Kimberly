import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd'
import { FinalCta } from '@/components/site/FinalCta'
import { Services } from '@/components/site/Services'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Seo } from '@/components/Seo'
import { useSiteContent } from '@/hooks/use-site-content'

export function ServicesIndexPage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  return (
    <>
      <Seo
        seo={{
          title: 'Servicios odontológicos en Bogotá — Dra. Kimberly Martínez',
          description:
            'Ortodoncia, blanqueamiento, prótesis, endodoncia y odontología para gestantes en Barrio Perdomo, Bogotá. Agenda con la Dra. Kimberly Martínez.',
          keywords:
            'servicios odontológicos Bogotá, ortodoncia, blanqueamiento, prótesis, endodoncia, odontología gestantes, Perdomo',
          ogImage: content.seo.ogImage,
        }}
        canonicalPath="/servicios"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Inicio', path: '/' },
          { name: 'Servicios', path: '/servicios' },
        ]}
      />
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
        variant="solid"
      />
      <main>
        <Services
          services={content.services}
          variant="page"
          whatsappUrl={whatsappUrl}
          showBreadcrumb
        />
        <FinalCta finalCta={content.finalCta} whatsappUrl={whatsappUrl} />
      </main>
      <SiteFooter
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        visit={content.visit}
        footer={content.footer}
      />
    </>
  )
}
