import { html } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../core/testing/private.js';

import './loading-indicator.js';

describe(`sbb-loading-indicator`, () => {
  const cases = {
    color: ['default', 'smoke', 'white'],
    size: ['s', 'l', 'xl', 'xxl', 'xxxl'],
  };

  describeViewports({ viewports: ['zero'] }, () => {
    describeEach(cases, ({ color, size }) => {
      it(
        '',
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`<sbb-loading-indicator color=${color} size=${size}></sbb-loading-indicator>`,
            { backgroundColor: color === 'white' ? 'var(--sbb-color-charcoal)' : undefined },
          );
        }),
      );
    });
  });
});
