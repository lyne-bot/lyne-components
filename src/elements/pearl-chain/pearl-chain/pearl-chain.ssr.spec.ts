import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPearlChainElement } from './pearl-chain.js';

describe(`sbb-pearl-chain ssr`, () => {
  let root: SbbPearlChainElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-pearl-chain></sbb-pearl-chain>`, {
      modules: ['./pearl-chain.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainElement);
  });
});
