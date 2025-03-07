import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerNextDayElement } from './datepicker-next-day.js';

import '../datepicker.js';
import '../../date-input.js';
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
              <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
              <sbb-datepicker-next-day datepicker="datepicker"></sbb-datepicker-next-day>
            </div>
          `);

          const element: SbbDatepickerNextDayElement =
            root.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
          await waitForLitRender(element);
          const input: HTMLInputElement | SbbDateInputElement = root.querySelector<
            HTMLInputElement | SbbDateInputElement
          >(inputSelector)!;

          const changeSpy = new EventSpy('change', input);
          const blurSpy = new EventSpy('blur', input);

          assert.instanceOf(element, SbbDatepickerNextDayElement);
          expect(input.value).to.be.equal('Sa, 31.12.2022');

          element.click();
          await changeSpy.calledOnce();

          expect(changeSpy.count).to.be.equal(1);
          expect(blurSpy.count).to.be.equal(1);
          expect(input.value).to.be.equal('Su, 01.01.2023');
        });

        it('datepicker is created after the component', async () => {
          const element = await fixture(html`
            <div>
              ${dateInput
                ? html`<sbb-date-input id="datepicker-input" value="2023-01-01"></sbb-date-input>`
                : html`<input id="datepicker-input" value="2023-01-01" />`}
              <sbb-datepicker-next-day datepicker="datepicker"></sbb-datepicker-next-day>
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

          expect(inputUpdated.count).to.be.equal(1);
          expect(nextButton).not.to.have.attribute('data-disabled');
        });

        it('datepicker is created after the component with different parent', async () => {
          const element = await fixture(html`
            <div>
              <div id="parent">
                ${dateInput
                  ? html`<sbb-date-input id="datepicker-input" value="2023-01-01"></sbb-date-input>`
                  : html`<input id="datepicker-input" value="2023-01-01" />`}
                <sbb-datepicker-next-day datepicker="datepicker"></sbb-datepicker-next-day>
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

          expect(inputUpdated.count).to.be.equal(0);
          expect(nextButton).not.to.have.attribute('data-disabled');
        });
      });

      describe('in form field', () => {
        let element: SbbDatepickerNextDayElement, input: HTMLInputElement | SbbDateInputElement;

        beforeEach(async () => {
          const form = await fixture<SbbFormFieldElement>(html`
            <sbb-form-field>
              ${dateInput
                ? html`<sbb-date-input value="2023-01-21"></sbb-date-input>`
                : html`<input value="2023-01-21" />`}
              <sbb-datepicker></sbb-datepicker>
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
            </sbb-form-field>
          `);
          element = form.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
          input = form.querySelector<HTMLInputElement | SbbDateInputElement>(inputSelector)!;
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
              ${dateInput
                ? html`<sbb-date-input value="2023-01-21" max="2023-01-21"></sbb-date-input>`
                : html`<input value="2023-01-21" max="2023-01-21" />`}
              <sbb-datepicker-next-day></sbb-datepicker-next-day>
              <sbb-datepicker></sbb-datepicker>
            </sbb-form-field>
          `);
          input = form.querySelector<HTMLInputElement | SbbDateInputElement>(inputSelector)!;
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
            ${dateInput
              ? html`<sbb-date-input disabled></sbb-date-input>`
              : html`<input disabled />`}
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
            ${dateInput
              ? html`<sbb-date-input readonly></sbb-date-input>`
              : html`<input readonly />`}
            <sbb-datepicker></sbb-datepicker>
            <sbb-datepicker-next-day></sbb-datepicker-next-day>
          </sbb-form-field>
        `);

        const element: SbbDatepickerNextDayElement =
          page.querySelector<SbbDatepickerNextDayElement>('sbb-datepicker-next-day')!;
        expect(element).to.have.attribute('data-disabled');
      });
    });
  }
});
