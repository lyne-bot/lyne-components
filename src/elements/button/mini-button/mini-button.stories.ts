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
import { html, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { buttonDefaultArgs, buttonDefaultArgTypes } from '../common/button-common-stories.js';

import '../../form-field.js';
import '../../icon.js';
import './mini-button.js';

import readme from './readme.md?raw';

const MiniButtonCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Demo sbb-mini-button</label>
    <input placeholder="Placeholder" ?disabled=${args.disabled} />
    <sbb-mini-button slot=${slot} ${sbbSpread(args)}></sbb-mini-button>
  </sbb-form-field>
`;

const MiniButtonSlottedIconCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${args.negative}>
    <label>Demo sbb-mini-button</label>
    <input placeholder="Placeholder" ?disabled=${args.disabled} />
    <sbb-mini-button slot=${slot} ${sbbSpread(args)}>
      <sbb-icon name="user-small" slot="icon"></sbb-icon>
    </sbb-mini-button>
  </sbb-form-field>
`;

const slot: InputType = {
  control: {
    type: 'select',
  },
  options: ['prefix', 'suffix'],
};

const miniButtonDefaultArgTypes: ArgTypes = {
  ...buttonDefaultArgTypes,
  slot,
};

const miniButtonDefaultArgs: Args = {
  ...buttonDefaultArgs,
  'icon-name': 'pen-small',
  slot: slot.options![0],
};

['size', 'text', 'tag'].forEach((e: string) => {
  delete miniButtonDefaultArgTypes[e];
  delete miniButtonDefaultArgs[e];
});

export const Prefix: StoryObj = {
  render: MiniButtonCommonTemplate,
};

export const PrefixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { negative: true },
};

export const PrefixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { disabled: true },
};

export const PrefixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { 'icon-name': undefined },
};

export const Suffix: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options![1] },
};

export const SuffixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options![1], negative: true },
};

export const SuffixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options![1], disabled: true },
};

export const SuffixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { slot: slot.options![1], 'icon-name': undefined },
};

const meta: Meta = {
  argTypes: miniButtonDefaultArgTypes,
  args: miniButtonDefaultArgs,
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-button/sbb-mini-button',
};

export default meta;
