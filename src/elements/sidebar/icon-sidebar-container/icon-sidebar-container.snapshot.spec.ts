import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbIconSidebarContainerElement } from './icon-sidebar-container.js';
import './icon-sidebar-container.js';

describe(`sbb-icon-sidebar-container`, () => {
  describe('renders', () => {
    let element: SbbIconSidebarContainerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-icon-sidebar-container></sbb-icon-sidebar-container>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
