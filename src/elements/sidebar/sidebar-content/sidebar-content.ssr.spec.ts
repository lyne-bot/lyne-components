import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbSidebarContentElement } from './sidebar-content.js';

describe(`sbb-sidebar-content ssr`, () => {
  let root: SbbSidebarContentElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-sidebar-content>Some Content</sbb-sidebar-content>`, {
      modules: ['./sidebar-content.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbSidebarContentElement);
  });
});
