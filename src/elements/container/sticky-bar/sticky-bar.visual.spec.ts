import { SbbBreakpointMediumMin } from '@sbb-esta/lyne-design-tokens';
import { setViewport } from '@web/test-runner-commands';
import { html, type TemplateResult } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../core/testing/private.js';
import { waitForLitRender } from '../../core/testing.js';

import type { SbbStickyBarElement } from './sticky-bar.js';

import './sticky-bar.js';
import '../container.js';
import '../../action-group.js';
import '../../button.js';
import '../../link.js';
import '../../title.js';

describe(`sbb-sticky-bar`, () => {
  const cases = {
    color: [undefined, 'white', 'milk'],
    containerExpanded: [false, true],
    scrolled: [false, true],
  };

  const containerContent = (): TemplateResult => html`
    <sbb-title level="4">Example title</sbb-title>
    <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
    <sbb-secondary-button style="margin-block-end: 0.75rem;" size="m">
      See more
    </sbb-secondary-button>
  `;

  const actionGroup = (): TemplateResult => html`
    <sbb-action-group align-group="stretch" orientation="vertical" style="width:100%;">
      <sbb-block-link align-self="start" icon-name="chevron-small-left-small">
        Link
      </sbb-block-link>
      <sbb-button>Confirm</sbb-button>
    </sbb-action-group>
  `;

  describeViewports({ viewports: ['zero', 'medium', 'ultra'] }, () => {
    describeEach(cases, ({ color, containerExpanded, scrolled }) => {
      let root: HTMLElement;

      beforeEach(async function () {
        const element = await visualRegressionFixture(
          html`
            <div id="scroll-container" style="overflow: auto; height: 400px;">
              <sbb-container
                ?expanded=${containerExpanded}
                style="--sbb-container-background-color: var(--sbb-color-cloud)"
              >
                ${containerContent()} ${containerContent()} ${containerContent()}
                <p>Content end</p>
                <sbb-sticky-bar .color=${color}> ${actionGroup()} </sbb-sticky-bar>
              </sbb-container>
            </div>
          `,
          { padding: '0' },
        );
        root = element.querySelector('#scroll-container')!;
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
          setup.withPostSetupAction(async () => {
            if (scrolled) {
              root.scrollTop = root.scrollHeight;
              await waitForLitRender(root);
            }
          });
        }),
      );
    });

    it(
      `unstick`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`<sbb-container>
            ${containerContent()}
            <sbb-sticky-bar color="milk"> ${actionGroup()} </sbb-sticky-bar>
          </sbb-container>`,
          { padding: '0' },
        );

        setup.withPostSetupAction(async () => {
          setup.snapshotElement.querySelector<SbbStickyBarElement>('sbb-sticky-bar')!.unstick();
          await waitForLitRender(setup.snapshotElement);
        });
      }),
    );
  });

  it(
    `viewport=medium_short content`,
    visualDiffDefault.with(async (setup) => {
      await setup.withFixture(
        html`<sbb-container>
          ${containerContent()}
          <sbb-sticky-bar color="milk"> ${actionGroup()} </sbb-sticky-bar>
        </sbb-container>`,
        { padding: '0' },
      );
      await setViewport({ width: SbbBreakpointMediumMin, height: 400 });
    }),
  );
});
