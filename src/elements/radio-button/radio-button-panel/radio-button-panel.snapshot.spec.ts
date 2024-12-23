import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import { SbbRadioButtonPanelElement } from './radio-button-panel.js';

describe('sbb-radio-button-panel', () => {
  let element: SbbRadioButtonPanelElement;

  describe('renders', async () => {
    beforeEach(async () => {
      element = (await fixture(
        html`<sbb-radio-button-panel name="radio" value="radio-value">
          Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-radio-button-panel>`,
      )) as SbbRadioButtonPanelElement;
      assert.instanceOf(element, SbbRadioButtonPanelElement);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('renders checked', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button-panel name="radio" value="radio-value" checked>
          Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix">Suffix</span>
        </sbb-radio-button-panel>`,
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
    html`<sbb-radio-button-panel name="radio" disabled>Label</sbb-radio-button-panel>`,
    'renders disabled - A11y tree',
  );
  testA11yTreeSnapshot(
    html`<sbb-radio-button-panel
      value="radio-value"
      name="radio"
      required
    ></sbb-radio-button-panel>`,
    'renders required - A11y tree',
  );
});
