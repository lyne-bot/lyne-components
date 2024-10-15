import { aTimeout, assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { tabKey } from '../core/testing/private/keys.js';
import { fixture } from '../core/testing/private.js';
import { waitForCondition, waitForLitRender, EventSpy } from '../core/testing.js';
import { SbbOptionElement } from '../option.js';

import { SbbSelectElement } from './select.js';

describe(`sbb-select`, () => {
  describe('common behavior', () => {
    let element: SbbSelectElement,
      focusableElement: HTMLElement,
      firstOption: SbbOptionElement,
      secondOption: SbbOptionElement,
      thirdOption: SbbOptionElement,
      displayValue: HTMLElement,
      comboBoxElement: HTMLElement;

    beforeEach(async () => {
      const root = await fixture(html`
        <div id="parent">
          <sbb-select placeholder="Placeholder">
            <sbb-option id="option-1" value="1">First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3">Third</sbb-option>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;

      comboBoxElement = root.querySelector('[role="combobox"]')!;
      focusableElement = comboBoxElement;
      firstOption = element.querySelector<SbbOptionElement>('#option-1')!;
      secondOption = element.querySelector<SbbOptionElement>('#option-2')!;
      thirdOption = element.querySelector<SbbOptionElement>('#option-3')!;
      displayValue = element.shadowRoot!.querySelector('.sbb-select__trigger')!;
    });

    it('renders', async () => {
      assert.instanceOf(element, SbbSelectElement);
      assert.instanceOf(firstOption, SbbOptionElement);
    });

    it('opens and closes the dialog', async () => {
      const willOpen = new EventSpy(SbbSelectElement.events.willOpen);
      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      const willClose = new EventSpy(SbbSelectElement.events.willClose);
      const didClose = new EventSpy(SbbSelectElement.events.didClose);
      element.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      await waitForCondition(() => willOpen.events.length === 1);
      expect(willOpen.count).to.be.equal(1);
      await waitForCondition(() => didOpen.events.length === 1);

      expect(didOpen.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      element.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      await waitForCondition(() => willClose.events.length === 1);
      expect(willClose.count).to.be.equal(1);
      await waitForCondition(() => didClose.events.length === 1);

      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
    });

    it('displays placeholder if no value is set and there is no selected element', async () => {
      expect(element.value).to.be.null;
      const placeholder = element.shadowRoot!.querySelector('.sbb-select__trigger--placeholder');
      expect(placeholder).not.to.be.null;
      expect(placeholder).to.have.trimmed.text('Placeholder');
    });

    it("displays value if it's set, or placeholder if value doesn't match available options", async () => {
      expect(displayValue).to.have.trimmed.text('Placeholder');

      element.value = '1';
      await waitForLitRender(element);
      expect(displayValue).to.have.trimmed.text('First');
      expect(firstOption).to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');

      element.value = '000000000';
      await waitForLitRender(element);
      expect(displayValue).to.have.trimmed.text('Placeholder');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it("displays joined string if both multiple and value props are set, or placeholder if value doesn't match available options", async () => {
      expect(displayValue).to.have.trimmed.text('Placeholder');
      element.toggleAttribute('multiple', true);
      element.value = ['1', '3'];
      await waitForLitRender(element);
      expect(displayValue).to.have.trimmed.text('First, Third');
      expect(firstOption).to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).to.have.attribute('selected');

      /**
       * Custom implementation
       * If an invalid value is set, we keep it and show the empty placeholder.
       * Meanwhile, the native select ignores it and set and empty value.
       */
      element.value = '000000000';
      await waitForLitRender(element);
      expect(element.value).to.be.equal('000000000');
      expect(displayValue).to.have.trimmed.text('Placeholder');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it("displays value if it's set with 'wrong' selected attributes on sbb-options", async () => {
      const root = await fixture(html`
        <div id="parent">
          <sbb-select value="2">
            <sbb-option id="option-1" value="1" selected>First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3" selected>Third</sbb-option>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;

      const displayValue = element.shadowRoot!.querySelector('.sbb-select__trigger');
      const firstOption = element.querySelector('#option-1');
      const secondOption = element.querySelector('#option-2');
      const thirdOption = element.querySelector('#option-3');

      expect(element.value).to.be.equal('2');
      expect(displayValue).to.have.trimmed.text('Second');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).to.have.attribute('selected');
      expect(thirdOption).not.to.have.attribute('selected');
    });

    it('display selected sbb-option if no value is set, then handles selection', async () => {
      const root = await fixture(html`
        <div id="parent2">
          <sbb-select>
            <sbb-option id="option-1" value="1" selected>First</sbb-option>
            <sbb-option id="option-2" value="2">Second</sbb-option>
            <sbb-option id="option-3" value="3">Third</sbb-option>
          </sbb-select>
        </div>
      `);
      element = root.querySelector<SbbSelectElement>('sbb-select')!;
      comboBoxElement = root.querySelector('[role="combobox"]')!;
      focusableElement = comboBoxElement;

      const displayValue = element.shadowRoot!.querySelector('.sbb-select__trigger');
      expect(displayValue).to.have.trimmed.text('First');
      expect(element.value).to.be.equal('1');

      const willOpen = new EventSpy(SbbSelectElement.events.willOpen);
      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      element.click();

      await waitForCondition(() => willOpen.events.length === 1);
      expect(willOpen.count).to.be.equal(1);
      await waitForCondition(() => didOpen.events.length === 1);

      expect(didOpen.count).to.be.equal(1);
      await waitForLitRender(element);

      firstOption = element.querySelector<SbbOptionElement>('#option-1')!;
      expect(firstOption).not.to.have.attribute('data-active');
      expect(firstOption).to.have.attribute('selected');
      secondOption = element.querySelector<SbbOptionElement>('#option-2')!;
      expect(secondOption).not.to.have.attribute('data-active');
      expect(secondOption).not.to.have.attribute('selected');

      const selectionChange = new EventSpy(SbbOptionElement.events.selectionChange);
      const optionSelected = new EventSpy(SbbOptionElement.events.optionSelected);
      const willClose = new EventSpy(SbbSelectElement.events.willClose);
      const didClose = new EventSpy(SbbSelectElement.events.didClose);

      secondOption.click();
      await waitForLitRender(element);

      // Event received, panel is closed
      expect(selectionChange.count).to.be.equal(1);
      expect(optionSelected.count).to.be.equal(1);

      await waitForCondition(() => willClose.events.length === 1);
      expect(willClose.count).to.be.equal(1);
      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element.value).to.be.equal('2');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'false');
    });

    it('handles selection in multiple', async () => {
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);

      const willOpen = new EventSpy(SbbSelectElement.events.willOpen);
      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      element.dispatchEvent(new CustomEvent('click'));

      await waitForCondition(() => willOpen.events.length === 1);
      expect(willOpen.count).to.be.equal(1);
      await waitForCondition(() => didOpen.events.length === 1);
      expect(didOpen.count).to.be.equal(1);
      await waitForLitRender(element);
      expect(firstOption).not.to.have.attribute('data-active');
      expect(firstOption).not.to.have.attribute('selected');
      expect(secondOption).not.to.have.attribute('data-active');
      expect(secondOption).not.to.have.attribute('selected');

      const selectionChange = new EventSpy(SbbOptionElement.events.selectionChange);
      firstOption.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      expect(selectionChange.count).to.be.equal(1);
      expect(element.value).to.be.eql(['1']);
      expect(displayValue).to.have.trimmed.text('First');

      secondOption.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      expect(selectionChange.count).to.be.equal(2);
      expect(element.value).to.be.eql(['1', '2']);
      expect(displayValue).to.have.trimmed.text('First, Second');

      firstOption.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      expect(element.value).to.be.eql(['2']);
      secondOption.dispatchEvent(new CustomEvent('click'));
      await waitForLitRender(element);
      expect(element.value).to.be.eql([]);
      expect(displayValue).to.have.trimmed.text('Placeholder');
      // Panel is still open
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
    });

    it('handles keypress on host', async () => {
      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      const didClose = new EventSpy(SbbSelectElement.events.didClose);

      focusableElement.focus();
      await sendKeys({ press: 'Enter' });
      await waitForLitRender(element);
      await waitForCondition(() => didOpen.events.length === 1);
      expect(didOpen.count).to.be.equal(1);

      focusableElement.focus();
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);
      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose.count).to.be.equal(1);

      focusableElement.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForCondition(() => didOpen.events.length === 2);
      expect(didOpen.count).to.be.equal(2);

      focusableElement.focus();
      await sendKeys({ press: tabKey });
      await waitForCondition(() => didClose.events.length === 2);
      expect(didClose.count).to.be.equal(2);

      focusableElement.focus();
      await sendKeys({ press: 'F' });
      await waitForLitRender(element);
      expect(didOpen.count).to.be.equal(2);
      expect(didClose.count).to.be.equal(2);
      expect(displayValue).to.have.trimmed.text('First');

      await aTimeout(1100); // wait for the reset of _searchString timeout

      focusableElement.focus();
      await sendKeys({ press: 'S' });
      await waitForLitRender(element);
      expect(didOpen.count).to.be.equal(2);
      expect(didClose.count).to.be.equal(2);
      expect(displayValue).to.have.trimmed.text('Second');
    });

    it('handles keyboard selection', async () => {
      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      focusableElement.focus();
      await sendKeys({ press: ' ' });
      await waitForCondition(() => didOpen.events.length === 1);
      expect(didOpen.count).to.be.equal(1);
      expect(firstOption).not.to.have.attribute('data-active');
      expect(firstOption).not.to.have.attribute('selected');

      focusableElement.focus();
      await sendKeys({ press: 'ArrowDown' });
      expect(firstOption).to.have.attribute('data-active');
      expect(firstOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('1');
      expect(displayValue).to.have.trimmed.text('First');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');

      focusableElement.focus();
      await sendKeys({ press: 'T' });
      await waitForLitRender(element);
      expect(didOpen.count).to.be.equal(1);
      expect(displayValue).to.have.trimmed.text('Third');
      expect(thirdOption).to.have.attribute('data-active');
      expect(thirdOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('3');

      await aTimeout(1100); // wait for the reset of _searchString timeout

      focusableElement.focus();
      await sendKeys({ press: 'S' });
      await waitForLitRender(element);
      expect(didOpen.count).to.be.equal(1);
      expect(displayValue).to.have.trimmed.text('Second');
      expect(secondOption).to.have.attribute('data-active');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.equal('2');
    });

    it('handles keyboard selection in multiple', async () => {
      element.toggleAttribute('multiple', true);
      await waitForLitRender(element);

      const didOpen = new EventSpy(SbbSelectElement.events.didOpen);
      const didClose = new EventSpy(SbbSelectElement.events.didClose);
      focusableElement.focus();
      await sendKeys({ press: 'ArrowUp' });
      await waitForCondition(() => didOpen.events.length === 1);
      expect(didOpen.count).to.be.equal(1);

      expect(secondOption).not.to.have.attribute('data-active');
      expect(secondOption).not.to.have.attribute('selected');
      focusableElement.focus();
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'ArrowDown' });
      await sendKeys({ press: 'Enter' });
      expect(secondOption).to.have.attribute('data-active');
      expect(secondOption).to.have.attribute('selected');
      expect(element.value).to.be.eql(['2']);
      expect(displayValue).to.have.trimmed.text('Second');

      await sendKeys({ press: 'Escape' });
      await waitForCondition(() => didClose.events.length === 1);
      expect(didClose.count).to.be.equal(1);

      element.focus();
      await sendKeys({ press: 'ArrowDown' });
      await waitForLitRender(element);
      await waitForCondition(() => didOpen.events.length === 2);
      expect(didOpen.count).to.be.equal(2);
      expect(secondOption).not.to.have.attribute('data-active');
      expect(secondOption).to.have.attribute('selected');
      expect(comboBoxElement).to.have.attribute('aria-expanded', 'true');
    });

    it('correctly forward focus and blur', async () => {
      element.focus();
      await waitForLitRender(element);
      expect(document.activeElement).to.have.attribute('role', 'combobox');

      element.blur();
      await waitForLitRender(element);
      expect(document.activeElement).not.to.have.attribute('role', 'combobox');
    });

    it('does not open if prevented', async () => {
      const willOpenEventSpy = new EventSpy(SbbSelectElement.events.willOpen);

      element.addEventListener(SbbSelectElement.events.willOpen, (ev) => ev.preventDefault());
      element.open();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('does not close if prevented', async () => {
      const didOpenEventSpy = new EventSpy(SbbSelectElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbSelectElement.events.willClose);

      element.open();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      await waitForLitRender(element);

      element.addEventListener(SbbSelectElement.events.willClose, (ev) => ev.preventDefault());
      element.close();

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'opened');
    });
  });

  describe('form association', () => {
    let form: HTMLFormElement;
    let element: SbbSelectElement;
    let comboBoxElement: HTMLElement;
    let nativeSelect: HTMLSelectElement;
    let fieldSet: HTMLFieldSetElement;
    let elemChangeEvent: EventSpy<Event>,
      elemInputEvent: EventSpy<Event>,
      nativeChangeEvent: EventSpy<Event>,
      nativeInputEvent: EventSpy<Event>;

    beforeEach(async () => {
      form = await fixture(html`
        <form>
          <fieldset>
            <sbb-select placeholder="Placeholder" name="sbb-select" value="2">
              <sbb-option id="option-1" value="1">First</sbb-option>
              <sbb-option id="option-2" value="2">Second</sbb-option>
              <sbb-option id="option-3" value="3">Third</sbb-option>
            </sbb-select>

            <select name="native-select">
              <option value="1">First</option>
              <option value="2" selected>Second</option>
              <option value="3">Third</option>
            </select>
          </fieldset>
        </form>
      `);
      element = form.querySelector('sbb-select')!;
      comboBoxElement = form.querySelector('[role="combobox"]')!;
      nativeSelect = form.querySelector('select')!;
      fieldSet = form.querySelector('fieldset')!;

      // event spies
      elemChangeEvent = new EventSpy('change', element);
      elemInputEvent = new EventSpy('input', element);
      nativeChangeEvent = new EventSpy('change', nativeSelect);
      nativeInputEvent = new EventSpy('input', nativeSelect);

      await waitForLitRender(form);
    });

    function compareToNative(skipValue?: boolean): void {
      const formData = new FormData(form);

      if (!skipValue) {
        expect(element.value, 'compare to native - value').to.be.equal(nativeSelect.value);
      }
      expect(formData.get('sbb-select'), 'compare to native - form value').to.be.equal(
        formData.get('native-select'),
      );
      expect(elemChangeEvent.count, 'compare to native - change counts').to.be.equal(
        nativeChangeEvent.count,
      );
      expect(elemInputEvent.count, 'compare to native - input counts').to.be.equal(
        nativeInputEvent.count,
      );
    }

    it('should set default value', async () => {
      expect(element.value).to.be.equal('2');
      compareToNative();
    });

    it('should handle invalid values', async () => {
      element.value = nativeSelect.value = '4';
      await waitForLitRender(form);

      /**
       * Custom implementation
       * If an invalid value is set, we keep it and show the empty placeholder.
       * Meanwhile, the native select ignores it and set and empty value.
       */
      expect(element.value).to.be.equal('4');
    });

    it('should handle multiple values', async () => {
      element.multiple = nativeSelect.multiple = true;

      element.value = ['1', '3'];
      nativeSelect.options[0].selected = nativeSelect.options[2].selected = true;
      await waitForLitRender(form);

      expect(element.value).to.be.eql(['1', '3']);

      // The native select does not handle multiple values, so we expect the value to differ
      compareToNative(true);
    });

    it('should result :disabled', async () => {
      element.disabled = true;
      nativeSelect.disabled = true;

      await waitForLitRender(form);

      expect(element).to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(-1);
      compareToNative();

      element.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(0);
    });

    it('should result :disabled if a fieldSet is', async () => {
      fieldSet.disabled = true;

      await waitForLitRender(form);

      expect(element).to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(-1);
      compareToNative();

      fieldSet.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
      expect(comboBoxElement.tabIndex).to.be.equal(0);
    });

    it('should restore form state on formStateRestoreCallback()', async () => {
      // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
      element.formStateRestoreCallback('3', 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.equal('3');

      element.multiple = true;
      await waitForLitRender(element);

      const formData = new FormData();
      formData.append(element.name, '1');
      formData.append(element.name, '2');

      element.formStateRestoreCallback(Array.from(formData.entries()), 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.eql(['1', '2']);
    });

    it('should reset on form reset', async () => {
      element.value = nativeSelect.value = '3';

      form.reset();
      await waitForLitRender(form);

      expect(element.value).to.be.equal('2');
      compareToNative();
    });
  });
});
