/** @jsx h */
import events from './sbb-expansion-panel.events';
import panelHeaderEvents from '../sbb-expansion-panel-header/sbb-expansion-panel-header.events';
import { h, JSX } from 'jsx-dom';
import readme from './readme.md';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Meta, StoryObj, ArgTypes, Args, Decorator } from '@storybook/html';
import { InputType, StoryContext } from '@storybook/types';

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer enim elit, ultricies in tincidunt
quis, mattis eu quam. Nulla sit amet lorem fermentum, molestie nunc ut, hendrerit risus. Vestibulum rutrum elit et
lacus sollicitudin, quis malesuada lorem vehicula. Suspendisse at augue quis tellus vulputate tempor. Vivamus urna
velit, varius nec est ac, mollis efficitur lorem. Quisque non nisl eget massa interdum tempus. Praesent vel feugiat
metus.`;

const headerText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Header',
  },
};

const contentText: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Content',
  },
};

const titleLevel: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6, null],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const borderless: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
};

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
  },
};

const defaultArgTypes: ArgTypes = {
  headerText,
  iconName,
  contentText,
  expanded,
  'title-level': titleLevel,
  color,
  borderless,
  disabled,
  'disable-animation': disableAnimation,
};

const defaultArgs: Args = {
  headerText: 'Header',
  iconName: undefined,
  contentText: 'Content',
  expanded: false,
  'title-level': titleLevel.options[2],
  color: color.options[0],
  borderless: false,
  disabled: false,
  'disable-animation': false,
};

const Template = ({ headerText, iconName, contentText, ...args }): JSX.Element => (
  <sbb-expansion-panel {...args}>
    <sbb-expansion-panel-header icon-name={iconName}>{headerText}</sbb-expansion-panel-header>
    <sbb-expansion-panel-content>{contentText}</sbb-expansion-panel-content>
  </sbb-expansion-panel>
);

const TemplateSlottedIcon = ({ headerText, iconName, contentText, ...args }): JSX.Element => (
  <sbb-expansion-panel {...args}>
    <sbb-expansion-panel-header>
      {headerText}
      <sbb-icon slot="icon" name={iconName} />
    </sbb-expansion-panel-header>
    <sbb-expansion-panel-content>{contentText}</sbb-expansion-panel-content>
  </sbb-expansion-panel>
);

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: color.options[1] },
};

export const Borderless: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, borderless: true },
};

export const Disabled: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, disabled: true },
};

export const WithIcon: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, iconName: 'swisspass-medium' },
};

export const WithSlottedIcon: StoryObj = {
  render: TemplateSlottedIcon,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, iconName: 'swisspass-medium' },
};

export const NoHeadingTag: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'title-level': titleLevel.options[6] },
};

export const Expanded: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, expanded: true },
};

export const LongText: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, headerText: longText, contentText: longText },
};

export const NoAnimation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, 'disable-animation': true },
};

const wrapperStyle = (context: StoryContext): Record<string, string> => ({
  'background-color':
    context.args.color === 'white' && context.args.borderless
      ? '#bdbdbd'
      : 'var(--sbb-color-white-default)',
});

const meta: Meta = {
  decorators: [
    (Story, context) => (
      <div style={{ ...wrapperStyle(context), padding: '2rem' }}>
        <Story />
      </div>
    ),
    withActions as Decorator,
  ],
  parameters: {
    actions: {
      handles: [
        events.willOpen,
        events.didOpen,
        events.willClose,
        events.didClose,
        panelHeaderEvents.toggleExpanded,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-accordion/sbb-expansion-panel',
};

export default meta;
