import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbDatepickerPreviousDayElement } from './datepicker-previous-day.js';

import './datepicker-previous-day.js';
import '../datepicker.js';
import '../../date-input.js';
import '../../form-field.js';

describe(`sbb-datepicker-previous-day`, () => {
  let element: SbbDatepickerPreviousDayElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with connected datepicker', async () => {
    beforeEach(async () => {
      const page = await fixture(html`
        <div>
          <sbb-date-input id="datepicker-input" value="2022-12-31"></sbb-date-input>
          <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        </div>
      `);

      element = page.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
