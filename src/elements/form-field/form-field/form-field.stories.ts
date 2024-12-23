import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import type { SbbFormErrorElement } from '../../form-error.js';

import readme from './readme.md?raw';

import './form-field.js';
import '../form-field-clear.js';
import '../../button/mini-button.js';
import '../../form-error.js';
import '../../link.js';
import '../../popover.js';
import '../../title.js';

const formField = (
  {
    'error-space': errorSpace,
    label,
    optional,
    size,
    borderless,
    width,
    negative,
    'hidden-label': hiddenLabel,
    'floating-label': floatingLabel,
    slottedLabel,
  }: Args,
  template: TemplateResult,
): TemplateResult =>
  html`<sbb-form-field
    error-space=${errorSpace}
    ?optional=${optional}
    size=${size}
    ?borderless=${borderless}
    width=${width}
    ?hidden-label=${hiddenLabel}
    ?floating-label=${floatingLabel}
    ?negative=${negative}
  >
    ${label && !slottedLabel
      ? html`<label>${label}</label>`
      : label && slottedLabel
        ? html`<span slot="label">${label}</span>`
        : nothing}
    ${template}
  </sbb-form-field>`;

const PopoverTrigger = (): TemplateResult => html`
  <sbb-popover-trigger
    slot="suffix"
    id="popover-trigger"
    icon-name="circle-information-small"
  ></sbb-popover-trigger>
  <sbb-popover trigger="popover-trigger">
    <sbb-title level="2" visual-level="6" style="margin-block-start: 0"
      >Simple info popover.</sbb-title
    >
    <span id="popover-content" class="sbb-text-s">
      Some content.
      <sbb-block-link icon-name="chevron-small-right-small" icon-placement="end" sbb-popover-close>
        Learn More
      </sbb-block-link>
    </span>
  </sbb-popover>
`;

const TemplateBasicInput = ({
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
}: Args): TemplateResult => html`
  <input
    class=${cssClass}
    placeholder=${placeholder}
    ?disabled=${disabled}
    ?readonly=${readonly}
    value=${value}
  />
`;

const TemplateBasicSelect = ({ cssClass, disabled }: Args): TemplateResult => html`
  <select class=${cssClass} ?disabled=${disabled}>
    <option value="1">Value 1</option>
    <option value="2">Value 2</option>
    <option value="3">Value 3</option>
  </select>
`;

const TemplateBasicTextarea = ({
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
}: Args): TemplateResult =>
  html` <textarea
    class=${cssClass}
    placeholder=${placeholder}
    ?disabled=${disabled}
    ?readonly=${readonly}
    .value=${value || nothing}
  ></textarea>`;

const TemplateInput = (args: Args): TemplateResult => formField(args, TemplateBasicInput(args));

const TemplateInputWithSlottedSpanLabel = (args: Args): TemplateResult =>
  formField({ ...args, slottedLabel: true }, TemplateBasicInput(args));

const TemplateInputWithErrorSpace = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = args.errorText;

  return html`
    <form>
      <div>
        ${formField(
          args,
          html`<input
              @keyup=${(event: KeyboardEvent) => {
                const input = event.currentTarget as HTMLInputElement;
                if (input.value !== '') {
                  sbbFormError.remove();
                  input.classList.remove(args.cssClass);
                } else {
                  input.closest('sbb-form-field')!.append(sbbFormError);
                  input.classList.add(args.cssClass);
                }
              }}
              class=${args.cssClass}
              placeholder=${args.placeholder}
              ?disabled=${args.disabled}
              ?readonly=${args.readonly}
            />
            ${sbbFormError}`,
        )}
      </div>
      <div style="color: var(--sbb-color-smoke);">
        Some text, right below the form-field, inside a div.
      </div>
    </form>
  `;
};

const TemplateInputWithIcons = (args: Args): TemplateResult =>
  formField(
    args,
    html`<sbb-icon slot="prefix" name="pie-small"></sbb-icon> ${TemplateBasicInput(args)}
      ${PopoverTrigger()}`,
  );

const TemplateInputWithMiniButton = ({ disabled, readonly, ...args }: Args): TemplateResult =>
  formField(
    args,
    html`${TemplateBasicInput({ disabled, readonly, ...args })}
      <sbb-mini-button
        slot="suffix"
        icon-name="pie-small"
        ?disabled=${disabled || readonly}
        aria-label="Input button"
      ></sbb-mini-button>`,
  );

const TemplateInputWithClearButton = (args: Args): TemplateResult =>
  formField(args, html`${TemplateBasicInput(args)} <sbb-form-field-clear></sbb-form-field-clear>`);

const TemplateSelect = (args: Args): TemplateResult => formField(args, TemplateBasicSelect(args));

