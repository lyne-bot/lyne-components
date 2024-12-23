import { assert, aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../../core/testing/private.js';
import { EventSpy } from '../../core/testing.js';

import { SbbAlertElement } from './alert.js';

describe(`sbb-alert`, () => {
  let alert: SbbAlertElement;

  it('renders', async () => {
    alert = await fixture(html`<sbb-alert></sbb-alert>`);
    assert.instanceOf(alert, SbbAlertElement);
  });

  it('should fire animation events', async () => {
    const willOpenSpy = new EventSpy(SbbAlertElement.events.willOpen, null, { capture: true });
    const didOpenSpy = new EventSpy(SbbAlertElement.events.didOpen, null, { capture: true });
    const willCloseSpy = new EventSpy(SbbAlertElement.events.willClose, null, { capture: true });
    const didCloseSpy = new EventSpy(SbbAlertElement.events.didClose, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`,
    );

    await willOpenSpy.calledOnce();
    expect(willOpenSpy.count).to.be.equal(1);
    await didOpenSpy.calledOnce();
    expect(didOpenSpy.count).to.be.equal(1);

    alert.close();

    await didCloseSpy.calledOnce();
    expect(willCloseSpy.count).to.be.equal(1);
    expect(didCloseSpy.count).to.be.equal(1);
  });

  it('should fire animation events with non-zero animation duration', async () => {
    const didOpenSpy = new EventSpy(SbbAlertElement.events.didOpen, null, { capture: true });
    const didCloseSpy = new EventSpy(SbbAlertElement.events.didClose, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption" style="--sbb-alert-animation-duration: 1ms">
        Interruption
      </sbb-alert>`,
    );

    await didOpenSpy.calledOnce();

    alert.close();

    await didCloseSpy.calledOnce();
    expect(didCloseSpy.count).to.be.equal(1);
  });

  it('should respect canceled willClose event', async () => {
    const didOpenSpy = new EventSpy(SbbAlertElement.events.didOpen, null, { capture: true });
    const willCloseSpy = new EventSpy(SbbAlertElement.events.willClose, null, { capture: true });
    const didCloseSpy = new EventSpy(SbbAlertElement.events.didClose, null, { capture: true });

    const alert: SbbAlertElement = await fixture(
      html`<sbb-alert title-content="disruption">Interruption</sbb-alert>`,
    );

    alert.addEventListener(SbbAlertElement.events.willClose, (ev) => ev.preventDefault());

    await didOpenSpy.calledOnce();

    alert.close();

    await willCloseSpy.calledOnce();
    expect(willCloseSpy.count).to.be.equal(1);

    // Wait a period to ensure the  didCLose event was not dispatched.
    await aTimeout(10);
    expect(didCloseSpy.count).to.be.equal(0);
  });

  it('should hide close button in readonly mode', async () => {
    alert = await fixture(
      html`<sbb-alert title-content="Interruption" readonly>Alert content</sbb-alert>`,
    );

    expect(alert.shadowRoot!.querySelector('.sbb-alert__close-button-wrapper')).to.be.null;
  });
});
