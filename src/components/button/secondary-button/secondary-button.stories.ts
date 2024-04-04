import type { Args, ArgTypes, Meta, StoryObj } from '@storybook/web-components';

import {
  buttonDefaultArgs,
  buttonDefaultArgTypes,
  requestSubmit,
} from '../common/button-common-stories';
import {
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
} from '../common/common-stories';

import readme from './readme.md?raw';
import '../../loading-indicator';
import './secondary-button';

const defaultArgTypes: ArgTypes = { ...buttonDefaultArgTypes };

const defaultArgs: Args = {
  ...buttonDefaultArgs,
  tag: 'sbb-secondary-button',
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
export const RequestSubmit: StoryObj = requestSubmit;

export const WithHiddenSlottedIcon: StoryObj = withHiddenSlottedIcon;

const meta: Meta = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  excludeStories: /.*(Active|FocusVisible)$/,
  decorators: commonDecorators,
  parameters: {
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
  title: 'components/sbb-button/sbb-secondary-button',
};

export default meta;
