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

import { SbbPaginatorElement } from './paginator.js';
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

const pageSizeOptionsValues = [[], [10, 20, 50, 100], [10, 50, 100, 500]];
const pageSizeOptions: InputType = {
  options: Object.keys(pageSizeOptionsValues),
  mapping: pageSizeOptionsValues,
  control: {
    type: 'select',
    labels: {
      0: 'none',
      1: '10, 20, 50, 100',
      2: '10, 50, 100, 500',
    },
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
  pageSizeOptions,
  'pager-position': pagerPosition,
  size,
  negative,
  disabled,
};

const defaultArgs: Args = {
  length: 100,
  'page-size': 10,
  'page-index': 0,
  pageSizeOptions: pageSizeOptions.options![0],
  'pager-position': pagerPosition.options![0],
  size: size.options![0],
  negative: false,
  disabled: false,
};

const Template = ({ pageSizeOptions, ...args }: Args): TemplateResult => {
  return html` <sbb-paginator
    aria-label="Select page"
    .pageSizeOptions=${pageSizeOptions}
    ${sbbSpread(args)}
  ></sbb-paginator>`;
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

export const WithPageSizeOptions: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, length: 1000, pageSizeOptions: pageSizeOptions.options![1] },
};

export const WithPageSizeOptionsDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    length: 1000,
    disabled: true,
    pageSizeOptions: pageSizeOptions.options![1],
  },
};

export const WithPageSizeOptionsNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    length: 1000,
    negative: true,
    pageSizeOptions: pageSizeOptions.options![1],
  },
};

export const WithPageSizeOptionsNegativeSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    length: 1000,
    negative: true,
    pageSizeOptions: pageSizeOptions.options![1],
    size: size.options![1],
  },
};

export const PagerPositionEnd: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'pager-position': 'end' },
};

export const PagerPositionEndPageSizeOptions: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    length: 1000,
    pageSizeOptions: pageSizeOptions.options![1],
    'pager-position': 'end',
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbPaginatorElement.events.page],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-paginator/sbb-paginator',
};

export default meta;
