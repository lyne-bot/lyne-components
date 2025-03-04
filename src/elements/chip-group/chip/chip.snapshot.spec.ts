import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbChipElement } from './chip.js';
import './chip.js';

describe(`sbb-chip`, () => {
  describe('renders', () => {
    let element: SbbChipElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-chip value="Value"></sbb-chip>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders disabled', () => {
    let element: SbbChipElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-chip value="Value" disabled></sbb-chip>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
