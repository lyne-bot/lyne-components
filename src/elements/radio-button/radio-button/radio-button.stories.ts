import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './radio-button.js';
import '../../title.js';

const longLabel: string =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";

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

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's', 'xs'],
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

const defaultArgTypes: ArgTypes = {
  value,
  checked,
  disabled,
  size,
  'aria-label': ariaLabel,
  labelBoldClass,
};

const defaultArgs: Args = {
  value: 'First value',
  checked: false,
  disabled: false,
  size: size.options![0],
  'aria-label': undefined,
  labelBoldClass: false,
};

const DefaultTemplate = ({ labelBoldClass, ...args }: Args): TemplateResult =>
  html`<sbb-radio-button ${sbbSpread(args)}>
    ${labelBoldClass ? html`<span class="sbb-text--bold">Value</span>` : 'Value'}
  </sbb-radio-button>`;

const MultilineLabelTemplate = ({ labelBoldClass, ...args }: Args): TemplateResult => html`
  <sbb-radio-button ${sbbSpread(args)}>
    ${labelBoldClass ? html`<span class="sbb-text--bold">${longLabel}</span>` : longLabel}
  </sbb-radio-button>
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StandaloneTemplate = ({ value, labelBoldClass, ...args }: Args): TemplateResult => html`
  <form>
    <sbb-title level="6" style="margin-block-start: 0">Group 1</sbb-title>
    <fieldset>
      ${repeat(
        new Array(3),
        (_, i) => html`
          <sbb-radio-button ${sbbSpread(args)} value="value-${i + 1}" name="group-1">
            ${labelBoldClass
              ? html`<span class="sbb-text--bold">Value ${i + 1}</span>`
              : `Value ${i + 1}`}
          </sbb-radio-button>
        `,
      )}
    </fieldset>

    <sbb-title level="6">Group 2</sbb-title>
    <fieldset>
      ${repeat(
        new Array(4),
        (_, i) => html`
          <sbb-radio-button ${sbbSpread(args)} value="value-${i + 1}" name="group-2">
            ${labelBoldClass
              ? html`<span class="sbb-text--bold">Value ${i + 1}</span>`
              : `Value ${i + 1}`}
          </sbb-radio-button>
        `,
      )}
    </fieldset>
  </form>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const SizeXS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

export const Checked: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
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

export const MultilineLabel: StoryObj = {
  render: MultilineLabelTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, checked: true },
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
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-radio-button/sbb-radio-button',
};

export default meta;
