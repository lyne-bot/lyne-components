/** @jsx h */
import events from './sbb-calendar.events.ts';
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const getCalendarAttr = (min, max) => {
  let attr = {};
  if (min) {
    attr.min = new Date(min);
  }
  if (max) {
    attr.max = new Date(max);
  }
  return attr;
};

const Template = ({ min, max, selectedDate, dateFilter, ...args }): JSX.Element => (
  <sbb-calendar
    selectedDate={new Date(selectedDate)}
    {...getCalendarAttr(min, max)}
    {...args}
    ref={(calendarRef) => {
      calendarRef.dateFilter = dateFilter;
    }}
  ></sbb-calendar>
);

const TemplateFilterFunction = ({ dateFilter, ...args }): JSX.Element => (
  <sbb-calendar
    ref={(calendarRef) => {
      calendarRef.dateFilter = dateFilter;
    }}
    {...args}
  ></sbb-calendar>
);

const wide: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Calendar',
  },
};

const selectedDate: InputType = {
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

const dataNow: InputType = {
  control: {
    type: 'date',
  },
  table: {
    category: 'Testing',
  },
};

const filterFunctions = [
  () => true,
  (d) => d.getDay() !== 6 && d.getDay() !== 0,
  (d) => d.getDate() % 2 === 1,
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
    },
  },
  table: {
    category: 'Date filters',
  },
};

const defaultArgTypes: ArgTypes = {
  wide,
  selectedDate,
  min,
  max,
  dateFilter,
  'data-now': dataNow,
};

const today = new Date();
today.setDate(today.getDate() >= 15 ? 8 : 18);

const defaultArgs: Args = {
  wide: false,
  selectedDate: isChromatic() ? new Date(2023, 0, 20) : today,
  dataNow: isChromatic() ? new Date(2023, 0, 12, 0, 0, 0).valueOf() : undefined,
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
  min: isChromatic() ? new Date(2023, 0, 9) : new Date(today.getFullYear(), today.getMonth(), 5),
  max: isChromatic() ? new Date(2023, 0, 29) : new Date(today.getFullYear(), today.getMonth(), 29),
},
};



export const CalendarWide: StoryObj = {
  render: Template,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, wide: true },
};



export const CalendarFilterFunction: StoryObj = {
  render: TemplateFilterFunction,
  argTypes: { ...defaultArgTypes, dateFilter },
  args: {
  ...defaultArgs,
  // Workaround: On Chromatic mapping functions do not work, so assign function directly.
  // TODO: Check if condition can be removed after refactoring Chromatic generation @kyubisation
  dateFilter: isChromatic() ? filterFunctions[1] : dateFilter.options[2],
},
};



const meta: Meta =  {
  decorators: [withActions],
  parameters: {
    actions: {
      handles: [events.dateSelected],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/form elements/sbb-calendar',
};

export default meta;
