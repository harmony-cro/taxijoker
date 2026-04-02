import { cpSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const repoRoot = process.cwd()
const srcNext = join(repoRoot, 'web', '.next')
const destNext = join(repoRoot, '.next')

if (!existsSync(srcNext)) {
  throw new Error('Missing web/.next. Build web first.')
}

// Hostinger panel često očekuje da je output u rootu (/.next),
// dok se build radi u web/.next. Kopiramo da bi panel našao očekivani direktorij.
if (existsSync(destNext)) {
  try {
    rmSync(destNext, { recursive: true, force: true })
  } catch (e) {
    // Na Windowsu .next može biti zaključan dok server radi.
    // Nastavi s kopiranjem preko postojećih fajlova.
    console.warn('Could not fully remove existing .next, continuing:', e?.message ?? e)
  }
}
cpSync(srcNext, destNext, { recursive: true, force: true })

console.log('Copied web/.next -> .next for Hostinger.')
