import { html } from 'lit';

import { describeViewports, visualDiffDefault } from '../../core/testing/private.js';

import './compact-paginator.js';

describe('sbb-compact-paginator', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        const wrapperStyle = {
          backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
        };

        for (const forcedColors of [false, true]) {
          describe(`forcedColors=${forcedColors}`, () => {
            for (const pagerPosition of ['start', 'end']) {
              describe(`pagerPosition=${pagerPosition}`, () => {
                it(
                  visualDiffDefault.name,
                  visualDiffDefault.with(async (setup) => {
                    await setup.withFixture(
                      html` <sbb-compact-paginator
                        ?negative=${negative}
                        pager-position=${pagerPosition}
                        length="50"
                        page-size="5"
                      ></sbb-compact-paginator>`,
                      { ...wrapperStyle, forcedColors },
                    );
                  }),
                );
              });
            }

            it(
              'disabled=true',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`<sbb-compact-paginator
                    length="100"
                    disabled
                    ?negative=${negative}
                  ></sbb-compact-paginator>`,
                  { ...wrapperStyle, forcedColors },
                );
              }),
            );
          });
        }

        for (const size of ['s', 'm']) {
          describe(`size=${size}`, () => {
            for (const pageIndex of [0, 5, 9]) {
              it(
                `pageIndex=${pageIndex}`,
                visualDiffDefault.with(async (setup) => {
                  await setup.withFixture(
                    html` <sbb-compact-paginator
                      length="50"
                      page-size="5"
                      page-index=${pageIndex}
                      size=${size}
                      ?negative=${negative}
                    ></sbb-compact-paginator>`,
                    wrapperStyle,
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
