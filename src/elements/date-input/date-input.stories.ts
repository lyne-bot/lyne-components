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
import { html, nothing } from 'lit';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { defaultDateAdapter } from '../core/datetime.js';

import { SbbDateInputElement } from './date-input.js';
import readme from './readme.md?raw';

import '../form-error.js';
import '../form-field.js';
import '../title.js';

const toIso8601 = (date: number | null): string | typeof nothing =>
  date == null ? nothing : defaultDateAdapter.toIso8601(new Date(date));

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

const required: InputType = {
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

const weekdayStyle: InputType = {
  control: {
    type: 'select',
  },
  options: ['short', 'none'],
  table: {
    category: 'Date Input',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date Input',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date Input',
  },
};

const filterFunctions = [
  undefined,
  (d: Date): boolean => d.getDay() !== 6 && d.getDay() !== 0,
  (d: Date): boolean => d.getDate() % 2 === 1,
  (d: Date): boolean => d.getFullYear() % 2 === 0,
  (d: Date): boolean => d.getMonth() > 6,
];
const dateFilter: InputType = {
  options: Object.keys(filterFunctions),
  mapping: filterFunctions,
  control: {
    type: 'select',
    labels: {
      0: 'No dateFilter function.',
      1: 'The dateFilter function includes only working days.',
      2: 'The dateFilter function excludes even days.',
      3: 'The dateFilter function excludes odd years.',
      4: 'The dateFilter function excludes months from January to July',
    },
  },
  table: {
    category: 'Date Input',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  disabled,
  readonly,
  required,
  value,
  weekdayStyle,
  min,
  max,
  dateFilter,
};

const defaultArgs: Args = {
  negative: false,
  disabled: false,
  readonly: false,
  required: true,
  value: '2024-12-11',
  weekdayStyle: weekdayStyle.options![0],
  min: null,
  max: null,
  dateFilter: dateFilter.options![0],
};

const Template = ({
  value,
  disabled,
  readonly,
  required,
  negative,
  weekdayStyle,
  min,
  max,
  dateFilter,
}: Args): TemplateResult =>
  html` <sbb-form-field ?negative=${negative}>
      <label>Label</label>
      <sbb-date-input
        .value=${value}
        .weekdayStyle=${weekdayStyle}
        min=${toIso8601(min)}
        max=${toIso8601(max)}
        .dateFilter=${dateFilter}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
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
          const updateError = (): void => {
            let error = dateInput.nextElementSibling;
            if (dateInput.validity.valid) {
              error?.remove();
            } else if (error) {
              error.textContent = dateInput.validationMessage;
            } else {
              error = document.createElement('sbb-form-error');
              error.textContent = dateInput.validationMessage;
              dateInput.after(error);
            }
          };

          updateOutputs();
          dateInput.addEventListener('input', () => {
            updateOutputs();
            updateError();
          });
        })}
      ></sbb-date-input>
    </sbb-form-field>
    <p
      style=${styleMap({
        color: negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
      })}
    >
      <sbb-title level="6" ?negative=${negative}>valueAsDate</sbb-title>
      <output name="valueAsDate"></output>
      <sbb-title level="6" ?negative=${negative}>ISO 8601 Date</sbb-title>
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
      handles: ['input', 'change'],
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
