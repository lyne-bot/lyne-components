import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbAlertGroupElement } from './alert-group.js';

import './alert-group.js';
import '../alert.js';

describe(`sbb-alert-group`, () => {
  describe('renders', () => {
    let root: SbbAlertGroupElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-alert-group accessibility-title="Disruptions" accessibility-title-level="3">
          <sbb-alert title-content="Interruption between Genève and Lausanne">
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with slotted', () => {
    let root: SbbAlertGroupElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-alert-group accessibility-title-level="3">
          <span slot="accessibility-title">Interruptions</span>
          <sbb-alert title-content="Interruption between Genève and Lausanne" data-state="opening">
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          </sbb-alert>
        </sbb-alert-group>
      `);
    });

    it('DOM', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });
  });
});
