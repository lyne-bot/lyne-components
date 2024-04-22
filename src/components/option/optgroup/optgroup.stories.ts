import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import readme from './readme.md?raw';
import '../../form-field.js';
import '../../autocomplete.js';
import '../../select.js';
import '../option.js';
import './optgroup.js';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
});

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option group',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
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

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Option',
  },
};

const disabledSingle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete/Select',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
};

const defaultArgTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  value,
  disabled,
  disabledSingle,
  numberOfOptions,
};

const defaultArgs: Args = {
  label: 'Option group',
  'icon-name': undefined,
  value: 'Option',
  disabled: false,
  disabledSingle: false,
  numberOfOptions: 3,
};

const borderDecorator: Decorator = (story) => html`
  <div style="border: 3px solid red;">${story()}</div>
`;

const createOptions = (args: Args): TemplateResult[] =>
  new Array(args.numberOfOptions).fill(null).map((_, i) => {
    return html`
      <sbb-option
        value=${`${args.value} ${i + 1}`}
        ?disabled=${args.disabledSingle && i === 0}
        icon-name=${args['icon-name'] || nothing}
      >
        ${`${args.value} ${i + 1}`}
      </sbb-option>
    `;
  });

const Template = ({ label, disabled, ...args }: Args): TemplateResult => html`
  <sbb-optgroup label=${label + ' 1'} ?disabled=${disabled}> ${createOptions(args)} </sbb-optgroup>
  <sbb-optgroup label=${label + ' 2'} ?disabled=${disabled}> ${createOptions(args)} </sbb-optgroup>
`;

const TemplateAutocomplete = (args: Args): TemplateResult => {
  return html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Autocomplete</label>
      <input placeholder="Placeholder" />
      <sbb-autocomplete>${Template(args)}</sbb-autocomplete>
    </sbb-form-field>
  `;
};

const TemplateSelect = (args: Args): TemplateResult => {
  return html`
    <sbb-form-field ?negative=${args.negative}>
      <label>Select</label>
      <sbb-select ?multiple=${args.multiple} placeholder="Select"> ${Template(args)} </sbb-select>
    </sbb-form-field>
  `;
};

export const Standalone: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [borderDecorator],
};

export const Autocomplete: StoryObj = {
  render: TemplateAutocomplete,
  argTypes: { ...defaultArgTypes, negative },
  args: { ...defaultArgs, negative: false },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: { ...defaultArgTypes, negative, multiple },
  args: { ...defaultArgs, multiple: false, negative: false },
};

export const MultipleSelect: StoryObj = {
  render: TemplateSelect,
  argTypes: { ...defaultArgTypes, negative, multiple },
  args: { ...defaultArgs, multiple: true, negative: false },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
      source: { format: 'html' },
    },
  },
  title: 'components/sbb-option/sbb-optgroup',
};

export default meta;
