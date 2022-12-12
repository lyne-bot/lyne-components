import events from './sbb-dialog.events.ts';
import { h } from 'jsx-dom';
import readme from './readme.md';
import sampleImages from '../../global/images';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../global/helpers/testing/wait-for-stable-position';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('dialog').shadowRoot.querySelector('dialog.sbb-dialog')
  );

  await waitForStablePosition(() => canvas.getByTestId('dialog-trigger'));

  const button = canvas.getByTestId('dialog-trigger');
  await userEvent.click(button);
};

const titleContent = {
  control: {
    type: 'text',
  },
};

const titleLevel = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
};

const titleBackButton = {
  control: {
    type: 'boolean',
  },
};

const negative = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityBackLabel = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  'title-content': titleContent,
  'title-level': titleLevel,
  'title-back-button': titleBackButton,
  negative,
  'accessibility-label': accessibilityLabel,
  'accessibility-close-label': accessibilityCloseLabel,
  'accessibility-back-label': accessibilityBackLabel,
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'title-content': 'Title',
  'title-level': undefined,
  'title-back-button': true,
  negative: false,
  'accessibility-label': undefined,
  'accessibility-close-label': undefined,
  'accessibility-back-label': undefined,
  'disable-animation': isChromatic(),
};

const openDialog = (event, id) => {
  const dialog = document.getElementById(id);
  dialog.open(event);
};

const onFormDialogClose = (dialog) => {
  dialog.addEventListener('will-close', (event) => {
    if (event.detail) {
      document.getElementById(
        'returned-value-message'
      ).innerHTML = `${event.detail.returnValue.message?.value}`;
      document.getElementById(
        'returned-value-animal'
      ).innerHTML = `${event.detail.returnValue.animal?.value}`;
    }
  });
};

const triggerButton = (dialogId) => (
  <sbb-button
    data-testid="dialog-trigger"
    size="m"
    type="button"
    accessibility-controls={dialogId}
    onClick={(event) => openDialog(event, dialogId)}
  >
    Open dialog
  </sbb-button>
);

const actionGroup = (negative) => (
  <sbb-action-group
    slot="action-group"
    align-group="stretch"
    orientation="vertical"
    horizontal-from="medium"
  >
    <sbb-link
      variant="block"
      text-size="s"
      align-self="start"
      icon-name="chevron-small-left-small"
      icon-placement="start"
      href="https://www.sbb.ch/en/"
      negative={negative}
      sbb-dialog-close
    >
      Link
    </sbb-link>
    <sbb-button size="m" variant="secondary" sbb-dialog-close>
      Cancel
    </sbb-button>
    <sbb-button size="m" variant="primary" sbb-dialog-close>
      Button
    </sbb-button>
  </sbb-action-group>
);

const codeStyle = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  marginInline: 'var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const formDetailsStyle = {
  marginTop: 'var(--sbb-spacing-fixed-4x)',
  padding: 'var(--sbb-spacing-fixed-4x)',
  borderRadius: 'var(--sbb-border-radius-8x)',
  backgroundColor: 'var(--sbb-color-milk-default)',
};

const formStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--sbb-spacing-fixed-4x)',
};

const DefaultTemplate = (args) => [
  triggerButton('my-dialog-1'),
  <sbb-dialog data-testid="dialog" id="my-dialog-1" {...args}>
    <p id="dialog-content-1" style={'margin: 0'}>
      Dialog content
    </p>
    {actionGroup(args.negative, 'my-dialog-1')}
  </sbb-dialog>,
];

const SlottedTitleTemplate = (args) => [
  triggerButton('my-dialog-2'),
  <sbb-dialog data-testid="dialog" id="my-dialog-2" {...args}>
    <span slot="title">
      <sbb-icon
        name="book-medium"
        style={'vertical-align: sub; margin-inline-end: 0.5rem;'}
      ></sbb-icon>
      The Catcher in the Rye
    </span>
    <p id="dialog-content-2" style={'margin: 0'}>
      “What really knocks me out is a book that, when you're all done reading it, you wish the
      author that wrote it was a terrific friend of yours and you could call him up on the phone
      whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher in
      the Rye
    </p>
    {actionGroup(args.negative, 'my-dialog-2')}
  </sbb-dialog>,
];

const LongContentTemplate = (args) => [
  triggerButton('my-dialog-3'),
  <sbb-dialog data-testid="dialog" id="my-dialog-3" {...args}>
    Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
    like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
    Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
    elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed to
    Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and pierced
    his heart.
    <sbb-image
      style={'margin-block: 1rem'}
      image-src={sampleImages[1]}
      alt="Natural landscape"
    ></sbb-image>
    He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels of
    blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
    other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the
    Rings: The Fellowship of the Ring, “Many Meetings”
    {actionGroup(args.negative, 'my-dialog-3')}
  </sbb-dialog>,
];

