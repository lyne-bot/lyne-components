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
import isChromatic from 'chromatic';
import { html, TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../storybook/testing/wait-for-stable-position';
import { SbbFormError } from '../form-error';
import { SbbOption } from '../option';

import { SbbAutocomplete } from './autocomplete';
import readme from './readme.md?raw';

import '../form-field';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-black-default)'
    : 'var(--sbb-color-white-default)',
});

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const preserveIconSpace: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Autocomplete',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
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

const borderless: InputType = {
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

const disableGroup: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Option group',
  },
};

const defaultArgTypes: ArgTypes = {
  // Autocomplete args
  negative,
  disabled,
  readonly,
  disableAnimation,
  preserveIconSpace,

  // Option args
  iconName,
  disableOption,

  // Form field args
  borderless,
  floatingLabel,
};

const withGroupsArgTypes: ArgTypes = {
  ...defaultArgTypes,

  // Option group args
  disableGroup,
};

const defaultArgs: Args = {
  // Autocomplete args
  negative: false,
  disabled: false,
  readonly: false,
  disableAnimation: isChromatic(),

  // Option args
  iconName: 'clock-small',
  preserveIconSpace: true,
  disableOption: false,

  // Form field args
  borderless: false,
  floatingLabel: false,
};

const withGroupsDefaultArgs: Args = {
  ...defaultArgs,

  // Option group args
  disableGroup: false,
};

const aboveDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      height: '100%',
      display: 'flex',
      'align-items': 'end',
    })}
  >
    ${story()}
  </div>
`;

const scrollDecorator: Decorator = (story) => html`
  <div
    style=${styleMap({
      height: '175%',
      display: 'flex',
      'align-items': 'center',
    })}
  >
    ${story()}
  </div>
`;

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('form-field').shadowRoot!.querySelector('div.sbb-form-field__space-wrapper'),
  );

  await waitForStablePosition(() => canvas.getByTestId('autocomplete-input'));
  await userEvent.type(canvas.getByTestId('autocomplete-input'), 'Opt');
  await new Promise((resolve) => setTimeout(resolve, 2000));
};

const createOptionGroup1 = (iconName: string, disableOption: boolean): TemplateResult => {
  return html`
    <sbb-option icon-name=${iconName} value="Option 1"> Option 1 </sbb-option>
    <sbb-option icon-name=${iconName} ?disabled=${disableOption} value="Option 2">
      Option 2
    </sbb-option>
    <sbb-option value="Option 3">
      <sbb-icon slot="icon" name=${iconName}></sbb-icon>
      Option 3
    </sbb-option>
  `;
};
const createOptionGroup2 = (): TemplateResult => {
  return html`
    <sbb-option value="Option 4">Option 4</sbb-option>
    <sbb-option value="Option 5">Option 5</sbb-option>
  `;
};

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  zIndex: '100',
};

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const textBlock = (): TemplateResult => html`
  <div style=${styleMap(textBlockStyle)}>
    This text block has a <code style=${styleMap(codeStyle)}>z-index</code> greater than the form
    field, but it must always be covered by the autocomplete overlay.
  </div>
`;

const Template = (args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />

      <sbb-autocomplete
        ?disable-animation=${args.disableAnimation}
        ?preserve-icon-space=${args.preserveIconSpace}
      >
        ${createOptionGroup1(args.iconName, args.disableOption)} ${createOptionGroup2()}
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const OptionGroupTemplate = (args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />

      <sbb-autocomplete
        ?disable-animation=${args.disableAnimation}
        ?preserve-icon-space=${args.preserveIconSpace}
      >
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const MixedTemplate = (args): TemplateResult => html`
  <div>
    <sbb-form-field
      ?negative=${args.negative}
      ?borderless=${args.borderless}
      ?floating-label=${args.floatingLabel}
      label="Label"
      data-testid="form-field"
    >
      <input
        placeholder="Placeholder"
        data-testid="autocomplete-input"
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
      />

      <sbb-autocomplete
        ?disable-animation=${args.disableAnimation}
        ?preserve-icon-space=${args.preserveIconSpace}
      >
        <sbb-option value="Option 1">
          <sbb-icon
            slot="icon"
            name=${args.iconName}
            style=${styleMap({ color: 'var(--sbb-color-sky-default)' })}
          ></sbb-icon>
          Option Value
        </sbb-option>
        <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
          ${createOptionGroup1(args.iconName, args.disableOption)}
        </sbb-optgroup>
        <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
      </sbb-autocomplete>
    </sbb-form-field>
    ${textBlock()}
  </div>
