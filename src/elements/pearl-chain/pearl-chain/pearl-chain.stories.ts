import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import './pearl-chain.js';
import '../pearl-chain-leg.js';
import {
  cancelledLegTemplate,
  disruptionTemplate,
  futureLegTemplate,
  longFutureLegTemplate,
  pastLegTemplate,
  progressLegTemplate,
} from './pearl-chain.sample-data.js';
import readme from './readme.md?raw';

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

const serviceAlteration: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['departure-skipped', 'arrival-skipped', 'disruption'],
};

const marker: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['static', 'pulsing'],
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  marker: marker,
  now,
};

const defaultArgs: Args = {
  'disable-animation': false,
  marker: marker.options![0],
  now: new Date('2024-12-05T12:11:00').valueOf(),
};

const TemplateSlotted = (legs: TemplateResult[], { now, ...args }: Args): TemplateResult => {
  return html`<sbb-pearl-chain ${sbbSpread(args)} now=${now ? now / 1000 : nothing}>
    ${legs.map((leg: TemplateResult) => {
      return leg;
    })}
  </sbb-pearl-chain>`;
};

const TemplateAlteration = ({ serviceAlteration, ...args }: Args): TemplateResult => {
  return TemplateSlotted(
    [
      pastLegTemplate,
      progressLegTemplate,
      futureLegTemplate,
      cancelledLegTemplate(
        serviceAlteration === 'departure-skipped',
        serviceAlteration === 'arrival-skipped',
        serviceAlteration === 'disruption',
      ),
      longFutureLegTemplate,
    ],
    args,
  );
};

const TemplateFirstStopSkipped = (args: Args): TemplateResult => {
  return TemplateSlotted(
    [cancelledLegTemplate(true), futureLegTemplate, longFutureLegTemplate],
    args,
  );
};

const TemplateLastStopSkipped = (args: Args): TemplateResult => {
  return TemplateSlotted(
    [pastLegTemplate, pastLegTemplate, cancelledLegTemplate(false, true)],
    args,
  );
};

const TemplateManyStops = (args: Args): TemplateResult => {
  return TemplateSlotted(
    [pastLegTemplate, pastLegTemplate, pastLegTemplate, pastLegTemplate],
    args,
  );
};

const TemplateNoStop = (args: Args): TemplateResult => {
  return TemplateSlotted([futureLegTemplate], args);
};

const TemplateCancelled = (args: Args): TemplateResult => {
  return TemplateSlotted([disruptionTemplate], args);
};

const TemplateManyCancelled = (args: Args): TemplateResult => {
  return TemplateSlotted(
    [
      futureLegTemplate,
      cancelledLegTemplate(false, false, true),
      futureLegTemplate,
      cancelledLegTemplate(false, false, true),
    ],
    args,
  );
};

const TemplateWithPosition = (args: Args): TemplateResult => {
  return TemplateSlotted([progressLegTemplate], args);
};

const TemplatePast = (args: Args): TemplateResult => {
  return TemplateSlotted([pastLegTemplate, pastLegTemplate], args);
};

export const NoStops: StoryObj = {
  render: TemplateNoStop,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const ManyStops: StoryObj = {
  render: TemplateManyStops,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    now: new Date('2024-11-30T11:13:00').valueOf(),
  },
};

export const Cancelled: StoryObj = {
  render: TemplateCancelled,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const CancelledManyStops: StoryObj = {
  render: TemplateManyCancelled,
  argTypes: defaultArgTypes,
};

export const withPosition: StoryObj = {
  render: TemplateWithPosition,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const Past: StoryObj = {
  render: TemplatePast,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const DepartureStopSkipped: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    serviceAlteration: serviceAlteration.options![0],
  },
};

export const ArrivalStopSkipped: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    serviceAlteration: serviceAlteration.options![1],
  },
};

export const FirstStopSkipped: StoryObj = {
  render: TemplateFirstStopSkipped,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const LastStopSkipped: StoryObj = {
  render: TemplateLastStopSkipped,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    now: new Date('2024-11-30T11:13:00').valueOf(),
  },
};

export const Mixed: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    serviceAlteration: serviceAlteration.options![2],
  },
};

export const MixedWithTime: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    serviceAlteration: serviceAlteration.options![2],
    departure: '2024-12-18T12:13:00',
    arrival: '2024-11-30T12:13:00',
  },
};

const meta: Meta = {
  decorators: [(story) => html`<div style="max-width: 80%;">${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/pearl-chain/sbb-pearl-chain',
};

export default meta;
