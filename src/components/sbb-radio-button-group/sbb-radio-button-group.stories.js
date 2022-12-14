import events from './sbb-radio-button-group.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const value = {
  control: {
    type: 'text',
  },
};

const required = {
  control: {
    type: 'boolean',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
};

const allowEmptySelection = {
  control: {
    type: 'boolean',
  },
};

const orientation = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
};

const horizontalFrom = {
  control: {
    type: 'select',
  },
  options: ['unset', 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
};

const size = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const ariaLabel = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes = {
  value,
  required,
  disabled,
  'allow-empty-selection': allowEmptySelection,
  orientation,
  'horizontal-from': horizontalFrom,
  size,
  'aria-label': ariaLabel,
};

const defaultArgs = {
  value: 'Value two',
  required: false,
  disabled: false,
  'allow-empty-selection': false,
  orientation: orientation.options[0],
  'horizontal-from': undefined,
  size: size.options[0],
  'aria-label': undefined,
};

const radioButtons = () => [
  <sbb-radio-button value="Value one">Value one</sbb-radio-button>,
  <sbb-radio-button value="Value two">Value two</sbb-radio-button>,
  <sbb-radio-button value="Value three" disabled>
    Value three
  </sbb-radio-button>,
  <sbb-radio-button value="Value four">Value four</sbb-radio-button>,
];

const DefaultTemplate = (args) => [
  <sbb-radio-button-group {...args}>{radioButtons()}</sbb-radio-button-group>,
];

const ErrorMessageTemplate = (args) => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

  return (
    <sbb-radio-button-group
      {...args}
      onChange={(event) => {
        if (event.detail.value) {
          sbbFormError.remove();
        } else if (args.required) {
          document.getElementById('sbb-radio-group').append(sbbFormError);
        }
      }}
    >
      {radioButtons()}
      {args.required && sbbFormError}
    </sbb-radio-button-group>
  );
};

export const Horizontal = DefaultTemplate.bind({});
Horizontal.argTypes = defaultArgTypes;
Horizontal.args = { ...defaultArgs };
Horizontal.documentation = { title: 'Horizontal Orientation' };

export const Vertical = DefaultTemplate.bind({});
Vertical.argTypes = defaultArgTypes;
Vertical.args = { ...defaultArgs, orientation: orientation.options[1] };
Vertical.documentation = { title: 'Vertical Orientation' };

export const VerticalToHorizontal = DefaultTemplate.bind({});
VerticalToHorizontal.argTypes = defaultArgTypes;
VerticalToHorizontal.args = {
  ...defaultArgs,
  orientation: orientation.options[1],
  'horizontal-from': horizontalFrom.options[4],
};
VerticalToHorizontal.documentation = { title: 'Vertical To Horizontal' };

export const HorizontalSizeS = DefaultTemplate.bind({});
HorizontalSizeS.argTypes = defaultArgTypes;
HorizontalSizeS.args = { ...defaultArgs, size: size.options[1] };
HorizontalSizeS.documentation = { title: 'Horizontal Orientation - Size S' };

export const VerticalSizeS = DefaultTemplate.bind({});
VerticalSizeS.argTypes = defaultArgTypes;
VerticalSizeS.args = { ...defaultArgs, orientation: orientation.options[1], size: size.options[1] };
VerticalSizeS.documentation = { title: 'Vertical Orientation - Size S' };

export const Disabled = DefaultTemplate.bind({});
Disabled.argTypes = defaultArgTypes;
Disabled.args = { ...defaultArgs, disabled: true };
Disabled.documentation = { title: 'Disabled Radio Group' };

export const AllowEmptySelection = DefaultTemplate.bind({});
AllowEmptySelection.argTypes = defaultArgTypes;
AllowEmptySelection.args = { ...defaultArgs, value: undefined, 'allow-empty-selection': true };
AllowEmptySelection.documentation = { title: 'Allow Empty Selection Radio Group' };

export const ErrorMessage = ErrorMessageTemplate.bind({});
ErrorMessage.argTypes = defaultArgTypes;
ErrorMessage.args = {
  ...defaultArgs,
  value: undefined,
  required: true,
  'allow-empty-selection': true,
};
ErrorMessage.documentation = { title: 'Error Message Radio Group' };

export const ErrorMessageVertical = ErrorMessageTemplate.bind({});
ErrorMessageVertical.argTypes = defaultArgTypes;
ErrorMessageVertical.args = {
  ...defaultArgs,
  value: undefined,
  required: true,
  orientation: orientation.options[1],
  'allow-empty-selection': true,
};
ErrorMessageVertical.documentation = { title: 'Error Message Vertical Radio Group' };

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
      handles: [events.didChange],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/radio/sbb-radio-button-group',
};
