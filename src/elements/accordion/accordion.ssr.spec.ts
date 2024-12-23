import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbAccordionElement } from './accordion.js';

import '../expansion-panel.js';

describe(`sbb-accordion ssr`, () => {
  let root: SbbAccordionElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`
        <sbb-accordion title-level="4">
          <sbb-expansion-panel id="panel-1" title-level="4">
            <sbb-expansion-panel-header id="header-1">Header 1</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 1</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel id="panel-2" title-level="4">
            <sbb-expansion-panel-header id="header-2">Header 2</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 2</sbb-expansion-panel-content>
          </sbb-expansion-panel>
          <sbb-expansion-panel id="panel-3" title-level="4">
            <sbb-expansion-panel-header id="header-3">Header 3</sbb-expansion-panel-header>
            <sbb-expansion-panel-content>Content 3</sbb-expansion-panel-content>
          </sbb-expansion-panel>
        </sbb-accordion>
      `,
      { modules: ['./accordion.js', '../expansion-panel.js'] },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbAccordionElement);
  });
});
