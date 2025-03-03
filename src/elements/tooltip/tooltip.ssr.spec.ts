import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbTooltipElement } from './tooltip.js';

describe(`sbb-tooltip ssr`, () => {
  it('renders', () => {
    let root: SbbTooltipElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(html`<sbb-tooltip>Test</sbb-tooltip>`, {
        modules: ['./tooltip.js'],
      });
    });

    it('renders', () => {
      assert.instanceOf(root, SbbTooltipElement);
    });
  });
});
