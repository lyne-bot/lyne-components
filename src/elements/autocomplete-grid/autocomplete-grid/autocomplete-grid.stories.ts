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
import { repeat } from 'lit/directives/repeat.js';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button.js';
import { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';

import { SbbAutocompleteGridElement } from './autocomplete-grid.js';
import readme from './readme.md?raw';

import '../autocomplete-grid-row.js';
import '../autocomplete-grid-optgroup.js';
import '../autocomplete-grid-cell.js';
import '../autocomplete-grid-button.js';
import '../../form-field.js';

const getOption = (event: Event): void => {
  const button = event.target as SbbAutocompleteGridButtonElement;
  const div: HTMLDivElement = document.createElement('div');
  div.innerText = `Button '${button.iconName}' clicked on row '${button.option?.textContent}' / value: '${button.option?.value}'`;
  (event.currentTarget as HTMLElement).closest('div')!.querySelector('#container')!.prepend(div);
};

const textBlockStyle: Readonly<StyleInfo> = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Readonly<StyleInfo> = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const textBlock = (): TemplateResult => html`
  <div style=${styleMap(textBlockStyle)}>
    This text block has a <code style=${styleMap(codeStyle)}>z-index</code> greater than the form
    field, but it must always be covered by the autocomplete overlay.
  </div>
`;

const aboveDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      'inset-block-end': '2rem',
      'inset-inline-start': '2rem',
      position: 'absolute',
      'max-width': 'calc(100% - 4rem)',
    })}
  >
    ${story()}
  </div>
`;

const scrollDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      height: '175vh',
      display: 'flex',
      'align-items': 'center',
    })}
  >
    ${story()}
  </div>
`;

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const optionIconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const buttonIconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  // Form field args
  negative,
  borderless,
  size,
  floatingLabel,

  // Input args
  disabled,
  readonly,

  // Autocomplete args
  preserveIconSpace,

  // Option args
  optionIconName,
  disableOption,

  // Button args
  buttonIconName,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Form field args
  negative: false,
  borderless: false,
  size: size.options![0],
  floatingLabel: false,

  // Input args
  disabled: false,
  readonly: false,

  // Autocomplete args
  preserveIconSpace: true,

  // Option args
  optionIconName: 'clock-small',
  disableOption: false,

  // Button args
  buttonIconName: 'pen-small',
};

const withGroupsDefaultArgs: Args = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const createRows1 = (
  optionIconName: string,
  buttonIconName: string,
  disableOption: boolean,
): TemplateResult => html`
  ${repeat(
    new Array(3),
    (_, i: number) => html`
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option
          value=${`1-${i + 1}`}
          icon-name=${optionIconName || nothing}
          ?disabled=${disableOption && i === 1}
          >${`Option 1-${i + 1}`}</sbb-autocomplete-grid-option
        >
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button
            icon-name=${buttonIconName}
            aria-label=${buttonIconName}
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  )}
`;

const createRows2 = (buttonIconName: string, disableOption: boolean): TemplateResult => html`
  ${repeat(
    new Array(3),
    (_, i: number) => html`
      <sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-option value=${`2-${i + 1}`} ?disabled=${disableOption && i === 1}
          >${`Option 2-${i + 1}`}</sbb-autocomplete-grid-option
        >
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button
            icon-name=${buttonIconName}
            aria-label=${buttonIconName}
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
        <sbb-autocomplete-grid-cell>
          <sbb-autocomplete-grid-button
            icon-name="trash-small"
            aria-label="trash-small"
            ?disabled=${disableOption && i === 1}
            @click=${(event: Event) => getOption(event)}
          ></sbb-autocomplete-grid-button>
        </sbb-autocomplete-grid-cell>
      </sbb-autocomplete-grid-row>
    `,
  )}
`;

const Template = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      size=${args.size}
      ?floating-label=${args.floatingLabel}
    >
      <label>Label</label>
      <input
        placeholder="Placeholder"
        aria-label="Listed options have extra buttons, use arrow keys to reach them."
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />
      <sbb-autocomplete-grid ?preserve-icon-space=${args.preserveIconSpace}>
        ${createRows1(args.optionIconName, args.buttonIconName, args.disableOption)}
        ${createRows2(args.buttonIconName, args.disableOption)}
      </sbb-autocomplete-grid>
    </sbb-form-field>
    ${textBlock()}
    <div
      id="container"
      style=${styleMap({
        color: args.negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
        paddingBlock: '1rem',
      })}
    ></div>
  </div>
`;

const OptionGroupTemplate = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input
        placeholder="Placeholder"
        aria-label="Listed options have extra buttons, use arrow keys to reach them."
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />
      <sbb-autocomplete-grid ?preserve-icon-space=${args.preserveIconSpace}>
        <sbb-autocomplete-grid-row>
          <sbb-autocomplete-grid-option value="Current location" icon-name="gps-small"
            >Current location</sbb-autocomplete-grid-option
          >
        </sbb-autocomplete-grid-row>
        <sbb-autocomplete-grid-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createRows1(args.optionIconName, args.buttonIconName, args.disableOption)}
        </sbb-autocomplete-grid-optgroup>
        <sbb-autocomplete-grid-optgroup label="Group 2">
          ${createRows2(args.buttonIconName, args.disableOptio1n)}
        </sbb-autocomplete-grid-optgroup>
      </sbb-autocomplete-grid>
    </sbb-form-field>
    ${textBlock()}
    <div
      id="container"
      style=${styleMap({
        color: args.negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
        paddingBlock: '1rem',
      })}
    ></div>
  </div>
`;

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Negative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const BasicSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
};

export const NoIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, optionIconName: undefined },
};

export const NoIconNoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, optionIconName: undefined, preserveIconSpace: false },
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
};

export const BorderlessNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, negative: true },
};

export const BorderlessSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, size: size.options![1] },
};

export const FloatingLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true },
};

export const FloatingLabelSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true, size: size.options![1] },
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [aboveDecorator],
};

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
};

export const DisableOption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disableOption: true },
};

export const NegativeDisableOption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, disableOption: true },
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const WithOptionGroupSizeS: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, size: size.options![1] },
};

export const WithOptionGroupNegative: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
};

export const WithOptionGroupDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, disableGroup: true },
};

export const WithOptionGroupNegativeDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true, disableGroup: true },
};

export const WithOptionGroupNegativeOptionDisabled: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true, disableOption: true },
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbAutocompleteGridElement.events.willOpen,
        SbbAutocompleteGridElement.events.didOpen,
        SbbAutocompleteGridElement.events.didClose,
        SbbAutocompleteGridElement.events.willClose,
        'change',
        'click',
        SbbAutocompleteGridOptionElement.events.optionSelected,
      ],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-autocomplete-grid/sbb-autocomplete-grid',
};

export default meta;
