import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-previous-day', () => {
  describe('standalone', () => {
    it('renders', async () => {
      const page: E2EPage = await newE2EPage({
        html: '<sbb-datepicker-previous-day></sbb-datepicker-previous-day>',
      });
      const element: E2EElement = await page.find('sbb-datepicker-previous-day');
      expect(element).toHaveClass('hydrated');
    });
  });

  describe('with picker', () => {
    it('renders and click', async () => {
      const page: E2EPage = await newE2EPage({
        html: `
          <input id="datepicker-input" value="01-01-2023"/>
          <sbb-datepicker-previous-day date-picker='datepicker'></sbb-datepicker-previous-day>
          <sbb-datepicker id='datepicker' input='datepicker-input'></sbb-datepicker>
        `,
      });
      const element: E2EElement = await page.find('sbb-datepicker-previous-day');
      const button: E2EElement = await page.find('sbb-datepicker-previous-day >>> button');
      const input: E2EElement = await page.find('input');
      await page.waitForChanges();
      expect(element).toHaveClass('hydrated');
      expect(await input.getProperty('value')).toEqual('01-01-2023');

      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);

      expect(await input.getProperty('value')).toEqual('31.12.2022');
    });
  });

  describe('in form field', () => {
    let element: E2EElement, input: E2EElement, button: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-form-field>
          <input value="20-01-2023"/>
          <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
          <sbb-datepicker></sbb-datepicker>
        </sbb-form-field>
      `);
      element = await page.find('sbb-datepicker-previous-day');
      input = await page.find('input');
      button = await page.find('sbb-datepicker-previous-day >>> button');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
    });

    it('click', async () => {
      expect(await input.getProperty('value')).toEqual('20-01-2023');
      const changeSpy = await page.spyOnEvent('click');
      await button.click();
      await page.waitForChanges();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(await input.getProperty('value')).toEqual('19.01.2023');
    });

    it('disabled due min equals to value', async () => {
      expect(await input.getProperty('value')).toEqual('20-01-2023');
      const picker = await page.find('sbb-datepicker');
      picker.setAttribute('min', 1674172800);
      await page.waitForChanges();

      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('20-01-2023');
    });

    /** Test skipped due MutationObserver is not working in node test environment. */
    it.skip('disabled due disabled picker', async () => {
      expect(await input.getProperty('value')).toEqual('20-01-2023');
      input.setAttribute('disabled', true);
      await page.waitForChanges();

      expect(button).toHaveAttribute('disabled');
      await button.click();
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('20-01-2023');
    });
  });
});
