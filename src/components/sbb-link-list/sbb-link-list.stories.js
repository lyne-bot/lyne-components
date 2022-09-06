import { SbbColorCharcoalDefault, SbbColorWhiteDefault } from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';

const wrapperStyle = (context) => {
  if (context.args.negative) {
    return `background-color: ${SbbColorCharcoalDefault};`;
  }

  return `background-color: ${SbbColorWhiteDefault};`;
};

const Template = (args) => (
  <sbb-link-list {...args}>
    <span slot="title">{args['title-text']}</span>
    <sbb-link
      href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
      text="Rückerstattungen"
      text-size={args.textSize}
      negative={args.negative}
    >
      Rückerstattungen
    </sbb-link>
    <sbb-link
      href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
      text="Fundbüro"
      text-size={args.textSize}
      negative={args.negative}
    >
      Fundbüro
    </sbb-link>
    <sbb-link
      href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
      text="Beschwerden"
      text-size={args.textSize}
      negative={args.negative}
    >
      Beschwerden
    </sbb-link>
    <sbb-link
      href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
      text="Lob aussprechen"
      text-size={args.textSize}
      negative={args.negative}
    >
      Lob aussprechen
    </sbb-link>
    <sbb-link
      href="https://www.sbb.ch/de/hilfe-und-kontakt/erstattung-entschaedigung/rueckerstattung-von-billetten.html"
      text="Sachbeschädigung melden"
      text-size={args.textSize}
      negative={args.negative}
    >
      Sachbeschädigung melden
    </sbb-link>
    <span slot="button"></span>
  </sbb-link-list>
);

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

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
  table: {
    category: 'List Items',
  },
};

const titleText = {
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

const defaultArgTypes = {
  orientation: orientation,
  'horizontal-from': horizontalFrom,
  textSize,
  'title-level': titleLevel,
  'title-text': titleText,
  negative,
};

const defaultArgs = {
  orientation: orientation.options[0],
  textSize: textSize.options[1],
  'title-level': titleLevel.options[0],
  'title-text': 'Help & Contact',
  negative: false,
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LinkListDefault = Template.bind({});

LinkListDefault.argTypes = defaultArgTypes;
LinkListDefault.args = {
  ...defaultArgs,
};

LinkListDefault.documentation = {
  title: 'Link List',
};

export const LinkListXS = Template.bind({});

LinkListXS.argTypes = defaultArgTypes;
LinkListXS.args = {
  ...defaultArgs,
  textSize: textSize.options[0],
};

LinkListXS.documentation = {
  title: 'Link List - Textsize extra small',
};

export const LinkListNoTitle = Template.bind({});

LinkListNoTitle.argTypes = defaultArgTypes;
LinkListNoTitle.args = {
  ...defaultArgs,
  'title-text': '',
};

LinkListNoTitle.documentation = {
  title: 'Link List No Title',
};

export const LinkListNegative = Template.bind({});

LinkListNegative.argTypes = defaultArgTypes;
LinkListNegative.args = {
  ...defaultArgs,
  negative: true,
};

LinkListNegative.documentation = {
  title: 'Link List Negative',
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
