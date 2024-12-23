import { SbbBreakpointUltraMin } from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing.js';

import '../../button.js';
import '../../card.js';
import '../../chip-label.js';
import '../../image.js';
import '../../title.js';
import './container.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

describe(`sbb-container`, () => {
  const colorCases = ['transparent', 'white', 'milk'];

  const backgroundExpandedCases = [false, true];

  const images = [
    {
      name: 'sbb-image',
      selector: 'sbb-image',
      image: html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`,
    },
    {
      name: 'figure-sbb-image',
      selector: 'sbb-image',
      image: html`<figure slot="image" class="sbb-figure">
        <sbb-image image-src=${imageUrl}></sbb-image>
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
    },
    {
      name: 'img',
      selector: 'img',
      image: html`<img
      slot="image"
      src=${imageBase64}
      alt=''
    ></img>`,
    },
    {
      name: 'figure-img',
      selector: 'img',
      image: html`<figure slot="image" class="sbb-figure">
        <img src=${imageBase64} alt="" />
        <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
      </figure>`,
    },
  ];

  const containerContent = (): TemplateResult => html`
    <sbb-title level="4">Example title</sbb-title>
    <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
    <p class="sbb-text-s">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    <sbb-secondary-button style="margin-block-end: 3rem;">See more</sbb-secondary-button>
  `;

  const backgroundImageContent = html`
    <sbb-title level="2" style="margin-block-start: 0">Container with background image</sbb-title>
    <sbb-card size="xxl">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </sbb-card>
  `;

  const wrapperStyles = { backgroundColor: 'var(--sbb-color-silver)', padding: '0' };

  describeViewports({ viewportHeight: 600 }, () => {
    for (const color of colorCases) {
      it(
        `color=${color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-container color=${color}>${containerContent()}</sbb-container>`,
            wrapperStyles,
          );
        }),
      );
    }

    it(
      `expanded`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-container expanded>${containerContent()}</sbb-container>`,
          wrapperStyles,
        );
      }),
    );

    describe('background-image', () => {
      for (const expanded of [false, true]) {
        describe(`expanded=${expanded}`, () => {
          for (const image of images) {
            it(
              `slotted=${image.name}`,
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`<sbb-container ?expanded=${expanded}>
                    ${backgroundImageContent} ${image.image}
                  </sbb-container>`,
                );

                await waitForImageReady(setup.snapshotElement.querySelector(image.selector)!);
              }),
            );
          }
        });
      }
    });
  });

  describeViewports({ viewports: ['medium'] }, () => {
    it(
      `nested`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`
            <sbb-container color="white">
              ${containerContent()}
              <div style="background-color: var(--sbb-color-milk);">
                <sbb-container color="transparent">${containerContent()}</sbb-container>
              </div>
            </sbb-container>
          `,
          wrapperStyles,
        );
      }),
    );
  });

  // Test very large screens
  for (const backgroundExpanded of backgroundExpandedCases) {
    describe(`viewport=custom_background-expanded=${backgroundExpanded}`, () => {
      const viewport = { width: SbbBreakpointUltraMin + 300, height: 600 };
      const wrapperStyles = { backgroundColor: 'var(--sbb-color-silver)', padding: '0' };

      it(
        ``,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-container ?background-expanded=${backgroundExpanded}>
                ${containerContent()}
              </sbb-container>
            `,
            wrapperStyles,
          );

          await setViewport(viewport);
        }),
      );

      for (const image of images) {
        it(
          `background-image slotted=${image.name}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`
                <sbb-container ?background-expanded=${backgroundExpanded}>
                  ${backgroundImageContent} ${image.image}
                </sbb-container>
              `,
              wrapperStyles,
            );

            await setViewport(viewport);
            await waitForImageReady(setup.snapshotElement.querySelector(image.selector)!);
          }),
        );
      }
    });
  }
});
