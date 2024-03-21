import { assert } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import { fixture } from '../core/testing';

import { SbbTimetableOccupancyElement } from './timetable-occupancy';

describe(`sbb-timetable-occupancy with ${fixture.name}`, () => {
  let element: SbbTimetableOccupancyElement;

  beforeEach(async () => {
    element = await fixture(
      html` <sbb-timetable-occupancy first-class-occupancy="high"></sbb-timetable-occupancy> `,
      { modules: ['./timetable-occupancy.ts'] },
    );
  });

  it('renders', async () => {
    assert.instanceOf(element, SbbTimetableOccupancyElement);
  });
});
