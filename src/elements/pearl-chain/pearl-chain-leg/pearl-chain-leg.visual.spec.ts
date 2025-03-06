import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import './pearl-chain-leg.js';

describe('sbb-pearl-chain-leg', () => {
  let root: HTMLElement;

  const cases = {
    past: [true, false],
    disruption: [true, false],
    departureSkipped: [true, false],
    progress: [true, false],
  };

  describeViewports({ viewports: ['medium'] }, () => {
    describeEach(cases, ({ past, disruption, departureSkipped, progress }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-pearl-chain-leg
            departure="2024-12-05T12:11:00"
            arrival="2024-12-05T15:11:00"
            ?past=${past}
            ?disruption=${disruption}
            ?departure-skipped=${departureSkipped}
            ?data-progress=${progress}
            style="--sbb-pearl-chain-status-position: 0.28"
          ></sbb-pearl-chain-leg>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
