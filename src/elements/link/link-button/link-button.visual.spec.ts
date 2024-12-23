import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './link-button.js';

describe(`sbb-link-button`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [true, false]) {
      for (const state of visualDiffStandardStates) {
        it(
          `negative=${negative} ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html` <p class="sbb-text-m">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                <sbb-link-button ?negative=${negative}>Show more.</sbb-link-button>
              </p>`,
              {
                backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined,
                color: negative ? 'var(--sbb-color-aluminium)' : undefined,
              },
            );
          }),
        );
      }
    }

    it(
      `disabledInteractive`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-link-button disabled-interactive>Show more.</sbb-link-button>`,
        );
      }),
    );
  });
});
