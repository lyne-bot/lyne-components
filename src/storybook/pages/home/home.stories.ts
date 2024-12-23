import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Meta, StoryContext, StoryObj } from '@storybook/web-components';

import { homeLoggedInTemplate } from './home-logged-in.js';
import { homeTemplate } from './home.js';
import readme from './readme.md?raw';

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  negative,
  expanded,
};

const defaultArgs: Args = {
  negative: false,
  expanded: false,
};

export const home: StoryObj = {
  render: homeTemplate,
};

export const homeLoggedIn: StoryObj = {
  render: homeLoggedInTemplate,
};

const meta: Meta = {
  argTypes: defaultArgTypes,
  args: defaultArgs,
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-charcoal)' : 'var(--sbb-color-white)',
    docs: {
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'pages/home',
};

export default meta;
