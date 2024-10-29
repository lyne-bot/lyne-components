import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import {
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
} from '../pearl-chain-legacy/pearl-chain-legacy.sample-data.js';

import readme from './readme.md?raw';

import './journey-summary.js';
import '@sbb-esta/lyne-elements/button/button.js';
import '@sbb-esta/lyne-elements/button/secondary-button.js';

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const roundTrip: InputType = {
  control: {
    type: 'boolean',
  },
};

const headerLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Heading level of the journey header',
  },
};

const a11yFootpath: InputType = {
  control: {
    type: 'boolean',
  },
};

const now: InputType = {
  control: {
    type: 'date',
  },
};

const trip: InputType = {
  control: {
    type: 'object',
  },
  table: {
    disable: true,
  },
};

const tripBack: InputType = {
  control: {
    type: 'object',
  },
  table: {
    disable: true,
  },
};

const defaultArgTypes: ArgTypes = {
  'disable-animation': disableAnimation,
  'round-trip': roundTrip,
  'header-level': headerLevel,
  'a11y-footpath': a11yFootpath,
  now,
  trip,
  tripBack,
};

const defaultArgs: Args = {
  'disable-animation': false,
  'round-trip': false,
  'header-level': headerLevel.options![2],
  'a11y-footpath': false,
  now: new Date('2022-12-05T12:11:00').valueOf(),
  trip: undefined,
  tripBack: undefined,
};

const Template = ({ trip, tripBack, now, ...args }: Args): TemplateResult => html`
  <sbb-journey-summary
    .trip=${trip}
    .tripBack=${tripBack}
    now=${now ? now / 1000 : nothing}
    ${sbbSpread(args)}
  >
    <div style="display: flex; padding-top: 24px; justify-content: space-between;" slot="content">
      <sbb-secondary-button icon-name="context-menu-small"></sbb-secondary-button>
      <sbb-button>Button label</sbb-button>
    </div>
  </sbb-journey-summary>
`;

const TemplateNoSlot = ({ trip, tripBack, now, ...args }: Args): TemplateResult =>
  html`<sbb-journey-summary
    .trip=${trip}
    .tripBack=${tripBack}
    now=${now ? now / 1000 : nothing}
    ${sbbSpread(args)}
  ></sbb-journey-summary>`;

export const summaryNoSlot: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4', 'via5', 'via6'],
      legs: [futureLeg, longFutureLeg, futureLeg],
      origin: 'Station',
      destination: 'Station',
      departure: '2022-08-29T20:30:00+02:00',
      arrival: '2022-08-29T20:35:00+02:00',
      duration: 60,
    },
  },
};

export const summary: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4', 'via5', 'vi6'],
      legs: [futureLeg, longFutureLeg, futureLeg],
      origin: 'Station',
      destination: 'Station',
      departure: '2022-08-29T20:30:00+02:00',
      arrival: '2022-08-29T20:35:00+02:00',
      duration: 120,
    },
  },
};

export const summaryNoVias: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      origin: 'Station',
      destination: 'Station',
      legs: [futureLeg, longFutureLeg, futureLeg],
      arrivalWalk: 10,
      departureWalk: 5,
      departure: '2022-08-29T20:30:00+02:00',
      arrival: '2022-08-29T22:30:00+02:00',
      duration: 120,
    },
  },
};

export const summaryNoArrivalWalk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      origin: 'Station',
      destination: 'Station',
      legs: [futureLeg, longFutureLeg, futureLeg],
      departureWalk: 5,
      departure: '2022-08-30T20:30:00+02:00',
      arrival: '2022-08-29T22:30:00+02:00',
      duration: 120,
    },
  },
};

export const summaryPosition: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Station',
      destination: 'Station',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
  },
};

export const summaryRoundtrip: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    tripBack: {
      vias: ['via5', 'via6', 'via7', 'via8'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Basel',
      destination: 'Bern',
      departure: '2022-09-20T22:30:00+02:00',
      arrival: '2022-09-20T00:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};

export const summaryRoundtripOneJourney: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    trip: {
      vias: ['via1', 'via2', 'via3', 'via4'],
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};

export const summaryHeaderLevel: StoryObj = {
  render: TemplateNoSlot,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    'header-level': headerLevel.options![4],
    trip: {
      legs: [pastLeg, progressLeg, futureLeg],
      origin: 'Bern',
      destination: 'Basel',
      departure: '2022-09-19T20:30:00+02:00',
      arrival: '2022-09-19T22:30:00+02:00',
      duration: 120,
    },
    'round-trip': true,
  },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-journey-summary',
};

export default meta;
