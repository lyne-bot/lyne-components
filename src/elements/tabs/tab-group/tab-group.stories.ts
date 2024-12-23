import { withActions } from '@storybook/addon-actions/decorator';
import type { InputType } from '@storybook/types';
import type {
  Meta,
  StoryObj,
  ArgTypes,
  Args,
  Decorator,
  StoryContext,
} from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { html } from 'lit';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import { type SbbTabChangedEventDetails, SbbTabGroupElement } from './tab-group.js';

import '../../link.js';
import '../../title.js';
import '../tab-label.js';
import '../tab.js';
import '../../card.js';

const changeEventHandler = (event: CustomEvent): void => {
  const evDetail = event.detail as SbbTabChangedEventDetails;
  const card = document.getElementById('container')!;
  card.innerHTML = `
    The selected tab has index: ${evDetail.activeIndex} and label "${evDetail.activeTabLabel.textContent}";<br/>
    The previous tab has index: ${evDetail.previousIndex} with label "${evDetail.previousTabLabel?.textContent}"
  `;
};

const firstTabTitle = (label: string, args: Args): TemplateResult => html`
  <sbb-tab-label ${sbbSpread(args)}>${label}</sbb-tab-label>
`;

const tabPanelOne = (): TemplateResult => html`
  <sbb-tab>
    <article>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
      elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
      urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
      turpis in eu mi bibendum neque egestas congue.
      <sbb-title level="5">Content heading</sbb-title>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
      elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
      urna neque viverra justo nec.
    </article>
  </sbb-tab>
`;

const tabPanelTwo = (): TemplateResult => html`
  <sbb-tab>
    <section>
      Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
      elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
      urna neque viverra justo nec.
      <sbb-block-link target="_blank" href="https://www.sbb.ch">Visit sbb.ch</sbb-block-link>
    </section>
  </sbb-tab>
`;

const tabPanelFour = (): TemplateResult => html`
  <sbb-tab>
    Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
    elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
    urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed faucibus
    turpis in eu mi bibendum neque egestas congue.
  </sbb-tab>
`;

// TODO: check whether didChange can be replaced with change
const DefaultTemplate = ({ size, label, ...args }: Args): TemplateResult => html`
  <sbb-card
    id="container"
    color="milk"
    style="margin-block-end: var(--sbb-spacing-fixed-8x)"
  ></sbb-card>
  <sbb-tab-group
    size=${size}
    initial-selected-index="0"
    @didChange=${(e: CustomEvent) => changeEventHandler(e)}
  >
    ${firstTabTitle(label, args)} ${tabPanelOne()}

    <sbb-tab-label>Tab title two</sbb-tab-label>
    ${tabPanelTwo()}

    <sbb-tab-label ?disabled=${true}>Tab title three</sbb-tab-label>
    <sbb-tab>I was disabled.</sbb-tab>

    <sbb-tab-label>Tab title four</sbb-tab-label>
    ${tabPanelFour()}
  </sbb-tab-group>
`;

const IconsAndNumbersTemplate = ({ size, label, ...args }: Args): TemplateResult => html`
  <sbb-tab-group size=${size} initial-selected-index="0">
    ${firstTabTitle(label, args)} ${tabPanelOne()}

    <sbb-tab-label amount=${args.amount} icon-name="swisspass-small"> Tab title two </sbb-tab-label>
    ${tabPanelTwo()}

    <sbb-tab-label ?disabled=${true} amount=${args.amount} icon-name="train-small">
      Tab title three
    </sbb-tab-label>
    <sbb-tab>I was disabled.</sbb-tab>

    <sbb-tab-label amount=${args.amount} icon-name="pie-small"> Tab title four </sbb-tab-label>
    ${tabPanelFour()}
  </sbb-tab-group>
`;

const NestedTemplate = ({ size, label, ...args }: Args): TemplateResult => html`
  <sbb-tab-group size=${size} initial-selected-index="0">
    ${firstTabTitle(label, args)}
    <sbb-tab>
      <sbb-tab-group size=${size} initial-selected-index="1">
        <sbb-tab-label level="2">Nested tab</sbb-tab-label>
        <sbb-tab>
          Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
          elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis
          rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero enim sed
          faucibus turpis in eu mi bibendum neque egestas congue.
        </sbb-tab>

        <sbb-tab-label level="2">Nested tab</sbb-tab-label>
        <sbb-tab>
          Diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod
          elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis
          rhoncus urna.
        </sbb-tab>
      </sbb-tab-group>
    </sbb-tab>

    <sbb-tab-label amount=${args.amount} icon-name="swisspass-small"> Tab title two </sbb-tab-label>
    ${tabPanelTwo()}

    <sbb-tab-label ?disabled=${true} amount=${args.amount} icon-name="train-small">
      Tab title three
    </sbb-tab-label>
    <sbb-tab>I was disabled.</sbb-tab>

    <sbb-tab-label amount=${args.amount} icon-name="pie-small"> Tab title four </sbb-tab-label>
    ${tabPanelFour()}
  </sbb-tab-group>
`;

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Tab1',
  },
};

const iconName: InputType = {
  control: {
    type: 'select',
  },
  options: ['app-icon-small', 'train-small', 'swisspass-small', 'pie-small'],
  table: {
    category: 'Tab1',
  },
};

const amount: InputType = {
  control: {
    type: 'number',
  },
  table: {
    category: 'Tab1',
  },
};

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['s', 'l', 'xl'],
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    disable: true,
  },
};

const basicArgTypes: ArgTypes = {
  label,
  'icon-name': iconName,
  amount: amount,
  size: size,
  negative,
};

const basicArgs: Args = {
  label: 'Tab label one',
  'icon-name': undefined,
  amount: undefined,
  size: size.options![1],
  negative: false,
};

export const defaultTabsSizeL: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs },
};

export const numbersAndIconsSizeL: StoryObj = {
  render: IconsAndNumbersTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: 16, 'icon-name': iconName.options![1] },
};

export const defaultTabsSizeXL: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![2] },
};

export const numbersAndIconsSizeXL: StoryObj = {
  render: IconsAndNumbersTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: 16, 'icon-name': iconName.options![0], size: size.options![2] },
};
export const defaultTabsSizeS: StoryObj = {
  render: DefaultTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, size: size.options![0] },
};

export const numbersAndIconsSizeS: StoryObj = {
  render: IconsAndNumbersTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: 16, 'icon-name': iconName.options![0], size: size.options![0] },
};

export const nestedTabGroups: StoryObj = {
  render: NestedTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: 16, 'icon-name': iconName.options![1] },
};

export const tintedBackground: StoryObj = {
  render: IconsAndNumbersTemplate,
  argTypes: basicArgTypes,
  args: { ...basicArgs, amount: 16, 'icon-name': iconName.options![0], negative: true },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.negative ? 'var(--sbb-color-milk)' : 'var(--sbb-color-white)',
    actions: {
      handles: [SbbTabGroupElement.events.didChange],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-tab/sbb-tab-group',
};

export default meta;
