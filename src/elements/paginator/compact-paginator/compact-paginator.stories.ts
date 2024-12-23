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

import { SbbCompactPaginatorElement } from './compact-paginator.js';
import readme from './readme.md?raw';

const length: InputType = {
  control: {
    type: 'number',
  },
};

const pageSize: InputType = {
  control: {
    type: 'number',
  },
};

const pageIndex: InputType = {
  control: {
    type: 'number',
  },
};

const pagerPosition: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
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

const defaultArgTypes: ArgTypes = {
  length,
  'page-size': pageSize,
  'page-index': pageIndex,
  'pager-position': pagerPosition,
  size,
  negative,
  disabled,
};

const defaultArgs: Args = {
  length: 100,
  'page-size': 10,
  'page-index': 0,
  'pager-position': pagerPosition.options![0],
  size: size.options![0],
  negative: false,
  disabled: false,
};

const Template = ({ ...args }: Args): TemplateResult => {
  return html` <sbb-compact-paginator
    aria-label="Select page"
    ${sbbSpread(args)}
  ></sbb-compact-paginator>`;
};

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

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const DisabledNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, disabled: true },
};

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const NegativeSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, size: size.options![1] },
};

export const PagerPositionEnd: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'pager-position': 'end' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbCompactPaginatorElement.events.page],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-paginator/sbb-compact-paginator',
};

export default meta;
