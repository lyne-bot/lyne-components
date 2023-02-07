import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import events from './sbb-toggle-option.events';

describe('sbb-toggle-option', () => {
  let element: E2EElement, page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-toggle-option value="Value">Value label</sbb-toggle-option>');

    element = await page.find('sbb-toggle-option');
  });

  it('renders', async () => {
    expect(element).toHaveClass('hydrated');
  });

  it('selects the sbb-toggle-option on click', async () => {
    const didSelect = await page.spyOnEvent(events.didSelect);

    await element.click();
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    expect(didSelect).toHaveReceivedEventTimes(1);
  });

  it('does not deselect sbb-toggle-option if already checked', async () => {
    const didSelect = await page.spyOnEvent(events.didSelect);

    await element.click();
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    expect(didSelect).toHaveReceivedEventTimes(1);

    await element.click();
    await page.waitForChanges();

    expect(element).toHaveAttribute('checked');
    expect(didSelect).toHaveReceivedEventTimes(1);
  });
});
