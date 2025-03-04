import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { defaultDateAdapter } from '../../core/datetime.js';
import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.js';

import { SbbDatepickerElement } from './datepicker.js';

import '../../date-input.js';
import '../../form-field.js';
import '../datepicker-next-day.js';
import '../datepicker-previous-day.js';
import '../datepicker-toggle.js';

describe(`sbb-datepicker ssr`, () => {
  const asIso8601 = (date: Date): string => defaultDateAdapter.toIso8601(date);

  it('renders', async () => {
    const root = await ssrHydratedFixture(html`<sbb-datepicker></sbb-datepicker>`, {
      modules: ['./datepicker.js'],
    });
    assert.instanceOf(root, SbbDatepickerElement);
  });

  it('should render full datepicker component set', async () => {
    const root = await ssrHydratedFixture(
      html`
        <sbb-form-field>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker-toggle></sbb-datepicker-toggle>
          <sbb-date-input value="01.01.2023"></sbb-date-input>
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `,
      {
        modules: [
          './datepicker.js',
          '../../form-field.js',
          '../datepicker-next-day.js',
          '../datepicker-previous-day.js',
          '../datepicker-toggle.js',
        ],
      },
    );

    const datepicker = root.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
    expect(asIso8601(datepicker.valueAsDate!)).to.equal(asIso8601(new Date(2023, 0, 1)));

    const datepickerToggle =
      root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
    await datepickerToggle.hydrationComplete;
    await datepickerToggle.updateComplete;
    expect(datepickerToggle.shadowRoot?.querySelector('sbb-calendar')).to.not.be.null;

    // When opening the calendar
    datepickerToggle.open();

    // Then the calendar should be displayed
    expect(
      datepickerToggle.shadowRoot?.querySelector('sbb-popover')?.getAttribute('data-state'),
    ).not.to.be.equal('closed');
  });
});
