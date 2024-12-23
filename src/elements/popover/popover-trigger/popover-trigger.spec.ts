import { assert, expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import { SbbPopoverElement } from '../popover.js';

import { SbbPopoverTriggerElement } from './popover-trigger.js';

import '../../icon.js';
import '../../link/link.js';

describe(`sbb-popover-trigger`, () => {
  let element: SbbPopoverTriggerElement, popover: SbbPopoverElement;

  beforeEach(async () => {
    const root = await fixture(html`
      <div>
        <sbb-popover-trigger id="popover-trigger"></sbb-popover-trigger>
        <sbb-popover id="popover" trigger="popover-trigger">
          Popover content.
          <sbb-link id="popover-link" sbb-popover-close>Link</sbb-link>
        </sbb-popover>
      </div>
    `);
    element = root.querySelector<SbbPopoverTriggerElement>('sbb-popover-trigger')!;
    popover = root.querySelector<SbbPopoverElement>('sbb-popover')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbPopoverTriggerElement);
  });

  it('shows popover on popover-trigger click', async () => {
    const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, popover);
    const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, popover);

    element.click();

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it("doesn't show popover on disabled popover-trigger click", async () => {
    const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, popover);
    element.disabled = true;
    await waitForLitRender(element);

    element.click();
    await waitForLitRender(element);

    expect(willOpenEventSpy.count).to.be.equal(0);
    expect(popover).to.have.attribute('data-state', 'closed');
  });

  it('shows popover on keyboard event', async () => {
    const focusSpy = new EventSpy('focus', element);

    element.focus();
    await focusSpy.calledOnce();
    expect(focusSpy.count).to.be.equal(1);

    await sendKeys({ press: 'Enter' });
    await waitForCondition(() => popover.getAttribute('data-state') === 'opened');

    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it('shows popover on keyboard event with hover-trigger', async () => {
    const changeSpy = new EventSpy('focus', element);

    popover.hoverTrigger = true;
    element.focus();

    await changeSpy.calledOnce();
    expect(changeSpy.count).to.be.equal(1);

    await sendKeys({ press: 'Enter' });
    await waitForCondition(() => popover.getAttribute('data-state') === 'opened');

    expect(popover).to.have.attribute('data-state', 'opened');
  });

  it("doesn't focus popover-trigger on keyboard event when disabled", async () => {
    const changeSpy = new EventSpy('focus', element);

    element.disabled = true;
    popover.hoverTrigger = true;
    await waitForLitRender(element);

    element.focus();

    await waitForLitRender(element);

    expect(changeSpy.count).not.to.be.greaterThan(0);
    expect(popover).to.have.attribute('data-state', 'closed');
  });
});
