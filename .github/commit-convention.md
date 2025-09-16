## Git Commit Message Convention

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular). See also [Angular's commit message guidelines](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md).

#### TL;DR:

Messages must be matched by the following regex:

```regexp
/^(revert: )?(feat|fix|docs|refactor|perf|test|build|ci|chore|release)(\(.+\))?: .{1,50}/
```

#### Examples

Appears under "Features" header, `foo` subheader:

```
feat(foo): add 'comments' field
```

Appears under "Bug Fixes" header, `bar` subheader, with a link to issue #28:

```
fix(bar): handle schema compilation error

close #28
```

Appears under "Refactor" header, and under "Breaking Changes" with the breaking change explanation:

```
refactor(core): re-written initial codebase

BREAKING CHANGE: The packages has changed
```

The following commit and commit `667ecc1` do not appear in the changelog if they are under the same release. If not, the revert commit appears under the "Reverts" header.

```
revert: feat(foo): add 'comments' field

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

#### Commit Message Header

```
<type>(<scope>): <subject>
  │       │          │
  │       │          └─⫸ Subject in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: core|foo|bar
  │
  └─⫸ Commit Type: feat|fix|docs|refactor|perf|test|build|ci|chore|release
```

The `<type>` and `<subject>` fields are mandatory, the `(<scope>)` field is optional.

### Type

Must be one of the following:

| Type         | Description                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **feat**     | A new feature                                                                                                                   |
| **fix**      | A bug fix                                                                                                                       |
| **docs**     | Documentation only changes                                                                                                      |
| **refactor** | A code change that neither fixes a bug nor adds a feature                                                                       |
| **perf**     | A code change that improves performance                                                                                         |
| **test**     | Adding missing tests or correcting existing tests                                                                               |
| **build**    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)                             |
| **ci**       | Changes to our CI configuration files and scripts (examples: Github Actions, SauceLabs)                                         |
| **chore**    | Routine tasks and maintenance such as updating dependencies, configuration, or scripts that do not modify source code or tests. |
| **release**  | Updating version number to add changelog                                                                                        |

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

If the prefix is `feat`, `fix` or `perf`, it will appear in the changelog. However, if there is any [BREAKING CHANGE](#footer), the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are `docs`, `chore`, `refactor`, and `test` for non-changelog related tasks.

### Scope

The scope could be anything specifying the place of the commit change. For example `foo`, `bar`, etc...

### Subject

The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference GitHub issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.
