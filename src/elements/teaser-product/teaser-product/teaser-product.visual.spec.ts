import { html, nothing, type TemplateResult } from 'lit';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';
import { waitForImageReady } from '../../core/testing/wait-for-image-ready.js';

import './teaser-product.js';
import '../../button/button-static.js';
import '../../chip-label.js';
import '../../image.js';
import '../../title.js';

const imageUrl = import.meta.resolve('../../core/testing/assets/placeholder-image.png');
const imageBase64 = await loadAssetAsBase64(imageUrl);

const content = (longContent = false): TemplateResult => html`
  <sbb-title level="3" class="sbb-teaser-product--spacing">
    Benefit from up to 70% discount
  </sbb-title>
  <p class="sbb-teaser-product--spacing">
    ${new Array(longContent ? 6 : 1)
      .fill('')
      .map(
        () =>
          html`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
          amet felis viverra lacinia.`,
      )}
  </p>
  <sbb-button-static class="sbb-teaser-product--spacing">Label</sbb-button-static>
`;

const footer = (): TemplateResult => html`
  <p slot="footnote" class="sbb-teaser-product--spacing">
    Footnote Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium felis sit
    amet felis viverra lacinia.
  </p>
`;

const template = ({
  negative,
  imageAlignment,
  showFooter,
  slottedImg,
  longContent,
}: {
  negative?: boolean;
  imageAlignment?: string;
  showFooter?: boolean;
  slottedImg?: boolean;
  longContent?: boolean;
} = {}): TemplateResult => html`
  <sbb-teaser-product ?negative=${negative} image-alignment=${imageAlignment || nothing} href="#">
    ${slottedImg
      ? html`<img slot="image" src=${imageBase64} alt="" />`
      : html`<sbb-image slot="image" image-src=${imageUrl} skip-lqip></sbb-image>`}
    ${content(longContent)} ${showFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

const withChipTemplate = ({
  negative,
  imageAlignment,
  showFooter,
  slottedImg,
  longContent,
}: {
  negative?: boolean;
  imageAlignment?: string;
  showFooter?: boolean;
  slottedImg?: boolean;
  longContent?: boolean;
} = {}): TemplateResult => html`
  <sbb-teaser-product ?negative=${negative} image-alignment=${imageAlignment || nothing} href="#">
    <figure class="sbb-figure" slot="image">
      ${slottedImg
        ? html`<img src=${imageBase64} alt="" />`
        : html`<sbb-image image-src=${imageUrl} skip-lqip></sbb-image>`}
      <sbb-chip-label
        class=${imageAlignment === 'after'
          ? 'sbb-figure-overlap-start-end'
          : 'sbb-figure-overlap-start-start'}
        >Label</sbb-chip-label
      >
    </figure>
    ${content(longContent)} ${showFooter ? footer() : nothing}
  </sbb-teaser-product>
`;

describe('sbb-teaser-product', () => {
  describeViewports({ viewports: ['zero', 'medium', 'large'] }, () => {
    for (const slottedImg of [false, true]) {
      describe(`slottedImg=${slottedImg}`, () => {
        for (const negative of [false, true]) {
          describe(`negative=${negative}`, () => {
            for (const visualState of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
              it(
                visualState.name,
                visualState.with(async (setup) => {
                  await setup.withFixture(template({ negative, showFooter: true, slottedImg }), {
                    backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                  });
                  await waitForImageReady(
                    setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
                  );
                }),
              );

              it(
                `withChip_${visualState.name}`,
                visualState.with(async (setup) => {
                  await setup.withFixture(
                    withChipTemplate({ negative, showFooter: true, slottedImg }),
                    {
                      backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
                    },
                  );
                  await waitForImageReady(
                    setup.snapshotElement.querySelector(slottedImg ? 'img' : 'sbb-image')!,
                  );
                }),
              );
            }
          });
        }
      });
    }

    it(
      `imageAlignment=before`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ imageAlignment: 'before', showFooter: true }));
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'no footer',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template());
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    it(
      'long content',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(template({ longContent: true, showFooter: true }));
        await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
      }),
    );

    describe('forcedColors=true', () => {
      for (const visualState of [visualDiffDefault, visualDiffHover, visualDiffFocus]) {
        it(
          visualState.name,
          visualState.with(async (setup) => {
            await setup.withFixture(template({ showFooter: true }), { forcedColors: true });
            await waitForImageReady(setup.snapshotElement.querySelector('sbb-image')!);
          }),
        );
      }
    });
  });
});
