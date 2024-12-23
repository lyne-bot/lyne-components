import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import '../../icon.js';
import '../../title.js';
import '../../card/card-badge.js';
import '../radio-button-panel.js';

const value: InputType = {
  control: {
    type: 'text',
  },
};

const checked: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const labelBoldClass: InputType = {
  control: {
    type: 'boolean',
  },
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const defaultArgTypes: ArgTypes = {
  value,
  checked,
  disabled,
  'aria-label': ariaLabel,
  labelBoldClass,
  color,
  borderless,
  size,
};

const defaultArgs: Args = {
  value: 'First value',
  checked: false,
  disabled: false,
  'aria-label': undefined,
  labelBoldClass: false,
  color: color.options![0],
  borderless: false,
  size: size.options![0],
};

const cardBadge = (): TemplateResult => html`<sbb-card-badge>%</sbb-card-badge>`;

const DefaultTemplate = ({ labelBoldClass, ...args }: Args): TemplateResult =>
  html`<sbb-radio-button-panel ${sbbSpread(args)} name=${args.name || nothing}
    >${labelBoldClass ? html`<span class="sbb-text--bold">Label</span>` : 'Label'}
    <span slot="subtext">Subtext</span>
    <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
      <sbb-icon
        name="diamond-small"
        style="margin-inline: var(--sbb-spacing-fixed-2x);"
        data-namespace="default"
        role="img"
        aria-hidden="true"
      ></sbb-icon>
      <span class="${args['size'] ? `sbb-text-${args['size']}` : 'sbb-text-m'} sbb-text--bold">
        CHF 40.00
      </span>
    </span>
    ${cardBadge()}
  </sbb-radio-button-panel>`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StandaloneTemplate = ({ value, ...args }: Args): TemplateResult => html`
  <form>
    <sbb-title level="6" style="margin-block-start: 0">Group 1</sbb-title>
      ${repeat(
        new Array(3),
        (_, i) =>
          html` <div style="margin-block-start: .5rem">
            ${DefaultTemplate({ ...args, value: `value-${i + 1}`, name: `group-1` })}
          </div>`,
      )}
    </div>

    <sbb-title level="6">Group 2</sbb-title>
    ${repeat(
      new Array(4),
      (_, i) =>
        html` <div style="margin-block-start: .5rem">
          ${DefaultTemplate({ ...args, value: `value-${i + 1}`, name: `group-2` })}
        </div>`,
    )}
  </form>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Checked: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
};

export const SizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options![1] },
};

export const Disabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const CheckedDisabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true, disabled: true },
};

export const DefaultBold: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, labelBoldClass: true },
};

export const CheckedBold: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true, labelBoldClass: true },
};

export const StandaloneGroup: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  parameters: {
    decorators: [withActions as Decorator],
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-radio-button/sbb-radio-button-panel',
};

export default meta;
