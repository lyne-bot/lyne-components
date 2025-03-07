import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './icon-sidebar-link.js';

const Template = ({ currentPage, ...args }: Args): TemplateResult => {
  return html`<sbb-icon-sidebar-link
    ${sbbSpread(args)}
    class=${currentPage ? 'sbb-active' : nothing}
    accessibility-current=${currentPage ? 'page' : nothing}
  ></sbb-icon-sidebar-link>`;
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const href: InputType = {
  control: {
    type: 'text',
  },
};

const currentPage: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  'icon-name': iconName,
  'accessibility-label': accessibilityLabel,
  href,
  currentPage,
};

const defaultArgs: Args = {
  'icon-name': 'glass-cocktail-small',
  'accessibility-label': 'Go to the party',
  href: '#',
  currentPage: false,
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const CurrentPage: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    currentPage: true,
  },
};

const meta: Meta = {
  decorators: [
    (story) =>
      html`<div style="max-width: var(--sbb-size-element-m)">
        <!-- The max-width is only set for storybook. Don't copy it. -->
        ${story()}
      </div>`,
  ],
  parameters: {
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-sidebar/sbb-icon-sidebar-link',
};

export default meta;
