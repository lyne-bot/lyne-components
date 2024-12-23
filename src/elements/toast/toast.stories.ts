import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import type { SbbButtonElement } from '../button.js';

import readme from './readme.md?raw';
import { SbbToastElement } from './toast.js';
import '../button/button.js';
import '../button/transparent-button.js';
import '../link/link.js';

const position: InputType = {
  control: {
    type: 'select',
  },
  options: [
    'top-left',
    'top-center',
    'top-right',
    'top-start',
    'top-end',
    'bottom-left',
    'bottom-center',
    'bottom-right',
    'bottom-start',
    'bottom-end',
  ],
};

const dismissible: InputType = {
  control: {
    type: 'boolean',
  },
};

const timeout: InputType = {
  control: {
    type: 'number',
    step: 500,
  },
};

const politeness: InputType = {
  control: {
    type: 'select',
  },
  options: ['assertive', 'polite', 'off'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  position,
  dismissible,
  timeout,
  politeness,
  'icon-name': iconName,
};

const defaultArgs: Args = {
  position: 'bottom-center',
  dismissible: false,
  timeout: 6000,
  politeness: 'polite',
  'icon-name': 'circle-tick-small',
};

const toastTemplate = (
  { timeout, ...args }: Args,
  action: string | null,
  contentLength = 's',
): TemplateResult => html`
  <sbb-button
    @click=${(event: Event) =>
      (event.currentTarget as SbbButtonElement).parentElement!.querySelector('sbb-toast')!.open()}
    >Show toast</sbb-button
  >
  <sbb-toast timeout=${timeout} ${sbbSpread(args)}>
    ${contentLength === 's'
      ? 'Lorem ipsum dolor'
      : 'Lorem ipsum dolor sit amet, ipsum consectetur adipiscing elit.'}
    ${action === 'button'
      ? html`<sbb-transparent-button
          slot="action"
          icon-name="clock-small"
          aria-label="Remind me later"
          sbb-toast-close
        ></sbb-transparent-button>`
      : nothing}
    ${action === 'link'
      ? html`<sbb-link slot="action" sbb-toast-close href="https://www.sbb.ch" target="_blank">
          Link action
        </sbb-link>`
      : nothing}
  </sbb-toast>
`;

const Template = (args: Args): TemplateResult => toastTemplate(args, null, 's');

const LongContentTemplate = (args: Args): TemplateResult => toastTemplate(args, 'button', 'l');

const ActionButtonTemplate = (args: Args): TemplateResult => toastTemplate(args, 'button', 's');

const ActionLinkTemplate = (args: Args): TemplateResult => toastTemplate(args, 'link', 's');

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Dismissible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, dismissible: true },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithActionButton: StoryObj = {
  render: ActionButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const WithActionLink: StoryObj = {
  render: ActionLinkTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbToastElement.events.willOpen,
        SbbToastElement.events.didOpen,
        SbbToastElement.events.willClose,
        SbbToastElement.events.didClose,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '200px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-toast',
};

export default meta;
