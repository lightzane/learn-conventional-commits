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
  // Create git tag
  execSync(`git tag ${TAG} -f`) // -f to force update if tag already exists (may happen on `git commit --amend`)
  console.log()

  // Show the latest 3 commits
  execSync('git log --oneline -3', { stdio: 'inherit' }) // Show directly to terminal
  const commits = execSync('git log --oneline -3', { stdio: 'pipe' }) // Capture output
  console.log()

  // Grab the second line which is the latest commit before this release
  const latestCommit = commits.toString().split('\n')[1]
  const latestCommitHash = latestCommit.split(' ')[0]

  // Show git status
  execSync('git status', { stdio: 'inherit' })
  console.log()

  // Show instructions
  console.log(`✅ Git tag ${pico.bold(pico.yellow(TAG))} created`)
  console.log(`✅ ./CHANGELOG.md and ./package.json updated`)
  console.log()
  console.log('If possible, please push the tag to remote:\n')
  console.log(pico.green(`\tgit push`))
  console.log(pico.green(`\tgit push origin tag ${TAG}`))
  console.log()
  console.log('To discard this release:\n')
  console.log(pico.gray(`\tgit tag -d ${TAG}`))
  console.log(pico.gray(`\tgit reset --hard ${latestCommitHash}`))
  console.log()
}
