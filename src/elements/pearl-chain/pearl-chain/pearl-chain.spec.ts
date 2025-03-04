import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing/wait-for-render.js';

import { SbbPearlChainElement } from './pearl-chain.js';

import '../pearl-chain-leg.js';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  beforeEach(async () => {
    element = await fixture(
      html` <sbb-pearl-chain>
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:00"
          arrival="2022-08-18T04:30"
        ></sbb-pearl-chain-leg>
        <sbb-pearl-chain-leg
          departure="2022-08-18T04:30"
          arrival="2022-08-18T05:00"
        ></sbb-pearl-chain-leg>
      </sbb-pearl-chain>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbPearlChainElement);
  });

  it('weights legs properly', async () => {
    const legs = Array.from(element.querySelectorAll('sbb-pearl-chain-leg'));

    expect(legs[0].style.getPropertyValue('--sbb-pearl-chain-leg-weight')).to.be.equal('0.5');
    expect(legs[1].style.getPropertyValue('--sbb-pearl-chain-leg-weight')).to.be.equal('0.5');

    legs[0].departure = '2022-08-18T03:00';
    await waitForLitRender(element);

    expect(legs[0].style.getPropertyValue('--sbb-pearl-chain-leg-weight')).to.be.equal('0.75');
    expect(legs[1].style.getPropertyValue('--sbb-pearl-chain-leg-weight')).to.be.equal('0.25');
  });

  it('places cursor correctly', async () => {
    const legs = Array.from(element.querySelectorAll('sbb-pearl-chain-leg'));

    expect(legs[0]).not.to.have.attribute('data-progress');
    expect(legs[1]).not.to.have.attribute('data-progress');

    element.now = '2022-08-18T04:15';
    await waitForLitRender(element);

    expect(legs[0]).to.have.attribute('data-progress');
    expect(legs[1]).not.to.have.attribute('data-progress');
    expect(legs[0].style.getPropertyValue('--sbb-pearl-chain-status-position')).to.be.equal('0.5');
  });
});
