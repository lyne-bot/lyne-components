import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import sampleImages from '../../core/images.js';

import { SbbFlipCardElement } from './flip-card.js';
import readme from './readme.md?raw';

import '../../chip-label.js';
import '../../image.js';
import '../../link/link.js';
import '../../title.js';
import '../flip-card-details.js';
import '../flip-card-summary.js';

const imageAlignment: InputType = {
  control: {
    type: 'select',
  },
  options: ['after', 'below'],
  table: {
    category: 'Summary',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Summary',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  imageAlignment,
  label,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  imageAlignment: imageAlignment.options![0],
  label: 'Summary',
  'accessibility-label': undefined,
};

const imgTemplate = (): TemplateResult => html`
  <sbb-image
    slot="image"
    image-src=${sampleImages[0]}
    alt="Conductor controlling a ticket"
  ></sbb-image>
`;

const imgWithChipTemplate = (): TemplateResult => html`
  <figure class="sbb-figure" slot="image">
    <sbb-image image-src=${sampleImages[0]} alt="Conductor controlling a ticket"></sbb-image>
    <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
  </figure>
`;

const cardSummary = (
  label: string,
  imageAlignment: any,
  showImage: boolean,
  showChip?: boolean,
): TemplateResult => html`
  <sbb-flip-card-summary image-alignment=${imageAlignment}>
    <sbb-title level="4">${label}</sbb-title>
    ${showImage ? (showChip ? imgWithChipTemplate() : imgTemplate()) : nothing}
  </sbb-flip-card-summary>
`;

const cardDetails = (): TemplateResult => html`
  <sbb-flip-card-details>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
    turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
    ullamcorper maximus. In convallis consectetur felis.
    <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
  </sbb-flip-card-details>
`;

const DefaultTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card accessibility-label=${args['accessibility-label']}>
    ${cardSummary(args.label, args.imageAlignment, true)} ${cardDetails()}
  </sbb-flip-card>`;

const WithChipTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card accessibility-label=${args['accessibility-label']}>
    ${cardSummary(args.label, args.imageAlignment, true, true)} ${cardDetails()}
  </sbb-flip-card>`;

const NoImageTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card accessibility-label=${args['accessibility-label']}>
    ${cardSummary(args.label, args.imageAlignment, false)} ${cardDetails()}
  </sbb-flip-card>`;

const LongContentTemplate = (args: Args): TemplateResult =>
  html`<sbb-flip-card accessibility-label=${args['accessibility-label']}>
    ${cardSummary(args.label, args.imageAlignment, true)}
    <sbb-flip-card-details>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit, dapibus eget
      fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper maximus. In
      convallis consectetur felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
      luctus ornare condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis
      in nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis. Lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus
      turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor
      ullamcorper maximus. In convallis consectetur felis.
      <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
    </sbb-flip-card-details>
  </sbb-flip-card>`;

const GridTemplate = (args: Args): TemplateResult =>
  html`<div
    style=${styleMap({
      display: 'grid',
      gridTemplateRows: 'minmax(20rem, 1fr)',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridColumnGap: '1rem',
      gridRowGap: '1rem',
    })}
  >
    <sbb-flip-card accessibility-label=${args['accessibility-label']}>
      ${cardSummary(args.label, args.imageAlignment, true)} ${cardDetails()}
    </sbb-flip-card>
    <sbb-flip-card accessibility-label=${args['accessibility-label']}>
      ${cardSummary(args.label, args.imageAlignment, true)}
      <sbb-flip-card-details>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
        Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus
        vitae tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit,
        dapibus eget fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper
        maximus. In convallis consectetur felis.
        <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
      </sbb-flip-card-details>
    </sbb-flip-card>
    <sbb-flip-card accessibility-label=${args['accessibility-label']}>
      ${cardSummary(args.label, args.imageAlignment, true)} ${cardDetails()}
    </sbb-flip-card>
    <sbb-flip-card accessibility-label=${args['accessibility-label']}>
      ${cardSummary(args.label, args.imageAlignment, true)} ${cardDetails()}
    </sbb-flip-card>
  </div>`;

export const ImageAfter: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const ImageBelow: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, imageAlignment: imageAlignment.options![1] },
};

export const WithChipOnImage: StoryObj = {
  render: WithChipTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const NoImage: StoryObj = {
  render: NoImageTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const LongTitle: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    label: 'This is a very long title that should break into multiple lines',
  },
};

export const Grid: StoryObj = {
  render: GridTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, imageAlignment: imageAlignment.options![1] },
};

const meta: Meta = {
  decorators: [
    (story) => html`<div style="max-width: 792px;">${story()}</div>`,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [SbbFlipCardElement.events.flip],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-flip-card/sbb-flip-card',
};

export default meta;
