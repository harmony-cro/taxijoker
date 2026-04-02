import './../../app/globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin', 'latin-ext'], variable: '--font-inter' })

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(site.url),
    title: { default: t('siteName'), template: `%s | ${t('siteName')}` },
    description: t('homeDescription'),
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${inter.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
