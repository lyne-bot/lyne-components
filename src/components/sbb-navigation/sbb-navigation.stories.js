import { h } from 'jsx-dom';
import events from './sbb-navigation.events.ts';
import readme from './readme.md';
import isChromatic from 'chromatic/isChromatic';
import { userEvent, within } from '@storybook/testing-library';
import { waitForComponentsReady } from '../../global/helpers/testing/wait-for-components-ready';

// Story interaction executed after the story renders
const playStory = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('navigation').shadowRoot.querySelector('dialog.sbb-navigation')
  );

  const button = canvas.getByTestId('navigation-trigger');
  await userEvent.click(button);
  const actionL = canvas.getByTestId('navigation-section-trigger-1');
  await userEvent.click(actionL);
  const actionS = canvas.getByTestId('navigation-section-trigger-2');
  await userEvent.click(actionS);
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

const disableAnimation = {
  control: {
    type: 'boolean',
  },
};

const basicArgTypes = {
  'accessibility-label': accessibilityLabel,
  'accessibility-close-label': accessibilityCloseLabel,
  'disable-animation': disableAnimation,
};

const basicArgs = {
  'accessibility-label': undefined,
  'accessibility-close-label': undefined,
  'disable-animation': isChromatic(),
};

const triggerButton = (id) => (
  <sbb-button
    data-testid="navigation-trigger"
    id={id}
    variant="secondary"
    size="l"
    icon-name="hamburger-menu-small"
  ></sbb-button>
);

const navigationActionsL = () => [
  <sbb-navigation-action id="nav-1" data-testid="navigation-section-trigger-1">
    Tickets & Offers
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-2">Vacations & Recreation</sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Travel information</sbb-navigation-action>,
  <sbb-navigation-action id="nav-4" href="https://www.sbb.ch/en/">
    Help & Contact
  </sbb-navigation-action>,
];

const navigationActionsS = () => [
  <sbb-navigation-action id="nav-5">Deutsch</sbb-navigation-action>,
  <sbb-navigation-action id="nav-6">Français</sbb-navigation-action>,
  <sbb-navigation-action id="nav-7" data-testid="navigation-section-trigger-2">
    Italiano
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-8">English</sbb-navigation-action>,
];

const navigationList = (label) => [
  <sbb-navigation-list label={label}>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m" href="https://www.sbb.ch/en/">
      Label
    </sbb-navigation-action>
  </sbb-navigation-list>,
];

const actionLabels = (num) => {
  const labels = [
    <sbb-navigation-action data-testid="navigation-section-trigger-2">Label</sbb-navigation-action>,
  ];
  for (let i = 1; i <= num; i++) {
    labels.push(<sbb-navigation-action>Label</sbb-navigation-action>);
  }
  return labels;
};

const onNavigationClose = (dialog) => {
  dialog.addEventListener('didClose', () => {
    document.getElementById('nav-marker').reset();
  });
};

const DefaultTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ref={(dialog) => onNavigationClose(dialog)}
    {...args}
  >
    <sbb-navigation-marker id="nav-marker">{navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{navigationActionsS()}</sbb-navigation-marker>
  </sbb-navigation>,
];

const LongContentTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation data-testid="navigation" id="navigation" trigger="navigation-trigger-1" {...args}>
    <sbb-navigation-marker>{navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{actionLabels(20)}</sbb-navigation-marker>
  </sbb-navigation>,
];

const WithNavigationSectionTemplate = (args) => [
  triggerButton('navigation-trigger-1'),
  <sbb-navigation
    data-testid="navigation"
    id="navigation"
    trigger="navigation-trigger-1"
    ref={(dialog) => onNavigationClose(dialog)}
    {...args}
  >
    <sbb-navigation-marker id="nav-marker">{navigationActionsL()}</sbb-navigation-marker>
    <sbb-navigation-marker size="s">{navigationActionsS()}</sbb-navigation-marker>

    <sbb-navigation-section trigger="nav-1" title-content="Title one">
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}

      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}
      <sbb-button size="m" style="width: fit-content">
        All Tickets & Offers
      </sbb-button>
    </sbb-navigation-section>

    <sbb-navigation-section trigger="nav-2" title-content="Title two">
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}
    </sbb-navigation-section>

    <sbb-navigation-section trigger="nav-3" title-content="Title three">
      {navigationList('Label')}
      {navigationList('Label')}
      {navigationList('Label')}
      <sbb-button
        size="m"
        variant="secondary"
        icon-name="circle-information-small"
        style="width: fit-content"
      >
        Travel Information
      </sbb-button>
    </sbb-navigation-section>
  </sbb-navigation>,
];

export const Default = DefaultTemplate.bind({});
Default.argTypes = basicArgTypes;
Default.args = { ...basicArgs };
Default.play = playStory;

export const LongContent = LongContentTemplate.bind({});
LongContent.argTypes = basicArgTypes;
LongContent.args = { ...basicArgs };
LongContent.play = playStory;

export const WithNavigationSection = WithNavigationSectionTemplate.bind({});
WithNavigationSection.argTypes = basicArgTypes;
WithNavigationSection.args = { ...basicArgs };
WithNavigationSection.play = playStory;

export default {
  decorators: [
    (Story) => (
      <div style={'padding: 2rem'}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    actions: {
      handles: [events.willOpen, events.didOpen, events.didClose, events.willClose],
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
  title: 'components/navigation/sbb-navigation',
};
