import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbLoadingIndicatorElement } from './loading-indicator.js';

import './loading-indicator.js';

describe(`sbb-loading-indicator`, () => {
  let element: SbbLoadingIndicatorElement;

  describe('renders with variant `window`', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-loading-indicator></sbb-loading-indicator>`);
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
