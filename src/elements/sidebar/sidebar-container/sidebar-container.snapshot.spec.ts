import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbSidebarContainerElement } from './sidebar-container.js';
import './sidebar-container.js';

describe(`sbb-sidebar-container`, () => {
  describe('renders', () => {
    let element: SbbSidebarContainerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-sidebar-container></sbb-sidebar-container>`);
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
