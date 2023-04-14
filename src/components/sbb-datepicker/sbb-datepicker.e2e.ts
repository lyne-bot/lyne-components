import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker', () => {
  it('renders', async () => {
    const page: E2EPage = await newE2EPage({ html: '<sbb-datepicker></sbb-datepicker>' });
    const element: E2EElement = await page.find('sbb-datepicker');
    expect(element).toHaveClass('hydrated');
  });

  describe('with input', () => {
    let element: E2EElement, input: E2EElement, button: E2EElement, page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
        <sbb-datepicker input="id"></sbb-datepicker>
        <input id="id"/>
        <button></button>
      `);
      element = await page.find('sbb-datepicker');
      input = await page.find('input');
      button = await page.find('button');
      await page.waitForChanges();
    });

    it('renders', async () => {
      expect(element).toHaveClass('hydrated');
      expect(input).toEqualHtml('<input id="id" placeholder="DD.MM.YYYY" type="text">');
    });

    it('renders and emit event on value change', async () => {
      const changeSpy = await element.spyOnEvent('change');
      await input.type('20/01/2023');
      await button.focus();
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('20.01.2023');
      expect(changeSpy).toHaveReceivedEventTimes(1);
    });

    it('renders with no changes when typing letters', async () => {
      expect(await input.getProperty('value')).toEqual('');
      await input.focus();
      await input.type('invalid');
      await page.waitForChanges();
      expect(await input.getProperty('value')).toEqual('');
    });

    it('renders and emits event when input parameter changes', async () => {
      const datePickerUpdatedSpy = await page.spyOnEvent('datePickerUpdated');
      const picker = await page.find('sbb-datepicker');
      picker.setProperty('wide', true);
      await page.waitForChanges();
      expect(datePickerUpdatedSpy).toHaveReceivedEventTimes(1);
      picker.setProperty('dateFilter', () => null);
      await page.waitForChanges();
      expect(datePickerUpdatedSpy).toHaveReceivedEventTimes(2);
    });
  });
});
