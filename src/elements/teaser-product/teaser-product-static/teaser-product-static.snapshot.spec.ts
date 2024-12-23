import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTeaserProductStaticElement } from './teaser-product-static.js';
import './teaser-product-static.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-product-static`, () => {
  describe('renders', () => {
    let element: SbbTeaserProductStaticElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-teaser-product-static>
          <figure class="sbb-figure" slot="image">
            <sbb-image image-src=${imageUrl}></sbb-image>
          </figure>
          <p class="sbb-teaser-product--spacing">Content</p>
          <p slot="footnote" class="sbb-teaser-product--spacing">Footnote</p>
        </sbb-teaser-product-static>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
