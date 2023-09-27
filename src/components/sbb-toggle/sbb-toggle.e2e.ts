import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';
import { waitForCondition } from '../../global/testing';
import { EventSpy } from '../../global/testing/event-spy';
import '../sbb-toggle-option';
import { SbbToggleOption } from '../sbb-toggle-option';
import './sbb-toggle';
import { SbbToggle } from './sbb-toggle';

describe('sbb-toggle', () => {
  let element: SbbToggle;

  beforeEach(async () => {
    await fixture(html`
      <sbb-toggle value="Value one">
        <sbb-toggle-option id="sbb-toggle-option-1" value="Value one">Value one</sbb-toggle-option>
        <sbb-toggle-option id="sbb-toggle-option-2" value="Value two">Value two</sbb-toggle-option>
      </sbb-toggle>
    `);
    element = document.querySelector('sbb-toggle');
  });

  it('renders', () => {
    assert.instanceOf(element, SbbToggle);
  });

  describe('events', () => {
    it('selects option on click', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      );
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      expect(firstOption).to.have.attribute('checked');

      secondOption.click();
      await secondOption.updateComplete;

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on checked attribute change', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      );
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      );

      expect(firstOption).to.have.attribute('checked');

      secondOption.setAttribute('checked', '');
      await element.updateComplete;

      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it.only('dispatches event on option change', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');

      secondOption.click();
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await firstOption.updateComplete;
      expect(firstOption).to.have.attribute('checked');
    });

    it('prevents selection with disabled state', async () => {
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      element.disabled = true;
      await element.updateComplete;

      await secondOption.click();
      await element.updateComplete;
      expect(secondOption).not.to.have.attribute('checked');
      expect(firstOption).to.have.attribute('checked');

      element.disabled = false;
      await element.updateComplete;

      await secondOption.click();
      await element.updateComplete;
      expect(secondOption).to.have.attribute('checked');
      expect(firstOption).not.to.have.attribute('checked');
    });

    it('selects option on left arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      firstOption.focus();
      await sendKeys({ down: 'ArrowLeft' });
      await element.updateComplete;

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await firstOption.updateComplete;

      expect(firstOption).to.have.attribute('checked');
    });

    it('selects option on right arrow key pressed', async () => {
      const changeSpy = new EventSpy('change');
      const inputSpy = new EventSpy('input');
      const firstOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-1',
      ) as SbbToggleOption;
      const secondOption = document.querySelector(
        'sbb-toggle > sbb-toggle-option#sbb-toggle-option-2',
      ) as SbbToggleOption;

      firstOption.focus();
      await firstOption.updateComplete;
      await sendKeys({ down: 'ArrowRight' });
      await element.updateComplete;

      expect(secondOption).to.have.attribute('checked');
      await waitForCondition(() => changeSpy.events.length === 1);
      expect(changeSpy.count).to.be.equal(1);
      await waitForCondition(() => inputSpy.events.length === 1);
      expect(inputSpy.count).to.be.equal(1);

      firstOption.click();
      await firstOption.updateComplete;

      expect(firstOption).to.have.attribute('checked');
    });
  });
});
