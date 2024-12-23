import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbAccentButtonLinkElement } from './accent-button-link.js';

describe(`sbb-accent-button-link ssr`, () => {
  let root: SbbAccentButtonLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-accent-button-link>Button</sbb-accent-button-link>`, {
      modules: ['./accent-button-link.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAccentButtonLinkElement);
  });
});
