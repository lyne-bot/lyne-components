import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import './pearl-chain.js';
import type { SbbPearlChainElement } from './pearl-chain.js';

const now = '2022-08-16T15:00:00';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  describe('renders with one leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-leg
            departure="2022-08-18T04:00"
            arrival="2022-08-18T05:00"
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with two legs', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-leg
            departure="2022-08-18T04:00"
            arrival="2022-08-18T05:00"
          ></sbb-pearl-chain-leg>
          <sbb-pearl-chain-leg
            departure="2022-08-18T05:00"
            arrival="2022-08-18T16:00"
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with departure stop skipped', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-leg
            departure="2022-08-18T04:00"
            arrival="2022-08-18T05:00"
          ></sbb-pearl-chain-leg>
          <sbb-pearl-chain-leg
            departure="2022-08-18T05:00"
            arrival="2022-08-18T16:00"
            departure-skipped
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with arrival stop skipped', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain>
          <sbb-pearl-chain-leg
            departure="2022-08-18T04:00"
            arrival="2022-08-18T05:00"
          ></sbb-pearl-chain-leg>
          <sbb-pearl-chain-leg
            departure="2022-08-18T05:00"
            arrival="2022-08-18T16:00"
            arrival-skipped
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with progress leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain .now=${new Date(now)}>
          <sbb-pearl-chain-leg
            departure="2022-08-14T14:00:00"
            arrival="2022-08-17T16:00:00"
          ></sbb-pearl-chain-leg>
          <sbb-pearl-chain-leg
            departure="2022-08-17T18:00:00"
            arrival="2022-08-17T20:00:00"
            departure-skipped
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with cancelled instead of progress leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain .now=${new Date(now)}>
          <sbb-pearl-chain-leg
            departure="2022-08-14T14:00:00"
            arrival="2022-08-17T16:00:00"
            disruption
          ></sbb-pearl-chain-leg>
          <sbb-pearl-chain-leg
            departure="2022-08-17T18:00:00"
            arrival="2022-08-17T20:00:00"
          ></sbb-pearl-chain-leg>
        </sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
