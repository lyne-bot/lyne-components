import type { InputType } from '@storybook/types';
import type { ArgTypes, Args, Meta, StoryObj } from '@storybook/web-components';
import { type TemplateResult, html, nothing } from 'lit';

import { sbbSpread } from '../../core/dom';

import '../../button';
import '../../title';
import './container';

import readme from './readme.md?raw';

const containerContent = (title: string, last = false): TemplateResult => html`
  <sbb-title level="4">${title}</sbb-title>
  <p class="sbb-text-s">The container component will give its content the correct spacing.</p>
  <p class="sbb-text-s">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  </p>
  <sbb-button variant="secondary" style=${last ? 'margin-block-end: 3rem;' : nothing}
    >See more</sbb-button
  >
`;

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const color: InputType = {
  control: {
    type: 'select',
  },
  options: ['white', 'transparent', 'milk'],
};

const defaultArgTypes: ArgTypes = {
  expanded,
  color,
};

const defaultArgs: Args = {
  expanded: false,
  color: color.options[0],
};

const DefaultTemplate = ({ color, ...args }: Args): TemplateResult => html`
  <sbb-container ${sbbSpread(args)} color=${color}>
    ${containerContent('Example title')} ${containerContent('Another one')}
    ${containerContent('And another one', true)}
  </sbb-container>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Transparent: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1] },
};

export const Milk: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[2] },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

const meta: Meta = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-container/sbb-container',
};

export default meta;
