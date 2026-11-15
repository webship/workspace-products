# @webship.co/workspace-products

The **Products** workspace of the [Webship Workspace](https://github.com/webship/workspace) dashboard:
the `products/` folder (type `sites`), its settings file (`core/config/workspace.products.settings.yml`),
its commands and its docs, as a plugin.

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-products
bash core/scripts/plugins.sh --activate products --with-needs     # puts `products` on the workspaces list of settings.yml
bash core/scripts/plugins.sh --install products      # the folder, its settings file (once), its commands, its docs (once)
```

The settings file and the docs are placed once and never overwritten: they hold what you put there.
`--deactivate` takes the workspace off the list; the folder and its content stay.

## What it needs

The AI items land in the four AI folders, so the manifest needs them (`needs`): `ai-agents`, `ai-skills`, `ai-commands`, `ai-prompts`. `--activate products` and `--install products` stop while one is missing and name it; with `--with-needs` they are required, activated and installed first.

## The AI items

The plugin carries its own AI items (`ai/` in the package, the manifest's `ai` block), written for the work this folder is for. `--install` places each one in the workspace folder of its kind, when that folder is an active workspace folder; `--uninstall` removes them, and keeps one that was edited in its folder.

| Item | Kind | Lands in | What it is for |
| --- | --- | --- | --- |
| `products-maintainer` | Agent | `ai-agents/products-maintainer.md` | Works on a product (a real checkout) in `products/` and brings it to green before a push: its checks, its pipeline on this machine, a worktree for a branch, a backup |
| `products-workflow` | Skill | `ai-skills/products-workflow/` | How work is done in `products/`: see what is declared, check, run the pipeline locally, push when green; every command with its flags, the settings keys |
| `/products-check` | Command | `ai-commands/products-check.md` | `/products-check <product> [checks]`: prints the plan, runs the declared checks and says what is red and why |
| `products-green-gate` | Prompt | `ai-prompts/products-green-gate.md` | A new session that runs a product's checks and its pipeline on this machine and reports green or red |

From its folder an item is installed into the AI CLI (Claude Code by default) like any other: the folder's page on the dashboard, or `bash cmd-tools-ai-items.sh <name> --install` in the AI folder (`--to dev/<project>` for one project). A prompt is not installed: the New screen form lists it as the start of a new session. The body of every item is plain Markdown any AI CLI can follow; Claude Code is the default shape (the frontmatter, the launch line of a prompt). Every command, flag, settings key and path an item names is checked by `tests/items.test.ts`; the shape of the items is the one of the reference, [`docs/plugin-items-pattern.md` of the WordPress plugin](https://github.com/webship/workspace-wordpress/blob/1.0.x/docs/plugin-items-pattern.md).

## The commands

| Command |
| --- |
| `cmd-tool-backup-product.sh` |
| `cmd-tools-checks.sh` |
| `cmd-tools-clone.sh` |
| `cmd-tools-gitlab-ci-local.sh` |
| `cmd-tools-reclaim.sh` |
| `cmd-tools-screen.sh` |

The bash functions these commands call live in the dashboard's `core/scripts/functions`.
