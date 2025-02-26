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
import { ref } from 'lit/directives/ref.js';

import { defaultDateAdapter } from '../core/datetime.js';

import { SbbDateInputElement } from './date-input.js';
import readme from './readme.md?raw';

import '../form-field.js';
import '../title.js';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Date Input',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Date Input',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Date Input',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Date Input',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  disabled,
  readonly,
  value,
};

const defaultArgs: Args = {
  negative: false,
  disabled: false,
  readonly: false,
  value: '2024-12-11',
};

const Template = ({ value, disabled, readonly }: Args): TemplateResult =>
  html` <sbb-form-field>
      <label>Label</label>
      <sbb-date-input
        .value=${value}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ${ref((dateInput) => {
          if (!dateInput || !(dateInput instanceof SbbDateInputElement)) {
            return;
          }
          const [valueOutput, isoOutput] = Array.from(
            (dateInput.parentElement!.nextElementSibling as HTMLElement)!.querySelectorAll(
              'output',
            )!,
          );
          const updateOutputs = (): void => {
            valueOutput.value = String(dateInput.valueAsDate);
            isoOutput.value = dateInput.valueAsDate
              ? defaultDateAdapter.toIso8601(dateInput.valueAsDate)
              : 'null';
          };
          updateOutputs();
          dateInput.addEventListener('input', updateOutputs);
        })}
      ></sbb-date-input>
    </sbb-form-field>
    <p>
      <sbb-title level="6">valueAsDate</sbb-title>
      <output name="valueAsDate"></output>
      <sbb-title level="6">ISO 8601 Date</sbb-title>
      <output name="ISO8601"></output>
    </p>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: ['input', 'change', 'keydown', 'keyup', 'keypress', 'focus', 'blur'],
    },
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-date-input',
};

export default meta;
