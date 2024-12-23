import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbHeaderElement } from './header.js';
import './header.js';
import '../header-link.js';

describe(`sbb-header`, () => {
  describe('renders', () => {
    let element: SbbHeaderElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-header></sbb-header>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders actions and logo', () => {
    let element: SbbHeaderElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-header>
          <sbb-header-link
            icon-name="hamburger-menu-small"
            href="https://github.com/sbb-design-systems/lyne-components"
            >Menu</sbb-header-link
          >
          <div class="sbb-header-spacer"></div>
          <div class="sbb-header-logo">
            <circle cx="25" cy="75" r="20"></circle>
          </div>
        </sbb-header>
      `);
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
