import type { ITripItem } from '../core/timetable.js';
import {
  cancelledLeg,
  connectionLeg,
  defaultBusLeg,
  defaultShipLeg,
  defaultTramLeg,
  extendedLeg,
  futureLeg,
  longFutureLeg,
  pastBusLeg,
  pastLeg,
  progressLeg,
  redirectedOnArrivalLeg,
  redirectedOnDepartureLeg,
} from '../pearl-chain-legacy/pearl-chain-legacy.sample-data.js';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export const defaultTrip: DeepPartial<ITripItem> = {
  legs: [futureLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-37',
      corporateIdentityPictogram: 'train-right',
    },
  },
};

export const connectionTrip: DeepPartial<ITripItem> = {
  ...defaultTrip,
  legs: [connectionLeg],
};

export const cancelledTrip: DeepPartial<ITripItem> = {
  legs: [cancelledLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayFormatted: '14',
    },
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-37',
      corporateIdentityPictogram: 'train-right',
    },
    tripStatus: {
      cancelled: true,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
    },
  },
};

export const progressTrip: DeepPartial<ITripItem> = {
  legs: [progressLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-37',
      corporateIdentityPictogram: 'train-right',
    },
  },
};

export const partiallyCancelled: DeepPartial<ITripItem> = {
  legs: [futureLeg, cancelledLeg, futureLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayFormatted: '14',
    },
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-37',
      corporateIdentityPictogram: 'train-right',
    },
    tripStatus: {
      partiallyCancelled: true,
    },
  },
};

export const pastTrip: DeepPartial<ITripItem> = {
  legs: [pastLeg, pastLeg, pastLeg],
  situations: [],
  summary: {
    arrival: {
      time: '2022-11-30T12:13:00+01:00',
    },
    departure: {
      time: '2022-11-30T11:08:00+01:00',
      quayFormatted: '14',
    },
    duration: 75,
    direction: 'Basel SBB',
    product: {
      line: '37',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-37',
      corporateIdentityPictogram: 'train-right',
    },
    tripStatus: {
      partiallyCancelled: false,
    },
  },
};

export const skippedLastArrivalStopTrip: DeepPartial<ITripItem> = {
  legs: [pastLeg, progressLeg, futureLeg, redirectedOnArrivalLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
  },
};

export const skippedArrivalStopTrip: DeepPartial<ITripItem> = {
  legs: [pastLeg, progressLeg, redirectedOnArrivalLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
  },
};

export const skippedDepartureStopTrip: DeepPartial<ITripItem> = {
  legs: [pastLeg, progressLeg, redirectedOnDepartureLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
  },
};

export const skippedFirstDepartureStopTrip: DeepPartial<ITripItem> = {
  legs: [redirectedOnDepartureLeg, futureLeg],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
    },
    departure: {
      time: '2022-11-30T17:44:00+01:00',
    },
    direction: 'Trimbach, Eisenbahn',
    product: {
      line: '502',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
  },
};

export const disturbanceTrip: DeepPartial<ITripItem> = {
  legs: [pastLeg, progressLeg],
  notices: [
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      type: 'ATTRIBUTE',
      priority: 8,
    },
  ],
  situations: [
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '28521',
          priority: 40,
          title: 'Test ROKAS Danke, dass Sie mit uns unterwegs sind.',
          detail:
            'Der Grund dafür ist eine technische Störung an der Bahnanlage.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br> Wir wünschen Ihnen eine angenehme Reise.<br><br>Ihre SBB.',
        },
      ],
    },
  ],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
      delay: 0,
      quayFormatted: '34',
      quayChanged: false,
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T17:44:00+01:00',
      delay: 0,
      quayFormatted: null,
      quayChanged: false,
    },
    departureWalk: 0,
    direction: 'Trimbach, Eisenbahn',
    product: {
      name: 'B 502 2204',
      line: '502',
      number: '2204',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
    occupancy: {
      firstClass: 'MEDIUM',
      secondClass: 'MEDIUM',
    },
    tripStatus: {
      cancelled: false,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
    },
  },
};

export const quayChangeTrip: DeepPartial<ITripItem> = {
  legs: [pastBusLeg, progressLeg],
  notices: [
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      type: 'ATTRIBUTE',
      priority: 8,
    },
  ],
  situations: [],
  summary: {
    duration: 46,
    arrival: {
      time: '2022-11-30T18:30:00+01:00',
      delay: 0,
      quayFormatted: '34',
      quayChanged: false,
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T17:44:00+01:00',
      delay: 0,
      quayFormatted: '42',
      quayChanged: true,
    },
    departureWalk: 0,
    direction: 'Trimbach, Eisenbahn',
    product: {
      name: 'B 502 2204',
      line: '502',
      number: '2204',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
    occupancy: {
      firstClass: 'MEDIUM',
      secondClass: 'MEDIUM',
    },
    tripStatus: {
      quayChanged: true,
    },
  },
};

export const trainTrip: DeepPartial<ITripItem> = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayFormatted: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayFormatted: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ic-35',
      corporateIdentityPictogram: 'train-right',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};

export const busTrip: DeepPartial<ITripItem> = {
  legs: [defaultBusLeg, futureLeg, longFutureLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayFormatted: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayFormatted: '4',
    },
    departureWalk: 0,
    direction: 'Spiegel, Blinzern',
    product: {
      name: 'B 19',
      line: '19',
      number: '27014',
      vehicleMode: 'BUS',
      vehicleSubModeShortName: 'B',
      corporateIdentityPictogram: 'bus-right',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};

export const shipTrip: DeepPartial<ITripItem> = {
  legs: [defaultShipLeg],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayFormatted: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayFormatted: '4',
    },
    departureWalk: 0,
    direction: 'Atlantis',
    product: {
      line: null,
      vehicleMode: 'SHIP',
      corporateIdentityPictogram: 'jetty-right',
    },
    tripStatus: {},
  },
};