const TemplateSelectWithErrorSpace = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = args.errorText;

  return html`
    <form>
      <div>
        ${formField(
          args,
          html`<select
              @change=${(event: Event) => {
                const select = event.currentTarget as HTMLSelectElement;
                if (select.value !== '0') {
                  sbbFormError.remove();
                  select.classList.remove(args.cssClass);
                } else {
                  select.closest('sbb-form-field')!.append(sbbFormError);
                  select.classList.add(args.cssClass);
                }
              }}
              class=${args.cssClass}
              ?disabled=${args.disabled}
            >
              <option value="0"></option>
              <option value="1">Value 1</option>
              <option value="2">Value 2</option>
              <option value="3">Value 3</option>
            </select>
            ${sbbFormError}`,
        )}
      </div>
      <div>
        <div style=${styleMap({ color: 'var(--sbb-color-smoke)' })}>
          Some text, right below the form-field, inside a div.
        </div>
      </div>
    </form>
  `;
};

const TemplateSelectWithIcons = (args: Args): TemplateResult =>
  formField(
    args,
    html`
      <span slot="prefix">
        <sbb-icon name="pie-small"></sbb-icon>
      </span>
      ${TemplateBasicSelect(args)} ${PopoverTrigger()}
    `,
  );

const TemplateTextarea = (args: Args): TemplateResult =>
  formField(args, TemplateBasicTextarea(args));

const TemplateTextareaWithErrorSpace = (args: Args): TemplateResult => {
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = args.errorText;

  return html`
    <form>
      <div>
        ${formField(
          args,
          html`<textarea
              @keyup=${(event: KeyboardEvent) => {
                const input = event.currentTarget as HTMLInputElement;
                if (input.value !== '') {
                  sbbFormError.remove();
                  input.classList.remove(args.cssClass);
                } else {
                  input.closest('sbb-form-field')!.append(sbbFormError);
                  input.classList.add(args.cssClass);
                }
              }}
              class=${args.cssClass}
              placeholder=${args.placeholder}
              ?disabled=${args.disabled}
              ?readonly=${args.readonly}
              .value=${args.value || nothing}
            ></textarea>
            ${sbbFormError}`,
        )}
      </div>
      <div>
        <div style=${styleMap({ color: 'var(--sbb-color-smoke)' })}>
          Some text, right below the form-field, inside a div.
        </div>
      </div>
    </form>
  `;
};

const TemplateTextareaWithIcon = (args: Args): TemplateResult =>
  formField(
    args,
    html`<span slot="prefix">
        <sbb-icon name="pie-small"></sbb-icon>
      </span>
      ${TemplateBasicTextarea(args)}`,
  );

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const cssClass: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Input attribute',
  },
};

const errorText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Error slot',
  },
};

const errorSpace: InputType = {
  control: {
    type: 'select',
  },
  options: ['none', 'reserve'],
  table: {
    category: 'Form-field',
  },
};

const width: InputType = {
  control: {
    type: 'select',
  },
  options: ['default', 'collapse'],
  table: {
    category: 'Form-field',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Form-field',
  },
};

const hiddenLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const optional: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'm', 'l'],
  table: {
    category: 'Form-field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form-field',
  },
};

const basicArgTypes: ArgTypes = {
  'error-space': errorSpace,
  label,
  'hidden-label': hiddenLabel,
  'floating-label': floatingLabel,
  optional,
  borderless,
  size,
  negative,
  cssClass,
  placeholder,
  disabled,
  readonly,
  value,
  errorText,
  width,
};

const basicArgs: Args = {
  'error-space': 'none',
  label: 'Input name',
  'hidden-label': false,
  'floating-label': false,
  optional: false,
  borderless: false,
  size: size.options![1],
  negative: false,
  cssClass: '',
  placeholder: 'Input placeholder',
  value: 'Input value',
  disabled: false,
  readonly: false,
  errorText: 'This is a required field.',
  width: width.options![0],
};

export const Input: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'This input value is so long that it needs ellipsis to fit.' },
};

export const InputSizeL: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'This input value is so long that it needs ellipsis to fit.',
    size: size.options![2],
  },
};

export const InputSizeS: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![0] },
};

export const InputNoLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, label: undefined },
};

export const InputHiddenLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'hidden-label': true },
};

export const InputWithSlottedSpanLabel: StoryObj = {
  render: TemplateInputWithSlottedSpanLabel,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Random value' },
};

export const InputWithoutBorder: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const InputDisabled: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputReadonly: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const InputOptionalAndIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const InputOptionalAndIconsSizeS: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![0] },
};

export const InputOptionalAndIconsSizeL: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![2] },
};

export const InputWithMiniButton: StoryObj = {
  render: TemplateInputWithMiniButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputWithMiniButtonDisabled: StoryObj = {
  render: TemplateInputWithMiniButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputWithClearButton: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const InputWithClearButtonDisabled: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputLongLabelAndErrorSpace: StoryObj = {
  render: TemplateInputWithErrorSpace,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'error-space': 'reserve',
    cssClass: 'sbb-invalid',
    label: 'This label name is so long that it needs ellipsis to fit.',
    value: 'This input value is so long that it needs ellipsis to fit.',
  },
};

export const InputFloatingLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const InputFloatingLongLabel: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
  },
};

