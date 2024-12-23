import type { TemplateResult } from 'lit';
import { html } from 'lit/static-html.js';

import {
  describeViewports,
  loadAssetAsBase64,
  visualDiffDefault,
} from '../core/testing/private.js';
import { waitForImageReady } from '../core/testing.js';

import '../alert.js';
import '../breadcrumb.js';
import '../chip-label.js';
import '../image.js';
import '../link/block-link.js';
import '../link/link.js';
import '../notification.js';
import '../title.js';
import './lead-container.js';

const leadImageUrl = import.meta.resolve('../core/testing/assets/placeholder-image.png');
const leadImageBase64 = await loadAssetAsBase64(leadImageUrl);

describe(`sbb-lead-container`, () => {
  const wrapperStyles = { backgroundColor: `var(--sbb-color-milk)`, padding: '0' };

  const testCases = [
    {
      title: 'with sbb-image',
      imgSelector: 'sbb-image',
      imgTemplate: () => html`<sbb-image slot="image" image-src=${leadImageUrl}></sbb-image>`,
    },
    {
      title: 'with img tag',
      imgSelector: 'img',
      imgTemplate: () => html`<img slot="image" src=${leadImageBase64} alt="" />`,
    },
    {
      title: 'with figure_sbb-image',
      imgSelector: 'sbb-image',
      imgTemplate: () =>
        html`<figure class="sbb-figure" slot="image">
          <sbb-image image-src=${leadImageUrl}></sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
        </figure>`,
    },
    {
      title: 'with figure_img',
      imgSelector: 'img',
      imgTemplate: () =>
        html`<figure class="sbb-figure" slot="image">
          <img slot="image" src=${leadImageBase64} alt="" />
          <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
        </figure>`,
    },
    {
      title: 'with picture_sbb-image',
      imgSelector: 'sbb-image',
      imgTemplate: () =>
        html`<picture class="sbb-figure" slot="image">
          <sbb-image image-src=${leadImageUrl}></sbb-image>
          <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
        </picture>`,
    },
    {
      title: 'with picture_img',
      imgSelector: 'img',
      imgTemplate: () =>
        html`<picture class="sbb-figure" slot="image">
          <img slot="image" src=${leadImageBase64} alt="" />
          <sbb-chip-label class="sbb-figure-overlap-start-end">AI generated</sbb-chip-label>
        </picture>`,
    },
  ];

  const leadContainerTemplate = (image: () => TemplateResult): TemplateResult => html`
    <sbb-lead-container>
      <style>
        p.other-content {
          margin-block: 0;
        }
      </style>
      ${image()}
      <sbb-alert-group class="sbb-lead-container-spacing">
        <sbb-alert title-content="Interruption between Genève and Lausanne" size="m">
          The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
          <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>
      </sbb-alert-group>
      <sbb-breadcrumb-group class="sbb-lead-container-spacing">
        <sbb-breadcrumb href="#" icon-name="house-small" id="breadcrumb-0"></sbb-breadcrumb>
        <sbb-breadcrumb href="#" id="breadcrumb-1">Level 1</sbb-breadcrumb>
      </sbb-breadcrumb-group>
      <sbb-block-link
        icon-placement="start"
        icon-name="chevron-small-left-small"
        size="xs"
        href="https://www.sbb.ch"
        class="sbb-lead-container-spacing"
      >
        Link
      </sbb-block-link>
      <sbb-title class="sbb-lead-container-spacing">Title</sbb-title>
      <p class="sbb-text-xl sbb-lead-container-lead-text">
        Lead text. Lorem ipsum dolor sit amet, adipiscing elit. Integer enim elit, ultricies in
        tincidunt quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit
        risus.
      </p>
      <sbb-notification type="info" class="sbb-lead-container-spacing">
        Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at
        augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac, mollis efficitur
        lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat metus.
      </sbb-notification>
      <p class="sbb-text-m other-content">
        Other content. Vestibulum rutrum elit et lacus sollicitudin, quis malesuada lorem vehicula.
        Suspendisse at augue quis tellus vulputate tempor. Vivamus urna velit, varius nec est ac,
        mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
        metus.
      </p>
    </sbb-lead-container>
  `;

  describeViewports(() => {
    for (const testCase of testCases) {
      it(
        testCase.title,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(leadContainerTemplate(testCase.imgTemplate), wrapperStyles);

          await waitForImageReady(setup.snapshotElement.querySelector(testCase.imgSelector)!);
        }),
      );
    }
  });
});
