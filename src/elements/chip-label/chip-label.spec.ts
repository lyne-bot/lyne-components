import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbChipLabelElement } from './chip-label.js';

describe(`sbb-chip-label`, () => {
  it('renders', async () => {
    const element: SbbChipLabelElement = await fixture(
      html`<sbb-chip-label>Label</sbb-chip-label>`,
    );
    assert.instanceOf(element, SbbChipLabelElement);
  });
});
