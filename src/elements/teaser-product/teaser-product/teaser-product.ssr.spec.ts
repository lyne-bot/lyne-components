import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbTeaserProductElement } from './teaser-product.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe(`sbb-teaser-product ssr`, () => {
  describe('renders', () => {
    let root: SbbTeaserProductElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-teaser-product>
            <figure class="sbb-figure" slot="image">
              <sbb-image image-src=${imageUrl}></sbb-image>
            </figure>
            <p class="sbb-teaser-product--spacing">Content</p>
            <p slot="footnote" class="sbb-teaser-product--spacing">Footnote</p>
          </sbb-teaser-product>
        `,
        {
          modules: ['./teaser-product.js', '../../image.js'],
        },
      );
    });

    it('renders', () => {
      assert.instanceOf(root, SbbTeaserProductElement);
    });
  });
});
