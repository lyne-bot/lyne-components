import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import { html, nothing, TemplateResult } from 'lit';
import { styleMap, StyleInfo } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../storybook/testing/wait-for-stable-position';
import { sbbSpread } from '../core/dom';
import type { SbbFormErrorElement } from '../form-error';
import { SbbOptionElement } from '../option';

import readme from './readme.md?raw';
import { SbbSelectElement } from './select';
import '../form-error';
import '../form-field';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot!.querySelector('div.sbb-form-field__space-wrapper'),
  );

  await waitForStablePosition(() => canvas.getByTestId('select'));
  const select = await canvas.getByTestId('select');
  userEvent.click(select);
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const floatingLabel: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Form field',
  },
};

const value: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['Option 1', 'Option 2'],
  table: {
    category: 'Select',
  },
};

const multiple: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const placeholder: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Select',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const required: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Select',
  },
};

const numberOfOptions: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Option',
  },
};

const disableOption: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option',
  },
};

const withOptionGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  borderless,
  negative,
  floatingLabel,
  value,
  multiple,
  placeholder,
  disabled,
  required,
  readonly,
  'disable-animation': disableAnimation,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
};

const defaultArgs: Args = {
  borderless: false,
  negative: false,
  floatingLabel: false,
  value: undefined,
  multiple: false,
  placeholder: 'Please select value.',
  disabled: false,
  required: false,
  readonly: false,
  'disable-animation': isChromatic(),
  numberOfOptions: 5,
  disableOption: false,
  withOptionGroup: false,
  disableGroup: false,
};

const changeEventHandler = (event): void => {
  const div = document.createElement('div');
  div.innerText = `current value is: ${event.target.value}`;
  document.getElementById('container-value')!.append(div);
};

const textBlockStyle: Readonly<StyleInfo> = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Readonly<StyleInfo> = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const aboveDecorator: Decorator = (story) => html`
  <div style="height: 100%; display: flex; align-items: end;">${story()}</div>
`;

const scrollDecorator: Decorator = (story) => html`
  <div style="height: 175%; display: flex; align-items: center;">${story()}</div>
`;

const valueEllipsis: string = 'This label name is so long that it needs ellipsis to fit.';

const textBlock = (text = null): TemplateResult => {
  return html`
    <div style=${styleMap(textBlockStyle)}>
      ${!text
        ? html`
            <span>
              This text block has a <code style=${styleMap(codeStyle)}>z-index</code> greater than
              the form field, but it must always be covered by the select overlay.
            </span>
          `
        : nothing}
    </div>
  `;
};

const createOptions = (
  numberOfOptions: number,
  disableOption: boolean,
  group: string | boolean,
  selectValue: string | undefined = undefined,
): TemplateResult[] => {
  return new Array(numberOfOptions).fill(null).map((_, i) => {
    const value = group ? `Option ${i + 1} ${' - ' + group}` : `Option ${i + 1}`;
    const selected = Array.isArray(selectValue)
      ? selectValue.includes(value)
      : selectValue === value;
    return html`
      <sbb-option value=${value} ?disabled=${disableOption && i < 2} ?selected=${selected}>
        ${value}
      </sbb-option>
    `;
  });
};

const createOptionsGroup = (numberOfOptions, disableOption, disableGroup): TemplateResult => html`
  <sbb-optgroup label="Group 1" ?disabled=${disableGroup}>
    ${createOptions(numberOfOptions, disableOption, '1')}
  </sbb-optgroup>
  <sbb-optgroup label="Group 2">
    ${createOptions(numberOfOptions, disableOption, '2')}
  </sbb-optgroup>
`;

