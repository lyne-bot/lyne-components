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
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';
import '../../form-field';
import './mini-button';
import { buttonDefaultArgs, buttonDefaultArgTypes } from '../common/button-common-stories';

import readme from './readme.md?raw';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const MiniButtonCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field label="Demo sbb-mini-button" ?negative=${args.negative}>
    <input placeholder="Placeholder" ?disabled=${args.disabled} />
    <sbb-mini-button slot=${slot} ${sbbSpread(args)}></sbb-mini-button>
  </sbb-form-field>
`;

const MiniButtonSlottedIconCommonTemplate = ({ slot, ...args }: Args): TemplateResult => html`
  <sbb-form-field label="Demo sbb-mini-button" ?negative=${args.negative}>
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
};

['size', 'text'].forEach((e) => {
  delete miniButtonDefaultArgTypes[e];
  delete miniButtonDefaultArgs[e];
});

export const Prefix: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0] },
};

export const PrefixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0], negative: true },
};

export const PrefixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[0], disabled: true },
};

export const PrefixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { slot: slot.options[0] },
};

export const Suffix: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1] },
};

export const SuffixNegative: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1], negative: true },
};

export const SuffixDisabled: StoryObj = {
  render: MiniButtonCommonTemplate,
  args: { slot: slot.options[1], disabled: true },
};

export const SuffixSlottedIcon: StoryObj = {
  render: MiniButtonSlottedIconCommonTemplate,
  args: { slot: slot.options[1] },
};

const meta: Meta = {
  argTypes: miniButtonDefaultArgTypes,
  args: miniButtonDefaultArgs,
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button/sbb-mini-button',
};

export default meta;
