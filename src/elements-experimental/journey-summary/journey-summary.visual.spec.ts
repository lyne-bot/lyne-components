import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, nothing, type TemplateResult } from 'lit';

import {
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
} from '../pearl-chain-legacy/pearl-chain-legacy.sample-data.js';

import './journey-summary.js';
import '@sbb-esta/lyne-elements/button/button.js';
import '@sbb-esta/lyne-elements/button/secondary-button.js';

describe(`sbb-journey-summary`, () => {
  const defaultArgs = {
    roundTrip: false,
    now: new Date('2022-12-05T12:11:00'),
    trip: undefined as object | undefined,
    tripBack: undefined as object | undefined,
    hasSlot: true,
  };

  const template = ({
    roundTrip,
    now,
    trip,
    tripBack,
    hasSlot,
  }: typeof defaultArgs): TemplateResult => html`
    <sbb-journey-summary
      ?round-trip=${roundTrip}
      .trip=${trip}
      .tripBack=${tripBack}
      .now=${now}
      disable-animation
    >
      ${hasSlot
        ? html`
            <div
              style="display: flex; padding-top: 24px; justify-content: space-between;"
              slot="content"
            >
              <sbb-secondary-button icon-name="context-menu-small"></sbb-secondary-button>
              <sbb-button>Button label</sbb-button>
            </div>
          `
        : nothing}
    </sbb-journey-summary>
  `;

  const cases = [
    {
      name: 'no slot',
      args: {
        ...defaultArgs,
        hasSlot: false,
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
    },
    {
      name: 'summary',
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
    },
    {
      name: 'no vias',
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
    },
    {
      name: 'no arrival walk',
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
    },
    {
      name: 'position',
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
    },
    {
      name: 'roundtrip',
      args: {
        ...defaultArgs,
        hasSlot: false,
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
        roundTrip: true,
      },
    },
    {
      name: 'roundtrip one journey',
      args: {
        ...defaultArgs,
        hasSlot: false,
        trip: {
          vias: ['via1', 'via2', 'via3', 'via4'],
          legs: [pastLeg, progressLeg, futureLeg],
          origin: 'Bern',
          destination: 'Basel',
          departure: '2022-09-19T20:30:00+02:00',
          arrival: '2022-09-19T22:30:00+02:00',
          duration: 120,
        },
        roundTrip: true,
      },
    },
  ];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const example of cases) {
      it(
        example.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(template(example.args));
        }),
      );
    }
  });
});
