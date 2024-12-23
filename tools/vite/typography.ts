import { join } from 'path';

import * as sass from 'sass';
import type { PluginOption, ResolvedConfig } from 'vite';

import { root } from './build-meta.js';

export function typography(): PluginOption {
  let viteConfig: ResolvedConfig;
  return {
    name: 'typography',
    configResolved(config) {
      viteConfig = config;
    },
    generateBundle() {
      [
        { inputName: 'core/styles/a11y.scss', outputName: 'a11y.css' },
        { inputName: 'core/styles/animation.scss', outputName: 'animation.css' },
        { inputName: 'core/styles/core.scss', outputName: 'core.css' },
        {
          inputName: 'core/styles/font-characters-extension.scss',
          outputName: 'font-characters-extension.css',
        },
        { inputName: 'core/styles/layout.scss', outputName: 'layout.css' },
        { inputName: 'core/styles/lists.scss', outputName: 'lists.css' },
        { inputName: 'core/styles/normalize.scss', outputName: 'normalize.css' },
        { inputName: 'core/styles/scrollbar.scss', outputName: 'scrollbar.css' },
        { inputName: 'core/styles/standard-theme.scss', outputName: 'standard-theme.css' },
        { inputName: 'core/styles/table.scss', outputName: 'table.css' },
        { inputName: 'core/styles/typography.scss', outputName: 'typography.css' },
      ].forEach((entry) => {
        const compiled = sass.compile(join(viteConfig.root, entry.inputName), {
          loadPaths: [root.pathname, join(root.pathname, '/node_modules/')],
        });
        this.emitFile({
          type: 'asset',
          fileName: entry.outputName,
          source: compiled.css,
        });
      });
    },
  };
}
