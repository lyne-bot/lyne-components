import { assert, expect } from '@open-wc/testing';
import type { SbbCardElement } from '@sbb-esta/lyne-elements/card.js';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { EventSpy } from '@sbb-esta/lyne-elements/core/testing.js';
import { html } from 'lit/static-html.js';

import type { ITripItem, Notice, PtSituation } from '../core/timetable/timetable-properties.js';

import {
  filterNotices,
  getCus,
  getHimIcon,
  SbbTimetableRowElement,
  sortSituation,
} from './timetable-row.js';
import { partiallyCancelled, walkTimeTrip } from './timetable-row.sample-data.js';

describe(`sbb-timetable-row`, () => {
  let element: SbbTimetableRowElement;

  beforeEach(async () => {
    element = await fixture(html`<sbb-timetable-row></sbb-timetable-row>`);
  });

  it('renders', () => {
    assert.instanceOf(element, SbbTimetableRowElement);
  });

  describe('events', () => {
    it('emits an event when clicked', async () => {
      const card = element.shadowRoot!.querySelector<SbbCardElement>('sbb-card')!;
      const changeSpy = new EventSpy('click');

      card.click();
      await changeSpy.calledOnce();
      expect(changeSpy.count).to.be.equal(1);
    });
  });

  describe('sortSituation', () => {
    it('should return sorted array', () => {
      expect(
        sortSituation([
          { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
          { cause: 'DISTURBANCE', broadcastMessages: [] },
        ]),
      ).to.be.eql([
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
        ]),
      ).to.be.eql([
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'DISTURBANCE', broadcastMessages: [] },
        { cause: 'TRAIN_REPLACEMENT_BY_BUS', broadcastMessages: [] },
      ]);
    });
  });

  describe(`getHimIcon`, () => {
    it('should return replacementbus', () => {
      const situation: PtSituation = {
        cause: 'TRAIN_REPLACEMENT_BY_BUS',
        broadcastMessages: [],
      };
      expect(getHimIcon(situation).name).to.be.equal('replacementbus');
      expect(getHimIcon(situation).text).to.be.equal('');
    });

    it('should return info', () => {
      const situation: PtSituation = {
        cause: null,
        broadcastMessages: [],
      };
      expect(getHimIcon(situation).name).to.be.equal('info');
    });
  });

  describe(`getCus`, () => {
    it('should return cancellation', () => {
      expect(getCus(partiallyCancelled as ITripItem, 'en')).to.be.eql({
        name: 'cancellation',
        text: undefined,
      });
    });
  });

  describe(`filterNotices`, () => {
    it('should return sa-rr', () => {
      expect(filterNotices(walkTimeTrip?.notices as Notice[])).to.be.eql([]);
    });
  });
});
