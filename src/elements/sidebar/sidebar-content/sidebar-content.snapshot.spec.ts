import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbSidebarContentElement } from './sidebar-content.js';
import './sidebar-content.js';

describe(`sbb-sidebar-content`, () => {
  describe('renders', () => {
    let element: SbbSidebarContentElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-sidebar-content role="main">Some content</sbb-sidebar-content>`,
      );
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
