import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbPearlChainElement } from './pearl-chain.js';

describe(`sbb-pearl-chain ssr`, () => {
  let root: SbbPearlChainElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-pearl-chain>
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:00"
          arrival="2022-08-18T04:30"
        ></sbb-pearl-chain-leg>
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:30"
          arrival="2022-08-18T05:00"
        ></sbb-pearl-chain-leg>
      </sbb-pearl-chain>`,
      {
        modules: ['./pearl-chain.js', '../pearl-chain-leg.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbPearlChainElement);
  });
});
