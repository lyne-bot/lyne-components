import { html, nothing, type TemplateResult } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import { waitForCondition } from '../../core/testing.js';
import type { SbbSidebarElement } from '../../sidebar.js';

import '../../header.js';
import '../../link/block-link.js';
import '../../link-list.js';
import '../../logo.js';
import '../../sidebar.js';

describe('sbb-sidebar', () => {
  const header = html`<sbb-header expanded size="s" scroll-origin="content">
    <sbb-header-button icon-name="arrows-right-left-small">Toggle sidebar</sbb-header-button>
    <div style="flex-grow: 1"></div>
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-logo protective-room="none"></sbb-logo>
    </a>
  </sbb-header>`;

  const content = html`
    <p style="padding: var(--sbb-spacing-fixed-4x); margin: 0">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure
      dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
      nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
      zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat.
    </p>
  `;

  const sidebar = ({
    color,
    position,
    mode,
    hideTitle,
    hideCloseButton,
    title,
    closed,
  }: Partial<{
    color: SbbSidebarElement['color'];
    position: SbbSidebarElement['position'];
    mode: SbbSidebarElement['mode'];
    hideTitle: boolean;
    hideCloseButton: boolean;
    title: string;
    closed: boolean;
  }> = {}): TemplateResult =>
    html`<sbb-sidebar
      ?opened=${!closed}
      color=${color || nothing}
      position=${position || nothing}
      mode=${mode || nothing}
    >
      ${hideTitle
        ? nothing
        : html`<sbb-sidebar-title>${title ? title : 'Title'}</sbb-sidebar-title>`}
      ${hideCloseButton ? nothing : html`<sbb-sidebar-close-button></sbb-sidebar-close-button>`}

      <sbb-link-list>
        <sbb-block-link href="#">Link 1</sbb-block-link>
        <sbb-block-link href="#" class="sbb-active">Link 2</sbb-block-link>

        ${repeat(
          new Array(8),
          (_, i: number) => html`<sbb-block-link href="#">Link ${i + 3}</sbb-block-link>`,
        )}
      </sbb-link-list>
    </sbb-sidebar>`;

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 400 }, () => {
    const cases: {
      color: SbbSidebarElement['color'][];
      position: SbbSidebarElement['position'][];
      mode: SbbSidebarElement['mode'][];
    } = {
      color: ['white', 'milk'],
      position: ['start', 'end'],
      mode: ['side', 'over'],
    };

    describeEach(cases, (args) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`${header}
              <sbb-sidebar-container>
                ${args.position === 'start' ? sidebar(args) : nothing}
                <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
                ${args.position === 'end' ? sidebar(args) : nothing}
              </sbb-sidebar-container>`,
            {
              backgroundColor: args.color === 'white' ? 'var(--sbb-color-milk)' : undefined,
              minHeight: '400px',
            },
          );

          // Scroll
          setup.withPostSetupAction(() => {
            const content = setup.snapshotElement.querySelector('sbb-sidebar-content')!;
            content.scrollTo(0, content.scrollHeight);
          });
        }),
      );
    });

    it(
      'with custom width',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({ color: 'milk', closed: true })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );

        setup.withPostSetupAction(async () => {
          const sidebarElement = setup.snapshotElement.querySelector('sbb-sidebar')!;
          if (setup.snapshotElement.offsetWidth === 320) {
            // Some resize triggers can kick in too late. We have to wait until the small space was detected.
            await waitForCondition(() => sidebarElement.hasAttribute('data-minimum-space'));
          }

          sidebarElement.open();
          sidebarElement.style.width = '400px';
        });
      }),
    );
  });

  describeViewports({ viewports: ['zero'], viewportHeight: 400 }, () => {
    it(
      'mode side opened after forced closed',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar()}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );

        setup.withPostSetupAction(async () => {
          const sidebarElement = setup.snapshotElement.querySelector('sbb-sidebar')!;

          // We need to wait until the resizing is done.
          // We can't await a promise here because we don't know if the resizing is really going to happen
          // or if it's already in zero viewport
          await waitForCondition(() => sidebarElement.getAttribute('data-state') === 'closed');
          sidebarElement.open();
        });
      }),
    );
  });

  describeViewports({ viewports: ['medium'], viewportHeight: 400 }, () => {
    it(
      'with long title',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({
                color: 'milk',
                title: 'This is a long title which breaks into two lines',
              })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );
      }),
    );

    it(
      'without close button',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({
                color: 'milk',
                hideCloseButton: true,
                title: 'This is a long title which breaks into two lines',
              })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );
      }),
    );

    it(
      'without title',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({
                color: 'milk',
                hideTitle: true,
                title: 'This is a long title which breaks into two lines',
              })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );
      }),
    );

    it(
      'without title and close button',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({
                color: 'milk',
                hideTitle: true,
                hideCloseButton: true,
                title: 'This is a long title which breaks into two lines',
              })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );
      }),
    );

    it(
      'scrolled sidebar content',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-sidebar-container>
              ${sidebar({ color: 'milk' })}
              <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
            </sbb-sidebar-container>`,
          { minHeight: '400px' },
        );

        // Scroll
        setup.withPostSetupAction(async () => {
          const sidebarScrollContext = setup.snapshotElement
            .querySelector('sbb-sidebar')!
            .shadowRoot!.querySelector('.sbb-sidebar-content-section')!;
          sidebarScrollContext.scrollTo(0, sidebarScrollContext.scrollHeight);
        });
      }),
    );
  });

  describeViewports({ viewports: ['ultra'], viewportHeight: 800 }, () => {
    for (const dir of ['ltr', 'rtl']) {
      describe(`dir=${dir}`, () => {
        beforeEach(() => {
          document.documentElement.setAttribute('dir', dir);
        });

        it(
          'nested',
          visualDiffDefault.with(async (setup) => {
            await setup.withFixture(
              html`${header}
                <sbb-sidebar-container>
                  ${sidebar()}
                  <sbb-sidebar-content>
                    <sbb-sidebar-container>
                      ${sidebar({ color: 'milk' })}
                      <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
                      ${sidebar({ color: 'milk', position: 'end', mode: 'over' })}
                    </sbb-sidebar-container>
                  </sbb-sidebar-content>
                  ${sidebar({ position: 'end' })}
                </sbb-sidebar-container>`,
              { minHeight: '800px' },
            );
          }),
        );

        afterEach(() => {
          document.documentElement.removeAttribute('dir');
        });
      });
    }
  });
});
