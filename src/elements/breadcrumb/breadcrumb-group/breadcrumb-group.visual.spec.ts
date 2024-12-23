import { html } from 'lit';

import {
  describeViewports,
  visualDiffDefault,
  visualDiffFocus,
} from '../../core/testing/private.js';

import '../breadcrumb.js';
import './breadcrumb-group.js';

describe('sbb-breadcrumb-group', () => {
  const variants = [
    { name: 'long', numberOfBreadcrumbs: 3 },
    { name: 'collapsed', numberOfBreadcrumbs: 25 },
  ];

  describeViewports({ viewports: ['wide'] }, () => {
    for (const variant of variants) {
      describe(`${variant.name}`, () => {
        for (const state of [visualDiffDefault, visualDiffFocus]) {
          it(
            state.name,
            state.with(async (setup) => {
              await setup.withFixture(html`
                <sbb-breadcrumb-group aria-label="You are here:">
                  <sbb-breadcrumb href="/" icon-name="house-small"></sbb-breadcrumb>
                  ${new Array(variant.numberOfBreadcrumbs - 1)
                    .fill(undefined)
                    .map(
                      (_, i) =>
                        html` <sbb-breadcrumb href="https://www.sbb.ch" target="_blank"
                          >Breadcrumb ${i + 1}
                        </sbb-breadcrumb>`,
                    )}
                </sbb-breadcrumb-group>
              `);
            }),
          );
        }
      });
    }
  });
});
