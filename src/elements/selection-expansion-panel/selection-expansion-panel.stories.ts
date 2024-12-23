import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import type { StyleInfo } from 'lit/directives/style-map.js';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import type { SbbFormErrorElement } from '../form-error.js';
import type { SbbRadioButtonGroupElement } from '../radio-button.js';
import { SbbSelectionExpansionPanelElement } from '../selection-expansion-panel.js';

import '../card.js';
import '../checkbox.js';
import '../divider.js';
import '../form-error.js';
import '../icon.js';
import '../link/block-link-button.js';
import '../popover.js';
import '../radio-button.js';
import '../title.js';

import readme from './readme.md?raw';

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

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Group / Input',
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
  color,
  'force-open': forceOpen,
  borderless,
  size,
  checkedInput,
  disabledInput,
};

const basicArgs: Args = {
  color: color.options![0],
  'force-open': false,
  borderless: false,
  size: size.options![0],
  checkedInput: false,
  disabledInput: false,
};

const suffixStyle: Readonly<StyleInfo> = {
  display: 'flex',
  alignItems: 'center',
  marginInlineStart: 'auto',
};

const cardBadge = (): TemplateResult => html`<sbb-card-badge>%</sbb-card-badge>`;

const suffixAndSubtext = (size: string): TemplateResult => html`
  <span slot="subtext">Subtext</span>
  <span slot="suffix" style=${styleMap(suffixStyle)}>
    <sbb-icon name="diamond-small" style="margin-inline: var(--sbb-spacing-fixed-2x);"></sbb-icon>
    <span class=${`sbb-text--bold sbb-text-${size}`}>CHF 40.00</span>
  </span>
`;

const innerContent = (): TemplateResult => html`
  <div slot="content">
    Inner Content
    <sbb-block-link-button icon-name="chevron-small-right-small" icon-placement="end">
      Link
    </sbb-block-link-button>
  </div>
`;

const WithCheckboxTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-selection-expansion-panel ${sbbSpread(args)}>
    <sbb-checkbox-panel ?checked=${checkedInput} ?disabled=${disabledInput} size=${size}>
      Value one ${suffixAndSubtext(size)} ${cardBadge()}
    </sbb-checkbox-panel>
    ${innerContent()}
  </sbb-selection-expansion-panel>
`;

const WithRadioButtonTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-selection-expansion-panel ${sbbSpread(args)}>
    <sbb-radio-button-panel
      value="Value one"
      ?checked=${checkedInput}
      ?disabled=${disabledInput}
      size=${size}
    >
      Value one ${suffixAndSubtext(size)} ${cardBadge()}
    </sbb-radio-button-panel>
    ${innerContent()}
  </sbb-selection-expansion-panel>
`;

const WithCheckboxGroupTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group orientation="vertical" horizontal-from="large" size=${size}>
    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?checked=${checkedInput}>
        Value one ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?disabled=${disabledInput}>
        Value two ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel>
        Value three ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
  </sbb-checkbox-group>
`;

const WithRadioButtonGroupTemplate = ({
  checkedInput,
  disabledInput,
  allowEmptySelection,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-radio-button-group
    orientation="vertical"
    horizontal-from="large"
    ?allow-empty-selection=${allowEmptySelection}
    size=${size}
  >
    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="Value one" ?checked=${checkedInput}>
        Value one ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="Value two" ?disabled=${disabledInput}>
        Value two ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="Value three">
        Value three ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-radio-button-panel>
      ${innerContent()}
    </sbb-selection-expansion-panel>
  </sbb-radio-button-group>
`;

const TicketsOptionsExampleTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group orientation="vertical" horizontal-from="large" size=${size}>
    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?checked=${checkedInput}>
        Saving ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      <div slot="content">
        <sbb-radio-button-group orientation="vertical" value="non-flex">
          <sbb-radio-button value="non-flex" style="width: 100%;">
            Non-Flex
            <span style="margin-inline-start: auto; color: var(--sbb-color-granite);">
              <span class="sbb-text-m">CHF 0.00</span>
            </span>
          </sbb-radio-button>
          <sbb-radio-button value="semi-flex" style="width: 100%;">
            Semi-Flex
            <span style="margin-inline-start: auto; color: var(--sbb-color-granite);">
              <span class="sbb-text-m">+ CHF 5.00</span>
            </span>
          </sbb-radio-button>
        </sbb-radio-button-group>
        <sbb-divider style="margin-block: var(--sbb-spacing-responsive-xxs);"></sbb-divider>
        <span style="color: var(--sbb-color-granite);">
          <div
            style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x); color:var(--sbb-color-charcoal);"
          >
            1 x 0 x Supersaver ticket, Half-Fare Card${' '}
            <sbb-popover-trigger
              id="popover-trigger-1"
              icon-name="circle-information-small"
            ></sbb-popover-trigger>
          </div>
          <div>Valid: Thu., 03.11.2022 until Fri., 04.11.2022 05:00</div>
        </span>
        <sbb-popover trigger="popover-trigger-1" hover-trigger>
          <sbb-title level="2" visual-level="6" style="margin-block-start: 0"
            >Popover title.</sbb-title
          >
          <span class="sbb-text-s">Simple popover</span>
        </sbb-popover>
      </div>
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel ?disabled=${disabledInput}>
        City offer ${suffixAndSubtext(size)} ${cardBadge()}
      </sbb-checkbox-panel>
      <div slot="content">
        <sbb-checkbox-group orientation="vertical">
          <sbb-checkbox value="option-1" style="width: 100%;">
            Option one
            <span style="margin-inline-start: auto; color: var(--sbb-color-granite);">
              <span class="sbb-text-m">CHF 0.00</span>
            </span>
          </sbb-checkbox>
          <sbb-checkbox value="option-2" style="width: 100%;">
            Option two
            <span style="margin-inline-start: auto; color: var(--sbb-color-granite);">
              <span class="sbb-text-m">+ CHF 5.00</span>
            </span>
          </sbb-checkbox>
        </sbb-checkbox-group>
        <sbb-divider style="margin-block: var(--sbb-spacing-responsive-xxs);"></sbb-divider>
        <span style="color: var(--sbb-color-granite);">
          <div
            style="display: flex; align-items: center; gap: var(--sbb-spacing-fixed-1x); color: var(--sbb-color-charcoal);"
          >
            1 x 0 x City Ticket incl. City Supplement City, Half-Fare Card${' '}
            <sbb-popover-trigger
              id="popover-trigger-2"
              icon-name="circle-information-small"
            ></sbb-popover-trigger>
          </div>
          <div>Valid: Thu., 03.11.2022 until Fri., 04.11.2022 05:00</div>
        </span>
        <sbb-popover trigger="popover-trigger-2" hover-trigger>
          <sbb-title level="2" visual-level="6" style="margin-block-start: 0"
            >Popover title.</sbb-title
          >
          <span class="sbb-text-s">Simple popover</span>
        </sbb-popover>
      </div>
    </sbb-selection-expansion-panel>
  </sbb-checkbox-group>
`;

const NestedRadioTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-radio-button-group orientation="vertical" horizontal-from="large" size=${size}>
    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="mainoption1" ?checked=${checkedInput}>
        Main Option 1
      </sbb-radio-button-panel>
      <sbb-radio-button-group orientation="vertical" value="suboption1" slot="content">
        <sbb-radio-button value="suboption1">Suboption 1</sbb-radio-button>
        <sbb-radio-button value="suboption2">Suboption 2</sbb-radio-button>
      </sbb-radio-button-group>
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-radio-button-panel value="mainoption2" ?disabled=${disabledInput}>
        Main Option 2
      </sbb-radio-button-panel>
      <sbb-radio-button-group orientation="vertical" value="suboption2" slot="content">
        <sbb-radio-button value="suboption1">Suboption 1</sbb-radio-button>
        <sbb-radio-button value="suboption2">Suboption 2</sbb-radio-button>
      </sbb-radio-button-group>
    </sbb-selection-expansion-panel>
  </sbb-radio-button-group>
`;

const NestedCheckboxTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => html`
  <sbb-checkbox-group orientation="vertical" horizontal-from="large" size=${size}>
    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel value="mainoption1" ?checked=${checkedInput}>
        Main Option 1
      </sbb-checkbox-panel>
      <sbb-checkbox-group orientation="vertical" slot="content">
        <sbb-checkbox value="suboption1">Suboption 1</sbb-checkbox>
        <sbb-checkbox value="suboption2">Suboption 2</sbb-checkbox>
      </sbb-checkbox-group>
    </sbb-selection-expansion-panel>

    <sbb-selection-expansion-panel ${sbbSpread(args)}>
      <sbb-checkbox-panel value="mainoption2" ?disabled=${disabledInput}>
        Main Option 2
      </sbb-checkbox-panel>
      <sbb-checkbox-group orientation="vertical" slot="content">
        <sbb-checkbox value="suboption1">Suboption 1</sbb-checkbox>
        <sbb-checkbox value="suboption2">Suboption 2</sbb-checkbox>
      </sbb-checkbox-group>
    </sbb-selection-expansion-panel>
  </sbb-checkbox-group>
`;

const WithCheckboxesErrorMessageTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'This is a required field.';

  return html`
    <sbb-checkbox-group
      orientation="vertical"
      horizontal-from="large"
      size=${size}
      @change=${(event: Event) => {
        const checkboxGroup = event.currentTarget as HTMLElement;
        const hasChecked = Array.from(checkboxGroup.querySelectorAll('sbb-checkbox')).some(
          (el) => el.checked,
        );
        if (hasChecked) {
          sbbFormError.remove();
        } else {
          checkboxGroup.append(sbbFormError);
        }
      }}
    >
      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-checkbox-panel ?checked=${checkedInput}>
          Value one ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-checkbox-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>

      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-checkbox-panel ?disabled=${disabledInput}>
          Value two ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-checkbox-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>

      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-checkbox-panel>
          Value three ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-checkbox-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>
      ${sbbFormError}
    </sbb-checkbox-group>
  `;
};

const WithRadiosErrorMessageTemplate = ({
  checkedInput,
  disabledInput,
  size,
  ...args
}: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'This is a required field.';

  return html`
    <sbb-radio-button-group
      orientation="vertical"
      horizontal-from="large"
      size=${size}
      allow-empty-selection
      id="sbb-radio-group"
      @change=${(event: Event) => {
        const group = event.currentTarget as SbbRadioButtonGroupElement;
        if (group.value) {
          sbbFormError.remove();
        } else {
          group.append(sbbFormError);
        }
      }}
    >
      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-radio-button-panel value="Value one" ?checked=${checkedInput}>
          Value one ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-radio-button-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>

      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-radio-button-panel value="Value two" ?disabled=${disabledInput}>
          Value two ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-radio-button-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>

      <sbb-selection-expansion-panel ${sbbSpread(args)}>
        <sbb-radio-button-panel value="Value three">
          Value three ${suffixAndSubtext(size)} ${cardBadge()}
        </sbb-radio-button-panel>
        ${innerContent()}
      </sbb-selection-expansion-panel>
      ${sbbFormError}
    </sbb-radio-button-group>
  `;
};

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

export const WithCheckboxSizeS: StoryObj = {
  render: WithCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![1] },
};

export const WithRadioButtonSizeS: StoryObj = {
  render: WithRadioButtonTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![1] },
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

export const WithCheckboxGroupSizeS: StoryObj = {
  render: WithCheckboxGroupTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true, size: size.options![1] },
};

export const WithRadioButtonGroupSizeS: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, disabledInput: true, size: size.options![1] },
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
    color: color.options![1],
    checkedInput: true,
    disabledInput: true,
  },
};

export const WithRadioButtonGroupMilk: StoryObj = {
  render: WithRadioButtonGroupTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    color: color.options![1],
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
    color: color.options![1],
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
    color: color.options![1],
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

export const NestedRadiosSizeS: StoryObj = {
  render: NestedRadioTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, size: size.options![1] },
};

export const NestedCheckboxesSizeS: StoryObj = {
  render: NestedCheckboxTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, checkedInput: true, size: size.options![1] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbSelectionExpansionPanelElement.events.didOpen,
        SbbSelectionExpansionPanelElement.events.didClose,
        SbbSelectionExpansionPanelElement.events.willOpen,
        SbbSelectionExpansionPanelElement.events.willClose,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-selection-expansion-panel',
};

export default meta;
