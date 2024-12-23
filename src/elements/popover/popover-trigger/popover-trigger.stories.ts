import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import '../../link.js';
import '../popover.js';
import './popover-trigger.js';
import '../../title.js';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  color: context.args.negative ? 'var(--sbb-color-white)' : 'var(--sbb-color-black)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  'aria-label': ariaLabel,
  'icon-name': iconName,
  disabled,
  'disabled-interactive': disabledInteractive,
};

const defaultArgs: Args = {
  negative: false,
  'aria-label': 'Click to open the popover',
  'icon-name': 'circle-information-small',
  disabled: false,
  'disabled-interactive': false,
};

const popover = (): TemplateResult => html`
  <sbb-popover trigger="popover-trigger">
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0">
      Simple popover with link.
    </sbb-title>
    <p class="sbb-text-s" style="margin: 0;">
      Some content.
      <sbb-block-link
        size="s"
        icon-name="chevron-small-right-small"
        icon-placement="end"
        sbb-popover-close
      >
        Learn More
      </sbb-block-link>
    </p>
  </sbb-popover>
`;

const Template = (args: Args): TemplateResult => html`
  <span class="sbb-text-s" style="display: flex; align-items: center;">
    <span style="margin-inline-end: var(--sbb-spacing-fixed-1x);"> This is a demo text. </span>
    <sbb-popover-trigger id="popover-trigger" ${sbbSpread(args)}></sbb-popover-trigger>
  </span>
  ${popover()}
`;

const TemplateWithCustomContent = (args: Args): TemplateResult => html`
  <div class="sbb-text-xl" style="color: var(--sbb-color-sky);">
    <sbb-popover-trigger id="popover-trigger" ${sbbSpread(args)}>
      This is a long popover trigger text which should wrap at a certain viewport. It inherits all
      the font styles from the parent element.
    </sbb-popover-trigger>
  </div>
  ${popover()}
`;

export const IconSizeS: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const IconSizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-medium' },
};

export const IconSizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'icon-name': 'circle-information-large' },
};

export const CustomContent: StoryObj = {
  render: TemplateWithCustomContent,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const IconSizeSNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const CustomContentNegative: StoryObj = {
  render: TemplateWithCustomContent,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const DisabledNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true, negative: true },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context) })}>${story()}</div>
    `,
  ],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-popover/sbb-popover-trigger',
};

export default meta;
