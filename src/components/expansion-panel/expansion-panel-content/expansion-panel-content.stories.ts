import type { Meta, StoryObj } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import readme from './readme.md?raw';

import '../../card';

const Template = (): TemplateResult => html`
  <sbb-card color="milk">
    'sbb-expansion-panel-content' is an element to be only used together with 'sbb-expansion-panel'.
    See 'sbb-expansion-panel' examples to see it in action.
  </sbb-card>
`;

export const ExpansionPanelContent: StoryObj = {
  render: Template,
};

const meta: Meta = {
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-expansion-panel-content',
};

export default meta;
