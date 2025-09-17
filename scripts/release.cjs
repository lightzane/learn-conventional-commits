// @ts-check
const { execSync } = require('node:child_process')

const stdio = 'inherit'

/** @type { 'manual' | 'major' | 'minor' | 'patch' | 'prerelease' | 'premajor' | 'preminor' | 'prepatch' | string } */
const mode = process.argv[2] || 'manual'

// Bump version
if (mode !== 'manual') {
  const preid = /^pre/.test(mode) ? '--preid alpha' : ''
  execSync(`npm version ${mode} ${preid} --no-git-tag-version`, {
    stdio,
  })
}

// Build the project
execSync('pnpm build', { stdio })

// Update changelog
execSync('pnpm changelog', { stdio })

// Stage the changes
execSync('git add CHANGELOG.md package.json', { stdio })

// Commit the changes
execSync(`git commit -m release`, { stdio })
