import { assert, expect, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../../button.js';
import { pageScrollDisabled } from '../../core/dom.js';
import { fixture, tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';
import type { SbbNavigationButtonElement } from '../navigation-button.js';
import type { SbbNavigationSectionElement } from '../navigation-section.js';

import { SbbNavigationElement } from './navigation.js';

import '../navigation-button.js';
import '../navigation-marker.js';
import '../navigation-section.js';

describe(`sbb-navigation`, () => {
  let element: SbbNavigationElement;

  beforeEach(async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation">
        <sbb-navigation-marker>
          <sbb-navigation-button id="action-1">Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-2">Vacations & Recreation</sbb-navigation-button>
          <sbb-navigation-button>Travel information</sbb-navigation-button>
          <sbb-navigation-button sbb-navigation-close>Help & Contact</sbb-navigation-button>
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-1" id="first-section">
          <sbb-navigation-button sbb-navigation-section-close>Label</sbb-navigation-button>
          <sbb-navigation-button>Label</sbb-navigation-button>
        </sbb-navigation-section>
        <sbb-navigation-section trigger="action-2" id="second-section">
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button>Label</sbb-navigation-button>
        </sbb-navigation-section>
      </sbb-navigation>
    `);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbNavigationElement);
  });

  it('opens the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('sets the initial active actions and focuses on the close button', async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation">
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active-1" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-marker>
          <sbb-navigation-button id="action-active-2" class="sbb-active"
            >English</sbb-navigation-button
          >
          <sbb-navigation-button>German</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const action2 = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active-1',
    )!;
    const action3 = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active-2',
    )!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');
    expect(action2).to.have.attribute('data-action-active');
    expect(action3).to.have.attribute('data-action-active');
    expect(element.shadowRoot?.activeElement?.id).to.be.equal('sbb-navigation-close-button');
  });

  it('sets the initial active action and opens the connected section', async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation">
        <sbb-navigation-marker>
          <sbb-navigation-button>Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="action-active" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-section trigger="action-active" id="active-section">
          <sbb-navigation-button>Label</sbb-navigation-button>
          <sbb-navigation-button id="section-action-active" class="sbb-active"
            >Label</sbb-navigation-button
          >
        </sbb-navigation-section>
      </sbb-navigation>
    `);

    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const actionActive = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-active',
    )!;
    const sectionActionActive = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section > sbb-navigation-button#section-action-active',
    )!;
    const activeSection = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section#active-section',
    )!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');
    expect(actionActive).to.have.attribute('data-action-active');
    expect(sectionActionActive).to.have.attribute('data-action-active');
    expect(activeSection).to.have.attribute('data-state', 'opened');
  });

  it('resets the markers on navigation close', async () => {
    element = await fixture(html`
      <sbb-navigation id="navigation">
        <sbb-navigation-marker>
          <sbb-navigation-button id="first-action">Tickets & Offers</sbb-navigation-button>
          <sbb-navigation-button id="second-action" class="sbb-active"
            >Vacations & Recreation</sbb-navigation-button
          >
        </sbb-navigation-marker>

        <sbb-navigation-marker>
          <sbb-navigation-button id="third-action" class="sbb-active"
            >English</sbb-navigation-button
          >
          <sbb-navigation-button id="forth-action">German</sbb-navigation-button>
        </sbb-navigation-marker>
      </sbb-navigation>
    `);

    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const action1 = element.querySelector<SbbNavigationButtonElement>('#first-action')!;
    const action2 = element.querySelector<SbbNavigationButtonElement>('#second-action')!;
    const action3 = element.querySelector<SbbNavigationButtonElement>('#third-action')!;
    const action4 = element.querySelector<SbbNavigationButtonElement>('#forth-action')!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');
    expect(action2).to.have.attribute('data-action-active');
    expect(action3).to.have.attribute('data-action-active');

    action1.click();
    action4.click();

    await waitForLitRender(element);

    expect(action1).to.have.attribute('data-action-active');
    expect(action4).to.have.attribute('data-action-active');

    expect(action2).not.to.have.attribute('data-action-active');
    expect(action3).not.to.have.attribute('data-action-active');

    element.close();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledTimes(2);
    expect(didOpenEventSpy.count).to.be.equal(2);
    expect(element).to.have.attribute('data-state', 'opened');
    expect(action1).not.to.have.attribute('data-action-active');
    expect(action4).not.to.have.attribute('data-action-active');
  });

  it('closes the navigation', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation on close button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);
    const closeButton: SbbButtonElement =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    closeButton.click();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes navigation with sbb-navigation-close', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button[sbb-navigation-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeEl.click();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('opens and closes navigation with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-navigation-animation-duration', '1ms');

    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');

    element.close();
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('opens navigation and opens section', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'closed');

    action.click();
    await waitForLitRender(element);

    await waitForCondition(() => section.getAttribute('data-state') === 'opened');
    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');
  });

  it('opens navigation and toggles sections', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const firstSection = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const secondSection = element.querySelector<SbbNavigationSectionElement>('#second-section')!;
    const firstAction = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const secondAction = element.querySelector<SbbNavigationButtonElement>(
      'sbb-navigation-marker > sbb-navigation-button#action-2',
    )!;

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(firstSection).to.have.attribute('data-state', 'closed');
    expect(secondSection).to.have.attribute('data-state', 'closed');

    firstAction.click();

    await waitForCondition(() => firstSection.getAttribute('data-state') === 'opened');
    expect(firstSection).to.have.attribute('data-state', 'opened');
    expect(secondSection).to.have.attribute('data-state', 'closed');

    secondAction.click();

    await waitForCondition(() => secondSection.getAttribute('data-state') === 'opened');
    expect(firstSection).to.have.attribute('data-state', 'closed');
    expect(secondSection).to.have.attribute('data-state', 'opened');
  });

  it('closes the navigation and the section on close button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeButton =
      element.shadowRoot!.querySelector<SbbButtonElement>('.sbb-navigation__close')!;

    element.open();
    await waitForLitRender(element);
    await nextFrame();

    action.click();
    await waitForLitRender(element);
    await nextFrame();

    await didOpenEventSpy.calledOnce();
    await waitForCondition(() => section.getAttribute('data-state') === 'opened');
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeButton.click();

    await didCloseEventSpy.calledOnce();
    await waitForCondition(() => section.getAttribute('data-state') === 'closed');
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('closes the navigation and the section on Esc key press', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbNavigationElement.events.didClose, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('closes section with sbb-navigation-section-close', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const section = element.querySelector<SbbNavigationSectionElement>('#first-section')!;
    const action = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-marker > sbb-navigation-button#action-1',
    )!;
    const closeEl = element.querySelector<SbbNavigationButtonElement>(
      ':scope > sbb-navigation-section > sbb-navigation-button[sbb-navigation-section-close]',
    )!;

    element.open();
    await waitForLitRender(element);

    action.click();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'opened');

    closeEl.click();
    await waitForLitRender(element);
    await waitForCondition(() => section.getAttribute('data-state') === 'closed');

    expect(element).to.have.attribute('data-state', 'opened');
    expect(section).to.have.attribute('data-state', 'closed');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbNavigationElement.events.willOpen, element);

    element.addEventListener(SbbNavigationElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbNavigationElement.events.willClose, element);

    element.open();
    await didOpenEventSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbNavigationElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await willCloseEventSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('should re-enable scrolling when removed from the DOM', async () => {
    const didOpenEventSpy = new EventSpy(SbbNavigationElement.events.didOpen, element);

    element.open();
    await didOpenEventSpy.calledOnce();

    expect(pageScrollDisabled()).to.be.true;

    element.remove();
    expect(pageScrollDisabled()).to.be.false;
  });
});
