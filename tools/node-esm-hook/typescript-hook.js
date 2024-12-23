// @ts-check

/**
 * The TypeScript hook checks for each import, if a corresponding .ts file exists in our repository
 * (and if the corresponding .js file is missing). If that is the case the import path is resolved
 * to the .ts file.
 * Once the load hook for this file is called, it will dynamically compile the file with esbuild.
 * Source maps will only work if Node.js is executed with --enable-source-maps.
 */

import { existsSync, readFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as ts from 'typescript';

import { createAliasResolver, root } from './tsconfig-utility.js';

const aliasResolver = createAliasResolver();
const assertTypeScriptFilePath = (/** @type {string?} */ url) => {
  const tsUrl = url?.replace(/.js$/, '.ts');
  return tsUrl && url && !existsSync(fileURLToPath(url)) && existsSync(fileURLToPath(tsUrl))
    ? tsUrl
    : null;
};
const compilerConfigCache = new Map();

/**
 * @param {Map<string, ts.CompilerOptions>} cache
 * @param {string} file
 * @returns {ts.CompilerOptions}
 */
export function prepareCompilerOptions(cache, file) {
  const key = dirname(file);

  let compilerOptions = cache.get(key);
  if (compilerOptions) {
    return compilerOptions;
  }

  const tsconfigPath = ts.findConfigFile(file, ts.sys.fileExists);
  if (!tsconfigPath) {
    throw new Error(`Could not find TypeScript configuration for ${file}`);
  }

  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (error) {
    throw error;
  }

  compilerOptions = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    dirname(tsconfigPath),
    undefined,
    basename(tsconfigPath),
  ).options;
  cache.set(key, compilerOptions);

  return compilerOptions;
}

/** @type {import('node:module').ResolveHook} */
export const resolve = (specifier, context, nextResolve) => {
  let url = null;
  if (
    (specifier.startsWith('.') || specifier.startsWith(root)) &&
    !specifier.includes('/node_modules/') &&
    context.parentURL?.startsWith(root)
  ) {
    url = assertTypeScriptFilePath(new URL(specifier, context.parentURL).href);
  } else {
    url = assertTypeScriptFilePath(aliasResolver(specifier));
  }
  return url ? { format: 'module', shortCircuit: true, url } : nextResolve(specifier, context);
};

/** @type {import('node:module').LoadHook} */
export const load = (url, context, nextLoad) => {
  if (url.startsWith(root) && !url.includes('/node_modules/') && url.endsWith('.ts')) {
    const file = fileURLToPath(url);
    const code = readFileSync(file, 'utf8');

    try {
      const compilerOptions = prepareCompilerOptions(compilerConfigCache, file);
      const transpileResult = ts.transpileModule(code, {
        compilerOptions: { ...compilerOptions, sourceMap: true, inlineSourceMap: true },
        fileName: file,
        transformers: {
          after: [
            // We want to replace import.meta.env usages with constants.
            // @ts-expect-error The typings are not fully correct, but it is the intended usage.
            (context) => (sourceFile) => {
              const visitor = (/** @type {ts.Node} */ node) => {
                if (
                  ts.isPropertyAccessExpression(node) &&
                  ts.isPropertyAccessExpression(node.expression) &&
                  ts.isMetaProperty(node.expression.expression) &&
                  ts.isIdentifier(node.expression.name) &&
                  node.expression.name.escapedText === 'env'
                ) {
                  return node.name.escapedText === 'DEV'
                    ? context.factory.createTrue()
                    : context.factory.createFalse();
                }

                return ts.visitEachChild(node, visitor, context);
              };

              return ts.visitNode(sourceFile, visitor);
            },
          ],
        },
      });

      return { format: 'module', shortCircuit: true, source: transpileResult.outputText };
    } catch (error) {
      throw typeof error === 'string' || error instanceof Error
        ? error
        : // @ts-expect-error In this scenario, error can only be the expected type.
          ts.flattenDiagnosticMessageText(error, EOL);
    }
  }
  return nextLoad(url, context);
};
