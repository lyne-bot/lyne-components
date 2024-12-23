import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, StoryObj } from '@storybook/web-components';
import { type TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import type { SbbFormErrorElement } from '../../form-error.js';
import type { SbbFileSelectorDropzoneElement } from '../file-selector-dropzone.js';
import type { SbbFileSelectorElement } from '../file-selector.js';

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
export const FileSelectorTemplate = ({ tag, ...args }: Args): TemplateResult =>
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}></${unsafeStatic(tag)}>`;

export const FileSelectorTemplateWithError = ({ tag, ...args }: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'There has been an error.';

  return html`
    <${unsafeStatic(tag)}
      ${sbbSpread(args)}
      id="sbb-file-selector"
      @fileChanged=${(event: CustomEvent<File[]>) => {
        if (event.detail && event.detail.length > 0) {
          (event.target as SbbFileSelectorElement | SbbFileSelectorDropzoneElement)!.append(
            sbbFormError,
          );
        } else {
          sbbFormError.remove();
        }
      }}
    ></${unsafeStatic(tag)}>
  `;
};
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 's'],
};

const disabled: InputType = {
  control: {
    type: 'boolean',
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

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

export const fileSelectorDefaultArgTypes: ArgTypes = {
  tag,
  size,
  disabled,
  multiple,
  'multiple-mode': multipleMode,
  accept,
  'accessibility-label': accessibilityLabel,
};

/**
 * NOTE
 * The tag is the tagName of the component to display in stories,
 * so it must be overridden before use.
 */
export const fileSelectorDefaultArgs: Args = {
  tag: 'TBD',
  size: size.options![0],
  disabled: false,
  multiple: false,
  'multiple-mode': multipleMode.options![0],
  accept: undefined,
  'accessibility-label': 'Select from hard disk',
};

export const fileSelectorMultipleDefaultArgs: Args = {
  ...fileSelectorDefaultArgs,
  multiple: true,
  'accessibility-label': 'Select from hard disk - multiple files allowed',
};

export const defaultFileSelector: StoryObj = {
  render: FileSelectorTemplate,
};

export const defaultDisabled: StoryObj = {
  render: FileSelectorTemplate,
  args: { disabled: true },
};

export const defaultMulti: StoryObj = {
  render: FileSelectorTemplate,
  args: fileSelectorMultipleDefaultArgs,
};

export const defaultMultiPersistent: StoryObj = {
  render: FileSelectorTemplate,
  args: { ...fileSelectorMultipleDefaultArgs, 'multiple-mode': 'persistent' },
};

export const defaultWithError: StoryObj = {
  render: FileSelectorTemplateWithError,
};

export const defaultOnlyPDF: StoryObj = {
  render: FileSelectorTemplate,
  args: { accept: '.pdf' },
};

export const defaultMultiSizeS: StoryObj = {
  render: FileSelectorTemplate,
  args: { ...fileSelectorMultipleDefaultArgs, size: 's' },
};
