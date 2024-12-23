import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';

import { SbbLoadingIndicatorCircleElement } from './loading-indicator-circle.js';

describe(`sbb-loading-indicator-circle`, () => {
  let element: SbbLoadingIndicatorCircleElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-loading-indicator-circle></sbb-loading-indicator-circle>`);
    assert.instanceOf(element, SbbLoadingIndicatorCircleElement);
  });
});
