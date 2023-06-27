/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, Decorator } from '@storybook/html';

const StandaloneTemplate = (picker = null): JSX.Element => (
  <sbb-datepicker-previous-day date-picker={picker}></sbb-datepicker-previous-day>
);

const PickerAndButtonTemplate = (): JSX.Element => (
  <div style={{ display: 'flex', gap: '1em' }}>
    {StandaloneTemplate('datepicker')}
    <input id="datepicker-input" />
    <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
  </div>
);

const FormFieldTemplate = (): JSX.Element => (
  <sbb-form-field>
    <input />
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate()}
  </sbb-form-field>
);

export const Standalone: StoryObj = {
  render: StandaloneTemplate,
};

export const WithPicker: StoryObj = {
  render: PickerAndButtonTemplate,
};

export const InFormField: StoryObj = {
  render: FormFieldTemplate,
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <Story />
      </div>
    ),
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
  title: 'components/form elements/sbb-datepicker/sbb-datepicker-previous-day',
};

export default meta;
