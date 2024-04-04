import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../core/testing/private';

import './dialog';

describe(`sbb-dialog`, () => {
  it('renders', async () => {
    const root = await fixture(html`<sbb-dialog></sbb-dialog>`);

    expect(root).dom.to.be.equal(`<sbb-dialog data-state="closed"></sbb-dialog>`);
    expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-dialog></sbb-dialog>`);
});
