import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbChipLabelElement } from './chip-label.js';

import './chip-label.js';

describe(`sbb-chip-label`, () => {
  let element: SbbChipLabelElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-chip-label>Label</sbb-chip-label>`);
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
