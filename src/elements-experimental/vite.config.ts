import { join } from 'path';

import { defineConfig, mergeConfig, type UserConfig } from 'vite';

import {
  copyAssets,
  customElementsManifest,
  distDir,
  dts,
  resolveEntryPoints,
  isProdBuild,
  packageJsonTemplate,
  generateRootEntryPoint,
  verifyEntryPoints,
} from '../../tools/vite/index.js';
import rootConfig from '../../vite.config.js';

const packageRoot = new URL('.', import.meta.url);
// Include all directories containing an index.ts
const entryPoints = resolveEntryPoints(packageRoot, ['core', 'core/styles/**/']);
const barrelExports = Object.keys(entryPoints)
  .map((e) => join(packageRoot.pathname, e))
  .sort()
  .filter((v, _i, a) => a.some((e) => e.startsWith(`${v}/`)))
  .map((e) => `${e}.ts`);

export default defineConfig((config) =>
  mergeConfig(rootConfig, <UserConfig>{
    root: packageRoot.pathname,
    plugins: [
      ...(config.command === 'build' ? [dts()] : []),
      ...(isProdBuild(config)
        ? [
            customElementsManifest('elements-experimental'),
            generateRootEntryPoint(),
            packageJsonTemplate({
              exports: {
                '.': {
                  types: './index.d.ts',
                  default: './index.js',
                },
              },
            }),
            copyAssets(['../../README.md']),
            verifyEntryPoints(),
          ]
        : []),
    ],
    build: {
      cssMinify: isProdBuild(config),
      lib: {
        entry: entryPoints,
        formats: ['es'],
      },
      minify: isProdBuild(config),
      outDir: new URL(
        `./elements-experimental/${isProdBuild(config) ? '' : 'development/'}`,
        distDir,
      ).pathname,
      emptyOutDir: true,
      sourcemap: isProdBuild(config) ? false : 'inline',
      rollupOptions: {
        external: (source: string, importer: string | undefined) => {
          if (
            source.match(/(^lit$|^lit\/|^@lit\/|^@lit-labs\/|^tslib$)/) ||
            source.match(/^@sbb-esta\/lyne-elements\/?/) ||
            (!!importer && source.startsWith('../') && !importer.includes('/node_modules/')) ||
            (!!importer && barrelExports.includes(importer) && source.match(/\.\/[a-z-]+/))
          ) {
            if (source.includes('.scss')) {
              throw Error(`Do not import scss from another directory.
               Re export sass via barrel export (index.ts). See button/common.ts.
               Source: ${source}.
               Importer: ${importer}.`);
            }
            return true;
          }
        },
      },
    },
    assetsInclude: ['README.md'],
  }),
);
