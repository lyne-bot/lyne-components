import {
  ColorMilkDefault,
  ColorWhiteDefault
} from 'lyne-design-tokens/dist/js/tokens.es6';
import getMarkupForSvg from '../../global/helpers/get-markup-for-svg';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from '../sbb-pearl-chain/sbb-pearl-chain.sample-data';

/* ************************************************* */
/* Documentation platform container                  */
/* ************************************************* */

const documentationPlatformContainerStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return {
      'background-color': ColorWhiteDefault,
      'border': `1px solid ${ColorMilkDefault}`
    };
  }

  return {
    'background-color': ColorMilkDefault
  };
};

/* ************************************************* */
/* Storybook component wrapper, used in Storybook    */
/* ************************************************* */

const wrapperStyle = (context) => {
  const variantsOnDarkBg = ['primary-negative'];

  if (variantsOnDarkBg.indexOf(context.args.appearance) === -1) {
    return `background-color: ${ColorWhiteDefault};`;
  }

  return `background-color: ${ColorMilkDefault};`;
};

/* ************************************************* */
/* Storybook controls                                */
/* ************************************************* */

/* --- General ------------------------------------- */

const accessibilityLabel = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
  }
};

const idValue = {
  control: {
    type: 'text'
  },
  table: {
    category: 'General'
  }
};

/* --- Link ---------------------------------------- */

const hrefValue = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Link'
  }
};

/* --- Button -------------------------------------- */

const isButton = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button'
  }
};

const isDisabled = {
  control: {
    type: 'boolean'
  },
  table: {
    category: 'Button'
  }
};

const eventId = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

const type = {
  control: {
    type: 'select'
  },
  options: [
    'button',
    'reset',
    'submit'
  ],
  table: {
    category: 'Button'
  }
};

const name = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

const value = {
  control: {
    type: 'text'
  },
  table: {
    category: 'Button'
  }
};

/* --- Style and positioning ----------------------- */

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'primary',
    'primary-negative'
  ],
  table: {
    category: 'Style and positioning'
  }
};

const layout = {
  control: {
    type: 'select'
  },
  options: [
    'standard',
    'loose'
  ],
  table: {
    category: 'Style and positioning'
  }
};

/* eslint-disable sort-keys */
const defaultArgTypes = {
  appearance,
  layout,
  'id-value': idValue,
  'accessibility-label': accessibilityLabel,
  'href-value': hrefValue,
  'is-button': isButton,
  'is-disabled': isDisabled,
  type,
  'event-id': eventId,
  name,
  value
};

const defaultArgs = {
  'appearance': appearance.options[0],
  'accessibility-label': 'The text which gets exposed to screen reader users. The text should reflect all the information which gets passed into the components slots and which is visible in the card, either through text or iconography',
  'layout': layout.options[0],
  'href-value': 'https://github.com/lyne-design-system/lyne-components'
};
/* eslint-enable sort-keys */

/* ************************************************* */
/* Slot templates, used in Storybook template        */
/* ************************************************* */

/* --- icon slot ----------------------------------- */

const iconArgs = {
  icon: 'ticket-route-medium'
};

const iconBicycleArgs = {
  icon: 'bicycle-medium'
};

const SlotIconTemplate = (args) => (
  getMarkupForSvg(args.icon)
);

/* --- category slot ---------------------------------- */

const sbbCategoryArgs = {
  text: 'Sparbillett'
};

const SlotSbbCategoryTemplate = (args) => (
  <span>{args.text}</span>
);

/* --- title slot ---------------------------------- */

const sbbTitleDayPassArgs = {
  'level': 2,
  'text': 'Tageskarte',
  'visual-level': 6
};

const sbbTitleDayPassBicycleArgs = {
  'level': 2,
  'text': 'Velo Tageskarte',
  'visual-level': 6
};

const sbbTitleTravelCardPointToPointArgs = {
  'level': 2,
  'text': 'Streckenkarte',
  'visual-level': 6
};

const sbbTitleTravelCardLiberoArgs = {
  'level': 2,
  'text': 'Libero Tageskarte: Alle Zonen',
  'visual-level': 6
};

const sbbTitleTravelCardGAArgs = {
  'level': 2,
  'text': 'GA',
  'visual-level': 1
};

