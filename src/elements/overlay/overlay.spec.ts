import { assert, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbButtonElement } from '../button.js';
import { i18nDialog } from '../core/i18n.js';
import { tabKey } from '../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.js';

import { SbbOverlayElement } from './overlay.js';
import '../button.js';
import '../icon.js';

async function openOverlay(element: SbbOverlayElement): Promise<void> {
  const willOpen = new EventSpy(SbbOverlayElement.events.willOpen, element);
  const didOpen = new EventSpy(SbbOverlayElement.events.didOpen, element);

  element.open();
  await waitForLitRender(element);

  await willOpen.calledOnce();
  expect(willOpen.count).to.be.equal(1);

  await didOpen.calledOnce();
  expect(didOpen.count).to.be.equal(1);
  expect(element).to.have.attribute('data-state', 'opened');
}

describe('sbb-overlay', () => {
  let element: SbbOverlayElement, ariaLiveRef: HTMLElement;

  beforeEach(async () => {
    await setViewport({ width: 900, height: 600 });
    element = await fixture(html`
      <sbb-overlay id="my-overlay-1" accessibility-label="Label">
        <p>Overlay content</p>
        <p>Overlay content</p>
        <p>Overlay content</p>
        <p>Overlay content</p>
      </sbb-overlay>
    `);
    ariaLiveRef = element.shadowRoot!.querySelector('sbb-screen-reader-only')!;
  });

  it('renders', () => {
    assert.instanceOf(element, SbbOverlayElement);
  });

  it('opens the overlay', async () => {
    await openOverlay(element);
  });

  it('does not open the overlay if prevented', async () => {
    const willOpen = new EventSpy(SbbOverlayElement.events.willOpen, element);
    const didOpen = new EventSpy(SbbOverlayElement.events.didOpen, element);

    element.addEventListener(SbbOverlayElement.events.willOpen, (ev) => ev.preventDefault());

    element.open();
    await waitForLitRender(element);

    await willOpen.calledOnce();
    expect(willOpen.count).to.be.equal(1);
    expect(didOpen.count).to.be.equal(0);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the overlay', async () => {
    const willClose = new EventSpy(SbbOverlayElement.events.willClose, element);
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, element);

    await openOverlay(element);

    await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

    element.close();
    await waitForLitRender(element);

    await willClose.calledOnce();
    expect(willClose.count).to.be.equal(1);

    await didClose.calledOnce();
    expect(didClose.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
    expect(ariaLiveRef.textContent).to.be.equal('');
  });

  it('opens and closes the overlay with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-overlay-animation-duration', '1ms');
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, element);

    await openOverlay(element);

    element.close();
    await waitForLitRender(element);

    await didClose.calledOnce();
    expect(didClose.count).to.be.equal(1);
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close the overlay if prevented', async () => {
    const willClose = new EventSpy(SbbOverlayElement.events.willClose, element);
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, element);

    await openOverlay(element);

    element.addEventListener(SbbOverlayElement.events.willClose, (ev) => ev.preventDefault());

    element.close();
    await waitForLitRender(element);

    await willClose.calledOnce();
    expect(willClose.count).to.be.equal(1);
    expect(didClose.count).to.be.equal(0);
    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes the overlay on close button click', async () => {
    const closeButton = element.shadowRoot!.querySelector('[sbb-overlay-close]') as HTMLElement;
    const willClose = new EventSpy(SbbOverlayElement.events.willClose, element);
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, element);

    await openOverlay(element);

    closeButton.click();
    await waitForLitRender(element);

    await willClose.calledOnce();
    expect(willClose.count).to.be.equal(1);

    await didClose.calledOnce();
    expect(didClose.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes the overlay on close button click with linked form', async () => {
    element = await fixture(html`
      <div>
        <form id="formid" method="dialog"></form>
        <sbb-overlay id="my-overlay-3">
          <p>Overlay content</p>
          <sbb-button sbb-overlay-close type="submit" form="formid">Close</sbb-button>
        </sbb-overlay>
      </div>
    `);

    const overlay = element.querySelector('sbb-overlay')!;
    const closeButton = element.querySelector<SbbButtonElement>('[type="submit"]')!;
    const form = element.querySelector<HTMLFormElement>('form')!;
    const willClose = new EventSpy<CustomEvent>(SbbOverlayElement.events.willClose, overlay);

    await openOverlay(overlay);

    closeButton.click();
    await waitForLitRender(element);

    await willClose.calledOnce();

    expect(willClose.firstEvent?.detail.returnValue).to.be.deep.equal(form);
  });

  it('closes the overlay on Esc key press', async () => {
    const willClose = new EventSpy(SbbOverlayElement.events.willClose, element);
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, element);

    await openOverlay(element);

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await willClose.calledOnce();
    expect(willClose.count).to.be.equal(1);

    await didClose.calledOnce();
    expect(didClose.count).to.be.equal(1);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('closes stacked overlays one by one on ESC key pressed', async () => {
    element = await fixture(html`
      <sbb-overlay id="my-overlay-3">
        <p>Overlay content</p>
      </sbb-overlay>

      <sbb-overlay id="stacked-overlay">
        <p>Stacked overlay content</p>
      </sbb-overlay>
    `);

    const willOpen = new EventSpy(SbbOverlayElement.events.willOpen, null, { capture: true });
    const didOpen = new EventSpy(SbbOverlayElement.events.didOpen, null, { capture: true });
    const willClose = new EventSpy(SbbOverlayElement.events.willClose, null, { capture: true });
    const didClose = new EventSpy(SbbOverlayElement.events.didClose, null, { capture: true });

    await openOverlay(element);

    const stackedOverlay = document.querySelector('#stacked-overlay') as SbbOverlayElement;

    stackedOverlay.open();
    await waitForLitRender(element);

    await willOpen.calledTimes(2);
    expect(willOpen.count).to.be.equal(2);

    await didOpen.calledTimes(2);
    expect(didOpen.count).to.be.equal(2);

    expect(stackedOverlay).to.have.attribute('data-state', 'opened');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await willClose.calledOnce();
    expect(willClose.count).to.be.equal(1);

    await didClose.calledOnce();
    expect(didClose.count).to.be.equal(1);

    expect(stackedOverlay).to.have.attribute('data-state', 'closed');
    expect(element).to.have.attribute('data-state', 'opened');

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    await sendKeys({ press: 'Escape' });
    await waitForLitRender(element);

    await willClose.calledTimes(2);
    expect(willClose.count).to.be.equal(2);

    await didClose.calledTimes(2);
    expect(didClose.count).to.be.equal(2);

    expect(stackedOverlay).to.have.attribute('data-state', 'closed');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('should remove ariaLiveRef content on any keyboard interaction', async () => {
    await openOverlay(element);

    await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

    await sendKeys({ press: tabKey });
    await waitForLitRender(element);

    expect(ariaLiveRef.textContent!.trim()).to.be.equal('');
  });

  it('should remove ariaLiveRef content on any click interaction', async () => {
    await openOverlay(element);

    await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Label`);

    element.click();
    await waitForLitRender(element);

    expect(ariaLiveRef.textContent).to.be.equal('');
  });

  it('should announce accessibility label in ariaLiveRef if explicitly set', async () => {
    element.accessibilityLabel = 'Special Overlay';

    await openOverlay(element);

    await waitForCondition(
      () => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Special Overlay`,
    );

    expect(ariaLiveRef.textContent!.trim()).to.be.equal(`${i18nDialog.en}, Special Overlay`);
  });

  it('does forward scroll event to document', async () => {
    const didOpenEventSpy = new EventSpy(SbbOverlayElement.events.didOpen, element);

    element.open();
    await waitForLitRender(element);
    await didOpenEventSpy.calledOnce();

    await setViewport({ width: 320, height: 300 });

    const scrollSpy = new EventSpy('scroll', document);
    const scrollContext = element.shadowRoot!.querySelector('.sbb-overlay__content')!;

    scrollContext.scrollTo(0, 400);

    await scrollSpy.calledOnce();
    expect(scrollSpy.count).to.be.equal(1);
  });
});
