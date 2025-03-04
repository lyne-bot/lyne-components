const past2 = '2022-11-30T12:13:00+01:00';
const past = '2022-12-04T12:13:00+01:00';
const future = '2022-12-07T12:11:00+01:00';
const future2 = '2022-12-11T12:13:00+01:00';

const defaultService = {
  quayTypeName: 'platform',
  quayTypeShortName: 'Pl.',
  serviceAlteration: {
    cancelled: false,
    delayText: 'string',
    reachable: true,
    unplannedStopPointsText: '',
  },
};

const busService = { ...defaultService, quayTypeName: 'Stand', quayTypeShortName: 'Stand' };
const cancelledService = { ...defaultService, serviceAlteration: { cancelled: true } };
const delayedService = { ...defaultService, serviceAlteration: { delay: true } };
const isNotReachableService = { ...defaultService, serviceAlteration: { reachable: false } };
const unplannedStopService = {
  ...defaultService,
  serviceAlteration: { unplannedStopPointsText: 'unplannedStop' },
};
const redirectedService = {
  ...defaultService,
  serviceAlteration: { redirectedText: 'Exceptionally no stop' },
};
const departureNotServiced = {
  ...defaultService,
  stopPoints: [{ stopStatus: 'NOT_SERVICED' }, { stopStatus: 'PLANNED' }],
};
const arrivalNotServiced = {
  stopPoints: [{ stopStatus: 'PLANNED' }, { stopStatus: 'NOT_SERVICED' }],
};

export const futureLeg: any = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: defaultService,
};

export const connectionLeg: any = {
  duration: 30,
  id: '3',
  __typename: 'PTConnectionLeg',
  start: {
    __typename: 'StopPlace',
    id: '8722326',
    name: 'Lille-Europe',
  },
  end: {
    __typename: 'StopPlace',
    id: '8798949',
    name: 'Lille-Europe EST',
  },
  notices: [
    {
      name: 'Y',
      text: {
        template: 'Zu Fuss',
        arguments: [],
        __typename: 'LinkedText',
      },
      type: 'ATTRIBUTE',
      priority: 5,
      __typename: 'Notice',
    },
  ],
};

export const extendedLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: {
    ...defaultService,
    notices: [{ name: 'CI', text: { template: "Extended boarding time (45')" } }],
  },
};

export const longFutureLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: defaultService,
};

export const cancelledLeg: any = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: cancelledService,
};

export const progressLeg: any = {
  __typename: 'PTRideLeg',
  arrival: { time: future },
  departure: { time: past },
  serviceJourney: defaultService,
};

export const pastLeg: any = {
  __typename: 'PTRideLeg',
  arrival: { time: past },
  departure: { time: past2 },
  serviceJourney: defaultService,
};

export const defaultBusLeg: any = {
  ...futureLeg,
  serviceJourney: busService,
};

export const pastBusLeg: any = {
  ...pastLeg,
  serviceJourney: busService,
};

export const defaultShipLeg: any = {
  ...futureLeg,
  serviceJourney: {
    ...defaultService,
    quayTypeName: 'Pier',
    quayTypeShortName: 'Pier',
  },
};

export const defaultTramLeg: any = {
  ...futureLeg,
  serviceJourney: {
    ...defaultService,
    quayTypeName: 'Stand',
    quayTypeShortName: 'Stand',
  },
};

export const delayedLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: delayedService,
};

export const notReachableLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: isNotReachableService,
};

export const unplannedStopLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: unplannedStopService,
};

export const redirectedOnDepartureLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: {
    ...departureNotServiced,
    ...redirectedService,
  },
};

export const redirectedOnArrivalLeg = {
  __typename: 'PTRideLeg',
  arrival: { time: future2 },
  departure: { time: future },
  serviceJourney: { ...redirectedService, ...arrivalNotServiced },
};
