import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { EventSpy, waitForCondition, waitForLitRender, fixture } from '../../core/testing';
import type { SbbFormFieldElement } from '../../form-field';
import type { SbbDatepickerElement } from '../datepicker';

import { SbbDatepickerPreviousDayElement } from './datepicker-previous-day';

import '../datepicker';
import '../../form-field/form-field';

describe(`sbb-datepicker-previous-day with ${fixture.name}`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerPreviousDayElement = await fixture(
        html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
        { modules: ['./datepicker-previous-day.ts'] },
      );
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      await fixture(
        html`
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        `,
        { modules: ['./datepicker-previous-day.ts', '../datepicker/index.ts'] },
      );
      const element: SbbDatepickerPreviousDayElement = document.querySelector(
        'sbb-datepicker-previous-day',
      )!;
      const input: HTMLInputElement = document.querySelector<HTMLInputElement>('input')!;
      await waitForLitRender(element);
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
      expect(input.value).to.be.equal('Su, 01.01.2023');

      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);

      expect(input.value).to.be.equal('Sa, 31.12.2022');
    });

    it('datepicker is created after the component', async () => {
      const doc = await fixture(
        html`
          <div id="parent">
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          </div>
        `,
        { modules: ['./datepicker-previous-day.ts'] },
      );
      await waitForLitRender(doc);

      const prevButton: SbbDatepickerPreviousDayElement =
        doc.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      const inputUpdated: EventSpy<Event> = new EventSpy(
        'inputUpdated',
        document.querySelector('#parent'),
      );
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(prevButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      doc.appendChild(picker);
      await waitForLitRender(doc);

      // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
      expect(inputUpdated.count).to.be.equal(2);
      expect(prevButton.dataset.disabled).to.be.undefined;
    });

    it('datepicker is created after the component with different parent', async () => {
      const doc = await fixture(
        html`
          <div id="parent">
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          </div>
          <div id="other"></div>
        `,
        { modules: ['./datepicker-previous-day.ts'] },
      );
      await waitForLitRender(doc);

      const prevButton: SbbDatepickerPreviousDayElement =
        doc.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      const inputUpdated: EventSpy<Event> = new EventSpy(
        'inputUpdated',
        document.querySelector('#parent'),
      );
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(prevButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton.dataset.disabled).to.be.equal('');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      document.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
      await waitForLitRender(doc);

      // the datepicker is connected on a different parent, so no changes are triggered
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton.dataset.disabled).to.be.equal('');
    });
  });

  describe('in form field', () => {
    let element: SbbDatepickerPreviousDayElement, input: HTMLInputElement;

    beforeEach(async () => {
      const form: SbbFormFieldElement = await fixture(
        html`
          <sbb-form-field>
            <input value="20-01-2023" />
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
            <sbb-datepicker></sbb-datepicker>
          </sbb-form-field>
        `,
        {
          modules: [
            '../../form-field/index.ts',
            './datepicker-previous-day.ts',
            '../datepicker/index.ts',
          ],
        },
      );
      element = form.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      input = form.querySelector<HTMLInputElement>('input')!;
      await waitForLitRender(element);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Th, 19.01.2023');
    });

    it('disabled due min equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(
        html`
          <sbb-form-field>
            <input value="20-01-2023" min="1674172800" />
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
            <sbb-datepicker></sbb-datepicker>
          </sbb-form-field>
        `,
        {
          modules: [
            '../../form-field/index.ts',
            './datepicker-previous-day.ts',
            '../datepicker/index.ts',
          ],
        },
      );
      input = form.querySelector<HTMLInputElement>('input')!;
      await waitForLitRender(element);

      expect(input.value).to.be.equal('Fr, 20.01.2023');
      expect(form.querySelector('sbb-datepicker-previous-day')).to.have.attribute('data-disabled');

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      document.querySelector<HTMLInputElement>('input')!.setAttribute('disabled', '');
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-disabled');
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
    });
  });
});
