import {
  describeViewports,
  visualDiffDefault,
} from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import './pearl-chain.js';
import {
  cancelledLegTemplate,
  disruptionTemplate,
  futureLegTemplate,
  longFutureLegTemplate,
  pastLegTemplate,
  progressLegTemplate,
} from './pearl-chain.sample-data.js';

describe(`sbb-pearl-chain`, () => {
  const cases = [
    { name: 'no stops', legs: [futureLegTemplate] },
    {
      name: 'many stops',
      legs: [futureLegTemplate, longFutureLegTemplate, futureLegTemplate, futureLegTemplate],
    },
    { name: 'cancelled', legs: [disruptionTemplate] },
    {
      name: 'cancelled many stops',
      legs: [
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
      ],
    },
    {
      name: 'with position',
      legs: [progressLegTemplate],
      now: new Date('2024-12-05T12:11:00').valueOf(),
    },
    {
      name: 'past',
      legs: [pastLegTemplate, pastLegTemplate],
      now: new Date('2025-11-01T12:11:00').valueOf(),
    },
    {
      name: 'departure stop skipped',
      legs: [
        pastLegTemplate,
        progressLegTemplate,
        longFutureLegTemplate,
        cancelledLegTemplate(true),
        futureLegTemplate,
      ],
      now: new Date('2024-12-05T12:11:00').valueOf(),
    },
    {
      name: 'arrival stop skipped',
      legs: [
        pastLegTemplate,
        progressLegTemplate,
        longFutureLegTemplate,
        cancelledLegTemplate(false, true),
        futureLegTemplate,
      ],
      now: new Date('2024-12-05T12:11:00').valueOf(),
    },
    {
      name: 'first stop skipped',
      legs: [cancelledLegTemplate(true), futureLegTemplate, longFutureLegTemplate],
      now: new Date('2024-12-05T12:11:00').valueOf(),
    },
    {
      name: 'last stop skipped',
      legs: [pastLegTemplate, pastLegTemplate, cancelledLegTemplate(false, true)],
      now: new Date('2023-12-05T12:11:00').valueOf(),
    },
    {
      name: 'mixed',
      legs: [
        pastLegTemplate,
        progressLegTemplate,
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
        longFutureLegTemplate,
      ],
      now: new Date('2024-12-05T12:11:00').valueOf(),
    },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain
              now=${(c.now ?? new Date('2024-12-01T12:11:00').valueOf()) / 1000}
              marker="static"
            >
              ${c.legs.map((l) => {
                return l;
              })}</sbb-pearl-chain
            >
          `);
        }),
      );
    }
  });
});
