import events from '../lyne-accordion-item/lyne-accordion-item.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';

const ItemTemplate = (args) => (
  <lyne-accordion-item {...args}>
    <p slot='content'>1 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
    <p slot='content'>2 Donec sed odio operae, eu vulputate felis rhoncus. Curabitur est gravida et libero vitae dictum. Me non paenitet nullum festiviorem excogitasse ad hoc.</p>
    <p slot='content'>3 Quis aute iure reprehenderit in voluptate velit esse. Ab illo tempore, ab est sed immemorabili. Non equidem invideo, lit aliquet. Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae.</p>

    {args.icon &&
      <svg slot='icon' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='m17.8436,12.1382-3.99-3.99196-.7072.70693,3.1366,3.13823H5v1h11.287l-3.1413,3.1555.7086.7056,3.99-4.008.3519-.3535-.3526-.3528z'></path></svg>
    }
  </lyne-accordion-item>
);

const Template = (args) => (
  <lyne-accordion {...args}>
    {args.items.map((item) => (
      <ItemTemplate {...item} />
    ))}
  </lyne-accordion>
);

export const Default = Template.bind({});
export const NonWhiteBackground = Template.bind();

const items = [
  {
    'event-id': 'id1',
    'heading': 'Accordion Item 1',
    'heading-level': '2',
    'icon': true,
    'open': false
  },
  {
    'heading': 'Accordion Item 2',
    'heading-level': '2',
    'icon': false,
    'open': false
  },
  {
    'event-id': 'id3',
    'heading': 'Accordion Item 3',
    'heading-level': '2',
    'icon': true,
    'open': false
  }
];

const table = {
  disable: true
};

Default.argTypes = {
  'items': {
    table
  },
  'non-white-background': {
    table
  }
};

Default.args = {
  items,
  'non-white-background': false,
  'only-one-open': false
};

Default.decorators = [
  (Story) => (
    <div style={'padding: 2rem;'}>
      <Story/>
    </div>
  )
];

NonWhiteBackground.argTypes = {
  'items': {
    table
  },
  'non-white-background': {
    table
  }
};

NonWhiteBackground.args = {
  items,
  'non-white-background': true,
  'only-one-open': true
};

NonWhiteBackground.decorators = [
  (Story) => (
    <div style={'background: #dcdcdc;padding: 2rem;'}>
      <Story/>
    </div>
  )
];

export default {
  parameters: {
    actions: {
      handles: [
        events.didOpen,
        events.didClose,
        events.willOpen,
        events.willClose
      ]
    },
    docs: {
      extractComponentDescription: () => readme
    }
  },
  title: 'lyne-accordion'
};

