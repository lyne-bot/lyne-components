import { assert, aTimeout, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../../button.js';
import { isWebkit } from '../../core/dom.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForLitRender } from '../../core/testing.js';

import { SbbMenuElement } from './menu.js';

import '../../button/button.js';
import '../../link.js';
import '../../divider.js';
import '../menu-button.js';

describe(`sbb-menu`, () => {
  let element: SbbMenuElement, trigger: SbbButtonElement;

  beforeEach(async () => {
    const root = await fixture(html`
      <div>
        <sbb-button id="menu-trigger">Menu trigger</sbb-button>
        <sbb-menu id="menu" trigger="menu-trigger">
          <sbb-block-link id="menu-link" href="#" size="xs">Profile</sbb-block-link>
          <sbb-menu-button id="menu-action-1" icon-name="tick-small">View</sbb-menu-button>
          <sbb-menu-button id="menu-action-2" icon-name="pen-small" amount="1" disabled
            >Edit</sbb-menu-button
          >
          <sbb-menu-button id="menu-action-3" icon-name="swisspass-small" amount="2"
            >Details</sbb-menu-button
          >
          <sbb-divider id="menu-divider"></sbb-divider>
          <sbb-menu-button id="menu-action-4" icon-name="cross-small">Cancel</sbb-menu-button>
        </sbb-menu>
      </div>
    `);
    trigger = root.querySelector<SbbButtonElement>('sbb-button')!;
    element = root.querySelector<SbbMenuElement>('sbb-menu')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbMenuElement);
  });

  it('opens on trigger click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);

    trigger.click();
    await waitForLitRender(element);
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes on Esc keypress', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose, element);

    trigger.click();
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes on menu action click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose, element);
    const menuAction = element.querySelector(':scope > sbb-menu-button') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(menuAction).not.to.be.null;

    menuAction.click();
    await waitForLitRender(element);
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes on interactive element click', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose, element);
    const menuLink = element.querySelector(':scope > sbb-block-link') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(menuLink).not.to.be.null;

    menuLink.click();
    await waitForLitRender(element);

    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('opens and closes with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-menu-animation-duration', '1ms');
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbMenuElement.events.didClose, element);
    const menuLink = element.querySelector(':scope > sbb-block-link') as HTMLElement;

    trigger.click();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();

    menuLink.click();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('is correctly positioned on desktop', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    await setViewport({ width: 1200, height: 800 });
    if (isWebkit) {
      // Needed to let media queries get applied on Webkit
      // TODO: Figure out why
      await aTimeout(50);
    }

    const menu: HTMLDivElement = element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-menu')!;

    trigger.click();
    await waitForLitRender(element);

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

    // Expect menu offsetTop to be equal to the trigger height + the menu offset (8px)
    expect(menu.offsetTop).to.be.equal(buttonHeightPx + 8);
    expect(menu.offsetLeft).to.be.equal(0);
  });

  it('is correctly positioned on mobile', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);

    await setViewport({ width: 800, height: 600 });
    const menu: HTMLDivElement = element.shadowRoot!.querySelector<HTMLDivElement>('.sbb-menu')!;

    trigger.click();
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'opened');

    const menuOffsetTop = menu.offsetTop;
    const menuHeight = menu.offsetHeight;
    const pageHeight = window.innerHeight;

    expect(menuOffsetTop).to.be.equal(pageHeight - menuHeight);
  });

  it('sets the focus to the first focusable element when the menu is opened by keyboard', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);

    trigger.focus();

    await sendKeys({ press: 'Enter' });
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    expect(document.activeElement!.id).to.be.equal('menu-link');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, element);

    element.addEventListener(SbbMenuElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbMenuElement.events.willClose, element);

    element.open();
    await waitForLitRender(element);
    await didOpenEventSpy.calledOnce();

    element.addEventListener(SbbMenuElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await waitForLitRender(element);
    await willCloseEventSpy.calledOnce();

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('does forward scroll event to document', async () => {
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, element);

    element.open();
    await waitForLitRender(element);
    await didOpenEventSpy.calledOnce();

    await setViewport({ width: 320, height: 300 });

    const scrollSpy = new EventSpy('scroll', document);
    const scrollContext = element.shadowRoot!.querySelector('.sbb-menu__content')!;

    scrollContext.scrollTo(0, 400);

    await scrollSpy.calledOnce();
    expect(scrollSpy.count).to.be.equal(1);
  });
});
