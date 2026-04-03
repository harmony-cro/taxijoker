import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { resolve } from 'node:path'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: resolve(process.cwd(), '..'),
}

export default withNextIntl(nextConfig)
