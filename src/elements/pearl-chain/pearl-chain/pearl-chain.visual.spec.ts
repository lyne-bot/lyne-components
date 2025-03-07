import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

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

describe(`sbb-pearl-chain`, () => {
  const cases = [
    { name: 'no stops', legs: [futureLegTemplate], now: new Date('2024-12-01T12:11:00') },
    {
      name: 'many stops',
      legs: [futureLegTemplate, longFutureLegTemplate, futureLegTemplate, futureLegTemplate],
      now: new Date('2024-12-01T12:11:00'),
    },
    { name: 'cancelled', legs: [disruptionTemplate], now: new Date('2024-12-01T12:11:00') },
    {
      name: 'cancelled many stops',
      legs: [
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
      ],
      now: new Date('2024-12-01T12:11:00'),
    },
    {
      name: 'with position',
      legs: [progressLegTemplate],
      now: new Date('2024-12-05T12:11:00'),
    },
    {
      name: 'past',
      legs: [pastLegTemplate, pastLegTemplate],
      now: new Date('2025-11-01T12:11:00'),
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
      now: new Date('2024-12-05T12:11:00'),
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
      now: new Date('2024-12-05T12:11:00'),
    },
    {
      name: 'first stop skipped',
      legs: [cancelledLegTemplate(true), futureLegTemplate, longFutureLegTemplate],
      now: new Date('2024-12-05T12:11:00'),
    },
    {
      name: 'last stop skipped',
      legs: [pastLegTemplate, pastLegTemplate, cancelledLegTemplate(false, true)],
      now: new Date('2023-12-05T12:11:00'),
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
      now: new Date('2024-12-05T12:11:00'),
    },
    {
      name: 'forced colors',
      legs: [
        pastLegTemplate,
        progressLegTemplate,
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
        longFutureLegTemplate,
      ],
      now: new Date('2024-12-05T12:11:00'),
      forcedColors: true,
    },
    {
      name: 'different background color',
      legs: [
        pastLegTemplate,
        progressLegTemplate,
        futureLegTemplate,
        cancelledLegTemplate(false, false, true),
        longFutureLegTemplate,
      ],
      now: new Date('2024-12-05T12:11:00'),
      changeBg: true,
    },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const c of cases) {
      it(
        c.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html` <sbb-pearl-chain now=${c.now} marker="static"> ${c.legs}</sbb-pearl-chain> `,
            {
              forcedColors: c?.forcedColors,
              backgroundColor: c?.changeBg ? 'aqua' : 'white',
            },
          );
        }),
      );
    }
  });
});
