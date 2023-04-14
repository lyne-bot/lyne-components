import { h } from 'jsx-dom';
import readme from './readme.md';

const StandaloneTemplate = (picker = null) => (
  <sbb-datepicker-previous-day date-picker={picker}></sbb-datepicker-previous-day>
);

const PickerAndButtonTemplate = () => (
  <div style="display: flex; gap: 1em;">
    {StandaloneTemplate('datepicker')}
    <sbb-datepicker id="datepicker"></sbb-datepicker>
  </div>
);

const FormFieldTemplate = () => (
  <sbb-form-field>
    <sbb-datepicker></sbb-datepicker>
    {StandaloneTemplate()}
  </sbb-form-field>
);

export const Standalone = StandaloneTemplate.bind({});

export const WithPicker = PickerAndButtonTemplate.bind({});

export const FormField = FormFieldTemplate.bind({});

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
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
  title: 'components/form elements/datepicker/sbb-datepicker-previous-day',
};
