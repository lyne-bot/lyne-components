import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';
import { SbbStepElement } from '../step/step.js';
import type { SbbStepLabelElement } from '../step-label.js';

import { SbbStepperElement } from './stepper.js';
import '../step-label.js';
import '../step.js';

describe('sbb-stepper', () => {
  let element: SbbStepperElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-stepper>
        <sbb-step-label>Step 1</sbb-step-label>
        <sbb-step>
          <div tabindex="0" id="step-one-content">Step one content.</div>
          <button sbb-stepper-next id="next-button-1">Next</button>
        </sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>
          <div tabindex="0">Step two content.</div>
          <button sbb-stepper-next>Next</button>
          <span sbb-stepper-previous>Back</span>
        </sbb-step>

        <sbb-step-label>Step 3</sbb-step-label>
        <sbb-step>
          <div tabindex="0">Step three content.</div>
          <span sbb-stepper-previous>Back</span>
        </sbb-step>

        <sbb-step-label disabled>Step 4</sbb-step-label>
        <sbb-step> <div tabindex="0">Step four content.</div> </sbb-step>
      </sbb-stepper>
    `);
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbStepperElement);
  });

  it('selects the first step by default', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;

    await waitForLitRender(element);
    expect(stepLabelOne).to.have.attribute('data-selected');
  });

  it('selects the correct step on label click and emits validate event', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    stepLabelThree.focus();
    stepLabelThree.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelThree).to.have.attribute('data-selected');
    expect(stepLabelThree.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).to.be.equal(stepLabelThree.id);
  });

  it('selects the correct step via `selected` and emits validate event', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    element.selected = stepLabelThree.step!;
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelThree).to.have.attribute('data-selected');
    expect(stepLabelThree.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelThree.id);
  });

  it('selects the correct step via `selectedIndex` and emits validate event', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    element.selectedIndex = 2;
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelThree).to.have.attribute('data-selected');
    expect(stepLabelThree.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelThree.id);
  });

  it('selects the next step on [sbb-stepper-next] click and emits validate event', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    stepperNext.focus();
    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).to.be.equal(stepLabelTwo.id);
  });

  it('selects the previous step on [sbb-stepper-previous] click', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepperPrevious = element.querySelector<HTMLElement>('[sbb-stepper-previous]')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    stepperNext.focus();
    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).to.be.equal(stepLabelTwo.id);

    stepperPrevious.click();
    await waitForLitRender(element);

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);
  });

  it('selects only the next step via [sbb-stepper-next] click in linear mode and emits validate event', async () => {
    const stepperNext = element.querySelector<HTMLElement>('[sbb-stepper-next]')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    element.linear = true;

    stepLabelThree.click();
    await waitForLitRender(element);

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');

    stepLabelTwo.click();
    await waitForLitRender(element);

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');

    stepperNext.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');
  });

  it('does not switch to the next step if the validate is prevented', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;
    const validate = new EventSpy(SbbStepElement.events.validate);

    element.addEventListener(SbbStepElement.events.validate, (ev) => ev.preventDefault());

    stepLabelThree.click();
    await waitForLitRender(element);

    await validate.calledOnce();
    expect(validate.count).to.be.equal(1);
    expect(stepLabelThree).not.to.have.attribute('data-selected');
    expect(stepLabelThree.step).not.to.have.attribute('data-selected');
  });

  it('resets the single form wrapping the stepper and returns to the first step', async () => {
    element = await fixture(html`
      <form>
        <sbb-stepper selected-index="0">
          <sbb-step-label>Step 1</sbb-step-label>
          <sbb-step>
            Step one content.
            <input name="first-input" />
          </sbb-step>

          <sbb-step-label>Step 2</sbb-step-label>
          <sbb-step>Step two content.</sbb-step>

          <sbb-step-label>Step 3</sbb-step-label>
          <sbb-step>
            Step three content.
            <input name="second-input" />
          </sbb-step>
        </sbb-stepper>
      </form>
    `);

    const stepper = element.querySelector<SbbStepperElement>('sbb-stepper')!;
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepInputOne = element.querySelector<HTMLInputElement>('input[name="first-input"]')!;
    const stepInputTwo = element.querySelector<HTMLInputElement>('input[name="second-input"]')!;

    element.selectedIndex = 2;

    // If the focus is inside the stepper, the focus is set to the first step label after the reset.
    stepLabelTwo.focus();

    stepInputOne.value = 'First value';
    stepInputTwo.value = 'Second value';

    stepper.reset();
    await waitForLitRender(element);

    expect(stepInputOne.value).to.be.equal('');
    expect(stepInputTwo.value).to.be.equal('');

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);
  });

  it('resets the form for each step and returns to the first step', async () => {
    element = await fixture(html`
      <sbb-stepper selected-index="0">
        <sbb-step-label>Step 1</sbb-step-label>
        <sbb-step>
          Step one content.
          <form>
            <input name="first-input" />
          </form>
        </sbb-step>

        <sbb-step-label>Step 2</sbb-step-label>
        <sbb-step>Step two content.</sbb-step>

        <sbb-step-label>Step 3</sbb-step-label>
        <sbb-step>
          Step three content.
          <form>
            <input name="second-input" />
          </form>
        </sbb-step>
      </sbb-stepper>
    `);

    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepInputOne = element.querySelector<HTMLInputElement>('input[name="first-input"]')!;
    const stepInputTwo = element.querySelector<HTMLInputElement>('input[name="second-input"]')!;

    element.selectedIndex = 2;

    // If the focus is not inside the stepper, the focus is not set to the first step label after the reset.
    document.body.focus();

    stepInputOne.value = 'First value';
    stepInputTwo.value = 'Second value';

    element.reset();
    await waitForLitRender(element);

    expect(stepInputOne.value).to.be.equal('');
    expect(stepInputTwo.value).to.be.equal('');

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');
    expect(document.activeElement!.id).not.to.be.equal(stepLabelOne.id);
  });

  it('focuses the correct element in the step content', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.id).to.be.equal(stepLabelOne.id);

    await sendKeys({ press: tabKey });
    expect(document.activeElement!.id).to.be.equal('step-one-content');
  });

  it('sets the correct aria-labelledby attributes', async () => {
    const steps: SbbStepElement[] = Array.from(
      element.querySelectorAll<SbbStepElement>('sbb-step'),
    );
    steps.forEach((step: SbbStepElement) =>
      expect(step).to.have.attribute('aria-labelledby', step.label!.id),
    );
  });

  it('selects step on right arrow key pressed', async () => {
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');
  });

  it('selects step on left arrow key pressed', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');

    await sendKeys({ press: 'ArrowLeft' });

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');
  });

  it('wraps around on arrow key navigation', async () => {
    const stepLabelOne = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(1)',
    )!;
    const stepLabelTwo = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(2)',
    )!;
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelTwo).to.have.attribute('data-selected');
    expect(stepLabelTwo.step).to.have.attribute('data-selected');

    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelThree).to.have.attribute('data-selected');
    expect(stepLabelThree.step).to.have.attribute('data-selected');

    await sendKeys({ press: 'ArrowRight' });

    expect(stepLabelOne).to.have.attribute('data-selected');
    expect(stepLabelOne.step).to.have.attribute('data-selected');
  });

  it('wraps around on arrow left arrow key navigation', async () => {
    const stepLabelThree = element.querySelector<SbbStepLabelElement>(
      'sbb-step-label:nth-of-type(3)',
    )!;

    await sendKeys({ press: tabKey });
    await sendKeys({ press: 'ArrowLeft' });

    expect(stepLabelThree).to.have.attribute('data-selected');
    expect(stepLabelThree.step).to.have.attribute('data-selected');
  });

  it('proxy size to step children', async () => {
    const stepLabels = Array.from(element.querySelectorAll<SbbStepLabelElement>('sbb-step-label')!);

    expect(stepLabels.every((l) => l.getAttribute('data-size') === element.size)).to.be.true;

    element.size = 's';
    await waitForLitRender(element);

    expect(stepLabels.every((l) => l.getAttribute('data-size') === element.size)).to.be.true;
  });
});