export const InputFloatingWithIcons: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
  },
};

export const Select: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const SelectWithoutBorder: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const SelectDisabled: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const SelectErrorSpace: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid' },
};

export const SelectFloatingLabel: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const SelectOptionalAndIcons: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const SelectOptionalAndIconsSizeS: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![0] },
};

export const SelectOptionalAndIconsSizeL: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![2] },
};

export const Textarea: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const TextareaWithoutBorder: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true },
};

export const TextareaDisabled: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const TextareaReadonly: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const TextareaErrorSpace: StoryObj = {
  render: TemplateTextareaWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid' },
};

export const TextareaOptionalAndIcon: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true },
};

export const TextareaOptionalAndIconSizeS: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![0] },
};

export const TextareaOptionalAndIconSizeL: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, size: size.options![2] },
};

export const TextareaFloatingLabel: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined },
};

export const TextareaFloatingLongLabel: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
  },
};

export const TextareaFloatingWithIcon: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
  },
};

export const InputCollapsedWidth: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: width.options![1] },
};

export const InputWithIconsDisabled: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const InputNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    value: 'This input value is so long that it needs ellipsis to fit.',
    negative: true,
  },
};

export const InputWithSlottedSpanLabelNegative: StoryObj = {
  render: TemplateInputWithSlottedSpanLabel,
  argTypes: basicArgTypes,
  args: { ...basicArgs, value: 'Random value', negative: true },
};

export const InputWithoutBorderNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true, negative: true },
};

export const InputDisabledNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputReadonlyNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true, negative: true },
};

export const InputOptionalAndIconsNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const InputOptionalAndIconsNegativeSizeS: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![0] },
};

export const InputOptionalAndIconsNegativeSizeL: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![2] },
};

export const InputWithMiniButtonNegative: StoryObj = {
  render: TemplateInputWithMiniButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const InputWithMiniButtonDisabledNegative: StoryObj = {
  render: TemplateInputWithMiniButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputWithClearButtonNegative: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const InputWithClearButtonDisabledNegative: StoryObj = {
  render: TemplateInputWithClearButton,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const InputLongLabelAndErrorSpaceNegative: StoryObj = {
  render: TemplateInputWithErrorSpace,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'error-space': 'reserve',
    cssClass: 'sbb-invalid',
    label: 'This label name is so long that it needs ellipsis to fit.',
    value: 'This input value is so long that it needs ellipsis to fit.',
    negative: true,
  },
};

export const InputFloatingLabelNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined, negative: true },
};

export const InputFloatingLongLabelNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
    negative: true,
  },
};

export const InputFloatingWithIconsNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    negative: true,
  },
};

export const SelectNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const SelectWithoutBorderNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true, negative: true },
};

export const SelectDisabledNegative: StoryObj = {
  render: TemplateSelect,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const SelectErrorSpaceNegative: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid', negative: true },
};

export const SelectFloatingLabelNegative: StoryObj = {
  render: TemplateSelectWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined, negative: true },
};

export const SelectOptionalAndIconsNegative: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const SelectOptionalAndIconsNegativeSizeS: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![0] },
};

export const SelectOptionalAndIconsNegativeSizeL: StoryObj = {
  render: TemplateSelectWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![2] },
};

export const InputCollapsedWidthNegative: StoryObj = {
  render: TemplateInput,
  argTypes: basicArgTypes,
  args: { ...basicArgs, width: width.options![1], negative: true },
};

export const InputWithIconsDisabledNegative: StoryObj = {
  render: TemplateInputWithIcons,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const TextareaNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const TextareaWithoutBorderNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, borderless: true, negative: true },
};

export const TextareaDisabledNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const TextareaReadonlyNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true, negative: true },
};

export const TextareaErrorSpaceNegative: StoryObj = {
  render: TemplateTextareaWithErrorSpace,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'error-space': 'reserve', cssClass: 'sbb-invalid', negative: true },
};

export const TextareaOptionalAndIconNegative: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true },
};

export const TextareaOptionalAndIconNegativeSizeS: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![0] },
};

export const TextareaOptionalAndIconNegativeSizeL: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: { ...basicArgs, optional: true, negative: true, size: size.options![2] },
};

export const TextareaFloatingLabelNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'floating-label': true, value: undefined, negative: true },
};

export const TextareaFloatingLongLabelNegative: StoryObj = {
  render: TemplateTextarea,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    label: 'This is a very long label which receives ellipsis',
    negative: true,
  },
};

export const TextareaFloatingWithIconNegative: StoryObj = {
  render: TemplateTextareaWithIcon,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'floating-label': true,
    value: undefined,
    negative: true,
  },
};

const meta: Meta = {
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-form-field/sbb-form-field',
};

export default meta;
