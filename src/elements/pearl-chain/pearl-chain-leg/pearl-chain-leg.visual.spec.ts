import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './pearl-chain-leg.js';

describe('sbb-pearl-chain-leg', () => {
  const cases = [
    {},
    { past: true },
    { disruption: true },
    { departureSkipped: true },
    { progress: true },
  ];

  describeViewports({ viewports: ['medium'] }, () => {
    for (const props of cases) {
      it(
        `past=${!!props?.past}-disruption=${!!props?.disruption}-departureSkipped=${!!props?.departureSkipped}-data-progress=${!!props?.progress}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-pearl-chain-leg
              departure="2024-12-05T12:11:00"
              arrival="2024-12-05T15:11:00"
              ?past=${props?.past}
              ?disruption=${props?.disruption}
              ?departure-skipped=${props?.departureSkipped}
              ?data-progress=${props?.progress}
              style="--sbb-pearl-chain-status-position: 0.28"
            ></sbb-pearl-chain-leg>
          `);
        }),
      );
    }
  });
});
