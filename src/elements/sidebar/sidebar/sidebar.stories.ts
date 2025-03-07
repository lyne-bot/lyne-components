import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html, nothing, type TemplateResult } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import type { SbbIconSidebarElement } from '../../sidebar.js';
import { SbbSidebarElement } from '../sidebar.js';

import readme from './readme.md?raw';

import '../../chip-label.js';
import '../../header.js';
import '../../link/block-link.js';
import '../../link-list.js';
import '../../logo.js';
import '../../sidebar.js';
import '../../title.js';

const position: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk'],
};

const mode: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['side', 'over'],
};

const opened: InputType = {
  control: {
    type: 'boolean',
  },
};

const showTitle: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Sidebar Content',
  },
};

const showCloseButton: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Sidebar Content',
  },
};

const defaultArgTypes: ArgTypes = {
  position,
  color,
  opened,
  mode,
  showTitle,
  showCloseButton,
};

const defaultArgs: Args = {
  position: 'start',
  color: 'white',
  opened: true,
  mode: 'side',
  showTitle: true,
  showCloseButton: true,
};

const header = (twoButtons = false): TemplateResult =>
  html`<sbb-header expanded scroll-origin="content" size="s">
    <sbb-header-button
      id="toggle-button-1"
      icon-name="arrows-right-left-small"
      @click=${(event: PointerEvent) =>
        (event.currentTarget as HTMLElement)?.parentElement?.parentElement
          ?.querySelector<SbbSidebarElement>('#sidebar-1')
          ?.toggle()}
      aria-controls="sidebar-1"
      aria-expanded="true"
    >
      Toggle sidebar
    </sbb-header-button>
    ${twoButtons
      ? html`<sbb-header-button
          id="toggle-button-2"
          icon-name="arrows-right-left-small"
          @click=${(event: PointerEvent) =>
            (event.currentTarget as HTMLElement)?.parentElement?.parentElement
              ?.querySelector<SbbSidebarElement>('#sidebar-2')
              ?.toggle()}
          aria-controls="sidebar-2"
          aria-expanded="true"
        >
          Toggle end sidebar
        </sbb-header-button>`
      : nothing}
    <div style="flex-grow: 1"></div>
    <a aria-label="Homepage" href="/" class="sbb-header-logo">
      <sbb-logo protective-room="none"></sbb-logo>
    </a>
  </sbb-header>`;

const iconSidebar = (color: SbbIconSidebarElement['color']): TemplateResult =>
  html`<!-- We take the contrary color to visually distinguish the icon sidebar and the sidebar -->
    <sbb-icon-sidebar color=${color === 'milk' ? 'white' : 'milk'}>
      <sbb-icon-sidebar-link
        accessibility-label="Go to the party"
        icon-name="glass-cocktail-small"
        href="#"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-link
        accessibility-label="Be a unicorn"
        icon-name="unicorn-small"
        href="#"
        class="sbb-active"
        accessibility-current="page"
      ></sbb-icon-sidebar-link>
      <sbb-icon-sidebar-button
        aria-label="Be happy"
        icon-name="face-grinning-small"
      ></sbb-icon-sidebar-button>
    </sbb-icon-sidebar>`;

