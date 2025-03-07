import { html, type TemplateResult } from 'lit';

import '../pearl-chain-leg.js';

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
