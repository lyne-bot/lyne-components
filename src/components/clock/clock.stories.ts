import type { InputType } from '@storybook/types';
import type { Args, Meta, StoryObj } from '@storybook/web-components';
import isChromatic from 'chromatic/isChromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';

import readme from './readme.md?raw';

import './clock.js';

const now: InputType = {
  control: {
    type: 'date',
  },
};

const Template = (args: Args): TemplateResult => html`<sbb-clock ${sbbSpread(args)}></sbb-clock>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: { ...now },
  args: { now: undefined },
};

export const Paused: StoryObj = {
  render: Template,
  argTypes: { ...now },
  args: { now: new Date('2023-01-24T10:10:30+01:00').valueOf() },
};

/**
 * Stop the clock for Chromatic visual regression tests
 * and set time to given time
 */
if (isChromatic()) {
  Default.args = {
    now: new Date('2023-01-24T10:10:30+01:00').valueOf(),
  };
}

const meta: Meta = {
  decorators: [(story) => html`<div style=${styleMap({ 'max-width': '600px' })}>${story()}</div>`],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-clock',
};

export default meta;
