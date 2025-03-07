import { withActions } from '@storybook/addon-actions/decorator';
import type { Args, Decorator, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import type { TemplateResult } from 'lit';
import type { ArgTypes, InputType } from 'storybook/internal/types';

import { sbbSpread } from '../../../storybook/helpers/spread.js';
import { mapRawDataToSeatReservation } from '../common.js';

import readme from './readme.md?raw';
import { SbbSeatReservationNavigationElement } from './seat-reservation-navigation.js';

const seatReservationType: InputType = {
  control: { type: 'object' },
  description: 'Seat reservation Object',
  table: {
    disable: false,
  },
};

const selectedCoachIndex: InputType = {
  control: 'number',
  description: 'pre-selected coach index',
};

const defaultArgTypes: ArgTypes = {
  seatReservation: seatReservationType,
  selectedCoachIndex: selectedCoachIndex,
};

const mapedSeatReservation = mapRawDataToSeatReservation('TRAIN');
const defaultArgs: Args = {
  seatReservation: mapedSeatReservation,
};

const Template = ({ seatReservation, ...args }: Args): TemplateResult =>
  html`<sbb-seat-reservation-navigation
    .seatReservation=${seatReservation}
    ${sbbSpread(args)}
  ></sbb-seat-reservation-navigation>`;

export const Navigation: StoryObj = {
  render: Template,
  argTypes: defaultArgTypes,
  args: {
    ...defaultArgs,
  },
};

const meta: Meta = {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [SbbSeatReservationNavigationElement.events.selectCoach],
    },
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  title: 'experimental/sbb-seat-reservation/sbb-seat-reservation-navigation',
};

export default meta;
