import { assert, expect } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, mockScrollTo, waitForLitRender } from '../../core/testing.js';
import { SbbMenuElement } from '../../menu.js';
import type { SbbHeaderButtonElement } from '../header-button.js';

import { SbbHeaderElement } from './header.js';
import '../header-button.js';

describe(`sbb-header`, () => {
  let element: SbbHeaderElement;

  beforeEach(async () => {
    await setViewport({ width: 1200, height: 600 });
  });

  it('renders', async () => {
    element = await fixture(html`<sbb-header></sbb-header>`);
    assert.instanceOf(element, SbbHeaderElement);
  });

  it('should be fixed on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header></sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);
    element = root.querySelector<SbbHeaderElement>('sbb-header')!;

    mockScrollTo({ top: 200 });
    await waitForLitRender(element);
    expect(element).to.have.attribute('data-shadow');
  });

  it('should hide/show on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll></sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);

    element = root.querySelector<SbbHeaderElement>('sbb-header')!;
    expect(element.scrollOrigin).not.to.be.undefined;
    expect(element.offsetHeight).to.be.equal(96);
    expect(root.offsetHeight).to.be.equal(2096);

    // Scroll bottom (0px to 400px): header fixed.
    mockScrollTo({ top: 400 });
    await waitForLitRender(element);

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    mockScrollTo({ top: 200 });

    await waitForLitRender(element);

    expect(element).to.have.attribute('data-shadow');
    expect(element).to.have.attribute('data-animated');
    expect(element).to.have.attribute('data-fixed');
    expect(element).to.have.attribute('data-visible');

    // Scroll top (100 to 0px): initial situation.
    mockScrollTo({ top: 0 });

    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-shadow');
    expect(element).not.to.have.attribute('data-animated');
    expect(element).not.to.have.attribute('data-fixed');
    expect(element).not.to.have.attribute('data-visible');
  });

  it('should hide/show on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll>
          <sbb-header-button id="action-1">Action 1</sbb-header-button>
          <sbb-header-button id="action-2">Action 2</sbb-header-button>
        </sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);

    element = root.querySelector('sbb-header')!;
    expect(element.scrollOrigin).not.to.be.undefined;
    expect(element.offsetHeight).to.be.equal(96);
    expect(root.offsetHeight).to.be.equal(2096);

    // Scroll bottom (0px to 400px): header fixed.
    mockScrollTo({ top: 400 });
    await waitForLitRender(element);

    // Scroll top (400px to 200px): header fixed and visible, with shadow and animated.
    mockScrollTo({ top: 200 });

    await waitForLitRender(element);

    expect(element).to.have.attribute('data-shadow');
    expect(element).to.have.attribute('data-animated');
    expect(element).to.have.attribute('data-fixed');
    expect(element).to.have.attribute('data-visible');

    // Scroll bottom (0px to 400px): header fixed.
    mockScrollTo({ top: 400 });
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-animated');
    expect(element).to.have.attribute('data-fixed');
    expect(element).not.to.have.attribute('data-shadow');
    expect(element).not.to.have.attribute('data-visible');
    expect(element).not.to.have.attribute('data-has-visible-focus-within');
    expect(window.getComputedStyle(element).getPropertyValue('--sbb-header-transform')).to.equal(
      'translate3d(0, -100%, 0)',
    );

    // Focus an element inside the header
    await sendKeys({ press: tabKey });
    expect(element).to.have.attribute('data-has-visible-focus-within');
    expect(window.getComputedStyle(element).getPropertyValue('--sbb-header-transform')).to.equal(
      'translate3d(0, 0, 0)',
    );

    // Scroll top (100 to 0px): initial situation.
    mockScrollTo({ top: 0 });

    await waitForLitRender(element);

    expect(element).not.to.have.attribute('data-shadow');
    expect(element).not.to.have.attribute('data-animated');
    expect(element).not.to.have.attribute('data-fixed');
    expect(element).not.to.have.attribute('data-visible');
  });

  it('should close menu on scroll', async () => {
    const root = await fixture(html`
      <div>
        <sbb-header hide-on-scroll>
          <sbb-header-button id="language-menu-trigger">English</sbb-header-button>
          <sbb-menu trigger="language-menu-trigger">
            <sbb-menu-button>Deutsch</sbb-menu-button>
            <sbb-menu-button>Français</sbb-menu-button>
          </sbb-menu>
        </sbb-header>
        <div style="height: 2000px;"></div>
      </div>
    `);

    element = root.querySelector<SbbHeaderElement>('sbb-header')!;

    // Scroll down a little bit
    mockScrollTo({ top: 250 });
    await waitForLitRender(element);

    // Scroll up to show header
    mockScrollTo({ top: 200 });
    await waitForLitRender(element);
    expect(element).to.have.attribute('data-visible');

    // Open menu
    const willOpenEventSpy = new EventSpy(SbbMenuElement.events.willOpen, null, { capture: true });
    const didOpenEventSpy = new EventSpy(SbbMenuElement.events.didOpen, null, { capture: true });
    const menuTrigger = root.querySelector<SbbHeaderButtonElement>('sbb-header-button')!;
    menuTrigger.click();
    await waitForLitRender(element);
    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    const menuId = menuTrigger.getAttribute('aria-controls');
    const menu = root.querySelector(`#${menuId}`);

    // Assert menu opened
    expect(menuTrigger).to.have.attribute('aria-controls');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'true');
    expect(menu).to.have.attribute('data-state', 'opened');

    // Scroll down to hide header.
    mockScrollTo({ top: 250 });
    await waitForLitRender(element);

    // Assert menu closed
    expect(element).not.to.have.attribute('data-visible');
    expect(menu).not.to.have.attribute('data-state', 'opened');
    expect(menuTrigger).to.have.attribute('aria-expanded', 'false');
  });
});
