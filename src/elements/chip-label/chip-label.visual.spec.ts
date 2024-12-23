import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './chip-label.js';

describe(`sbb-chip-label`, () => {
  const sizeCases = ['xxs', 'xs', 's'];
  const colorCases = ['milk', 'charcoal', 'white', 'granite'];

  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    // Size test
    for (const size of sizeCases) {
      it(
        `size=${size}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(html`
            <sbb-chip-label size=${size as 'xxs' | 'xs' | 's'}> Label </sbb-chip-label>
          `);
        }),
      );
    }

    // Color test
    for (const color of colorCases) {
      it(
        `color=${color}`,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-chip-label color=${color as 'milk' | 'charcoal' | 'white' | 'granite'}>
                Label
              </sbb-chip-label>
            `,
            {
              backgroundColor: color === 'white' ? 'var(--sbb-color-granite)' : undefined,
            },
          );
        }),
      );
    }

    it(
      `fixed width`,
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(html`
          <sbb-chip-label style="width: 10rem">
            This is a very long label which will be cut.
          </sbb-chip-label>
        `);
      }),
    );
  });
});