const sbbTitleTravelCardHalfFareArgs = {
  'level': 2,
  'text': '1/2',
  'visual-level': 1
};

const SlotSbbTitleTemplate = (args) => (
  <sbb-title {...args} />
);

const sbbJourneyHeaderArgs = {
  'destination': 'Loèche-les-Bains',
  'is-round-trip': true,
  'markup': 'h2',
  'origin': 'La Chaux de Fonds',
  'size': 5
};

const SlotSbbJourneyHeaderTemplate = (args) => (
  <sbb-journey-header {...args} />
);

/* --- lead slot ---------------------------------- */

const sbbLeadGAArgs = {
  'level': 3,
  'text': 'Generalabonnement',
  'visual-level': 6
};

const sbbLeadGALongArgs = {
  'level': 3,
  'text': 'Mit dem Generalabonnement geniessen Sie freie Fahrt.',
  'visual-level': 6
};

const sbbLeadHalfFareArgs = {
  'level': 3,
  'text': 'Halbtax-Abo',
  'visual-level': 6
};

const sbbLeadHalfFareLongArgs = {
  'level': 3,
  'text': 'Mit dem Halbtax zum halben Preis fahren.',
  'visual-level': 6
};

const SlotSbbLeadTemplate = (args) => (
  <sbb-title {...args} />
);

/* --- text slot ---------------------------------- */

const sbbTextValidTodayArgs = {
  text: 'Gültig heute'
};

const sbbTextValidTodayLongArgs = {
  text: 'Heute, Gültig 24 Stunden'
};

const sbbTextTravelCardValidityArgs = {
  text: '2. Klasse, gültig bis 30.11.2021'
};

const sbbTextTravelCardPointToPointArgs = {
  text: 'Für regelmässige Streckenfahrten'
};

const sbbTextConnectionDetailsArgs = {
  text: 'Samstag, 21.02.2021, 1 h 26 min'
};

const SlotSbbTextTemplate = (args) => (
  <span>{args.text}</span>
);

/* --- pearl chain slot ---------------------------------- */

const SlotPearlChainTemplate = () => (
  <sbb-pearl-chain legs={JSON.stringify(sampleData.stop4)} />
);

/* --- card-badge slot ----------------------------- */

/*
 * const cardBadgeArgs = {
 *   'is-discount': true,
 *   'price': '20.50',
 *   'text': 'from CHF'
 * };
 */

const cardBadgeWithSlotArgs = {
  'is-discount': true,
  'price': '92.50',
  'slotGeneric': '<span>on <time datetime="2021-11-25">Black Friday</time></span>',
  'text': 'from CHF'
};

const SlotCardBadgeTemplate = (args) => (
  <sbb-card-badge {...args}>
    {args.slotGeneric &&
      <span slot='generic' dangerouslySetInnerHTML={{
        __html: args.slotGeneric
      }}></span>
    }
  </sbb-card-badge>
);

/* --- action slot ----------------------------- */

const actionBuyArgs = {
  'label': 'Kaufen',
  'size': 'small',
  'variant': 'secondary',
  'visual-button-only': true
};

const actionDetailsArgs = {
  'label': 'Details',
  'variant': 'secondary',
  'visual-button-only': true
};

const actionHalfFareArgs = {
  'label': 'Zum halben Preis fahren',
  'variant': 'secondary',
  'visual-button-only': true
};

const actionGAArgs = {
  'label': 'Alle GA im Überblick',
  'variant': 'secondary',
  'visual-button-only': true
};

const actionWithPenArgs = {
  'icon': 'highlighter-small',
  'label': 'Abo bearbeiten',
  'variant': 'secondary',
  'visual-button-only': true
};

const actionWithQrArgs = {
  'icon': 'qrcode-small',
  'label': 'Billett',
  'variant': 'secondary',
  'visual-button-only': true
};

const SlotActionTemplate = (args) => (
  <sbb-button {...args}>
    {getMarkupForSvg(args.icon)}
  </sbb-button>
);

/* ************************************************* */
/* Storybook templates                               */
/* ************************************************* */

const TemplateTopProductDayPass = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleDayPassArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </sbb-card-product>
);

