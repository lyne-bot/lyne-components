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
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../button/mini-button.js';
import './tooltip.js';

const myProp: InputType = {
  control: {
    type: 'select',
  },
  options: ['padding', 'start', 'end'],
};

const defaultArgTypes: ArgTypes = {
  alignment: myProp,
};

const defaultArgs: Args = {
  alignment: 'Alignment',
};

const Template = (args: Args): TemplateResult =>
  html`<div style="padding: 5rem;${args.alignment === 'start' ? 'padding-inline-start: 0;' : ''}">
    <sbb-mini-button icon-name="circle-information-small" sbb-tooltip="Example"></sbb-mini-button>
  </div>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-tooltip',
};

export default meta;
