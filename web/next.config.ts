import type { NextConfig } from 'next'
import { resolve } from 'node:path'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingRoot: resolve(process.cwd(), '..'),
}

export default withNextIntl(nextConfig)
