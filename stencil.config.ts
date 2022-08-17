import { inlineSvg } from 'stencil-inline-svg';
import jestConfig from './.jest.config.js';
import { sass } from '@stencil/sass';
import { Config } from '@stencil/core';
import { basename, dirname, join, resolve } from 'path';
import { existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { reactOutputTarget } from '@stencil/react-output-target';
import ts from 'typescript';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/global.shared.scss',
  namespace: 'lyne-components',
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: 'lyne-components',
      proxiesFile: '../src/components/components.ts',
    }),
    {
      type: 'dist-hydrate-script',
    },
    {
      esmLoaderPath: '../loader',
      type: 'dist',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      footer: '',
      type: 'docs-readme',
    },
    {
      dir: './dist/documentation',
      footer: '',
      type: 'docs-readme',
    },
    {
      file: './dist/documentation/jsonDocs.json',
      type: 'docs-json',
    },
    reactOutputTarget({
      componentCorePackage: '@sbb-esta/lyne-components',
      proxiesFile: './lyne-components-react/src/components/stencil-generated/index.ts',
      includeDefineCustomElements: true,
    })
  ],
  plugins: [
    inlineSvg(),
    sass({
      injectGlobalPaths: [
        'src/global/core/components/utilities.scss',
        'src/global/functions.scss',
        'src/global/mediaqueries.scss',
        'src/global/mixins.scss',
        'src/global/core/shared/variables.scss',
        'node_modules/@sbb-esta/lyne-design-tokens/dist/scss/sbb-variables_css--placeholder.scss',
      ],
    }),
  ],
  rollupPlugins: {
    // eslint-disable-next-line
    before: [eventSync()],
  },
  testing: jestConfig as any,
};

/* eslint-disable */
interface InputOptions {
  input: string[] | { [entryAlias: string]: string };
}

/**
 * Event sync rollup hook implementation.
 * For each build cycle, all component files are checked for @Event({...})
 * usages and the property name and event name will be synced in the
 * corresponding .events.ts file. *
 */
function eventSync(): any {
  const componentsPath = resolve(__dirname, 'src/components');
  return {
    buildStart(options: InputOptions): void {
      if (
        typeof options.input !== 'object' ||
        Object.keys(options.input).every((i) => !i.startsWith('sbb'))
      ) {
        return;
      }

      readdirSync(componentsPath, {
        withFileTypes: true,
      })
        .filter((d) => d.isDirectory())
        .map((d) => join(componentsPath, d.name, `${d.name}.tsx`))
        .forEach(syncEvents);
    },
    name: 'event-sync',
  };
}

/** Sync events for a specific component. */
function syncEvents(path: string) {
  let fileContent: string;
  try {
    fileContent = readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`Unable to find file ${path} for event sync!`);
  }
  const sourceFile = ts.createSourceFile(path, fileContent, ts.ScriptTarget.ESNext, true);
  const eventDecorators: { name: string; eventName: string }[] = [];
  let usesCustomEvent = false;
  iterateSourceFile(sourceFile);
  renderEventsFile();

  function iterateSourceFile(node: ts.Node) {
    if (ts.isPropertyDeclaration(node) && node.decorators?.length) {
      checkForEventDecorator(node);
    } else if (ts.isNewExpression(node) && node.expression.getText() === 'CustomEvent') {
      usesCustomEvent = true;
    } else {
      ts.forEachChild(node, iterateSourceFile);
    }
  }

  function checkForEventDecorator(node: ts.PropertyDeclaration) {
    const eventDecorator = node.decorators!.find(isEventDecorator);
    if (!eventDecorator) {
      return;
    }

    const name = node.name.getText();
    const eventName = findEventName(eventDecorator) ?? name;
    eventDecorators.push({ name, eventName });
  }

  function isEventDecorator(decorator: ts.Decorator) {
    const callExpression = decorator.expression;
    return ts.isCallExpression(callExpression) && callExpression.expression.getText() === 'Event';
  }

  function findEventName(decorator: ts.Decorator) {
    const callExpression = decorator.expression as ts.CallExpression;
    const argument = callExpression.arguments[0];
    if (callExpression.arguments.length !== 1 || !ts.isObjectLiteralExpression(argument)) {
      return null;
    }
    const eventName = argument.properties.find((p) => p.name?.getText() === 'eventName');
    if (!eventName || !ts.isPropertyAssignment(eventName)) {
      return null;
    }

    const initializer = eventName.initializer;
    return ts.isStringLiteral(initializer) ? initializer.text : null;
  }

  function renderEventsFile() {
    const eventsFile = join(dirname(path), basename(path).replace('.tsx', '.events.ts'));
    if (usesCustomEvent) {
      return;
    } else if (!eventDecorators.length) {
      deleteEventsFile(eventsFile);
      return;
    }

    let output = `/**
 * This file is autogenerated by the event-sync plugin.
 * See stencil.config.ts in the root directory.
 */
export default {\n`;
    for (const eventDecorator of eventDecorators.sort((a, b) => a.name.localeCompare(b.name))) {
      output += `  ${eventDecorator.name}: '${eventDecorator.eventName}',\n`;
    }

    output += '};\n';

    if (readFileSync(eventsFile, 'utf8') !== output) {
      writeFileSync(eventsFile, output, 'utf8');
    }
  }

  function deleteEventsFile(path: string) {
    if (existsSync(path)) {
      unlinkSync(path);
    }
  }
}
