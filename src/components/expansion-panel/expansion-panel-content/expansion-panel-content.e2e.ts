import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private';

import { SbbExpansionPanelContentElement } from './expansion-panel-content';

describe(`sbb-expansion-panel-content with ${fixture.name}`, () => {
  let element: SbbExpansionPanelContentElement;

  it('renders', async () => {
    element = await fixture(
      html`<sbb-expansion-panel-content>Content</sbb-expansion-panel-content>`,
      { modules: ['./expansion-panel-content.ts'] },
    );
    assert.instanceOf(element, SbbExpansionPanelContentElement);
  });
});
