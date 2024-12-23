import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './popover-trigger.js';

describe(`sbb-popover-trigger`, () => {
  const cases = {
    disabled: [false, true],
    negative: [false, true],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ disabled, negative }) => {
      for (const state of visualDiffStandardStates) {
        it(
          `icon ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`
                <span
                  class="sbb-text-s"
                  style="display: flex; align-items: center; ${negative
                    ? 'color: var(--sbb-color-white)'
                    : ''}"
                >
                  <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);">
                    This is a demo text.
                  </span>
                  <sbb-popover-trigger
                    ?disabled=${disabled}
                    ?negative=${negative}
                  ></sbb-popover-trigger>
                </span>
              `,
              { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
            );
          }),
        );

        it(
          `custom content ${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`
                <div class="sbb-text-l" style="color: var(--sbb-color-sky);">
                  <sbb-popover-trigger ?disabled=${disabled} ?negative=${negative}>
                    Custom content
                  </sbb-popover-trigger>
                </div>
              `,
              { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
            );
          }),
        );
      }
    });

    describe(`disabledInteractive`, () => {
      for (const negative of [false, true]) {
        describe(`negative=${negative}`, () => {
          for (const state of visualDiffStandardStates) {
            it(
              state.name,
              state.with(async (setup) => {
                await setup.withFixture(
                  html`
                    <span
                      class="sbb-text-s"
                      style="display: flex; align-items: center; ${negative
                        ? 'color: var(--sbb-color-white)'
                        : ''}"
                    >
                      <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);">
                        This is a demo text.
                      </span>
                      <sbb-popover-trigger
                        disabled-interactive
                        ?negative=${negative}
                      ></sbb-popover-trigger>
                    </span>
                  `,
                  { backgroundColor: negative ? 'var(--sbb-color-charcoal)' : undefined },
                );
              }),
            );
          }
        });
      }
    });
  });
});
