import { assert } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import { SbbPearlChainLegacyElement } from './pearl-chain-legacy.js';

describe(`sbb-pearl-chain-legacy`, () => {
  let element: SbbPearlChainLegacyElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain-legacy></sbb-pearl-chain-legacy>`);
    assert.instanceOf(element, SbbPearlChainLegacyElement);
  });
});
