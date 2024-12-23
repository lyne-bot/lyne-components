import { html } from 'lit/static-html.js';

import {
  describeEach,
  describeViewports,
  visualDiffDefault,
  visualRegressionFixture,
} from '../../../elements/core/testing/private.js';

import style from './scrollbar-internal.scss?lit&inline';

describe(`scrollbar`, () => {
  let root: HTMLElement;

  const cases = {
    thickness: ['thin', 'thick'],
    negative: [false, true],
    trackVisible: [true, false],
  };

  describeViewports({ viewports: ['small'] }, () => {
    describeEach(cases, ({ thickness, negative, trackVisible }) => {
      beforeEach(async function () {
        let scrollbarClass = 'sbb-scrollbar';
        if (thickness === 'thick') {
          scrollbarClass += '-thick';
        }
        if (negative) {
          scrollbarClass += '-negative';
        }
        if (trackVisible) {
          scrollbarClass += '-track-visible';
        }

        root = await visualRegressionFixture(
          html`
            <style>
              ${style}
            </style>
            <div class=${`overflow-container ${scrollbarClass}`}>
              <div class="inner-box">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                ipsum dolor sit amet.
              </div>
            </div>
          `,
          {
            backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
            color: negative ? 'var(--sbb-color-white)' : undefined,
          },
        );
      });

      it(
        visualDiffDefault.name,
        visualDiffDefault.with((setup) => {
          setup.withSnapshotElement(root);
        }),
      );
    });
  });
});
