import { readFileSync } from 'fs';
import { join } from 'path';

import type { PluginOption, ResolvedConfig } from 'vite';

import { root } from './build-meta.js';

export function packageJsonTemplate(
  options: {
    templatePath?: string;
    exports?: Record<string, Record<string, unknown>>;
    exportsExtensions?: string[];
  } = {},
): PluginOption {
  options.exportsExtensions ??= ['.js'];
  let viteConfig: ResolvedConfig;
  return {
    name: 'package-json-templating',
    configResolved(config) {
      viteConfig = config;
    },
    generateBundle() {
      if (viteConfig.command !== 'build') {
        return;
      }
      const rootPackageJsonPath = './package.json';
      const packageJsonTemplatePath = options.templatePath ?? './package.json';
      const rootPackageJson = JSON.parse(readFileSync(new URL(rootPackageJsonPath, root), 'utf8'));
      const litVersion = rootPackageJson.dependencies.lit.match(/\d+\.\d+\.\d+/);
      const litObserversVersion =
        rootPackageJson.devDependencies['@lit-labs/observers'].match(/\d+\.\d+\.\d+/);
      const litReactVersion = rootPackageJson.devDependencies['@lit/react'].match(/\d+\.\d+\.\d+/);
      const tslibVersion = rootPackageJson.devDependencies.tslib.match(/\d+\.\d+\.\d+/);
      const packageJsonTemplate = readFileSync(
        join(viteConfig.root, packageJsonTemplatePath),
        'utf8',
      );
      const packageJsonContent = packageJsonTemplate
        .replaceAll('0.0.0-PLACEHOLDER', rootPackageJson.version)
        .replaceAll('0.0.0-LITOBSERVERS', `^${litObserversVersion}`)
        .replaceAll('0.0.0-LITREACT', `^${litReactVersion}`)
        .replaceAll('0.0.0-TSLIB', `^${tslibVersion}`)
        .replaceAll('0.0.0-LIT', `^${litVersion}`);
      const packageJson = JSON.parse(packageJsonContent);
      for (const key of ['author', 'license', 'repository', 'bugs']) {
        packageJson[key] = rootPackageJson[key];
      }

      const lib = viteConfig.build.lib;
      if (lib && typeof lib.entry === 'object' && !Array.isArray(lib.entry)) {
        const exports = Object.entries(lib.entry)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .reduce(
            (current, next) =>
              Object.assign(
                current,
                ...options.exportsExtensions!.map((ext) => ({
                  [`./${next[0]}${ext}`]: {
                    types: `./development/${next[0]}.d.ts`,
                    development: `./development/${next[0]}.js`,
                    default: `./${next[0]}.js`,
                  },
                })),
              ),
            { ...options.exports, './package.json': { default: './package.json' } } as Record<
              string,
              Record<string, string>
            >,
          );
        packageJson.exports = exports;
      } else if (options.exports) {
        packageJson.exports = options.exports;
      }

      this.emitFile({
        type: 'asset',
        fileName: 'package.json',
        source: JSON.stringify(packageJson, null, 2),
      });
    },
  };
}
