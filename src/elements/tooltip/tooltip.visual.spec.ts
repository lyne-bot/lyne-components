import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../core/testing/private.js';

import './tooltip.js';

describe('sbb-tooltip', () => {
  /**
   * Add the `viewports` param to test only specific viewport;
   * add the `viewportHeight` param to set a fixed height for the browser.
   */
  describeViewports({ viewports: ['small', 'large'] }, () => {
    // Create visual tests considering the implemented states (default, hover, active, focus)
    for (const state of visualDiffStandardStates) {
      it(
        `${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-tooltip>Test</sbb-tooltip>`);
        }),
      );
    }
  });
});
