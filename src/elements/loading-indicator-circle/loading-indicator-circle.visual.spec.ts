import { html, nothing } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './loading-indicator-circle.js';

describe(`sbb-loading-indicator-circle`, () => {
  const cases = {
    color: ['default', 'smoke', 'white'],
    size: ['s', 'l'],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ color, size }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`
              <sbb-loading-indicator-circle
                color=${color}
                style=${size === 'l' ? 'font-size: var(--sbb-font-size-text-xl);' : nothing}
              ></sbb-loading-indicator-circle>
            `,
            { backgroundColor: color === 'white' ? 'var(--sbb-color-charcoal)' : undefined },
          );
        }),
      );
    });
  });
});
