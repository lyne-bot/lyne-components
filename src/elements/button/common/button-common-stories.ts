import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, StoryObj } from '@storybook/web-components';
import { nothing, type TemplateResult } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import { commonDefaultArgs, commonDefaultArgTypes } from './common-stories.js';

import '../../action-group.js';
import '../../form-field.js';

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const FormTemplate = ({
  tag,
  name,
  value,
  type: _type,
  reset: _reset,
  ...args
}: Args): TemplateResult => html`
<form style="display: flex; gap: 1rem; flex-direction: column;"
      @submit=${(e: SubmitEvent) => {
        e.preventDefault();
        const form = (e.target as HTMLFormElement)!;
        form.querySelector('#form-data')!.innerHTML = JSON.stringify(
          Object.fromEntries(new FormData(form, e.submitter)),
        );
      }}>
  <p>Input required; submit with empty value is impossible due to 'requestSubmit' API validation.</p>
  <sbb-form-field>
    <input name="test" value="" required>
  </sbb-form-field>
  <fieldset>
    <sbb-action-group>
    <${unsafeStatic(tag)} ${sbbSpread(args)} type="reset">
      Reset
    </${unsafeStatic(tag)}>
    <${unsafeStatic(tag)} ${sbbSpread(args)} value=${value ?? nothing} name=${name ?? nothing} type="submit">
      Submit
    </${unsafeStatic(tag)}>
    </sbb-action-group>
  </fieldset>
  <div id="form-data"></div>
</form>`;

/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const buttonDefaultArgTypes: ArgTypes = {
  ...commonDefaultArgTypes,
  type,
  disabled,
  'disabled-interactive': disabledInteractive,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

export const buttonDefaultArgs: Args = {
  ...commonDefaultArgs,
  type: type.options![0],
  disabled: false,
  'disabled-interactive': false,
  name: 'Button Name',
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

export const requestSubmit: StoryObj = {
  render: FormTemplate,
  args: { text: undefined, type: undefined, value: 'submit button' },
};
