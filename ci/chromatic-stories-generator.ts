import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, join, relative } from 'path';
import { fileURLToPath } from 'url';

import ts from 'typescript';

const chromaticFile = join(
  dirname(fileURLToPath(import.meta.url)),
  '../src/storybook/testing/chromatic.tsx',
);

function walk(root: string, filter: RegExp): string[] {
  return readdirSync(root, { withFileTypes: true }).reduce((current, next) => {
    const path = join(root, next.name);
    if (next.isDirectory()) {
      return current.concat(walk(path, filter));
    } else if (next.isFile() && path.match(filter)) {
      return current.concat(path);
    } else {
      return current;
    }
  }, [] as string[]);
}

function extractParameters(sourceFile: ts.SourceFile): {
  parameters: Record<string, any> | undefined;
  title: string;
} {
  return (
    ts.forEachChild(sourceFile, (node) => {
      if (
        ts.isVariableStatement(node) &&
        ts.isVariableDeclarationList(node.declarationList) &&
        node.declarationList.declarations.some((d) => d.name.getText() === 'meta')
      ) {
        const meta = node.declarationList.declarations.find((d) => d.name.getText() === 'meta')!;
        const parameters = (meta.initializer as ts.ObjectLiteralExpression).properties.find(
          (p): p is ts.PropertyAssignment => p.name?.getText() === 'parameters',
        )!;

        const title = (meta.initializer as ts.ObjectLiteralExpression).properties.find(
          (p): p is ts.PropertyAssignment => p.name?.getText() === 'title',
        )!;

        return {
          parameters: Function(
            `return ${parameters.initializer.getText().replace(/\w*\.events\.\w*/gm, '"dummy"')}`,
          )() as Record<string, any>,
          title: title.initializer.getText().replaceAll("'", ''),
        };
      }
    }) ?? { parameters: undefined, title: '' }
  );
}

async function generateChromaticStory(
  storyFile: string,
): Promise<'no params found' | 'disabledSnapshot configured' | undefined> {
  const content = readFileSync(storyFile, 'utf8');
  const sourceFile = ts.createSourceFile(storyFile, content, ts.ScriptTarget.ES2020, true);
  const { parameters, title } = extractParameters(sourceFile);
  if (!parameters) {
    return 'no params found';
  }

  const { disableSnapshot, ...chromaticParameters } = parameters?.chromatic ?? {};
  if (!parameters) {
    return 'no params found';
  } else if (disableSnapshot !== undefined) {
    return 'disabledSnapshot configured';
  }

  const targetStoryFile = storyFile.replace(/(\.stories\.[^.]+)$/, (_m, m) => `.chromatic${m}`);
  const relativeImport = basename(storyFile).replace(/\.(jsx|tsx|ts)$/, '');
  const chromaticImport = relative(dirname(targetStoryFile), chromaticFile).replace(/\.tsx$/, '');

  const chromaticConfig = Object.entries(chromaticParameters)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}, `)
    .join('');
  const storyFileContent = `import type { Meta, StoryObj } from '@storybook/web-components';
import config, * as stories from './${relativeImport}';
import { combineStories } from '${chromaticImport}';

const meta: Meta = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    chromatic: { ${chromaticConfig}disableSnapshot: false },
  },
  title: 'chromatic-only/${title}',
};

export default meta;

export const chromaticStories: StoryObj = {
  render: combineStories(config, stories)
};
`;
  writeFileSync(targetStoryFile, storyFileContent, 'utf-8');
  return undefined;
}

async function generateChromaticStories(): Promise<void> {
  console.log(`Generating chromatic story files:`);
  for (const storyFile of walk(
    join(dirname(fileURLToPath(import.meta.url)), '../src'),
    /.stories.(jsx|tsx|ts)$/,
  )) {
    if (storyFile.includes('chromatic')) {
      continue;
    }

    try {
      const result = await generateChromaticStory(storyFile);
      if (!result) {
        console.log(`- ${basename(storyFile)}`);
      } else {
        console.log(`- ${basename(storyFile)} (Skipped due to ${result})`);
      }
    } catch (e) {
      console.log(`Failed ${storyFile}`);
      console.log(e);
    }
  }
}

(async () => await generateChromaticStories())();
