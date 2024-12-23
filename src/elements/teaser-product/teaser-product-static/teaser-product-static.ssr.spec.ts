import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTeaserProductStaticElement } from './teaser-product-static.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-product-static ssr`, () => {
  describe('renders', () => {
    let root: SbbTeaserProductStaticElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-teaser-product-static>
            <figure class="sbb-figure" slot="image">
              <sbb-image image-src=${imageUrl}></sbb-image>
            </figure>
            <p class="sbb-teaser-product--spacing">Content</p>
            <p slot="footnote" class="sbb-teaser-product--spacing">Footnote</p>
          </sbb-teaser-product-static>
        `,
        {
          modules: ['./teaser-product-static.js', '../../image.js'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbTeaserProductStaticElement);
    });
  });
});
