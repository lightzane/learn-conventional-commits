// @ts-check
const { execSync } = require('node:child_process')

const stdio = 'inherit'

// Build the project
execSync('pnpm build', { stdio })

// Update changelog
execSync('pnpm changelog', { stdio })

// Stage the changes
execSync('git add CHANGELOG.md package.json', { stdio })

// Commit the changes
execSync(`git commit -m release`, { stdio })
