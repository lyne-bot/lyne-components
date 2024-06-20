import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbDividerElement } from './divider.js';
import './divider.js';

describe(`sbb-divider`, () => {
  describe('should render with default values', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('should render with orientation horizontal', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider orientation="horizontal"></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render with orientation vertical', () => {
    let element: SbbDividerElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-divider orientation="vertical"></sbb-divider>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
