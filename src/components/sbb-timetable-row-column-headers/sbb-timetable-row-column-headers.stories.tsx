/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';

import sampleData from './sbb-timetable-row-column-headers.sample-data';
import type { Meta, StoryObj, Args } from '@storybook/html';

const Template = (args): JSX.Element => (
  <sbb-timetable-row-column-headers
    config={JSON.stringify(args.config)}
  ></sbb-timetable-row-column-headers>
);

const config: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes = {
  config,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const SbbTimetableRowColumnHeaders: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData,
  },
};

const meta: Meta = {
  decorators: [(Story) => <Story />],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-row-column-headers',
};

export default meta;
