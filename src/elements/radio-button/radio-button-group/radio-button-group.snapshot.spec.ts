import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbRadioButtonGroupElement } from './radio-button-group.js';

import './radio-button-group.js';
import '../radio-button.js';

describe(`sbb-radio-button-group`, () => {
  let element: SbbRadioButtonGroupElement;

  describe('renders', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button-group name="group-1" value="2">
          <sbb-radio-button value="1">1</sbb-radio-button>
          <sbb-radio-button value="2">2</sbb-radio-button>
          <sbb-radio-button value="3">3</sbb-radio-button>
        </sbb-radio-button-group>`,
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
