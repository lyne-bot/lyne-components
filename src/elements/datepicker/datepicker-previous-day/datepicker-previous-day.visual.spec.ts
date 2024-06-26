import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './datepicker-previous-day.js';
import '../datepicker.js';
import '../../form-field.js';

describe(`sbb-datepicker-previous-day`, () => {
  const cases = {
    negative: [true, false],
    value: [null, '15.02.2023'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `standalone ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          `);
        }),
      );

      describeEach(cases, ({ negative, value }) => {
        it(
          `with form-field ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-form-field ?negative=${negative}>
                <input value=${value || nothing} />
                <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
                <sbb-datepicker></sbb-datepicker>
              </sbb-form-field>
            `);
          }),
        );
      });
    }
  });
});
