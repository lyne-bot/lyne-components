import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, Args, StoryContext, ArgTypes } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import { occupancySampleData } from './timetable-occupancy.sample-data';
import './timetable-occupancy';
import '../timetable-occupancy-icon';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const occupancy: Args = {
  table: {
    disable: false,
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  occupancy,
};

const defaultArgs: Args = {
  negative: false,
};

const Template = ({ ...args }: Args): TemplateResult => html`
  <sbb-timetable-occupancy ${sbbSpread(args)}></sbb-timetable-occupancy>
`;

export const UnknownUnknownOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[0] },
};

export const UnknownLowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[1] },
};

export const UnknownMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[2] },
};

export const UnknownHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[3] },
};

export const LowLowOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[4] },
};

export const LowMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[5] },
};

export const LowHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[6] },
};

export const MediumMediumOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[7] },
};

export const MediumHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[8] },
};

export const HighHighOccupancy: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[9] },
};

export const UnknownUnknownOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[0], negative: true },
};

export const UnknownLowOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[1], negative: true },
};

export const UnknownMediumOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[2], negative: true },
};

export const UnknownHighOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[3], negative: true },
};

export const LowLowOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[4], negative: true },
};

export const LowMediumOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[5], negative: true },
};

export const LowHighOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[6], negative: true },
};

export const MediumMediumOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[7], negative: true },
};

export const MediumHighOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[8], negative: true },
};

export const HighHighOccupancyNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, occupancy: occupancySampleData[9], negative: true },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'internals/sbb-timetable-occupancy',
};

export default meta;
