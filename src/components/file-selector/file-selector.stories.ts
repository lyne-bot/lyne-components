import { withActions } from '@storybook/addon-actions/decorator';
import { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

import { sbbSpread } from '../core/dom';
import type { SbbFormErrorElement } from '../form-error';

import { SbbFileSelectorElement } from './file-selector';
import readme from './readme.md?raw';

import '../form-error';

const variant: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'dropzone'],
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const titleContent: InputType = {
  control: {
    type: 'text',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
};

const multipleMode: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['default', 'persistent'],
};

const accept: InputType = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

const defaultArgTypes: ArgTypes = {
  variant,
  disabled,
  'title-content': titleContent,
  multiple,
  'multiple-mode': multipleMode,
  accept,
  'accessibility-label': accessibilityLabel,
};

const defaultArgs: Args = {
  variant: variant.options[0],
  disabled: false,
  'title-content': 'Title',
  multiple: false,
  'multiple-mode': multipleMode.options[0],
  accept: undefined,
  'accessibility-label': 'Select from hard disk',
};

const multipleDefaultArgs: Args = {
  ...defaultArgs,
  multiple: true,
  'accessibility-label': 'Select from hard disk - multiple files allowed',
};

const Template = (args): TemplateResult =>
  html`<sbb-file-selector ${sbbSpread(args)}></sbb-file-selector>`;

const TemplateWithError = (args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'There has been an error.';

  return html`
    <sbb-file-selector
      ${sbbSpread(args)}
      id="sbb-file-selector"
      @fileChanged=${(event) => {
        if (event.detail && event.detail.length > 0) {
          event.target!.append(sbbFormError);
        } else {
          sbbFormError.remove();
        }
      }}
    ></sbb-file-selector>
  `;
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const DefaultDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const DefaultMulti: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...multipleDefaultArgs },
};

export const DefaultMultiPersistent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...multipleDefaultArgs, 'multiple-mode': multipleMode.options[1] },
};

export const Dropzone: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1] },
};

export const DropzoneDisabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1], disabled: true },
};

export const DropzoneMulti: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...multipleDefaultArgs, variant: variant.options[1] },
};

export const DropzoneMultiPersistent: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...multipleDefaultArgs,
    variant: variant.options[1],
    'multiple-mode': multipleMode.options[1],
  },
};

export const DefaultWithError: StoryObj = {
  render: TemplateWithError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const DropzoneWithError: StoryObj = {
  render: TemplateWithError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, variant: variant.options[1] },
};

export const DefaultOnlyPDF: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, accept: '.pdf' },
};

const meta: Meta = {
  decorators: [(story) => html` <div>${story()}</div> `, withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbFileSelectorElement.events.fileChangedEvent],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-file-selector',
};

export default meta;
