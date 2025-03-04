import { html } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './chip.js';

const cases = {
  negative: [true, false],
};

describe('sbb-chip', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    describeEach(cases, ({ negative }) => {
      it(
        `${visualDiffDefault.name}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`);
        }),
      );

      it(
        'slotted label',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative}>Value</sbb-chip>`,
          );
        }),
      );

      it(
        'disabled',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} disabled></sbb-chip>`,
          );
        }),
      );

      it(
        'readonly',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-chip value="Value" ?negative=${negative} readonly></sbb-chip>`,
          );
        }),
      );

      for (const state of [visualDiffActive, visualDiffFocus, visualDiffHover]) {
        // Focus on chip
        it(
          `${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            const chipStateElement = setup.snapshotElement
              .querySelector('sbb-chip')!
              .getFocusSteps()[0];
            setup.withStateElement(chipStateElement);
          }),
        );

        // Focus on delete button
        it(
          `delete_${state.name}`,
          state.with(async (setup) => {
            await setup.withFixture(
              html`<sbb-chip value="Value" ?negative=${negative}></sbb-chip>`,
            );

            const deleteStateElement = setup.snapshotElement
              .querySelector('sbb-chip')!
              .getFocusSteps()[1];

            setup.withStateElement(deleteStateElement);
            setup.withPostSetupAction(() => {
              deleteStateElement.tabIndex = 0; // We force the tab index on the delete button for test purposes
            });
          }),
        );
      }
    });
  });
});
