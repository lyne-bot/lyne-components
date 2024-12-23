import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Args,
  ArgTypes,
  Decorator,
  StoryContext,
  StoryObj,
  WebComponentsRenderer,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import '../../icon.js';
import '../../loading-indicator-circle.js';

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const Template = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
  </${unsafeStatic(tag)}>
`;

const IconSlotTemplate = ({
  tag,
  text,
  'icon-name': iconName,
  hiddenIcon,
  ...args
}: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName} style=${hiddenIcon ? 'display: none;' : ''} ></sbb-icon>
  </${unsafeStatic(tag)}>
`;

const LoadingIndicatorTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    <sbb-loading-indicator-circle
      slot="icon"
    ></sbb-loading-indicator-circle>
    ${text}
  </${unsafeStatic(tag)}>
`;

const FixedWidthTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <div>
    <p>
      <${unsafeStatic(tag)} ${sbbSpread(args)} style="width: 200px;">
        ${text}
      </${unsafeStatic(tag)}>
    </p>
    <p>
      <${unsafeStatic(tag)} ${sbbSpread(args)} style="max-width: 100%; width: 600px;">
        Wide Button
      </${unsafeStatic(tag)}>
    </p>
  </div>
`;
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

const text: InputType = {
  control: {
    type: 'text',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['l', 'm', 's'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
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

export const commonDefaultArgTypes: ArgTypes = {
  tag,
  text,
  negative,
  size,
  'icon-name': iconName,
};

/**
 * NOTE
 * The tag is the tagName of the component to display in stories,
 * so it must be overridden before use.
 */
export const commonDefaultArgs: Args = {
  tag: 'TBD',
  text: 'Button',
  negative: false,
  size: size.options![0],
  'icon-name': 'arrow-right-small',
};

export const primary: StoryObj = {
  render: Template,
};

export const primaryNegative: StoryObj = {
  render: Template,
  args: { negative: true },
};

export const primaryDisabled: StoryObj = {
  render: Template,
  args: { disabled: true },
};

export const primaryNegativeDisabled: StoryObj = {
  render: Template,
  args: { negative: true, disabled: true },
};

export const iconOnly: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
  },
};

export const iconOnlyNegative: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
    negative: true,
  },
};

export const iconOnlyDisabled: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'arrow-right-small',
    text: undefined,
    disabled: true,
  },
};

export const noIcon: StoryObj = {
  render: Template,
  args: { 'icon-name': undefined },
};

export const sizeM: StoryObj = {
  render: Template,
  args: {
    size: size.options![1],
  },
};

export const sizeS: StoryObj = {
  render: Template,
  args: {
    size: size.options![2],
  },
};

export const fixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  args: {
    text: 'Button with long text',
    'icon-name': 'arrow-right-small',
  },
};

export const withSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    'icon-name': 'chevron-small-right-small',
  },
};

export const loadingIndicator: StoryObj = {
  render: LoadingIndicatorTemplate,
  args: { disabled: true },
};

export const withHiddenSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    hiddenIcon: true,
    'icon-name': 'chevron-small-right-small',
  },
};

export const commonDecorators = [
  (story: () => WebComponentsRenderer['storyResult'], context: StoryContext) =>
    context.args.negative
      ? html`
          <div style="--sbb-focus-outline-color: var(--sbb-focus-outline-color-dark)">
            ${story()}
          </div>
        `
      : story(),
  withActions as Decorator,
];
