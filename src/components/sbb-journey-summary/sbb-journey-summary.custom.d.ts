import {
  PtRideLeg,
  ScheduledStopPointDetail,
} from '../../global/interfaces/pearl-chain-properties';

declare interface SummaryConfig {
  legs: PtRideLeg[];
  vias?: string[];
  origin: string;
  destination: string;
  arrivalWalk: number;
  departure: ScheduledStopPointDetail;
  arrival: ScheduledStopPointDetail;
  departureWalk: number;
  duration: number;
}

export interface InterfaceJourneySummaryAttributes {
  config: SummaryConfig;
}
