import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbChipGroupElement } from './chip-group.js';
import './chip-group.js';
import '../chip.js';
import '../../form-field.js';

describe(`sbb-chip-group`, () => {
  describe('renders', () => {
    let element: SbbChipGroupElement;

    beforeEach(async () => {
      element = await fixture(
        html`<sbb-chip-group>
          <sbb-chip value="Value 1"></sbb-chip>
        </sbb-chip-group>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with form-field', () => {
    let element: SbbChipGroupElement;

    beforeEach(async () => {
      element = await fixture(html`
        <sbb-form-field>
          <label>Field label</label>
          <sbb-chip-group name="field-1">
            <sbb-chip value="Value 1"></sbb-chip>
            <sbb-chip value="Value 2"></sbb-chip>
          </sbb-chip-group>
          <input />
        </sbb-form-field>
      `);
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
