import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import images from '../core/images.js';

import { SbbImageElement } from './image.js';
import readme from './readme.md?raw';
import '../chip-label.js';

const ImageTemplate = ({ aspectRatio, borderRadius, ...args }: Args): TemplateResult => html`
  <sbb-image
    ${sbbSpread(args)}
    class=${classMap({
      [`sbb-image-${aspectRatio}`]: true,
      [`sbb-image-border-radius-${borderRadius}`]: true,
    })}
  >
  </sbb-image>
`;

const WithCaptionTemplate = (args: Args): TemplateResult => html`
  <figure class="sbb-figure">
    ${ImageTemplate(args)}
    <figcaption>
      With the
      <a href="https://www.sbb.ch/en/tickets-offers/travelcards/half-fare-travelcard.html"
        >Half Fare Travelcard</a
      >
      , you can travel for half price on all SBB routes and most other railways as well as on boats
      and Postbuses. You also benefit from discounts on urban transport as well as other additional
      attractive services and discounts.
    </figcaption>
  </figure>
`;

const WithChipTemplate = ({ chipPosition, ...args }: Args): TemplateResult => html`
  <figure class="sbb-figure">
    ${ImageTemplate(args)}
    <sbb-chip-label class="sbb-figure-overlap-${chipPosition}">AI generated</sbb-chip-label>
  </figure>
`;

const imageSrc: InputType = {
  control: {
    type: 'select',
  },
  options: images,
};

const borderRadius: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'none', 'round'],
  table: {
    category: 'Utility classes',
  },
};

const aspectRatio: InputType = {
  control: { type: 'select' },
  options: ['free', '1-1', '1-2', '2-1', '2-3', '3-2', '3-4', '4-3', '4-5', '5-4', '9-16', '16-9'],
  table: {
    category: 'Utility classes',
  },
};

const chipPosition: InputType = {
  control: { type: 'select' },
  options: ['start-start', 'start-end', 'end-start', 'end-end'],
  table: {
    category: 'Utility classes',
  },
};

const alt: InputType = {
  control: {
    type: 'text',
  },
};

const customFocalPoint: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointDebug: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointX: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointY: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const loading: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['eager', 'lazy'],
  table: {
    category: 'Performance',
  },
};

const skipLqip: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Performance',
  },
};

const performanceMark: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Performance',
  },
};

const defaultArgTypes: ArgTypes = {
  alt,
  borderRadius,
  aspectRatio,
  'custom-focal-point': customFocalPoint,
  'focal-point-debug': focalPointDebug,
  'focal-point-x': focalPointX,
  'focal-point-y': focalPointY,
  'image-src': imageSrc,
  loading,
  'skip-lqip': skipLqip,
  'performance-mark': performanceMark,
};

const defaultArgs: Args = {
  alt: '',
  borderRadius: borderRadius.options![0],
  aspectRatio: aspectRatio.options![0],
  'custom-focal-point': false,
  'focal-point-debug': false,
  'focal-point-x': '',
  'focal-point-y': '',
  'image-src': imageSrc.options![0],
  loading: loading.options![1],
  'skip-lqip': false,
  'performance-mark': '',
};

export const Default: StoryObj = {
  render: WithCaptionTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const TransparentImage: StoryObj = {
  render: ImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': imageSrc.options![9],
  },
};

export const NoCaptionNoRadius: StoryObj = {
  render: ImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    borderRadius: 'none',
  },
};

export const RoundBorderRadius: StoryObj = {
  render: ImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    borderRadius: 'round',
    aspectRatio: '1-1',
  },
};

export const SkipLqip: StoryObj = {
  render: ImageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'skip-lqip': true,
  },
};

export const WithChip: StoryObj = {
  render: WithChipTemplate,
  argTypes: { ...defaultArgTypes, chipPosition },
  args: { ...defaultArgs, chipPosition: chipPosition.options![0] },
};

const meta: Meta = {
  decorators: [
    (story) => html`<div style="max-width: 480px;">${story()}</div>`,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [SbbImageElement.events.load, SbbImageElement.events.error],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-image',
};

export default meta;
