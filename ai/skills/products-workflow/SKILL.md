---
name: products-workflow
description: How work is done in the `products/` folder of the Webship Workspace — how a product (a distribution, profile or package kept as a git checkout) is checked with the code-quality checks it declares, how its GitLab CI pipeline is run on this machine before a push, how a branch gets its own worktree and a checkout its backup, with the flags of each command and the settings keys of the folder. Use when asked to "run the checks of this product", "run the pipeline locally", "make a worktree for a branch", "back up the product", or when a command of `products/` is about to be run.
argument-hint: '[what you are about to do in products]'
---

# products-workflow

`~/workspace/products` is the Products folder of a Webship Workspace (container-based, DDEV by default).
Products are the distributions, profiles and packages this workspace ships: real repositories, where a build is a product and not an experiment. It comes with the Products plugin (`@webship.co/workspace-products`), which places the commands below in the folder. Every command finds the workspace from its own path; run it from the folder, and read `bash <command> --help` before quoting a flag.

## The order of work

1. **See what the product declares**: `bash cmd-tools-checks.sh myproduct --list`. It runs nothing.
2. **Work on a branch**; for a second branch at the same time,
   `bash cmd-tools-clone.sh myproduct --to myproduct-fix --worktree`.
3. **Run the checks**: `bash cmd-tools-checks.sh myproduct`, or some with `--only`.
4. **Run the pipeline on this machine**: `bash cmd-tools-gitlab-ci-local.sh myproduct --doctor`
   once, then `bash cmd-tools-gitlab-ci-local.sh myproduct` (or `--slim`).
5. **Push when it is green**, and gate on the remote pipeline what could not run here.

## Commands

| Command | What it does | Flags |
| --- | --- | --- |
| `cmd-tool-backup-product.sh` | An item as an archive, into `backups/products/` | none |
| `cmd-tools-checks.sh` | Runs the code-quality checks an item's `package.json` declares; `--list` prints the plan and runs nothing | `--browser` `--e2e` `--fail-fast` `--install` `--list` `--only` `--runner` `--skip` |
| `cmd-tools-clone.sh` | Folder and database under a new name, here or in another folder | `--branch` `--extra-hostname` `--no-build-copy` `--no-db` `--target-workspace` `--to` `--with-workspace-hostname` `--worktree` |
| `cmd-tools-gitlab-ci-local.sh` | Runs an item's GitLab CI pipeline on this machine, before a push | `--doctor` `--list` `--slim` `--variable` |
| `cmd-tools-reclaim.sh` | Disk held by projects whose folder is gone: a dry run unless `--apply` | `--apply` `--keep-days` `--list-protected` `--only` |
| `cmd-tools-screen.sh` | A detached session with a log the dashboard follows | `--follow` `--list` `--log` `--run` `--stop` |

## Settings

| Key | File | What it says |
| --- | --- | --- |
| `doc.name` | `core/config/workspace.products.settings.yml` | The folder under the workspace root: `products` |
| `type` | `core/config/workspace.products.settings.yml` | `sites`: the rows of the page are built sites, with the Build, Tests, Checks, Users, Backup and Remove actions |
| `composer` | `core/config/workspace.products.settings.yml` | `manifest`: the COMPOSER menu only adds to `composer.json` here, and never installs |
| `assistant.name`, `assistant.placeholder` | `core/config/workspace.products.settings.yml` | What the assistant is called on this page; `default` takes the workspace's |
| `workspaces` | `core/config/settings.yml` | The active folders; `products` is on it once the plugin is activated |

## Rules

- **A product is a real repository.** Never rebuild, reset or remove a checkout; work on a
  branch, and back the checkout up (`bash cmd-tool-backup-product.sh <name>`) before a risky change.
- **Green before a push.** The checks the product declares, then its pipeline on this machine. A red
  job is fixed, never hidden: no skipped check, no job allowed to fail.
- **Containers only** (DDEV by default): never `composer`, `drush`, `php` or `npm` on the host for a
  product; the checks and the pipeline run in containers.
- `bash cmd-tools-reclaim.sh` is a report until `--apply` is added: never add it unasked.

The Products plugin places these beside this one, each in the workspace folder of its kind: the agent `products-maintainer` (`ai-agents/`), the command `/products-check` (`ai-commands/`) and the prompt `products-green-gate` (`ai-prompts/`).
