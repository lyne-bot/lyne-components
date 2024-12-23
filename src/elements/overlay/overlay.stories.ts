import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { type StyleInfo, styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../storybook/helpers/spread.js';
import sampleImages from '../core/images.js';

import { SbbOverlayElement } from './overlay.js';
import readme from './readme.md?raw';

import '../button.js';
import '../form-field.js';
import '../image.js';
import '../link.js';
import '../title.js';

const expanded: InputType = {
  control: {
    type: 'boolean',
  },
};

const backButton: InputType = {
  control: {
    type: 'boolean',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityCloseLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const accessibilityBackLabel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Accessibility',
  },
};

const basicArgTypes: ArgTypes = {
  expanded,
  'back-button': backButton,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  negative,
  'accessibility-label': accessibilityLabel,
};

const basicArgs: Args = {
  expanded: false,
  'back-button': false,
  accessibilityCloseLabel: 'Close overlay',
  accessibilityBackLabel: 'Go back',
  negative: false,
  'accessibility-label': undefined,
};

const openOverlay = (_event: PointerEvent, id: string): void => {
  const overlay = document.getElementById(id) as SbbOverlayElement;
  overlay.open();
};

const triggerButton = (overlayId: string): TemplateResult => html`
  <sbb-button
    aria-haspopup="dialog"
    aria-controls=${overlayId}
    size="m"
    type="button"
    @click=${(event: PointerEvent) => openOverlay(event, overlayId)}
  >
    Open overlay
  </sbb-button>
`;

const codeStyle: Readonly<StyleInfo> = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const formDetailsStyle: Readonly<StyleInfo> = {
  marginTop: 'var(--sbb-spacing-fixed-4x)',
  padding: 'var(--sbb-spacing-fixed-4x)',
  borderRadius: 'var(--sbb-border-radius-8x)',
  backgroundColor: 'var(--sbb-color-milk)',
};

const formStyle: Readonly<StyleInfo> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--sbb-spacing-fixed-4x)',
};

const textBlockStyle = (negative: boolean): Readonly<StyleInfo> => {
  return {
    position: 'relative',
    marginBlockStart: '1rem',
    padding: '1rem',
    backgroundColor: negative ? 'var(--sbb-color-metal)' : 'var(--sbb-color-cloud)',
    borderRadius: 'var(--sbb-border-radius-4x)',
  };
};

const textBlock = (negative: boolean): TemplateResult => html`
  <div style=${styleMap(textBlockStyle(negative))}>
    J.R.R. Tolkien, the mastermind behind Middle-earth's enchanting world, was born on January 3,
    1892. With "The Hobbit" and "The Lord of the Rings", he pioneered fantasy literature. Tolkien's
    linguistic brilliance and mythic passion converge in a literary legacy that continues to
    transport readers to magical realms.
  </div>
`;

const DefaultTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('my-overlay-2')}
  <sbb-overlay id="my-overlay-2" ${sbbSpread(args)}>
    <div class="overlay-content">
      <sbb-title visual-level="2" ?negative=${args.negative} style="margin-block-start: 0">
        Many Meetings
      </sbb-title>
      Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
      like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
      Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
      elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed
      to Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and
      pierced his heart.
      <sbb-image
        style="margin-block: 1rem"
        image-src=${sampleImages[1]}
        alt="Natural landscape"
      ></sbb-image>
      He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
      of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
      other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
      the Rings: The Fellowship of the Ring, “Many Meetings” ${textBlock(args.negative)}
    </div>
  </sbb-overlay>
`;

const FormTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('my-overlay-3')}
  <div id="returned-value">
    <div style=${styleMap(formDetailsStyle)}>
      <div>Your message: <span id="returned-value-message">Hello 👋</span></div>
      <div>Your favorite animal: <span id="returned-value-animal">Red Panda</span></div>
    </div>
  </div>
  <sbb-overlay
    id="my-overlay-3"
    @willClose=${(event: CustomEvent) => {
      if (event.detail.returnValue) {
        document.getElementById('returned-value-message')!.innerHTML =
          `${event.detail.returnValue.message?.value}`;
        document.getElementById('returned-value-animal')!.innerHTML =
          `${event.detail.returnValue.animal?.value}`;
      }
    }}
    ${sbbSpread(args)}
  >
    <div class="overlay-content">
      <div style="margin-block-end: var(--sbb-spacing-fixed-4x)">
        Submit the form below to close the overlay box using the
        <code style=${styleMap(codeStyle)}>close(result?: any, target?: HTMLElement)</code>
        method and returning the form values to update the details.
      </div>
      <form style=${styleMap(formStyle)} @submit=${(e: SubmitEvent) => e.preventDefault()}>
        <sbb-form-field error-space="none" size="m">
          <label>Message</label>
          <input placeholder="Your custom massage" value="Hello 👋" name="message" />
        </sbb-form-field>
        <sbb-form-field error-space="none" size="m">
          <label>Favorite Animal</label>
          <select name="animal">
            <option>Red Panda</option>
            <option>Cheetah</option>
            <option>Polar Bear</option>
            <option>Elephant</option>
          </select>
        </sbb-form-field>
        <sbb-button type="submit" size="m" sbb-overlay-close> Update details </sbb-button>
      </form>
    </div>
  </sbb-overlay>
`;

const NestedTemplate = (args: Args): TemplateResult => html`
  ${triggerButton('my-overlay-5')}
  <sbb-overlay id="my-overlay-5" ${sbbSpread(args)}>
    <div class="overlay-content">
      Click the button to open a nested overlay.&nbsp;${triggerButton('my-overlay-6')}
    </div>
    <sbb-overlay id="my-overlay-6" ${sbbSpread(args)}>
      <p class="overlay-content">
        Nested overlay content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
    </sbb-overlay>
  </sbb-overlay>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Negative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    negative: true,
  },
};

export const Expanded: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    expanded: true,
  },
};

export const WithBackButton: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    'back-button': true,
  },
};

export const Form: StoryObj = {
  render: FormTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbOverlayElement.events.willOpen,
        SbbOverlayElement.events.didOpen,
        SbbOverlayElement.events.willClose,
        SbbOverlayElement.events.didClose,
        SbbOverlayElement.events.backClick,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-overlay',
};

export default meta;
