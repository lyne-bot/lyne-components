import type { Args, StoryContext } from '@storybook/web-components';
import isChromatic from 'chromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { ref } from 'lit/directives/ref.js';

import { sbbSpread } from '../../../components/core/dom';
import type {
  SbbNavigationElement,
  SbbNavigationMarkerElement,
  SbbNavigationButtonElement,
} from '../../../components/navigation';
import '../../../components/button/button';
import '../../../components/button/secondary-button';
import '../../../components/button/secondary-button-static';
import '../../../components/card';
import '../../../components/clock';
import '../../../components/divider';
import '../../../components/footer';
import '../../../components/icon';
import '../../../components/header';
import '../../../components/logo';
import '../../../components/link';
import '../../../components/link-list';
import '../../../components/menu';
import '../../../components/navigation';
import '../../../components/skiplink-list';
import '../../../components/teaser-hero';
import '../../../components/title';

export const skiplinkList = (): TemplateResult => html`
  <sbb-skiplink-list title-level="2" title-content="Skip to">
    <sbb-block-link href="#">Skip to content</sbb-block-link>
    <sbb-block-link href="#">Go to help page</sbb-block-link>
  </sbb-skiplink-list>
`;

export const timetableInput = (): TemplateResult => html`
  <section class="timetable-section sbb-grid">
    <div class="grid-reduced-width">
      <div class="timetable-placeholder"></div>
    </div>
  </section>
`;

const onNavigationClose = (dialog: SbbNavigationElement): void => {
  dialog?.addEventListener('did-close', () => {
    (document.getElementById('nav-marker') as SbbNavigationMarkerElement).reset();
    (document.getElementById('nav-1') as SbbNavigationButtonElement).setAttribute('active', '');
  });
};

export const navigation = (): TemplateResult => html`
  <sbb-navigation
    trigger="hamburger-menu"
    ${ref((dialog?: Element) => onNavigationClose(dialog as SbbNavigationElement))}
  >
    <sbb-navigation-marker id="nav-marker">
      <sbb-navigation-button aria-current="page" id="nav-1" active>
        Tickets & Offers
      </sbb-navigation-button>
      <sbb-navigation-button id="nav-2">Vacations & Recreation</sbb-navigation-button>
      <sbb-navigation-button id="nav-3">Travel information</sbb-navigation-button>
      <sbb-navigation-link id="nav-4" href="https://www.sbb.ch/en/">
        Help & Contact
      </sbb-navigation-link>
    </sbb-navigation-marker>

    <sbb-navigation-marker size="s">
      <sbb-navigation-button aria-pressed="false" id="nav-5"> Deutsch </sbb-navigation-button>
      <sbb-navigation-button aria-pressed="false" id="nav-6"> Français </sbb-navigation-button>
      <sbb-navigation-button aria-pressed="false" id="nav-7"> Italiano </sbb-navigation-button>
      <sbb-navigation-button aria-pressed="true" id="nav-8" active> English </sbb-navigation-button>
    </sbb-navigation-marker>

    <sbb-navigation-section title-content="Title one" trigger="nav-1">
      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-button size="m" class="navigation-button"> All Tickets & Offers </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section title-content="Title two" trigger="nav-2">
      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>
    </sbb-navigation-section>

    <sbb-navigation-section title-content="Title three" trigger="nav-3">
      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-navigation-list label="Label">
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
        <sbb-navigation-button>Label</sbb-navigation-button>
      </sbb-navigation-list>

      <sbb-secondary-button size="m" icon-name="circle-information-small" class="navigation-button">
        Travel Information
      </sbb-secondary-button>
    </sbb-navigation-section>
  </sbb-navigation>
`;

export const dailyTicketProduct = (): TemplateResult => html`
  <sbb-card color="milk" size="s">
    <sbb-card-link href="https://github.com/lyne-design-system/lyne-components">
      Buy Daily Ticket
    </sbb-card-link>

    <span class="card-product">
      <sbb-icon name="ticket-route-medium"></sbb-icon>
      <span class="content">
        <sbb-title level="2" visual-level="6"> Daily ticket </sbb-title>
        <span class="sbb-text-s card-description">Valid today</span>
      </span>
      <sbb-secondary-button-static size="m"> Buy </sbb-secondary-button-static>
    </span>
  </sbb-card>
`;

