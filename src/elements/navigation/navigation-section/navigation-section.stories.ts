import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import '../../button.js';
import '../navigation-list.js';
import '../navigation-button.js';
import '../navigation-link.js';
import '../navigation-marker.js';
import '../navigation.js';
import './navigation-section.js';

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes: ArgTypes = {
  'accessibility-label': accessibilityLabel,
};

const basicArgs: Args = {
  'accessibility-label': undefined,
};

const triggerButton = (id: string): TemplateResult => html`
  <sbb-secondary-button id=${id} size="l" icon-name="hamburger-menu-small"></sbb-secondary-button>
`;

const navigationActionsL = (): TemplateResult => html`
  <sbb-navigation-button id="nav-1">Label</sbb-navigation-button>
  <sbb-navigation-button id="nav-2">Label</sbb-navigation-button>
  <sbb-navigation-button id="nav-3">Label</sbb-navigation-button>
`;

const navigationList = (label: string): TemplateResult => html`
  <sbb-navigation-list label=${label}>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-button size="m">Label</sbb-navigation-button>
    <sbb-navigation-link size="m" href="https://www.sbb.ch/en/"> Label </sbb-navigation-link>
  </sbb-navigation-list>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('navigation-trigger-1')}
  <sbb-navigation id="navigation" trigger="navigation-trigger-1">
    <sbb-navigation-marker id="nav-marker">${navigationActionsL()}</sbb-navigation-marker>

    <sbb-navigation-section
      title-content="Title one"
      id="navigation-section"
      trigger="nav-1"
      ${sbbSpread(args)}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}

      <sbb-button size="m" style="width: fit-content;"> Button </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section
      title-content="Title two"
      id="navigation-section"
      trigger="nav-2"
      ${sbbSpread(args)}
    >
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')} ${navigationList('Label')}
      ${navigationList('Label')} ${navigationList('Label')}

      <sbb-secondary-button size="m" style="width: fit-content;" sbb-navigation-close>
        Close navigation
      </sbb-secondary-button>
    </sbb-navigation-section>
  </sbb-navigation>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const LongContent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  parameters: {
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-navigation/sbb-navigation-section',
};

export default meta;