const sidebar = (
  { showTitle, showCloseButton, ...args }: Args,
  sidebarId = 'sidebar-1',
  toggleButtonId = 'toggle-button-1',
): TemplateResult =>
  html`<sbb-sidebar
    ${sbbSpread(args)}
    id=${sidebarId}
    role="navigation"
    @didOpen=${(event: CustomEvent) =>
      (event.currentTarget as HTMLElement)
        .closest('sbb-header + :is(sbb-sidebar-container, sbb-icon-sidebar-container)')
        ?.parentElement?.querySelector(`#${toggleButtonId}`)
        ?.setAttribute('aria-expanded', 'true')}
    @didClose=${(event: CustomEvent) =>
      (event.currentTarget as HTMLElement)
        .closest('sbb-header + :is(sbb-sidebar-container, sbb-icon-sidebar-container)')
        ?.parentElement?.querySelector(`#${toggleButtonId}`)
        ?.setAttribute('aria-expanded', 'false')}
  >
    ${showTitle ? html`<sbb-sidebar-title>Be a unicorn</sbb-sidebar-title>` : nothing}
    ${showCloseButton ? html`<sbb-sidebar-close-button></sbb-sidebar-close-button>` : nothing}

    <sbb-link-list>
      <sbb-block-link href="#">10 Steps to Becoming a Unicorn</sbb-block-link>
      <sbb-block-link href="#">
        Unicorn Mindset: How to Stand Out in a Crowded Market
      </sbb-block-link>
      <sbb-block-link href="#">Be Unique, Be a Unicorn</sbb-block-link>
      <sbb-block-link href="#" class="sbb-active" accessibility-current="page">
        Unicorn Success Stories
      </sbb-block-link>
      <sbb-block-link href="#">The Unicorn's Guide to Creativity</sbb-block-link>
      <sbb-block-link href="#">
        From Ordinary to Extraordinary: Your Unicorn Journey
      </sbb-block-link>
      <sbb-block-link href="#">The Power of Being a Unicorn in Business</sbb-block-link>
      <sbb-block-link href="#">Unicorn Leadership: Leading with Magic</sbb-block-link>
    </sbb-link-list>
  </sbb-sidebar>`;

const content = html`
  <sbb-title level="1" visual-level="2">Unicorn Success Stories</sbb-title>

  <sbb-chip-label color="charcoal">AI generated</sbb-chip-label>
  <p>
    In the enchanting world of fantasy, unicorns are legendary creatures known for their grace,
    purity, and magical abilities. These mystical beings have inspired countless tales of bravery
    and wonder. Here, we delve into some captivating unicorn success stories that continue to
    enchant and inspire, each with a touch of public transport magic.
  </p>

  <sbb-title level="2" visual-level="3">Luna, the Moonlight Unicorn</sbb-title>
  <p>
    One of the most famous unicorns is <strong>Luna</strong>, the Moonlight Unicorn. Born under a
    rare celestial event in the serene forests near <strong>Zurich</strong>, Luna harnessed the
    power of the moon to bring light and hope to the darkest corners of the realm. Her luminous horn
    could heal wounds and purify water, making her a beloved guardian among the creatures of the
    forest. Luna also used her magic to illuminate the paths of night trains, ensuring safe journeys
    for all passengers traveling through the region.
  </p>

  <sbb-title level="2" visual-level="3">
    Aurelius, the Golden Unicorn of the Bernese Alps
  </sbb-title>
  <p>
    Another legendary unicorn is <strong>Aurelius</strong>, the Golden Unicorn of the
    <strong>Bernese Alps</strong>. Known for his shimmering golden coat and unparalleled strength,
    Aurelius led the charge against the malevolent Shadow Beasts. His bravery and determination
    restored harmony to the land, making him a symbol of courage and unity. Aurelius also played a
    crucial role in guiding mountain trains through the rugged terrain, helping travelers reach
    their destinations safely and efficiently.
  </p>

  <sbb-title level="2" visual-level="3">
    Seraphina, the Unicorn of the Lucerne Enchanted Glade
  </sbb-title>
  <p>
    <strong>Seraphina</strong>, the Unicorn of the <strong>Lucerne Enchanted Glade</strong>,
    possessed the rare gift of communication with all living beings. When a fierce drought struck
    the glade, Seraphina rallied the creatures of the forest to discover a hidden underground river,
    saving their home. Her wisdom and empathy made her a revered peacemaker. Seraphina also
    enchanted the local tram system, ensuring smooth and harmonious rides for all commuters
    navigating the picturesque city of Lucerne.
  </p>

  <sbb-title level="2" visual-level="3">Nerida, the Sea Unicorn</sbb-title>
  <p>
    In the waters of <strong>Lake Geneva</strong>, <strong>Nerida</strong>, the Sea Unicorn, used
    her magic to calm raging storms and protect the coastal villages from devastation. Her deep
    connection with the lake and its surroundings made her a guardian of the marine world and a
    symbol of nature's beauty and power. Nerida also enchanted the ferries that crossed Lake Geneva,
    ensuring safe and pleasant voyages for all passengers traveling between the lakeside towns.
  </p>

  <sbb-title level="2" visual-level="3">Orion, the Railway Unicorn</sbb-title>
  <p>
    Lastly, in the bustling city of <strong>Geneva</strong>, <strong>Orion</strong>, the Railway
    Unicorn, played a pivotal role in connecting distant Swiss cities. With his magical horn, Orion
    could guide trains safely through treacherous terrains and ensure timely arrivals. His
    dedication to bringing people together and fostering commerce made him a beloved figure in
    Switzerland's history. Orion's influence extended to the entire railway network, making it one
    of the most reliable and efficient in the world.
  </p>

  <p>
    These unicorn success stories, filled with magic, bravery, and wisdom, remind us that even in
    the realm of fantasy, the qualities of kindness, courage, and cooperation can lead to
    extraordinary achievements. As we celebrate these legendary unicorns, we are inspired to believe
    in the magic within ourselves and the possibility of creating our own success stories.
  </p>