export const bikeProduct = (): TemplateResult => html`
  <sbb-card color="milk" size="s">
    <sbb-card-link href="https://github.com/lyne-design-system/lyne-components">
      Buy Bike daily pass
    </sbb-card-link>

    <span class="card-product">
      <sbb-icon name="bicycle-medium"></sbb-icon>
      <span class="content">
        <sbb-title level="2" visual-level="6"> Bike day pass </sbb-title>
        <span class="sbb-text-s card-description">Valid today</span>
      </span>
      <sbb-secondary-button-static size="m"> Buy </sbb-secondary-button-static>
    </span>
  </sbb-card>
`;

export const liberoProduct = (): TemplateResult => html`
  <sbb-card color="milk" size="s">
    <sbb-card-link href="https://github.com/lyne-design-system/lyne-components">
      Buy Libero short distance ticket
    </sbb-card-link>

    <span class="card-product">
      <sbb-icon name="ticket-route-medium"></sbb-icon>
      <span class="content">
        <sbb-title level="2" visual-level="6"> Libero short distance ticket </sbb-title>
        <span class="sbb-text-s card-description">Valid today</span>
      </span>
      <sbb-secondary-button-static size="m"> Buy </sbb-secondary-button-static>
    </span>
  </sbb-card>
`;

export const teaserHero = (): TemplateResult => html`
  <section class="sbb-page-spacing">
    <sbb-teaser-hero
      data-chromatic="ignore"
      class="teaser-hero"
      link-content="Learn more"
      image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
      href="https://www.sbb.ch"
    >
      Considerate with SBB Green Class.
    </sbb-teaser-hero>
  </section>
`;

export const footer = (args: Args): TemplateResult => html`
  <sbb-footer accessibility-title="Footer" variant="clock-columns" ?negative=${args.negative}>
    <div class="sbb-link-list-button-group">
      <sbb-link-list title-level="2" title-content="Help &amp; Contact." ?negative=${args.negative}>
        <sbb-block-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          ?negative=${args.negative}
        >
          Refunds
        </sbb-block-link>
        <sbb-block-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          ?negative=${args.negative}
        >
          Lost property office
        </sbb-block-link>
        <sbb-block-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          ?negative=${args.negative}
        >
          Complaints
        </sbb-block-link>
        <sbb-block-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          ?negative=${args.negative}
        >
          Praise
        </sbb-block-link>
        <sbb-block-link
          href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
          ?negative=${args.negative}
        >
          Report property damage
        </sbb-block-link>
      </sbb-link-list>
      <sbb-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        size="m"
      >
        All help topics
      </sbb-button>
    </div>
    <sbb-link-list title-level="2" title-content="More SBB." ?negative=${args.negative}>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Jobs & careers
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Rail traffic information
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        SBB News
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        SBB Community
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Company
      </sbb-block-link>
    </sbb-link-list>
    <div class="sbb-link-list-button-group">
      <span>
        <sbb-title level="2" visual-level="5" ?negative=${args.negative} class="footer-title">
          Newsletter.
        </sbb-title>
        <p class="footer-text">
          Our newsletter regularly informs you of attractive offers from SBB via e-mail.
        </p>
      </span>
      <sbb-secondary-button
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        size="m"
      >
        Subscribe
      </sbb-secondary-button>
    </div>
    <sbb-clock
      ${sbbSpread(
        isChromatic() ? { 'data-now': new Date('2023-01-24T02:59:27+01:00').valueOf() } : {},
      )}
    ></sbb-clock>
    <sbb-divider ?negative=${args.negative}></sbb-divider>
    <sbb-link-list horizontal-from="large" ?negative=${args.negative}>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Refunds
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Lost property office
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Complaints
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Praise
      </sbb-block-link>
      <sbb-block-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        ?negative=${args.negative}
      >
        Report property damage
      </sbb-block-link>
    </sbb-link-list>
  </sbb-footer>
`;

export const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal)'
    : 'var(--sbb-color-white)',
});
