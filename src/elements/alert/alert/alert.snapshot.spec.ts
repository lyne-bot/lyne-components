import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbAlertElement } from './alert.js';

import './alert.js';
import '../../link/link.js';

describe(`sbb-alert`, () => {
  let element: SbbAlertElement;

  describe('should render default properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert title-content="Interruption">Alert content</sbb-alert>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render customized properties', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-alert
          title-content="Interruption"
          title-level="2"
          size="l"
          icon-name="disruption"
        >
          Alert content <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
        </sbb-alert>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  testA11yTreeSnapshot(html`
    <sbb-alert title-content="Interruption">
      Alert content
      <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
    </sbb-alert>
  `);
});
