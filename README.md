# Learn Conventional Commits

This project is a practical guide for learning and applying best practices in managing Git **commits** and releases.

It covers Git hooks and additionally:

- **Husky**: Setting up automated checks to verify commit messages follow the Conventional Commits standard.
- **conventional-changelog-cli**: Generating changelogs automatically based on commit history.
- **Automated Git Tag Creation**: Streamlining the process of tagging releases in Git for better version control.

Use this repository to understand how to enforce commit message conventions, automate changelog generation, and simplify release workflows in your own projects.

See [`commit-convention.md`](./.github/commit-convention.md)

## Getting Started

### 1. Initiate project

```bash
npm init -y
git init
```

### 2. Must have the following [scripts](./scripts/)

Feel free to copy the files. See [scripts folder](./scripts/)

```text
./scripts
  ├── commit-msg.cjs
  ├── post-commit.cjs
  ├── release.cjs
  └── verify-commit.cjs
```

**Prerequisite:**

Also, you must have the following `scripts` in your `package.json`:

- `build`
- `test`

If you do not have these, then comment/exclude them out from the **scripts** and git hooks (husky), accordingly.

> [!NOTE]:
> No logic behind on `build` and `test` as they are arbitrary and you may have a different name for them.

> [!WARNING]:
> Ignore the errors, fix underway at [Step 7](#7-install-picocolors).

### 3. Install `husky`

```bash
pnpm add -D husky
```

### 4. Initialize `husky` (recommended)

```bash
npx husky init
```

This will add `.husky` folder with examples
and updates `package.json` to include the following:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### 5. Add/update git hooks via `.husky` folder

**`pre-commit`**

```sh
#!/usr/bin/env sh
npx lint-staged # or (pnpm exec lint-staged)
echo

# Run `pnpm test` if not in the middle of a rebase process
node -e "const fs = require('node:fs'); const { execSync } = require('node:child_process'); const f = fs.globSync('.git/rebase-*'); if (f.length > 0); else execSync('pnpm test', { stdio: 'inherit' })"
echo
```

We will install and setup `lint-staged` in the next steps.

The `node -e "..."` is just an example to demo that we can also do inline scripts other than creating a separate `pre-commit.cjs` file

**`commit-msg`**

```sh
#!/usr/bin/env sh
# $1 path to temp commit message file that Git passes to the hook
node scripts/commit-msg.cjs $1
```

For more details about `$1` see [`git hooks`](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) documentation.

**`post-commit`**

```sh
#!/usr/bin/env sh
node scripts/post-commit.cjs
```

### 6. Install and setup `lint-staged`

Reference: <https://prettier.io/docs/install#git-hooks>

```sh
pnpm add -D prettier lint-staged
```

Add the following in `package.json`

```json
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

### 7. Install `picocolors`

This is optional BUT you must update the [`scripts`](./scripts/verify-commit.cjs) to not use the colors at all.

```sh
pnpm add -D picocolors
```

### 8. Install `conventional-changelog-cli`

Reference: <https://www.npmjs.com/package/conventional-changelog-cli>

```sh
pnpm add -D conventional-changelog-cli
```

Add the following to `package.json`

```json
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}
```

We will use the **angular** preset since our `verify-commit` is based on it.

But there are other presets [here](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages).

### 9. Automate the release

Add the following to your `package.json`

```json
{
  "scripts": {
    "release": "node scripts/release.cjs"
  }
}
```

## Usage

1. Make changes to your code (do not bump version)
2. `git add -A`
3. `git commit` (for multi-line, else add flag `-m`)
4. **Release?** (`No`= repeat step 1. `Yes` = proceed next step)
5. Bump version (add `-alpha.1`, etc for **pre-release**)
6. `pnpm release`
7. `git push && git push origin tag <tag>`

> [!NOTE]
> You can automate bump version and release (**Step 5-6**). See details [here](#auto-bump-version-using-npm-pnpm).

> [!TIP]
> Setup git alias commands: <https://github.com/lightzane/git-setup?tab=readme-ov-file#setup-git-global-configurations>

## Auto Bump Version using `npm` (`pnpm`)

Add these codes to your `release.cjs` before executing any build.

```cjs
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
```

### Usage

```sh
# pnpm release <options>
pnpm release minor

# npm
npm run release -- minor
```

Feel free to customize your scripts!

## Bonus

After `git push origin tag <tag-name>`, the tags are pushed to remote (e.g. GitHub)
but it does not create a release.

### Using GitHub API

Add a workflow to automate creation of releases in GitHub

For more details see: <https://github.com/lightzane/release-tag>
