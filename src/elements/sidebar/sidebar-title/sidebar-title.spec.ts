import { assert, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { SbbSidebarTitleElement } from './sidebar-title.js';

describe('sbb-sidebar-title', () => {
  let element: SbbSidebarTitleElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sidebar-title>Title</sbb-sidebar-title>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarTitleElement);
  });
});