const FormTemplate = (args) => [
  triggerButton('my-dialog-4'),
  <div id="returned-value">
    <div style={formDetailsStyle}>
      <div>
        Your message: <span id="returned-value-message">Hello 👋</span>
      </div>
      <div>
        Your favorite animal: <span id="returned-value-animal">Red Panda</span>
      </div>
    </div>
  </div>,
  <sbb-dialog
    data-testid="dialog"
    id="my-dialog-4"
    {...args}
    ref={(dialog) => onFormDialogClose(dialog)}
  >
    <div style={'margin-bottom: var(--sbb-spacing-fixed-4x)'}>
      Submit the form below to close the dialog box using the
      <code style={codeStyle}>close(result?: any, target?: HTMLElement)</code>
      method and returning the form values to update the details.
    </div>
    <form style={formStyle} onSubmit={(e) => e.preventDefault()}>
      <sbb-form-field error-space="none" label="Message" size="m">
        <input placeholder="Your custom massage" value="Hello 👋" name="message" />
      </sbb-form-field>
      <sbb-form-field error-space="none" label="Favorite animal" size="m">
        <select placeholder="Your favorite animal" name="animal">
          <option>Red Panda</option>
          <option>Cheetah</option>
          <option>Polar Bear</option>
          <option>Elephant</option>
        </select>
      </sbb-form-field>
      <sbb-button type="submit" size="m" sbb-dialog-close>
        Update details
      </sbb-button>
    </form>
  </sbb-dialog>,
];

const NoFooterTemplate = (args) => [
  triggerButton('my-dialog-5'),
  <sbb-dialog data-testid="dialog" id="my-dialog-5" {...args}>
    <p id="dialog-content-5" style={'margin: 0'}>
      “What really knocks me out is a book that, when you're all done reading it, you wish the
      author that wrote it was a terrific friend of yours and you could call him up on the phone
      whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher in
      the Rye
    </p>
  </sbb-dialog>,
];

const FullScreenTemplate = (args) => [
  triggerButton('my-dialog-6'),
  <sbb-dialog data-testid="dialog" id="my-dialog-6" {...args}>
    <sbb-title visual-level="2" style={'margin-bottom: 1rem'} negative={args.negative}>
      Many Meetings
    </sbb-title>
    Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
    like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
    Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
    elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed to
    Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and pierced
    his heart.
    <sbb-image
      style={'margin-block: 1rem'}
      image-src={sampleImages[1]}
      alt="Natural landscape"
    ></sbb-image>
    He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels of
    blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
    other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of the
    Rings: The Fellowship of the Ring, “Many Meetings”
    {actionGroup(args.negative, 'my-dialog-6')}
  </sbb-dialog>,
];

export const Default = DefaultTemplate.bind({});
Default.documentation = { title: 'Default Dialog' };
Default.argTypes = basicArgTypes;
Default.args = basicArgs;
Default.play = playStory;

export const Negative = DefaultTemplate.bind({});
Negative.documentation = { title: 'Negative Dialog' };
Negative.argTypes = basicArgTypes;
Negative.args = {
  ...basicArgs,
  negative: true,
};
Negative.play = playStory;

export const SlottedTitle = SlottedTitleTemplate.bind({});
SlottedTitle.documentation = { title: 'Slotted title' };
SlottedTitle.argTypes = basicArgTypes;
SlottedTitle.args = {
  ...basicArgs,
  'title-content': undefined,
  'title-back-button': false,
};
SlottedTitle.play = playStory;

export const LongContent = LongContentTemplate.bind({});
LongContent.documentation = { title: 'Long content' };
LongContent.argTypes = basicArgTypes;
LongContent.args = { ...basicArgs };
LongContent.play = playStory;

export const Form = FormTemplate.bind({});
Form.documentation = { title: 'Dialog with form' };
Form.argTypes = basicArgTypes;
Form.args = { ...basicArgs };
Form.play = playStory;

export const NoFooter = NoFooterTemplate.bind({});
NoFooter.documentation = { title: 'Without footer' };
NoFooter.argTypes = basicArgTypes;
NoFooter.args = { ...basicArgs };
NoFooter.play = playStory;

export const FullScreen = FullScreenTemplate.bind({});
FullScreen.documentation = { title: 'Full screen dialog' };
FullScreen.argTypes = basicArgTypes;
FullScreen.args = { ...basicArgs, 'title-content': undefined };
FullScreen.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={`padding: 2rem; ${isChromatic() ? 'min-height: 100vh' : ''}`}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        events.willOpen,
        events.didOpen,
        events.willClose,
        events.didClose,
        events.backClick,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: '600px',
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-dialog',
};
