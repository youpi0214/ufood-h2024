# Exercices - TP1

## Branching

### Branch Creation

- **Permanent branch** `main`: the main branch hosts only the most stable code that is ready for TP submission <br>
- \*Permanent branch\*\* `experimental`: this branch is where all the features are merged and tested before being pushed to
  the `main` branch for official TP submission <br>
- **Feature branch**: for each feature, a branch is created accordingly following this naming
  convention `tp#--feature-name`.<br> For example:`tp1--resto-creation`<br>
- **Bug fix**: A branch is created to work on a fix for one or multiple bugs. The branch should be named this
  way: `bugfix--bug-name`. For example: `bugfix--server-not-responding`

> [!IMPORTANT] > _Permanent branches are branches that should never be deleted_

### Branch Rules

#### `main`

- Only a submission-ready commit should be pushed onto the `main` branch
- No commits can/should be directly pushed to the `main`
- A pull request must be made from the `experimental` branch to push commits onto this branch.
  - **At least 3** people other than the author need to review and approve the pull request before the merge is done

#### `experimental`

- Only completed features should be pushed onto the `experimental` branch
- No commits can/should be directly pushed to the `main`
- A pull request must be made from the `experimental` branch to push commits onto this branch.
  - **At least 1** person other than the author needs to review and approve the pull request before the merge is done

> [!CAUTION]
> Absolutely any pull request made directly to the `main` by a feature branch or bug fix branch will be rejected. It
> must pass by `experimental` first.

### Milestones

A milestone is created for these occasions :

- For every TP submission (TP1, TP2, TP3, and TP4)
- For when all features from a TP have been merged onto the `experimental` branch
- When the project ends

## Conventional Commits Messages

[Source](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13)

### Structure

Commits message should stick to the following structure

<pre>
<b><a href="#types">&lt;type&gt;</a></b></font>(<b><a href="#scopes">&lt;optional scope&gt;</a></b>): <b><a href="#description">&lt;description&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#body">&lt;optional body&gt;</a></b>
<sub>empty separator line</sub>
<b><a href="#footer">&lt;optional footer&gt;</a></b>
</pre>

### Types

- API relevant changes
  - `feat` Commits, that adds or remove a new feature
  - `fix` Commits, that fixes a bug
- `refactor` Commits, that rewrite/restructure your code, however does not change any API behaviour
  - `perf` Commits are special `refactor` commits, that improve performance
- `style` Commits, that do not affect the meaning (white-space, formatting, missing semicolons, etc.)
- `test` Commits, that add missing tests or correcting existing tests
- `docs` Commits, that affect documentation only
- `build` Commits, that affect build components like build tool, ci pipeline, dependencies, project version, ...
- `ops` Commits, that affect operational components like infrastructure, deployment, backup, recovery, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`

### Body

The `body` should include the motivation for the change and contrast this with previous behavior.

- Is an **optional** part of the format
- Use the imperative, present tense: "change" not "changed" nor "changes"
- This is the place to mention issue identifiers and their relations

### Footer

The `footer` should contain any information about **Breaking Changes** and is also the place to **reference Issues**
that this commit refers to.

- Is an **optional** part of the format
- **optionally** reference an issue by its id.
- **Breaking Changes** should start with the word `BREAKING CHANGES:` followed by space or two newlines. The rest of the
  commit message is then used for this.
-

### Examples

- ```
  feat: get the list of restaurant depending of the owner id
  ```
- ```
  feat(shopping cart): add the amazing button
  ```
- ```
  feat!: remove ticket list endpoint

  refers to JIRA-1337

  BREAKING CHANGES: ticket enpoints no longer supports list all entites.
  ```

For more examples see [here](https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13#examples)

> [!WARNING]
> Do not accumulate changes before committing them.

## Issues

When creating an issue, one should respect this format

- `name` : clear and representative name of the issue, one should avoid using abbreviations.
- `description`: clear and complete description of the issue with a code snippet if necessary
- `assignation` : the member(s) working on th issue
- `example` _[optional]_ : an example if needed, might help
- `tag` : tag(s) representing the kind of issue it is
- `start date` _[optional]_ : when to start working on the issue
- `end date` _[optional]_ : deadline to resolve this issue
- `milestone` _[optional]_ : the end goal this issue is contributing to

#### For Features

the `name` should follow this template `TP#--FEATURE NAME` <br>
if the feature is too big and therefore segmented in multiple smaller ones, the naming of the issue should look like
this <br>`TP#--BIG FEATURE NAME--smaller feature name`

#### For Bugs

the `name` should follow this template `TP#--bug name`. The `TP#` makes it easier to identify quickly on which TP
the feature that needs fixing belongs
