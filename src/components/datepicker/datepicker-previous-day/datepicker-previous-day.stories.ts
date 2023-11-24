import { withActions } from '@storybook/addon-actions/decorator';
import { InputType } from '@storybook/types';
import type { Meta, StoryObj, Decorator, StoryContext } from '@storybook/web-components';
import { Args, ArgTypes } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './datepicker-previous-day';
import '../../form-field';
import '../datepicker';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

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

const BaseTemplate = (args, picker: string | undefined = undefined): TemplateResult => html`
  <sbb-datepicker-previous-day
    ${sbbSpread(args)}
    .datePicker=${picker}
  ></sbb-datepicker-previous-day>
`;

const StandaloneTemplate = (args): TemplateResult => html` ${BaseTemplate(args)} `;

const PickerAndButtonTemplate = (args): TemplateResult => html`
  <div style=${styleMap({ display: 'flex', gap: '1em' })}>
    ${BaseTemplate(args, 'datepicker')}
    <input value="15.02.2023" id="datepicker-input" />
    <sbb-datepicker
      id="datepicker"
      input="datepicker-input"
      data-now=${new Date(2023, 0, 12, 0, 0, 0).valueOf()}
    ></sbb-datepicker>
  </div>
`;

const FormFieldTemplate = (args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <input value="15.02.2023" />
    <sbb-datepicker></sbb-datepicker>
    ${BaseTemplate(args)}
  </sbb-form-field>
`;

const EmptyFormFieldTemplate = (args): TemplateResult => html`
  <sbb-form-field ${sbbSpread(args)}>
    <input />
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
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: ['click', 'change'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-datepicker/sbb-datepicker-previous-day',
};

export default meta;
