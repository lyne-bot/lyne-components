import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private';
import type { SbbFormFieldElement } from '../form-field';

import type { SbbFormFieldClearElement } from './form-field-clear';
import './form-field-clear';
import '../form-field';

describe(`sbb-form-field-clear`, () => {
  describe('renders', () => {
    let root: SbbFormFieldElement;
    let element: SbbFormFieldClearElement;

    beforeEach(async () => {
      root = await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <input type="text" placeholder="Input placeholder" value="Input value" />
          <sbb-form-field-clear></sbb-form-field-clear>
        </sbb-form-field>
      `);
      element = root.querySelector('sbb-form-field-clear')!;
    });

    it('Formfield Dom', async () => {
      await expect(root).dom.to.be.equalSnapshot();
    });

    it('Formfield ShadowDom', async () => {
      await expect(root).shadowDom.to.be.equalSnapshot();
    });

    it('FormfieldClear ShadowDom', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });
});
