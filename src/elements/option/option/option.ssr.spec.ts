import { assert, expect } from '@open-wc/testing';
import { html } from 'lit';

import { ssrHydratedFixture } from '../../core/testing/private.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbSelectElement } from '../../select.js';

import { SbbOptionElement } from './option.js';

import '../../autocomplete.js';
import '../../select.js';

describe(`sbb-option ssr`, () => {
  describe('standalone', () => {
    let root: SbbFormFieldElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(html`<sbb-option value="Option A">Option A</sbb-option>`, {
        modules: ['./option.js'],
      });
    });

    it('renders', async () => {
      assert.instanceOf(root, SbbOptionElement);
    });
  });

  describe('in a sbb-autocomplete', () => {
    let root: SbbFormFieldElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <div>
            <input id="autocomplete-input" />
            <sbb-autocomplete trigger="autocomplete-input">
              <sbb-option value="Option A">Option A</sbb-option>
              <sbb-option value="Option B">Option B</sbb-option>
              <sbb-option value="Option C">Option C</sbb-option>
            </sbb-autocomplete>
          </div>
        `,
        { modules: ['../../autocomplete.js', './option.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-option'), SbbOptionElement);
    });
  });

  describe('in a sbb-select', () => {
    let root: SbbSelectElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-select>
            <sbb-option value="1">Option 1</sbb-option>
            <sbb-option value="2">Option 2</sbb-option>
            <sbb-option value="3">Option 3</sbb-option>
          </sbb-select>
        `,
        { modules: ['../../select.js', './option.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-option'), SbbOptionElement);
    });

    it('should have data-disable-highlight applied', () => {
      const options = root.querySelectorAll('sbb-option');
      expect(options.length).to.eq(3);
      for (const option of options) {
        expect(option).to.have.attribute('data-disable-highlight');
      }
    });
  });

  describe('in a sbb-select[multiple]', () => {
    let root: SbbSelectElement;

    beforeEach(async () => {
      root = await ssrHydratedFixture(
        html`
          <sbb-select multiple>
            <sbb-option value="1">Option 1</sbb-option>
            <sbb-option value="2">Option 2</sbb-option>
            <sbb-option value="3">Option 3</sbb-option>
          </sbb-select>
        `,
        { modules: ['../../select.js', './option.js'] },
      );
    });

    it('renders', () => {
      assert.instanceOf(root.querySelector('sbb-option'), SbbOptionElement);
    });
  });
});
