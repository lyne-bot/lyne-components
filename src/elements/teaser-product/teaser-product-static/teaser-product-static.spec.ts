import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTeaserProductStaticElement } from './teaser-product-static.js';

import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-teaser-product-static', () => {
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

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserProductStaticElement);
  });
});
