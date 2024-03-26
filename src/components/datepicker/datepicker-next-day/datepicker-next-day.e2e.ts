import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing';
import { fixture } from '../../core/testing/private';
import type { SbbFormFieldElement } from '../../form-field';
import type { SbbDatepickerElement } from '../datepicker';

import { SbbDatepickerNextDayElement } from './datepicker-next-day';

import '../datepicker';
import '../../form-field/form-field';

describe(`sbb-datepicker-next-day with ${fixture.name}`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerNextDayElement = await fixture(
        html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
        { modules: ['./datepicker-next-day.ts'] },
      );
      assert.instanceOf(element, SbbDatepickerNextDayElement);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page = await fixture(
        html`
          <div>
            <input id="datepicker-input" value="31-12-2022" />
            <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
            <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
          </div>
        `,
        { modules: ['../datepicker/index.ts', './datepicker-next-day.ts'] },
      );

      const element: SbbDatepickerNextDayElement =
        page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      await waitForLitRender(element);
      const input: HTMLInputElement = page.querySelector<HTMLInputElement>('input')!;

      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);

      assert.instanceOf(element, SbbDatepickerNextDayElement);
      expect(input.value).to.be.equal('Sa, 31.12.2022');

      await element.click();

      await waitForCondition(() => changeSpy.events.length >= 1);

      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 01.01.2023');
    });

    it('datepicker is created after the component', async () => {
      const element = await fixture(
        html`
          <div>
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
          </div>
        `,
        { modules: ['./datepicker-next-day.ts'] },
      );

      const nextButton: SbbDatepickerNextDayElement =
        element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      const inputUpdated = new EventSpy('inputUpdated', element);
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      element.appendChild(picker);
      await waitForLitRender(element);

      // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
      expect(inputUpdated.count).to.be.equal(2);
      expect(nextButton.dataset.disabled).to.be.undefined;
    });

    it('datepicker is created after the component with different parent', async () => {
      const element = await fixture(
        html`
          <div>
            <div id="parent">
              <input id="datepicker-input" value="01-01-2023" />
              <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
            </div>
            <div id="other"></div>
          </div>
        `,
        { modules: ['./datepicker-next-day.ts'] },
      );

      const nextButton: SbbDatepickerNextDayElement =
        element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      const inputUpdated = new EventSpy('inputUpdated', element.querySelector('#parent'));
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      element.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
      await waitForLitRender(element);

      // the datepicker is connected on a different parent, so no changes are triggered
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton.dataset.disabled).to.be.equal('');
    });
  });

  describe('in form field', () => {
    let element: SbbDatepickerNextDayElement, input: HTMLInputElement;

    beforeEach(async () => {
      const form = await fixture<SbbFormFieldElement>(
        html`
          <sbb-form-field>
            <input value="21-01-2023" />
            <sbb-datepicker></sbb-datepicker>
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
          </sbb-form-field>
        `,
        {
          modules: [
            '../../form-field/index.ts',
            '../datepicker/index.ts',
            './datepicker-next-day.ts',
          ],
        },
      );
      element = form.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      input = form.querySelector<HTMLInputElement>('input')!;
      await waitForLitRender(element);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerNextDayElement);
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 22.01.2023');
    });

    it('disabled due max value equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(
        html`
          <sbb-form-field>
            <input value="21-01-2023" max="1674255600" />
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
            <sbb-datepicker></sbb-datepicker>
          </sbb-form-field>
        `,
        {
          modules: [
            '../../form-field/index.ts',
            './datepicker-next-day.ts',
            '../datepicker/index.ts',
          ],
        },
      );
      input = form.querySelector<HTMLInputElement>('input')!;
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      expect(form.querySelector('sbb-datepicker-next-day')).to.have.attribute('data-disabled');

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      input.setAttribute('disabled', '');

      await waitForLitRender(element);

      expect(element).to.have.attribute('data-disabled');
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });
  });
});
