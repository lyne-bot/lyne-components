import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  Decorator,
  ArgTypes,
  Args,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../core/dom';

import readme from './readme.md?raw';
import './form-field-clear';
import '../form-field';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative ? 'var(--sbb-color-black)' : 'var(--sbb-color-white)',
});

const negativeArg: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabledArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const readonlyArg: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Input attribute',
  },
};

const basicArgTypes: ArgTypes = {
  negative: negativeArg,
  disabled: disabledArg,
  readonly: readonlyArg,
};

const basicArgs: Args = {
  negative: false,
  disabled: false,
  readonly: false,
};

const DefaultTemplate = ({ negative, ...args }: Args): TemplateResult => html`
  <sbb-form-field label="Label" ?negative=${negative}>
    <sbb-icon slot="prefix" name="pie-small"></sbb-icon>
    <input type="text" placeholder="Input placeholder" value="Input value" ${sbbSpread(args)} />
    <sbb-form-field-clear></sbb-form-field-clear>
  </sbb-form-field>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Disabled: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true },
};

export const DefaultNegative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, negative: true },
};

export const DisabledNegative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, disabled: true, negative: true },
};

export const ReadonlyNegative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, readonly: true, negative: true },
};

const meta: Meta = {
  decorators: [
    (story, context) => html`
      <div style=${styleMap({ ...wrapperStyle(context), padding: '2rem' })}>${story()}</div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-form-field/sbb-form-field-clear',
};

export default meta;
