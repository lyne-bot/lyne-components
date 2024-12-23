// @ts-check

/**
 * The sass hook will compile any imports containing `.scss?` to CSS wrapped in the
 * lit CSS tagged template function.
 * This allows lit elements to be consumed in SSR tests in a Node.js worker.
 */

import { fileURLToPath } from 'node:url';

import { initCompiler } from 'sass';

import { createAliasResolver } from './tsconfig-utility.js';

const root = new URL('../../', import.meta.url).href;
const aliasResolver = createAliasResolver();
const sassCompiler = initCompiler();
const compileSass = (/** @type {string} */ fileUrl) =>
  sassCompiler
    .compile(fileURLToPath(fileUrl), {
      loadPaths: ['.', './node_modules/'],
      importers: [
        {
          findFileUrl(url, _context) {
            if (!url.includes('node_modules')) {
              const resolvedUrl = aliasResolver(url);
              return resolvedUrl ? new URL(resolvedUrl) : null;
            }

            return null;
          },
        },
      ],
    })
    .css.replace(/`/g, '\\`')
    .replace(/\\(?!`)/g, '\\\\');

/**
 * @param {string} url - The URL of the resource to load as a string.
 * @param {object} context - The context in which the load function is called.
 * @param {function} nextLoad - The function to call if this loader does nothing.
 * @returns {Promise} - A Promise that resolves with an object containing the format, shortCircuit flag, and source of the resource,
 * or rejects with an error.
 */
export function load(url, context, nextLoad) {
  if (url.startsWith(root) && url.includes('.scss?')) {
    const source = `import { css } from 'lit';\nexport default css\`${compileSass(url)}\`;`;
    return Promise.resolve({
      format: 'module',
      shortCircuit: true,
      source,
    });
  }
  return nextLoad(url, context);
}
