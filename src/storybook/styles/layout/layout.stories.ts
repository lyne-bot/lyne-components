import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import '../../../elements/link.js';

import readme from './readme.md?raw';
import './layout.scss';

const PageSpacingTemplate = (): TemplateResult => html`
  <section class="sbb-page-spacing visualized-page-spacing">
    <div>Content</div>
  </section>
`;

const PageSpacingExpandedTemplate = (): TemplateResult => html`
  <section class="sbb-page-spacing-expanded visualized-page-spacing">
    <div>Content</div>
  </section>
`;

const GridContent = (): TemplateResult => html`${repeat(new Array(16), () => html`<div></div>`)}`;

const Warning = (): TemplateResult => html`
  <span class="sbb-text-s">
    This example only intends to visualize the grid and is not meant to be used as is.
    <br />
    <sbb-link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout">
      See docs on CSS grid </sbb-link
    >.
  </span>
`;

const GridTemplate = (): TemplateResult => html`
  <div class="sbb-grid visualized-grid">${GridContent()}</div>
  <p class="sbb-page-spacing">${Warning()}</p>
`;

const GridExpandedTemplate = (): TemplateResult => html`
  <div class="sbb-grid-expanded visualized-grid">${GridContent()}</div>
  <p class="sbb-page-spacing-expanded">${Warning()}</p>
`;

export const PageSpacing: StoryObj = {
  render: PageSpacingTemplate,
};

export const PageSpacingExpanded: StoryObj = {
  render: PageSpacingExpandedTemplate,
};

export const Grid: StoryObj = {
  render: GridTemplate,
};

export const GridExpanded: StoryObj = {
  render: GridExpandedTemplate,
};

const meta: Meta = {
  decorators: [(story) => html`<div style="padding-block: 2rem;">${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'styles/layout',
};

export default meta;
