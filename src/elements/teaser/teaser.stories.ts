import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import images from '../core/images.js';

import placeholderImage from './assets/placeholder.png';
import readme from './readme.md?raw';
import '../chip-label.js';
import '../image.js';
import './teaser.js';

const loremIpsum: string = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const chipContent: InputType = {
  control: {
    type: 'text',
  },
};

const alignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after-centered', 'after', 'below'],
};

const hrefs: string[] = [
  'https://www.sbb.ch',
  'https://github.com/sbb-design-systems/lyne-components',
];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Link',
  },
};

const description: InputType = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'title-content': titleContent,
  'chip-content': chipContent,
  alignment,
  href,
  description,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  'title-content': 'This is a title',
  'chip-content': undefined,
  alignment: 'after-centered',
  href: href.options![1],
  description: 'This is a paragraph',
  'accessibility-label':
    'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the Teaser, either through text or iconography',
};

const TemplateDefault = ({ description, ...remainingArgs }: Args): TemplateResult => {
  return html`
    <sbb-teaser ${sbbSpread(remainingArgs)}>
      <figure slot="image" class="sbb-figure">
        <img src=${placeholderImage} alt="400x300" />
        <sbb-chip-label class="sbb-figure-overlap-start-start">AI Generated</sbb-chip-label>
      </figure>
      ${description}
    </sbb-teaser>
  `;
};

const TemplateDefaultFixedWidth = ({ description, ...remainingArgs }: Args): TemplateResult => {
  return html`
    <sbb-teaser ${sbbSpread(remainingArgs)} style="width:400px">
      <img src=${placeholderImage} alt="400x300" slot="image" />
      ${description}
    </sbb-teaser>
  `;
};

const TemplateCustom = ({ description, ...remainingArgs }: Args): TemplateResult => {
  return html`
    <sbb-teaser ${sbbSpread(remainingArgs)}>
      <img
        src=${placeholderImage}
        alt="200x100"
        class="sbb-image-2-1"
        style="width: 200px;"
        slot="image"
      />
      ${description}
    </sbb-teaser>
  `;
};

const TemplateSlots = ({
  'title-content': titleContent,
  'chip-content': chipContent,
  description,
  ...remainingArgs
}: Args): TemplateResult => {
  return html`
    <sbb-teaser ${sbbSpread(remainingArgs)}>
      <img src=${placeholderImage} alt="400x300" slot="image" />
      <span slot="chip">${chipContent}</span>
      <span slot="title">${titleContent}</span>
      ${description}
    </sbb-teaser>
  `;
};

const TemplateList = (args: Args): TemplateResult => html`
  <ul style="list-style: none;">
    ${repeat(
      new Array(6),
      () => html`<li style="margin-block: 1rem;">${TemplateDefault(args)}</li>`,
    )}
  </ul>
`;

const TemplateGrid = ({ description, ...remainingArgs }: Args): TemplateResult => html`
  <div style="display:grid; gap: 2rem; grid-template-columns: repeat(4, 1fr);">
    ${repeat(
      new Array(4),
      () => html`
        <sbb-teaser ${sbbSpread(remainingArgs)} style="--sbb-teaser-align-items: stretch;">
          <figure slot="image" class="sbb-figure" style="width: 100%;">
            <sbb-image image-src=${images[10]} alt="400x300"></sbb-image>
          </figure>
          ${description}
        </sbb-teaser>
      `,
    )}
  </div>
`;

export const AfterCentered: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const After: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'after' },
};

export const Below: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below' },
};

export const AfterCenteredChip: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'after-centered', 'chip-content': 'This is a chip.' },
};

export const AfterChip: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'after', 'chip-content': 'This is a chip.' },
};

export const AfterWithLongContentChip: StoryObj = {
  render: TemplateDefaultFixedWidth,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    alignment: 'after',
    'chip-content': 'This is a chip which has a very long content and should receive ellipsis.',
  },
};

export const BelowChip: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below', 'chip-content': 'This is a chip.' },
};

export const BelowWithLongContentChip: StoryObj = {
  render: TemplateDefaultFixedWidth,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    alignment: 'below',
    'chip-content': 'This is a chip which has a very long content and should receive ellipsis.',
  },
};

export const WithLongTextCentered: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'title-content': loremIpsum, description: loremIpsum },
};

export const WithLongTextAfter: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'title-content': loremIpsum,
    description: loremIpsum,
    alignment: 'after',
  },
};

export const WithLongTextBelow: StoryObj = {
  render: TemplateDefault,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'title-content': loremIpsum,
    description: loremIpsum,
    alignment: 'below',
  },
};

export const WithCustomWidthAndAspectRatio: StoryObj = {
  render: TemplateCustom,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const List: StoryObj = {
  render: TemplateList,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithSlots: StoryObj = {
  render: TemplateSlots,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'chip-content': 'Chip content' },
};

export const Grid: StoryObj = {
  render: TemplateGrid,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, alignment: 'below' },
};

const meta: Meta = {
  decorators: [
    (story) => html`<div style="max-width: 760px;">${story()}</div>`,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-teaser/sbb-teaser',
};

export default meta;
