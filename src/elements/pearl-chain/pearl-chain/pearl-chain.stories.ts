import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { TimeAdapter } from '../../core/datetime.js';

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

const _timeAdapter: TimeAdapter = new TimeAdapter();

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
  marker: marker,
  now,
};

const defaultArgs: Args = {
  marker: marker.options![0],
  now: new Date('2024-01-05T12:11:00'),
};

const TemplateSlotted = (legs: TemplateResult[], { now, ...args }: Args): TemplateResult => {
  return html`<sbb-pearl-chain ${sbbSpread(args)} now=${now ? now / 1000 : nothing}>
    ${legs.map((leg: TemplateResult) => leg)}
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

const TemplateInMotion = (args: Args): TemplateResult => {
  const d = new Date();
  return TemplateSlotted(
    [
      html`<sbb-pearl-chain-leg
        departure=${_timeAdapter.addMilliseconds(d, -100000).toISOString()}
        arrival=${_timeAdapter.addMilliseconds(d, 20000).toISOString()}
      ></sbb-pearl-chain-leg>`,
      html`<sbb-pearl-chain-leg
        departure=${_timeAdapter.addMilliseconds(d, 20000).toISOString()}
        arrival=${_timeAdapter.addMilliseconds(d, 200000).toISOString()}
      ></sbb-pearl-chain-leg>`,
      html`<sbb-pearl-chain-leg
        departure=${_timeAdapter.addMilliseconds(d, 200000).toISOString()}
        arrival=${_timeAdapter.addMilliseconds(d, 320000).toISOString()}
      ></sbb-pearl-chain-leg>`,
    ],
    args,
  );
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
  args: {
    ...defaultArgs,
  },
};

export const WithPosition: StoryObj = {
  render: TemplateWithPosition,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    now: new Date('2024-12-05T12:11:00'),
  },
};

export const InMotion: StoryObj = {
  render: TemplateInMotion,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    now: undefined,
  },
};

export const Past: StoryObj = {
  render: TemplatePast,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    now: new Date('2027-12-05T12:11:00'),
  },
};

export const DepartureStopSkipped: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    now: new Date('2024-12-05T12:11:00'),
    serviceAlteration: serviceAlteration.options![0],
  },
};

export const ArrivalStopSkipped: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    now: new Date('2024-12-05T12:11:00'),
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
  },
};

export const Mixed: StoryObj = {
  render: TemplateAlteration,
  argTypes: { ...defaultArgTypes, serviceAlteration },
  args: {
    ...defaultArgs,
    now: new Date('2024-12-05T12:11:00'),
    serviceAlteration: serviceAlteration.options![2],
  },
};

const meta: Meta = {
  decorators: [(story) => html` <div>${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-pearl-chain/sbb-pearl-chain',
};

export default meta;
