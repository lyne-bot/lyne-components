import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbDateInputElement } from './date-input.js';

describe(`sbb-date-input ssr`, () => {
  let root: SbbDateInputElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-date-input value="2024-12-11"></sbb-date-input>`, {
      modules: ['./date-input.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbDateInputElement);
  });
});
