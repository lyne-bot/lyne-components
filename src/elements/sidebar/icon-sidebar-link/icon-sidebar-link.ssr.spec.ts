import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbIconSidebarLinkElement } from './icon-sidebar-link.js';

describe(`sbb-icon-sidebar-link ssr`, () => {
  let root: SbbIconSidebarLinkElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-icon-sidebar-link
        icon-name="glass-cocktail-small"
        href="#"
        accessibility-label="Go to the party"
      ></sbb-icon-sidebar-link>`,
      {
        modules: ['./icon-sidebar-link.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarLinkElement);
  });
});
