import { expect } from '@open-wc/testing';
import { fixture, testA11yTreeSnapshot } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import './pearl-chain-leg.js';
import type { SbbPearlChainLegElement } from './pearl-chain-leg.js';

describe(`sbb-pearl-chain-leg`, () => {
  describe('renders', () => {
    let element: SbbPearlChainLegElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-pearl-chain-leg></sbb-pearl-chain-leg>`);
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
