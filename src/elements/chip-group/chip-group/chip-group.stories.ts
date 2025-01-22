import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { SbbChipGroupElement } from './chip-group.js';
import readme from './readme.md?raw';

import '../chip.js';
import '../../form-field/form-field.js';

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const readonly: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  disabled,
  readonly,
};

const defaultArgs: Args = {
  disabled: false,
  readonly: false,
};

const Template = (args: Args): TemplateResult => html`
  <form>
    <sbb-form-field>
      <label>Label</label>
      <sbb-chip-group name="chip-group-1">
        <sbb-chip value="chip 1"></sbb-chip>
        <sbb-chip value="chip 2"></sbb-chip>
        <sbb-chip value="chip 3"></sbb-chip>
        <input placeholder="Placeholder" ?disabled=${args.disabled} ?readonly=${args.readonly} />
      </sbb-chip-group>
    </sbb-form-field>
  </form>
`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const Readonly: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, readonly: true },
};

// TODO
export const WithAutoComplete: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbChipGroupElement.events.input, SbbChipGroupElement.events.change],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-chip-group/sbb-chip-group',
};

export default meta;
