import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import type { SbbDatepickerToggleElement } from './datepicker-toggle.js';

import './datepicker-toggle.js';
import '../datepicker.js';
import '../../date-input.js';
import '../../form-field.js';

describe(`sbb-datepicker-toggle`, () => {
  describeViewports({ viewports: ['wide'] }, () => {
    describeEach({ negative: [true, false] }, ({ negative }) => {
      const withFormFieldTemplate = html`
        <sbb-form-field ?negative=${negative}>
          <sbb-datepicker-toggle id="toggle"></sbb-datepicker-toggle>
          <sbb-datepicker now="2023-01-12T00:00:00Z"></sbb-datepicker>
          <sbb-date-input></sbb-date-input>
        </sbb-form-field>
      `;

      it(
        `form field ${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(withFormFieldTemplate, {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
            minHeight: '600px',
          });

          setup.withPostSetupAction(() => {
            const toggle =
              setup.snapshotElement.querySelector<SbbDatepickerToggleElement>('#toggle')!;
            toggle.open();
          });
        }),
      );

      it(
        `form field ${visualDiffFocus.name}`,
        visualDiffFocus.with(async (setup) => {
          await setup.withFixture(withFormFieldTemplate, {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            focusOutlineDark: negative,
          });
        }),
      );
    });
  });
});
