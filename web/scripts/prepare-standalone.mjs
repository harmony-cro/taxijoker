import { cpSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const standaloneDir = join(root, '.next', 'standalone')

if (!existsSync(standaloneDir)) {
  throw new Error('Missing .next/standalone after build.')
}

if (existsSync(join(root, 'public'))) {
  cpSync(join(root, 'public'), join(standaloneDir, 'public'), { recursive: true, force: true })
}

if (existsSync(join(root, '.next', 'static'))) {
  mkdirSync(join(standaloneDir, '.next'), { recursive: true })
  cpSync(join(root, '.next', 'static'), join(standaloneDir, '.next', 'static'), { recursive: true, force: true })
}

console.log('Standalone bundle prepared with public and static assets.')
