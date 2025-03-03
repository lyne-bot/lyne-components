import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTooltipElement } from './tooltip.js';
import './tooltip.js';

describe(`sbb-tooltip`, () => {
  it('renders', () => {
    let element: SbbTooltipElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-tooltip>Test</sbb-tooltip>`);
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
