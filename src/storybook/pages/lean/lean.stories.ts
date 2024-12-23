import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import '../../../elements/action-group.js';
import '../../../elements/alert.js';
import '../../../elements/container.js';
import '../../../elements/button.js';
import '../../../elements/card.js';
import '../../../elements/checkbox.js';
import '../../../elements/form-field.js';
import '../../../elements/header.js';
import '../../../elements/icon.js';
import '../../../elements/menu.js';
import '../../../elements/paginator.js';
import '../../../elements/radio-button.js';
import '../../../elements/signet.js';
import '../../../elements/table.js';

import './lean.scss';

const leanExampleTemplate = (): TemplateResult => html`
  <sbb-header hide-on-scroll expanded>
    <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
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
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-signet protective-room="panel"></sbb-signet>
    </a>
  </sbb-header>

  <sbb-container expanded>
    <section class="lean-section">
      <div class="lean-wrapper">
        <sbb-form-field>
          <label>Departure</label>
          <sbb-select>
            <sbb-option value="1" selected>Zug</sbb-option>
            <sbb-option value="2">Lucerne</sbb-option>
            <sbb-option value="3">Fribourg</sbb-option>
          </sbb-select>
        </sbb-form-field>
        <sbb-form-field>
          <label>Arrival</label>
          <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
          <input />
          <sbb-icon slot="suffix" name="circle-question-mark-small"></sbb-icon>
        </sbb-form-field>
        <sbb-action-group>
          <sbb-secondary-button>Clear departure</sbb-secondary-button>
          <sbb-button>Search</sbb-button>
        </sbb-action-group>
      </div>
    </section>
    <section class="lean-section">
      <div class="lean-wrapper-half">
        <sbb-table-wrapper>
          <table class="sbb-table sbb-table--striped">
            <thead>
              <th>Station</th>
              <th>Departure</th>
              <th>Arrival</th>
            </thead>
            <tbody>
              <tr>
                <td>Bern</td>
                <td>9:00</td>
                <td>10:00</td>
              </tr>
              <tr>
                <td>Zurich</td>
                <td>9:15</td>
                <td>10:15</td>
              </tr>
              <tr>
                <td>Basel</td>
                <td>9.45</td>
                <td>10.45</td>
              </tr>
              <tr>
                <td>Geneva</td>
                <td>10:00</td>
                <td>11:00</td>
              </tr>
              <tr>
                <td>Lausanne</td>
                <td>10:30</td>
                <td>11:30</td>
              </tr>
              <tr>
                <td>Bellinzona</td>
                <td>11:00</td>
                <td>12:00</td>
              </tr>
            </tbody>
          </table>
        </sbb-table-wrapper>
        <sbb-paginator page-size="10" length="100"></sbb-paginator>
      </div>
      <div class="lean-wrapper-half">
        <sbb-radio-button-group orientation="vertical" horizontal-from="small">
          <sbb-radio-button value="Value one">Value one</sbb-radio-button>
          <sbb-radio-button value="Value two">Value two</sbb-radio-button>
          <sbb-radio-button value="Value three" disabled> Value three </sbb-radio-button>
          <sbb-radio-button value="Value four">Value four</sbb-radio-button>
        </sbb-radio-button-group>
        <sbb-checkbox-panel>
          Label
          <span slot="subtext">Subtext</span>
          <span slot="suffix" style="margin-inline-start: auto; display:flex; align-items:center;">
            <sbb-icon
              name="diamond-small"
              style="margin-inline: var(--sbb-spacing-fixed-2x);"
              data-namespace="default"
              role="img"
              aria-hidden="true"
            ></sbb-icon>
            <span class="sbb-text-m sbb-text--bold"> CHF 40.00 </span>
          </span>
          <sbb-card-badge>%</sbb-card-badge>
        </sbb-checkbox-panel>
      </div>
    </section>
  </sbb-container>
`;

export const leanExample: StoryObj = {
  render: leanExampleTemplate,
};

const meta: Meta = {
  parameters: {
    isLean: true,
    layout: 'fullscreen',
  },
  title: 'pages/lean',
};

export default meta;
