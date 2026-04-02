import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = process.cwd()
const server = join(root, '.next', 'standalone', 'server.js')

if (!existsSync(server)) {
  console.error('Missing .next/standalone/server.js — run npm run build first.')
  process.exit(1)
}

const res = spawnSync(process.execPath, [server], {
  stdio: 'inherit',
  env: { ...process.env },
})
process.exit(res.status ?? 0)
