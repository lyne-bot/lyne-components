import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './pearl-chain-leg.js';

const departure: InputType = {
  control: {
    type: 'date',
  },
};

const arrival: InputType = {
  control: {
    type: 'date',
  },
};

const past: InputType = {
  control: {
    type: 'boolean',
  },
};
const arrivalSkipped: InputType = {
  control: {
    type: 'boolean',
  },
};

const departureSkipped: InputType = {
  control: {
    type: 'boolean',
  },
};

const disruption: InputType = {
  control: {
    type: 'boolean',
  },
};

const progress: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  departure,
  arrival,
  past,
  'arrival-skipped': arrivalSkipped,
  'departure-skipped': departureSkipped,
  disruption,
  progress,
};

const defaultArgs: Args = {
  departure: new Date('2024-12-05T12:11:00'),
  arrival: new Date('2024-12-05T15:11:00'),
  past: false,
  'arrival-skipped': false,
  'departure-skipped': false,
  disruption: false,
  progress: false,
};

const Template = ({ progress, ...args }: Args): TemplateResult =>
  html`<sbb-pearl-chain-leg
    ?data-progress=${progress}
    ${sbbSpread(args)}
    style="--sbb-pearl-chain-status-position: 28%"
  ></sbb-pearl-chain-leg>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Past: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, past: true },
};

export const DepartureSkipped: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'departure-skipped': true },
};

export const Disruption: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disruption: true },
};

export const InProgress: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, progress: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/pearl-chain/sbb-pearl-chain-leg',
};

export default meta;
