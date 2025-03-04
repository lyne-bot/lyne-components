import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerPreviousDayElement } from './datepicker-previous-day.js';

import '../datepicker.js';
import '../../date-input.js';
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

  for (const dateInput of [false, true]) {
    const inputSelector = dateInput ? 'sbb-date-input' : 'input';

    describe(`with ${dateInput ? 'date' : 'native'} input`, () => {
      describe('with picker', () => {
        it('renders and click', async () => {
          const root = await fixture(html`
            <div>
              ${dateInput
                ? html`<sbb-date-input id="datepicker-input" value="2022-12-31"></sbb-date-input>`
                : html`<input id="datepicker-input" value="2022-12-31" />`}
              <sbb-datepicker-previous-day datepicker="datepicker"></sbb-datepicker-previous-day>
              <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
            </div>
          `);
          const element: SbbDatepickerPreviousDayElement = root.querySelector(
            'sbb-datepicker-previous-day',
          )!;
          const input: HTMLInputElement | SbbDateInputElement = root.querySelector<
            HTMLInputElement | SbbDateInputElement
          >(inputSelector)!;

          const changeSpy = new EventSpy('change', input);
          const blurSpy = new EventSpy('blur', input);

          assert.instanceOf(element, SbbDatepickerPreviousDayElement);
          expect(input.value).to.be.equal('Sa, 31.12.2022');

          element.click();
          await changeSpy.calledOnce();

          expect(changeSpy.count).to.be.equal(1);
          expect(blurSpy.count).to.be.equal(1);
          expect(input.value).to.be.equal('Fr, 30.12.2022');
        });

        it('datepicker is created after the component', async () => {
          const doc = await fixture(html`
            <div id="parent">
              ${dateInput
                ? html`<sbb-date-input id="datepicker-input" value="2023-01-01"></sbb-date-input>`
                : html`<input id="datepicker-input" value="2023-01-01" />`}
              <sbb-datepicker-previous-day datepicker="datepicker"></sbb-datepicker-previous-day>
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

          expect(inputUpdated.count).to.be.equal(1);
          expect(prevButton).not.to.have.attribute('data-disabled');
        });

        it('datepicker is created after the component with different parent', async () => {
          const root = await fixture(html`
            <div>
              <div id="parent">
                ${dateInput
                  ? html`<sbb-date-input id="datepicker-input" value="2023-01-01"></sbb-date-input>`
                  : html`<input id="datepicker-input" value="2023-01-01" />`}
                <sbb-datepicker-previous-day datepicker="datepicker"></sbb-datepicker-previous-day>
              </div>
              <div id="other"></div>
            </div>
          `);

          const prevButton: SbbDatepickerPreviousDayElement =
            root.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
          const inputUpdated = new EventSpy('inputUpdated', root.querySelector('#parent'));
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

          expect(inputUpdated.count).to.be.equal(0);
          expect(prevButton).not.to.have.attribute('data-disabled');
        });
      });

      describe('in form field', () => {
        let element: SbbDatepickerPreviousDayElement, input: HTMLInputElement | SbbDateInputElement;

        beforeEach(async () => {
          const form = await fixture<SbbFormFieldElement>(html`
            <sbb-form-field>
              ${dateInput
                ? html`<sbb-date-input value="2023-01-21"></sbb-date-input>`
                : html`<input value="2023-01-21" />`}
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `);
          element = form.querySelector<SbbDatepickerPreviousDayElement>(
            'sbb-datepicker-previous-day',
          )!;
          input = form.querySelector<HTMLInputElement | SbbDateInputElement>(inputSelector)!;
        });

        it('renders', async () => {
          assert.instanceOf(element, SbbDatepickerPreviousDayElement);
        });

        it('click', async () => {
          expect(input.value).to.be.equal('Sa, 21.01.2023');
          const changeSpy = new EventSpy('change', input);
          const blurSpy = new EventSpy('blur', input);
          element.click();
          await changeSpy.calledOnce();
          expect(changeSpy.count).to.be.equal(1);
          expect(blurSpy.count).to.be.equal(1);
          expect(input.value).to.be.equal('Fr, 20.01.2023');
        });

        it('disabled due min equals to value', async () => {
          const form: SbbFormFieldElement = await fixture(html`
            <sbb-form-field>
              ${dateInput
                ? html`<sbb-date-input value="2023-01-21" min="2023-01-21"></sbb-date-input>`
                : html`<input value="2023-01-21" min="2023-01-21" />`}
              <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `);
          input = form.querySelector<HTMLInputElement | SbbDateInputElement>(inputSelector)!;
          expect(input.value).to.be.equal('Sa, 21.01.2023');
          expect(form.querySelector('sbb-datepicker-previous-day')).to.have.attribute(
            'data-disabled',
          );

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
            ${dateInput
              ? html`<sbb-date-input disabled></sbb-date-input>`
              : html`<input disabled />`}
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
            ${dateInput
              ? html`<sbb-date-input readonly></sbb-date-input>`
              : html`<input readonly />`}
            <sbb-datepicker></sbb-datepicker>
            <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          </sbb-form-field>
        `);

        const element: SbbDatepickerPreviousDayElement =
          page.querySelector<SbbDatepickerPreviousDayElement>('sbb-datepicker-previous-day')!;
        expect(element).to.have.attribute('data-disabled');
      });
    });
  }
});
