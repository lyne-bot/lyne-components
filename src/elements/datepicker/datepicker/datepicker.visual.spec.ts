import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../datepicker-previous-day.js';
import '../datepicker-next-day.js';
import '../datepicker-toggle.js';
import './datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker`, () => {
  let root: HTMLElement;

  const cases = {
    negative: [false, true],
    states: [
      { disabled: false, readonly: false },
      { disabled: true, readonly: false },
      { disabled: false, readonly: true },
    ],
  };

  const sizes = ['s', 'l'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative, states }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(html`
          <sbb-form-field ?negative=${negative} width="collapse">
            <label>Label</label>
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <input ?disabled=${states.disabled} ?readonly=${states.readonly} value="12.02.2023" />
            <sbb-datepicker now="2023-02-12T00:00:00Z"></sbb-datepicker>
          </sbb-form-field>
        `);
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });

    describe('without form field', () => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <div style="display: flex; gap: 0.25rem;">
              <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
              <sbb-datepicker-toggle date-picker="datepicker"></sbb-datepicker-toggle>
              <input value="12.02.2023" id="datepicker-input" />
              <sbb-datepicker
                id="datepicker"
                input="datepicker-input"
                now="2023-02-12T00:00:00Z"
              ></sbb-datepicker>
              <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
            </div>
          `);
        }),
      );
    });

    for (const size of sizes) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-form-field width="collapse" size=${size as 's' | 'm' | 'l'}>
              <label>Label</label>
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
              <sbb-datepicker-toggle></sbb-datepicker-toggle>
              <input value="12.02.2023" />
              <sbb-datepicker now="2023-02-12T00:00:00Z"></sbb-datepicker>
            </sbb-form-field>
          `);
        }),
      );
    }
  });
});
