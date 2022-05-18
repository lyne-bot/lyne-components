import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleData from './lyne-timetable-platform.sample-data';

const Template = (args) => (
  <lyne-timetable-platform
    appearance={args.appearance}
    config={JSON.stringify(args.config)}
  >
  </lyne-timetable-platform>
);

const appearance = {
  control: {
    type: 'select'
  },
  options: [
    'first-level',
    'second-level-arrival',
    'second-level-departure'
  ]
};

const config = {
  table: {
    disable: false
  }
};

const defaultArgTypes = {
  appearance,
  config
};

const defaultArgs = {
  appearance: appearance.options[0]
};

/* ************************************************* */
/* The Stories                                       */
/* ************************************************* */
export const LyneTimetablePlatformFirstLevel = Template.bind({});

LyneTimetablePlatformFirstLevel.argTypes = defaultArgTypes;
LyneTimetablePlatformFirstLevel.args = {
  ...defaultArgs,
  config: sampleData[0]
};

LyneTimetablePlatformFirstLevel.documentation = {
  title: 'Lyne Timetable Platform - First Level'
};

export const LyneTimetableArrivalPlatformSecondLevel = Template.bind({});

LyneTimetableArrivalPlatformSecondLevel.argTypes = defaultArgTypes;
LyneTimetableArrivalPlatformSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[1],
  config: sampleData[0]
};

LyneTimetableArrivalPlatformSecondLevel.documentation = {
  title: 'Lyne Timetable Arrival Platform - Second Level'
};

export const LyneTimetableDeparturePlatformSecondLevel = Template.bind({});

LyneTimetableDeparturePlatformSecondLevel.argTypes = defaultArgTypes;
LyneTimetableDeparturePlatformSecondLevel.args = {
  ...defaultArgs,
  appearance: appearance.options[2],
  config: sampleData[0]
};

LyneTimetableDeparturePlatformSecondLevel.documentation = {
  title: 'Lyne Timetable Departure Platform - Second Level'
};

export default {
  decorators: [
    (Story) => (
      <Story/>
    )
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'internals/lyne-timetable-platform'
};
