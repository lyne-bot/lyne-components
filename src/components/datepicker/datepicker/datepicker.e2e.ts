import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';
import type { Context } from 'mocha';

import { i18nDateChangedTo } from '../../core/i18n';
import { EventSpy, waitForCondition, waitForLitRender, fixture } from '../../core/testing';

import { SbbDatepickerElement } from './datepicker';

import '../../form-field';

describe(`sbb-datepicker with ${fixture.name}`, () => {
  it('renders', async () => {
    const element = await fixture(html`<sbb-datepicker></sbb-datepicker>`, {
      modules: ['./datepicker.ts'],
    });
    assert.instanceOf(element, SbbDatepickerElement);
  });

  it('renders and formats date', async () => {
    await fixture(
      html`
        <input id="datepicker-input" value="01-01-2023" />
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = document.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Su, 01.01.2023');
  });

  it('renders and interprets iso string date', async () => {
    await fixture(
      html`
        <input id="datepicker-input" value="2021-12-20" />
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = document.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Mo, 20.12.2021');
  });

  it('renders and interprets timestamp', async () => {
    await fixture(
      html`
        <input id="datepicker-input" value="1594512000000" />
        <sbb-datepicker id="datepicker" input="datepicker-input"></sbb-datepicker>
      `,
      { modules: ['./datepicker.ts'] },
    );

    const input: HTMLInputElement = document.querySelector<HTMLInputElement>('input')!;

    expect(input.value).to.be.equal('Su, 12.07.2020');
  });

  const commonBehaviorTest: (template: TemplateResult) => void = (template: TemplateResult) => {
    let element: SbbDatepickerElement, input: HTMLInputElement, button: HTMLButtonElement;

    beforeEach(async () => {
      await fixture(template, { modules: [] });
      element = document.querySelector<SbbDatepickerElement>('sbb-datepicker')!;
      input = document.querySelector<HTMLInputElement>('input')!;
      button = document.querySelector<HTMLButtonElement>('button')!;
      await waitForLitRender(element);
    });

    it('renders and emit event on value change', async function (this: Context) {
      // This test is flaky on Firefox, so we retry a few times.
      this.retries(3);
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20/01/2023' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('Fr, 20.01.2023');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and interpret two digit year correctly in 2000s', async function (this: Context) {
      // This test is flaky on Firefox, so we retry a few times.
      this.retries(3);
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20/01/12' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('Fr, 20.01.2012');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and interpret two digit year correctly in 1900s', async function (this: Context) {
      // This test is flaky on Firefox, so we retry a few times.
      this.retries(3);
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20/01/99' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input.value).to.be.equal('We, 20.01.1999');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects missing month error', async () => {
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20..2012' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects missing year error', async () => {
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20.05.' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects invalid month error', async () => {
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '20.00.2012' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders and detects invalid day error', async () => {
      const changeSpy = new EventSpy('change', element);
      input.focus();
      await sendKeys({ type: '00.05.2020' });
      button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).to.have.attribute('data-sbb-invalid');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('renders with errors when typing letters', async () => {
      expect(input.value).to.be.equal('');
      input.focus();
      await sendKeys({ type: 'invalid' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);
      expect(input.value).to.be.equal('invalid');
      expect(input).to.have.attribute('data-sbb-invalid');
    });

    it('renders and emits event when input parameter changes', async () => {
      const datePickerUpdatedSpy = new EventSpy('datePickerUpdated');
      element.wide = true;
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 1);
      expect(datePickerUpdatedSpy.count).to.be.equal(1);
      element.dateFilter = () => false;
      await waitForLitRender(element);
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 2);
      expect(datePickerUpdatedSpy.count).to.be.equal(2);
    });

    it('renders and interprets date with custom parse and format functions', async () => {
      const changeSpy = new EventSpy('change', element);

      element.dateParser = (s) => {
        s = s.replace(/\D/g, ' ').trim();
        const date = s.split(' ');
        const now = new Date(2023, 8, 15, 0, 0, 0, 0);
        return new Date(now.getFullYear(), +date[1] - 1, +date[0]);
      };
      element.format = (d) => {
        //Intl.DateTimeFormat API is not available in test environment.
        const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        const weekday = weekdays[d.getDay()];
        const date = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(
          2,
          '0',
        )}`;
        return `${weekday}, ${date}`;
      };
      await waitForLitRender(element);
      input.focus();
      await sendKeys({ type: '7.8' });
      await sendKeys({ press: 'Enter' });
      await waitForCondition(() => changeSpy.events.length === 1);
      await waitForLitRender(element);
      expect(input.value).to.be.equal('Mo, 07.08');
      expect(changeSpy.count).to.be.equal(1);
    });

    it('should emit validation change event', async () => {
      let validationChangeSpy = new EventSpy('validationChange', element);

      // When entering 99
      input.focus();
      await sendKeys({ type: '20' });
      input.blur();
      await waitForLitRender(element);

      // Then validation event should emit with false
      await waitForCondition(() => validationChangeSpy.events.length === 1);
      expect((validationChangeSpy.lastEvent as CustomEvent).detail['valid']).to.be.equal(false);
      expect(input).to.have.attribute('data-sbb-invalid');

      // When adding valid date
      input.focus();
      await sendKeys({ press: '.' });
      await sendKeys({ press: 'Tab' });

      // Then validation event should not be emitted a second time
      expect(validationChangeSpy.count).to.be.equal(1);
      expect(input).to.have.attribute('data-sbb-invalid');

      // Reset event spy
      validationChangeSpy = new EventSpy('validationChange', element);

      // When adding missing parts of a valid date
      input.focus();
      await sendKeys({ type: '8.23' });
      input.blur();

      // Then validation event should be emitted with true
      await waitForCondition(() => validationChangeSpy.events.length === 1);
      expect((validationChangeSpy.lastEvent as CustomEvent).detail['valid']).to.be.equal(true);
      expect(input).not.to.have.attribute('data-sbb-invalid');
    });

    it('should interpret valid values and set accessibility labels', async function (this: Context) {
      // This test is flaky on Firefox, so we retry a few times.
      this.retries(3);
      const testCases = [
        {
          value: '5.5.0',
          interpretedAs: 'Fr, 05.05.2000',
          accessibilityValue: 'Friday, 05.05.2000',
        },
        {
          value: '8.2.98',
          interpretedAs: 'Su, 08.02.1998',
          accessibilityValue: 'Sunday, 08.02.1998',
        },
        {
          value: '31-12-2020',
          interpretedAs: 'Th, 31.12.2020',
          accessibilityValue: 'Thursday, 31.12.2020',
        },
        {
          value: '5 5 21',
          interpretedAs: 'We, 05.05.2021',
          accessibilityValue: 'Wednesday, 05.05.2021',
        },
        {
          value: '3/7/26',
          interpretedAs: 'Fr, 03.07.2026',
          accessibilityValue: 'Friday, 03.07.2026',
        },
        {
          value: '1.12.2019',
          interpretedAs: 'Su, 01.12.2019',
          accessibilityValue: 'Sunday, 01.12.2019',
        },
        {
          value: '6\\1\\2020',
          interpretedAs: 'Mo, 06.01.2020',
          accessibilityValue: 'Monday, 06.01.2020',
        },
        {
          value: '5,5,2012',
          interpretedAs: 'Sa, 05.05.2012',
          accessibilityValue: 'Saturday, 05.05.2012',
        },
      ];

      for (const testCase of testCases) {
        // Clear input
        input.value = '';

        input.focus();
        await sendKeys({ type: testCase.value });
        input.blur();
        await waitForLitRender(element);

        expect(input.value).to.be.equal(testCase.interpretedAs);
        const paragraphElement = document
          .querySelector<SbbDatepickerElement>('sbb-datepicker')!
          .shadowRoot!.querySelector<HTMLParagraphElement>('p');
        expect(paragraphElement!.innerText).to.be.equal(
          `${i18nDateChangedTo['en']} ${testCase.accessibilityValue}`,
        );
      }
    });

    it('should not touch invalid values', async function (this: Context) {
      // This test is flaky on Firefox, so we retry a few times.
      this.retries(3);
      const testCases = [
        { value: '.12.2020', interpretedAs: '.12.2020' },
        { value: '24..1995', interpretedAs: '24..1995' },
        { value: '24.12.', interpretedAs: '24.12.' },
        { value: '34.06.2020', interpretedAs: '34.06.2020' },
        { value: '24.15.2014', interpretedAs: '24.15.2014' },
        { value: 'invalid', interpretedAs: 'invalid' },
      ];

      for (const testCase of testCases) {
        // Clear input
        input.value = '';

        input.focus();
        await sendKeys({ type: testCase.value });
        await sendKeys({ press: 'Tab' });
        expect(input.value).to.be.equal(testCase.interpretedAs);
        const paragraphElement = document
          .querySelector<SbbDatepickerElement>('sbb-datepicker')!
          .shadowRoot!.querySelector<HTMLParagraphElement>('p');
        expect(paragraphElement!.innerText).to.be.equal('');
      }
    });
  };

  describe('with input', () => {
    const template = html`
      <div>
        <sbb-datepicker input="datepicker-input"></sbb-datepicker>
        <input id="datepicker-input" />
        <button></button>
      </div>
    `;

    it('renders', async () => {
      const page = await fixture(template, { modules: [] });
      assert.instanceOf(page.querySelector('sbb-datepicker'), SbbDatepickerElement);
      expect(document.querySelector('input')).dom.to.be.equal(
        '<input id="datepicker-input" type="text" placeholder="DD.MM.YYYY">',
      );
    });

    commonBehaviorTest(template);
  });

  describe('with form-field', () => {
    const template = html`
      <sbb-form-field>
        <sbb-datepicker></sbb-datepicker>
        <input id="datepicker-input" />
      </sbb-form-field>
      <button></button>
    `;

    it('renders', async () => {
      const page = await fixture(template, { modules: [] });
      assert.instanceOf(page.querySelector('sbb-datepicker'), SbbDatepickerElement);
      expect(document.querySelector('input')).dom.to.be.equal(
        '<input id="datepicker-input" placeholder="DD.MM.YYYY" type="text">',
      );
    });

    commonBehaviorTest(template);
  });
});
