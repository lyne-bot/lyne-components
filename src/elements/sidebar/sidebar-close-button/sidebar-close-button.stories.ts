import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './sidebar-close-button.js';

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  'aria-label': undefined,
};

const Template = (args: Args): TemplateResult =>
  html`<sbb-sidebar-close-button ${sbbSpread(args)}></sbb-sidebar-close-button>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-sidebar-close-button',
};

export default meta;
