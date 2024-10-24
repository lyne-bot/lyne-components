import { html, type TemplateResult } from 'lit';

import '../pearl-chain-leg.js';
import { defaultDateAdapter } from '../../core/datetime.js';

import type { SbbDateLike } from '@sbb-esta/lyne-elements/core/interfaces.js';

export const disruptionTemplate: TemplateResult = html`
  <sbb-pearl-chain-leg
    departure="2024-11-30T12:13:00"
    arrival="2024-12-04T12:13:00"
    disruption
  ></sbb-pearl-chain-leg>
`;

export const pastLegTemplate: TemplateResult = html`
  <sbb-pearl-chain-leg
    departure="2024-11-30T12:13:00"
    arrival="2024-12-04T12:13:00"
  ></sbb-pearl-chain-leg>
`;

export const progressLegTemplate: TemplateResult = html`
  <sbb-pearl-chain-leg
    departure="2024-12-04T12:13:00"
    arrival="2024-12-07T12:13:00"
  ></sbb-pearl-chain-leg>
`;

export const futureLegTemplate: TemplateResult = html`
  <sbb-pearl-chain-leg
    departure="2024-12-07T12:13:00"
    arrival="2024-12-11T12:13:00"
  ></sbb-pearl-chain-leg>
`;

export const cancelledLegTemplate = (
  departureSkipped: boolean = false,
  arrivalSkipped: boolean = false,
  disruption: boolean = false,
): TemplateResult => html`
  <sbb-pearl-chain-leg
    departure="2024-12-11T12:13:00"
    arrival="2024-12-15T12:13:00"
    ?departure-skipped=${departureSkipped}
    ?arrival-skipped=${arrivalSkipped}
    ?disruption=${disruption}
  ></sbb-pearl-chain-leg>
`;

export const longFutureLegTemplate: TemplateResult = html`
  <sbb-pearl-chain-leg
    departure="2024-12-14T12:13:00"
    arrival="2024-12-18T12:13:00"
  ></sbb-pearl-chain-leg>
`;

export function removeTimezone(time: SbbDateLike): Date | undefined {
  const parsedDate = defaultDateAdapter.deserialize(time);

  if (parsedDate || !defaultDateAdapter.isValid(parsedDate)) {
    return undefined;
  }

  const isoTime = parsedDate!.toISOString();

  if (isoTime.includes('Z')) {
    return new Date(isoTime.replace('Z', ''));
  }

  if (isoTime.includes('T')) {
    const dateTime = isoTime.split('T');

    if (dateTime[1] && (dateTime[1].includes('+') || dateTime[1].includes('-'))) {
      return new Date(`${dateTime[0]}T${dateTime[1].split(/[+-]/)[0]}`);
    }
  }
  return new Date(isoTime);
}
