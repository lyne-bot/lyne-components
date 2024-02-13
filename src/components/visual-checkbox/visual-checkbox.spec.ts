import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './visual-checkbox';

describe('sbb-visual-checkbox', () => {
  it('renders unchecked', async () => {
    const elem = await fixture(html`<sbb-visual-checkbox></sbb-visual-checkbox>`);
    await expect(elem).shadowDom.to.be.equalSnapshot();
  });

  it('renders checked', async () => {
    const elem = await fixture(html`<sbb-visual-checkbox checked=""></sbb-visual-checkbox>`);
    await expect(elem).shadowDom.to.be.equalSnapshot();
  });

  it('renders indeterminate', async () => {
    const elem = await fixture(html`<sbb-visual-checkbox indeterminate=""></sbb-visual-checkbox>`);
    await expect(elem).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(html`<sbb-visual-checkbox></sbb-visual-checkbox>`);
});