`;

const RequiredTemplate = (args): TemplateResult => {
  const sbbFormError: SbbFormError = document.createElement('sbb-form-error');
  sbbFormError.setAttribute('slot', 'error');
  sbbFormError.textContent = 'This is a required field.';

  return html`
    <div>
      <sbb-form-field
        ?negative=${args.negative}
        ?borderless=${args.borderless}
        ?floating-label=${args.floatingLabel}
        label="Label"
        data-testid="form-field"
        id="sbb-form-field"
      >
        <input
          id="sbb-autocomplete"
          data-testid="autocomplete-input"
          class="sbb-invalid"
          placeholder="Placeholder"
          ?disabled=${args.disabled}
          ?readonly=${args.readonly}
          @change=${(event) => {
            if ((event.currentTarget as HTMLInputElement).value !== '') {
              sbbFormError.remove();
              document.getElementById('sbb-autocomplete').classList.remove('sbb-invalid');
            } else {
              document.getElementById('sbb-form-field').append(sbbFormError);
              document.getElementById('sbb-autocomplete').classList.add('sbb-invalid');
            }
          }}
        />

        <sbb-autocomplete
          ?disable-animation=${args.disableAnimation}
          ?preserve-icon-space=${args.preserveIconSpace}
        >
          <sbb-optgroup label="Group 1" ?disabled=${args.disableGroup}>
            ${createOptionGroup1(args.iconName, args.disableOption)}
          </sbb-optgroup>
          <sbb-optgroup label="Group 2">${createOptionGroup2()}</sbb-optgroup>
        </sbb-autocomplete>
        ${sbbFormError}
      </sbb-form-field>
      ${textBlock()}
    </div>
  `;
};

export const Basic: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const BasicNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const BasicOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [aboveDecorator],
  play: isChromatic() ? playStory : undefined,
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const FloatingLabel: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, floatingLabel: true },
  play: isChromatic() ? playStory : undefined,
};

export const WithError: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const WithErrorNegative: StoryObj = {
  render: RequiredTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
  play: isChromatic() ? playStory : undefined,
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
  play: isChromatic() ? playStory : undefined,
};

export const BorderlessOpenAbove: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
  decorators: [aboveDecorator],
  play: isChromatic() ? playStory : undefined,
};

export const NoIconSpace: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, preserveIconSpace: false },
  play: isChromatic() ? playStory : undefined,
};

export const Scroll: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
  decorators: [scrollDecorator],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const WithOptionGroup: StoryObj = {
  render: OptionGroupTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const MixedSingleOptionWithOptionGroup: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs },
  play: isChromatic() ? playStory : undefined,
};

export const MixedSingleOptionWithOptionGroupNegative: StoryObj = {
  render: MixedTemplate,
  argTypes: withGroupsArgTypes,
  args: { ...withGroupsDefaultArgs, negative: true },
  play: isChromatic() ? playStory : undefined,
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
        SbbAutocomplete.events.willOpen,
        SbbAutocomplete.events.didOpen,
        SbbAutocomplete.events.didClose,
        SbbAutocomplete.events.willClose,
        'change',
        SbbOption.events.optionSelected,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-autocomplete',
};

export default meta;
