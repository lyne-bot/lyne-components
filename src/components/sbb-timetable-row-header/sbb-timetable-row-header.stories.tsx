/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './sbb-timetable-row-header.sample-data';
import type { Meta, StoryObj, Args } from '@storybook/html';

const Template = (args): JSX.Element => (
  <sbb-timetable-row-header config={JSON.stringify(args.config)}></sbb-timetable-row-header>
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
export const SbbTimetableRowHeader: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    config: sampleData[0],
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
  title: 'internals/sbb-timetable-row-header',
};

export default meta;
