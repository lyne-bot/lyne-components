import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit/static-html.js';

import type { SbbTransparentButtonElement } from '../../button/transparent-button.js';
import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { EventSpy, waitForCondition } from '../../core/testing.js';
import { SbbAlertElement } from '../alert.js';

import './alert-group.js';

describe(`sbb-alert-group`, () => {
  const alert = html`<sbb-alert title-content="Interruption between Berne and Olten">
    Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock
    construction work will take place. You have to expect changed travel times and changed
    connections.
  </sbb-alert>`;

  describeViewports({ viewports: ['medium'] }, () => {
    it(
      'basic',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-alert-group> ${alert} ${alert} ${alert} </sbb-alert-group>`,
        );
      }),
    );

    it(
      'focused group after deletion',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`<sbb-alert-group>${alert} ${alert}</sbb-alert-group>`);

        setup.withPostSetupAction(async () => {
          const alert = setup.snapshotElement.querySelector('sbb-alert')!;
          const didCloseEventSpy = new EventSpy(SbbAlertElement.events.didClose, alert);

          // As registering an eventSpy is too late we have to use waitForCondition().
          await waitForCondition(() => alert.getAttribute('data-state') === 'opened');

          const closeButton = setup.snapshotElement
            .querySelector('sbb-alert')!
            .shadowRoot!.querySelector<SbbTransparentButtonElement>('.sbb-alert__close-button')!;

          closeButton.focus();
          await sendKeys({ press: 'Enter' });

          await didCloseEventSpy.calledOnce();
        });
      }),
    );
  });
});
