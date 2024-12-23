import type { Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/alert.js';
import '../../../elements/action-group.js';
import {
  bikeProduct,
  dailyTicketProduct,
  footer,
  liberoProduct,
  navigation,
  skiplinkList,
  teaserHero,
  timetableInput,
} from './home.common.js';
import './home.scss';

export const homeTemplate = (args: Args): TemplateResult => html`
  <div>
    ${skiplinkList()}

    <!-- Header section -->
    <sbb-header hide-on-scroll ?expanded=${args.expanded}>
      <sbb-header-button id="hamburger-menu" icon-name="hamburger-menu-small" expand-from="small">
        Menu
      </sbb-header-button>
      <div class="sbb-header-spacer"></div>
      <sbb-header-link icon-name="magnifying-glass-small" href="/"> Search </sbb-header-link>
      <sbb-header-button icon-name="user-small" class="sbb-header-shrinkable">
        Sign in
      </sbb-header-button>
      <sbb-header-button icon-name="globe-small" id="language-menu-trigger" class="last-element">
        English
      </sbb-header-button>
      <sbb-menu trigger="language-menu-trigger">
        <sbb-menu-button aria-pressed="false">Deutsch</sbb-menu-button>
        <sbb-menu-button aria-pressed="false">Français</sbb-menu-button>
        <sbb-menu-button aria-pressed="false">Italiano</sbb-menu-button>
        <sbb-menu-button icon-name="tick-small" aria-pressed="true"> English </sbb-menu-button>
      </sbb-menu>
      <div class="sbb-header-spacer sbb-header-spacer-logo"></div>
      <a href="https://www.sbb.ch" class="sbb-header-logo">
        <sbb-logo protective-room="none"></sbb-logo>
      </a>
    </sbb-header>

    ${navigation()}

    <!-- Timetable input section -->
    ${timetableInput()}

    <!-- Alerts section-->
    <section class="alert-section sbb-grid">
      <div class="grid-reduced-width">
        <sbb-alert-group accessibility-title="Disruptions">
          <sbb-alert title-content="Interruption between Genève and Lausanne" size="l">
            The rail traffic between Allaman and Morges is interrupted. All trains are cancelled.
            <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
          </sbb-alert>
          <sbb-alert title-content="Interruption between Berne and Olten">
            Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00
            o'clock construction work will take place. You have to expect changed travel times and
            changed connections.
            <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
          </sbb-alert>
        </sbb-alert-group>
      </div>
    </section>

    <!-- Top products section -->
    <section class="sbb-page-spacing">
      <div class="top-products-container">
        <sbb-title level="2" ?negative=${args.negative}> Top Products. </sbb-title>
        <div class="top-products-grid">
          ${dailyTicketProduct()} ${bikeProduct()} ${liberoProduct()}
          <sbb-card color="milk" size="s">
            <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
              Buy daily ticket
            </sbb-card-link>
            <span class="card-product">
              <sbb-icon name="ticket-route-medium"></sbb-icon>
              <span class="content">
                <sbb-title level="2" visual-level="6"> Route map </sbb-title>
                <span class="sbb-text-s card-description">For regular trips</span>
              </span>
              <sbb-secondary-button-static size="m"> Buy </sbb-secondary-button-static>
            </span>
          </sbb-card>

          <sbb-card color="milk" size="s" class="grid-span-2">
            <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
              Show all GAs at a glance
            </sbb-card-link>
            <span class="card-product-big">
              <span class="content">
                <sbb-title level="2" visual-level="1"> GA </sbb-title>
                <sbb-title level="3" visual-level="6">
                  Enjoy unlimited travel with the GA travel card.
                </sbb-title>
              </span>
              <sbb-secondary-button-static> All GAs at a glance </sbb-secondary-button-static>
            </span>
          </sbb-card>

          <sbb-card class="grid-span-2" color="milk" size="s">
            <sbb-card-link href="https://github.com/sbb-design-systems/lyne-components">
              Buy half price ticket
            </sbb-card-link>

            <span class="card-product-big">
              <span class="content">
                <sbb-title level="2" visual-level="1"> 1/2 </sbb-title>
                <sbb-title level="3" visual-level="6">
                  Travel at half price with the half-fare travel card.
                </sbb-title>
              </span>
              <sbb-secondary-button-static> Ride at half price </sbb-secondary-button-static>
            </span>
          </sbb-card>
        </div>
        <sbb-action-group orientation="vertical" horizontal-from="small">
          <sbb-button-link
            href="https://github.com/sbb-design-systems/lyne-components"
            icon-name="qrcode-small"
          >
            My tickets & subscriptions
          </sbb-button-link>
          <sbb-secondary-button-link href="https://github.com/sbb-design-systems/lyne-components">
            All Products
          </sbb-secondary-button-link>
        </sbb-action-group>
      </div>
    </section>

    <!-- Hero Teaser section-->
    ${teaserHero()}

    <!-- Footer section -->
    ${footer(args)}
  </div>
`;
