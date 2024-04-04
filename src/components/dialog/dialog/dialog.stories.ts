import { withActions } from '@storybook/addon-actions/decorator';
import { userEvent, within } from '@storybook/test';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import isChromatic from 'chromatic';
import type { TemplateResult } from 'lit';
import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import { waitForStablePosition } from '../../../storybook/testing/wait-for-stable-position';
import { sbbSpread } from '../../core/dom';
import sampleImages from '../../core/images';
import { SbbDialogTitleElement } from '../dialog-title';

import { SbbDialogElement } from './dialog';
import readme from './readme.md?raw';

import '../../button';
import '../../link';
import '../../title';
import '../../form-field';
import '../../image';
import '../../action-group';
import '../dialog-content';
import '../dialog-actions';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }: StoryContext): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('dialog').shadowRoot!.querySelector('.sbb-dialog'),
  );

  await waitForStablePosition(() => canvas.getByTestId('dialog-trigger'));

  const button = canvas.getByTestId('dialog-trigger');
  await userEvent.click(button);
};

const level: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: [1, 2, 3, 4, 5, 6],
  table: {
    category: 'Title',
  },
};

const titleBackButton: InputType = {
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
  options: [false, true, 'zero', 'micro', 'small', 'medium', 'large', 'wide', 'ultra'],
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

const disableAnimation: InputType = {
  control: {
    type: 'boolean',
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
  titleBackButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  negative,
  'accessibility-label': accessibilityLabel,
  'disable-animation': disableAnimation,
  'backdrop-action': backdropAction,
};

const basicArgs: Args = {
  level: level.options[0],
  titleBackButton: true,
  hideOnScroll: hideOnScroll.options[1],
  accessibilityCloseLabel: 'Close dialog',
  accessibilityBackLabel: 'Go back',
  negative: false,
  'accessibility-label': undefined,
  'disable-animation': isChromatic(),
  'backdrop-action': backdropAction.options[0],
};

const openDialog = (_event: PointerEvent, id: string): void => {
  const dialog = document.getElementById(id) as SbbDialogElement;
  dialog.open();
};

const triggerButton = (dialogId: string): TemplateResult => html`
  <sbb-button
    data-testid="dialog-trigger"
    size="m"
    type="button"
    @click=${(event: PointerEvent) => openDialog(event, dialogId)}
  >
    Open dialog
  </sbb-button>
`;

const actionGroup = (negative: boolean): TemplateResult => html`
  <sbb-dialog-actions align-group="stretch" orientation="vertical" horizontal-from="medium">
    <sbb-link
      align-self="start"
      icon-name="chevron-small-left-small"
      href="https://www.sbb.ch/en/"
      ?negative=${negative}
      sbb-dialog-close
    >
      Link
    </sbb-link>
    <sbb-button variant="secondary" sbb-dialog-close> Cancel </sbb-button>
    <sbb-button variant="primary" sbb-dialog-close> Confirm </sbb-button>
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
  backgroundColor: 'var(--sbb-color-milk-default)',
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
  backgroundColor: 'var(--sbb-color-milk-default)',
  border: 'var(--sbb-border-width-1x) solid var(--sbb-color-cloud-default)',
  borderRadius: 'var(--sbb-border-radius-4x)',
};

const dialogHeader = (
  level: number,
  titleBackButton: boolean,
  hideOnScroll: any,
  accessibilityCloseLabel: string,
  accessibilityBackLabel: string,
): TemplateResult => html`
  <sbb-dialog-title
    level=${level}
    ?title-back-button=${titleBackButton}
    hide-on-scroll=${hideOnScroll}
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
  titleBackButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-1')}
  <sbb-dialog data-testid="dialog" id="my-dialog-1" ${sbbSpread(args)}>
    ${dialogHeader(
      level,
      titleBackButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
    )}
    <sbb-dialog-content>
      <p id="dialog-content-1" style=${styleMap({ margin: '0' })}>Dialog content</p>
    </sbb-dialog-content>
    ${actionGroup(args.negative)}
  </sbb-dialog>
`;

const LongContentTemplate = ({
  level,
  titleBackButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-2')}
  <sbb-dialog data-testid="dialog" id="my-dialog-2" ${sbbSpread(args)}>
    ${dialogHeader(
      level,
      titleBackButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
    )}
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
        data-chromatic="ignore"
      ></sbb-image>
      He stood still enchanted, while the sweet syllables of the elvish song fell like clear jewels
      of blended word and melody. 'It is a song to Elbereth,'' said Bilbo. 'They will sing that, and
      other songs of the Blessed Realm, many times tonight. Come on!’ —J.R.R. Tolkien, The Lord of
      the Rings: The Fellowship of the Ring, “Many Meetings” ${textBlock()}
    </sbb-dialog-content>
    ${actionGroup(args.negative)}
  </sbb-dialog>
`;

const FormTemplate = ({
  level,
  titleBackButton,
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
    data-testid="dialog"
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
    ${dialogHeader(
      level,
      titleBackButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
    )}
    <sbb-dialog-content>
      <div style=${styleMap({ 'margin-block-end': 'var(--sbb-spacing-fixed-4x)' })}>
        Submit the form below to close the dialog box using the
        <code style=${styleMap(codeStyle)}>close(result?: any, target?: HTMLElement)</code>
        method and returning the form values to update the details.
      </div>
      <form style=${styleMap(formStyle)} @submit=${(e: SubmitEvent) => e.preventDefault()}>
        <sbb-form-field error-space="none" label="Message" size="m">
          <input placeholder="Your custom massage" value="Hello 👋" name="message" />
        </sbb-form-field>
        <sbb-form-field error-space="none" label="Favorite animal" size="m">
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
  titleBackButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-4')}
  <sbb-dialog data-testid="dialog" id="my-dialog-4" ${sbbSpread(args)}>
    ${dialogHeader(
      level,
      titleBackButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
    )}
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
  titleBackButton,
  hideOnScroll,
  accessibilityCloseLabel,
  accessibilityBackLabel,
  ...args
}: Args): TemplateResult => html`
  ${triggerButton('my-dialog-5')}
  <sbb-dialog data-testid="dialog" id="my-dialog-5" ${sbbSpread(args)}>
    ${dialogHeader(
      level,
      titleBackButton,
      hideOnScroll,
      accessibilityCloseLabel,
      accessibilityBackLabel,
    )}
    <sbb-dialog-content
      >Click the button to open a nested
      dialog.&nbsp;${triggerButton('my-dialog-6')}</sbb-dialog-content
    >
    <sbb-dialog data-testid="nested-dialog" id="my-dialog-6" slot="content" ${sbbSpread(args)}>
      ${dialogHeader(
        level,
        titleBackButton,
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
  play: isChromatic() ? playStory : undefined,
};

export const Negative: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: {
    ...basicArgs,
    negative: true,
  },
  play: isChromatic() ? playStory : undefined,
};

export const AllowBackdropClick: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, 'backdrop-action': backdropAction.options[1] },
  play: isChromatic() ? playStory : undefined,
};

export const LongContent: StoryObj = {
  render: LongContentTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

export const Form: StoryObj = {
  render: FormTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

export const NoFooter: StoryObj = {
  render: NoFooterTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: isChromatic() ? playStory : undefined,
};

const meta: Meta = {
  decorators: [
    (story) => html`
      <div
        style=${styleMap({ padding: '2rem', 'min-height': isChromatic() ? '100vh' : undefined })}
      >
        ${story()}
      </div>
    `,
    withActions as Decorator,
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [
        SbbDialogElement.events.willOpen,
        SbbDialogElement.events.didOpen,
        SbbDialogElement.events.willClose,
        SbbDialogElement.events.didClose,
        SbbDialogTitleElement.events.backClick,
      ],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '600px' },
      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-dialog/sbb-dialog',
};

export default meta;
