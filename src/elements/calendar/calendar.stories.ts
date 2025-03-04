import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import { defaultDateAdapter } from '../core/datetime.js';

import { SbbCalendarElement } from './calendar.js';
import readme from './readme.md?raw';

const getCalendarAttr = (min: number | string, max: number | string): Record<string, string> => {
  const attr: Record<string, string> = {};
  if (min) {
    attr.min = defaultDateAdapter.toIso8601(new Date(min));
  }
  if (max) {
    attr.max = defaultDateAdapter.toIso8601(new Date(max));
  }
  return attr;
};

const Template = ({ min, max, selected, dateFilter, now, ...args }: Args): TemplateResult => html`
  <sbb-calendar
    .selected=${new Date(selected)}
    .now=${new Date(now)}
    .dateFilter=${dateFilter}
    ${sbbSpread(getCalendarAttr(min, max))}
    ${sbbSpread(args)}
  ></sbb-calendar>
`;

const wide: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Calendar',
  },
};

const orientation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['horizontal', 'vertical'],
  table: {
    category: 'Calendar',
  },
};

const selected: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Calendar',
  },
};

const min: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const max: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Date filters',
  },
};

const view: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['day', 'month', 'year'],
};

const now: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
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
    category: 'Date filters',
  },
};

const defaultArgTypes: ArgTypes = {
  wide,
  orientation,
  selected,
  min,
  max,
  dateFilter,
  view: view,
  now,
};

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const defaultArgs: Args = {
  wide: false,
  orientation: orientation.options![0],
  selected: today,
  now: undefined,
  view: view.options![0],
};

export const Calendar: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs },
};

export const CalendarWithMinAndMax: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: {
    ...defaultArgs,
    min: new Date(today.getFullYear(), today.getMonth(), 5),
    max: new Date(today.getFullYear(), today.getMonth(), 29),
  },
};

export const CalendarWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true },
};

export const CalendarVertical: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1] },
};

export const CalendarVerticalWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, orientation: orientation.options![1], wide: true },
};

export const CalendarFilterFunction: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes, dateFilter },
  args: {
    ...defaultArgs,
    dateFilter: dateFilter.options![2],
  },
};

export const CalendarWithInitialYearSelection: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, view: view.options![2] },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbCalendarElement.events.dateSelected],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-datepicker/sbb-calendar',
};

export default meta;
