import { expect } from '@open-wc/testing';
import { html } from 'lit';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbIconSidebarButtonElement } from './icon-sidebar-button.js';

import './icon-sidebar-button.js';

describe(`sbb-icon-sidebar-button`, () => {
  let element: SbbIconSidebarButtonElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-icon-sidebar-button
          icon-name="glass-cocktail-small"
          aria-label="Go to the party"
        ></sbb-icon-sidebar-button>`,
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
