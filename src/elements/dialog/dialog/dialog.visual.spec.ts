import { html, nothing, type TemplateResult } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import './dialog.js';
import '../dialog-actions.js';
import '../dialog-content.js';
import '../dialog-title.js';
import '../../link/block-link.js';
import '../../button/button.js';
import '../../button/secondary-button.js';

describe(`sbb-dialog`, () => {
  const negativeCases = [false, true];

  const hideOnScrollCases = [false, true];

  const dialogTitle = (backButton = true, hideOnScroll = false): TemplateResult => html`
    <sbb-dialog-title ?back-button=${backButton} ?hide-on-scroll=${hideOnScroll}>
      A describing title of the dialog
    </sbb-dialog-title>
  `;

  const dialogContent = (longContent = false): TemplateResult => html`
    <sbb-dialog-content>
      <p style="margin: 0">
        “What really knocks me out is a book that, when you're all done reading it, you wish the
        author that wrote it was a terrific friend of yours and you could call him up on the phone
        whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher
        in the Rye
      </p>
      ${longContent
        ? html`
            <p>
              “What really knocks me out is a book that, when you're all done reading it, you wish
              the author that wrote it was a terrific friend of yours and you could call him up on
              the phone whenever you felt like it. That doesn't happen much, though.” ― J.D.
              Salinger, The Catcher in the Rye
            </p>
          `
        : nothing}
    </sbb-dialog-content>
  `;

  const dialogFooter = (negative = false): TemplateResult => html`
    <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="medium">
      <sbb-block-link
        align-self="start"
        icon-name="chevron-small-left-small"
        href="https://www.sbb.ch/en/"
        ?negative=${negative}
        sbb-dialog-close
      >
        Link
      </sbb-block-link>
      <sbb-secondary-button sbb-dialog-close> Cancel </sbb-secondary-button>
      <sbb-button sbb-dialog-close> Confirm </sbb-button>
    </sbb-dialog-actions>
  `;

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 600 }, () => {
    // Negative test
    for (const negative of negativeCases) {
      it(
        `negative=${negative}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-dialog ?negative=${negative}>
              ${dialogTitle()} ${dialogContent()} ${dialogFooter(negative)}
            </sbb-dialog>
          `);
          const dialog = setup.snapshotElement.querySelector('sbb-dialog')!;
          setup.withSnapshotElement(dialog);
          dialog.open();
        }),
      );
    }

    // Hide on scroll test
    for (const hideOnScroll of hideOnScrollCases) {
      it(
        `hideOnScroll=${hideOnScroll}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-dialog>
              ${dialogTitle(undefined, hideOnScroll)} ${dialogContent(true)} ${dialogFooter()}
            </sbb-dialog>
          `);
          const dialog = setup.snapshotElement.querySelector('sbb-dialog')!;
          setup.withSnapshotElement(dialog);
          dialog.open();
          await waitForLitRender(dialog);

          // scroll the container
          const contentWrapper = dialog
            .querySelector('sbb-dialog-content')!
            .shadowRoot!.querySelector('.sbb-dialog-content')!;
          contentWrapper.scrollTop = 100;
        }),
      );
    }

    it(
      `no back button`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog> ${dialogTitle(false)} ${dialogContent()} ${dialogFooter()} </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        dialog.open();
      }),
    );

    it(
      `no footer`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog> ${dialogTitle()} ${dialogContent()} </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        dialog.open();
      }),
    );

    it(
      `long content`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-dialog> ${dialogTitle()} ${dialogContent(true)} ${dialogFooter()} </sbb-dialog>
        `);
        const dialog = setup.snapshotElement.querySelector('sbb-dialog')!;
        setup.withSnapshotElement(dialog);
        dialog.open();
      }),
    );
  });
});
