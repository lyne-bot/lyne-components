import { html, nothing, type TemplateResult } from 'lit';

import { describeEach, describeViewports, visualDiffDefault } from '../../core/testing/private.js';
import type { SbbIconSidebarElement, SbbSidebarElement } from '../../sidebar.js';

import '../../header.js';
import '../../link/block-link.js';
import '../../link-list.js';
import '../../logo.js';
import '../../sidebar.js';

describe('sbb-icon-sidebar', () => {
  const header = html`<sbb-header expanded size="s" scroll-origin="content">
    <sbb-header-button icon-name="hamburger-menu-small">Menu</sbb-header-button>
    <div style="flex-grow: 1"></div>
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-logo protective-room="none"></sbb-logo>
    </a>
  </sbb-header>`;

  const iconSidebar = (color: SbbIconSidebarElement['color']): TemplateResult =>
    html`<sbb-icon-sidebar color=${color}>
      <sbb-icon-sidebar-link
        accessibility-label="Go to the party"
        icon-name="glass-cocktail-small"
        href="#"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-link
        accessibility-label="Be a unicorn"
        icon-name="unicorn-small"
        href="#"
        class="sbb-active"
        accessibility-current="page"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-button
        aria-label="Be happy"
        icon-name="face-grinning-small"
      ></sbb-icon-sidebar-button>
    </sbb-icon-sidebar>`;

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

  const sidebar = (
    color: SbbSidebarElement['color'],
    position: SbbSidebarElement['position'],
  ): TemplateResult =>
    html`<!-- We take the contrary color to visually distinguish the icon sidebar and the sidebar -->
      <sbb-sidebar color=${color === 'milk' ? 'white' : 'milk'} opened position=${position}>
        <sbb-sidebar-title>Title</sbb-sidebar-title>
        <sbb-sidebar-close-button></sbb-sidebar-close-button>

        <sbb-link-list>
          <sbb-block-link href="#">Link 1</sbb-block-link>
          <sbb-block-link href="#" class="sbb-active">Link 2</sbb-block-link>
        </sbb-link-list>
      </sbb-sidebar>`;

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 400 }, () => {
    const cases: { color: SbbIconSidebarElement['color'][]; position: ('start' | 'end')[] } = {
      color: ['white', 'milk'],
      position: ['start', 'end'],
    };

    describeEach(cases, ({ color, position }) => {
      it(
        visualDiffDefault.name,
        visualDiffDefault.with(async (setup) => {
          await setup.withFixture(
            html`${header}<sbb-icon-sidebar-container>
                ${position === 'start' ? iconSidebar(color) : nothing}
                <sbb-icon-sidebar-content id="content">${content}</sbb-icon-sidebar-content>
                ${position === 'end' ? iconSidebar(color) : nothing}
              </sbb-icon-sidebar-container>`,
            {
              backgroundColor: color === 'white' ? 'var(--sbb-color-milk)' : undefined,
              minHeight: '400px',
            },
          );

          // Scroll
          setup.withPostSetupAction(() => {
            const content = setup.snapshotElement.querySelector('sbb-icon-sidebar-content')!;
            content.scrollTo(0, content.scrollHeight);
          });
        }),
      );
    });

    it(
      'nested',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}
            <sbb-icon-sidebar-container>
              ${iconSidebar('white')}
              <sbb-icon-sidebar-content>
                <sbb-sidebar-container>
                  ${sidebar('white', 'start')}
                  <sbb-sidebar-content id="content">${content}</sbb-sidebar-content>
                </sbb-sidebar-container>
              </sbb-icon-sidebar-content>
            </sbb-icon-sidebar-container>`,
          { minHeight: '400px' },
        );

        setup.withPostSetupAction(() => {
          const sidebar = setup.snapshotElement.querySelector('sbb-sidebar')!;
          sidebar.open();
        });
      }),
    );
  });

  describeViewports({ viewports: ['zero', 'medium'], viewportHeight: 200 }, () => {
    it(
      'scrolled icons',
      visualDiffDefault.with(async (setup) => {
        await setup.withFixture(
          html`${header}<sbb-icon-sidebar-container>
              ${iconSidebar('milk')}
              <sbb-icon-sidebar-content id="content">${content}</sbb-icon-sidebar-content>
            </sbb-icon-sidebar-container>`,
          { minHeight: '200px' },
        );

        // Scroll
        setup.withPostSetupAction(() => {
          const iconSidebar = setup.snapshotElement.querySelector('sbb-icon-sidebar')!;
          iconSidebar.scrollTo(0, iconSidebar.scrollHeight);
        });
      }),
    );
  });
});
