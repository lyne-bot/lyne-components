import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';
import type { SbbFormFieldElement } from '../../form-field.js';

import type { SbbDatepickerToggleElement } from './datepicker-toggle.js';

import './datepicker-toggle.js';
import '../datepicker.js';
import '../../date-input.js';
import '../../form-field.js';

describe(`sbb-datepicker-toggle`, () => {
  describe(`renders`, () => {
    let element: SbbDatepickerToggleElement;

    beforeEach(async () => {
      element = await fixture(html`<sbb-datepicker-toggle></sbb-datepicker-toggle>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('in form-field', () => {
    describe('renders', async () => {
      let page: SbbFormFieldElement;
      let element: SbbDatepickerToggleElement;

      beforeEach(async () => {
        page = await fixture(html`
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker></sbb-datepicker>
            <sbb-date-input></sbb-date-input>
          </sbb-form-field>
        `);
        element = page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('renders disabled', async () => {
      let page: SbbFormFieldElement;
      let element: SbbDatepickerToggleElement;

      beforeEach(async () => {
        page = await fixture(html`
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker></sbb-datepicker>
            <sbb-date-input disabled></sbb-date-input>
          </sbb-form-field>
        `);
        element = page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
      });

      it('DOM', async () => {
        await expect(element).dom.to.be.equalSnapshot();
      });

      it('Shadow DOM', async () => {
        await expect(element).shadowDom.to.be.equalSnapshot();
      });
    });

    describe('with calendar parameters', async () => {
      let page: SbbFormFieldElement;
      let element: SbbDatepickerToggleElement;

      beforeEach(async () => {
        page = await fixture(html`
          <sbb-form-field>
            <sbb-datepicker-toggle></sbb-datepicker-toggle>
            <sbb-datepicker wide></sbb-datepicker>
            <sbb-date-input min="2020-09-13" max="2023-11-14"></sbb-date-input>
          </sbb-form-field>
        `);
        element = page.querySelector<SbbDatepickerToggleElement>('sbb-datepicker-toggle')!;
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
});
