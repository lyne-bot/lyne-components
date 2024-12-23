import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './map-container.js';
import '../form-field.js';
import '../icon.js';
import '../title.js';
import '../header.js';
import '../logo.js';

const hideScrollUpButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'hide-scroll-up-button': hideScrollUpButton,
};

const defaultArgs: Args = {
  'hide-scroll-up-button': false,
};

const Template = (args: Args): TemplateResult => html`
  <sbb-map-container ${sbbSpread(args)}>
    <div style=${styleMap({ padding: 'var(--sbb-spacing-fixed-4x)' })}>
      <sbb-form-field style=${styleMap({ width: '100%' })}>
        <sbb-icon slot="prefix" name="magnifying-glass-small"></sbb-icon>
        <input minlength=${2} name="keyword" autocomplete="off" placeholder="Search" />
        <sbb-form-field-clear></sbb-form-field-clear>
      </sbb-form-field>
      <sbb-title level="4">Operations & Disruptions</sbb-title>
      ${[...Array(10).keys()].map(
        (value) => html`
          <div
            style=${styleMap({
              'background-color': 'var(--sbb-color-milk)',
              height: '116px',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              'border-radius': 'var(--sbb-border-radius-4x)',
              'margin-block-end': 'var(--sbb-spacing-fixed-4x)',
            })}
          >
            <p>Situation ${value}</p>
          </div>
        `,
      )}
    </div>

    <div slot="map" style=${styleMap({ height: '100%' })}>
      <div
        style=${styleMap({
          'background-color': 'grey',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center',
        })}
      >
        map
      </div>
    </div>
  </sbb-map-container>
`;

export const MapContainer: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <sbb-header expanded>
        <sbb-header-button icon-name="hamburger-menu-small" expand-from="small">
          Menu
        </sbb-header-button>
        <div class="sbb-header-spacer"></div>
        <sbb-logo protective-room="none" class="sbb-header-logo"></sbb-logo>
      </sbb-header>
      ${story()}
    `,
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'elements/sbb-map-container',
};

export default meta;
