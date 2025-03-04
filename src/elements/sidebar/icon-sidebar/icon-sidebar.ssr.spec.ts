import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbIconSidebarElement } from './icon-sidebar.js';

describe(`sbb-icon-sidebar ssr`, () => {
  let root: SbbIconSidebarElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-icon-sidebar></sbb-icon-sidebar>`, {
      modules: ['./icon-sidebar.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarElement);
  });
});
