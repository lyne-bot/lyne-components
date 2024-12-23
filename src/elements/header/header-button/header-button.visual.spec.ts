import { html } from 'lit';

import { describeViewports, visualDiffStandardStates } from '../../core/testing/private.js';

import './header-button.js';

describe(`sbb-header-button`, () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const forcedColors of [false, true]) {
      describe(`forcedColors=${forcedColors}`, () => {
        for (const active of [false, true]) {
          describe(`active=${active}`, () => {
            for (const state of visualDiffStandardStates) {
              it(
                state.name,
                state.with(async (setup) => {
                  await setup.withFixture(
                    html`
                      <sbb-header-button
                        icon-name="hamburger-menu-small"
                        class=${active ? 'sbb-active' : ''}
                      >
                        Menu
                      </sbb-header-button>
                    `,
                    { forcedColors },
                  );
                }),
              );
            }
          });
        }
      });
    }
  });
});
