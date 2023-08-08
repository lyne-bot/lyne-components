import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { waitForCondition } from '../../global/testing';

describe('sbb-datepicker', () => {
  it('renders', async () => {
    const page: E2EPage = await newE2EPage({ html: '<sbb-datepicker></sbb-datepicker>' });
    const element: E2EElement = await page.find('sbb-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  it('renders and formats date', async () => {
    const page: E2EPage = await newE2EPage({
      html: `
        <input id="datepicker-input" value="01-01-2023"/>
        <sbb-datepicker id='datepicker' input='datepicker-input'></sbb-datepicker>
      `,
    });

    const input: E2EElement = await page.find('input');

    expect(await input.getProperty('value')).toEqual('Su, 01.01.2023');
  });

  it('renders and interprets iso string date', async () => {
    const page: E2EPage = await newE2EPage({
      html: `
        <input id="datepicker-input" value="2021-12-20"/>
        <sbb-datepicker id='datepicker' input='datepicker-input'></sbb-datepicker>
      `,
    });

    const input: E2EElement = await page.find('input');

    expect(await input.getProperty('value')).toEqual('Mo, 20.12.2021');
  });

  it('renders and interprets timestamp', async () => {
    const page: E2EPage = await newE2EPage({
      html: `
        <input id="datepicker-input" value="1594512000000"/>
        <sbb-datepicker id='datepicker' input='datepicker-input'></sbb-datepicker>
      `,
    });

    const input: E2EElement = await page.find('input');

    expect(await input.getProperty('value')).toEqual('Su, 12.07.2020');
  });

  const commonBehaviorTest: (template: string) => void = (template: string) => {
    let element: E2EElement, input: E2EElement, button: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(template);
      element = await page.find('sbb-datepicker');
      input = await page.find('input');
      button = await page.find('button');
      await page.waitForChanges();
    });

    it('renders and emit event on value change', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20/01/2023');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(await input.getProperty('value')).toEqual('Fr, 20.01.2023');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and interpret two digit year correctly in 2000s', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20/01/12');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(await input.getProperty('value')).toEqual('Fr, 20.01.2012');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and interpret two digit year correctly in 1900s', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20/01/99');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(await input.getProperty('value')).toEqual('We, 20.01.1999');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and detects missing month error', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20..2012');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).toHaveAttribute('data-sbb-invalid');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and detects missing year error', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20.05.');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).toHaveAttribute('data-sbb-invalid');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and detects invalid month error', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20.00.2012');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).toHaveAttribute('data-sbb-invalid');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders and detects invalid day error', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('00.05.2020');
      await button.focus();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(input).toHaveAttribute('data-sbb-invalid');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders with errors when typing letters', async () => {
      expect(await input.getProperty('value')).toEqual('');
      await input.focus();
      await input.type('invalid');
      await input.press('Enter');
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('invalid');
      expect(input).toHaveAttribute('data-sbb-invalid');
    });

    it('renders and emits event when input parameter changes', async () => {
      const datePickerUpdatedSpy = await page.spyOnEvent('datePickerUpdated');
      const picker = await page.find('sbb-datepicker');
      picker.setProperty('wide', true);
      await page.waitForChanges();
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 1);
      expect(datePickerUpdatedSpy).toHaveReceivedEventTimes(1);
      picker.setProperty('dateFilter', () => null);
      await page.waitForChanges();
      await waitForCondition(() => datePickerUpdatedSpy.events.length === 2);
      expect(datePickerUpdatedSpy).toHaveReceivedEventTimes(2);
    });

    it('renders and interprets date with custom parse and format functions', async () => {
      const changeSpy = await element.spyOnEvent('change');

      await page.evaluate(() => {
        const localDatepicker = document.querySelector('sbb-datepicker');
        localDatepicker.dateParser = (s) => {
          s = s.replace(/\D/g, ' ').trim();
          const date = s.split(' ');
          return new Date(new Date().getFullYear(), +date[1] - 1, +date[0]);
        };
        localDatepicker.format = (d) => {
          //Intl.DateTimeFormat API is not available in test environment.
          const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
          const weekday = weekdays[d.getDay()];
          const date = `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(
            2,
            '0',
          )}`;
          return `${weekday}, ${date}`;
        };
      });

      await page.waitForChanges();
      await input.type('7.8');
      await input.press('Enter');
      await waitForCondition(() => changeSpy.events.length === 1);
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('Mo, 07.08');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit validation change event', async () => {
      let validationChangeSpy = await element.spyOnEvent('validationChange');

      // When entering 99
      await input.focus();
      await input.type('20');
      await input.press('Tab');

      // Then validation event should emit with false
      expect(validationChangeSpy).toHaveFirstReceivedEventDetail({ valid: false });
      expect(input).toHaveAttribute('data-sbb-invalid');

      // When adding valid date
      await input.focus();
      await input.press('.');
      await input.press('Tab');

      // Then validation event should not be emitted a second time
      expect(validationChangeSpy).toHaveReceivedEventTimes(1);
      expect(input).toHaveAttribute('data-sbb-invalid');

      // Reset event spy
      validationChangeSpy = await element.spyOnEvent('validationChange');

      // When adding missing parts of a valid date
      await input.focus();
      await input.type('8.23');
      await input.press('Tab');

      // Then validation event should be emitted with true
      expect(validationChangeSpy).toHaveFirstReceivedEventDetail({ valid: true });
      expect(input).not.toHaveAttribute('data-sbb-invalid');
    });
  };

  describe('with input', () => {
    const template = `
      <sbb-datepicker input="id"></sbb-datepicker>
      <input id="id"/>
      <button></button>
    `;

    it('renders', async () => {
      const page: E2EPage = await newE2EPage();
      await page.setContent(template);
      expect(await page.find('sbb-datepicker')).toHaveClass('hydrated');
      expect(await page.find('input')).toEqualHtml(
        '<input id="id" placeholder="DD.MM.YYYY" type="text">',
      );
    });

    commonBehaviorTest(template);
  });

  describe('with form-field', () => {
    const template = `
      <sbb-form-field>
        <sbb-datepicker></sbb-datepicker>
        <input/>
      </sbb-form-field>
      <button></button>
    `;

    it('renders', async () => {
      const page: E2EPage = await newE2EPage();
      await page.setContent(template);
      expect(await page.find('sbb-datepicker')).toHaveClass('hydrated');
      expect(await page.find('input')).toEqualHtml(
        '<input placeholder="DD.MM.YYYY" type="text">',
      );
    });

    commonBehaviorTest(template);
  });
});
