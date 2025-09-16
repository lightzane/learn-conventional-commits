// @ts-check
const pico = require('picocolors')
const { readFileSync } = require('node:fs')
const path = require('node:path')

const msgPath = path.resolve('.git/COMMIT_EDITMSG') // https://git-scm.com/docs/git-commit#Documentation/git-commit.txt-GITDIRCOMMITEDITMSG
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^(revert: )?(feat|fix|docs|refactor|perf|test|build|ci|chore|release)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${pico.white(pico.bgRed(' ERROR '))} ${pico.red(`invalid commit message format.`)}\n\n` +
      pico.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`,
      ) +
      `    ${pico.green(`feat(foo): add 'comments' field`)}\n` +
      `    ${pico.green(`fix(bar): handle schema compilation error (close #28)`)}\n\n` +
      pico.red(`  See .github/commit-convention.md for more details.\n`),
  )
  process.exit(1)
}
