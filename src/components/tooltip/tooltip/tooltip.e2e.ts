import { assert, aTimeout, expect, fixture } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../../button';
import { waitForCondition, waitForLitRender, EventSpy } from '../../core/testing';

import '../../link';
import { SbbTooltipElement } from './tooltip';

describe('sbb-tooltip', () => {
  let element: SbbTooltipElement, trigger: SbbButtonElement;

  describe('with interactive content', () => {
    beforeEach(async () => {
      const content = await fixture(html`
        <span>
          <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
          <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
            Tooltip content.
            <sbb-link id="tooltip-link" href="#" variant="inline" sbb-tooltip-close>Link</sbb-link>
          </sbb-tooltip>
          <sbb-link href="#" id="interactive-background-element"
            >Other interactive element</sbb-link
          >
        </span>
      `);
      trigger = content.querySelector<SbbButtonElement>('sbb-button')!;
      element = content.querySelector<SbbTooltipElement>('sbb-tooltip')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbTooltipElement);
    });

    it('shows the tooltip', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);

      element.open();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('shows on trigger click', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);

      trigger.click();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('closes the tooltip', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);

      element.open();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      element.close();

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('closes the tooltip on close button click', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);
      const closeButton = element.shadowRoot!.querySelector<HTMLElement>('[sbb-tooltip-close]')!;

      element.open();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      closeButton!.click();

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('closes on interactive element click', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);
      const tooltipLink = document.querySelector('sbb-tooltip > sbb-link') as HTMLElement;

      trigger.click();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');
      expect(tooltipLink).not.to.be.null;

      tooltipLink.click();

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('is correctly positioned on screen', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);

      await setViewport({ width: 1200, height: 800 });

      trigger.click();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      const buttonHeight = getComputedStyle(document.documentElement).getPropertyValue(
        `--sbb-size-button-l-min-height-large`,
      );
      expect(buttonHeight.trim()).to.be.equal('3.5rem');

      const buttonHeightPx = parseFloat(buttonHeight) * 16;
      const button = document.querySelector<SbbButtonElement>('sbb-button')!;
      expect(button.offsetHeight).to.be.equal(buttonHeightPx);
      expect(button.offsetTop).to.be.equal(0);
      expect(button.offsetLeft).to.be.equal(0);

      // Expect overlay offsetTop to be equal to the trigger height + the overlay offset (8px)
      const tooltipOverlay = element.shadowRoot!.querySelector<HTMLElement>('.sbb-tooltip')!;
      expect(tooltipOverlay.offsetTop).to.be.equal(buttonHeightPx + 16);
      expect(tooltipOverlay.offsetLeft).to.be.equal(0);
    });

    it('should set correct focus attribute on trigger after backdrop click', async () => {
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);

      element.open();

      await waitForCondition(() => didOpenEventSpy.events.length === 1);

      // Simulate backdrop click
      window.dispatchEvent(new MouseEvent('mousedown', { buttons: 1, clientX: 1 }));
      window.dispatchEvent(new PointerEvent('pointerup'));

      await waitForCondition(() => didCloseEventSpy.events.length === 1);

      expect(trigger).to.have.attribute('data-focus-origin', 'mouse');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('should set correct focus attribute on trigger after backdrop click on an interactive element', async () => {
      const interactiveBackgroundElement = document.querySelector(
        '#interactive-background-element',
      ) as HTMLElement;
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);

      element.open();

      await waitForCondition(() => didOpenEventSpy.events.length === 1);

      const interactiveElementPosition = interactiveBackgroundElement.getBoundingClientRect();
      await sendMouse({
        type: 'click',
        position: [
          interactiveElementPosition.x + interactiveElementPosition.width / 2,
          interactiveElementPosition.y + interactiveElementPosition.height / 2,
        ],
      });
      await waitForCondition(() => didCloseEventSpy.events.length === 1);

      expect(document.activeElement!.id).to.be.equal('interactive-background-element');
    });

    it('closes on interactive element click by keyboard', async () => {
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);
      const tooltipLink = document.querySelector('sbb-tooltip > sbb-link') as HTMLElement;

      trigger.click();

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(tooltipLink).not.to.be.null;

      tooltipLink.focus();
      await sendKeys({ down: 'Enter' });

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('sets the focus to the first focusable element when the tooltip is opened by keyboard', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);

      await sendKeys({ down: 'Tab' });
      await sendKeys({ down: 'Enter' });

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element).to.have.attribute('data-state', 'opened');

      expect(document.activeElement!.id).to.be.equal('tooltip');
      expect(
        document.activeElement!.shadowRoot!.activeElement ===
          document.activeElement!.shadowRoot!.querySelector('[sbb-tooltip-close]'),
      ).to.be.equal(true);
    });

    it('closes the tooltip on close button click by keyboard', async () => {
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);
      const closeButton = document
        .querySelector('sbb-tooltip')!
        .shadowRoot!.querySelector<HTMLElement>('[sbb-tooltip-close]')!;

      element.open();

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      closeButton.focus();
      await sendKeys({ down: 'Enter' });

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('closes on Esc keypress', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.willClose);
      const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);

      trigger.click();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      expect(didOpenEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'opened');

      await sendKeys({ down: 'Tab' });
      await sendKeys({ down: 'Escape' });

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
      expect(willCloseEventSpy.count).to.be.equal(1);

      await waitForCondition(() => didCloseEventSpy.events.length === 1);
      expect(didCloseEventSpy.count).to.be.equal(1);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(trigger).to.have.attribute('data-focus-origin', 'keyboard');
      expect(document.activeElement!.id).to.be.equal('tooltip-trigger');
    });

    it('does not open if prevented', async () => {
      const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.willOpen);

      element.addEventListener(SbbTooltipElement.events.willOpen, (ev) => ev.preventDefault());
      element.open();

      await waitForCondition(() => willOpenEventSpy.events.length === 1);
      expect(willOpenEventSpy.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('does not close if prevented', async () => {
      const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
      const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.willClose);

      element.open();
      await waitForCondition(() => didOpenEventSpy.events.length === 1);
      await waitForLitRender(element);

      element.addEventListener(SbbTooltipElement.events.willClose, (ev) => ev.preventDefault());
      element.close();

      await waitForCondition(() => willCloseEventSpy.events.length === 1);
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
          <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
          <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation hide-close-button>
            Tooltip content.
          </sbb-tooltip>
          <sbb-link href="#" id="interactive-background-element"
            >Other interactive element</sbb-link
          >
        </span>
      `);
      trigger = content.querySelector<SbbButtonElement>('sbb-button')!;
      element = content.querySelector<SbbTooltipElement>('sbb-tooltip')!;
    });

    it('should focus content container if no interactive content present', async () => {
      const tooltipContainer = element.shadowRoot!.querySelector('.sbb-tooltip');

      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then tooltip opens and focuses container
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(document.activeElement!.shadowRoot!.activeElement).to.equal(tooltipContainer);
      expect(tooltipContainer).to.have.attribute('tabindex', '0');

      // When tabbing away
      await sendKeys({ press: 'Tab' });

      // Then tooltip should close, next element should be focused and tooltip container be reset.
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');
      expect(document.activeElement).to.equal(
        content.querySelector('#interactive-background-element'),
      );
      expect(tooltipContainer).not.to.have.attribute('tabindex');
    });

    it('should remove tabindex when closing with esc', async () => {
      const tooltipContainer = element.shadowRoot!.querySelector('.sbb-tooltip');

      // When opening by keyboard
      trigger.focus();
      await sendKeys({ press: 'Space' });

      // Then tooltip opens and focuses container
      await waitForCondition(() => element.getAttribute('data-state') === 'opened');
      expect(document.activeElement!.shadowRoot!.activeElement).to.equal(tooltipContainer);
      expect(tooltipContainer).to.have.attribute('tabindex', '0');

      // When pressing escape key
      await sendKeys({ press: 'Escape' });

      // Then tooltip should close, trigger should be focused and tooltip container be reset.
      await waitForCondition(() => element.getAttribute('data-state') === 'closed');
      expect(document.activeElement).to.equal(trigger);
      expect(tooltipContainer).not.to.have.attribute('tabindex');
    });
  });

  it('should close an open tooltip when another one is opened', async () => {
    await fixture(html`
      <sbb-link href="#somewhere" id="interactive-background-element"
        >Other interactive element</sbb-link
      >
      <sbb-button id="tooltip-trigger">Tooltip trigger</sbb-button>
      <sbb-button id="another-tooltip-trigger">Another tooltip trigger</sbb-button>
      <sbb-tooltip id="tooltip" trigger="tooltip-trigger" disable-animation>
        Tooltip content.
      </sbb-tooltip>
      <sbb-tooltip id="another-tooltip" trigger="another-tooltip-trigger" disable-animation>
        Another tooltip content.
      </sbb-tooltip>
    `);
    trigger = document.querySelector<SbbButtonElement>('#tooltip-trigger')!;
    element = document.querySelector<SbbTooltipElement>('#tooltip')!;
    const secondTrigger = document.querySelector<SbbButtonElement>('#another-tooltip-trigger');
    const secondElement = document.querySelector<SbbTooltipElement>('#another-tooltip');

    const willOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
    const didOpenEventSpy = new EventSpy(SbbTooltipElement.events.didOpen);
    const willCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose);
    const didCloseEventSpy = new EventSpy(SbbTooltipElement.events.didClose, element);

    expect(secondTrigger).not.to.be.null;
    expect(secondElement).not.to.be.null;

    trigger.focus();
    await sendKeys({ press: 'Space' });

    await waitForCondition(() => willOpenEventSpy.events.length === 1);
    expect(willOpenEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didOpenEventSpy.events.length === 1);

    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    trigger.focus();
    await sendKeys({ press: 'Tab' });

    expect(document.activeElement!.id).to.be.equal('another-tooltip-trigger');

    await sendKeys({ press: 'Space' });

    await waitForCondition(() => willCloseEventSpy.events.length === 1);
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForCondition(() => didCloseEventSpy.events.length === 1);
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');

    await waitForCondition(() => willOpenEventSpy.events.length === 2);
    expect(willOpenEventSpy.count).to.be.equal(2);

    await waitForCondition(() => didOpenEventSpy.events.length === 2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(secondElement).to.have.attribute('data-state', 'opened');
  });
});
