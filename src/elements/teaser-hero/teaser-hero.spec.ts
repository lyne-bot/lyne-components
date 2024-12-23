import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbChipLabelElement } from '../chip-label.js';
import { fixture } from '../core/testing/private.js';
import { waitForLitRender } from '../core/testing.js';

import { SbbTeaserHeroElement } from './teaser-hero.js';
import '../chip-label.js';
import '../image.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-teaser-hero`, () => {
  let element: SbbTeaserHeroElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-teaser-hero href="https://www.sbb.ch"></sbb-teaser-hero>`);

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

  it('styles slotted components', async () => {
    element = await fixture(
      html`<sbb-teaser-hero href="https://www.sbb.ch">
        <figure slot="image" class="sbb-figure">
          <sbb-image image-src=${imageUrl}></sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-start-start">Label</sbb-chip-label>
        </figure>
      </sbb-teaser-hero>`,
    );

    const chip = element.querySelector<SbbChipLabelElement>('sbb-chip-label')!;

    expect(chip).to.have.attribute('color', 'charcoal');
  });
});
