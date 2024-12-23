import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../core/images.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';

import type { SbbTeaserElement } from './teaser.js';

import './teaser.js';

describe(`sbb-teaser`, () => {
  let element: SbbTeaserElement;

  describe('renders after centered', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          alignment="after-centered"
          accessibility-label="SBB teaser"
        ></sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders after with title level set', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          alignment="after"
          accessibility-label="SBB teaser"
          title-level="2"
        ></sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });

  describe('renders below with projected content', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser
          href="https://github.com/sbb-design-systems/lyne-components"
          accessibility-label="SBB teaser"
          alignment="below"
        >
          <figure slot="image" class="sbb-figure">
            <img src=${images[0]} alt="400x300" />
          </figure>
          <span slot="chip">Chip</span>
          <span slot="title">TITLE</span>
          description
        </sbb-teaser>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.equalSnapshot();
    });
  });
});
