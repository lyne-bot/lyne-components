import {
  getCus,
  getHimIcon,
  getTransportIcon,
  filterNotices,
  isProductIcon,
  sortSituation,
} from './sbb-timetable-row.helper';
import { walkTimeTrip, partiallyCancelled } from './sbb-timetable-row.sample-data';
import { PtSituation } from '../../global/interfaces/timetable-properties';

describe('getTransportIcon', () => {
  it('should return schiff', () => {
    expect(getTransportIcon('SHIP')).toBe('schiff-right');
  });

  it('should return empty string', () => {
    expect(getTransportIcon('UNKNOWN')).toBe('');
  });
});

describe('isProductIcon', () => {
  it('should return true', () => {
    expect(isProductIcon('ic')).toBe(true);
  });

  it('should return false', () => {
    expect(isProductIcon('icc')).toBe(false);
  });
});

describe('sortSituation', () => {
  it('should return sorted array', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ])
    ).toStrictEqual([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });

  it('should return sorted array even with double causes', () => {
    expect(
      sortSituation([
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
      ])
    ).toStrictEqual([
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'DISTURBANCE', broadcastMessages: [] },
      { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
    ]);
  });
});

describe('getHimIcon', () => {
  it('should return replacementbus', () => {
    const situation: PtSituation = {
      cause: 'TRAIN_REPLACEMENT_BY_BUS',
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).toEqual('replacementbus');
    expect(getHimIcon(situation).text).toEqual('');
  });

  it('should return info', () => {
    const situation: PtSituation = {
      cause: null,
      broadcastMessages: [],
    };
    expect(getHimIcon(situation).name).toEqual('info');
  });
});

describe('getCus', () => {
  it('should return cancellation', () => {
    expect(getCus(partiallyCancelled)).toStrictEqual({ name: 'cancellation', text: undefined });
  });
});

describe('filterNotices', () => {
  it('should return sa-rr', () => {
    expect(filterNotices(walkTimeTrip?.notices)).toStrictEqual([]);
  });
});
