/**
 * The Products workspace for Webship Workspace: the `products/` folder as a plugin.
 *
 * What the package carries is placed by the installer from the manifest (the folder's settings file,
 * its commands, its docs and its AI items, each in the folder of its kind) and listed by --activate; the dashboard draws the workspace from the
 * settings file like any other. Nothing to register at run time yet: this is where the folder's own
 * rail buttons, row menus or assistant context would go.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';

export const WORKSPACE_KEY = 'products';

/** The AI items the installer places, each in the workspace folder of its kind (ai/ in this package). */
export const AGENTS = ['products-maintainer'];
export const SKILLS = ['products-workflow'];
export const AI_COMMANDS = ['products-check'];
export const PROMPTS = ['products-green-gate'];

export function register(api: PluginApi): void {
  api.addAssistantContext(() => `The products/ workspace is the Products workspace (a plugin, @webship.co/workspace-products); its commands are the cmd-*.sh scripts in that folder. It comes with AI items for work in this folder: the agent \`products-maintainer\` (ai-agents/), the skill \`products-workflow\` (ai-skills/), the command \`/products-check\` (ai-commands/) and the prompt \`products-green-gate\` (ai-prompts/).`);
}
