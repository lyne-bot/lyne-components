import { newE2EPage } from '@stencil/core/testing';

describe('sbb-card-badge', () => {
  let element,
    page;

  it('renders', async () => {
    page = await newE2EPage();
    await page.setContent('<sbb-card-badge></sbb-card-badge>');

    element = await page.find('sbb-card-badge');
    expect(element)
      .toHaveClass('hydrated');
  });

});
