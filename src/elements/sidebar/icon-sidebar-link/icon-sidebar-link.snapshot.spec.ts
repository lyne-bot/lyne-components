import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbIconSidebarLinkElement } from './icon-sidebar-link.js';

import './icon-sidebar-link.js';

describe(`sbb-icon-sidebar-link`, () => {
  let element: SbbIconSidebarLinkElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon-sidebar-link
          icon-name="glass-cocktail-small"
          accessibility-label="Go to the party"
          href="https://www.sbb.ch"
        ></sbb-icon-sidebar-link>`,
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
