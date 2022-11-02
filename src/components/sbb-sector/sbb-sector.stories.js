import { h } from 'jsx-dom';
import readme from './readme.md';

const Template = (args) => <sbb-sector {...args}></sbb-sector>;

export const story1 = Template.bind({});

story1.args = {
  'some-prop': 'opt1',
};

story1.documentation = {
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
    actions: {},
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/timetable/train-formation/sbb-sector',
};