const TemplateTopProductDayPassBicycle = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconBicycleArgs}/></div>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleDayPassBicycleArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </sbb-card-product>
);

const TemplateTopProductTravelCardPointToPoint = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardPointToPointArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextTravelCardPointToPointArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </sbb-card-product>
);

const TemplateYourProductPointToPointPersonalized = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='title'><SlotSbbJourneyHeaderTemplate {...sbbJourneyHeaderArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextValidTodayArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionBuyArgs}/></div>
  </sbb-card-product>
);

const TemplateYourProductTravelCardPersonalized = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='category'><SlotSbbCategoryTemplate {...sbbCategoryArgs}/></div>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardLiberoArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextValidTodayLongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithQrArgs}/></div>
  </sbb-card-product>
);

const TemplateYourProductTicketPersonalized = (args) => (
  <sbb-card-product {...args}>
    <div slot='title'><SlotSbbJourneyHeaderTemplate {...sbbJourneyHeaderArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextConnectionDetailsArgs}/></div>
    <div slot='details'><SlotPearlChainTemplate /></div>
    <div slot='action'><SlotActionTemplate {...actionDetailsArgs}/></div>
  </sbb-card-product>
);

const TemplateTravelCardGA = (args) => (
  <sbb-card-product {...args}>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardGAArgs}/></div>
    <div slot='lead'><SlotSbbLeadTemplate {...sbbLeadGALongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionGAArgs}/></div>
  </sbb-card-product>
);

const TemplateTravelCardGAPersonalized = (args) => (
  <sbb-card-product {...args}>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardGAArgs}/></div>
    <div slot='lead'><SlotSbbLeadTemplate {...sbbLeadGAArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextTravelCardValidityArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithPenArgs}/></div>
  </sbb-card-product>
);

const TemplateTravelCardHalfFarePersonalized = (args) => (
  <sbb-card-product {...args}>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardHalfFareArgs}/></div>
    <div slot='lead'><SlotSbbLeadTemplate {...sbbLeadHalfFareArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextTravelCardValidityArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithPenArgs}/></div>
  </sbb-card-product>
);

const TemplateTravelCardHalfFare = (args) => (
  <sbb-card-product {...args}>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardHalfFareArgs}/></div>
    <div slot='lead'><SlotSbbLeadTemplate {...sbbLeadHalfFareLongArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionHalfFareArgs}/></div>
  </sbb-card-product>
);

const TemplateTheWholeShabang = (args) => (
  <sbb-card-product {...args}>
    <div slot='icon'><SlotIconTemplate {...iconArgs}/></div>
    <div slot='category'><SlotSbbCategoryTemplate {...sbbCategoryArgs}/></div>
    <div slot='title'><SlotSbbTitleTemplate {...sbbTitleTravelCardGAArgs}/><SlotSbbJourneyHeaderTemplate {...sbbJourneyHeaderArgs}/></div>
    <div slot='lead'><SlotSbbLeadTemplate {...sbbLeadGAArgs}/></div>
    <div slot='text'><SlotSbbTextTemplate {...sbbTextTravelCardValidityArgs}/></div>
    <div slot='details'><SlotPearlChainTemplate /></div>
    <div slot='card-badge'><SlotCardBadgeTemplate {...cardBadgeWithSlotArgs}/></div>
    <div slot='action'><SlotActionTemplate {...actionWithQrArgs}/></div>
  </sbb-card-product>
);

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */

/* --- CardProduct, Top Product Day Pass --------- */
export const TopProductDayPass = TemplateTopProductDayPass.bind({});

TopProductDayPass.argTypes = defaultArgTypes;
TopProductDayPass.args = {
  ...defaultArgs
};

TopProductDayPass.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Top Product Day Pass'
};

/* --- CardProduct, Top Product Day Pass Bicycle --------- */
export const TopProductDayPassBicycle = TemplateTopProductDayPassBicycle.bind({});

TopProductDayPassBicycle.argTypes = defaultArgTypes;
TopProductDayPassBicycle.args = {
  ...defaultArgs
};

TopProductDayPassBicycle.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Top Product Day Pass Bicycle'
};

