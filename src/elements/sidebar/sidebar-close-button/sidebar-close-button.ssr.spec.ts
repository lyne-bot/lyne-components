import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbSidebarCloseButtonElement } from './sidebar-close-button.js';

describe(`sbb-sidebar-close-button ssr`, () => {
  let root: SbbSidebarCloseButtonElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`, {
      modules: ['./sidebar-close-button.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarCloseButtonElement);
  });
});
