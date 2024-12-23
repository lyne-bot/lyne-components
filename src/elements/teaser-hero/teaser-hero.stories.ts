import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import sampleImages from '../core/images.js';

import readme from './readme.md?raw';
import './teaser-hero.js';
import '../chip-label.js';
import '../image.js';

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
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
    category: 'link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'link',
  },
};

const content: InputType = {
  control: {
    type: 'text',
  },
};

const linkContent: InputType = {
  control: {
    type: 'text',
  },
};

const imageSrc: InputType = {
  control: {
    type: 'text',
  },
};

const chipLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'accessibility-label': accessibilityLabel,
  href,
  rel,
  target,
  content,
  'link-content': linkContent,
  'image-src': imageSrc,
  'chip-label': chipLabel,
};

const defaultArgs: Args = {
  'accessibility-label': undefined,
  href: href.options![0],
  rel: undefined,
  target: undefined,
  content: 'Break out and explore castles and palaces.',
  'link-content': 'Find out more',
  'image-src': sampleImages[1],
  'chip-label': undefined,
};

const Template = ({
  content,
  'chip-label': chipLabel,
  'link-content': linkContent,
  'image-src': imageSrc,
  'image-alt': imageAlt,
  ...args
}: Args): TemplateResult => html`
  <sbb-teaser-hero ${sbbSpread(args)}>
    ${content ?? nothing}
    ${linkContent ? html`<span slot="link-content">${linkContent}</span>` : nothing}
    ${!chipLabel
      ? html`<sbb-image slot="image" image-src=${imageSrc} alt=${imageAlt}></sbb-image>`
      : html`
          <figure class="sbb-figure" slot="image">
            <sbb-image image-src=${imageSrc} alt=${imageAlt}></sbb-image>
            <sbb-chip-label class="sbb-figure-overlap-start-start" style="z-index: 1">
              ${chipLabel}
            </sbb-chip-label>
          </figure>
        `}
  </sbb-teaser-hero>
`;

export const defaultTeaser: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const openInNewWindow: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    target: '_blank',
  },
};

export const withChip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'chip-label': 'Label',
  },
};

export const chipOnly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    href: href.options![0],
    'chip-label': 'Label',
    content: undefined,
    'link-content': undefined,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-teaser/sbb-teaser-hero',
};

export default meta;