export const walkTimeTrip: DeepPartial<ITripItem> = {
  legs: [defaultTramLeg, futureLeg, futureLeg, futureLeg, futureLeg, futureLeg],
  notices: [
    {
      name: 'NF',
      text: {
        template: 'Reservation possible',
      },
      type: 'ATTRIBUTE',
      priority: 0,
      __typename: 'Notice',
    },
    {
      name: 'WR',
      text: {
        template: 'Restaurant',
      },
      type: 'ATTRIBUTE',
      priority: 1,
      __typename: 'Notice',
    },
    {
      name: 'FA',
      text: {
        template: 'Family wagon with playground',
      },
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'BZ',
      text: {
        template: 'Business zone in 1st class',
      },
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'FS',
      text: {
        template: 'Free internet with the SBB FreeSurf app',
      },
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'RZ',
      text: {
        template: 'Quiet zone in 1st class',
      },
      type: 'ATTRIBUTE',
      priority: 4,
      __typename: 'Notice',
    },
    {
      name: 'R',
      text: {
        template: 'Reservation possible',
      },
      type: 'ATTRIBUTE',
      priority: 8,
      __typename: 'Notice',
    },
  ],
  situations: [
    {
      cause: 'INFORMATION',
      broadcastMessages: [
        {
          id: '25506',
          priority: 60,
          title: 'Reisehinweis: Bern - Olten RMi',
          detail:
            'Reisehinweis : Zwischen Bern und Olten ist die Strecke für den Bahnverkehr unterbrochen. Es verkehren Ersatzzüge Bern-Olten. Dauer  bis Betriebsschluss.',
        },
      ],
    },
    {
      cause: 'CONSTRUCTION_SITE',
      broadcastMessages: [
        {
          id: '25507',
          priority: 60,
          title: 'Bauarbeiten: Bern - Olten RMi',
          detail:
            'Bauarbeiten: Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Umleitungen gerechnet werden. Grund: Hochwassergefahr Dauer der Bauarbeiten unbestimmt.',
        },
      ],
    },
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '25505',
          priority: 60,
          title: 'Einschränkung: Bern - Olten RMi',
          detail:
            'Zwischen Bern und Olten ist die Strecke für den Bahnverkehr nur beschränkt befahrbar. Es muss mit Verspätungen und Zugausfällen gerechnet werden.',
        },
      ],
    },
    {
      cause: 'DISTURBANCE',
      broadcastMessages: [
        {
          id: '28521',
          priority: 40,
          title: 'Test ROKAS Danke, dass Sie mit uns unterwegs sind.',
          detail:
            'Der Grund dafür ist eine technische Störung an der Bahnanlage.<br> Die Dauer der Einschränkung ist unbestimmt.<br><br> Wir wünschen Ihnen eine angenehme Reise.<br><br>Ihre SBB.',
        },
      ],
    },
  ],
  summary: {
    duration: 80,
    arrival: {
      time: '2022-11-30T20:40:00+01:00',
      delay: 0,
      quayFormatted: '2',
      quayChanged: false,
    },
    arrivalWalk: 2,
    departure: {
      time: '2022-11-30T19:24:00+01:00',
      delay: 0,
      quayFormatted: 'A',
      quayChanged: false,
    },
    departureWalk: 2,
    direction: 'Bern, Fischermätteli',
    product: {
      name: 'T 6 2258',
      line: '6',
      number: '2258',
      vehicleMode: 'TRAMWAY',
      vehicleSubModeShortName: 'T',
      corporateIdentityPictogram: 'tram-right',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'LOW',
    },
    tripStatus: {
      cancelled: false,
      partiallyCancelled: false,
      delayedUnknown: false,
      delayed: false,
      quayChanged: false,
    },
  },
};

export const a11yFootpathTrip: DeepPartial<ITripItem> = { ...walkTimeTrip };

export const extendedEnterTimeTrip: DeepPartial<ITripItem> = {
  legs: [extendedLeg, futureLeg, longFutureLeg],
  notices: [],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayFormatted: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayFormatted: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-35',
      corporateIdentityPictogram: 'train-right',
    },
    occupancy: {},
    tripStatus: {},
  },
};

export const noticesTrip: DeepPartial<ITripItem> = {
  legs: [futureLeg, futureLeg, longFutureLeg],
  notices: [
    {
      name: 'XT',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'EXISTIERTNICHT',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'TG',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'VR',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'RM',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'SB >deleteme<',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
    {
      name: 'Z',
      text: {
        template: 'Reservation possible',
      },
    },
  ],
  situations: [],
  summary: {
    duration: 41,
    arrival: {
      time: '2022-11-30T17:06:00+01:00',
      quayFormatted: '11',
    },
    arrivalWalk: 0,
    departure: {
      time: '2022-11-30T16:30:00+01:00',
      quayFormatted: '4',
    },
    departureWalk: 0,
    direction: 'Chur',
    product: {
      line: '35',
      number: '2377',
      vehicleMode: 'TRAIN',
      vehicleSubModeShortName: 'IR',
      corporateIdentityIcon: 'ir-35',
      corporateIdentityPictogram: 'train-right',
    },
    occupancy: {
      firstClass: 'LOW',
      secondClass: 'MEDIUM',
    },
    tripStatus: {},
  },
};
