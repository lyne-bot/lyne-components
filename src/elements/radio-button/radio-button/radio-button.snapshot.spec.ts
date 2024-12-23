import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbRadioButtonElement } from './radio-button.js';

import './radio-button.js';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button value="radio-value" name="radio"></sbb-radio-button>`,
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

  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" checked></sbb-radio-button>`,
    'renders checked - A11y tree',
  );
  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" disabled></sbb-radio-button>`,
    'renders disabled - A11y tree',
  );
  testA11yTreeSnapshot(
    html`<sbb-radio-button value="radio-value" name="radio" required></sbb-radio-button>`,
    'renders required - A11y tree',
  );
});
