import { expect } from '@open-wc/testing';
import { sendMouse } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbTransparentButtonElement } from '../../button.js';
import { fixture } from '../../core/testing/private.js';
import { waitForCondition, EventSpy, waitForLitRender } from '../../core/testing.js';
import { SbbAlertElement } from '../alert.js';

import { SbbAlertGroupElement } from './alert-group.js';

describe(`sbb-alert-group`, () => {
  let element: SbbAlertGroupElement;

  it('should handle events ond states on interacting with alerts', async () => {
    const alertGroupId = 'alertgroup';
    const accessibilityTitle = 'Disruptions';
    const accessibilityTitleLevel = '3';

    const alertOpenedEventSpy = new EventSpy(SbbAlertElement.events.didOpen, null, {
      capture: true,
    });

    // Given sbb-alert-group with two alerts
    element = await fixture(html`
      <sbb-alert-group
        id="${alertGroupId}"
        accessibility-title="${accessibilityTitle}"
        accessibility-title-level="${accessibilityTitleLevel}"
      >
        <sbb-alert title-content="Interruption" id="alert1">First</sbb-alert>
        <sbb-alert title-content="Interruption" id="alert2">Second</sbb-alert>
      </sbb-alert-group>
    `);

    const emptySpy = new EventSpy(SbbAlertGroupElement.events.empty);
    const alert1 = element.querySelector<SbbAlertElement>('sbb-alert#alert1')!;
    const alert2 = element.querySelector<SbbAlertElement>('sbb-alert#alert2')!;
    const alert1ClosedEventSpy = new EventSpy(SbbAlertElement.events.didClose, alert1);
    const alert2ClosedEventSpy = new EventSpy(SbbAlertElement.events.didClose, alert2);

    // Wait until both alerts are opened
    await alertOpenedEventSpy.calledTimes(2);

    // Then two alerts should be rendered and accessibility title should be displayed
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(2);
    const alertGroupTitle = element.shadowRoot!.querySelector('.sbb-alert-group__title')!;
    expect(alertGroupTitle.textContent!.trim()).to.be.equal(accessibilityTitle);
    expect(alertGroupTitle.localName).to.be.equal(`h${accessibilityTitleLevel}`);

    // When clicking on close button of the first alert
    const closeButton = alert1.shadowRoot!.querySelector<SbbTransparentButtonElement>(
      '.sbb-alert__close-button-wrapper sbb-transparent-button',
    )!;
    closeButton.focus();
    closeButton.click();
    await waitForLitRender(element);
    await alert1ClosedEventSpy.calledOnce();

    // Then one alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group and accessibility title should still be rendered.
    await waitForCondition(() => element.querySelectorAll('sbb-alert').length === 1);
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(1);
    expect(element.tabIndex).to.be.equal(0);
    expect(document.activeElement!.id).to.be.equal(alertGroupId);
    expect(
      element.shadowRoot!.querySelector('.sbb-alert-group__title')!.textContent!.trim(),
    ).to.be.equal(accessibilityTitle);
    expect(emptySpy.count).to.be.equal(0);

    // When clicking on close button of the second alert
    alert2
      .shadowRoot!.querySelector<SbbTransparentButtonElement>(
        '.sbb-alert__close-button-wrapper sbb-transparent-button',
      )!
      .click();
    await waitForLitRender(element);
    await alert2ClosedEventSpy.calledOnce();

    // Then the alert should be removed from sbb-alert-group, tabindex should be set to 0,
    // focus should be on sbb-alert-group, accessibility title should be removed and empty event should be fired.
    await emptySpy.calledOnce();
    expect(element.querySelectorAll('sbb-alert').length).to.be.equal(0);
    expect(element.tabIndex).to.be.equal(0);
    expect(document.activeElement!.id).to.be.equal(alertGroupId);
    expect(element.shadowRoot!.querySelector('.sbb-alert-group__title')).to.be.null;

    // When clicking away
    await sendMouse({ type: 'click', position: [0, 0] });
    await waitForLitRender(element);

    // Then the active element id should be unset and tabindex should be removed
    expect(document.activeElement!.id).to.be.equal('');
    expect(element.tabIndex).to.be.equal(-1);
  });

  it('should not trigger empty event after initializing with empty sbb-alert-group', async () => {
    // Given empty sbb-alert-group
    element = await fixture(
      html`<sbb-alert-group accessibility-title="Disruptions"></sbb-alert-group>`,
    );
    const emptySpy = new EventSpy(SbbAlertGroupElement.events.empty);

    // Then no title should be rendered and no empty event fired
    expect(element.shadowRoot!.querySelector('.sbb-alert-group__title')).to.be.null;
    expect(emptySpy.count).not.to.be.greaterThan(0);
  });
});
