/**
 * Docs: https://github.com/open-wc/custom-elements-manifest/tree/master/packages/to-markdown
 */
import fs from 'fs';

import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';
import type {
  Attribute,
  ClassDeclaration,
  CustomElement,
  Package,
} from 'custom-elements-manifest/schema';
import * as glob from 'glob';
// eslint-disable-next-line @typescript-eslint/naming-convention
import MagicString from 'magic-string';
import { format, resolveConfig } from 'prettier';

import elementsManifestConfig from '../manifest/elements-custom-elements-manifest.config.js';
import elementsExperimentalManifestConfig from '../manifest/elements-experimental-custom-elements-manifest.config.js';

const manifestFilePaths = [
  `${elementsManifestConfig.outdir}/custom-elements.json`,
  `${elementsExperimentalManifestConfig.outdir}/custom-elements.json`,
];
const tempFolderPath = './dist/docs';
const componentsFolder = './src';
const inheritedFromColumnIndex = 6;
const propertyColumnIndex = 1;
const attributeColumnIndex = 2;

function getAttributeName(propertyName: string, attributes: Attribute[]): string {
  const name = propertyName.replace(/['`]/g, '').trim();
  const attr = attributes.find((a) => a.fieldName === name)?.name;
  return attr ? `\`${attr}\`` : '-';
}

/**
 * Add the 'attribute' column.
 * Removes the 'Inherited from' column.
 * Replace 'Fields' title with 'Properties'
 */
function updateFieldsTable(
  newDocs: MagicString,
  sections: RegExpMatchArray[],
  attributes?: Attribute[],
): void {
  const fieldsSectionIndex = sections.findIndex((sect) => sect.groups!.name === 'Fields');
  const startIndex = sections[fieldsSectionIndex]?.index;
  const endIndex = sections[fieldsSectionIndex + 1]?.index;
  if (fieldsSectionIndex === -1) {
    return;
  }

  // Create a matrix 'table[row][column]' structure for the fields table
  const fieldsSection = newDocs.original
    .substring(startIndex!, endIndex)
    // Remove leading pipes (prettier artifacts in ts files)
    .replaceAll('`\\| ', '`')
    // Remove doubled spaces (unwanted artifacts)
    .replace(/  +/g, ' ');

  const tableRows = Array.from(fieldsSection.matchAll(/^\|.*\|$/gm))
    .map((match) => match[0])
    .map((row) => row.split(/(?<!\\)\|/g)); // Split by not escaped '|'

  // Remove the 'Inherited from' column
  tableRows.forEach((row) => row.splice(inheritedFromColumnIndex, 1));

  // Add the 'attribute' column using the attributes collection (read from the manifest)
  const attributeColumn = [
    tableRows[0][propertyColumnIndex].replace('Name', 'Attribute').trim(),
    tableRows[1][propertyColumnIndex],
    ...tableRows
      .slice(2)
      .map((entry) => getAttributeName(entry[propertyColumnIndex], attributes || [])),
  ];

  // Insert the attribute column in the table
  attributeColumn.forEach((attributeColumn, i) =>
    tableRows[i].splice(attributeColumnIndex, 0, attributeColumn),
  );

  const fieldsTable = tableRows.map((cols) => cols.join('|')).join('\n');
  newDocs.update(
    startIndex!,
    endIndex ?? newDocs.original.length,
    `## Properties\n\n${fieldsTable}\n\n`,
  );
}

async function updateComponentReadme(
  name: string,
  tag: string,
  docs: string,
  manifest: CustomElement,
): Promise<void> {
  const path = glob.sync(`${componentsFolder}/**/${tag.replace(/^sbb-/, '')}/readme.md`)[0];
  if (!fs.existsSync(path)) {
    console.error(`Component ${name} has no readme file, please create it following the template`);
    return;
  }
  const newReadme = new MagicString(fs.readFileSync(path, 'utf8'));
  let newDocs = new MagicString(docs);

  // Remove the details (private API) section and commit the change
  const detailsSectionStart = newDocs.original.match(/<details>/)?.index;
  newDocs.remove(detailsSectionStart!, newDocs.original.length);
  newDocs = new MagicString(newDocs.toString());

  const sections = Array.from(newDocs.original.matchAll(/## (?<name>.+)/g));

  // Remove the title
  newDocs.replace(/^# class: `.*`\n/m, '');

  updateFieldsTable(newDocs, sections, manifest.attributes ?? []);
  newDocs = new MagicString(newDocs.toString());

  // Unescape `
  newDocs.replace(/\\`/g, '`');

  // Unescape tag openings
  newDocs.replace(/\\</g, '<');

  // Unescape : (Fixes URL)
  newDocs.replace(/\\:/g, ':');

  // Replace &#xA; with space
  newDocs.replace(/&#xA;/g, ' ');

  // Change the generated doc here
  newDocs.prepend('<!-- Auto Generated Below -->\n\n');

  // Replace the generated doc in the readme
  const generatedStartIndex =
    newReadme.original.match('<!-- Auto Generated Below -->')?.index ?? newReadme.original.length;
  newReadme.update(generatedStartIndex, newReadme.length(), newDocs.toString());
  const options = await resolveConfig(path);
  fs.writeFileSync(path, await format(newReadme.toString(), { ...options, filepath: path }));
}

type ExtendedClassDeclaration = ClassDeclaration & {
  cssProperties: { name: string }[];
  events: { name: string }[];
  members: { name: string }[];
  slots: { name: string }[];
};

for (const manifestPath of manifestFilePaths) {
  const manifest: Package = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  manifest.modules.forEach((module) => {
    module.declarations
      ?.filter(
        (declaration): declaration is ExtendedClassDeclaration => declaration.kind === 'class',
      )
      .forEach((declaration) =>
        ['members', 'slots', 'cssProperties', 'events'].forEach((type) =>
          (declaration[type as keyof ExtendedClassDeclaration] as { name: string }[])?.sort(
            (a, b) => a.name.localeCompare(b.name),
          ),
        ),
      );
  });

  const markdown: string = customElementsManifestToMarkdown(manifest, {
    headingOffset: -1, // Default heading is '###'
    private: 'details', // We use 'details' because it's the only way to remove 'protected' members from the tables. We remove details section later.
    omitDeclarations: ['exports'],
    omitSections: [
      'super-class',
      'css-parts',
      'main-heading',
      'static-fields',
      'attributes',
      'mixins',
    ],
  });
  const manifestDeclarations = manifest.modules.flatMap((m) => m.declarations);

  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath, { recursive: true });
  }
  fs.writeFileSync(`${tempFolderPath}/components.md`, markdown);

  // Split the generated file into the single readme of each component
  const matches = Array.from(markdown.matchAll(/^# class: `(?<name>.*)`, `(?<tag>.*)`$/gm));

  for (let i = 0; i < matches.length; i++) {
    const startIndex = matches[i].index!;
    const endIndex = matches[i + 1]?.index ?? markdown.length;
    const compName = matches[i].groups!.name;
    const compTag = matches[i].groups!.tag;

    const componentMarkdown = markdown.substring(startIndex, endIndex);

    // If there is a `<hr/>` it indicates corrupted data respect. mixed data over different components.
    // If we just stop before occurrence of `<hr/>` we are not including the corrupted data.
    const hrIndex = componentMarkdown.indexOf('<hr/>');
    const markdownDoc = componentMarkdown.substring(0, hrIndex);
    const compManifest = manifestDeclarations.find(
      (c) => c?.kind === 'class' && c.name === compName,
    ) as CustomElement;

    await updateComponentReadme(compName, compTag, markdownDoc, compManifest);
  }
  console.log(`Docs generated successfully from ${manifestPath}`);
}
