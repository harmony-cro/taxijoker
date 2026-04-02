import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { basename, join } from 'node:path'

const root = process.cwd()
const standaloneDir = join(root, '.next', 'standalone')

if (!existsSync(standaloneDir)) {
  throw new Error('Missing .next/standalone after build.')
}

// When outputFileTracingRoot points to the parent directory, Next.js nests
// server.js under the app folder name (e.g. standalone/web/server.js).
// Detect the actual server.js location so assets land in the right place.
const appName = basename(root)  // e.g. 'web'
const nestedServerDir = join(standaloneDir, appName)
const assetDir = existsSync(join(nestedServerDir, 'server.js'))
  ? nestedServerDir   // outputFileTracingRoot used → standalone/web/
  : standaloneDir     // no tracing root → standalone/

if (existsSync(join(root, 'public'))) {
  cpSync(join(root, 'public'), join(assetDir, 'public'), { recursive: true, force: true })
}

if (existsSync(join(root, '.next', 'static'))) {
  mkdirSync(join(assetDir, '.next'), { recursive: true })
  cpSync(join(root, '.next', 'static'), join(assetDir, '.next', 'static'), { recursive: true, force: true })
}

console.log(`Standalone bundle prepared — assets copied to ${assetDir}`)
