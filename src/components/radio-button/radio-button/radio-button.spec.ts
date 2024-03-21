import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';

import type { SbbRadioButtonElement } from './radio-button';

import './radio-button';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-radio-button value="radio-value"></sbb-radio-button>`);
  });

  it('renders - Dom', async () => {
    await expect(element).dom.to.be.equalSnapshot();
  });

  it('renders - ShadowDom', async () => {
    await expect(element).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot();
});
