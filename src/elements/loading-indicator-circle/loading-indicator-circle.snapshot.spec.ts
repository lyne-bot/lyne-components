import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbLoadingIndicatorCircleElement } from './loading-indicator-circle.js';

import './loading-indicator-circle.js';

describe(`sbb-loading-indicator-circle`, () => {
  let element: SbbLoadingIndicatorCircleElement;

  describe('renders with variant `circle`', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
