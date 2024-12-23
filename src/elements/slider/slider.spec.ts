import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbSliderElement } from './slider.js';

const keyboardPressTimes = async (element: HTMLElement, key: string, times = 1): Promise<void> => {
  element.focus();
  for (let i = 0; i < times; i++) {
    await sendKeys({ press: key });
  }
  await waitForLitRender(element);
};

describe(`sbb-slider`, () => {
  let form: HTMLFormElement;
  let fieldSet: HTMLFieldSetElement;
  let input: HTMLInputElement;
  let element: SbbSliderElement;
  let elemChangeEvent: EventSpy<Event>,
    elemInputEvent: EventSpy<Event>,
    nativeChangeEvent: EventSpy<Event>,
    nativeInputEvent: EventSpy<Event>;

  beforeEach(async () => {
    form = await fixture(html`
      <form>
        <fieldset>
          <sbb-slider
            start-icon="walk-slow-small"
            end-icon="walk-fast-small"
            max="100"
            min="0"
            value="40"
            name="sbb-slider"
          ></sbb-slider>

          <input type="range" max="100" min="0" value="40" name="slider" />
        </fieldset>
      </form>
    `);
    element = form.querySelector('sbb-slider')!;
    input = form.querySelector('input')!;
    fieldSet = form.querySelector('fieldset')!;
    await waitForLitRender(form);

    // event spies
    elemChangeEvent = new EventSpy('change', element);
    elemInputEvent = new EventSpy('input', element);
    nativeChangeEvent = new EventSpy('change', input);
    nativeInputEvent = new EventSpy('input', input);
  });

  function compareToNativeInput(): void {
    const formData = new FormData(form);

    expect(element.value, 'compare to native - value').to.be.equal(input.value);
    expect(element.valueAsNumber, 'compare to native - valueAsNumber').to.be.equal(
      input.valueAsNumber,
    );
    expect(formData.get('sbb-slider'), 'compare to native - form value').to.be.equal(
      formData.get('slider'),
    );
    expect(elemChangeEvent.count, 'compare to native - change counts').to.be.equal(
      nativeChangeEvent.count,
    );
    expect(elemInputEvent.count, 'compare to native - input counts').to.be.equal(
      nativeInputEvent.count,
    );

    expect(element.type, 'compare to native - type').to.be.equal(input.type);
    expect(element.role, 'compare to native - role').to.be.equal(input.role);
  }

  it('renders', async () => {
    assert.instanceOf(element, SbbSliderElement);
  });

  describe(`slider behaviors`, () => {
    it('should set default value', async () => {
      element.value = null;
      // @ts-expect-error value should not be null
      input.value = null;

      await waitForLitRender(form);

      expect(element.value).to.be.equal('50');
      compareToNativeInput();
    });

    it('should handle invalid values', async () => {
      element.value = input.value = 'a';
      await waitForLitRender(form);

      expect(element.value).to.be.equal('50');
      compareToNativeInput();

      element.max = element.min = 'a';
      input.max = element.min = 'a';
      await waitForLitRender(form);
      expect(element.max).to.be.equal('100');
      expect(element.min).to.be.equal('0');
      compareToNativeInput();
    });

    it('should handle out of bound values', async () => {
      element.value = input.value = '150';
      await waitForLitRender(form);

      expect(element.value).to.be.equal('100');
      compareToNativeInput();

      element.valueAsNumber = input.valueAsNumber = -20;
      await waitForLitRender(form);

      expect(element.value).to.be.equal('0');
      compareToNativeInput();
    });

    it('should update value on min/max change', async () => {
      element.max = input.max = '30';
      await waitForLitRender(form);

      expect(element.value).to.be.equal('30');
      compareToNativeInput();

      element.max = input.max = '100';
      element.min = input.min = '60';
      await waitForLitRender(form);

      expect(element.value).to.be.equal('60');
      compareToNativeInput();
    });

    it('should result as :disabled', async () => {
      expect(element.tabIndex).to.be.equal(0);

      element.disabled = true;
      await waitForLitRender(form);

      expect(element).to.match(':disabled');

      element.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
    });

    it('should result :disabled if a fieldSet is', async () => {
      fieldSet.disabled = true;
      await waitForLitRender(form);

      expect(element).to.match(':disabled');
      compareToNativeInput();

      fieldSet.disabled = false;
      await waitForLitRender(element);

      expect(element).not.to.match(':disabled');
      compareToNativeInput();
    });

    it('should restore form state on formStateRestoreCallback()', async () => {
      // Mimic tab restoration. Does not test the full cycle as we can not set the browser in the required state.
      element.formStateRestoreCallback('20', 'restore');
      await waitForLitRender(element);

      expect(element.value).to.be.equal('20');
    });

    it('should reset on form reset', async () => {
      element.value = input.value = '20';

      form.reset();
      await waitForLitRender(form);

      expect(element.value).to.be.equal('40');
      compareToNativeInput();
    });
  });

  describe('keyboard interaction', () => {
    it('should decrease value by two on left arrow keypress', async () => {
      await keyboardPressTimes(element, 'ArrowLeft', 2);
      await keyboardPressTimes(input, 'ArrowLeft', 2);

      expect(element.value).to.be.equal('38');
      compareToNativeInput();
    });

    it('should decrease value by two on down arrow keypress', async () => {
      await keyboardPressTimes(element, 'ArrowDown', 2);
      await keyboardPressTimes(input, 'ArrowDown', 2);

      expect(element.value).to.be.equal('38');
      compareToNativeInput();
    });

    it('should increase value by one on right arrow keypress', async () => {
      await keyboardPressTimes(element, 'ArrowRight');
      await keyboardPressTimes(input, 'ArrowRight');

      expect(element.value).to.be.equal('41');
      compareToNativeInput();
    });

    it('should increase value by one on up arrow keypress', async () => {
      await keyboardPressTimes(element, 'ArrowUp');
      await keyboardPressTimes(input, 'ArrowUp');

      expect(element.value).to.be.equal('41');
      compareToNativeInput();
    });

    it('should not change value on arrow keypress if disabled', async () => {
      element.disabled = true;
      await waitForLitRender(element);

      await keyboardPressTimes(element, 'ArrowLeft');
      await keyboardPressTimes(element, 'ArrowRight');

      // disabled by fieldset
      element.disabled = false;
      fieldSet.disabled = true;
      await waitForLitRender(element);

      await keyboardPressTimes(element, 'ArrowUp');
      await keyboardPressTimes(element, 'ArrowDown');

      expect(elemChangeEvent.count).not.to.be.greaterThan(0);
      expect(element.value).to.be.equal('40');
    });
  });
});
