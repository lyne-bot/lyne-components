import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private';

import { SbbPearlChainElement } from './pearl-chain';

describe(`sbb-pearl-chain with ${fixture.name}`, () => {
  let element: SbbPearlChainElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-pearl-chain></sbb-pearl-chain>`, {
      modules: ['./pearl-chain.ts'],
    });
    assert.instanceOf(element, SbbPearlChainElement);
  });
});
