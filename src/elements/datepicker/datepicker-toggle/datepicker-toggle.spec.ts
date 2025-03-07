import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbMiniButtonElement } from '../../button/mini-button.js';
import type { SbbCalendarElement } from '../../calendar.js';
import { defaultDateAdapter } from '../../core/datetime/native-date-adapter.js';
import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import { SbbPopoverElement } from '../../popover.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import { SbbDatepickerToggleElement } from './datepicker-toggle.js';

import '../datepicker.js';
import '../../date-input.js';
import '../../form-field/form-field.js';

describe(`sbb-datepicker-toggle`, () => {
  it('renders standalone', async () => {
    const element: SbbDatepickerToggleElement = await fixture(
      html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`,
    );
    assert.instanceOf(element, SbbDatepickerToggleElement);

    const popoverTrigger: SbbMiniButtonElement =
      element.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
    expect(popoverTrigger).to.have.attribute('disabled');
  });

  for (const dateInput of [false, true]) {
    const inputSelector = dateInput ? 'sbb-date-input' : 'input';

    describe(`with ${dateInput ? 'date' : 'native'} input`, () => {
      it('renders and opens popover with picker', async () => {
        const root = await fixture(html`
          <div>
            <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
            <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
            ${dateInput
              ? html`<sbb-date-input id="datepicker-input"></sbb-date-input>`
              : html`<input id="datepicker-input" />`}
          </div>
        `);
        const element: SbbDatepickerToggleElement =
          root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        assert.instanceOf(element, SbbDatepickerToggleElement);

        const didOpenEventSpy = new EventSpy(
          SbbPopoverElement.events.didOpen,
          element.shadowRoot!.querySelector('sbb-popover'),
        );
        const popoverTrigger: SbbMiniButtonElement =
          element.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
        const popover: SbbPopoverElement =
          element.shadowRoot!.querySelector<SbbPopoverElement>('sbb-popover')!;

        expect(popoverTrigger).not.to.have.attribute('disabled');
        expect(popover).to.have.attribute('data-state', 'closed');

        popoverTrigger.click();
        await didOpenEventSpy.calledOnce();

        expect(popover).to.have.attribute('data-state', 'opened');
      });

      it('renders and opens popover programmatically', async () => {
        const root = await fixture(html`
          <div>
            <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
            <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
            ${dateInput
              ? html`<sbb-date-input id="datepicker-input"></sbb-date-input>`
              : html`<input id="datepicker-input" />`}
          </div>
        `);
        const element: SbbDatepickerToggleElement =
          root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        const didOpenEventSpy = new EventSpy(
          SbbPopoverElement.events.didOpen,
          element.shadowRoot!.querySelector('sbb-popover'),
        );
        const popoverTrigger: SbbMiniButtonElement =
          element.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
        const popover: SbbPopoverElement =
          element.shadowRoot!.querySelector<SbbPopoverElement>('sbb-popover')!;
        await waitForLitRender(element);
        assert.instanceOf(element, SbbDatepickerToggleElement);
        expect(popoverTrigger).not.to.have.attribute('disabled');
        expect(popover).to.have.attribute('data-state', 'closed');

        element.open();

        await didOpenEventSpy.calledOnce();

        expect(popover).to.have.attribute('data-state', 'opened');
      });

      it('renders and opens popover programmatically by click', async () => {
        const root = await fixture(html`
          <div>
            <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
            <sbb-datepicker input="datepicker-input" id="datepicker"></sbb-datepicker>
            ${dateInput
              ? html`<sbb-date-input id="datepicker-input"></sbb-date-input>`
              : html`<input id="datepicker-input" />`}
          </div>
        `);
        const element: SbbDatepickerToggleElement =
          root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        const popover: SbbPopoverElement =
          element.shadowRoot!.querySelector<SbbPopoverElement>('sbb-popover')!;

        expect(popover).to.have.attribute('data-state', 'closed');

        element.click();

        expect(popover).not.to.have.attribute('data-state', 'closed');
      });

      it('datepicker is created after the component', async () => {
        const root = await fixture(html`
          <div id="parent">
            <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
            ${dateInput
              ? html`<sbb-date-input id="datepicker-input"></sbb-date-input>`
              : html`<input id="datepicker-input" />`}
          </div>
        `);

        const toggle: SbbDatepickerToggleElement =
          root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        const inputUpdated: EventSpy<Event> = new EventSpy('inputUpdated', root);
        const trigger: SbbMiniButtonElement =
          toggle.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
        // there's no datepicker, so no event and the popoverTrigger is disabled due _datePickerElement not set
        expect(toggle).not.to.be.null;
        expect(inputUpdated.count).to.be.equal(0);
        expect(trigger).to.have.attribute('disabled');

        const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
        picker.setAttribute('input', 'datepicker-input');
        picker.setAttribute('id', 'datepicker');
        picker.setAttribute('value', '01-01-2023');
        root.appendChild(picker);
        await waitForLitRender(root);

        expect(inputUpdated.count).to.be.equal(1);
        expect(trigger).not.to.have.attribute('disabled');
      });

      it('datepicker is created after the component with different parent', async () => {
        const root = await fixture(html`
          <div>
            <div id="parent">
              <sbb-datepicker-toggle datepicker="datepicker"></sbb-datepicker-toggle>
              ${dateInput
                ? html`<sbb-date-input id="datepicker-input"></sbb-date-input>`
                : html`<input id="datepicker-input" />`}
            </div>
            <div id="other"></div>
          </div>
        `);

        const toggle: SbbDatepickerToggleElement =
          root.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        const inputUpdated = new EventSpy('inputUpdated', root.querySelector('#parent'));
        const trigger = toggle.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
        // there's no datepicker, so no event and the popoverTrigger is disabled due _datePickerElement not set
        expect(toggle).not.to.be.null;
        expect(inputUpdated.count).to.be.equal(0);
        expect(trigger).to.have.attribute('disabled');

        const picker: SbbDatepickerElement = document.createElement('sbb-datepicker');
        picker.setAttribute('input', 'datepicker-input');
        picker.setAttribute('id', 'datepicker');
        picker.setAttribute('value', '01-01-2023');
        root.querySelector<HTMLDivElement>('#other')!.appendChild(picker);
        await waitForLitRender(root);

        expect(inputUpdated.count).to.be.equal(0);
        expect(trigger).not.to.have.attribute('disabled');
      });

      it('renders in form field, open calendar and change date', async () => {
        const form: SbbFormFieldElement = await fixture(html`
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker></sbb-datepicker>
            ${dateInput ? html`<sbb-date-input></sbb-date-input>` : html`<input />`}
          </sbb-form-field>
        `);
        const element: SbbDatepickerToggleElement =
          form.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
        const input: HTMLInputElement | SbbDateInputElement = form.querySelector<
          HTMLInputElement | SbbDateInputElement
        >(inputSelector)!;
        const popover: SbbPopoverElement =
          element.shadowRoot!.querySelector<SbbPopoverElement>('sbb-popover')!;
        expect(popover).to.have.attribute('data-state', 'closed');
        const didOpenEventSpy = new EventSpy(
          SbbPopoverElement.events.didOpen,
          element.shadowRoot!.querySelector('sbb-popover')!,
        );
        const changeSpy = new EventSpy('change', input);
        const blurSpy = new EventSpy('blur', input);
        assert.instanceOf(element, SbbDatepickerToggleElement);

        const popoverTrigger: SbbMiniButtonElement =
          element.shadowRoot!.querySelector<SbbMiniButtonElement>('sbb-mini-button')!;
        popoverTrigger.click();
        await didOpenEventSpy.calledOnce();
        expect(popover).to.have.attribute('data-state', 'opened');

        const calendar: SbbCalendarElement =
          element.shadowRoot!.querySelector<SbbCalendarElement>('sbb-calendar')!;
        calendar.dispatchEvent(
          new CustomEvent('dateSelected', {
            detail: new Date('2022-01-01'),
          }),
        );
        await waitForLitRender(element);

        expect(input.value).to.be.equal('Sa, 01.01.2022');
        expect(defaultDateAdapter.toIso8601(calendar.selected!)).to.be.equal('2022-01-01');
        expect(changeSpy.count).to.be.equal(1);
        expect(blurSpy.count).to.be.equal(1);

        // Clear the input value and expect the calendar to clear the previous selected date
        input.value = '';
        input.dispatchEvent(new Event('input'));
        input.dispatchEvent(new Event('change'));
        await waitForLitRender(element);

        expect(input.value).to.be.equal('');
        expect(calendar.selected).to.be.null;
      });

      it('handles view property', async () => {
        const element: SbbFormFieldElement = await fixture(
          html`<sbb-form-field>
            <sbb-datepicker-toggle view="year"></sbb-datepicker-toggle>
            <sbb-datepicker now="2022-04-01"></sbb-datepicker>
            ${dateInput ? html`<sbb-date-input></sbb-date-input>` : html`<input />`}
          </sbb-form-field>`,
        );

        const datepickerToggle =
          element.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;

        const didOpenEventSpy = new EventSpy(
          SbbPopoverElement.events.didOpen,
          datepickerToggle.shadowRoot!.querySelector('sbb-popover'),
        );
        const didCloseEventSpy = new EventSpy(
          SbbPopoverElement.events.didClose,
          datepickerToggle.shadowRoot!.querySelector('sbb-popover'),
        );

        // Open calendar
        datepickerToggle.open();
        await didOpenEventSpy.calledOnce();

        // We have to wait another tick
        await aTimeout(0);

        // Year view should be active
        const calendar = datepickerToggle.shadowRoot!.querySelector('sbb-calendar')!;
        expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-year-view')!).not.to.be
          .null;

        // Select year
        calendar.shadowRoot!.querySelectorAll('button')[5].click();
        await waitForLitRender(element);
        await waitForCondition(() => !calendar.hasAttribute('data-transition'));

        // Select month
        calendar.shadowRoot!.querySelectorAll('button')[5].click();
        await waitForLitRender(element);
        await waitForCondition(() => !calendar.hasAttribute('data-transition'));

        // Select day
        calendar.shadowRoot!.querySelectorAll('button')[5].click();
        await waitForLitRender(element);
        await waitForCondition(() => !calendar.hasAttribute('data-transition'));

        // Expect selected date and closed calendar
        expect(defaultDateAdapter.toIso8601(calendar.selected!)).to.be.equal('2020-05-05');
        await didCloseEventSpy.calledOnce();

        // Open again
        datepickerToggle.open();
        await didOpenEventSpy.calledTimes(2);

        // Should open with year view again
        expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-year-view')!).not.to.be
          .null;
        expect(
          calendar.shadowRoot!.querySelector('.sbb-calendar__selected')!.textContent!.trim(),
        ).to.be.equal('2020');

        // Close again
        await sendKeys({ press: 'Escape' });
        await didCloseEventSpy.calledTimes(2);

        // Changing to month view
        datepickerToggle.view = 'month';
        await waitForLitRender(element);

        // Open again
        datepickerToggle.open();
        await didOpenEventSpy.calledTimes(3);

        // Month view should be active and correct year preselected
        expect(calendar.shadowRoot!.querySelector('.sbb-calendar__table-month-view')!).not.to.be
          .null;
        expect(
          calendar
            .shadowRoot!.querySelector('.sbb-calendar__controls-change-date')!
            .textContent!.trim(),
        ).to.be.equal('2020');
      });
    });
  }
});
