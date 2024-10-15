import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbPearlChainLegElement } from './pearl-chain-leg.js';

describe('sbb-pearl-chain-leg', () => {
  let element: SbbPearlChainLegElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-pearl-chain-leg></sbb-pearl-chain-leg>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPearlChainLegElement);
  });
});
