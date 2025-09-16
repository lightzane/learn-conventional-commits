// @ts-check
// For husky `commit-msg` hook

const { execSync } = require('node:child_process')
const { readFileSync, writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const COMMIT_MSG_FILE = process.argv[2]
const COMMIT_MSG = readFileSync(COMMIT_MSG_FILE, 'utf-8').trim()

if (COMMIT_MSG === 'release') {
  const pkgPath = resolve('package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

  const VERSION = pkg.version
  const TAG = `v${VERSION}`

  writeFileSync(COMMIT_MSG_FILE, `release: ${TAG}`)

  process.exit(0)
}

try {
  execSync(`node scripts/verify-commit.cjs`, { stdio: 'inherit' })
} catch {
  process.exit(1)
}
