import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import {
  cancelledLeg,
  futureLeg,
  longFutureLeg,
  pastLeg,
  progressLeg,
  redirectedOnArrivalLeg,
  redirectedOnDepartureLeg,
} from './pearl-chain-legacy.sample-data.js';
import './pearl-chain-legacy.js';

describe(`sbb-pearl-chain-legacy`, () => {
  const cases = [
    { name: 'no stops', legs: [futureLeg] },
    { name: 'many stops', legs: [futureLeg, longFutureLeg, futureLeg, futureLeg] },
    { name: 'cancelled', legs: [cancelledLeg] },
    { name: 'cancelled many stops', legs: [futureLeg, cancelledLeg, futureLeg, cancelledLeg] },
    { name: 'with position', legs: [progressLeg], now: new Date('2022-12-05T12:11:00').valueOf() },
    { name: 'past', legs: [pastLeg, pastLeg], now: new Date('2023-11-01T12:11:00').valueOf() },
    {
      name: 'departure post skipped',
      legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnDepartureLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'arrival post skipped',
      legs: [pastLeg, progressLeg, longFutureLeg, redirectedOnArrivalLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'first stop skipped',
      legs: [redirectedOnDepartureLeg, futureLeg, longFutureLeg],
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'last stop skipped',
      legs: [futureLeg, longFutureLeg, redirectedOnArrivalLeg],
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'mixed',
      legs: [pastLeg, progressLeg, longFutureLeg, cancelledLeg, futureLeg],
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-legacy
              .legs=${c.legs}
              now=${(c.now ?? new Date('2022-12-01T12:11:00').valueOf()) / 1000}
              disable-animation
            ></sbb-pearl-chain-legacy>
          `);
        }),
      );
    }
  });
});
