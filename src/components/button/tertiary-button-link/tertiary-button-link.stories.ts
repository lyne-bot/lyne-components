import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import {
  buttonLinkDefaultArgs,
  buttonLinkDefaultArgTypes,
} from '../common/button-link-common-stories.js';
import {
  backgroundColor,
  commonDecorators,
  fixedWidth,
  iconOnly,
  iconOnlyDisabled,
  iconOnlyNegative,
  loadingIndicator,
  noIcon,
  primary,
  primaryActive,
  primaryDisabled,
  primaryFocusVisible,
  primaryNegative,
  primaryNegativeActive,
  primaryNegativeDisabled,
  sizeM,
  sizeS,
  withHiddenSlottedIcon,
  withSlottedIcon,
} from '../common/common-stories.js';

import readme from './readme.md?raw';
import '../../loading-indicator.js';
import './tertiary-button-link.js';

const defaultArgTypes: ArgTypes = { ...buttonLinkDefaultArgTypes };

const defaultArgs: Args = {
  ...buttonLinkDefaultArgs,
  tag: 'sbb-tertiary-button-link',
};

export const Default: StoryObj = primary;
export const Negative: StoryObj = primaryNegative;
export const Disabled: StoryObj = primaryDisabled;
export const NegativeDisabled: StoryObj = primaryNegativeDisabled;
export const IconOnly: StoryObj = iconOnly;
export const IconOnlyNegative: StoryObj = iconOnlyNegative;
export const IconOnlyDisabled: StoryObj = iconOnlyDisabled;
export const NoIcon: StoryObj = noIcon;
export const SizeM: StoryObj = sizeM;
export const SizeS: StoryObj = sizeS;
export const FixedWidth: StoryObj = fixedWidth;
export const WithSlottedIcon: StoryObj = withSlottedIcon;
export const Active: StoryObj = primaryActive;
export const NegativeActive: StoryObj = primaryNegativeActive;
export const FocusVisible: StoryObj = primaryFocusVisible;
export const LoadingIndicator: StoryObj = loadingIndicator;
export const WithHiddenSlottedIcon: StoryObj = withHiddenSlottedIcon;

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  excludeStories: /.*(Active|FocusVisible)$/,
  decorators: commonDecorators,
  parameters: {
    backgroundColor,
    actions: {
      handles: ['click'],
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'components/sbb-button/sbb-tertiary-button-link',
};

export default meta;
