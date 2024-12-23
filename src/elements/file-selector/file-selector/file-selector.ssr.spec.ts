import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';

import { SbbFileSelectorElement } from './file-selector.js';

describe(`sbb-file-selector ssr`, () => {
  let root: SbbFileSelectorElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(html`<sbb-file-selector></sbb-file-selector>`, {
      modules: ['./file-selector.js'],
    });
  });

  it('renders', () => {
    assert.instanceOf(root, SbbFileSelectorElement);
  });
});
