import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html, nothing } from 'lit';

import { extendedLeg, progressLeg } from '../pearl-chain-legacy/pearl-chain-legacy.sample-data.js';
import './pearl-chain-time.js';

describe(`sbb-pearl-chain-time`, () => {
  const cases = [
    { name: 'minimal', legs: [progressLeg] },
    { name: 'departure walk', legs: [progressLeg], departureWalk: '10' },
    { name: 'arrival walk', legs: [progressLeg], arrivalWalk: '5' },
    {
      name: 'mixed',
      legs: [progressLeg],
      departureWalk: '0',
      arrivalWalk: '5',
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
    {
      name: 'extended enter',
      legs: [extendedLeg],
      departureWalk: '10',
      arrivalWalk: '5',
      now: new Date('2022-12-05T12:11:00').valueOf(),
    },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-time
              arrival-time="2022-12-11T14:11:00"
              departure-time="2022-12-11T12:11:00"
              .legs=${c.legs}
              now=${(c.now ?? new Date('2022-12-01T12:11:00').valueOf()) / 1000}
              departure-walk=${c.departureWalk ?? nothing}
              arrival-walk=${c.arrivalWalk ?? nothing}
              disable-animation
            ></sbb-pearl-chain-time>
          `);
        }),
      );
    }
  });
});
