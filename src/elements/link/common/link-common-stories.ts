import type { InputType } from '@storybook/types';
import type { Args, ArgTypes, StoryObj } from '@storybook/web-components';
import type { TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { html, unsafeStatic } from 'lit/static-html.js';

import { sbbSpread } from '../../../storybook/helpers/spread.js';

import '../../icon.js';

export const paragraphStyle = (negative: boolean): Record<string, string> => ({
  color: negative ? 'var(--sbb-color-aluminium)' : 'var(--sbb-color-iron)',
});

/* eslint-disable lit/binding-positions, @typescript-eslint/naming-convention */
const Template = ({ tag, text, ...args }: Args): TemplateResult =>
  html`<${unsafeStatic(tag)} ${sbbSpread(args)}>${text}</${unsafeStatic(tag)}>`;

const FixedWidthTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)} style=${styleMap({ width: '200px' })}> ${text} </${unsafeStatic(tag)}>
`;

const IconSlotTemplate = ({
  tag,
  text,
  'icon-name': iconName,
  ...args
}: Args): TemplateResult => html`
  <${unsafeStatic(tag)} ${sbbSpread(args)}>
    ${text}
    <sbb-icon slot="icon" name=${iconName}></sbb-icon>
  </${unsafeStatic(tag)}>
`;

const InlineTemplate = ({ tag, text, ...args }: Args): TemplateResult => html`
  <p style=${styleMap(paragraphStyle(args.negative))} class="sbb-text-m">
    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
    ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
    dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
    sit amet. <${unsafeStatic(tag)} ${sbbSpread(args)}>${text}</${unsafeStatic(tag)}>
  </p>
`;
/* eslint-enable lit/binding-positions, @typescript-eslint/naming-convention */

const text: InputType = {
  control: {
    type: 'text',
  },
};

const negative: InputType = {
  control: {
    type: 'boolean',
  },
};

const disabled: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const disabledInteractive: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Button',
  },
};

const tag: InputType = {
  control: {
    type: 'text',
  },
  table: {
    disable: true,
  },
};

export const linkCommonDefaultArgTypes: ArgTypes = {
  text,
  negative,
  tag,
};

/**
 * NOTE
 * The tag is the tagName of the component to display in stories,
 * so it must be overridden before use.
 */
export const linkCommonDefaultArgs: Args = {
  text: 'Travelcards & tickets',
  negative: false,
  tag: 'TBD',
};

// block-link params

const size: InputType = {
  control: {
    type: 'select',
  },
  options: ['xs', 's', 'm'],
};

const iconName: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Icon',
  },
};

const iconPlacement: InputType = {
  control: {
    type: 'inline-radio',
  },
  options: ['start', 'end'],
  table: {
    category: 'Icon',
  },
};

export const blockLinkCommonDefaultArgTypes: ArgTypes = {
  size,
  'icon-name': iconName,
  'icon-placement': iconPlacement,
};

export const blockLinkCommonDefaultArgs: Args = {
  size: size.options![1],
  'icon-name': undefined,
  'icon-placement': iconPlacement.options![0],
};

// link params

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
    category: 'Link',
  },
};

const target: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const rel: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Link',
  },
};

const download: InputType = {
  control: {
    type: 'boolean',
  },
  table: {
    category: 'Link',
  },
};

const accessibilityLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const linkDefaultArgTypes: ArgTypes = {
  ...linkCommonDefaultArgTypes,
  href,
  target,
  rel,
  download,
  disabled,
  'disabled-interactive': disabledInteractive,
  'accessibility-label': accessibilityLabel,
};

export const linkDefaultArgs: Args = {
  ...linkCommonDefaultArgs,
  href: href.options![1],
  target: '_blank',
  rel: undefined,
  download: false,
  disabled: false,
  'disabled-interactive': false,
  'accessibility-label': undefined,
};

// link-button params

const type: InputType = {
  control: {
    type: 'select',
  },
  options: ['button', 'reset', 'submit'],
  table: {
    category: 'Button',
  },
};

const name: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const value: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const form: InputType = {
  control: {
    type: 'text',
  },
  table: {
    category: 'Button',
  },
};

const ariaLabel: InputType = {
  control: {
    type: 'text',
  },
};

export const linkButtonDefaultArgTypes: ArgTypes = {
  ...linkCommonDefaultArgTypes,
  type,
  disabled,
  'disabled-interactive': disabledInteractive,
  name,
  value,
  form,
  'aria-label': ariaLabel,
};

export const linkButtonDefaultArgs: Args = {
  ...linkCommonDefaultArgs,
  type: type.options![0],
  disabled: false,
  'disabled-interactive': false,
  name: 'Button name',
  value: undefined,
  form: undefined,
  'aria-label': undefined,
};

// Stories

export const blockXS: StoryObj = {
  render: Template,
  args: {
    size: size.options![0],
  },
};

export const blockS: StoryObj = {
  render: Template,
  args: {
    size: size.options![1],
  },
};

export const blockM: StoryObj = {
  render: Template,
  args: {
    size: size.options![2],
  },
};

export const blockXSIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options![0],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options![1],
  },
};

export const blockSIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options![1],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options![1],
  },
};

export const blockMIcon: StoryObj = {
  render: Template,
  args: {
    size: size.options![2],
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options![1],
  },
};

export const blockIconStart: StoryObj = {
  render: Template,
  args: {
    'icon-name': 'chevron-small-left-small',
  },
};

export const blockNegative: StoryObj = {
  render: Template,
  args: {
    negative: true,
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options![1],
  },
};

export const blockWithSlottedIcon: StoryObj = {
  render: IconSlotTemplate,
  args: {
    'icon-name': 'chevron-small-right-small',
    'icon-placement': iconPlacement.options![1],
  },
};

export const blockFixedWidth: StoryObj = {
  render: FixedWidthTemplate,
  args: {
    text: 'A lot of link text to show what happens if there is not enough space.',
    'icon-name': 'chevron-small-left-small',
  },
};

export const inline: StoryObj = {
  render: InlineTemplate,
  args: {
    text: 'Show more',
  },
};

export const inlineNegative: StoryObj = {
  render: InlineTemplate,
  args: {
    text: 'Show more',
    negative: true,
  },
};
