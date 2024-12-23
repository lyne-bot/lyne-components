import { html } from 'lit';

import {
  describeViewports,
  visualDiffActive,
  visualDiffDefault,
  visualDiffFocus,
  visualDiffHover,
} from '../../core/testing/private.js';

import './paginator.js';

describe('sbb-paginator', () => {
  describeViewports({ viewports: ['zero', 'medium'] }, () => {
    for (const negative of [false, true]) {
      describe(`negative=${negative}`, () => {
        const wrapperStyle = {
          backgroundColor: negative ? 'var(--sbb-color-black)' : undefined,
        };

        for (const forcedColors of [false, true]) {
          describe(`forcedColors=${forcedColors}`, () => {
            for (const state of [visualDiffFocus, visualDiffHover, visualDiffActive] as const) {
              describe(`state=${state.name}`, () => {
                for (const selected of [false, true]) {
                  it(
                    `selected=${selected}`,
                    state.with(async (setup) => {
                      await setup.withFixture(
                        html`<sbb-paginator
                          ?negative=${negative}
                          length="50"
                          page-size="10"
                          pager-position="end"
                          page-size-options="[10, 20, 50]"
                        ></sbb-paginator>`,
                        { ...wrapperStyle, forcedColors },
                      );
                      setup.withStateElement(
                        setup.snapshotElement
                          .querySelector('sbb-paginator')!
                          .shadowRoot!.querySelector(`button[data-index="${selected ? 0 : 1}"]`)!,
                      );
                    }),
                  );
                }
              });
            }

            it(
              'disabled=true',
              visualDiffDefault.with(async (setup) => {
                await setup.withFixture(
                  html`<sbb-paginator length="100" disabled ?negative=${negative}></sbb-paginator>`,
                  { ...wrapperStyle, forcedColors },
                );
              }),
            );
          });
        }

        for (const pageIndex of [0, 5, 9]) {
          it(
            `pageIndex=${pageIndex}`,
            visualDiffDefault.with(async (setup) => {
              await setup.withFixture(
                html`<sbb-paginator
                  length="100"
                  page-index=${pageIndex}
                  ?negative=${negative}
                ></sbb-paginator>`,
                wrapperStyle,
              );
            }),
          );
        }

        for (const pagerPosition of ['start', 'end']) {
          describe(`pagerPosition=${pagerPosition}`, () => {
            for (const size of ['s', 'm']) {
              it(
                `size=${size}`,
                visualDiffDefault.with(async (setup) => {
                  const pageSizeOptions = [10, 20, 50];
                  await setup.withFixture(
                    html`<sbb-paginator
                      length="50"
                      page-size="4"
                      size=${size}
                      pager-position=${pagerPosition}
                      .pageSizeOptions="${pageSizeOptions}"
                      ?negative=${negative}
                    ></sbb-paginator>`,
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
