import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  Meta,
  StoryObj,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import type { SbbFormErrorElement } from '../form-error.js';
import type { SbbFormFieldElement } from '../form-field.js';

import readme from './readme.md?raw';
import { SbbTimeInputElement } from './time-input.js';
import '../button/secondary-button.js';
import '../form-field.js';
import '../form-error.js';

const updateFormError = (event: CustomEvent): void => {
  const valid = event.detail.valid;
  const target = event.target as SbbTimeInputElement;
  const formField = target.closest<SbbFormFieldElement>('sbb-form-field');

  const formError: SbbFormErrorElement = document.createElement('sbb-form-error');
  formError.innerText = 'Time value is invalid';

  if (!valid) {
    formField?.append(formError);
  } else if (valid) {
    formField?.querySelectorAll('sbb-form-error').forEach((el) => el.remove());
  }
};

const changeEventHandler = (event: CustomEvent): void => {
  const target = event.target as SbbTimeInputElement;
  const exampleParent = target.closest<HTMLDivElement>('div#example-parent');
  const div = document.createElement('div');
  div.innerText = `value is: ${
    (exampleParent?.querySelector('#input-id') as HTMLInputElement).value
  }; valueAsDate is: ${target.valueAsDate}.`;
  exampleParent?.querySelector('#container-value')!.append(div);
};

const setValueAsDate = async (event: Event): Promise<void> => {
  const target = event.target as HTMLElement;
  const exampleParent = target.closest<HTMLDivElement>('div#example-parent')!;

  const timeInput = exampleParent.querySelector<SbbTimeInputElement>('sbb-time-input')!;
  timeInput.valueAsDate = new Date();

  const input = exampleParent?.querySelector<HTMLInputElement>('#input-id');
  input?.dispatchEvent(new Event('change')); // Trigger change to update invalid state
};

const setValue = (event: Event): void => {
  const target = event.target as HTMLElement;

  const input = target
    .closest('div#example-parent')!
    .querySelector('#input-id') as HTMLInputElement;
  input.value = '00:00';
  input.dispatchEvent(new Event('change')); // Trigger change to update invalid state
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Native input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Native input',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const iconStart: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const iconEnd: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  disabled,
  readonly,
  required,
  negative,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  optional,
  borderless,
  iconStart,
  iconEnd,
};

const basicArgs: Args = {
  value: '12:00',
  disabled: false,
  readonly: false,
  required: false,
  negative: false,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  optional: false,
  borderless: false,
  iconStart: undefined,
  iconEnd: undefined,
};

const formFieldBasicArgsWithIcons = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  optional: false,
  borderless: false,
  iconStart: 'clock-small',
  iconEnd: 'circle-information-small',
};

const TemplateSbbTimeInput = ({
  label,
  optional,
  borderless,
  negative,
  iconStart,
  iconEnd,
  size,
  ...args
}: Args): TemplateResult => html`
  <div id="example-parent">
    <sbb-form-field
      size=${size}
      ?optional=${optional}
      ?borderless=${borderless}
      ?negative=${negative}
      width="collapse"
    >
      ${label ? html`<label>${label}</label>` : nothing}
      ${iconStart ? html`<sbb-icon slot="prefix" name=${iconStart}></sbb-icon>` : nothing}
      <sbb-time-input
        @change=${(event: CustomEvent) => changeEventHandler(event)}
        @validationChange=${(event: CustomEvent) => updateFormError(event)}
      ></sbb-time-input>
      <input id="input-id" ${sbbSpread(args)} />
      ${iconEnd ? html`<sbb-icon slot="suffix" name=${iconEnd}></sbb-icon>` : nothing}
    </sbb-form-field>
    <div style="display: flex; gap: 1em; margin-block-start: 2rem;">
      <sbb-secondary-button size="m" @click=${(event: PointerEvent) => setValueAsDate(event)}>
        Set valueAsDate to current datetime
      </sbb-secondary-button>
      <sbb-secondary-button size="m" @click=${(event: PointerEvent) => setValue(event)}>
        Set value to 00:00
      </sbb-secondary-button>
    </div>
    <div style="color: var(--sbb-color-smoke);">
      <div style="margin-block-start: 1rem;">Change time in input:</div>
      <div id="container-value"></div>
    </div>
  </div>
`;

export const SbbTimeInputBase: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
};

export const SbbTimeInputWithIcons: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgsWithIcons },
};

export const SbbTimeInputBorderless: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    borderless: true,
  },
};

export const SbbTimeInputDisabled: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    disabled: true,
  },
};

export const SbbTimeInputReadonly: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    readonly: true,
  },
};

export const SbbTimeInputWithError: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    value: '99:99',
  },
};

export const SbbTimeInputNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, negative: true },
};

export const SbbTimeInputWithIconsNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgsWithIcons, negative: true },
};

export const SbbTimeInputBorderlessNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    borderless: true,
    negative: true,
  },
};

export const SbbTimeInputDisabledNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    disabled: true,
    negative: true,
  },
};

export const SbbTimeInputReadonlyNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    readonly: true,
    negative: true,
  },
};

export const SbbTimeInputWithErrorNegative: StoryObj = {
  render: TemplateSbbTimeInput,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgsWithIcons,
    value: '99:99',
    negative: true,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['change', 'input', SbbTimeInputElement.events.validationChange],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-time-input',
};

export default meta;
