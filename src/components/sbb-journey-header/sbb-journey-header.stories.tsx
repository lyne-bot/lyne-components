/** @jsx h */
import { h, JSX } from 'jsx-dom';
import readme from './readme.md?raw';
import type { Meta, StoryObj, ArgTypes, Args, StoryContext } from '@storybook/web-components';
import type { InputType } from '@storybook/types';
import './sbb-journey-header';

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color': context.args.negative
    ? 'var(--sbb-color-charcoal-default)'
    : 'var(--sbb-color-white-default)',
});

const origin: InputType = {
  control: {
    type: 'text',
  },
};

const destination: InputType = {
  control: {
    type: 'text',
  },
};

const roundTrip: InputType = {
  control: {
    type: 'boolean',
  },
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['1', '2', '3', '4', '5', '6'],
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['m', 'l'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  origin,
  destination,
  'round-trip': roundTrip,
  level,
  size,
  negative,
};

const defaultArgs: Args = {
  origin: 'La Chaux de Fonds',
  destination: 'Loèche-les-Bains',
  'round-trip': false,
  level: level.options[2],
  size: size.options[0],
  negative: false,
};

const Template = (args): JSX.Element => <sbb-journey-header {...args} />;

export const SizeM: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const SizeMRoundTrip: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'round-trip': true },
};

export const SizeMNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};

export const SizeMRoundTripShortText: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    origin: 'Bern',
    destination: 'Thun',
    'round-trip': true,
  },
};

export const SizeL: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};

export const SizeLRoundTripShortText: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    origin: 'Bern',
    destination: 'Thun',
    'round-trip': true,
    size: size.options[1],
  },
};

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-journey-header',
};

export default meta;
