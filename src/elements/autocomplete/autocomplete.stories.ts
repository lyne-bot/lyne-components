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
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { SbbFormErrorElement } from '../form-error.js';
import { SbbOptionElement } from '../option.js';

import { SbbAutocompleteElement } from './autocomplete.js';
import readme from './readme.md?raw';

import '../form-field.js';
import '../form-error.js';

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

const iconName: InputType = {
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

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  // Autocomplete args
  negative,
  disabled,
  readonly,
  preserveIconSpace,

  // Option args
  iconName,
  disableOption,

  // Form field args
  borderless,
  size,
  floatingLabel,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Autocomplete args
  negative: false,
  disabled: false,
  readonly: false,

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: true,
  disableOption: false,

  // Form field args
  borderless: false,
  size: size.options![0],
  floatingLabel: false,
};

const withGroupsDefaultArgs: Args = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

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

const createOptionGroup1 = (iconName: string, disableOption: boolean): TemplateResult => {
  return html`
    <sbb-option icon-name=${iconName} value="Option 1"> Option 1 </sbb-option>
    <sbb-option icon-name=${iconName} ?disabled=${disableOption} value="Option 2">
      Option 2
    </sbb-option>
    <sbb-option value="Option 3">
      <sbb-icon slot="icon" name=${iconName}></sbb-icon>
      Option 3
    </sbb-option>
  `;
};
const createOptionGroup2 = (): TemplateResult => {
  return html`
    <sbb-option value="Option 4">Option 4</sbb-option>
    <sbb-option value="Option 5">Option 5</sbb-option>
  `;
};

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Args = {
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

const Template = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete ?preserve-icon-space=${args.preserveIconSpace}>
        ${createOptionGroup1(args.iconName, args.disableOption)} ${createOptionGroup2()}
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
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
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete ?preserve-icon-space=${args.preserveIconSpace}>
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const MixedTemplate = (args: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      size=${args.size}
    >
      <label>Label</label>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />

      <sbb-autocomplete ?preserve-icon-space=${args.preserveIconSpace}>
        <sbb-option value="Option 1">
          <sbb-icon
            slot="icon"
            name=${args.iconName}
            style=${styleMap({ color: 'var(--sbb-color-sky)' })}
          ></sbb-icon>
          Option Value
        </sbb-option>
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const RequiredTemplate = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'This is a required field.';

  return html`
    <div>
      <sbb-form-field
        ?negative=${args.negative}
        ?borderless=${args.borderless}
        ?floating-label=${args.floatingLabel}
        size=${args.size}
        id="sbb-form-field"
      >
        <label>Label</label>
        <input
          id="sbb-autocomplete"
          class="sbb-invalid"
          placeholder="Placeholder"
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          @change=${(event: Event) => {
            if ((event.currentTarget as HTMLInputElement).value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-autocomplete')!.classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field')!.append(sbbFormError);
              document.getElementById('sbb-autocomplete')!.classList.add('sbb-invalid');
            }
          }}
        />

        <sbb-autocomplete ?preserve-icon-space=${args.preserveIconSpace}>
          <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
            ${createOptionGroup1(args.iconName, args.disableOption)}
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
        </sbb-autocomplete>
        ${sbbFormError}
      </sbb-form-field>
      ${textBlock()}
    </div>
  `;
};

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const BasicNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const BasicSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [aboveDecorator],
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

export const WithError: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const WithErrorNegative: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
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

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
};

export const NoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: false },
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const MixedSingleOptionWithOptionGroup: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
};

export const MixedSingleOptionWithOptionGroupNegative: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
};

export const MixedSingleOptionWithOptionGroupSizeS: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, size: size.options![1] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbAutocompleteElement.events.willOpen,
        SbbAutocompleteElement.events.didOpen,
        SbbAutocompleteElement.events.didClose,
        SbbAutocompleteElement.events.willClose,
        'change',
        SbbOptionElement.events.optionSelected,
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
  title: 'elements/sbb-autocomplete',
};

export default meta;
