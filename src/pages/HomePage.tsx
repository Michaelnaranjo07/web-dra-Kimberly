import { FaqJsonLd } from '@/components/FaqJsonLd'
import { FinalCta } from '@/components/site/FinalCta'
import { Hero } from '@/components/site/Hero'
import { Journey } from '@/components/site/Journey'
import { PaymentCarousel } from '@/components/site/PaymentCarousel'
import { ServiceFaq } from '@/components/site/ServiceFaq'
import { Services } from '@/components/site/Services'
import { ServicesMarquee } from '@/components/site/ServicesMarquee'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { Testimonials } from '@/components/site/Testimonials'
import { Trust } from '@/components/site/Trust'
import { Visit } from '@/components/site/Visit'
import { LocalBusinessJsonLd } from '@/components/LocalBusinessJsonLd'
import { Seo } from '@/components/Seo'
import type { SiteModuleKey } from '@/content/types'
import { useSiteContent } from '@/hooks/use-site-content'

export function HomePage() {
  const { content } = useSiteContent()
  const whatsappUrl =
    content.visit.whatsappUrl ||
    `https://wa.me/${content.visit.whatsapp.replace(/\D/g, '')}`

  const enabled = (key: SiteModuleKey) =>
    content.modules.items.find((item) => item.key === key)?.enabled !== false

  const paymentMethods = content.hero.paymentMethods.filter(
    (method) => method.enabled,
  )

  return (
    <>
      <Seo seo={content.seo} canonicalPath="/" />
      <LocalBusinessJsonLd content={content} />
      {enabled('clinicFaqs') ? (
        <FaqJsonLd faqs={content.clinicFaqs.items} />
      ) : null}
      <SiteHeader
        brand={content.hero.brand}
        logoUrl={content.hero.logoUrl}
        whatsappUrl={whatsappUrl}
      />
      <main>
        <Hero hero={content.hero} whatsappUrl={whatsappUrl} />
        {enabled('journey') ? <Journey journey={content.journey} /> : null}
        {enabled('trust') ? (
          <Trust trust={content.trust} whatsappUrl={whatsappUrl} />
        ) : null}
        {enabled('servicesMarquee') ? (
          <ServicesMarquee labels={content.services.marqueeLabels} />
        ) : null}
        {enabled('services') ? (
          <Services services={content.services} />
        ) : null}
        {enabled('paymentMarquee') && paymentMethods.length > 0 ? (
          <div className="border-y border-line/40 bg-bg py-5 sm:py-6">
            <p className="mb-3 text-center text-[11px] font-semibold tracking-[0.18em] text-muted uppercase">
              {content.hero.paymentTitle}
            </p>
            <PaymentCarousel methods={paymentMethods} />
          </div>
        ) : null}
        {enabled('testimonials') ? (
          <Testimonials
            testimonials={content.testimonials}
            instagramUrl={content.visit.instagram}
          />
        ) : null}
        {enabled('clinicFaqs') ? (
          <ServiceFaq
            faqs={content.clinicFaqs.items}
            eyebrow={content.clinicFaqs.eyebrow}
            title={content.clinicFaqs.title}
            variant="section"
          />
        ) : null}
        {enabled('visit') ? (
          <Visit visit={content.visit} whatsappUrl={whatsappUrl} />
        ) : null}
        {enabled('finalCta') ? (
          <FinalCta finalCta={content.finalCta} whatsappUrl={whatsappUrl} />
        ) : null}
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
