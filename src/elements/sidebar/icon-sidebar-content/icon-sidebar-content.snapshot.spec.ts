import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbIconSidebarContentElement } from './icon-sidebar-content.js';

import './icon-sidebar-content.js';

describe(`sbb-icon-sidebar-content`, () => {
  describe('renders', () => {
    let element: SbbIconSidebarContentElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon-sidebar-content role="main"></sbb-icon-sidebar-content>`,
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
