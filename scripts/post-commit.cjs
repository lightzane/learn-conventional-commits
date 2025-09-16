// @ts-check
// For husky `post-commit` hook

const { execSync } = require('node:child_process')
const { readFileSync } = require('node:fs')
const { resolve } = require('node:path')
const pico = require('picocolors')

const pkgPath = resolve('package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const VERSION = pkg.version
const TAG = `v${VERSION}`

// Check if the latest commit is a release commit
const latestCommitMsg = execSync('git log -1 --pretty=%B').toString().trim()

if (latestCommitMsg === `release: ${TAG}`) {
  execSync(`git tag ${TAG}`)
  console.log()

  const stdio = 'inherit'

  execSync('git log --oneline -3', { stdio })
  console.log()

  execSync('git status', { stdio })
  console.log()

  console.log(`✅ Git tag ${pico.bold(pico.yellow(TAG))} created`)
  console.log()
  console.log('If possible, please push the tag to remote:')
  console.log(`\tgit push`)
  console.log(`\tgit push origin ${TAG}`)
  console.log()
}
