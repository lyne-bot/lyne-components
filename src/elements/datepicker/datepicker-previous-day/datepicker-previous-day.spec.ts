import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerPreviousDayElement } from './datepicker-previous-day.js';

import '../datepicker.js';
import '../../form-field/form-field.js';

describe(`sbb-datepicker-previous-day`, () => {
  describe('standalone', () => {
    it('renders', async () => {
      const element: SbbDatepickerPreviousDayElement = await fixture(
        html`<sbb-datepicker-previous-day></sbb-datepicker-previous-day>`,
      );
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const root = await fixture(html`
        <div>
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
        </div>
      `);
      const element: SbbDatepickerPreviousDayElement = root.querySelector(
        'sbb-datepicker-previous-day',
      )!;
      const input: HTMLInputElement = root.querySelector<HTMLInputElement>('input')!;
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
      expect(input.value).to.be.equal('Su, 01.01.2023');

      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);

      expect(input.value).to.be.equal('Sa, 31.12.2022');
    });

    it('datepicker is created after the component', async () => {
      const doc = await fixture(html`
        <div id="parent">
          <input id="datepicker-input" value="01-01-2023" />
          <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
        </div>
      `);

      const prevButton: SbbDatepickerPreviousDayElement =
        doc.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      const inputUpdated: EventSpy<Event> = new EventSpy('inputUpdated', doc);
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(prevButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton).to.have.attribute('data-disabled');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      doc.appendChild(picker);
      await waitForLitRender(doc);

      // the datepicker is connected, which triggers a 1st inputUpdated event which calls _init and a 2nd one which sets max/min/disabled
      expect(inputUpdated.count).to.be.equal(2);
      expect(prevButton).not.to.have.attribute('data-disabled');
    });

    it('datepicker is created after the component with different parent', async () => {
      const root = await fixture(html`
        <div>
          <div id="parent">
            <input id="datepicker-input" value="01-01-2023" />
            <sbb-datepicker-previous-day date-picker="datepicker"></sbb-datepicker-previous-day>
          </div>
          <div id="other"></div>
        </div>
      `);

      const prevButton: SbbDatepickerPreviousDayElement =
        root.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      const inputUpdated: EventSpy<Event> = new EventSpy(
        'inputUpdated',
        root.querySelector('#parent'),
      );
      // there's no datepicker, so no event and the button is disabled due _datePickerElement not set
      expect(prevButton).not.to.be.null;
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton).to.have.attribute('data-disabled');

      const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
      picker.setAttribute('input', 'datepicker-input');
      picker.setAttribute('id', 'datepicker');
      picker.setAttribute('value', '01-01-2023');
      root.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
      await waitForLitRender(root);

      // the datepicker is connected on a different parent, so no changes are triggered
      expect(inputUpdated.count).to.be.equal(0);
      expect(prevButton).to.have.attribute('data-disabled');
    });
  });

  describe('in form field', () => {
    let element: SbbDatepickerPreviousDayElement, input: HTMLInputElement;

    beforeEach(async () => {
      const form: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <input value="20-01-2023" />
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      element = form.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
      input = form.querySelector<HTMLInputElement>('input')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbDatepickerPreviousDayElement);
    });

    it('click', async () => {
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      const changeSpy = new EventSpy('change', input);
      const blurSpy = new EventSpy('blur', input);
      element.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
      expect(blurSpy.count).to.be.equal(1);
      expect(input.value).to.be.equal('Th, 19.01.2023');
    });

    it('disabled due min equals to value', async () => {
      const form: SbbFormFieldElement = await fixture(html`
        <sbb-form-field>
          <input value="20-01-2023" min="1674172800" />
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      input = form.querySelector<HTMLInputElement>('input')!;

      expect(input.value).to.be.equal('Fr, 20.01.2023');
      expect(form.querySelector('sbb-datepicker-previous-day')).to.have.attribute('data-disabled');

      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
    });

    it('disabled due disabled picker', async () => {
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      input.toggleAttribute('disabled', true);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-disabled');
      element.click();
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
    });
  });

  it('renders with datepicker and input disabled', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input disabled="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerPreviousDayElement =
      page.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
    expect(element).to.have.attribute('data-disabled');
  });

  it('renders with datepicker and input readonly', async () => {
    const page: SbbFormFieldElement = await fixture(html`
      <sbb-form-field>
        <input readonly="" />
        <sbb-datepicker></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </sbb-form-field>
    `);

    const element: SbbDatepickerPreviousDayElement =
      page.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
    expect(element).to.have.attribute('data-disabled');
  });
});
