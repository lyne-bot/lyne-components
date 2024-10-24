import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import {
  cancelledLeg,
  progressLeg,
  pastLeg,
  futureLeg,
  longFutureLeg,
  redirectedOnDepartureLeg,
  redirectedOnArrivalLeg,
} from './pearl-chain.sample-data.js';
import readme from './readme.md?raw';
import './pearl-chain.js';

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  now,
};

const defaultArgs: Args = {
  'disable-animation': false,
  now: new Date('2022-12-01T12:11:00').valueOf(),
};

const Template = ({ legs, now, ...args }: Args): TemplateResult => {
  return html`<sbb-pearl-chain
    .legs=${legs}
    ${sbbSpread(args)}
    now=${now ? now / 1000 : nothing}
  ></sbb-pearl-chain>`;
};

export const NoStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg],
  },
};

export const ManyStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, longFutureLeg, futureLeg, futureLeg],
  },
};

export const Cancelled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [cancelledLeg],
  },
};

export const CancelledManyStops: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, cancelledLeg, futureLeg, cancelledLeg],
  },
};

export const withPosition: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [progressLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Past: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, pastLeg],
    now: new Date('2023-11-01T12:11:00').valueOf(),
  },
};

export const DepartureStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnDepartureLeg, futureLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const ArrivalStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnArrivalLeg, futureLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const FirstStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [redirectedOnDepartureLeg, futureLeg, longFutureLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const LastStopSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [futureLeg, longFutureLeg, redirectedOnArrivalLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

export const Mixed: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
    now: new Date('2022-12-05T12:11:00').valueOf(),
  },
};

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 80%;">${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-pearl-chain',
};

export default meta;
