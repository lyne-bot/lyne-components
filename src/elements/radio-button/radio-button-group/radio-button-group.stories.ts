import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import type { SbbFormErrorElement } from '../../form-error.js';

import readme from './readme.md?raw';
import './radio-button-group.js';
import '../radio-button.js';
import '../radio-button-panel.js';
import '../../form-error.js';
import '../../icon.js';
import '../../card/card-badge.js';

const suffixStyle: Readonly<StyleInfo> = {
  display: 'flex',
  alignItems: 'center',
  marginInlineStart: 'auto',
};

const cardBadge = (): TemplateResult => html`<sbb-card-badge>%</sbb-card-badge>`;

const suffixAndSubtext = (): TemplateResult => html`
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style=${styleMap(suffixStyle)}>
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
    <span class="sbb-text-m sbb-text--bold">CHF 40.00</span>
  </span>
  ${cardBadge()}
`;

const value: InputType = {
  control: {
    type: 'text',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const allowEmptySelection: InputType = {
  control: {
    type: 'boolean',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom: InputType = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
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

const defaultArgTypes: ArgTypes = {
  value,
  name,
  required,
  disabled,
  'allow-empty-selection': allowEmptySelection,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
  'aria-label': ariaLabel,
};

const defaultArgs: Args = {
  value: 'Value two',
  name: undefined,
  required: false,
  disabled: false,
  'allow-empty-selection': false,
  orientation: orientation.options![0],
  'horizontal-from': undefined,
  size: size.options![0],
  'aria-label': undefined,
};

const radioButtons = (): TemplateResult => html`
  <sbb-radio-button value="Value one">Value one</sbb-radio-button>
  <sbb-radio-button value="Value two">Value two</sbb-radio-button>
  <sbb-radio-button value="Value three" disabled> Value three </sbb-radio-button>
  <sbb-radio-button value="Value four">Value four</sbb-radio-button>
`;

const radioButtonPanels = (): TemplateResult => html`
  <sbb-radio-button-panel value="Value one">Value 1 ${suffixAndSubtext()}</sbb-radio-button-panel>
  <sbb-radio-button-panel value="Value two">Value 2 ${suffixAndSubtext()}</sbb-radio-button-panel>
  <sbb-radio-button-panel value="Value three">
    Value 3 ${suffixAndSubtext()}</sbb-radio-button-panel
  >
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  <sbb-radio-button-group ${sbbSpread(args)}>${radioButtons()}</sbb-radio-button-group>
`;

const PanelTemplate = (args: Args): TemplateResult => html`
  <sbb-radio-button-group ${sbbSpread(args)}>${radioButtonPanels()}</sbb-radio-button-group>
`;

const ErrorMessageTemplate = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'This is a required field.';

  return html`
    <sbb-radio-button-group
      ${sbbSpread(args)}
      @change=${(event: CustomEvent) => {
        if (event.detail.value) {
          sbbFormError.remove();
        } else if (args.required) {
          (event.target as HTMLElement).closest('sbb-radio-button-group')?.append(sbbFormError);
        }
      }}
    >
      ${radioButtons()} ${args.required && sbbFormError}
    </sbb-radio-button-group>
  `;
};

export const Horizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Vertical: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const VerticalToHorizontal: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    'horizontal-from': horizontalFrom.options![4],
  },
};

export const HorizontalSizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const VerticalSizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1], size: size.options![1] },
};

export const SizeXS: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

export const Disabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const AllowEmptySelection: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, value: undefined, 'allow-empty-selection': true },
};

export const ErrorMessage: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    value: undefined,
    required: true,
    'allow-empty-selection': true,
  },
};

export const ErrorMessageVertical: StoryObj = {
  render: ErrorMessageTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    value: undefined,
    required: true,
    orientation: orientation.options![1],
    'allow-empty-selection': true,
  },
};

export const HorizontalPanels: StoryObj = {
  render: PanelTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const VerticalPanels: StoryObj = {
  render: PanelTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const VerticalToHorizontalPanels: StoryObj = {
  render: PanelTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    orientation: orientation.options![1],
    'horizontal-from': horizontalFrom.options![4],
  },
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
  title: 'elements/sbb-radio-button/sbb-radio-button-group',
};

export default meta;