`;

const Template = (args: Args): TemplateResult =>
  html`${header()}
    <sbb-sidebar-container>
      ${args.position === 'start' ? sidebar(args) : nothing}
      <sbb-sidebar-content id="content" role="main" style="padding: var(--sbb-spacing-fixed-4x)">
        ${content}
      </sbb-sidebar-content>
      ${args.position === 'end' ? sidebar(args) : nothing}
    </sbb-sidebar-container>`;

const NestedTemplate = (args: Args): TemplateResult =>
  html`${header()}
    <sbb-icon-sidebar-container>
      ${args.position === 'start' ? iconSidebar(args.color) : nothing}
      <sbb-icon-sidebar-content>
        <sbb-sidebar-container>
          ${args.position === 'start' ? sidebar(args) : nothing}
          <sbb-sidebar-content
            id="content"
            style="padding: var(--sbb-spacing-fixed-4x)"
            role="main"
          >
            ${content}
          </sbb-sidebar-content>
          ${args.position === 'end' ? sidebar(args) : nothing}
        </sbb-sidebar-container>
      </sbb-icon-sidebar-content>
      ${args.position === 'end' ? iconSidebar(args.color) : nothing}
    </sbb-icon-sidebar-container>`;

const TwoSidebarsTemplate = ({ position: _position, ...args }: Args): TemplateResult =>
  html`${header(true)}
    <sbb-sidebar-container>
      ${sidebar({ position: 'start', ...args })}
      <sbb-sidebar-content id="content" role="main" style="padding: var(--sbb-spacing-fixed-4x)">
        ${content}
      </sbb-sidebar-content>
      ${sidebar({ position: 'end', ...args }, 'sidebar-2', 'toggle-button-2')}
    </sbb-sidebar-container>`;

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const Milk: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: 'milk' },
};

export const MilkEnd: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, color: 'milk', position: 'end' },
};

export const Over: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mode: 'over' },
};

export const Nested: StoryObj = {
  render: NestedTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs },
};

export const NestedOver: StoryObj = {
  render: NestedTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, mode: 'over' },
};

export const NestedEnd: StoryObj = {
  render: NestedTemplate,
  argTypes: defaultArgTypes,
  args: { ...defaultArgs, position: 'end' },
};

export const TwoSidebars: StoryObj = {
  render: TwoSidebarsTemplate,
  argTypes: Object.fromEntries(
    Object.entries(defaultArgTypes).filter((entry) => entry[0] !== 'position'),
  ),
  args: {
    ...Object.fromEntries(Object.entries(defaultArgs).filter((entry) => entry[0] !== 'position')),
    color: 'milk',
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [
        SbbSidebarElement.events.willOpen,
        SbbSidebarElement.events.didOpen,
        SbbSidebarElement.events.willClose,
        SbbSidebarElement.events.didClose,
      ],
    },
    docs: {
      extractComponentDescription: () => readme,
      // Setting the iFrame height ensures that the story has enough space when used in the docs section.
      story: { inline: false, iframeHeight: '500px' },
    },
  },
  title: 'elements/sbb-sidebar/sbb-sidebar',
};

export default meta;
