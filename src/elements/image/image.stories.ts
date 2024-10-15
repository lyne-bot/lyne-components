import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import images from '../core/images.js';

import { SbbImageElement } from './image.js';
import readme from './readme.md?raw';

const Template = (args: Args): TemplateResult => html`<sbb-image ${sbbSpread(args)}></sbb-image>`;

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
};

const aspectRatio: InputType = {
  control: { type: 'select' },
  options: ['free', '1-1', '1-2', '2-1', '2-3', '3-2', '3-4', '4-3', '4-5', '5-4', '9-16', '16-9'],
};

const alt: InputType = {
  control: {
    type: 'text',
  },
};

const caption: InputType = {
  control: {
    type: 'text',
  },
};

const copyright: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Legal',
  },
};

const copyrightHolder: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['Organization', 'Person'],
  table: {
    category: 'Legal',
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
  caption,
  'border-radius': borderRadius,
  'aspect-ratio': aspectRatio,
  copyright,
  'copyright-holder': copyrightHolder,
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
  caption: undefined,
  // we need a string and not boolean, otherwise storybook add/remove the attribute but don't write the value
  'border-radius': 'default',
  'aspect-ratio': aspectRatio.options![0],
  copyright: '',
  'copyright-holder': copyrightHolder.options![0],
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
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    caption:
      'Mit Ihrem Halbtax profitieren Sie zudem von attraktiven Zusatzleistungen und Rabatten. Wenn Sie unter 25 Jahre jung sind, können Sie zu Ihrem Halbtax das beliebte <a href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax">Gleis 7</a> dazu kaufen.',
  },
};

export const TransparentImage: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'image-src': imageSrc.options![9],
  },
};

export const NoCaptionNoRadius: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'border-radius': 'none',
  },
};

export const RoundBorderRadius: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'border-radius': 'round',
    'aspect-ratio': '1-1',
  },
};

export const SkipLqip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'skip-lqip': true,
  },
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
