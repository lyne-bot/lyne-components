import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbCompactPaginatorElement } from './compact-paginator.js';
import './compact-paginator.js';

describe(`sbb-compact-paginator`, () => {
  describe('renders', () => {
    let element: SbbCompactPaginatorElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-compact-paginator length="50" page-size="5"></sbb-compact-paginator>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
