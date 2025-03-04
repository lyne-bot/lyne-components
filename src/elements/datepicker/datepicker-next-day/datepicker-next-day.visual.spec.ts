import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import './datepicker-next-day.js';
import '../datepicker.js';
import '../../date-input.js';
import '../../form-field.js';

describe(`sbb-datepicker-next-day`, () => {
  const cases = {
    negative: [true, false],
    value: [null, '2023-02-15'],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const state of [visualDiffDefault, visualDiffFocus]) {
      it(
        `standalone ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`);
        }),
      );

      describeEach(cases, ({ negative, value }) => {
        it(
          `with form-field ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-form-field ?negative=${negative}>
                  <sbb-date-input value=${value || nothing}></sbb-date-input>
                  <sbb-datepicker></sbb-datepicker>
                  <sbb-datepicker-next-day></sbb-datepicker-next-day>
                </sbb-form-field>
              `,
              { backgroundColor: negative ? 'var(--sbb-color-black)' : undefined },
            );

            if (value) {
              setup.withStateElement(
                setup.snapshotElement.querySelector('sbb-datepicker-next-day')!,
              );
            }
          }),
        );
      });
    }
  });
});
