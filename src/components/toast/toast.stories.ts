import { withActions } from '@storybook/addon-actions/decorator';
import { within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { html, nothing, TemplateResult } from 'lit';

import { waitForComponentsReady } from '../../storybook/testing/wait-for-components-ready';
import { sbbSpread } from '../core/dom';

import readme from './readme.md?raw';
import { SbbToastElement } from './toast';
import '../link';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('sbb-toast').shadowRoot!.querySelector('.sbb-toast'),
  );

  const toast = canvas.getByTestId('sbb-toast') as SbbToastElement;
  toast.open();
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

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

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  position,
  dismissible,
  timeout,
  politeness,
  'icon-name': iconName,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  position: 'bottom-center',
  dismissible: false,
  timeout: 6000,
  politeness: 'polite',
  'icon-name': 'circle-tick-small',
  'disable-animation': isChromatic(),
};

const toastTemplate = (args, action, contentLength = 's'): TemplateResult => html`
  <sbb-button @click=${() => document.querySelector('sbb-toast').open()}>Show toast</sbb-button>
  <sbb-toast ${sbbSpread(args)} data-testid="sbb-toast">
    ${contentLength === 's'
      ? 'Lorem ipsum dolor'
      : 'Lorem ipsum dolor sit amet, ipsum consectetur adipiscing elit.'}
    ${action === 'button'
      ? html`<sbb-button
          slot="action"
          icon-name="clock-small"
          aria-label="Remind me later"
          sbb-toast-close
        ></sbb-button>`
      : nothing}
    ${action === 'link'
      ? html`<sbb-link slot="action" sbb-toast-close> Link action </sbb-link>`
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
  play: isChromatic() ? playStory : undefined,
};

export const Dismissible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, dismissible: true },
  play: isChromatic() ? playStory : undefined,
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const WithActionButton: StoryObj = {
  render: ActionButtonTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const WithActionLink: StoryObj = {
  render: ActionLinkTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

const meta: Meta = {
  decorators: [
    (story) => html` <div style="padding: 2rem; height: calc(100vh - 2rem);">${story()}</div> `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbToastElement.events.willOpen,
        SbbToastElement.events.didOpen,
        SbbToastElement.events.willClose,
        SbbToastElement.events.didClose,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-toast',
};

export default meta;
