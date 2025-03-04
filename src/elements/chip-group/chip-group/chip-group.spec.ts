import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbAutocompleteElement } from '../../autocomplete/autocomplete.js';
import { inputAutocompleteEvent } from '../../autocomplete.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import type { SbbFormFieldElement } from '../../form-field.js';
import type { SbbOptionElement } from '../../option.js';
import type { SbbChipElement } from '../chip.js';

import { SbbChipGroupElement, type SbbChipInputTokenEndEventDetails } from './chip-group.js';
import '../chip.js';
import '../../form-field.js';
import '../../option.js';

describe('sbb-chip-group', () => {
  let element: SbbChipGroupElement;
  let chips: SbbChipElement[];
  let formField: SbbFormFieldElement;
  let input: HTMLInputElement;
  let focusStep: HTMLInputElement;

  describe('basic interactions', () => {
    beforeEach(async () => {
      await fixture(html`
        <a href="#" id="focusable">Focus step</a>
        <sbb-form-field>
          <label>Label</label>
          <sbb-chip-group name="chip-group-1">
            <sbb-chip value="chip 1"></sbb-chip>
            <sbb-chip value="chip 2"></sbb-chip>
            <sbb-chip value="chip 3"></sbb-chip>
            <input placeholder="Placeholder" />
          </sbb-chip-group>
        </sbb-form-field>
      `);
      element = document.querySelector('sbb-chip-group')!;
      chips = Array.from(document.querySelectorAll('sbb-chip'));
      formField = document.querySelector('sbb-form-field')!;
      input = document.querySelector('input')!;
      focusStep = document.querySelector('#focusable')!;

      await waitForLitRender(formField);
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbChipGroupElement);
    });

    it('should add chip on enter', async () => {
      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.value).to.include('chip 4');
      expect(element.querySelector('sbb-chip[value="chip 4"]')).to.exist;
      expect(input.value).to.be.empty; // The input should be emptied

      // If the input is empty, it does not create a chip
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.querySelectorAll('sbb-chip').length).to.be.equal(4);
    });

    it('should customize new chip value and label', async () => {
      element.addEventListener(SbbChipGroupElement.events.chipInputTokenEnd, (ev: Event) => {
        const detail: SbbChipInputTokenEndEventDetails = (ev as CustomEvent).detail;

        expect(detail.origin).to.be.equal('input');
        expect(detail.value).to.be.equal('chip 4');

        detail.setValue('chip 5');
        detail.setLabel('chip Custom');
      });

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.value).to.include('chip 5');
      expect(element.querySelector('sbb-chip[value="chip 5"]')).to.exist;
      expect(
        element.querySelector<SbbChipElement>('sbb-chip[value="chip 5"]')!.innerText,
      ).to.be.equal('chip Custom');
      expect(input.value).to.be.empty; // The input should be emptied
    });

    it('should prevent chip creation', async () => {
      element.addEventListener(SbbChipGroupElement.events.chipInputTokenEnd, (ev: Event) =>
        ev.preventDefault(),
      );

      input.focus();
      await sendKeys({ type: 'chip 4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.value).not.to.include('chip 4');
    });

    it('should delete chip on delete button click', async () => {
      const toDelete = chips[0];
      const toDeleteValue = toDelete.value;
      const inputEventSpy = new EventSpy(SbbChipGroupElement.events.input, element);
      const changeEventSpy = new EventSpy(SbbChipGroupElement.events.change, element);

      // Click the delete button
      (toDelete.shadowRoot!.querySelector('.sbb-chip__delete') as HTMLElement).click();
      await waitForLitRender(element);

      // Expect the chip label to be removed
      expect(element.value).not.to.include(toDeleteValue);
      expect(element.querySelector(`sbb-chip[value="${toDeleteValue}"]`)).not.to.exist;
      expect(inputEventSpy.count).to.be.equal(1);
      expect(changeEventSpy.count).to.be.equal(1);

      // Except the new last chip to be focused
      expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[1]!.value);
    });

    it('should react when input is disabled', async () => {
      input.disabled = true;
      await waitForLitRender(formField);

      expect(element.disabled).to.be.true;
      expect(chips.every((c) => c.disabled)).to.be.true;

      input.disabled = false;
      await waitForLitRender(formField);

      expect(element.disabled).to.be.false;
      expect(chips.every((c) => c.disabled)).to.be.false;
    });

    it('should react when input is readonly', async () => {
      input.toggleAttribute('readonly', true);
      await waitForLitRender(formField);

      expect(chips.every((c) => c.readonly)).to.be.true;

      input.toggleAttribute('readonly', false);
      await waitForLitRender(formField);

      expect(chips.every((c) => c.readonly)).to.be.false;
    });

    it('should react when input is readonly', async () => {
      const tokenEndEventSpy = new EventSpy(SbbChipGroupElement.events.chipInputTokenEnd, element);
      element.separatorKeys = ',.;';

      input.focus();
      await sendKeys({ type: 'chip 4, chip 5. chip 6; ' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);

      expect(element.value).to.include('chip 4');
      expect(element.value).to.include('chip 5');
      expect(element.value).to.include('chip 6');
      expect(element.querySelectorAll('sbb-chip').length).to.be.equal(6);
      expect(input.value).to.be.empty; // The input should be emptied
      expect(tokenEndEventSpy.count).to.be.equal(3);
    });

    /** Verify whether the sync between slotted chip and the value works properly **/
    describe('slotted chips sync', () => {
      it('should sync slotted chips when setting value', async () => {
        // Add a chip ('chip 4')
        let newValue = ['chip 1', 'chip 2', 'chip 3', 'chip 4'];
        element.value = newValue;
        await waitForLitRender(element);

        let slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map(
          (c) => c.value,
        );
        expect(slottedChipsValue).to.be.eql(newValue);

        // Remove a chip ('chip 3')
        newValue = ['chip 1', 'chip 2', 'chip 4'];
        element.value = newValue;
        await waitForLitRender(element);

        slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map((c) => c.value);
        expect(slottedChipsValue).to.be.eql(newValue);

        // Add and remove chips
        newValue = ['chip 1', 'chip 2', 'chip 5'];
        element.value = newValue;
        await waitForLitRender(element);

        slottedChipsValue = Array.from(element.querySelectorAll('sbb-chip')).map((c) => c.value);
        expect(slottedChipsValue).to.be.eql(newValue);

        // Empty value
        element.value = null;
        await waitForLitRender(element);
        expect(element.querySelectorAll('sbb-chip').length).to.be.equal(0);
      });

      it('should sync value when slotting chips', async () => {
        // Create and slot a new chip
        const newChip = document.createElement('sbb-chip');
        newChip.setAttribute('value', 'chip 4');
        element.insertBefore(newChip, input);

        await waitForLitRender(element);

        expect(element.value).to.be.eql(['chip 1', 'chip 2', 'chip 3', 'chip 4']);
      });
    });

    describe('keyboard interactions', () => {
      it('should handle tab-order', async () => {
        focusStep.focus();

        await sendKeys({ press: tabKey });

        // Should focus the last enabled chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);

        await sendKeys({ press: tabKey });

        expect(document.activeElement!.localName).to.be.equal('input');

        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: tabKey });
        await sendKeys({ up: 'Shift' });

        // Should focus the last enabled chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);

        await sendKeys({ down: 'Shift' });
        await sendKeys({ press: tabKey });
        await sendKeys({ up: 'Shift' });

        // Should not trap the focus and let the previous element to be focused
        expect(document.activeElement!.localName).to.be.equal(focusStep.localName);

        // Should skip the last disabled chip and focus the second to last
        chips.at(-1)!.disabled = true;
        chips.at(-2)!.readonly = true;
        await waitForLitRender(element);

        await sendKeys({ press: tabKey });

        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-2)!.value);
      });

      it('should remove chip on delete key', async () => {
        input.focus();
        await sendKeys({ type: 'a' });
        await sendKeys({ press: 'Backspace' });

        // If the input is not empty, it should not move the focus to the chip
        expect(document.activeElement!.localName).to.be.equal('input');

        await sendKeys({ press: 'Backspace' });

        // Should focus the last enabled chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);
        const focusedChipValue = (document.activeElement as SbbChipElement).value;

        await sendKeys({ press: 'Backspace' });
        await waitForLitRender(element);

        // Should remove the focused chip and focus the last one
        expect(element.value).not.to.contain(focusedChipValue);
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-2)!.value);

        // Delete all chips
        await sendKeys({ press: 'Backspace' });
        await sendKeys({ press: 'Backspace' });
        await waitForLitRender(element);

        // Expect the input to be focused
        expect(document.activeElement!.localName).to.be.equal('input');
      });

      it('should prevent delete on readonly chip', async () => {
        chips.at(-1)!.readonly = true;
        input.focus();

        await sendKeys({ press: 'Backspace' });

        // Should focus the last enabled chip (even if readonly)
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips.at(-1)!.value);
        const focusedChipValue = (document.activeElement as SbbChipElement).value;

        // Should remove the focused chip
        await sendKeys({ press: 'Backspace' });
        await waitForLitRender(element);

        expect(element.value).to.contain(focusedChipValue);
      });

      it('should handle arrow navigation', async () => {
        chips[1].disabled = true;
        chips[2].readonly = true;
        await waitForLitRender(element);

        chips[0].focus();

        await sendKeys({ press: 'ArrowRight' });

        // Should focus the delete button of the first chip
        expect(document.activeElement!.localName).to.be.equal('sbb-chip');
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[0].value);
        expect(document.activeElement!.shadowRoot!.activeElement!).to.have.class(
          'sbb-chip__delete',
        );

        await sendKeys({ press: 'ArrowDown' });

        // Should skip the disabled chip and focus the last one
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[2].value);
        expect(document.activeElement!.shadowRoot!.activeElement!).to.have.class(
          'sbb-chip__label-wrapper',
        );

        await sendKeys({ press: 'ArrowRight' });

        // Should wrap and go back to the first chip
        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[0].value);
        expect(document.activeElement!.shadowRoot!.activeElement!).to.have.class(
          'sbb-chip__label-wrapper',
        );

        await sendKeys({ press: 'ArrowLeft' });

        expect((document.activeElement as SbbChipElement).value).to.be.equal(chips[2].value);
        expect(document.activeElement!.shadowRoot!.activeElement!).to.have.class(
          'sbb-chip__label-wrapper',
        );
      });
    });
  });

  describe('within form', () => {
    let form: HTMLFormElement;
    let fieldset: HTMLFieldSetElement;

    beforeEach(async () => {
      await fixture(html`
        <form>
          <fieldset>
            <sbb-form-field>
              <label>Label</label>
              <sbb-chip-group name="chip-group-1">
                <sbb-chip value="chip 1"></sbb-chip>
                <sbb-chip value="chip 2"></sbb-chip>
                <sbb-chip value="chip 3"></sbb-chip>
                <input placeholder="Placeholder" />
              </sbb-chip-group>
            </sbb-form-field>
          </fieldset>
        </form>
      `);
      element = document.querySelector('sbb-chip-group')!;
      chips = Array.from(document.querySelectorAll('sbb-chip'));
      formField = document.querySelector('sbb-form-field')!;
      input = document.querySelector('input')!;
      form = document.querySelector('form')!;
      fieldset = document.querySelector('fieldset')!;

      await waitForLitRender(formField);
    });

    it('should update form value', async () => {
      let formData = new FormData(form);

      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);
      input.focus();
      await sendKeys({ type: 'chip-4' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      formData = new FormData(form);
      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);

      chips[0].remove();
      await waitForLitRender(formField);

      formData = new FormData(form);
      expect(formData.getAll('chip-group-1')).to.be.eql(element.value);
    });

    it('should react when fieldset is disabled', async () => {
      fieldset.disabled = true;
      await waitForLitRender(formField);

      const formData = new FormData(form);

      expect(element).to.match(':disabled');
      expect(formData.getAll('chip-group-1')).to.be.eql([]);
    });
  });

  describe('with autocomplete', () => {
    let autocomplete: SbbAutocompleteElement;
    let options: SbbOptionElement[];

    beforeEach(async () => {
      await fixture(html`
        <sbb-form-field>
          <label>Label</label>
          <sbb-chip-group name="chip-group-1">
            <sbb-chip value="chip 1"></sbb-chip>
            <input placeholder="Placeholder" />
          </sbb-chip-group>
          <sbb-autocomplete>
            <sbb-option value="Option A">Option A</sbb-option>
            <sbb-option value="Option B">Option B</sbb-option>
          </sbb-autocomplete>
        </sbb-form-field>
      `);
      element = document.querySelector('sbb-chip-group')!;
      chips = Array.from(document.querySelectorAll('sbb-chip'));
      formField = document.querySelector('sbb-form-field')!;
      input = document.querySelector('input')!;
      autocomplete = document.querySelector('sbb-autocomplete')!;
      options = Array.from(document.querySelectorAll('sbb-option'));

      await waitForLitRender(formField);
    });

    it('should create chip when option is selected', async () => {
      const inputAutocompleteEventSpy = new EventSpy(inputAutocompleteEvent, input);
      const tokenEndEventSpy = new EventSpy<CustomEvent>(
        SbbChipGroupElement.events.chipInputTokenEnd,
        element,
      );

      input.focus();
      await waitForLitRender(formField);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.count).to.be.equal(1);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('autocomplete');
      expect(element.value).to.contain(options[0].value);

      autocomplete.open();
      options[1].click();
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(2);
      expect(tokenEndEventSpy.count).to.be.equal(2);
      expect(tokenEndEventSpy.lastEvent!.detail.origin).to.be.equal('autocomplete');
      expect(element.value).to.contain(options[1].value);
    });

    /**
     * This test cover the case where the input has a value and an option is selected.
     * What should happen is that
     * - autocomplete overwrites the input value with the clicked option
     * - the chip-group creates the chip with the new input value
     */
    it('should ignore the input value when an option is selected', async () => {
      const inputAutocompleteEventSpy = new EventSpy('inputAutocomplete', input);

      input.focus();
      await sendKeys({ type: 'aa' });
      await waitForLitRender(formField);

      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(formField);

      expect(inputAutocompleteEventSpy.count).to.be.equal(1);
      expect(element.value).to.contain(options[0].value);
      expect(element.value).not.to.contain('aa');
    });
  });
});
