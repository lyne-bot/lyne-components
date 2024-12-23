import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../../button.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbLinkElement } from '../../link.js';

import { SbbPopoverElement } from './popover.js';

import '../../button/button.js';
import '../../link.js';

describe(`sbb-popover`, () => {
  let element: SbbPopoverElement, trigger: SbbButtonElement;

  describe('with interactive content', () => {
    beforeEach(async () => {
      const content = await fixture(html`
        <span>
          <sbb-button id="popover-trigger">Popover trigger</sbb-button>
          <sbb-popover id="popover" trigger="popover-trigger">
            Popover content.
            <sbb-link id="popover-link" href="#" sbb-popover-close>Link</sbb-link>
          </sbb-popover>
          <!-- Place the button with a spacing to the popover so that it gets clickable. -->
          <sbb-button id="interactive-background-element" style="margin-block-start:100px">
            Other interactive element
          </sbb-button>
        </span>
      `);
      trigger = content.querySelector<SbbButtonElement>('sbb-button')!;
      element = content.querySelector<SbbPopoverElement>('sbb-popover')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbPopoverElement);
    });

    it('shows the popover', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);

      element.open();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('shows on trigger click', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);

      trigger.click();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('closes the popover', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.willClose, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);

      element.open();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      element.close();

      await willCloseEventSpy.calledOnce();
      expect(willCloseEventSpy.count).to.be.equal(1);

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('closes the popover on close button click', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.willClose, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);
      const closeButton = element.shadowRoot!.querySelector<HTMLElement>('[sbb-popover-close]')!;

      element.open();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      closeButton!.click();

      await willCloseEventSpy.calledOnce();
      expect(willCloseEventSpy.count).to.be.equal(1);

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('closes on interactive element click', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.willClose, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);
      const popoverLink = element.querySelector(':scope > sbb-link') as HTMLElement;

      trigger.click();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
      expect(popoverLink).not.to.be.null;

      popoverLink.click();

      await willCloseEventSpy.calledOnce();
      expect(willCloseEventSpy.count).to.be.equal(1);

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('is correctly positioned on screen', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);

      await setViewport({ width: 1200, height: 800 });

      trigger.click();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
        `--sbb-size-element-m`,
      );
      expect(buttonHeight.trim()).to.be.equal('3.5rem');

      const buttonHeightPx = parseFloat(buttonHeight) * 16;
      expect(trigger.offsetHeight).to.be.equal(buttonHeightPx);
      expect(trigger.offsetTop).to.be.equal(0);
      expect(trigger.offsetLeft).to.be.equal(0);

      // Expect overlay offsetTop to be equal to the trigger height + the overlay offset (8px)
      const popoverOverlay = element.shadowRoot!.querySelector<HTMLElement>('.sbb-popover')!;
      expect(popoverOverlay.offsetTop).to.be.equal(buttonHeightPx + 16);
      expect(popoverOverlay.offsetLeft).to.be.equal(0);
    });

    it('should set correct focus attribute on trigger after backdrop click', async () => {
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);

      element.open();

      await didOpenEventSpy.calledOnce();

      // Simulate backdrop click
      window.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 1 }));
      window.dispatchEvent(new PointerEvent('pointerup'));

      await didCloseEventSpy.calledOnce();

      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('should set correct focus attribute on trigger after backdrop click on an interactive element', async () => {
      const interactiveBackgroundElement = element.parentElement!.querySelector<SbbButtonElement>(
        '#interactive-background-element',
      )!;
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);

      element.open();

      await didOpenEventSpy.calledOnce();

      const interactiveElementPosition = interactiveBackgroundElement.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [
          Math.round(interactiveElementPosition.x + interactiveElementPosition.width / 2),
          Math.round(interactiveElementPosition.y + interactiveElementPosition.height / 2),
        ],
      });
      await didCloseEventSpy.calledOnce();

      expect(document.activeElement).to.be.equal(interactiveBackgroundElement);
    });

    it('closes on interactive element click by keyboard', async () => {
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);
      const popoverLink = element.querySelector<SbbLinkElement>(':scope > sbb-link')!;

      trigger.click();

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(popoverLink).not.to.be.null;

      popoverLink.focus();
      await sendKeys({ press: 'Enter' });

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('opens and closes with non-zero animation duration', async () => {
      element.style.setProperty('--sbb-popover-animation-duration', '1ms');

      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);
      const popoverLink = element.querySelector<SbbLinkElement>(':scope > sbb-link')!;

      trigger.click();

      await didOpenEventSpy.calledOnce();

      popoverLink.focus();
      await sendKeys({ press: 'Enter' });

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);
    });

    it('sets the focus to the first focusable element when the popover is opened by keyboard', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);

      await sendKeys({ press: tabKey });
      await sendKeys({ press: 'Enter' });

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      expect(document.activeElement).to.be.equal(element);
      expect(
        document.activeElement!.shadowRoot!.activeElement ===
          document.activeElement!.shadowRoot!.querySelector('[sbb-popover-close]'),
      ).to.be.equal(true);
    });

    it('closes the popover on close button click by keyboard', async () => {
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);
      const closeButton = document
        .querySelector('sbb-popover')!
        .shadowRoot!.querySelector<HTMLElement>('[sbb-popover-close]')!;

      element.open();

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      closeButton.focus();
      await sendKeys({ press: 'Enter' });

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('closes on Esc keypress', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.willClose, element);
      const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, element);

      trigger.click();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);

      await didOpenEventSpy.calledOnce();
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');

      await sendKeys({ press: tabKey });
      await sendKeys({ press: 'Escape' });

      await willCloseEventSpy.calledOnce();
      expect(willCloseEventSpy.count).to.be.equal(1);

      await didCloseEventSpy.calledOnce();
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement).to.be.equal(trigger);
    });

    it('does not open if prevented', async () => {
      const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.willOpen, element);

      element.addEventListener(SbbPopoverElement.events.willOpen, (ev) => ev.preventDefault());
      element.open();

      await willOpenEventSpy.calledOnce();
      expect(willOpenEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('does not close if prevented', async () => {
      const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, element);
      const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.willClose, element);

      element.open();
      await didOpenEventSpy.calledOnce();
      await waitForLitRender(element);

      element.addEventListener(SbbPopoverElement.events.willClose, (ev) => ev.preventDefault());
      element.close();

      await willCloseEventSpy.calledOnce();
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('should update config when changing hoverTrigger', async () => {
      // Assert trigger click ok
      trigger.click();
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      element.close();
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');

      // Assert hover does not trigger
      trigger.dispatchEvent(new Event('mouseenter'));
      await aTimeout(100);
      expect(element).to.have.attribute('data-state', 'closed');

      // Change to hover trigger
      element.hoverTrigger = true;
      await waitForLitRender(element);

      // Assert hover does trigger opening
      trigger.dispatchEvent(new Event('mouseenter'));
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');

      // Close again
      element.close();
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');

      // Assert click does not trigger
      trigger.click();
      await aTimeout(100);
      expect(element).to.have.attribute('data-state', 'closed');
    });
  });

  describe('with no interactive content', () => {
    let content: HTMLElement;

    beforeEach(async () => {
      content = await fixture(html`
        <span>
          <sbb-button id="popover-trigger">Popover trigger</sbb-button>
          <sbb-popover id="popover" trigger="popover-trigger" hide-close-button>
            Popover content.
          </sbb-popover>
          <!-- Place the button with a spacing to the popover so that it gets clickable. -->
          <sbb-button id="interactive-background-element" style="margin-block-start:100px">
            Other interactive element
          </sbb-button>
        </span>
      `);
      trigger = content.querySelector('sbb-button')!;
      element = content.querySelector('sbb-popover')!;
    });

    it('should focus content container if no interactive content present', async () => {
      const popoverContainer = element.shadowRoot!.querySelector('.sbb-popover');

      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then popover opens and focuses container
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(document.activeElement!.shadowRoot!.activeElement).to.equal(popoverContainer);
      expect(popoverContainer).to.have.attribute('tabindex', '0');

      // When tabbing away
      await sendKeys({ press: tabKey });

      // Then popover should close, next element should be focused and popover container be reset.
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');
      expect(document.activeElement).to.equal(
        content.querySelector('#interactive-background-element'),
      );
      expect(popoverContainer).not.to.have.attribute('tabindex');
    });

    it('should remove tabindex when closing with esc', async () => {
      const popoverContainer = element.shadowRoot!.querySelector('.sbb-popover');

      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then popover opens and focuses container
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(document.activeElement!.shadowRoot!.activeElement).to.equal(popoverContainer);
      expect(popoverContainer).to.have.attribute('tabindex', '0');

      // When pressing escape key
      await sendKeys({ press: 'Escape' });

      // Then popover should close, trigger should be focused and popover container be reset.
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');
      expect(document.activeElement).to.equal(trigger);
      expect(popoverContainer).not.to.have.attribute('tabindex');
    });
  });

  it('should close an open popover when another one is opened', async () => {
    const root = await fixture(html`
      <div>
        <sbb-button id="interactive-background-element">Other interactive element</sbb-button>
        <sbb-button id="popover-trigger">Popover trigger</sbb-button>
        <sbb-button id="another-popover-trigger">Another popover trigger</sbb-button>
        <sbb-popover id="popover" trigger="popover-trigger"> Popover content. </sbb-popover>
        <sbb-popover id="another-popover" trigger="another-popover-trigger">
          Another popover content.
        </sbb-popover>
      </div>
    `);
    trigger = root.querySelector<SbbButtonElement>('#popover-trigger')!;
    element = root.querySelector<SbbPopoverElement>('#popover')!;
    const secondTrigger = root.querySelector<SbbButtonElement>('#another-popover-trigger');
    const secondElement = root.querySelector<SbbPopoverElement>('#another-popover');

    const willOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, null, {
      capture: true,
    });
    const didOpenEventSpy = new EventSpy(SbbPopoverElement.events.didOpen, null, { capture: true });
    const willCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, null, {
      capture: true,
    });
    const didCloseEventSpy = new EventSpy(SbbPopoverElement.events.didClose, null, {
      capture: true,
    });

    expect(secondTrigger).not.to.be.null;
    expect(secondElement).not.to.be.null;

    trigger.focus();
    await sendKeys({ press: 'Space' });

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();

    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    trigger.focus();
    await sendKeys({ press: tabKey });

    expect(document.activeElement!.id).to.be.equal('another-popover-trigger');

    await sendKeys({ press: 'Space' });

    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');

    await willOpenEventSpy.calledTimes(2);
    expect(willOpenEventSpy.count).to.be.equal(2);

    await didOpenEventSpy.calledTimes(2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(secondElement).to.have.attribute('data-state', 'opened');
  });
});
