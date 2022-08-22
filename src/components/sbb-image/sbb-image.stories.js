import { h } from 'jsx-dom';
import images from '../../global/images';
import readme from './readme.md';

const Template = (args) => <sbb-image {...args} />;

const imageSrc = {
  control: {
    type: 'select',
  },
  options: images,
};

const borderRadius = {
  control: {
    type: 'select',
  },
  options: ['true', 'false'],
};

const aspectRatio = {
  control: { type: 'select' },
  options: ['free', '1-1', '1-2', '2-1', '2-3', '3-2', '3-4', '4-3', '4-5', '5-4', '9-16', '16-9'],
};

const copyright = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Legal',
  },
};

const copyrightHolder = {
  control: {
    type: 'inline-radio',
  },
  options: ['Organization', 'Person'],
  table: {
    category: 'Legal',
  },
};

const customFocalPoint = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointDebug = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointX = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const focalPointY = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Focal Point',
  },
};

const loading = {
  control: {
    type: 'inline-radio',
  },
  options: ['eager', 'lazy'],
  table: {
    category: 'Performance',
  },
};

const lqip = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Performance',
  },
};

const performanceMark = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Performance',
  },
};

export const Default = Template.bind({});

Default.argTypes = {
  alt: '',
  caption: '',
  'border-radius': borderRadius,
  'aspect-ratio': aspectRatio,
  copyright,
  'copyright-holder': copyrightHolder,
  'custom-focal-point': customFocalPoint,
  'focal-point-debug': focalPointDebug,
  'focal-point-x': focalPointX,
  'focal-point-y': focalPointY,
  'image-src': imageSrc,
  loading,
  lqip,
  'performance-mark': performanceMark,
};

Default.args = {
  alt: '',
  caption:
    'Mit Ihrem Halbtax profitieren Sie zudem von attraktiven Zusatzleistungen und Rabatten. Wenn Sie unter 25 Jahre jung sind, können Sie zu Ihrem Halbtax das beliebte <a href="https://www.sbb.ch/abos-billette/abonnemente/gleis-7-freie-fahrt-ab-19-uhr.html#jahrg_nger_halbtax">Gleis 7</a> dazu kaufen.',
  // we need a string and not boolean, otherwise storybook add/remove the attribute but don't write the value
  'border-radius': 'true',
  'aspect-ratio': '',
  copyright: '',
  'copyright-holder': copyrightHolder.options[0],
  'custom-focal-point': false,
  'focal-point-debug': false,
  'focal-point-x': '',
  'focal-point-y': '',
  'image-src': imageSrc.options[0],
  loading: loading.options[1],
  lqip: true,
  'performance-mark': '',
};

Default.documentation = {
  title: 'Default image',
};

export const NoCaptionNoRadius = Template.bind({});

NoCaptionNoRadius.argTypes = Default.argTypes;
NoCaptionNoRadius.args = {
  ...Default.args,
  'border-radius': 'false',
  caption: '',
};

NoCaptionNoRadius.documentation = {
  title: 'No caption, no radius',
};

export default {
  decorators: [
    (Story) => (
      <div style="max-width: 1000px;">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-image',
};
