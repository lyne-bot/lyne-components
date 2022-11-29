import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-navigation-section {...args}></sbb-navigation-section>;

export const Default = Template.bind({});

Default.args = {
  'some-prop': 'opt1',
};

Default.documentation = {
  title: 'Title which will be rendered on documentation platform',
};

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  documentation: {
    disableArgs: ['someArgToDisableForDocumentationPlatform'],
  },
  parameters: {
    actions: {
      handles: [],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/navigation/sbb-navigation-section',
};
