import { assert, aTimeout, expect, fixture } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import { isSafari } from '../../core/dom.js';
import { i18nDialog } from '../../core/i18n.js';
import { tabKey } from '../../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../../core/testing.js';

import { SbbDialogElement } from './dialog.js';

import '../../button.js';
import '../../icon.js';
import '../../stepper.js';
import '../dialog-title.js';
import '../dialog-content.js';
import '../dialog-actions.js';

async function openDialog(element: SbbDialogElement): Promise<void> {
  const willOpen = new EventSpy(SbbDialogElement.events.willOpen, element);
  const didOpen = new EventSpy(SbbDialogElement.events.didOpen, element);

  element.open();
  await waitForLitRender(element);

  await willOpen.calledOnce();
  expect(willOpen.count).to.be.equal(1);
  await waitForLitRender(element);

  await didOpen.calledOnce();
  expect(didOpen.count).to.be.equal(1);
  await waitForLitRender(element);

  expect(element).to.have.attribute('data-state', 'opened');
  expect(element).to.match(':popover-open');
}

describe('sbb-dialog', () => {
  describe('basic', () => {
    let element: SbbDialogElement, ariaLiveRef: HTMLElement;

    beforeEach(async () => {
      await setViewport({ width: 900, height: 600 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-1">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);
      ariaLiveRef = element.shadowRoot!.querySelector('sbb-screen-reader-only')!;
    });

    it('renders', () => {
      assert.instanceOf(element, SbbDialogElement);
    });

    it('opens the dialog', async () => {
      await openDialog(element);
    });

    it('does not open the dialog if prevented', async () => {
      const willOpen = new EventSpy(SbbDialogElement.events.willOpen, element);
      const didOpen = new EventSpy(SbbDialogElement.events.didOpen, element);

      element.addEventListener(SbbDialogElement.events.willOpen, (ev) => ev.preventDefault());

      element.open();
      await waitForLitRender(element);

      await willOpen.calledOnce();
      expect(willOpen.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(didOpen.count).to.be.equal(0);
      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('closes the dialog', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      element.close();
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
      expect(element).not.to.match(':popover-open');
      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('does not close the dialog if prevented', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      element.addEventListener(SbbDialogElement.events.willClose, (ev) => ev.preventDefault());

      element.close();
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(didClose.count).to.be.equal(0);
      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('closes the dialog on backdrop click', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new CustomEvent('pointerdown'));
      element.dispatchEvent(new CustomEvent('pointerup'));
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('does not close the dialog on backdrop click', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      element.backdropAction = 'none';
      await waitForLitRender(element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new CustomEvent('pointerdown'));
      element.dispatchEvent(new CustomEvent('pointerup'));
      await waitForLitRender(element);

      expect(willClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(didClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('does not close the dialog on backdrop click if pointerdown is on dialog', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      // Simulate backdrop click
      element
        .shadowRoot!.querySelector('.sbb-dialog')!
        .dispatchEvent(new CustomEvent('pointerdown', { bubbles: true, composed: true }));
      element.dispatchEvent(new CustomEvent('pointerup'));
      await waitForLitRender(element);

      expect(willClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(didClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('does not close the dialog on backdrop click if pointerup is on dialog', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      // Simulate backdrop click
      element.dispatchEvent(new CustomEvent('pointerdown'));
      element
        .shadowRoot!.querySelector('.sbb-dialog')!
        .dispatchEvent(new CustomEvent('pointerup', { bubbles: true, composed: true }));
      await waitForLitRender(element);

      expect(willClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(didClose.count).to.be.equal(0);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('closes the dialog on close button click', async () => {
      const closeButton = element
        .querySelector('sbb-dialog-title')!
        .shadowRoot!.querySelector('[sbb-dialog-close]') as HTMLElement;
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      closeButton.click();
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('closes the dialog on Esc key press', async () => {
      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('closes stacked dialogs one by one on ESC key pressed', async () => {
      element = await fixture(html`
        <sbb-dialog id="my-dialog-3">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>

        <sbb-dialog id="stacked-dialog">
          <sbb-dialog-title>Stacked title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);

      const willOpen = new EventSpy(SbbDialogElement.events.willOpen, null, { capture: true });
      const didOpen = new EventSpy(SbbDialogElement.events.didOpen, null, { capture: true });
      const willClose = new EventSpy(SbbDialogElement.events.willClose, null, { capture: true });
      const didClose = new EventSpy(SbbDialogElement.events.didClose, null, { capture: true });

      await openDialog(element);

      const stackedDialog = document.querySelector('#stacked-dialog') as SbbDialogElement;

      stackedDialog.open();
      await waitForLitRender(element);

      await willOpen.calledTimes(2);
      expect(willOpen.count).to.be.equal(2);
      await waitForLitRender(element);

      await didOpen.calledTimes(2);
      expect(didOpen.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(stackedDialog).to.have.attribute('data-state', 'opened');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(stackedDialog).to.have.attribute('data-state', 'closed');
      expect(element).to.have.attribute('data-state', 'opened');

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      await sendKeys({ press: 'Escape' });
      await waitForLitRender(element);

      await willClose.calledTimes(2);
      expect(willClose.count).to.be.equal(2);
      await waitForLitRender(element);

      await didClose.calledTimes(2);
      expect(didClose.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(stackedDialog).to.have.attribute('data-state', 'closed');
      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('opens and closes the overlay with non-zero animation duration', async () => {
      element.style.setProperty('--sbb-dialog-animation-duration', '1ms');

      const willClose = new EventSpy(SbbDialogElement.events.willClose, element);
      const didClose = new EventSpy(SbbDialogElement.events.didClose, element);

      await openDialog(element);

      element.close();
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(element).to.have.attribute('data-state', 'closed');
    });

    it('does not close the dialog on other overlay click', async () => {
      await setViewport({ width: 900, height: 600 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-4">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>Dialog content</sbb-dialog-content>

          <sbb-dialog id="inner-dialog">
            <sbb-dialog-title>Inner Dialog title</sbb-dialog-title>
            <sbb-dialog-content>Dialog content</sbb-dialog-content>
          </sbb-dialog>
        </sbb-dialog>
      `);
      const willOpen = new EventSpy(SbbDialogElement.events.willOpen, null, { capture: true });
      const didOpen = new EventSpy(SbbDialogElement.events.didOpen, null, { capture: true });
      const willClose = new EventSpy(SbbDialogElement.events.willClose, null, { capture: true });
      const didClose = new EventSpy(SbbDialogElement.events.didClose, null, { capture: true });
      const innerElement = element.querySelector('sbb-dialog') as SbbDialogElement;

      await openDialog(element);

      innerElement.open();
      await waitForLitRender(element);

      await willOpen.calledTimes(2);
      expect(willOpen.count).to.be.equal(2);
      await waitForLitRender(element);

      await didOpen.calledTimes(2);
      expect(didOpen.count).to.be.equal(2);
      await waitForLitRender(element);

      expect(innerElement).to.have.attribute('data-state', 'opened');

      // Simulate a click on the inner dialog's backdrop
      innerElement.dispatchEvent(new CustomEvent('pointerdown'));
      innerElement.dispatchEvent(new CustomEvent('pointerup'));
      await waitForLitRender(element);

      await willClose.calledOnce();
      expect(willClose.count).to.be.equal(1);
      await waitForLitRender(element);

      await didClose.calledOnce();
      expect(didClose.count).to.be.equal(1);
      await waitForLitRender(element);

      expect(innerElement).to.have.attribute('data-state', 'closed');
      expect(element).to.have.attribute('data-state', 'opened');
    });

    it('should remove ariaLiveRef content on any keyboard interaction', async () => {
      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      await sendKeys({ press: tabKey });
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent!.trim()).to.be.equal('');
    });

    it('should remove ariaLiveRef content on any click interaction', async () => {
      await openDialog(element);

      await waitForCondition(() => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Title`);

      element.click();
      await waitForLitRender(element);

      expect(ariaLiveRef.textContent).to.be.equal('');
    });

    it('should announce accessibility label in ariaLiveRef if explicitly set', async () => {
      element.accessibilityLabel = 'Special Dialog';

      await openDialog(element);

      await waitForCondition(
        () => ariaLiveRef.textContent!.trim() === `${i18nDialog.en}, Special Dialog`,
      );

      expect(ariaLiveRef.textContent!.trim()).to.be.equal(`${i18nDialog.en}, Special Dialog`);
    });
  });

  describe('with long content', () => {
    let element: SbbDialogElement;

    beforeEach(async () => {
      await setViewport({ width: 900, height: 300 });
      element = await fixture(html`
        <sbb-dialog id="my-dialog-1">
          <sbb-dialog-title hide-on-scroll="">Title</sbb-dialog-title>
          <sbb-dialog-content>
            Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his
            face like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise
            Frodo saw that Aragorn stood beside her; his dark cloak was thrown back, and he seemed
            to be clad in elven-mail, and a star shone on his breast. They spoke together, and then
            suddenly it seemed to Frodo that Arwen turned towards him, and the light of her eyes
            fell on him from afar and pierced his heart. He stood still enchanted, while the sweet
            syllables of the elvish song fell like clear jewels of blended word and melody. 'It is a
            song to Elbereth,'' said Bilbo. 'They will sing that, and other songs of the Blessed
            Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the Rings: The
            Fellowship of the Ring, “Many Meetings” J.R.R. Tolkien, the mastermind behind
            Middle-earth's enchanting world, was born on January 3, 1892. With "The Hobbit" and "The
            Lord of the Rings", he pioneered fantasy literature. Tolkien's linguistic brilliance and
            mythic passion converge in a literary legacy that continues to transport readers to
            magical realms.
          </sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);
    });

    it('renders', () => {
      assert.instanceOf(element, SbbDialogElement);
    });

    it('sets the data-overflows attribute', async () => {
      await openDialog(element);

      expect(element).to.have.attribute('data-state', 'opened');
      await waitForCondition(() => element.hasAttribute('data-overflows'));
      expect(element).to.have.attribute('data-overflows', '');
    });

    it('shows/hides the dialog header on scroll', async () => {
      await openDialog(element);
      expect(element).not.to.have.attribute('data-hide-header');
      const scrollSpy = new EventSpy('scroll', document);

      const content = element.querySelector('sbb-dialog-content')!.shadowRoot!.firstElementChild!;

      // Scroll down.
      content.scrollTo(0, 50);
      await waitForCondition(() => element.hasAttribute('data-hide-header'));
      await scrollSpy.calledOnce();

      expect(element).to.have.attribute('data-hide-header');

      // Scroll up.
      content.scrollTo(0, 0);
      await waitForCondition(() => !element.hasAttribute('data-hide-header'));
      await scrollSpy.calledTimes(2);

      expect(element).not.to.have.attribute('data-hide-header');
    });
  });

  describe('with stepper', () => {
    let root: SbbDialogElement;

    beforeEach(async () => {
      await setViewport({ width: 900, height: 600 });
      root = await fixture(html`
        <sbb-dialog id="ktm">
          <sbb-dialog-title>Title</sbb-dialog-title>
          <sbb-dialog-content>
            <sbb-stepper linear orientation="horizontal" size="m">
              <sbb-step-label>First step</sbb-step-label>
              <sbb-step>
                First content
                <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
              </sbb-step>
              <sbb-step-label>Second step</sbb-step-label>
              <sbb-step>
                Second content
                <sbb-secondary-button size="m" sbb-stepper-previous>Back</sbb-secondary-button>
                <sbb-button size="m" sbb-stepper-next>Next</sbb-button>
              </sbb-step>
            </sbb-stepper>
          </sbb-dialog-content>
          <sbb-dialog-actions>Action group</sbb-dialog-actions>
        </sbb-dialog>
      `);
    });

    it('should open the dialog and the stepper should appear with the correct style', async () => {
      const stepper = root.querySelector('sbb-stepper')!;
      expect(getComputedStyle(stepper).getPropertyValue('--sbb-stepper-marker-size')).to.be.equal(
        '0',
      );
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-content-height'),
      ).to.be.equal(isSafari ? '' : 'fit-content');

      await openDialog(root);
      await waitForLitRender(root);
      expect(root).to.have.attribute('data-state', 'opened');

      // Need to wait for the intersector to kick in
      await aTimeout(500);
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-marker-size'),
      ).not.to.be.equal('0');
      expect(
        getComputedStyle(stepper).getPropertyValue('--sbb-stepper-content-height'),
      ).not.to.be.equal(isSafari ? '' : 'fit-content');
    });
  });
});
