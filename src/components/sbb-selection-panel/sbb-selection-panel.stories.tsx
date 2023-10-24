/** @jsx h */
import { Fragment, h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import isChromatic from 'chromatic';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import { SbbSelectionPanel } from './sbb-selection-panel';
import './sbb-selection-panel';
import '../sbb-card-badge';
import '../sbb-checkbox';
import '../sbb-checkbox-group';
import '../sbb-form-error';
import '../sbb-link';
import '../sbb-radio-button';
import '../sbb-radio-button-group';

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const forceOpen: InputType = {
  control: {
    type: 'boolean',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const checkedInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const disabledInput: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input',
  },
};

const basicArgTypes: ArgTypes = {
  color: color,
  'force-open': forceOpen,
  borderless: borderless,
  'disable-animation': disableAnimation,
  checkedInput,
  disabledInput,
};

const basicArgs: Args = {
  color: color.options[0],
  'force-open': false,
  borderless: false,
  'disable-animation': isChromatic(),
  checkedInput: false,
  disabledInput: false,
};

const suffixStyle: Args = {
  display: 'flex',
  alignItems: 'center',
};

const cardbadge = (): JSX.Element => <sbb-card-badge>%</sbb-card-badge>;

const suffixAndSubtext = (): JSX.Element[] => [
  <span slot="subtext">Subtext</span>,
  <span slot="suffix" style={{ 'margin-inline-start': 'auto' }}>
    <span style={suffixStyle}>
      <sbb-icon name="diamond-small" style={{ 'margin-inline': 'var(--sbb-spacing-fixed-2x)' }} />
      <span class="sbb-text-m sbb-text--bold">
        <span class="sbb-text-xs sbb-text--bold">CHF</span> 40.00
      </span>
    </span>
  </span>,
];

const innerContent = (): JSX.Element => (
  <div slot="content">
    Inner Content
    <sbb-link
      text-size="s"
      variant="block"
      icon-name="chevron-small-right-small"
      icon-placement="end"
    >
      Link
    </sbb-link>
  </div>
);

const WithCheckboxTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-selection-panel {...args}>
    {cardbadge()}
    <sbb-checkbox checked={checkedInput} disabled={disabledInput}>
      Value one
      {suffixAndSubtext()}
    </sbb-checkbox>
    {innerContent()}
  </sbb-selection-panel>
);

const WithRadioButtonTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-selection-panel {...args}>
    {cardbadge()}
    <sbb-radio-button value="Value one" checked={checkedInput} disabled={disabledInput}>
      Value one
      {suffixAndSubtext()}
    </sbb-radio-button>
    {innerContent()}
  </sbb-selection-panel>
);

const WithCheckboxGroupTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox checked={checkedInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox disabled={disabledInput}>
        Value two
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox>
        Value three
        {suffixAndSubtext()}
      </sbb-checkbox>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const WithRadioButtonGroupTemplate = ({
  checkedInput,
  disabledInput,
  allowEmptySelection,
  ...args
}): JSX.Element => (
  <sbb-radio-button-group
    orientation="vertical"
    horizontal-from="large"
    allow-empty-selection={allowEmptySelection}
  >
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value one" checked={checkedInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value two" disabled={disabledInput}>
        Value two
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value three">
        Value three
        {suffixAndSubtext()}
      </sbb-radio-button>
      {innerContent()}
    </sbb-selection-panel>
  </sbb-radio-button-group>
);

const TicketsOptionsExampleTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox checked={checkedInput}>
        Saving
        {suffixAndSubtext()}
      </sbb-checkbox>
      <div slot="content">
        <sbb-radio-button-group orientation="vertical" value="non-flex">
          <sbb-radio-button value="non-flex" style={{ width: '100%' }}>
            Non-Flex
            <span slot="subtext">No refund possible</span>
            <span
              slot="suffix"
              style={{ 'margin-inline-start': 'auto', color: 'var(--sbb-color-granite-default)' }}
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">CHF</span> 0.00
                </span>
              </span>
            </span>
          </sbb-radio-button>
          <sbb-radio-button value="semi-flex" style={{ width: '100%' }}>
            Semi-Flex
            <span slot="subtext">Partial refund possible</span>
            <span
              slot="suffix"
              style={{ 'margin-inline-start': 'auto', color: 'var(--sbb-color-granite-default)' }}
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">+ CHF</span> 5.00
                </span>
              </span>
            </span>
          </sbb-radio-button>
        </sbb-radio-button-group>
        <sbb-divider style={{ 'margin-block': 'var(--sbb-spacing-responsive-xxs)' }} />
        <span style={{ color: 'var(--sbb-color-granite-default)' }}>
          <div
            style={{ display: 'flex', 'align-items': 'center', gap: 'var(--sbb-spacing-fixed-1x)' }}
          >
            1 x 0 x Supersaver ticket, Half-Fare Card{' '}
            <sbb-tooltip-trigger id="tooltip-trigger-1" icon-name="circle-information-small" />
          </div>
          <div>Valid: Thu., 03.11.2022 until Fri., 04.11.2022 05:00</div>
        </span>
        <sbb-tooltip trigger="tooltip-trigger-1" hover-trigger>
          <span id="tooltip-content" class="sbb-text-s">
            Simple info tooltip.
          </span>
        </sbb-tooltip>
      </div>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-checkbox disabled={disabledInput}>
        City offer
        {suffixAndSubtext()}
      </sbb-checkbox>
      <div slot="content">
        <sbb-checkbox-group orientation="vertical">
          <sbb-checkbox value="option-1" style={{ width: '100%' }}>
            Option one
            <span
              slot="suffix"
              style={{ 'margin-inline-start': 'auto', color: 'var(--sbb-color-granite-default)' }}
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">CHF</span> 0.00
                </span>
              </span>
            </span>
          </sbb-checkbox>
          <sbb-checkbox value="option-2" style={{ width: '100%' }}>
            Option two
            <span
              slot="suffix"
              style={{ 'margin-inline-start': 'auto', color: 'var(--sbb-color-granite-default)' }}
            >
              <span style={suffixStyle}>
                <span class="sbb-text-m">
                  <span class="sbb-text-xxs">+ CHF</span> 5.00
                </span>
              </span>
            </span>
          </sbb-checkbox>
        </sbb-checkbox-group>
        <sbb-divider style={{ 'margin-block': 'var(--sbb-spacing-responsive-xxs)' }} />
        <span style={{ color: 'var(--sbb-color-granite-default)' }}>
          <div
            style={{ display: 'flex', 'align-items': 'center', gap: 'var(--sbb-spacing-fixed-1x)' }}
          >
            1 x 0 x City Ticket incl. City Supplement City, Half-Fare Card{' '}
            <sbb-tooltip-trigger id="tooltip-trigger-2" icon-name="circle-information-small" />
          </div>
          <div>Valid: Thu., 03.11.2022 until Fri., 04.11.2022 05:00</div>
        </span>
        <sbb-tooltip trigger="tooltip-trigger-2" hover-trigger>
          <span id="tooltip-content" class="sbb-text-s">
            Simple info tooltip.
          </span>
        </sbb-tooltip>
      </div>
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const NestedRadioTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-radio-button-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      <sbb-radio-button value="mainoption1" checked={checkedInput}>
        Main Option 1
      </sbb-radio-button>
      <sbb-radio-button-group orientation="vertical" value="suboption1" slot="content">
        <sbb-radio-button value="suboption1">Suboption 1</sbb-radio-button>
        <sbb-radio-button value="suboption2">Suboption 2</sbb-radio-button>
      </sbb-radio-button-group>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-radio-button value="mainoption2" disabled={disabledInput}>
        Main Option 2
      </sbb-radio-button>
      <sbb-radio-button-group orientation="vertical" value="suboption2" slot="content">
        <sbb-radio-button value="suboption1">Suboption 1</sbb-radio-button>
        <sbb-radio-button value="suboption2">Suboption 2</sbb-radio-button>
      </sbb-radio-button-group>
    </sbb-selection-panel>
  </sbb-radio-button-group>
);

const NestedCheckboxTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <sbb-checkbox-group orientation="vertical" horizontal-from="large">
    <sbb-selection-panel {...args}>
      <sbb-checkbox value="mainoption1" checked={checkedInput}>
        Main Option 1
      </sbb-checkbox>
      <sbb-checkbox-group orientation="vertical" slot="content">
        <sbb-checkbox value="suboption1">Suboption 1</sbb-checkbox>
        <sbb-checkbox value="suboption2">Suboption 2</sbb-checkbox>
      </sbb-checkbox-group>
    </sbb-selection-panel>

    <sbb-selection-panel {...args}>
      <sbb-checkbox value="mainoption2" disabled={disabledInput}>
        Main Option 2
      </sbb-checkbox>
      <sbb-checkbox-group orientation="vertical" slot="content">
        <sbb-checkbox value="suboption1">Suboption 1</sbb-checkbox>
        <sbb-checkbox value="suboption2">Suboption 2</sbb-checkbox>
      </sbb-checkbox-group>
    </sbb-selection-panel>
  </sbb-checkbox-group>
);

const WithCheckboxesErrorMessageTemplate = ({
  checkedInput,
  disabledInput,
  ...args
}): JSX.Element => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

  return (
    <sbb-checkbox-group
      orientation="vertical"
      horizontal-from="large"
      id="sbb-checkbox-group"
      onChange={() => {
        const hasChecked = Array.from(
          document.getElementById('sbb-checkbox-group').querySelectorAll('sbb-checkbox'),
        ).some((el) => el.checked);
        if (hasChecked) {
          sbbFormError.remove();
        } else {
          document.getElementById('sbb-checkbox-group').append(sbbFormError);
        }
      }}
    >
      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-checkbox checked={checkedInput}>
          Value one
          {suffixAndSubtext()}
        </sbb-checkbox>
        {innerContent()}
      </sbb-selection-panel>

      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-checkbox disabled={disabledInput}>
          Value two
          {suffixAndSubtext()}
        </sbb-checkbox>
        {innerContent()}
      </sbb-selection-panel>

      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-checkbox>
          Value three
          {suffixAndSubtext()}
        </sbb-checkbox>
        {innerContent()}
      </sbb-selection-panel>
      {sbbFormError}
    </sbb-checkbox-group>
  );
};

const WithRadiosErrorMessageTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => {
  const sbbFormError = <sbb-form-error slot="error">This is a required field.</sbb-form-error>;

  return (
    <sbb-radio-button-group
      orientation="vertical"
      horizontal-from="large"
      allow-empty-selection
      id="sbb-radio-group"
      onChange={(event) => {
        if (event.detail.value) {
          sbbFormError.remove();
        } else {
          document.getElementById('sbb-radio-group').append(sbbFormError);
        }
      }}
    >
      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-radio-button value="Value one" checked={checkedInput}>
          Value one
          {suffixAndSubtext()}
        </sbb-radio-button>
        {innerContent()}
      </sbb-selection-panel>

      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-radio-button value="Value two" disabled={disabledInput}>
          Value two
          {suffixAndSubtext()}
        </sbb-radio-button>
        {innerContent()}
      </sbb-selection-panel>

      <sbb-selection-panel {...args}>
        {cardbadge()}
        <sbb-radio-button value="Value three">
          Value three
          {suffixAndSubtext()}
        </sbb-radio-button>
        {innerContent()}
      </sbb-selection-panel>
      {sbbFormError}
    </sbb-radio-button-group>
  );
};

const WithNoContentTemplate = ({ checkedInput, disabledInput, ...args }): JSX.Element => (
  <Fragment>
    <sbb-selection-panel
      {...args}
      style={{ display: 'block', 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' }}
    >
      {cardbadge()}
      <sbb-checkbox checked={checkedInput} disabled={disabledInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-checkbox>
    </sbb-selection-panel>
    <sbb-selection-panel {...args}>
      {cardbadge()}
      <sbb-radio-button value="Value one" disabled={disabledInput}>
        Value one
        {suffixAndSubtext()}
      </sbb-radio-button>
    </sbb-selection-panel>
  </Fragment>
);

export const WithCheckbox: StoryObj = {
  render: WithCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const WithRadioButton: StoryObj = {
  render: WithRadioButtonTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const WithCheckboxChecked: StoryObj = {
  render: WithCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const WithRadioButtonChecked: StoryObj = {
  render: WithRadioButtonTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const WithCheckboxDisabled: StoryObj = {
  render: WithCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabledInput: true },
};

export const WithRadioButtonDisabled: StoryObj = {
  render: WithRadioButtonTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabledInput: true },
};

export const WithCheckboxCheckedDisabled: StoryObj = {
  render: WithCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true },
};

export const WithRadioButtonCheckedDisabled: StoryObj = {
  render: WithRadioButtonTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true },
};

export const WithCheckboxGroup: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true },
};

export const WithRadioButtonGroup: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true },
};

export const WithCheckboxGroupForceOpen: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'force-open': true,
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithRadioButtonGroupForceOpen: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'force-open': true,
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithRadioButtonGroupAllowEmpty: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    allowEmptySelection: true,
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithCheckboxGroupMilk: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    color: color.options[1],
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithRadioButtonGroupMilk: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    color: color.options[1],
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithCheckboxBorderless: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    checkedInput: true,
    disabledInput: true,
    borderless: true,
  },
};

export const WithRadioButtonBorderless: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    checkedInput: true,
    disabledInput: true,
    borderless: true,
  },
};

export const WithCheckboxGroupMilkBorderless: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    color: color.options[1],
    checkedInput: true,
    disabledInput: true,
    borderless: true,
  },
};

export const WithRadioButtonGroupMilkBorderless: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    color: color.options[1],
    checkedInput: true,
    disabledInput: true,
    borderless: true,
  },
};

export const WithCheckboxesErrorMessage: StoryObj = {
  render: WithCheckboxesErrorMessageTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'force-open': true,
    disabledInput: true,
  },
};

export const WithRadiosErrorMessage: StoryObj = {
  render: WithRadiosErrorMessageTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'force-open': true,
    disabledInput: true,
  },
};

export const WithNoContent: StoryObj = {
  render: WithNoContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const TicketsOptionsExample: StoryObj = {
  render: TicketsOptionsExampleTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const NestedRadios: StoryObj = {
  render: NestedRadioTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
};

export const NestedCheckboxes: StoryObj = {
  render: NestedCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true },
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
      handles: [
        SbbSelectionPanel.events.didOpen,
        SbbSelectionPanel.events.didClose,
        SbbSelectionPanel.events.willOpen,
        SbbSelectionPanel.events.willClose,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-selection-panel',
};

export default meta;
