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
import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import { SbbDatepickerElement } from './datepicker.js';
import readme from './readme.md?raw';

import '../datepicker-next-day.js';
import '../datepicker-previous-day.js';
import '../datepicker-toggle.js';
import '../../form-field.js';

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Input datepicker attribute',
  },
};

const wide: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const filterFunctions = [
  () => true,
  (d: Date) => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date) => d.getDate() % 2 === 1,
  (d: Date) => d.getFullYear() % 2 === 0,
  (d: Date) => d.getMonth() > 6,
];
const dateFilter: InputType = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
      3: 'The dateFilter function excludes odd years.',
      4: 'The dateFilter function excludes months from January to July',
    },
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Datepicker attribute',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field attribute',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field attribute',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
  },
};

const basicArgTypes: ArgTypes = {
  value,
  form,
  disabled,
  readonly,
  required,
  min,
  max,
  wide,
  dateFilter,
  now,
  'aria-label': ariaLabel,
};

const basicArgs: Args = {
  value: `15.02.2023`,
  form: undefined,
  disabled: false,
  readonly: false,
  required: false,
  min: undefined,
  max: undefined,
  wide: false,
  dateFilter: dateFilter.options![0],
  now: undefined,
  'aria-label': undefined,
};

const formFieldBasicArgsTypes: ArgTypes = {
  ...basicArgTypes,
  label,
  size,
  negative,
  optional,
  borderless,
};

const formFieldBasicArgs = {
  ...basicArgs,
  label: 'Label',
  size: size.options![1],
  negative: false,
  optional: false,
  borderless: false,
};

const convertMillisecondsToSeconds = (milliseconds: number): number | typeof nothing => {
  return milliseconds ? milliseconds / 1000 : nothing;
};

const changeEventHandler = async (event: Event): Promise<void> => {
  const div = document.createElement('div');
  div.innerText = `valueAsDate is: ${(event.target as SbbDatepickerElement).valueAsDate}.`;
  document.getElementById('container-value')?.append(div);
};

const Template = ({ min, max, wide, dateFilter, now, ...args }: Args): TemplateResult => {
  return html`
    <div style=${styleMap({ display: 'flex', gap: '0.25rem' })}>
      <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
      <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
      <input
        ${sbbSpread(args)}
        id="datepicker-input"
        min=${convertMillisecondsToSeconds(min)}
        max=${convertMillisecondsToSeconds(max)}
      />
      <sbb-datepicker
        id="datepicker"
        input="datepicker-input"
        .dateFilter=${dateFilter}
        ?wide=${wide}
        @change=${(event: Event) => changeEventHandler(event)}
        now=${convertMillisecondsToSeconds(now)}
      ></sbb-datepicker>
      <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
    </div>
    <div
      id="container-value"
      style=${styleMap({ 'margin-block-start': '1rem', color: 'var(--sbb-color-smoke)' })}
    >
      Change date to get the latest value:
    </div>
  `;
};

const TemplateFormField = ({
  min,
  max,
  label,
  optional,
  borderless,
  size,
  negative,
  wide,
  dateFilter,
  now,
  ...args
}: Args): TemplateResult => {
  return html`
    <sbb-form-field
      size=${size}
      ?negative=${negative}
      ?optional=${optional}
      ?borderless=${borderless}
      width="collapse"
    >
      ${label ? html`<label>${label}</label>` : nothing}
      <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      <sbb-datepicker-next-day></sbb-datepicker-next-day>
      <sbb-datepicker-toggle></sbb-datepicker-toggle>
      <input
        ${sbbSpread(args)}
        min=${convertMillisecondsToSeconds(min)}
        max=${convertMillisecondsToSeconds(max)}
      />
      <sbb-datepicker
        .dateFilter=${dateFilter}
        ?wide=${wide}
        @change=${(event: Event) => changeEventHandler(event)}
        now=${convertMillisecondsToSeconds(now)}
      ></sbb-datepicker>
    </sbb-form-field>
    <div
      id="container-value"
      style=${styleMap({ 'margin-block-start': '1rem', color: 'var(--sbb-color-smoke)' })}
    >
      Change date to get the latest value:
    </div>
  `;
};

export const InFormField: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs },
};

export const InFormFieldDisabled: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true },
};

export const InFormFieldReadonly: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, readonly: true },
};

export const InFormFieldNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, negative: true },
};

export const InFormFieldDisabledNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, disabled: true, negative: true },
};

export const InFormFieldReadonlyNegative: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, readonly: true, negative: true },
};

export const InFormFieldWide: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, wide: true },
};

export const InFormFieldWithMinAndMax: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: {
    ...formFieldBasicArgs,
    min: new Date(2023, 1, 8),
    max: new Date(2023, 1, 22),
  },
};

export const InFormFieldWithDateFilter: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, dateFilter: dateFilter.options![1] },
};

export const InFormFieldSmall: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, size: size.options![0] },
};

export const InFormFieldLarge: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, size: size.options![2] },
};

export const InFormFieldOptional: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, optional: true },
};

export const InFormFieldBorderless: StoryObj = {
  render: TemplateFormField,
  argTypes: { ...formFieldBasicArgsTypes },
  args: { ...formFieldBasicArgs, borderless: true },
};

export const WithoutFormField: StoryObj = {
  render: Template,
  argTypes: { ...basicArgTypes },
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['input', 'change', SbbDatepickerElement.events.validationChange],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker',
};

export default meta;
