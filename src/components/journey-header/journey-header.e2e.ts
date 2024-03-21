import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbJourneyHeaderElement } from './journey-header';

describe(`sbb-journey-header with ${fixture.name}`, () => {
  let element: SbbJourneyHeaderElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-journey-header></sbb-journey-header>`, {
      modules: ['./journey-header.ts'],
    });
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbJourneyHeaderElement);
  });
});
