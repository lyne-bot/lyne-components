import { html, nothing, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';
import type { SbbFlipCardImageAlignment } from '../flip-card-summary.js';

import type { SbbFlipCardElement } from './flip-card.js';

import './flip-card.js';
import '../flip-card-summary.js';
import '../flip-card-details.js';
import '../../chip-label.js';
import '../../image.js';
import '../../link.js';
import '../../title.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');

const content = (
  title: string = 'Summary',
  imageAlignment: SbbFlipCardImageAlignment = 'after',
  longContent: boolean = false,
  imgTemplate?: () => TemplateResult,
): TemplateResult =>
  html`<sbb-flip-card-summary image-alignment=${imageAlignment}>
      <sbb-title level="4">${title}</sbb-title>
      ${imgTemplate
        ? imgTemplate()
        : html`<sbb-image slot="image" image-src=${imageUrl}></sbb-image>`}
    </sbb-flip-card-summary>
    <sbb-flip-card-details>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam luctus ornare condimentum.
      Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis in nibh.
      ${longContent
        ? `Duis dapibus vitae
      tortor ullamcorper maximus. In convallis consectetur felis. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nam luctus ornare condimentum. Vivamus turpis elit, dapibus eget
      fringilla pellentesque, lobortis in nibh. Duis dapibus vitae tortor ullamcorper maximus. In
      convallis consectetur felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
      luctus ornare condimentum. Vivamus turpis elit, dapibus eget fringilla pellentesque, lobortis
      in nibh. Duis dapibus vitae tortor ullamcorper maximus. In convallis consectetur felis.`
        : nothing}
      <sbb-link href="https://www.sbb.ch" negative>Link</sbb-link>
    </sbb-flip-card-details>`;

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

describe(`sbb-flip-card`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const imageAlignment of ['after', 'below']) {
      describe(`image-alignment=${imageAlignment}`, () => {
        for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment)}
                </sbb-flip-card>
              `);

              await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
            }),
          );
        }
      });
    }

    it(
      'flipped',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-flip-card> ${content('Summary', 'after', false)}</sbb-flip-card>`,
        );
        setup.withPostSetupAction(() => {
          const flipCard =
            setup.snapshotElement.querySelector<SbbFlipCardElement>('sbb-flip-card')!;
          flipCard.click();
        });
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'multiline',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-flip-card>
            ${content(
              'This is a very long title that should break into multiple lines',
            )}</sbb-flip-card
          >`,
        );
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    for (const imageAlignment of ['after', 'below']) {
      describe(`imageAlignment=${imageAlignment}`, () => {
        it(
          `grid`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html` <div
                style=${styleMap({
                  display: 'grid',
                  gridTemplateRows: 'minmax(20rem, 1fr)',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gridColumnGap: '1rem',
                  gridRowGap: '1rem',
                })}
              >
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
                </sbb-flip-card>
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
                </sbb-flip-card>
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
                </sbb-flip-card>
                <sbb-flip-card>
                  ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
                </sbb-flip-card>
              </div>`,
            );
            setup.withPostSetupAction(() => {
              const flipCard =
                setup.snapshotElement.querySelector<SbbFlipCardElement>('sbb-flip-card')!;
              flipCard.click();
            });
            await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
          }),
        );

        it(
          `long content`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-flip-card>
                ${content('Summary', imageAlignment as SbbFlipCardImageAlignment, true)}
              </sbb-flip-card>`,
            );
            await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
          }),
        );

        for (const testCase of imgTestCases) {
          it(
            testCase.title,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-flip-card>
                  ${content(
                    'Summary',
                    imageAlignment as SbbFlipCardImageAlignment,
                    false,
                    testCase.imgTemplate,
                  )}
                </sbb-flip-card>`,
              );
              await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
            }),
          );
        }
      });
    }

    describe('forcedColors=true', () => {
      for (const state of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
        it(
          state.name,
          state.with(async (setup) => {
            await setup.withFixture(html`<sbb-flip-card>${content('Summary')}</sbb-flip-card>`, {
              forcedColors: true,
            });

            await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
          }),
        );
      }
    });
  });
});
