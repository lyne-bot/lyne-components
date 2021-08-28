import { newE2EPage } from '@stencil/core/testing';

describe('lyne-accordion-item', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-accordion-item></lyne-accordion-item>');
    element = await page.find('lyne-accordion-item');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-accordion-item></lyne-accordion-item>');

    element = await page.find('lyne-accordion-item');
    expect(element)
      .toHaveClass('hydrated');
  });

});
