import type { Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import readme from './readme.md?raw';

import '../../card.js';

import './icon-sidebar-content.js';

const Template = (): TemplateResult => html`
  <sbb-card color="milk"> See 'sbb-icon-sidebar' examples to see it in action. </sbb-card>
`;

export const Default: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-content',
};

export default meta;
