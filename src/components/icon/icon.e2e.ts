import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbIconElement } from './icon';

describe(`sbb-icon with ${fixture.name}`, () => {
  let element: SbbIconElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-icon></sbb-icon>`, { modules: ['./icon.ts'] });

    assert.instanceOf(element, SbbIconElement);
  });
});