/* --- CardProduct, Top Product Travel Card Point to Point --------- */
export const TopProductTravelCardPointToPoint = TemplateTopProductTravelCardPointToPoint.bind({});

TopProductTravelCardPointToPoint.argTypes = defaultArgTypes;
TopProductTravelCardPointToPoint.args = {
  ...defaultArgs
};

TopProductTravelCardPointToPoint.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Top Product Travel Card Point to Point'
};

/* --- CardProduct, Your Product Point to Point Ticket Personalized -------- */
export const YourProductPointToPointPersonalized = TemplateYourProductPointToPointPersonalized.bind({});

YourProductPointToPointPersonalized.argTypes = defaultArgTypes;
YourProductPointToPointPersonalized.args = {
  ...defaultArgs
};

YourProductPointToPointPersonalized.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Your Product Point to Point Ticket Personalized'
};

/* --- CardProduct, Your Product Travel Card Personalized -------- */
export const YourProductTravelCardPersonalized = TemplateYourProductTravelCardPersonalized.bind({});

YourProductTravelCardPersonalized.argTypes = defaultArgTypes;
YourProductTravelCardPersonalized.args = {
  ...defaultArgs
};

YourProductTravelCardPersonalized.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Your Product Ticket Personalized'
};

/* --- CardProduct, Your Product Point to Point Ticket Personalized -------- */
export const YourProductTicketPersonalized = TemplateYourProductTicketPersonalized.bind({});

YourProductTicketPersonalized.argTypes = defaultArgTypes;
YourProductTicketPersonalized.args = {
  ...defaultArgs
};

YourProductTicketPersonalized.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Your Product Ticket Personalized'
};

/* --- CardProduct, Travel Card GA --------- */
export const TravelCardGA = TemplateTravelCardGA.bind({});

TravelCardGA.argTypes = defaultArgTypes;
TravelCardGA.args = {
  ...defaultArgs,
  layout: layout.options[1]
};

TravelCardGA.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Travel Card GA'
};

/* --- CardProduct, Travel Card GA Personalized --------- */
export const TravelCardGAPersonalized = TemplateTravelCardGAPersonalized.bind({});

TravelCardGAPersonalized.argTypes = defaultArgTypes;
TravelCardGAPersonalized.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  layout: layout.options[1]
};

TravelCardGAPersonalized.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Travel Card GA Personalized'
};

/* --- CardProduct, Travel Card Half Fare --------- */
export const TravelCardHalfFare = TemplateTravelCardHalfFare.bind({});

TravelCardHalfFare.argTypes = defaultArgTypes;
TravelCardHalfFare.args = {
  ...defaultArgs,
  layout: layout.options[1]
};

TravelCardHalfFare.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Travel Card Half Fare'
};

/* --- CardProduct, Travel Card Half Fare Personalized --------- */
export const TravelCardHalfFarePersonalized = TemplateTravelCardHalfFarePersonalized.bind({});

TravelCardHalfFarePersonalized.argTypes = defaultArgTypes;
TravelCardHalfFarePersonalized.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  layout: layout.options[1]
};

TravelCardHalfFarePersonalized.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, Travel Card Half Fare Personalized'
};

/*
 * The Whole Shabang, everything which can be added
 * to the product card so far. Even though this should not
 * be done, but this story showcases all possible elements which the card can
 * hold.
 * Not included are the appearance and layout variants since they are always
 * mutually exclusive.
 */
export const CardProductTheWholeShabang = TemplateTheWholeShabang.bind({});

CardProductTheWholeShabang.argTypes = defaultArgTypes;
CardProductTheWholeShabang.args = {
  ...defaultArgs
};

CardProductTheWholeShabang.documentation = {
  container: {
    styles:
      (context) => (
        documentationPlatformContainerStyle(context)
      )
  },
  title: 'CardProduct, The Whole Shabang'
};

/* --- next story ... ------------------------------ */

/* ************************************************* */
/* Render storybook section and stories              */
/* ************************************************* */

export default {
  decorators: [
    (Story, context) => (
      <div style={`${wrapperStyle(context)} padding: 2rem`}>
        <Story/>
      </div>
    )
  ],
  parameters: {
    backgrounds: {
      disable: true
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'components/cards/sbb-card-product'
};
