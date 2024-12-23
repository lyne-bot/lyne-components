import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbAccentButtonStaticElement } from './accent-button-static.js';

describe(`sbb-accent-button-static ssr`, () => {
  let root: SbbAccentButtonStaticElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-accent-button-static>Button</sbb-accent-button-static>`,
      {
        modules: ['./accent-button-static.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAccentButtonStaticElement);
  });
});
