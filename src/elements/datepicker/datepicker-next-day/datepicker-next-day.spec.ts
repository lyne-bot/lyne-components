import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerNextDayElement } from './datepicker-next-day.js';

import '../datepicker.js';
import '../../form-field/form-field.js';

describe(`sbb-datepicker-next-day`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerNextDayElement = await fixture(
        html`<sbb-datepicker-next-day></sbb-datepicker-next-day>`,
      );
      assert.instanceOf(element, SbbDatepickerNextDayElement);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page = await fixture(html`
        <div>
          <input id="datepicker-input" value="31-12-2022" />
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
          <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
        </div>
      `);

      const element: SbbDatepickerNextDayElement =
        page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      await waitForLitRender(element);
      const input: HTMLInputElement = page.querySelector<HTMLInputElement>('input')!;

      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);

      assert.instanceOf(element, SbbDatepickerNextDayElement);
      expect(input.value).to.be.equal('Sa, 31.12.2022');

      await element.click();

      await changeSpy.calledOnce();

      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 01.01.2023');
    });

    it('datepicker is created after the component', async () => {
      const element = await fixture(html`
        <div>
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
        </div>
      `);

      const nextButton: SbbDatepickerNextDayElement =
        element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      const inputUpdated = new EventSpy('inputUpdated', element);
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton).to.have.attribute('data-disabled');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      element.appendChild(picker);
      await waitForLitRender(element);

      // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
      expect(inputUpdated.count).to.be.equal(2);
      expect(nextButton).not.to.have.attribute('data-disabled');
    });

    it('datepicker is created after the component with different parent', async () => {
      const element = await fixture(html`
        <div>
          <div id="parent">
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-next-day date-picker="datepicker"></sbb-datepicker-next-day>
          </div>
          <div id="other"></div>
        </div>
      `);

      const nextButton: SbbDatepickerNextDayElement =
        element.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
      const inputUpdated = new EventSpy('inputUpdated', element.querySelector('#parent'));
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(nextButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton).to.have.attribute('data-disabled');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      element.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
      await waitForLitRender(element);

      // the datepicker is connected on a different parent, so no changes are triggered
      expect(inputUpdated.count).to.be.equal(0);
      expect(nextButton).to.have.attribute('data-disabled');
    });
  });

  describe('in form field', () => {
    let element: SbbDatepickerNextDayElement, input: HTMLInputElement;

    beforeEach(async () => {
      const form = await fixture<SbbFormFieldElement>(html`
        <sbb-form-field>
          <input value="21-01-2023" />
          <sbb-datepicker></sbb-datepicker>
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
        </sbb-form-field>
      `);
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
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Su, 22.01.2023');
    });

    it('disabled due max value equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <input value="21-01-2023" max="1674255600" />
          <sbb-datepicker-next-day></sbb-datepicker-next-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector<HTMLInputElement>('input')!;
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      expect(form.querySelector('sbb-datepicker-next-day')).to.have.attribute('data-disabled');

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Sa, 21.01.2023');
      input.toggleAttribute('disabled', true);

      await waitForLitRender(element);

      expect(element).to.have.attribute('data-disabled');
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Sa, 21.01.2023');
    });
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input disabled="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(element).to.have.attribute('data-disabled');
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input readonly="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-next-day></sbb-datepicker-next-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerNextDayElement =
      page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
    expect(element).to.have.attribute('data-disabled');
  });
});
