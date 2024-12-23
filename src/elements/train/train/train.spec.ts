import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbTrainWagonElement } from '../train-wagon.js';

import { SbbTrainElement } from './train.js';

import '../train-wagon.js';

describe(`sbb-train`, () => {
  let element: SbbTrainElement;

  it('should render', async () => {
    element = await fixture(html`<sbb-train></sbb-train>`);
    assert.instanceOf(element, SbbTrainElement);
  });

  it('should emit trainSlotChange', async () => {
    element = await fixture(html`
      <sbb-train>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
        <sbb-train-wagon></sbb-train-wagon>
      </sbb-train>
    `);
    const trainSlotChangeSpy = new EventSpy(SbbTrainElement.events.trainSlotChange);

    element.querySelector<SbbTrainWagonElement>('sbb-train-wagon')!.remove();
    await waitForLitRender(element);

    expect(trainSlotChangeSpy.count).to.be.equal(1);
  });

  it('should hide direction label element if not present', async () => {
    const element = await fixture(html`<sbb-train></sbb-train>`);

    expect(element.shadowRoot!.querySelector('.sbb-train__direction')).to.be.null;
  });

  it('should hide station element if not present', async () => {
    const element = await fixture(
      html`<sbb-train direction-label="Driving direction"></sbb-train>`,
    );

    expect(element.shadowRoot!.querySelector('.sbb-train__direction-station')).to.be.null;
  });

  it('should display left indicator if direction is left', async () => {
    const element = await fixture(
      html`<sbb-train
        direction-label="Driving direction"
        station="Bern"
        direction="left"
      ></sbb-train>`,
    );

    expect(element.shadowRoot!.querySelector('sbb-icon')!.getAttribute('name')).to.contain(
      '-left-',
    );
  });

  it('should display right indicator if direction is right', async () => {
    const element = await fixture(
      html`<sbb-train
        direction-label="Driving direction"
        station="Bern"
        direction="right"
      ></sbb-train>`,
    );

    expect(element.shadowRoot!.querySelector('sbb-icon')!.getAttribute('name')).to.contain(
      '-right-',
    );
  });

  describe('accessibility label', () => {
    it('should create aria label with no direction-label and no accessibility-label', async () => {
      const element = await fixture(html`<sbb-train></sbb-train>`);

      expect(
        element.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label and no accessibility-label', async () => {
      const element = await fixture(
        html`<sbb-train direction-label="Direction of Travel"></sbb-train>`,
      );

      expect(
        element.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train.');
    });

    it('should create aria label with direction-label, station and no accessibility-label', async () => {
      const element = await fixture(
        html`<sbb-train direction-label="Direction of Travel" station="Bern"></sbb-train>`,
      );

      expect(
        element.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train, Direction of Travel Bern.');
    });

    it('should create aria label with direction-label, station and accessibility-label', async () => {
      const element = await fixture(
        html`<sbb-train
          direction-label="Direction of Travel"
          station="Bern"
          accessibility-label="Additional label"
        ></sbb-train>`,
      );

      expect(
        element.shadowRoot!.querySelector('.sbb-train__direction-label-sr')!.textContent!.trim(),
      ).to.be.equal('Train, Direction of Travel Bern, Additional label.');
    });
  });
});
