import { EOL } from 'node:os';

import * as ts from 'typescript';
import type { CompilerOptions, DiagnosticMessageChain } from 'typescript';
import type { PluginOption, Rollup } from 'vite';

import { prepareCompilerOptions } from '../node-esm-hook/typescript-hook.js';

export function typescriptTransform(): PluginOption {
  const cache: Map<string, CompilerOptions> = new Map();

  return {
    enforce: 'pre',
    name: 'vite-plugin-typescript-transform',

    buildStart(): void {
      cache.clear();
    },

    transform(code: string, file: string): Rollup.TransformResult {
      if (!file.split('?')[0].endsWith('.ts')) {
        return;
      }

      try {
        const compilerOptions = prepareCompilerOptions(cache, file);
        const transpileResult = ts.transpileModule(code, { compilerOptions, fileName: file });

        return {
          code: transpileResult.outputText,
          map: transpileResult.sourceMapText,
        };
      } catch (error) {
        this.error(
          typeof error === 'string' || error instanceof Error
            ? error
            : ts.flattenDiagnosticMessageText(error as DiagnosticMessageChain, EOL),
        );
      }
    },
  };
}
