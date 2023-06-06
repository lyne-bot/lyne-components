/** @jsx h */
import { h, JSX } from 'jsx-dom';

import readme from './readme.md';
import './scrollbar-internal.scss';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import type { InputType } from '@storybook/types';

const text = `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.`;

const Template = (args) => {
  let scrollbarClass = 'scrollbar';
  if (args.size === 'thick') {
    scrollbarClass += '-thick';
  }
  if (args.negative) {
    scrollbarClass += '-negative';
  }
  if (args.trackVisible) {
    scrollbarClass += '-track-visible';
  }

  return (
    <div class={`overflow-container ${scrollbarClass}${args.negative ? ' negative' : ''}`}>
      <div class="inner-box">{text}</div>
    </div>
  );
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['thin', 'thick'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const trackVisible: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  negative,
  trackVisible,
};

const defaultArgs: Args = {
  size: size.options[0],
  negative: false,
  trackVisible: false,
};

export const Thin: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};



export const ThinTrackVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, trackVisible: true },
};



export const ThinNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true },
};



export const ThinNegativeTrackVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, negative: true, trackVisible: true },
};



export const Thick: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1] },
};



export const ThickTrackVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1], trackVisible: true },
};



export const ThickNegative: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, size: size.options[1], negative: true },
};



export const ThickNegativeTrackVisible: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
  ...defaultArgs,
  size: size.options[1],
  negative: true,
  trackVisible: true,
},
};



const meta: Meta =  {
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
    chromatic: { disableSnapshot: true },
  },
  title: 'styles/scrollbar',
};

export default meta;
