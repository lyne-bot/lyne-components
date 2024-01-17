import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';
import images from '../core/images';
import '../image';
import '../title';
import '../button';
import './message';

import readme from './readme.md?raw';

const DefaultTemplate = (args): TemplateResult => html`
  <sbb-message ${sbbSpread(args)}>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button
      slot="action"
      icon-name="arrows-circle-small"
      variant="secondary"
      size="m"
    ></sbb-button>
  </sbb-message>
`;

const NoImageTemplate = (args): TemplateResult => html`
  <sbb-message ${sbbSpread(args)}>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button
      slot="action"
      icon-name="arrows-circle-small"
      variant="secondary"
      size="m"
    ></sbb-button>
  </sbb-message>
`;

const NoErrorCodeTemplate = (args): TemplateResult => html`
  <sbb-message ${sbbSpread(args)}>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <sbb-button
      slot="action"
      icon-name="arrows-circle-small"
      variant="secondary"
      size="m"
    ></sbb-button>
  </sbb-message>
`;

const NoActionTemplate = (args): TemplateResult => html`
  <sbb-message ${sbbSpread(args)}>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
  </sbb-message>
`;

const SlottedTitleTemplate = (): TemplateResult => html`
  <sbb-message>
    <sbb-image slot="image" image-src=${images[images.length - 1]}></sbb-image>
    <p slot="title">Unfortunately, an error has occurred.</p>
    <p slot="subtitle">Please reload the page or try your search again later.</p>
    <p slot="legend">Error code: 0001</p>
    <sbb-button slot="action" icon-name="arrows-circle-small" variant="secondary"></sbb-button>
  </sbb-message>
`;

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const defaultArgTypes: ArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
};

const defaultArgs: Args = {
  'title-content': 'Unfortunately, an error has occurred.',
  'title-level': 3,
};

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoImage: StoryObj = {
  render: NoImageTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoErrorCode: StoryObj = {
  render: NoErrorCodeTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const NoAction: StoryObj = {
  render: NoActionTemplate,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const SlottedTitle: StoryObj = {
  render: SlottedTitleTemplate,
  argTypes: defaultArgTypes,
  args: { 'title-content': undefined, 'title-level': undefined },
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <div style=${styleMap({ padding: '1rem', 'max-width': '45rem', margin: 'auto' })}>
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-message',
};

export default meta;
