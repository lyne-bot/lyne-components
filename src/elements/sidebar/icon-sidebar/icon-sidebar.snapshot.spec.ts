import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbIconSidebarElement } from './icon-sidebar.js';

import './icon-sidebar.js';

describe(`sbb-icon-sidebar`, () => {
  describe('renders', () => {
    let element: SbbIconSidebarElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-icon-sidebar></sbb-icon-sidebar>`);
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
