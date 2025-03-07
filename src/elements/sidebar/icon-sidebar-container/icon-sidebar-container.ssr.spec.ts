import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbIconSidebarContainerElement } from './icon-sidebar-container.js';

describe(`sbb-icon-sidebar-container ssr`, () => {
  let root: SbbIconSidebarContainerElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-icon-sidebar-container></sbb-icon-sidebar-container>`,
      {
        modules: ['./icon-sidebar-container.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbIconSidebarContainerElement);
  });
});
