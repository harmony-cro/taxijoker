import { site } from '@/lib/site'
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  return <HomeContent />
}

function HomeContent() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <ServicesSection />
      <MapSection />
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const t = useTranslations('hero')
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center bg-[#181818] overflow-hidden">
      {/* Background car photo */}
      <Image
        src="/media/image_2022-04-05_182244330.png"
        alt=""
        fill
        className="object-cover opacity-20"
        priority
      />
      <div className="relative z-10 flex flex-col items-center gap-8 px-4 py-20 text-center">
        <Image
          src="/media/taxi-joker.png"
          alt="Taxi Joker"
          width={220}
          height={80}
          className="h-20 w-auto object-contain brightness-0 invert"
          priority
        />
        <p className="max-w-xl text-lg font-medium text-white/90 md:text-xl">
          {t('tagline')}
        </p>
        <a
          href={`tel:${site.phone.tel}`}
          className="rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity tracking-wide"
        >
          {t('cta')}
        </a>
        <a
          href={`tel:${site.phone.tel}`}
          className="text-2xl font-bold text-primary tracking-wide"
        >
          {site.phone.display}
        </a>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const t = useTranslations('features')
  const items = t.raw('items') as { title: string; text: string }[]

  const icons = [<CourierIcon key="courier" />, <ShoppingIcon key="shopping" />, <ClockIcon key="clock" />]

  return (
    <section id="usluge" className="relative bg-[#181818] py-20">
      {/* Subtle bg image */}
      <Image
        src="/media/bokeh-effects-wallpaper-photo-Hellerup-Image-on-Unsplash.jpg"
        alt=""
        fill
        className="object-cover opacity-10"
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
          {t('heading')}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                {icons[i]}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

function PricingSection() {
  const t = useTranslations('pricing')
  const items = t.raw('items') as { label: string; price: string }[]

  return (
    <section id="cijenik" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">{t('heading')}</h2>
        <p className="mb-10 text-center text-muted-foreground">{t('subheading')}</p>

        <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          {items.map((item, i) => (
            <div
              key={i}
              className={`flex items-center justify-between px-6 py-4 ${
                i < items.length - 1 ? 'border-b border-border' : ''
              }`}
            >
              <span className="font-medium">{item.label}</span>
              <span className="text-xl font-bold text-primary">{item.price}</span>
            </div>
          ))}
          <div className="bg-primary/10 px-6 py-3 text-center text-sm font-medium text-primary">
            {t('note')}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground leading-relaxed">
          {t('disclaimer')}
        </p>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
  const t = useTranslations('services')
  const items = t.raw('items') as string[]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-2 text-center text-3xl font-bold md:text-4xl">{t('heading')}</h2>
        <p className="mb-10 text-center text-muted-foreground">{t('subheading')}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-border bg-gray-50 px-4 py-3"
            >
              <CheckIcon />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Map ──────────────────────────────────────────────────────────────────────

function MapSection() {
  const t = useTranslations('contact')
  return (
    <section id="kontakt" className="bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">{t('heading')}</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          {/* Contact details */}
          <div className="flex flex-col justify-center gap-5">
            <ContactRow icon={<MapPinIcon />} text={t('address')} href={`https://maps.google.com/?q=${encodeURIComponent(t('address'))}`} />
            <ContactRow icon={<PhoneIcon />} text={t('phone')} href={`tel:${site.phone.tel}`} />
            <ContactRow icon={<MailIcon />} text={t('email')} href={`mailto:${site.email}`} />
            <a
              href={`tel:${site.phone.tel}`}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {t('phone')}
            </a>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-xl border border-border shadow-sm">
            <iframe
              title="Taxi Joker lokacija"
              src="https://maps.google.com/maps?q=Ivana%20Belostenca%20101%20Slavonski%20Brod&t=m&z=15&output=embed&iwloc=near"
              width="100%"
              height="360"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) {
  return (
    <a href={href} className="flex items-center gap-3 text-sm font-medium hover:text-primary transition-colors group">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        {icon}
      </span>
      {text}
    </a>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function CourierIcon() {
  return (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function ShoppingIcon() {
  return (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
