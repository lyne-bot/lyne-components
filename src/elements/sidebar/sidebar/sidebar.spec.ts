import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, sendMouse, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbSidebarCloseButtonElement } from '../sidebar-close-button.js';
import type { SbbSidebarContainerElement } from '../sidebar-container.js';
import type { SbbSidebarContentElement } from '../sidebar-content.js';

import { SbbSidebarElement } from './sidebar.js';

import '../sidebar-close-button.js';
import '../sidebar-container.js';
import '../sidebar-content.js';
import '../sidebar-title.js';

describe('sbb-sidebar', () => {
  let container: SbbSidebarContainerElement,
    element: SbbSidebarElement,
    content: SbbSidebarContentElement,
    closeButton: SbbSidebarCloseButtonElement,
    scrollContext: HTMLDivElement;

  beforeEach(async () => {
    container = await fixture(
      html`<sbb-sidebar-container>
        <sbb-sidebar>
          <sbb-sidebar-title>Title</sbb-sidebar-title>
          <sbb-sidebar-close-button></sbb-sidebar-close-button>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
          <p>Content</p>
        </sbb-sidebar>
        <sbb-sidebar-content>
          Content
          <button id="b1">Focusable element</button>
          <button id="b2">Focusable element 2</button>
        </sbb-sidebar-content>
      </sbb-sidebar-container>`,
    );

    // We run the tests in a defined size where we have enough space to open the sidebar in mode side.
    await setViewport({ width: 800, height: 600 });

    element = container.querySelector('sbb-sidebar')!;
    content = container.querySelector('sbb-sidebar-content')!;
    closeButton = container.querySelector('sbb-sidebar-close-button')!;
    scrollContext = element.shadowRoot!.querySelector('.sbb-sidebar-content-section')!;
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbSidebarElement);
  });

  describe('properties', () => {
    it('should return container', () => {
      expect(element.container).to.be.equal(container);
    });

    it('should coerce position property', async () => {
      expect(element.position, 'default position').to.be.equal('start');

      element.position = 'end';
      await waitForLitRender(element);

      expect(element.position, 'end position').to.be.equal('end');
      expect(element).to.have.attribute('position', 'end');

      element.position = 'inexisting' as 'start';
      await waitForLitRender(element);

      expect(element.position, 'fallback to default').to.be.equal('start');
      expect(element).to.have.attribute('position', 'start');

      element.position = null as unknown as 'start';
      await waitForLitRender(element);

      expect(element.position, 'fallback null to default').to.be.equal('start');
      expect(element).to.have.attribute('position', 'start');
    });

    it('should coerce position attribute', () => {
      expect(element.position, 'default position').to.be.equal('start');

      element.setAttribute('position', 'end');
      expect(element.position, 'end position').to.be.equal('end');

      element.setAttribute('position', 'inexisting');
      expect(element.position, 'fallback to default').to.be.equal('start');

      element.setAttribute('position', '');
      expect(element.position, 'fallback null to default').to.be.equal('start');
    });

    it('should coerce color property', async () => {
      expect(element.color, 'default color').to.be.equal('white');

      element.color = 'milk';
      await waitForLitRender(element);

      expect(element.color, 'milk color').to.be.equal('milk');
      expect(element).to.have.attribute('color', 'milk');

      element.color = 'inexisting' as 'white';
      await waitForLitRender(element);

      expect(element.color, 'fallback to default').to.be.equal('white');
      expect(element).to.have.attribute('color', 'white');

      element.color = null as unknown as 'white';
      await waitForLitRender(element);

      expect(element.color, 'fallback null to default').to.be.equal('white');
      expect(element).to.have.attribute('color', 'white');
    });

    it('should coerce color attribute', () => {
      expect(element.color, 'default color').to.be.equal('white');

      element.setAttribute('color', 'milk');
      expect(element.color, 'milk color').to.be.equal('milk');

      element.setAttribute('color', 'inexisting');
      expect(element.color, 'fallback to default').to.be.equal('white');

      element.setAttribute('color', '');
      expect(element.color, 'fallback null to default').to.be.equal('white');
    });

    it('should coerce mode property', async () => {
      expect(element.mode, 'default mode').to.be.equal('side');

      element.mode = 'over';
      await waitForLitRender(element);

      expect(element.mode, 'over mode').to.be.equal('over');
      expect(element).to.have.attribute('mode', 'over');

      element.mode = 'inexisting' as 'side';
      await waitForLitRender(element);

      expect(element.mode, 'fallback to default').to.be.equal('side');
      expect(element).to.have.attribute('mode', 'side');

      element.mode = null as unknown as 'side';
      await waitForLitRender(element);

      expect(element.mode, 'fallback null to default').to.be.equal('side');
      expect(element).to.have.attribute('mode', 'side');
    });

    it('should coerce mode attribute', () => {
      expect(element.mode, 'default mode').to.be.equal('side');

      element.setAttribute('mode', 'over');
      expect(element.mode, 'over mode').to.be.equal('over');

      element.setAttribute('mode', 'inexisting');
      expect(element.mode, 'fallback to default').to.be.equal('side');

      element.setAttribute('mode', '');
      expect(element.mode, 'fallback null to default').to.be.equal('side');
    });

    it('should update sidebar width when changing position', () => {
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('320px');
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__end-width'),
      ).to.be.equal('');

      element.position = 'end';

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('');
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__end-width'),
      ).to.be.equal('320px');
    });

    it('should toggle sidebar with opened property', async () => {
      element.opened = true;
      await waitForLitRender(element);

      expect(element.isOpen).to.be.true;
      expect(element.opened).to.be.true;
      expect(element).to.have.attribute('opened', '');

      element.opened = false;
      await waitForLitRender(element);

      expect(element.isOpen).to.be.false;
      expect(element.opened).to.be.false;
      expect(element).not.to.have.attribute('opened');
    });

    it('should manage focus when mode changes', async () => {
      element.opened = true;

      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;
      closeButton.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is not trapped as it is in side mode
      expect(document.activeElement).not.to.be.equal(closeButton);

      element.mode = 'over';
      await waitForLitRender(element);
      // Opening should focus the close button
      expect(document.activeElement).to.be.equal(closeButton);

      // Expect that focus is trapped as it is in over mode
      await sendKeys({ press: tabKey });
      expect(document.activeElement).to.be.equal(closeButton);

      element.mode = 'side';
      await waitForLitRender(element);
      await sendKeys({ press: tabKey });

      // Expect that focus is not trapped as it is in side mode
      expect(document.activeElement).not.to.be.equal(closeButton);
    });

    it('should ignore focus trap when mode changes and sidebar is closed', async () => {
      element.mode = 'over';
      await waitForLitRender(element);

      container.querySelector<HTMLButtonElement>('#b1')!.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is trapped as it is in over mode
      expect(document.activeElement!.id).to.be.equal('b2');
    });
  });

  describe('opening and closing', () => {
    it('should toggle the sidebar', async () => {
      const didOpenEventSpy = new EventSpy(SbbSidebarElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbSidebarElement.events.didClose, element);

      element.toggle();

      await didOpenEventSpy.calledOnce();
      expect(element.isOpen).to.be.true;

      element.toggle();

      await didCloseEventSpy.calledOnce();
      expect(element.isOpen).to.be.false;
    });

    it('should open programmatically', async () => {
      const willOpenEventSpy = new EventSpy(SbbSidebarElement.events.willOpen, element);
      const didOpenEventSpy = new EventSpy(SbbSidebarElement.events.didOpen, element);

      element.open();
      await willOpenEventSpy.calledOnce();
      await didOpenEventSpy.calledOnce();
      await element.animationComplete;

      expect(willOpenEventSpy.count).to.be.equal(1);
      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(element.opened).to.be.true;
      expect(element.isOpen).to.be.true;

      await aTimeout(0);
      expect(element).not.to.have.attribute('data-skip-animation');
    });

    it('should abort opening when defaultPrevented', async () => {
      element.addEventListener(SbbSidebarElement.events.willOpen, (ev) => ev.preventDefault());

      element.open();

      expect(element.isOpen).to.be.false;
    });

    it('should take focus when opening in mode over', async () => {
      element.mode = 'over';
      await waitForLitRender(container);

      element.open();
      expect(element.isOpen).to.be.true;

      await sendKeys({ press: tabKey });

      expect(document.activeElement).to.be.equal(closeButton);
      expect(content).to.have.attribute('inert');
    });

    it('should release focus when closing in mode over', async () => {
      element.mode = 'over';
      await waitForLitRender(container);

      element.open();
      expect(element.isOpen).to.be.true;

      await waitForLitRender(container);

      element.close();
      expect(element.isOpen).to.be.false;
      await waitForLitRender(container);
      expect(document.activeElement!.localName).to.be.equal('body');
      expect(content).not.to.have.attribute('inert');

      // With the following test we ensure that the previously registered escape listener
      // doesn't run anymore (proofs that we called _windowEventsController?.abort()).
      element.mode = 'side';
      element.opened = true;
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;
    });

    it('should release focus when closing in mode side', async () => {
      container.querySelector<HTMLButtonElement>('#b1')!.focus();
      element.open();
      expect(element.isOpen).to.be.true;

      closeButton.focus();

      element.close();
      expect(document.activeElement!.id).to.be.equal('b1');
    });

    it('should release focus when closing in mode side and no previous focused element', async () => {
      element.open();
      expect(element.isOpen).to.be.true;

      closeButton.focus();

      element.close();
      expect(document.activeElement!.localName).to.be.equal('body');
    });

    it('should be inert when opening in forced mode over', async () => {
      await setViewport({ width: 400, height: 400 });

      // Wait for resizeObserver of container to be triggered
      await waitForCondition(() => element.hasAttribute('data-minimum-space'));

      element.open();
      expect(element.isOpen).to.be.true;
      expect(content).to.have.attribute('inert');
    });

    it('should close programmatically', async () => {
      container.querySelector<HTMLButtonElement>('#b1')!.focus();

      element.open();
      await waitForLitRender(container);

      const willCloseEventSpy = new EventSpy(SbbSidebarElement.events.willClose, element);
      const didCloseEventSpy = new EventSpy(SbbSidebarElement.events.didClose, element);

      // Focus should be inside sidebar to test changing focus
      closeButton.focus();
      element.close();

      await willCloseEventSpy.calledOnce();
      await didCloseEventSpy.calledOnce();
      await element.animationComplete;

      expect(willCloseEventSpy.count).to.be.equal(1);
      expect(didCloseEventSpy.count).to.be.equal(1);
      expect(element.opened).to.be.false;
      expect(element.isOpen).to.be.false;

      await aTimeout(0);
      expect(element).not.to.have.attribute('data-skip-animation');

      // As the sidebar is closed, focus should be on the last focused element before opening the sidebar;
      expect(document.activeElement!.id).to.be.equal('b1');
    });

    it('should abort closing when defaultPrevented', async () => {
      element.open();
      element.addEventListener(SbbSidebarElement.events.willClose, (ev) => ev.preventDefault());

      element.close();

      expect(element.isOpen).to.be.true;
    });

    it('opens and closes with non-zero animation duration', async () => {
      container.style.setProperty('--sbb-sidebar-container-animation-duration', '1ms');
      const didOpenEventSpy = new EventSpy(SbbSidebarElement.events.didOpen, element);
      const didCloseEventSpy = new EventSpy(SbbSidebarElement.events.didClose, element);

      element.open();
      await didOpenEventSpy.calledOnce();
      await element.animationComplete;

      element.close();
      await didCloseEventSpy.calledOnce();
      await element.animationComplete;

      expect(didOpenEventSpy.count).to.be.equal(1);
      expect(didCloseEventSpy.count).to.be.equal(1);
    });

    it('should close on close button click', async () => {
      element.opened = true;
      await waitForLitRender(element);

      closeButton.click();
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    for (const key of ['Enter', 'Space']) {
      it(`should close when pressing ${key} on close button`, async () => {
        element.opened = true;
        await waitForLitRender(element);

        closeButton.focus();
        await sendKeys({ press: key });

        await waitForLitRender(element);
        expect(element.opened).to.be.false;
      });
    }

    it('should close on backdrop click', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      window.dispatchEvent(new CustomEvent('pointerdown'));
      window.dispatchEvent(new CustomEvent('pointerup'));
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    it('should not close on backdrop click when releasing on sidebar', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      const positionRect = element.shadowRoot!.firstElementChild!.getBoundingClientRect();

      await sendMouse({
        type: 'move',
        position: [0, 0],
      });

      await sendMouse({ type: 'down' });

      await sendMouse({
        type: 'move',
        position: [
          Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
          Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
        ],
      });

      await sendMouse({ type: 'up' });

      await waitForLitRender(element);

      expect(element.opened).to.be.true;
    });

    it('should not close on backdrop click when starting on sidebar', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      const positionRect = element.shadowRoot!.firstElementChild!.getBoundingClientRect();

      await sendMouse({
        type: 'move',
        position: [
          Math.round(positionRect.x + window.scrollX + positionRect.width / 2),
          Math.round(positionRect.y + window.scrollY + positionRect.height / 2),
        ],
      });

      await sendMouse({ type: 'down' });

      await sendMouse({
        type: 'move',
        position: [0, 0],
      });

      await sendMouse({ type: 'up' });

      await waitForLitRender(element);

      expect(element.opened).to.be.true;
    });

    it('should close on Escape key press', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      expect(element.opened).to.be.false;
    });

    it('should handle initial opened state', async () => {
      container = await fixture(
        html`<sbb-sidebar-container>
          <sbb-sidebar opened>Content</sbb-sidebar>
          <sbb-sidebar-content>Content</sbb-sidebar-content>
        </sbb-sidebar-container>`,
      );

      element = container.querySelector('sbb-sidebar')!;

      expect(element).to.have.attribute('data-skip-animation');

      await waitForCondition(() => !element.hasAttribute('data-skip-animation'));
    });

    it('should handle initial opened state with non-zero animation time', async () => {
      container = await fixture(
        html`<sbb-sidebar-container style="--sbb-sidebar-container-animation-duration: 1ms">
          <sbb-sidebar opened>Content</sbb-sidebar>
          <sbb-sidebar-content>Content</sbb-sidebar-content>
        </sbb-sidebar-container>`,
      );

      element = container.querySelector('sbb-sidebar')!;

      expect(element).to.have.attribute('data-skip-animation');

      await waitForCondition(() => !element.hasAttribute('data-skip-animation'));
    });

    describe('status change during animation', () => {
      beforeEach(() => {
        container.style.setProperty('--sbb-sidebar-container-animation-duration', '10ms');
      });

      it('should allow closing during opening', async () => {
        element.open();
        expect(element).to.have.attribute('data-state', 'opening');
        expect(element.opened).to.be.true;

        element.close();
        expect(element.opened).to.be.false;
        expect(element).to.have.attribute('data-state', 'closing');
      });

      it('should allow opening during closing', async () => {
        const didOpenEventSpy = new EventSpy(SbbSidebarElement.events.didOpen, element);

        element.open();
        await didOpenEventSpy.calledOnce();

        element.close();
        expect(element).to.have.attribute('data-state', 'closing');
        expect(element.opened).to.be.false;

        element.open();
        expect(element.opened).to.be.true;
        expect(element).to.have.attribute('data-state', 'opening');
      });

      it('should allow toggling during opening', async () => {
        element.open();
        expect(element).to.have.attribute('data-state', 'opening');
        expect(element.opened).to.be.true;

        element.close();
        expect(element.opened).to.be.false;
        expect(element).to.have.attribute('data-state', 'closing');
      });

      it('should prevent double open() call', async () => {
        const willOpenEventSpy = new EventSpy(SbbSidebarElement.events.willOpen, element);

        element.open();
        await aTimeout(2);
        element.open();

        await willOpenEventSpy.calledOnce();
        expect(element.opened).to.be.true;
        expect(willOpenEventSpy.count).to.be.equal(1);
      });

      it('should prevent double close() call', async () => {
        const didOpenEventSpy = new EventSpy(SbbSidebarElement.events.didOpen, element);
        const willCloseEventSpy = new EventSpy(SbbSidebarElement.events.willClose, element);

        element.open();
        await didOpenEventSpy.calledOnce();

        element.close();
        await aTimeout(2);
        element.close();

        await willCloseEventSpy.calledOnce();
        expect(element.opened).to.be.false;
        expect(willCloseEventSpy.count).to.be.equal(1);
      });
    });
  });

  describe('reacting to environment', () => {
    it('should return correct container when moving', async () => {
      expect(element.container).to.be.equal(container);

      element.remove();
      expect(element.container).to.be.equal(null);

      container.appendChild(element);
      expect(element.container).to.be.equal(container);
    });

    it('should update sidebar width when re-connected', async () => {
      element.remove();
      element.style.width = '200px';

      expect(getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'))
        .to.be.empty;

      container.appendChild(element);

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('200px');
    });

    it('should update sidebar width when resizing', async () => {
      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('320px');

      element.style.width = '330px';
      // It takes around 30ms to get the resize observer triggered
      await waitForCondition(
        () =>
          getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width') ===
          '330px',
      );

      expect(
        getComputedStyle(container).getPropertyValue('--sbb-sidebar-container__start-width'),
      ).to.be.equal('330px');
    });

    it('should take focus when connecting in mode over', async () => {
      element.remove();
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;

      container.appendChild(element);
      await waitForLitRender(element);

      expect(document.activeElement).to.be.equal(closeButton);
    });

    it('should reset focus when disconnecting in mode over', async () => {
      element.mode = 'over';
      element.opened = true;
      await waitForLitRender(element);
      expect(element.isOpen).to.be.true;

      closeButton.focus();
      await sendKeys({ press: tabKey });

      // Expect that focus is trapped
      expect(document.activeElement).to.be.equal(closeButton);

      element.remove();
      await waitForLitRender(element);

      // When connected, escape would trigger a close, but after disconnection it shouldn't happen.
      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      expect(element.isOpen).to.be.true;
      expect(document.activeElement).not.to.be.equal(closeButton);
    });

    it('should detect scrolled state', async () => {
      element.opened = true;

      await setViewport({ width: 800, height: 200 });
      await waitForLitRender(element);
      expect(element).not.to.have.attribute('data-scrolled');

      scrollContext.scrollTo({ top: 1, behavior: 'instant' });

      // It takes around 30ms to get the scrolled event parsed
      await waitForCondition(() => element.hasAttribute('data-scrolled'));
      expect(element).to.have.attribute('data-scrolled');
    });
  });
});
