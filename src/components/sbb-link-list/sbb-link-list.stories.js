import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: var(--sbb-color-charcoal-default);`;
  }

  return `background-color:  var(--sbb-color-white-default);`;
};

const LinkTemplate = (args) => (
  <sbb-link href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html">
    {args.linkTitle}
  </sbb-link>
);

// SlottedTitle
const TemplateSlottedTitle = ({ 'title-content': titleContent, ...args }) => (
  <sbb-link-list {...args}>
    <span slot="title">{titleContent}</span>
    {links.map((linkTitle) => (
      <LinkTemplate {...{ linkTitle }} />
    ))}
  </sbb-link-list>
);

// TitleAsProperty
const Template = ({ ...args }) => (
  <sbb-link-list {...args}>
    {links.map((linkTitle) => (
      <LinkTemplate {...{ linkTitle }} />
    ))}
  </sbb-link-list>
);

const links = ['Refunds', 'Lost property office', 'Complaints', 'Praise', 'Report property damage'];

const orientation = {
  control: {
    type: 'select',
  },
  options: ['vertical', 'horizontal'],
  table: {
    category: 'List Styling',
  },
};

const horizontalFrom = {
  control: {
    type: 'select',
  },
  options: ['zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
  table: {
    category: 'List Styling',
  },
};

const titleContent = {
  control: {
    type: 'text',
  },
  table: {
    category: 'List Title',
  },
};

const titleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [2, 3, 4, 5, 6],
  table: {
    category: 'List Title',
  },
};

const negative = {
  control: {
    type: 'boolean',
  },
  options: [true, false],
  table: {
    category: 'Styling Variant',
  },
};

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
  table: {
    category: 'List Items',
  },
};

const defaultArgTypes = {
  orientation: orientation,
  'horizontal-from': horizontalFrom,
  'title-level': titleLevel,
  'title-content': titleContent,
  negative,
  textSize,
};

const defaultArgs = {
  orientation: orientation.options[0],
  'title-level': titleLevel.options[0],
  'title-content': 'Help & Contact',
  negative: false,
  textSize: textSize.options[1],
};

export const LinkListDefault = Template.bind({});
LinkListDefault.argTypes = defaultArgTypes;
LinkListDefault.args = {
  ...defaultArgs,
};

export const LinkListXS = Template.bind({});
LinkListXS.argTypes = defaultArgTypes;
LinkListXS.args = {
  ...defaultArgs,
  textSize: textSize.options[0],
};

export const LinkListNoTitle = Template.bind({});
LinkListNoTitle.argTypes = defaultArgTypes;
LinkListNoTitle.args = {
  ...defaultArgs,
  'title-content': undefined,
};

export const LinkListNegative = Template.bind({});
LinkListNegative.argTypes = defaultArgTypes;
LinkListNegative.args = {
  ...defaultArgs,
  negative: true,
};

export const LinkListHorizontalFrom = Template.bind({});
LinkListHorizontalFrom.argTypes = defaultArgTypes;
LinkListHorizontalFrom.args = {
  ...defaultArgs,
  'horizontal-from': 'medium',
};

export const LinkListWithSlottedTitle = TemplateSlottedTitle.bind({});
LinkListWithSlottedTitle.argTypes = defaultArgTypes;
LinkListWithSlottedTitle.args = {
  ...defaultArgs,
};

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)}padding: 2rem`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link-list',
};
