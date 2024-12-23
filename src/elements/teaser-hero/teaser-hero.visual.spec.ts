import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';
import './teaser-hero.js';
import '../image.js';
import '../chip-label.js';

const imageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');

const imgTestCases = [
  {
    title: 'with sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () => html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
  },
  {
    title: 'with img tag',
    imgSelector: 'img',
    imgTemplate: () => html`<img slot="image" src=${imageUrl} alt="" />`,
  },
  {
    title: 'with figure_sbb-image',
    imgSelector: 'sbb-image',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <sbb-image image-src=${imageUrl}></sbb-image>
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
  {
    title: 'with figure_img',
    imgSelector: 'img',
    imgTemplate: () =>
      html`<figure class="sbb-figure" slot="image">
        <img slot="image" src=${imageUrl} alt="" />
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
  },
];

describe(`sbb-teaser-hero`, () => {
  describeViewports({ viewports: ['zero', 'micro', 'small', 'medium', 'wide'] }, () => {
    for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
      for (const testCase of imgTestCases) {
        it(
          `${testCase.title} ${state.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-teaser-hero href="#" link-content="Find out more">
                Break out and explore castles and palaces. ${testCase.imgTemplate()}
              </sbb-teaser-hero>
            `);

            await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
          }),
        );
      }

      it(
        `without content ${state.name}`,
        state.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#">
              <sbb-image slot="image" image-src=${imageUrl}></sbb-image>
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
        }),
      );
    }
  });

  describeViewports({ viewports: ['large'] }, () => {
    for (const testCase of imgTestCases) {
      it(
        `custom width ${testCase.title}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-teaser-hero href="#" link-content="Find out more" style="width: 700px">
              Break out and explore castles and palaces. ${testCase.imgTemplate()}
            </sbb-teaser-hero>
          `);

          await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
        }),
      );
    }
  });
});
