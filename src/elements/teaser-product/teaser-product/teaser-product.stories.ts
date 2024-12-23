import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryContext,
  StoryObj,
} from '@storybook/web-components';
import { html, nothing, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import sampleImages from '../../core/images.js';

import readme from './readme.md?raw';

import './teaser-product.js';
import '../../button/button-static.js';
import '../../chip-label.js';
import '../../image.js';
import '../../title.js';

const imageAlignment: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['after', 'before'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const withFooter: InputType = {
  control: {
    type: 'boolean',
  },
};

const slottedImg: InputType = {
  control: {
    type: 'boolean',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const defaultArgTypes: ArgTypes = {
  'image-alignment': imageAlignment,
  negative,
  withFooter,
  slottedImg,
  href,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  'image-alignment': imageAlignment.options![0],
  negative: false,
  withFooter: true,
  slottedImg: false,
  href: 'https://www.sbb.ch',
  'accessibility-label': 'Benefit from up to 70% discount, Follow the link to benefit.',
};

const content = (): TemplateResult => html`
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit amet felis
    viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec tempor mi
    vel dapibus lobortis. Sed at ex sit amet leo suscipit fermentum. Donec consequat hendrerit
    tortor, ut laoreet velit congue in.
  </p>
  <sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>
`;

const footer = (): TemplateResult => html`
  <p slot="footnote" class="sbb-teaser-product--spacing">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia. Donec et enim mi. Aliquam erat volutpat. Proin ut odio tellus. Donec
    tempor mi vel dapibus lobortis.
  </p>
`;

const Template = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)}>
    ${slottedImg
      ? html`<img slot="image" src=${sampleImages[4]} alt="" />`
      : html`<sbb-image slot="image" image-src=${sampleImages[4]}></sbb-image>`}
    ${content()} ${withFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

const WithChipTemplate = ({ withFooter, slottedImg, ...args }: Args): TemplateResult => html`
  <sbb-teaser-product ${sbbSpread(args)}>
    <figure slot="image" class="sbb-figure">
      ${slottedImg
        ? html`<img src=${sampleImages[4]} alt="" />`
        : html`<sbb-image image-src=${sampleImages[4]}></sbb-image>`}
      <sbb-chip-label
        class=${args['image-alignment'] === 'after'
          ? 'sbb-figure-overlap-start-end'
          : 'sbb-figure-overlap-start-start'}
      >
        AI generated
      </sbb-chip-label>
    </figure>
    ${content()} ${withFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const ImageBefore: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'image-alignment': imageAlignment.options![1] },
};

export const NoFooter: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withFooter: false },
};

export const SlottedImg: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, slottedImg: true },
};

export const WithChip: StoryObj = {
  render: WithChipTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-teaser/sbb-teaser-product',
};

export default meta;
