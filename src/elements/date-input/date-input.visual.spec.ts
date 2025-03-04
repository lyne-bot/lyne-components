import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../core/testing/private.js';

import './date-input.js';
import '../form-field/form-field.js';

describe('sbb-date-input', () => {
  /**
   * Add the `viewports` param to test only specific viewport;
   * add the `viewportHeight` param to set a fixed height for the browser.
   */
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of visualDiffStandardStates) {
      it(
        state.name,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field>
              <sbb-date-input value="2024-12-11"></sbb-date-input>
            </sbb-form-field>
          `);
          setup.withStateElement(setup.snapshotElement.querySelector('sbb-date-input')!);
        }),
      );
    }
  });
});
