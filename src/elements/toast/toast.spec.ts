import { assert, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { SbbTransparentButtonElement } from '../button.js';
import { fixture } from '../core/testing/private.js';
import { EventSpy, waitForCondition, waitForLitRender } from '../core/testing.js';

import { SbbToastElement } from './toast.js';

import '../button/transparent-button.js';
import '../link/link-button.js';

describe(`sbb-toast`, () => {
  let element: SbbToastElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-toast></sbb-toast>`);
  });

  it('renders and sets the correct attributes', async () => {
    assert.instanceOf(element, SbbToastElement);
    expect(element).not.to.have.attribute('data-has-action');
    expect(element).not.to.have.attribute('data-has-icon');
    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('opens and closes after timeout', async () => {
    const willOpenEventSpy = new EventSpy(SbbToastElement.events.willOpen, element);
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose, element);

    element.setAttribute('timeout', '50');
    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();
    expect(didOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('opened');

    // Will wait for timeout and then close itself

    await waitForLitRender(element);
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('closes by dismiss button click', async () => {
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose, element);

    element.toggleAttribute('dismissible', true);
    await waitForLitRender(element);
    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();

    const dismissBtn =
      element.shadowRoot!.querySelector<SbbTransparentButtonElement>('sbb-transparent-button')!;
    dismissBtn.click();

    await waitForLitRender(element);
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('closes by marked action element', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-transparent-button slot="action" sbb-toast-close></sbb-transparent-button>
      </sbb-toast>
    `);
    const actionBtn = element.querySelector('sbb-transparent-button') as HTMLElement;

    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose, element);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose, element);

    element.open();
    await waitForLitRender(element);
    await didOpenEventSpy.calledOnce();

    actionBtn.click();

    await waitForLitRender(element);
    await willCloseEventSpy.calledOnce();
    expect(willCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    await didCloseEventSpy.calledOnce();
    expect(didCloseEventSpy.count).to.be.equal(1);

    await waitForLitRender(element);
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });

  it('forces state on button actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-transparent-button slot="action"></sbb-transparent-button>
      </sbb-toast>
    `);

    const actionBtn = element.querySelector('sbb-transparent-button');

    expect(actionBtn).to.have.attribute('size', 'm');
    expect(actionBtn).to.have.attribute('negative');
  });

  it('forces state on link actions', async () => {
    element = await fixture(html`
      <sbb-toast>
        <sbb-link-button slot="action"></sbb-link-button>
      </sbb-toast>
    `);
    const actionLink = element.querySelector('sbb-link-button');

    expect(actionLink).to.have.attribute('negative');
  });

  it('closes other toasts on open', async () => {
    element = await fixture<SbbToastElement>(html`
      <div>
        <sbb-toast id="toast1"></sbb-toast>
        <sbb-toast id="toast2"></sbb-toast>
      </div>
    `);

    const [toast1, toast2] = Array.from(element.querySelectorAll('sbb-toast'));

    // Open the first toast
    toast1.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.getAttribute('data-state') === 'opened');
    expect(toast1).to.have.attribute('data-state', 'opened');

    // Open the second toast and expect the first to be closed
    toast2.open();
    await waitForLitRender(element);

    await waitForCondition(() => toast1.getAttribute('data-state') === 'closed');
    await waitForCondition(() => toast2.getAttribute('data-state') === 'opened');
    expect(toast1).to.have.attribute('data-state', 'closed');
    expect(toast2).to.have.attribute('data-state', 'opened');
  });

  it('does not open if prevented', async () => {
    const willOpenEventSpy = new EventSpy(SbbToastElement.events.willOpen, element);

    element.addEventListener(SbbToastElement.events.willOpen, (ev) => ev.preventDefault());
    element.open();

    await willOpenEventSpy.calledOnce();
    expect(willOpenEventSpy.count).to.be.equal(1);
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'closed');
  });

  it('does not close if prevented', async () => {
    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen, element);
    const willCloseEventSpy = new EventSpy(SbbToastElement.events.willClose, element);

    element.open();
    await didOpenEventSpy.calledOnce();
    await waitForLitRender(element);

    element.addEventListener(SbbToastElement.events.willClose, (ev) => ev.preventDefault());
    element.close();

    await willCloseEventSpy.calledOnce();
    await waitForLitRender(element);

    expect(element).to.have.attribute('data-state', 'opened');
  });

  it('closes by dismiss button click with non-zero animation duration', async () => {
    element.style.setProperty('--sbb-toast-animation-duration', '1ms');
    element.toggleAttribute('dismissible', true);
    await waitForLitRender(element);

    const didOpenEventSpy = new EventSpy(SbbToastElement.events.didOpen, element);
    const didCloseEventSpy = new EventSpy(SbbToastElement.events.didClose, element);

    element.open();
    await waitForLitRender(element);

    await didOpenEventSpy.calledOnce();

    const dismissBtn =
      element.shadowRoot!.querySelector<SbbTransparentButtonElement>('sbb-transparent-button')!;
    dismissBtn.click();

    await waitForLitRender(element);
    await didCloseEventSpy.calledOnce();
    expect(element.getAttribute('data-state')).to.be.equal('closed');
  });
});
