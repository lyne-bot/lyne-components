import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
  visualRegressionFixture,
} from '../../core/testing/private.js';

import '../../icon.js';
import './icon-sidebar-link.js';

describe(`sbb-icon-sidebar-link`, () => {
  let root: HTMLElement;

  const cases = {
    slottedIcon: [false, true],
    forcedColors: [false, true],
    currentPage: [false, true],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ slottedIcon, forcedColors, currentPage }) => {
      beforeEach(async function () {
        root = await visualRegressionFixture(
          html`
            <sbb-icon-sidebar-link
              href="#"
              icon-name=${!slottedIcon ? 'glass-cocktail-small' : nothing}
              class=${currentPage ? 'sbb-active' : nothing}
              style="width: var(--sbb-size-element-m)"
            >
              ${slottedIcon
                ? html`<sbb-icon name="glass-cocktail-small" slot="icon"></sbb-icon>`
                : nothing}
            </sbb-icon-sidebar-link>
          `,
          { forcedColors },
        );
      });

      for (const state of visualDiffStandardStates) {
        it(
          state.name,
          state.with((setup) => {
            setup.withSnapshotElement(root);
          }),
        );
      }
    });
  });
});
