import {
  SbbColorAluminiumDefault,
  SbbColorCharcoalDefault,
  SbbColorIronDefault,
  SbbColorWhiteDefault,
  SbbTypoLetterSpacingBodyText,
  SbbTypoLineHeightBodyText,
  SbbTypoScaleDefault,
  SbbTypoTypeFaceSbbRoman,
} from '@sbb-esta/lyne-design-tokens';
import { h } from 'jsx-dom';
import readme from './readme.md';
import events from './sbb-link.events';

const wrapperStyle = (context) => {
  if (!context.args.negative) {
    return `background-color: ${SbbColorWhiteDefault};`;
  }

  return `background-color: ${SbbColorCharcoalDefault};`;
};

const Template = (args) => <sbb-link {...args}>{args.text}</sbb-link>;

const paragraphStyle = (context) => {
  let color;

  if (context.args.negative) {
    color = `color: ${SbbColorAluminiumDefault};`;
  } else {
    color = `color: ${SbbColorIronDefault};`;
  }

  return `${color} font-family: ${SbbTypoTypeFaceSbbRoman}; font-weight: normal; line-height: ${SbbTypoLineHeightBodyText}; letter-spacing: ${SbbTypoLetterSpacingBodyText}; font-size: ${SbbTypoScaleDefault}px`;
};

const InlineTemplate = (args, context) => (
  <p style={paragraphStyle(context)}>
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <sbb-link {...args}>{args.text}</sbb-link>
  </p>
);

const text = {
  control: {
    type: 'text',
  },
};

const variant = {
  control: {
    type: 'select',
  },
  options: ['block', 'inline'],
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const textSize = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const iconName = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconPlacement = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
  table: {
    category: 'Icon',
  },
};

const href = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const idValue = {
  control: {
    type: 'text',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
};

const accessibilityDescribedby = {
  control: {
    type: 'text',
  },
};

const accessibilityLabelledby = {
  control: {
    type: 'text',
  },
};

const name = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const type = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const disabled = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const form = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const eventId = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const defaultArgTypes = {
  text,
  variant,
  negative,
  'text-size': textSize,
  'icon-name': iconName,
  'icon-placement': iconPlacement,
  href: href,
  download,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  'accessibility-describedby': accessibilityDescribedby,
  'accessibility-labelledby': accessibilityLabelledby,
  name,
  type,
  form,
  disabled,
  'event-id': eventId,
};

const defaultArgs = {
  text: 'Travelcards & tickets',
  variant: variant.options[0],
  negative: false,
  'text-size': textSize.options[1],
  'icon-name': '',
  'icon-placement': iconPlacement.options[0],
  href: 'https://github.com/lyne-design-system/lyne-components',
  download: false,
  'id-value': '',
  'accessibility-label': 'Travelcards & tickets',
  'accessibility-describedby': '',
  'accessibility-labelledby': '',
  name: 'Button name',
  type: type.options[0],
  form: '',
  disabled: false,
  'event-id': 'Event ID for button click',
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const BlockXS = Template.bind({});
BlockXS.argTypes = defaultArgTypes;
BlockXS.args = {
  ...defaultArgs,
  'text-size': textSize.options[0],
};
BlockXS.documentation = {
  title: 'Block Size XS',
};

export const BlockS = Template.bind({});
BlockS.argTypes = defaultArgTypes;
BlockS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
};
BlockS.documentation = {
  title: 'Block Size S',
};

export const BlockM = Template.bind({});
BlockM.argTypes = defaultArgTypes;
BlockM.args = {
  ...defaultArgs,
  'text-size': textSize.options[2],
};
BlockM.documentation = {
  title: 'Block Size M',
};

export const BlockNegativeS = Template.bind({});
BlockNegativeS.argTypes = defaultArgTypes;
BlockNegativeS.args = {
  ...defaultArgs,
  'text-size': textSize.options[1],
  negative: true,
};
BlockNegativeS.documentation = {
  title: 'Block Negative Size S',
};

export const BlockIconStart = Template.bind({});
BlockIconStart.argTypes = defaultArgTypes;
BlockIconStart.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-left-small',
};
BlockIconStart.documentation = {
  title: 'Block Icon Start',
};

export const BlockNegativeIconStart = Template.bind({});
BlockNegativeIconStart.argTypes = defaultArgTypes;
BlockNegativeIconStart.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-left-small',
  negative: true,
};
BlockNegativeIconStart.documentation = {
  title: 'Block Negative Icon Start',
};

export const BlockIconEnd = Template.bind({});
BlockIconEnd.argTypes = defaultArgTypes;
BlockIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockIconEnd.documentation = {
  title: 'Block End Start',
};

export const BlockNegativeIconEnd = Template.bind({});
BlockNegativeIconEnd.argTypes = defaultArgTypes;
BlockNegativeIconEnd.args = {
  ...defaultArgs,
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
  negative: true,
};
BlockNegativeIconEnd.documentation = {
  title: 'Block Negative Icon End',
};

export const BlockButton = Template.bind({});
BlockButton.argTypes = defaultArgTypes;
BlockButton.args = {
  ...defaultArgs,
  href: '',
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockButton.documentation = {
  title: 'Block Button',
};

export const BlockButtonNegative = Template.bind({});
BlockButtonNegative.argTypes = defaultArgTypes;
BlockButtonNegative.args = {
  ...defaultArgs,
  negative: true,
  href: '',
  'icon-name': 'chevron-small-right-small',
  'icon-placement': iconPlacement.options[1],
};
BlockButtonNegative.documentation = {
  title: 'Block Button Negative',
};

export const Inline = InlineTemplate.bind({});
Inline.argTypes = defaultArgTypes;
Inline.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[1],
};
Inline.documentation = {
  title: 'Inline',
};

export const InlineNegative = InlineTemplate.bind({});
InlineNegative.argTypes = defaultArgTypes;
InlineNegative.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: variant.options[1],
  negative: true,
};
InlineNegative.documentation = {
  title: 'Inline Negative',
};

export const InlineButton = InlineTemplate.bind({});
InlineButton.argTypes = defaultArgTypes;
InlineButton.args = {
  ...defaultArgs,
  text: 'Show more',
  variant: 'inline',
  href: '',
};
InlineNegative.documentation = {
  title: 'Inline Button',
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
    actions: {
      handles: [events.click],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-link',
};
