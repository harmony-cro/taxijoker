import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const repoRoot = process.cwd()
const rootServer = join(repoRoot, '.next', 'standalone', 'web', 'server.js')
const rootServerAlt = join(repoRoot, '.next', 'standalone', 'server.js')
const webServer = join(repoRoot, 'web', '.next', 'standalone', 'server.js')
const webServerAlt = join(repoRoot, 'web', '.next', 'standalone', 'web', 'server.js')

function runNode(file) {
  const res = spawnSync(process.execPath, [file], {
    stdio: 'inherit',
    env: { ...process.env },
  })
  process.exit(res.status ?? 0)
}

if (existsSync(rootServer)) runNode(rootServer)
else if (existsSync(rootServerAlt)) runNode(rootServerAlt)
else if (existsSync(webServerAlt)) runNode(webServerAlt)
else if (existsSync(webServer)) runNode(webServer)
else {
  // Fallback: start Next directly (requires project files present).
  const res = spawnSync('npm', ['run', 'start', '--prefix', 'web'], {
    stdio: 'inherit',
    env: { ...process.env },
  })
  process.exit(res.status ?? 0)
}

