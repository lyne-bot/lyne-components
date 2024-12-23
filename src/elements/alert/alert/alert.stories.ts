import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import { SbbAlertElement } from './alert.js';
import readme from './readme.md?raw';

import '../../link/link.js';

const Default = ({ 'content-slot-text': contentSlotText, ...args }: Args): TemplateResult => html`
  <sbb-alert ${sbbSpread(args)}>${contentSlotText}</sbb-alert>
`;

const WithLink = ({ 'content-slot-text': contentSlotText, ...args }: Args): TemplateResult => html`
  <sbb-alert ${sbbSpread(args)}>
    ${contentSlotText} <sbb-link href="https://www.sbb.ch">Find out more</sbb-link>
  </sbb-alert>
`;

const DefaultWithOtherContent = (args: Args): TemplateResult => {
  return html`
    <div>
      ${WithLink(args)}
      <p>Other Content on the page.</p>
    </div>
  `;
};

const CustomSlots = ({
  'title-content': titleContent,
  'content-slot-text': contentSlotText,
  ...args
}: Args): TemplateResult => html`
  <sbb-alert ${sbbSpread(args)}>
    <sbb-icon name="disruption" slot="icon"></sbb-icon>
    <span slot="title">${titleContent}</span>
    ${contentSlotText}
  </sbb-alert>
`;

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['m', 'l', 's'],
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const contentSlotText: InputType = {
  control: {
    type: 'text',
  },
};

const animation: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['all', 'open', 'close', 'none'],
};

const defaultArgTypes: ArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
  size,
  readonly,
  'icon-name': iconName,
  'content-slot-text': contentSlotText,
  animation: animation,
};

const defaultArgs: Args = {
  'title-content': 'Interruption between Berne and Olten',
  'title-level': 3,
  size: size.options![0],
  readonly: false,
  'icon-name': 'info',
  'content-slot-text':
    "Between Berne and Olten from 03.11.2021 to 05.12.2022 each time from 22:30 to 06:00 o'clock construction work will take place. You have to expect changed travel times and changed connections.",
  animation: animation.options![0],
};

export const defaultAlert: StoryObj = {
  render: DefaultWithOtherContent,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const sizeL: StoryObj = {
  render: WithLink,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![1] },
};

export const sizeS: StoryObj = {
  render: WithLink,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options![2] },
};

export const withoutCloseButton: StoryObj = {
  render: WithLink,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
};

export const withoutLink: StoryObj = {
  render: Default,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const iconAndTitleAsSlot: StoryObj = {
  render: CustomSlots,
  argTypes: { ...defaultArgTypes },
  args: { ...defaultArgs, 'icon-name': undefined },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbAlertElement.events.willOpen,
        SbbAlertElement.events.didOpen,
        SbbAlertElement.events.willClose,
        SbbAlertElement.events.didClose,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-alert/sbb-alert',
};

export default meta;
