import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  Decorator,
  StoryContext,
  Args,
  ArgTypes,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './datepicker-next-day.js';
import '../../date-input.js';
import '../../form-field.js';
import '../datepicker.js';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
};

const defaultArgs: Args = {
  negative: false,
};

const BaseTemplate = (args: Args, picker: string | undefined = undefined): TemplateResult => html`
  <sbb-datepicker-next-day ${sbbSpread(args)} .datePicker=${picker}></sbb-datepicker-next-day>
`;

const StandaloneTemplate = (args: Args): TemplateResult => html` ${BaseTemplate(args)} `;

const PickerAndButtonTemplate = (args: Args): TemplateResult => html`
  <div style="display: flex; gap: 1em;">
    <sbb-date-input value="2023-02-15" id="datepicker-input"></sbb-date-input>
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      now="2023-01-12T00:00:00Z"
    ></sbb-datepicker>
    ${BaseTemplate(args, 'datepicker')}
  </div>
`;

const FormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <sbb-date-input value="2023-02-15"></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
    ${BaseTemplate(args)}
  </sbb-form-field>
`;

const EmptyFormFieldTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <sbb-date-input></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
    ${BaseTemplate(args)}
  </sbb-form-field>
`;

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const StandaloneNegative: StoryObj = {
  render: StandaloneTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const EmptyFormField: StoryObj = {
  render: EmptyFormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click', 'change', 'input'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker-next-day',
};

export default meta;
