import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbSidebarContentElement } from './sidebar-content.js';

describe('sbb-sidebar-content', () => {
  let element: SbbSidebarContentElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-sidebar-content>Some Content</sbb-sidebar-content>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarContentElement);
  });
});
