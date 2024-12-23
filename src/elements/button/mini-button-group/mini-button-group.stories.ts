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

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './mini-button-group.js';
import '../mini-button.js';
import '../../divider/divider.js';

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l', 'xl'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  disabled,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  size: size.options![1],
  negative: false,
  disabled: false,
  'accessibility-label': '',
};

const Template = ({ disabled, ...args }: Args): TemplateResult =>
  html` <sbb-mini-button-group ${sbbSpread(args)}>
    <sbb-mini-button
      ?disabled=${disabled}
      aria-label="previous"
      icon-name="chevron-small-left-small"
    ></sbb-mini-button>
    <sbb-mini-button
      ?disabled=${disabled}
      aria-label="next"
      icon-name="chevron-small-right-small"
    ></sbb-mini-button>
    <sbb-divider orientation="vertical"></sbb-divider>
    <sbb-mini-button aria-label="edit" icon-name="pen-small"></sbb-mini-button>
    <sbb-mini-button aria-label="duplicate" icon-name="copy-small"></sbb-mini-button>
    <sbb-mini-button aria-label="delete" icon-name="trash-small"></sbb-mini-button>
    <sbb-divider orientation="vertical"></sbb-divider>
    <sbb-mini-button aria-label="bookmark" icon-name="star-small"></sbb-mini-button>
  </sbb-mini-button-group>`;

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

export const NegativeDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, disabled: true },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 's' },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 'l' },
};

export const SizeXL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 'xl' },
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
  title: 'elements/sbb-button/sbb-mini-button-group',
};

export default meta;
