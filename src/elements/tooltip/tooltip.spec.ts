import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbTooltipElement } from './tooltip.js';

describe('sbb-tooltip', () => {
  let element: SbbTooltipElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-tooltip>Test</sbb-tooltip>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTooltipElement);
  });
});
