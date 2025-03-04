import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { defaultDateAdapter } from '../core/datetime.js';
import { fixture, typeInElement } from '../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../core/testing.js';

import { SbbDateInputElement } from './date-input.js';

describe('sbb-date-input', () => {
  let element: SbbDateInputElement;

  it('renders', async () => {
    element = await fixture(html`<sbb-date-input></sbb-date-input>`);
    assert.instanceOf(element, SbbDateInputElement);
  });

  it('should not consider content between tag and end tag', async () => {
    element = await fixture(html`<sbb-date-input> </sbb-date-input>`);
    expect(element.value).to.be.equal('');
    expect(element.textContent).to.be.equal('');
  });

  it('should remove nested elements', async () => {
    element = await fixture(html`<sbb-date-input> <span>test</span> </sbb-date-input>`);
    expect(element.value).to.be.equal('');
    expect(element.textContent).to.be.equal('');
    expect(element.childElementCount).to.equal(0);
  });

  it('should parse min', async () => {
    element = await fixture(html`<sbb-date-input min="2024-12-24"></sbb-date-input>`);
    expect(element.min?.toJSON()).to.be.equal(defaultDateAdapter.createDate(2024, 12, 24).toJSON());
  });

  it('should parse max', async () => {
    element = await fixture(html`<sbb-date-input max="2024-12-24"></sbb-date-input>`);
    expect(element.max?.toJSON()).to.be.equal(defaultDateAdapter.createDate(2024, 12, 24).toJSON());
  });

  it('should not clear the text content on backspace', async function () {
    this.timeout(300000);
    element = await fixture(html`<sbb-date-input value="2024-12-24"></sbb-date-input>`);
    element.focus();
    const value = element.value;
    await sendKeys({ press: 'Backspace' });
    expect(element.value).to.equal(value.substring(0, value.length - 1));
    expect(element.textContent).to.equal(value.substring(0, value.length - 1));
  });

  it('should not clear the text content on delete', async () => {
    element = await fixture(html`<sbb-date-input value="2024-12-24"></sbb-date-input>`);
    element.focus();
    const value = element.value;
    await sendKeys({ press: 'Home' });
    await sendKeys({ press: 'Delete' });
    expect(element.value).to.equal(value.substring(1));
    expect(element.textContent).to.equal(value.substring(1));
  });

  describe('with no value', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-date-input></sbb-date-input>`);
    });

    it('should match :empty', () => {
      expect(element).to.match(':empty');
    });

    it('value should be empty', () => {
      expect(element.value).to.be.equal('');
      expect(element.textContent).to.be.equal('');
    });

    it('valueAsDate should be empty', () => {
      expect(element.valueAsDate).to.be.equal(null);
    });

    it('should update value when changing valueAsDate', () => {
      element.valueAsDate = new Date(2024, 11, 24);
      expect(element.value).to.be.equal('Tu, 24.12.2024');
      expect(element.textContent).to.be.equal('Tu, 24.12.2024');
    });

    it('should update value and valueAsDate when changing value with ISO value', () => {
      element.value = '2024-12-24';
      expect(element.valueAsDate?.toJSON()).to.be.equal(
        defaultDateAdapter.createDate(2024, 12, 24).toJSON(),
      );
      expect(element.value).to.be.equal('Tu, 24.12.2024');
      expect(element.textContent).to.be.equal('Tu, 24.12.2024');
    });

    it('should update valueAsDate when changing value with parseable value', () => {
      element.value = 'Tu, 24.12.2024';
      expect(element.valueAsDate?.toJSON()).to.be.equal(
        defaultDateAdapter.createDate(2024, 12, 24).toJSON(),
      );
      expect(element.value).to.be.equal('Tu, 24.12.2024');
      expect(element.textContent).to.be.equal('Tu, 24.12.2024');
    });

    it('renders and emit event on value change', async () => {
      const changeSpy = new EventSpy('change', element);
      const inputSpy = new EventSpy('input', element);
      typeInElement(element, '20/01/2023');
      expect(inputSpy.count).to.be.equal(10);

      const button = document.createElement('button');
      element.after(button);
      button.focus();
      await changeSpy.calledOnce();
      expect(element.value).to.be.equal('Fr, 20.01.2023');
      expect(changeSpy.count).to.be.equal(1);
      expect(inputSpy.count).to.be.equal(10);
    });
  });

  describe('with initial ISO value', () => {
    beforeEach(async () => {
      element = await fixture(html`<sbb-date-input value="2024-12-24"></sbb-date-input>`);
    });

    it('value should be formatted value', () => {
      expect(element.value).to.be.equal('Tu, 24.12.2024');
      expect(element.textContent).to.be.equal('Tu, 24.12.2024');
    });

    it('valueAsDate should be correct date', () => {
      expect(element.valueAsDate?.toJSON()).to.be.equal(
        defaultDateAdapter.createDate(2024, 12, 24).toJSON(),
      );
    });

    it('should update value when changing valueAsDate to null', () => {
      element.valueAsDate = null;
      expect(element.value).to.be.equal('');
      expect(element.textContent).to.be.equal('');
    });

    it('should update value and valueAsDate when changing value to empty string', () => {
      element.value = '';
      expect(element.valueAsDate).to.be.null;
    });
  });

  describe('validity', () => {
    beforeEach(async () => {
      document.documentElement.removeAttribute('lang');
      element = await fixture(html`<sbb-date-input></sbb-date-input>`);
    });

    it('should update validity with required true', async () => {
      expect(element.validationMessage).to.equal('');
      expect(element.validity.valueMissing).to.be.false;

      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validity.valueMissing).to.be.true;
    });

    it('should update validity with required true and valid date', async () => {
      element.toggleAttribute('required', true);
      element.valueAsDate = new Date();
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('');
      expect(element.validity.valueMissing).to.be.false;
    });

    it('should update validity with invalid input', async () => {
      element.value = 'asdf';
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('Please provide a valid date.');
      expect(element.validity.badInput, 'badInput').to.be.true;
    });

    it('should update validity with min and date before', async () => {
      element.min = new Date(2024, 0, 1);
      element.valueAsDate = new Date(2023, 11, 31);
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('Date must not be before 01.01.2024.');
      expect(element.validity.rangeUnderflow, 'rangeUnderflow').to.be.true;
    });

    it('should update validity with max and date after', async () => {
      element.max = new Date(2023, 11, 31);
      element.valueAsDate = new Date(2024, 0, 1);
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('Date must not be after 31.12.2023.');
      expect(element.validity.rangeOverflow, 'rangeOverflow').to.be.true;
    });

    it('should update validity with date filter', async () => {
      const today = defaultDateAdapter.today();
      element.dateFilter = () => false;
      element.valueAsDate = today;
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('Please provide a valid date.');
      expect(element.validity.sbbDateFilter, 'sbbDateFilter').to.be.true;
    });

    it('should update validity message language', async () => {
      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      const original = element.validationMessage;
      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validity.valueMissing).to.be.true;

      document.documentElement.setAttribute('lang', 'de');
      await waitForLitRender(element);

      expect(element.validationMessage.length).to.be.greaterThan(0);
      expect(element.validationMessage).not.to.equal(original);
    });

    it('should keep custom validity', async () => {
      element.setCustomValidity('my error');
      expect(element.validationMessage).to.equal('my error');
      expect(element.validity.customError).to.be.true;

      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      expect(element.validationMessage).to.equal('my error');
      expect(element.validity.customError, 'customError').to.be.true;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;
    });

    it('should not unset required validity', async () => {
      element.toggleAttribute('required', true);
      await waitForLitRender(element);

      const checkedMessage = element.validationMessage;
      expect(checkedMessage.length).to.be.greaterThan(
        0,
        'required validation message must not be empty',
      );

      element.setCustomValidity('my error');
      expect(element.validationMessage).to.equal('my error', 'With custom error');
      expect(element.validity.customError, 'customError').to.be.true;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;

      element.setCustomValidity('');

      expect(element.validationMessage).to.equal(checkedMessage, 'Without custom error');
      expect(element.validity.customError, 'customError').to.be.false;
      expect(element.validity.valueMissing, 'valueMissing').to.be.true;
    });
  });
});
