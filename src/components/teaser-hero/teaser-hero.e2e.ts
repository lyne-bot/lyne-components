import { assert, expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import images from '../core/images';
import { waitForLitRender } from '../core/testing';

import { SbbTeaserHeroElement } from './teaser-hero';
import '.';

describe('sbb-teaser-hero', () => {
  let element: SbbTeaserHeroElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch" image-src="${images[0]}"></sbb-teaser-hero>`,
    );
    assert.instanceOf(element, SbbTeaserHeroElement);
  });

  it('should receive focus', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="link" id="focus-id">Hero content</sbb-teaser-hero>`,
    );

    element.focus();
    await waitForLitRender(element);

    expect(document.activeElement!.id).to.be.equal('focus-id');
  });
});
