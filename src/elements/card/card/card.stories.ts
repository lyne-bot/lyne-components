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
import { styleMap } from 'lit/directives/style-map.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import readme from './readme.md?raw';
import './card.js';
import '../card-badge.js';
import '../card-button.js';
import '../card-link.js';
import '../../title.js';

const ContentText = (): TemplateResult => html`
  <span class="sbb-text-m">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor blandit odio, ut
    blandit libero cursus vel. Nunc eu congue mauris. Quisque sed facilisis leo. Curabitur
    malesuada, nibh ac blandit vehicula, urna sem scelerisque magna, sed tincidunt neque arcu ac
    justo.
  </span>
`;

const Content = (): TemplateResult => html`
  <sbb-title level="4">Example text</sbb-title>
  ${ContentText()}
`;

const Template = ({ size, color }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}> ${Content()} </sbb-card>
`;

const TemplateWithBadge = ({ size, color }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateAction = ({ label, ...args }: Args): TemplateResult => {
  if (args.href) {
    ['type', 'form', 'value', 'name'].forEach((k) => delete args[k]);
    return html`<sbb-card-link ${sbbSpread(args)}>${label}</sbb-card-link>`;
  } else {
    ['href', 'target', 'rel', 'download'].forEach((k) => delete args[k]);
    return html`<sbb-card-button ${sbbSpread(args)}>${label}</sbb-card-button>`;
  }
};

const TemplateCardAction = ({ size, color, label, ...args }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    ${TemplateAction({ label, ...args })} ${Content()}
  </sbb-card>
`;

const TemplateCardActionWithBadge = ({ size, color, label, ...args }: Args): TemplateResult => html`
  <sbb-card ${sbbSpread({ size, color })}>
    ${TemplateAction({ label, ...args })}
    <sbb-card-badge>
      <span>%</span>
      <span>from CHF</span>
      <span>19.99</span>
    </sbb-card-badge>
    ${Content()}
  </sbb-card>
`;

const TemplateCardActionMultipleCards = (args: Args): TemplateResult => html`
  <div style=${styleMap({ display: 'flex', gap: '1rem' })}>
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge({ ...args, active: true })}
    ${TemplateCardActionWithBadge(args)} ${TemplateCardActionWithBadge(args)}
  </div>
`;

const size: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
};

const color: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['white', 'milk', 'transparent-bordered', 'transparent-bordered-dashed'],
};

const active: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action',
  },
};

const label: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action',
  },
};

const hrefs = ['https://www.sbb.ch', 'https://github.com/sbb-design-systems/lyne-components'];
const href: InputType = {
  options: Object.keys(hrefs),
  mapping: hrefs,
  control: {
    type: 'select',
    labels: {
      0: 'sbb.ch',
      1: 'GitHub Lyne Components',
    },
  },
  table: {
    category: 'Card Action Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Card Action Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Link',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Card Action Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Card Action Button',
  },
};

const defaultArgTypes: ArgTypes = {
  size,
  color,
};

const defaultArgTypesButton: ArgTypes = {
  ...defaultArgTypes,
  active,
  label,
  name,
  type,
  form,
  value,
};

const defaultArgTypesLink: ArgTypes = {
  ...defaultArgTypes,
  active,
  label,
  href,
  download,
  target,
  rel,
};

const defaultArgs: Args = {
  size: 'm',
  color: color.options![0],
};

const defaultArgsLink = {
  ...defaultArgs,
  active: false,
  label: 'Click this card to follow the action.',
  href: href.options![1],
  download: false,
  target: '_blank',
  rel: undefined,
  name: undefined,
  type: undefined,
  form: undefined,
  value: undefined,
};

const defaultArgsButton = {
  ...defaultArgsLink,
  href: undefined,
  download: undefined,
  target: undefined,
  rel: undefined,
  name: 'Button name',
  type: type.options![0],
  form: 'form-name',
  value: 'Value',
};

export const Default: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

export const WithBadge: StoryObj = {
  render: TemplateWithBadge,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
    size: size.options![2],
  },
};

export const Link: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesLink,
  args: { ...defaultArgsLink },
};

export const Button: StoryObj = {
  render: TemplateCardAction,
  argTypes: defaultArgTypesButton,
  args: { ...defaultArgsButton },
};

export const Multiple: StoryObj = {
  render: TemplateCardActionMultipleCards,
  argTypes: defaultArgTypesLink,
  args: { ...defaultArgsLink },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    backgroundColor: (context: StoryContext) =>
      context.args.color === 'milk' ? 'var(--sbb-color-white)' : 'var(--sbb-color-milk)',
    actions: {
      handles: ['click'],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'elements/sbb-card/sbb-card',
};

export default meta;
