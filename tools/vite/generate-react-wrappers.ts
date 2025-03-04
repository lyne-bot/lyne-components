/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  readFileSync,
  existsSync,
  mkdirSync,
  writeFileSync,
  readdirSync,
  statSync,
  rmSync,
  unlinkSync,
} from 'fs';
import { pathToFileURL } from 'node:url';

import type { Package, Export, CustomElementDeclaration, Module } from 'custom-elements-manifest';
import type { PluginOption } from 'vite';

import { distDir } from './build-meta.js';

export function generateReactWrappers(
  library: string,
  manifestPath: string,
  isMainLibrary = true,
): PluginOption {
  const fullManifestPath = new URL(manifestPath, distDir);
  let manifest: Package;
  try {
    manifest = JSON.parse(readFileSync(fullManifestPath, 'utf8'));
  } catch {
    console.error(
      `Failed to read manifest at ${fullManifestPath}. Please run 'yarn build:elements' or 'yarn docs:manifest' first!`,
    );
    process.exit(1);
  }

  const generatedPaths: URL[] = [];
  function createDir(dir: URL): void {
    if (!existsSync(dir)) {
      createDir(new URL('..', dir));
      generatedPaths.push(dir);
      mkdirSync(dir);
    }
  }
  return {
    name: 'generate-react-wrappers',
    config(config) {
      const packageRoot = pathToFileURL(config.root!);
      const exports = manifest.modules.reduce(
        (current, next) => current.concat(next.exports ?? []),
        [] as Export[],
      );
      const entryPoints: Record<string, string> = isMainLibrary ? { core: 'core.ts' } : {};
      for (const module of manifest.modules.filter((m) => !m.path.startsWith('core/'))) {
        for (const declaration of module.declarations?.filter(
          (d): d is CustomElementDeclaration => 'customElement' in d && d.customElement,
        ) ?? []) {
          const entryPoint = module.path.replace(/.js$/, '.ts');
          entryPoints[entryPoint.replace(/.ts$/, '')] = entryPoint;
          const targetPath = new URL(`./${entryPoint}`, packageRoot);
          createDir(new URL('.', targetPath));
          const reactTemplate = renderTemplate(
            declaration,
            module,
            exports,
            library,
            isMainLibrary,
          );
          generatedPaths.push(targetPath);
          writeFileSync(targetPath, reactTemplate, 'utf8');
        }
      }

      for (const dirent of readdirSync(packageRoot, { withFileTypes: true }).filter((d) =>
        d.isDirectory(),
      )) {
        const dir = new URL(`./${dirent.name}/`, packageRoot);
        const entryPoint = `${dirent.name}.ts`;
        entryPoints[dirent.name] = entryPoint;
        const dirEntryPoint = new URL(`../${entryPoint}`, dir);

        if (!existsSync(dirEntryPoint)) {
          generatedPaths.push(dirEntryPoint);
          const dirInfo = readdirSync(dir, { withFileTypes: true })
            .filter((d) => d.isFile())
            .map((d) => `export * from './${dirent.name}/${d.name.replace(/.ts$/, '.js')}';\n`)
            .join('');
          writeFileSync(dirEntryPoint, dirInfo, 'utf8');
        }
      }

      config.build!.lib = {
        ...(config.build!.lib ? config.build!.lib : {}),
        entry: entryPoints,
      };
    },
    closeBundle() {
      for (const path of generatedPaths.sort((a, b) => b.pathname.length - a.pathname.length)) {
        try {
          if (statSync(path).isDirectory()) {
            rmSync(path, { recursive: true, force: true });
          } else {
            unlinkSync(path);
          }
        } catch {
          /* empty */
        }
      }
    },
  };
}

function renderTemplate(
  declaration: CustomElementDeclaration,
  module: Module,
  exports: Export[],
  library: string,
  isMainLibrary: boolean,
): string {
  const dirDepth = module.path.split('/').length - 1;
  const coreImportPath = isMainLibrary
    ? `${!dirDepth ? './' : '../'.repeat(dirDepth)}core.js`
    : `@sbb-esta/lyne-react/core.js`;
  const componentsImports = new Map<string, string[]>().set(module.path, [declaration.name]);

  if (declaration.events?.some((e) => !e.type)) {
    console.error('(Inherited) events need jsdocs on class level!');
  }

  const customEventTypes =
    declaration.events
      ?.filter(
        (e) =>
          e.type.text.startsWith('CustomEvent<') &&
          ['void', '{', 'File'].every((m) => !e.type.text.includes(`<${m}`)),
      )
      .map((e) => e.type.text.substring(12).slice(0, -1))
      .sort()
      .filter((v, i, a) => a.indexOf(v) === i && v.length > 1) ?? [];
  // If a type or interface needs to be imported, the custom elements analyzer will not detect/extract these,
  // and therefore we need to have a manual list of required types/interfaces.
  const interfaces = new Map<string, string>()
    .set('SbbOverlayCloseEventDetails', 'core/interfaces.js')
    .set('SbbPaginatorPageEventDetails', 'core/interfaces.js')
    .set('SbbValidationChangeEvent', 'core/interfaces.js');
  for (const customEventType of customEventTypes) {
    const exportModule = exports.find((e) => e.name === customEventType);
    if (exportModule) {
      if (!componentsImports.has(exportModule.declaration.module!)) {
        componentsImports.set(exportModule.declaration.module!, [`type ${customEventType}`]);
      } else {
        componentsImports.get(exportModule.declaration.module!)!.push(`type ${customEventType}`);
      }
    } else if (interfaces.has(customEventType)) {
      const moduleName = interfaces.get(customEventType)!;
      if (!componentsImports.has(moduleName)) {
        componentsImports.set(moduleName, [`type ${customEventType}`]);
      } else {
        componentsImports.get(moduleName)!.push(`type ${customEventType}`);
      }
    } else {
      componentsImports.get(module.path)!.push(`type ${customEventType}`);
    }
  }
  const reactTemplate = `/* autogenerated */
  import { createComponent${declaration.events?.length ? ', type EventName' : ''} } from '${coreImportPath}';
  ${Array.from(componentsImports)
    .map(([key, imports]) => `import { ${imports.join(', ')} } from '${library}/${key}';`)
    .join('\n')}
  import react from 'react';

  // eslint-disable-next-line @typescript-eslint/naming-convention
  export const ${declaration.name.replace(/Element$/, '')} = createComponent({
    tagName: '${
      // eslint-disable-next-line lyne/local-name-rule
      declaration.tagName
    }',
    elementClass: ${declaration.name},
    react,${
      declaration.events
        ? `
    events: {${declaration
      .events!.map(
        (e) =>
          `\n    'on${e.name.charAt(0).toUpperCase() + e.name.slice(1)}': '${e.name}' as EventName<${e.type.text.replace(
            '<T>',
            '<any>',
          )}>,`,
      )
      .join('')}
    },
  `
        : ''
    }
  });
  `;
  return reactTemplate;
}
