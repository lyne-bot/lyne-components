import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { breakpoints } from '../../core/dom/breakpoint.js';
import sampleImages from '../../core/images.js';
import type { SbbTitleLevel } from '../../title.js';
import { SbbDialogTitleElement } from '../dialog-title.js';

import { SbbDialogElement } from './dialog.js';
import readme from './readme.md?raw';

import '../../button.js';
import '../../link.js';
import '../../form-field.js';
import '../../image.js';
import '../../popover.js';
import '../dialog-content.js';
import '../dialog-actions.js';

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Title',
  },
};

const backButton: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Title',
  },
};

const hideOnScroll: InputType = {
  control: {
    type: 'select',
  },
  options: ['Deactivate hide on scroll', ...breakpoints],
  table: {
    category: 'Title',
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

const backdropAction: InputType = {
  control: {
    type: 'select',
  },
  options: ['close', 'none'],
};

const basicArgTypes: ArgTypes = {
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  negative,
  'accessibility-label': accessibilityLabel,
  'backdrop-action': backdropAction,
};

const basicArgs: Args = {
  level: level.options![1],
  backButton: true,
  hideOnScroll: hideOnScroll.options![0],
  accessibilityCloseLabel: 'Close dialog',
  accessibilityBackLabel: 'Go back',
  negative: false,
  'accessibility-label': undefined,
  'backdrop-action': backdropAction.options![0],
};

const openDialog = (_event: PointerEvent, id: string): void => {
  const dialog = document.getElementById(id) as SbbDialogElement;
  dialog.open();
};

const triggerButton = (dialogId: string): TemplateResult => html`
  <sbb-button
    aria-haspopup="dialog"
    aria-controls=${dialogId}
    size="m"
    type="button"
    @click=${(event: PointerEvent) => openDialog(event, dialogId)}
  >
    Open dialog
  </sbb-button>
`;

const dialogActions = (negative: boolean): TemplateResult => html`
  <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="medium">
    <sbb-block-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
      ?negative=${negative}
      sbb-dialog-close
    >
      Link
    </sbb-block-link>
    <sbb-secondary-button sbb-dialog-close> Cancel </sbb-secondary-button>
    <sbb-button sbb-dialog-close> Confirm </sbb-button>
  </sbb-dialog-actions>
`;

const codeStyle: Args = {
  padding: 'var(--sbb-spacing-fixed-1x) var(--sbb-spacing-fixed-2x)',
  borderRadius: 'var(--sbb-border-radius-4x)',
  backgroundColor: 'var(--sbb-color-smoke-alpha-20)',
};

const formDetailsStyle: Args = {
  marginTop: 'var(--sbb-spacing-fixed-4x)',
  padding: 'var(--sbb-spacing-fixed-4x)',
  borderRadius: 'var(--sbb-border-radius-8x)',
  backgroundColor: 'var(--sbb-color-milk)',
};

const formStyle: Args = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 'var(--sbb-spacing-fixed-4x)',
};

const textBlockStyle: Args = {
  position: 'relative',
  marginBlockStart: '1rem',
  padding: '1rem',
  backgroundColor: 'var(--sbb-color-milk)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud)',
  borderRadius: 'var(--sbb-border-radius-4x)',
};

const dialogTitle = (
  level: SbbTitleLevel,
  backButton: boolean,
  hideOnScroll: any,
  accessibilityCloseLabel: string,
  accessibilityBackLabel: string,
): TemplateResult => html`
  <sbb-dialog-title
    level=${level}
    ?back-button=${backButton}
    hide-on-scroll=${hideOnScroll === 'Deactivate hide on scroll' ? nothing : hideOnScroll}
    accessibility-close-label=${accessibilityCloseLabel}
    accessibility-back-label=${accessibilityBackLabel}
    >A describing title of the dialog</sbb-dialog-title
  >
`;

const textBlock = (): TemplateResult => html`
  <div style=${styleMap(textBlockStyle)}>
    J.R.R. Tolkien, the mastermind behind Middle-earth's enchanting world, was born on January 3,
    1892. With "The Hobbit" and "The Lord of the Rings", he pioneered fantasy literature. Tolkien's
    linguistic brilliance and mythic passion converge in a literary legacy that continues to
    transport readers to magical realms.
  </div>
`;

const DefaultTemplate = ({
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-1')}
  <sbb-dialog id="my-dialog-1" ${sbbSpread(args)}>
    ${dialogTitle(level, backButton, hideOnScroll, accessibilityCloseLabel, accessibilityBackLabel)}
    <sbb-dialog-content>
      <p
        id="dialog-content-1"
        style=${styleMap({
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sbb-spacing-fixed-1x)',
          margin: '0',
        })}
      >
        Dialog content
        <sbb-popover-trigger id="popover-trigger"></sbb-popover-trigger>
      </p>
      <sbb-popover trigger="popover-trigger">
        <p style="margin: 0" class="sbb-text-s">Some content.</p>
      </sbb-popover>
    </sbb-dialog-content>
    ${dialogActions(args.negative)}
  </sbb-dialog>
`;

const LongContentTemplate = ({
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-2')}
  <sbb-dialog id="my-dialog-2" ${sbbSpread(args)}>
    ${dialogTitle(level, backButton, hideOnScroll, accessibilityCloseLabel, accessibilityBackLabel)}
    <sbb-dialog-content>
      Frodo halted for a moment, looking back. Elrond was in his chair and the fire was on his face
      like summer-light upon the trees. Near him sat the Lady Arwen. To his surprise Frodo saw that
      Aragorn stood beside her; his dark cloak was thrown back, and he seemed to be clad in
      elven-mail, and a star shone on his breast. They spoke together, and then suddenly it seemed
      to Frodo that Arwen turned towards him, and the light of her eyes fell on him from afar and
      pierced his heart.
      <sbb-image
        style=${styleMap({ 'margin-block': '1rem' })}
        image-src=${sampleImages[1]}
        alt="Natural landscape"
      ></sbb-image>
      He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
      of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
      other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
      the Rings: The Fellowship of the Ring, “Many Meetings” ${textBlock()}
    </sbb-dialog-content>
    ${dialogActions(args.negative)}
  </sbb-dialog>
`;

const FormTemplate = ({
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-3')}
  <div id="returned-value">
    <div style=${styleMap(formDetailsStyle)}>
      <div>Your message: <span id="returned-value-message">Hello 👋</span></div>
      <div>Your favorite animal: <span id="returned-value-animal">Red Panda</span></div>
    </div>
  </div>
  <sbb-dialog
    id="my-dialog-3"
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
    ${dialogTitle(level, backButton, hideOnScroll, accessibilityCloseLabel, accessibilityBackLabel)}
    <sbb-dialog-content>
      <div style=${styleMap({ 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' })}>
        Submit the form below to close the dialog box using the
        <code style=${styleMap(codeStyle)}>close(result?: any, target?: HTMLElement)</code>
        method and returning the form values to update the details.
      </div>
      <form style=${styleMap(formStyle)} @submit=${(e: SubmitEvent) => e.preventDefault()}>
        <sbb-form-field error-space="none" size="m">
          <label>Message</label>
          <input placeholder="Your custom massage" value="Hello 👋" name="message" />
        </sbb-form-field>
        <sbb-form-field error-space="none" size="m">
          <label>Favorite animal</label>
          <select name="animal">
            <option>Red Panda</option>
            <option>Cheetah</option>
            <option>Polar Bear</option>
            <option>Elephant</option>
          </select>
        </sbb-form-field>
        <sbb-button type="submit" size="m" sbb-dialog-close> Update details </sbb-button>
      </form>
    </sbb-dialog-content>
  </sbb-dialog>
`;

const NoFooterTemplate = ({
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-4')}
  <sbb-dialog id="my-dialog-4" ${sbbSpread(args)}>
    ${dialogTitle(level, backButton, hideOnScroll, accessibilityCloseLabel, accessibilityBackLabel)}
    <sbb-dialog-content>
      <p id="dialog-content-5" style=${styleMap({ margin: '0' })}>
        “What really knocks me out is a book that, when you're all done reading it, you wish the
        author that wrote it was a terrific friend of yours and you could call him up on the phone
        whenever you felt like it. That doesn't happen much, though.” ― J.D. Salinger, The Catcher
        in the Rye
      </p>
    </sbb-dialog-content>
  </sbb-dialog>
`;

const NestedTemplate = ({
  level,
  backButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-5')}
  <sbb-dialog id="my-dialog-5" ${sbbSpread(args)}>
    ${dialogTitle(level, backButton, hideOnScroll, accessibilityCloseLabel, accessibilityBackLabel)}
    <sbb-dialog-content
      >Click the button to open a nested
      dialog.&nbsp;${triggerButton('my-dialog-6')}</sbb-dialog-content
    >
    <sbb-dialog id="my-dialog-6" ${sbbSpread(args)}>
      ${dialogTitle(
        level,
        backButton,
        hideOnScroll,
        accessibilityCloseLabel,
        accessibilityBackLabel,
      )}
      <sbb-dialog-content
        >Nested dialog content. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.</sbb-dialog-content
      >
    </sbb-dialog>
  </sbb-dialog>
`;

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: basicArgs,
};

export const Negative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    negative: true,
  },
};

export const AllowBackdropClick: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'backdrop-action': backdropAction.options![1] },
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const HiddenTitle: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, hideOnScroll: hideOnScroll.options![7] },
};

export const Form: StoryObj = {
  render: FormTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const NoBackButton: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    backButton: false,
    accessibilityBackLabel: undefined,
  },
};

export const NoFooter: StoryObj = {
  render: NoFooterTemplate,
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
        SbbDialogElement.events.willOpen,
        SbbDialogElement.events.didOpen,
        SbbDialogElement.events.willClose,
        SbbDialogElement.events.didClose,
        SbbDialogTitleElement.events.backClick,
      ],
    },
    docs: {
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-dialog/sbb-dialog',
};

export default meta;
