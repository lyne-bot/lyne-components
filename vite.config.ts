import { resolve } from 'path';

import postcssLit from 'rollup-plugin-postcss-lit';
import { defineConfig } from 'vite';

import { typescriptTransform } from './tools/vite/index.js';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        // https://vitejs.dev/config/shared-options#css-preprocessoroptions
        // TODO: api: 'modern',
        api: 'legacy',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  plugins: [
    // We apply the postcssLit plugin (which transforms .scss files to Lit
    // CSS tagged templates) as this should apply in almost all cases.
    postcssLit({ exclude: ['**/core/styles/**/*', '**/storybook/**/*'] }),
    typescriptTransform(),
  ],
  resolve: {
    // Alias used for test and storybook environments
    alias: [
      { find: '@sbb-esta/lyne-elements', replacement: resolve(__dirname, 'src/elements') },
      {
        find: '@sbb-esta/lyne-elements-experimental',
        replacement: resolve(__dirname, 'src/elements-experimental'),
      },
    ],
  },
});
