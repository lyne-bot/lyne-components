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
import { html, nothing } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import '../../date-input.js';
import '../../form-field.js';
import '../datepicker.js';
import './datepicker-toggle.js';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'],
};

const defaultArgTypes: ArgTypes = {
  negative,
  view: view,
};

const defaultArgs: Args = {
  negative: false,
  view: view.options![0],
};

const StandaloneTemplate = (args: Args, picker?: string): TemplateResult => html`
  <sbb-datepicker-toggle
    ${sbbSpread(args)}
    date-picker=${picker || nothing}
  ></sbb-datepicker-toggle>
`;

const PickerAndButtonTemplate = (args: Args): TemplateResult => html`
  <div style="display: flex; gap: 1em;">
    ${StandaloneTemplate(args, 'datepicker')}
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
    <sbb-date-input id="datepicker-input"></sbb-date-input>
  </div>
`;

const FormFieldTemplate = ({ negative, ...args }: Args): TemplateResult => html`
  <sbb-form-field ?negative=${negative}>
    <sbb-date-input></sbb-date-input>
    <sbb-datepicker></sbb-datepicker>
    ${StandaloneTemplate(args)}
  </sbb-form-field>
`;

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

export const InFormFieldNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const InitialYearSelection: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, view: view.options![2] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    actions: {
      handles: ['click'],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-datepicker-toggle',
};

export default meta;
