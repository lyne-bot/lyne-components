import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('sbb-datepicker-previous-day', () => {
  let element: E2EElement, picker: E2EElement, button: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
        <sbb-datepicker value="20-01-2023"></sbb-datepicker>
      </sbb-form-field>
    `);
    element = await page.find('sbb-datepicker-previous-day');
    picker = await page.find('sbb-datepicker');
    button = await page.find('sbb-datepicker-previous-day >>> button');
    await page.waitForChanges();
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('click', async () => {
    expect(await picker.getProperty('value')).toEqual('20.01.2023');

    const changeSpy = await page.spyOnEvent('click');
    await button.click();
    await page.waitForChanges();
    expect(changeSpy).toHaveReceivedEventTimes(1);

    expect(await picker.getProperty('value')).toEqual('19.01.2023');
  });

  it('disabled', async () => {
    page = await newE2EPage();
    await page.setContent(`
      <sbb-form-field>
        <sbb-datepicker value="20-01-2023" min="1674172800"></sbb-datepicker>
        <sbb-datepicker-previous-day></sbb-datepicker-previous-day>
      </sbb-form-field>
    `);
    picker = await page.find('sbb-datepicker');
    button = await page.find('sbb-datepicker-previous-day >>> button');
    await page.waitForChanges();

    expect(await picker.getProperty('value')).toEqual('20.01.2023');
    expect(button).toHaveAttribute('disabled');
    await button.click();
    await page.waitForChanges();
    expect(await picker.getProperty('value')).toEqual('20.01.2023');
  });
});
