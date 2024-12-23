import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbRadioButtonPanelElement } from './radio-button-panel.js';

describe(`sbb-radio-button`, () => {
  let element: SbbRadioButtonPanelElement;

  beforeEach(async () => {
    element = await fixture(
      html`<sbb-radio-button-panel value="Value">Value label</sbb-radio-button-panel>`,
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbRadioButtonPanelElement);
  });

  it('should not render accessibility label about containing state', async () => {
    element = element.shadowRoot!.querySelector('.sbb-screen-reader-only:not(input)')!;
    expect(element).not.to.be.ok;
  });

  it('selects radio on click', async () => {
    const stateChange = new EventSpy(SbbRadioButtonPanelElement.events.stateChange);

    element.click();
    await waitForLitRender(element);

    expect(element.checked).to.be.true;
    expect(element).to.have.attribute('data-checked');
    await stateChange.calledOnce();
    expect(stateChange.count).to.be.equal(1);
  });

  it('does not deselect radio if already checked', async () => {
    const stateChange = new EventSpy(SbbRadioButtonPanelElement.events.stateChange);

    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;
    await stateChange.calledOnce();
    expect(stateChange.count).to.be.equal(1);

    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;
    await stateChange.calledOnce();
    expect(stateChange.count).to.be.equal(1);
  });

  it('allows empty selection', async () => {
    const stateChange = new EventSpy(SbbRadioButtonPanelElement.events.stateChange);

    element.allowEmptySelection = true;
    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.true;
    await stateChange.calledOnce();
    expect(stateChange.count).to.be.equal(1);

    element.click();
    await waitForLitRender(element);
    expect(element.checked).to.be.false;
    await stateChange.calledTimes(2);
    expect(stateChange.count).to.be.equal(2);
  });
});
