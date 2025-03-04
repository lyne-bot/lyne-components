import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbIconSidebarButtonElement } from './icon-sidebar-button.js';

describe(`sbb-icon-sidebar-button ssr`, () => {
  let root: SbbIconSidebarButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-icon-sidebar-button
        icon-name="glass-cocktail-small"
        aria-label="Go to the party"
      ></sbb-icon-sidebar-button>`,
      {
        modules: ['./icon-sidebar-button.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarButtonElement);
  });
});
