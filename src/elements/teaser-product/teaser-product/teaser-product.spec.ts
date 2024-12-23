import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';

import { SbbTeaserProductElement } from './teaser-product.js';
import '../../image.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

describe('sbb-teaser-product', () => {
  let element: SbbTeaserProductElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-teaser-product href="#">
        <figure class="sbb-figure" slot="image">
          <sbb-image image-src=${imageUrl}></sbb-image>
        </figure>
        <p class="sbb-teaser-product--spacing">Content</p>
        <p slot="footnote" class="sbb-teaser-product--spacing">Footnote</p>
      </sbb-teaser-product>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTeaserProductElement);
  });

  it('should receive focus', async () => {
    element.focus();
    expect(document.activeElement!.localName).to.be.equal('sbb-teaser-product');
  });
});
