import { html, nothing } from 'lit';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualDiffStandardStates,
} from '../../core/testing/private.js';

import './tag.js';

describe(`sbb-tag`, () => {
  const cases = {
    checked: [false, true],
    disabled: [false, true],
  };

  const visualCases = {
    size: ['s', 'm'],
    icon: [undefined, 'face-smiling-small'],
    amount: [undefined, 123],
  };

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const visualDiffStandardState of visualDiffStandardStates) {
      it(
        `state=${visualDiffStandardState.name}`,
        visualDiffStandardState.with(async (setup) => {
          await setup.withFixture(html`<sbb-tag>Tag label</sbb-tag>`);
        }),
      );
    }

    describeEach(cases, ({ checked, disabled }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-tag
              ?checked=${checked}
              ?disabled=${disabled}
              icon-name="face-smiling-small"
              amount="123"
              >Tag label</sbb-tag
            >
          `);
        }),
      );
    });

    describe(`disabledInteractive`, () => {
      for (const checked of [false, true]) {
        it(
          `checked=${checked}`,
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(html`
              <sbb-tag
                ?checked=${checked}
                disabled-interactive
                icon-name="face-smiling-small"
                amount="123"
              >
                Tag label
              </sbb-tag>
            `);
          }),
        );
      }
    });

    describeEach(visualCases, ({ icon, amount, size }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-tag
              icon-name=${icon ? icon : nothing}
              amount=${amount ? amount : nothing}
              size=${size}
              >Tag label</sbb-tag
            >
          `);
        }),
      );
    });
  });
});
