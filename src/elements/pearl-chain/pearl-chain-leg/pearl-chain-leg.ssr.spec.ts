import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPearlChainLegElement } from './pearl-chain-leg.js';

describe(`sbb-pearl-chain-leg ssr`, () => {
  let root: SbbPearlChainLegElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-pearl-chain-leg></sbb-pearl-chain-leg>`, {
      modules: ['./pearl-chain-leg.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainLegElement);
  });
});
