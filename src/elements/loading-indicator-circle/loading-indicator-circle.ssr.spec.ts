import { assert } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../core/testing/private.js';

import { SbbLoadingIndicatorCircleElement } from './loading-indicator-circle.js';

describe(`sbb-loading-indicator-circle ssr`, () => {
  let root: SbbLoadingIndicatorCircleElement;

  beforeEach(async () => {
    root = await ssrHydratedFixture(
      html`<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`,
      {
        modules: ['./loading-indicator-circle.js'],
      },
    );
  });

  it('renders', () => {
    assert.instanceOf(root, SbbLoadingIndicatorCircleElement);
  });
});
