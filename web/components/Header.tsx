'use client'

import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const t = useTranslations('nav')
  const tb = useTranslations('topbar')
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '#usluge', label: t('services') },
    { href: '#cijenik', label: t('pricing') },
    { href: '#kontakt', label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#181818] text-white/80 text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-2 flex-wrap">
          <span className="flex items-center gap-1.5">
            <MapPinIcon />
            {tb('address')}
          </span>
          <a href={`tel:${site.phone.tel}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <PhoneIcon />
            {tb('phone')}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <MailIcon />
            {tb('email')}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-border shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/media/taxi-joker.png" alt="Taxi Joker" width={120} height={40} className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
            {routing.locales.length > 1 && <LocaleSwitcher />}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-5 bg-foreground mb-1" />
            <span className="block h-0.5 w-5 bg-foreground mb-1" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </button>
        </div>

        {/* Mobile nav */}
        {open && (
          <nav className="border-t border-border px-4 py-3 md:hidden">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            {routing.locales.length > 1 && <div className="mt-2"><LocaleSwitcher /></div>}
          </nav>
        )}
      </div>
    </header>
  )
}

function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(locale: string) {
    const segments = pathname.split('/')
    const knownLocales = routing.locales as readonly string[]
    if (knownLocales.includes(segments[1])) {
      segments[1] = locale
    } else {
      segments.splice(1, 0, locale)
    }
    router.push(segments.join('/') || '/')
  }

  return (
    <div className="flex gap-2">
      {routing.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className="text-xs font-semibold uppercase text-muted-foreground hover:text-primary transition-colors"
        >
          {locale}
        </button>
      ))}
    </div>
  )
}

function MapPinIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}
