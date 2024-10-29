import { assert } from '@open-wc/testing';
import { ssrHydratedFixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit';

import { SbbPearlChainLegacyElement } from './pearl-chain-legacy.js';

describe(`sbb-pearl-chain-legacy ssr`, () => {
  let root: SbbPearlChainLegacyElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-pearl-chain-legacy></sbb-pearl-chain-legacy>`, {
      modules: ['./pearl-chain.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainLegacyElement);
  });
});
