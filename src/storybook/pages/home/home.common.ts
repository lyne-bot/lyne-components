import type { Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/button.js';
import '../../../elements/card.js';
import '../../../elements/clock.js';
import '../../../elements/divider.js';
import '../../../elements/footer.js';
import '../../../elements/icon.js';
import '../../../elements/image.js';
import '../../../elements/header.js';
import '../../../elements/logo.js';
import '../../../elements/link.js';
import '../../../elements/link-list.js';
import '../../../elements/menu.js';
import '../../../elements/navigation.js';
import '../../../elements/skiplink-list.js';
import '../../../elements/title.js';
import '../../../elements/teaser-hero.js';

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

export const navigation = (): TemplateResult => html`
  <sbb-navigation trigger="hamburger-menu">
    <sbb-navigation-marker id="nav-marker">
      <sbb-navigation-button aria-current="page" id="nav-1" class="sbb-active">
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
      <sbb-navigation-button aria-pressed="true" id="nav-8" class="sbb-active">
        English
      </sbb-navigation-button>
    </sbb-navigation-marker>

    <sbb-navigation-section title-content="Title one" trigger="nav-1">
      <sbb-navigation-list label="Label">
        <sbb-navigation-button aria-current="page" class="sbb-active">Label</sbb-navigation-button>
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
    <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
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
    <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
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
    <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
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
    <sbb-teaser-hero class="teaser-hero" link-content="Learn more" href="https://www.sbb.ch">
      Considerate with SBB Green Class.
      <sbb-image
        slot="image"
        image-src="https://cdn.img.sbb.ch/content/dam/internet/lyne/Billetkontrolle.jpg"
      ></sbb-image>
    </sbb-teaser-hero>
  </section>
`;

export const footer = (args: Args): TemplateResult => html`
  <sbb-footer
    accessibility-title="Footer"
    variant="clock-columns"
    ?negative=${args.negative}
    ?expanded=${args.expanded}
  >
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
      <sbb-button-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        size="m"
      >
        All help topics
      </sbb-button-link>
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
      <sbb-secondary-button-link
        href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
        size="m"
      >
        Subscribe
      </sbb-secondary-button-link>
    </div>
    <sbb-clock></sbb-clock>
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
