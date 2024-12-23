import { expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture, testA11yTreeSnapshot } from '../../core/testing/private.js';

import type { SbbTrainWagonElement } from './train-wagon.js';

import './train-wagon.js';
import '../../icon.js';
import '../../timetable-occupancy-icon.js';

describe(`sbb-train-wagon`, () => {
  let element: SbbTrainWagonElement;

  describe('should render as type wagon', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-train-wagon
          occupancy="none"
          wagon-class="1"
          type="wagon"
          label="38"
          blocked-passage="previous"
        ></sbb-train-wagon>`,
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

  describe('should render as type wagon-end-right with only one property', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-train-wagon wagon-class="1" type="wagon-end-right"></sbb-train-wagon>`,
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

  describe('should render as type wagon-end-left', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-train-wagon type="wagon-end-left"></sbb-train-wagon>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('should render with only label', async () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-train-wagon label="1"></sbb-train-wagon>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });

    testA11yTreeSnapshot();
  });

  describe('should render as type wagon with one icon', async () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-train-wagon><sbb-icon name="sa-rs"></sbb-icon></sbb-train-wagon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render as type wagon with multiple icons', async () => {
    beforeEach(async () => {
      element = await await fixture(
        html`<sbb-train-wagon
          ><sbb-icon name="sa-rs"></sbb-icon><sbb-icon name="sa-rs"></sbb-icon
        ></sbb-train-wagon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render as type locomotive', async () => {
    beforeEach(async () => {
      element = await await fixture(
        html`<sbb-train-wagon
          type="locomotive"
          additional-accessibility-text="Top of the train"
        ></sbb-train-wagon>`,
      );
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('should render as type closed wagon without number', async () => {
    beforeEach(async () => {
      element = await await fixture(html`<sbb-train-wagon type="closed"></sbb-train-wagon>`);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
