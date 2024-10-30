import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbPearlChainElement } from './pearl-chain.js';

import '../pearl-chain-leg.js';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-pearl-chain departure="2022-08-18T04:00" arrival="2022-08-18T05:00">
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:00"
          arrival="2022-08-18T04:40"
        ></sbb-pearl-chain-leg>
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:40"
          arrival="2022-08-18T05:00"
        ></sbb-pearl-chain-leg>
      </sbb-pearl-chain>`,
    );

    assert.instanceOf(element, SbbPearlChainElement);
  });
});
