/** @jsx h */
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import type { InputType } from '@storybook/types';
import type { Meta, StoryObj, ArgTypes, Args } from '@storybook/web-components';
import isChromatic from 'chromatic';
import { Fragment, h, type JSX } from 'jsx-dom';

import { waitForComponentsReady } from '../../../storybook/testing/wait-for-components-ready';
import '../navigation-list';
import '../navigation-action';
import type { SbbNavigationMarker } from '../navigation-marker';
import '../navigation-marker';
import '.';
import '../navigation';
import '../../button';

import readme from './readme.md?raw';

// Story interaction executed after the story renders
const playStory = async (trigger, canvasElement): Promise<void> => {
  const canvas = within(canvasElement);

  await waitForComponentsReady(() =>
    canvas.getByTestId('navigation').shadowRoot.querySelector('.sbb-navigation'),
  );

  const button = canvas.getByTestId('navigation-trigger');
  await userEvent.click(button);
  await waitFor(() =>
    expect(canvas.getByTestId('navigation').getAttribute('data-state') === 'opened').toBeTruthy(),
  );
  await waitFor(() =>
    expect(
      canvas.getByTestId('navigation-section').shadowRoot.querySelector('.sbb-navigation-section'),
    ).toBeTruthy(),
  );
  const action = canvas.getByTestId(trigger);
  await userEvent.click(action);
};

const accessibilityLabel: InputType = {
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

const basicArgTypes: ArgTypes = {
  'accessibility-label': accessibilityLabel,
  'disable-animation': disableAnimation,
};

const basicArgs: Args = {
  'accessibility-label': undefined,
  'disable-animation': isChromatic(),
};

const triggerButton = (id): JSX.Element => (
  <sbb-button
    data-testid="navigation-trigger"
    id={id}
    variant="secondary"
    size="l"
    icon-name="hamburger-menu-small"
  ></sbb-button>
);

const navigationActionsL = (): JSX.Element[] => [
  <sbb-navigation-action id="nav-1" data-testid="navigation-section-trigger-1">
    Label
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-2" data-testid="navigation-section-trigger-2">
    Label
  </sbb-navigation-action>,
  <sbb-navigation-action id="nav-3">Label</sbb-navigation-action>,
];

const navigationList = (label): JSX.Element[] => [
  <sbb-navigation-list label={label}>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m">Label</sbb-navigation-action>
    <sbb-navigation-action size="m" href="https://www.sbb.ch/en/">
      Label
    </sbb-navigation-action>
  </sbb-navigation-list>,
];

const onNavigationClose = (dialog): void => {
  dialog.addEventListener('didClose', () => {
    (document.getElementById('nav-marker') as SbbNavigationMarker).reset();
  });
};

const DefaultTemplate = (args): JSX.Element => (
  <Fragment>
    {triggerButton('navigation-trigger-1')}
    <sbb-navigation
      data-testid="navigation"
      id="navigation"
      trigger="navigation-trigger-1"
      disable-animation={args['disable-animation']}
      ref={(dialog) => onNavigationClose(dialog)}
    >
      <sbb-navigation-marker id="nav-marker">{navigationActionsL()}</sbb-navigation-marker>

      <sbb-navigation-section
        title-content="Title one"
        data-testid="navigation-section"
        id="navigation-section"
        trigger="nav-1"
        {...args}
      >
        {navigationList('Label')}
        {navigationList('Label')}
        {navigationList('Label')}

        <sbb-button size="m" style={{ width: 'fit-content' }}>
          Button
        </sbb-button>
      </sbb-navigation-section>

      <sbb-navigation-section
        title-content="Title two"
        id="navigation-section"
        trigger="nav-2"
        {...args}
      >
        {navigationList('Label')}
        {navigationList('Label')}
        {navigationList('Label')}

        {navigationList('Label')}
        {navigationList('Label')}
        {navigationList('Label')}

        {navigationList('Label')}
        {navigationList('Label')}

        <sbb-button
          size="m"
          variant="secondary"
          style={{ width: 'fit-content' }}
          sbb-navigation-close
        >
          Close navigation
        </sbb-button>
      </sbb-navigation-section>
    </sbb-navigation>
  </Fragment>
);

export const Default: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: ({ canvasElement }) =>
    isChromatic() && playStory('navigation-section-trigger-1', canvasElement),
};

export const LongContent: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
  play: ({ canvasElement }) =>
    isChromatic() && playStory('navigation-section-trigger-2', canvasElement),
};

const meta: Meta = {
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', height: '100vh' }}>
        <Story></Story>
      </div>
    ),
  ],
  parameters: {
    chromatic: { disableSnapshot: false },
    backgrounds: {
      disable: true,
    },
    docs: {
      story: { inline: false, iframeHeight: '600px' },

      extractComponentDescription: () => readme,
    },
    layout: 'fullscreen',
  },
  title: 'components/sbb-navigation/sbb-navigation-section',
};

export default meta;
