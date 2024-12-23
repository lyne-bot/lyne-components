import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isSafari } from '../../core/dom.js';
import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import { describeIf } from '../../core/testing.js';

import type { SbbPaginatorElement } from './paginator.js';

import './paginator.js';

describe(`sbb-paginator`, () => {
  describe('renders', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-paginator length="4" page-size="4"></sbb-paginator>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders ellipsis on end side', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-paginator length="50" page-size="4"></sbb-paginator>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders ellipsis on start side', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-paginator length="50" page-size="4" page-index="10"></sbb-paginator>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders ellipsis on both side', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-paginator length="50" page-size="4" page-index="7"></sbb-paginator>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with options', () => {
    let element: SbbPaginatorElement;

    beforeEach(async () => {
      const opt = [10, 25, 50];
      element = await fixture(
        html`<sbb-paginator length="50" page-size="10" .pageSizeOptions=${opt}></sbb-paginator>`,
      );
    });

    describeIf(!isSafari, 'Chrome-Firefox', async () => {
      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isSafari, 'Safari', async () => {
      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    testA11yTreeSnapshot();
  });
});
