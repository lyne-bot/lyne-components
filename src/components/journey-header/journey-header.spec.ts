import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { waitForLitRender } from '../core/testing';
import { testA11yTreeSnapshot } from '../core/testing/a11y-tree-snapshot';

import './journey-header';

describe('sbb-journey-header', () => {
  it('renders', async () => {
    const root = await fixture(
      html`<sbb-journey-header origin="A" destination="B"></sbb-journey-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-header origin="A" destination="B" size="m">
      </sbb-journey-header>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  it('renders H1 L-sized round-trip negative', async () => {
    const root = await fixture(
      html`<sbb-journey-header
        level="1"
        size="l"
        round-trip
        origin="B"
        destination="C"
        negative
      ></sbb-journey-header>`,
    );

    await waitForLitRender(root);

    expect(root).dom.to.be.equal(`
      <sbb-journey-header level="1" size="l" round-trip="" origin="B" destination="C" negative>
      </sbb-journey-header>
    `);
    await expect(root).shadowDom.to.be.equalSnapshot();
  });

  testA11yTreeSnapshot(
    html`<sbb-journey-header
      level="1"
      size="l"
      round-trip
      origin="B"
      destination="C"
      negative
    ></sbb-journey-header>`,
  );
});
