import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import type { SbbTeaserHeroElement } from './teaser-hero.js';
import './teaser-hero.js';
import '../image.js';
import '../chip-label.js';

const imageUrl = import.meta.resolve('../core/testing/assets/lucerne.png');

describe(`sbb-teaser-hero`, () => {
  let element: SbbTeaserHeroElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-hero accessibility-label="label" href="https://www.sbb.ch">
          Break out and explore castles and palaces.
          <span slot="link-content">Find out more</span>

          <figure slot="image" class="sbb-figure">
            <sbb-image image-src=${imageUrl}></sbb-image>
            <sbb-chip-label class="sbb-figure-overlap-start-start">Label</sbb-chip-label>
          </figure>
        </sbb-teaser-hero>`,
      );
      await waitForImageReady(element.querySelector('sbb-image')!);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['image-src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders with img', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-teaser-hero
          accessibility-label="label"
          href="https://www.sbb.ch"
          rel="external"
          target="_blank"
          link-content="Find out more"
        >
          Break out and explore castles and palaces.

          <figure slot="image" class="sbb-figure">
            <img src=${imageUrl} alt="alt"></img>
            <sbb-chip-label class="sbb-figure-overlap-start-start">Label</sbb-chip-label>
          </figure>
        </sbb-teaser-hero>`,
      );
      await waitForImageReady(element.querySelector('img')!);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot({ ignoreAttributes: ['src'] });
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