const FormFieldTemplate = ({
  borderless,
  negative,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}: Args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?borderless=${borderless}
      ?negative=${negative}
      ?floating-label=${floatingLabel}
      label="Select"
      data-testid="form-field"
    >
      <sbb-select
        ${sbbSpread(args)}
        @change=${(event) => changeEventHandler(event)}
        data-testid="select"
      >
        ${withOptionGroup
          ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
          : createOptions(numberOfOptions, disableOption, false, args.value)}
      </sbb-select>
    </sbb-form-field>
    ${textBlock()}
  </div>
  <div
    id="container-value"
    style="margin-block-start: 2rem; color: var(--sbb-color-smoke-default);"
  ></div>
`;

const SelectEllipsisTemplate = ({
  borderless,
  negative,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}: Args): TemplateResult => {
  const ellipsisSelected = valueEllipsis === args.value;
  if (args.multiple && args.value) {
    args.value = [args.value];
  }

  return html`
    <div>
      <sbb-form-field
        ?borderless=${borderless}
        ?negative=${negative}
        ?floating-label=${floatingLabel}
        label="Select"
        data-testid="form-field"
      >
        <sbb-select
          ${sbbSpread(args)}
          @change=${(event) => changeEventHandler(event)}
          data-testid="select"
        >
          <sbb-option value=${valueEllipsis} ?selected=${ellipsisSelected}>
            ${valueEllipsis}
          </sbb-option>
          ${withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
      </sbb-form-field>
      ${textBlock()}
    </div>
    <div
      id="container-value"
      style="margin-block-start: 2rem; color: var(--sbb-color-smoke-default);"
    ></div>
  `;
};

const FormFieldTemplateWithError = ({
  borderless,
  negative,
  floatingLabel,
  numberOfOptions,
  disableOption,
  withOptionGroup,
  disableGroup,
  ...args
}: Args): TemplateResult => {
  if (args.multiple && args.value) {
    args.value = [args.value];
  }
  const sbbFormError: SbbFormErrorElement = document.createElement('sbb-form-error');
  sbbFormError.textContent = 'Error';

  return html`
    <div>
      <sbb-form-field
        ?borderless=${borderless}
        ?negative=${negative}
        ?floating-label=${floatingLabel}
        id="sbb-form-field"
        label="Select"
        data-testid="form-field"
      >
        <sbb-select
          ${sbbSpread(args)}
          id="sbb-select"
          class="sbb-invalid"
          data-testid="select"
          @change=${(event) => {
            if (event.target.value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-select')!.classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field')!.append(sbbFormError);
              document.getElementById('sbb-select')!.classList.add('sbb-invalid');
            }
          }}
        >
          ${withOptionGroup
            ? createOptionsGroup(numberOfOptions, disableOption, disableGroup)
            : createOptions(numberOfOptions, disableOption, false, args.value)}
        </sbb-select>
        ${sbbFormError}
      </sbb-form-field>
      ${textBlock()}
    </div>
  `;
};

const KeyboardInteractionTemplate = ({
  borderless,
  negative,
  floatingLabel,
  ...args
}: Args): TemplateResult => html`
  <sbb-form-field
    ?borderless=${borderless}
    ?negative=${negative}
    ?floating-label=${floatingLabel}
    label="Select"
    data-testid="form-field"
  >
    <sbb-select
      ?multiple=${args.multiple}
      placeholder=${args.placeholder}
      data-testid="select"
      @change=${(event) => changeEventHandler(event)}
    >
      <sbb-option value="TI - Bellinzona">Bellinzona</sbb-option>
      <sbb-option value="BE - Bern">Bern</sbb-option>
      <sbb-option value="GR - Chur">Chur</sbb-option>
      <sbb-option value="GL - Glarus">Glarus</sbb-option>
      <sbb-option value="TI - Lugano">Lugano</sbb-option>
      <sbb-option value="ZH - Winterthur">Winterthur</sbb-option>
      <sbb-option value="VS - Zermatt">Zermatt</sbb-option>
      <sbb-option value="ZH - Zürich">Zürich</sbb-option>
    </sbb-select>
  </sbb-form-field>
  ${textBlock('Focus the select and type letters with closed or open panel.')}
  <div
    id="container-value"
    style="margin-block-start: 2rem; color: var(--sbb-color-smoke-default);"
  ></div>
`;

export const SingleSelect: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const SingleSelectNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const MultipleSelect: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true },
  play: isChromatic() ? playStory : undefined,
};

export const MultipleSelectNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const SingleSelectWithGrouping: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withOptionGroup: true },
  play: isChromatic() ? playStory : undefined,
};

export const MultipleSelectWithGrouping: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, multiple: true, withOptionGroup: true },
  play: isChromatic() ? playStory : undefined,
};

export const SingleSelectEllipsis: StoryObj = {
  render: SelectEllipsisTemplate,
  argTypes: {
    ...defaultArgTypes,
    value: { ...value, options: [...value.options, valueEllipsis] },
  },
  args: { ...defaultArgs, value: valueEllipsis },
  play: isChromatic() ? playStory : undefined,
};

export const MultipleSelectEllipsis: StoryObj = {
  render: SelectEllipsisTemplate,
  argTypes: {
    ...defaultArgTypes,
    value: { ...value, options: [...value.options, valueEllipsis] },
  },
  args: { ...defaultArgs, multiple: true, value: valueEllipsis },
  play: isChromatic() ? playStory : undefined,
};

export const Required: StoryObj = {
  render: FormFieldTemplateWithError,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, required: true },
  play: isChromatic() ? playStory : undefined,
};

export const Disabled: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  play: isChromatic() ? playStory : undefined,
};

export const Readonly: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
  play: isChromatic() ? playStory : undefined,
};

export const Borderless: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessOpenAbove: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
  play: isChromatic() ? playStory : undefined,
};

export const InScrollableContainer: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const DisableOption: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disableOption: true },
  play: isChromatic() ? playStory : undefined,
};

export const DisableOptionGroup: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withOptionGroup: true, disableGroup: true },
  play: isChromatic() ? playStory : undefined,
};

export const DisableOptionGroupNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, withOptionGroup: true, disableGroup: true, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const DisableMultipleOption: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    multiple: true,
    withOptionGroup: true,
    disableOption: true,
  },
  play: isChromatic() ? playStory : undefined,
};

export const DisableMultipleOptionNegative: StoryObj = {
  render: FormFieldTemplate,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    multiple: true,
    withOptionGroup: true,
    disableOption: true,
    negative: true,
  },
  play: isChromatic() ? playStory : undefined,
};

export const KeyboardInteraction: StoryObj = {
  render: KeyboardInteractionTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div
        style=${styleMap({
          ...wrapperStyle(context),
          padding: '2rem',
          height: 'calc(100vh - 2rem)',
        })}
      >
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbSelectElement.events.change,
        SbbSelectElement.events.didClose,
        SbbSelectElement.events.didOpen,
        SbbSelectElement.events.willClose,
        SbbSelectElement.events.willOpen,
        SbbOptionElement.events.optionSelected,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '500px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-select',
};

export default meta;
