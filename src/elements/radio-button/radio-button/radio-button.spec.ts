import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbRadioButtonElement } from './radio-button.js';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonElement;

  describe('general', () => {
    beforeEach(async () => {
      element = await fixture(
        html`<sbb-radio-button name="test" value="Value">Value label</sbb-radio-button>`,
      );
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbRadioButtonElement);
      expect(element.tabIndex).to.be.equal(0);
    });

    it('selects radio on click', async () => {
      const change = new EventSpy(SbbRadioButtonElement.events.change);

      element.click();
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-checked');
      expect(element.checked).to.be.true;
      await change.calledOnce();
      expect(change.count).to.be.equal(1);
    });

    it('does not deselect radio if already checked', async () => {
      const change = new EventSpy(SbbRadioButtonElement.events.change);

      element.click();
      await waitForLitRender(element);
      expect(element.checked).to.be.true;
      await change.calledOnce();
      expect(change.count).to.be.equal(1);

      element.click();
      await waitForLitRender(element);
      expect(element.checked).to.be.true;
      await change.calledOnce();
      expect(change.count).to.be.equal(1);
    });

    it('allows empty selection', async () => {
      const change = new EventSpy(SbbRadioButtonElement.events.change);

      element.allowEmptySelection = true;
      element.click();
      await waitForLitRender(element);
      expect(element.checked).to.be.true;
      await change.calledOnce();
      expect(change.count).to.be.equal(1);

      element.click();
      await waitForLitRender(element);
      expect(element.checked).to.be.false;
      await change.calledTimes(2);
      expect(change.count).to.be.equal(2);
    });

    it('should convert falsy to false', async () => {
      element.checked = element.disabled = element.required = element.allowEmptySelection = true;
      (element.checked as any) =
        (element.disabled as any) =
        (element.required as any) =
        (element.allowEmptySelection as any) =
          undefined;

      await waitForLitRender(element);

      expect(element.checked, 'checked').to.be.false;
      expect(element.disabled, 'disabled').to.be.false;
      expect(element.required, 'required').to.be.false;
      expect(element.allowEmptySelection, 'allowEmptySelection').to.be.false;
    });

    it('should convert truthy to true', async () => {
      element.checked = element.disabled = element.required = element.allowEmptySelection = true;
      (element.checked as any) =
        (element.disabled as any) =
        (element.required as any) =
        (element.allowEmptySelection as any) =
          2;

      await waitForLitRender(element);

      expect(element.checked, 'checked').to.be.true;
      expect(element.disabled, 'disabled').to.be.true;
      expect(element.required, 'required').to.be.true;
      expect(element.allowEmptySelection, 'allowEmptySelection').to.be.true;
    });
  });
});
