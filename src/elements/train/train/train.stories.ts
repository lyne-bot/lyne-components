import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './train.js';

const Template = (args: Args): TemplateResult => html`<sbb-train ${sbbSpread(args)}></sbb-train>`;

const directionLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const directionLabelLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'Direction indicator',
  },
};

const station: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Direction indicator',
  },
};

const direction: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['left', 'right'],
  table: {
    category: 'Direction indicator',
  },
};

const defaultArgTypes: ArgTypes = {
  'direction-label': directionLabel,
  'accessibility-label': accessibilityLabel,
  station,
  direction,
  'direction-label-level': directionLabelLevel,
};

const defaultArgs: Args = {
  'direction-label': 'Direction of travel',
  'accessibility-label':
    'The top of the train is in Sector A. The train leaves the station in this direction',
  station: 'Bern',
  direction: direction.options![0],
  'direction-label-level': directionLabelLevel.options![4],
};

export const train: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: defaultArgs,
};

export const trainWithoutStation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, station: undefined },
};

const meta: Meta = {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/timetable/sbb-train',
};

export default meta;
