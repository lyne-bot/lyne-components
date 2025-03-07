import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { isFirefox } from '../core/dom.js';
import { fixture, testA11yTreeSnapshot } from '../core/testing/private.js';
import { describeIf } from '../core/testing.js';

import type { SbbDateInputElement } from './date-input.js';
import './date-input.js';

describe(`sbb-date-input`, () => {
  describe('renders', () => {
    let element: SbbDateInputElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-date-input value="2024-12-11"></sbb-date-input>`);
    });

    describeIf(!isFirefox, 'Chrome-Safari', async () => {
      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describeIf(isFirefox, 'Firefox', async () => {
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
