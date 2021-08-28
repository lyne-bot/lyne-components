import { newE2EPage } from '@stencil/core/testing';

describe('lyne-accordion', () => {
  let element,
    page;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-accordion></lyne-accordion>');
    element = await page.find('lyne-accordion');
  });

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<lyne-accordion></lyne-accordion>');

    element = await page.find('lyne-accordion');
    expect(element)
      .toHaveClass('hydrated');
  });

});
