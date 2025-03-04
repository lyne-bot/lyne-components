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
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbChipGroupElement } from './chip-group.js';
import readme from './readme.md?raw';

import '../chip.js';
import '../../autocomplete/autocomplete.js';
import '../../form-field/form-field.js';
import '../../option/option.js';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const separatorKeys: InputType = {
  control: {
    type: 'text',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form field',
  },
};

const hiddenLabel: InputType = {
  control: {
    type: 'boolean',
  },
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

const defaultArgTypes: ArgTypes = {
  disabled,
  readonly,
  negative,
  'separator-keys': separatorKeys,
  size,
  hiddenLabel,
  floatingLabel,
};

const defaultArgs: Args = {
  disabled: false,
  readonly: false,
  negative: false,
  'separator-keys': undefined,
  size: 'm',
  hiddenLabel: false,
  floatingLabel: false,
};

const Template = (args: Args): TemplateResult => html`
  <form>
    <sbb-form-field
      ?negative=${args.negative}
      size=${args.size}
      ?hidden-label=${args.hiddenLabel}
      ?floating-label=${args.floatingLabel}
    >
      <label>Label</label>
      <sbb-chip-group name="chip-group-1" separator-keys=${args['separator-keys'] || nothing}>
        <sbb-chip value="chip 1"></sbb-chip>
        <sbb-chip value="chip 2"></sbb-chip>
        <sbb-chip value="chip 3"></sbb-chip>
        <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      </sbb-chip-group>
    </sbb-form-field>
  </form>
`;

const WithAutocompleteTemplate = (args: Args): TemplateResult => html`
  <sbb-form-field
    ?negative=${args.negative}
    size=${args.size}
    ?hidden-label=${args.hiddenLabel}
    ?floating-label=${args.floatingLabel}
  >
    <label>Label</label>
    <sbb-chip-group
      name="chip-group-1"
      ?negative=${args.negative}
      separator-keys=${args['separator-keys'] || nothing}
    >
      <sbb-chip value="chip 1"></sbb-chip>
      <sbb-chip value="chip 2"></sbb-chip>
      <sbb-chip value="chip 3"></sbb-chip>
      <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
    </sbb-chip-group>
    <sbb-autocomplete>
      <sbb-option value="Option A">Option A</sbb-option>
      <sbb-option value="Option B">Option B</sbb-option>
      <sbb-option value="Option C">Option C</sbb-option>
    </sbb-autocomplete>
  </sbb-form-field>
`;

const SeparatorKeysTemplate = (args: Args): TemplateResult => html`
  ${Template(args)}
  <br />
  <span>Type something separated by ',' and press Enter</span>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
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

export const SizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 's' },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: 'l' },
};

export const WithAutocomplete: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithAutocompleteNegative: StoryObj = {
  render: WithAutocompleteTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const WithSeparatorKeys: StoryObj = {
  render: SeparatorKeysTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'separator-keys': ',' },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbChipGroupElement.events.input,
        SbbChipGroupElement.events.change,
        SbbChipGroupElement.events.chipInputTokenEnd,
      ],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-chip-group/sbb-chip-group',
};

export default meta;
