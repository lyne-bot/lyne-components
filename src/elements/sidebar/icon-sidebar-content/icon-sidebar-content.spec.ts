import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbIconSidebarContentElement } from './icon-sidebar-content.js';

describe('sbb-icon-sidebar-content', () => {
  let element: SbbIconSidebarContentElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-icon-sidebar-content></sbb-icon-sidebar-content>`);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbIconSidebarContentElement);
  });
});
