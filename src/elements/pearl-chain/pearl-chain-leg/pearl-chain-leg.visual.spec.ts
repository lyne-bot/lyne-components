import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './pearl-chain-leg.js';

describe('sbb-pearl-chain-leg', () => {
  describeViewports({ viewports: ['medium'] }, () => {
    it(
      visualDiffDefault.name,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-pearl-chain-leg
            departure="2024-12-05T12:11:00"
            arrival="2024-12-05T15:11:00"
          ></sbb-pearl-chain-leg>`,
        );
      }),
    );

    it(
      `${visualDiffDefault.name} past=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-pearl-chain-leg
            past
            departure="2024-12-05T12:11:00"
            arrival="2024-12-05T15:11:00"
          ></sbb-pearl-chain-leg>`,
        );
      }),
    );

    it(
      `${visualDiffDefault.name} disruption=true`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-pearl-chain-leg
            disruption
            departure="2024-12-05T12:11:00"
            arrival="2024-12-05T15:11:00"
          ></sbb-pearl-chain-leg>`,
        );
      }),
    );

    it(
      `${visualDiffDefault.name} progress`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-pearl-chain-leg
            data-progress
            style="--sbb-pearl-chain-status-position: 28%"
            disruption
            departure="2024-12-05T12:11:00"
            arrival="2024-12-05T15:11:00"
          ></sbb-pearl-chain-leg>`,
        );
      }),
    );
  });
});
