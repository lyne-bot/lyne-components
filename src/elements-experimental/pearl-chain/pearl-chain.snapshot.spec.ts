import { expect } from '@open-wc/testing';
import { fixture } from '@sbb-esta/lyne-elements/core/testing/private.js';
import { html } from 'lit/static-html.js';

import type { PtRideLeg } from '../core/timetable.js';

import type { SbbPearlChainElement } from './pearl-chain.js';
import './pearl-chain.js';

const now = '2022-08-16T15:00:00';

describe(`sbb-pearl-chain`, () => {
  let element: SbbPearlChainElement;

  describe('renders with one leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T05:00' },
              departure: { time: '2022-08-18T04:00' },
            },
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with two legs', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T05:00' },
              departure: { time: '2022-08-18T04:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T16:00' },
              departure: { time: '2022-08-18T05:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with departure stop skipped', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T05:00' },
              departure: { time: '2022-08-18T04:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T16:00' },
              departure: { time: '2022-08-18T05:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
                stopPoints: [
                  {
                    stopStatus: 'NOT_SERVICED',
                  },
                  {
                    stopStatus: 'PLANNED',
                  },
                ],
              },
            } as PtRideLeg,
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with arrival stop skipped', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T05:00' },
              departure: { time: '2022-08-18T04:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-18T16:00' },
              departure: { time: '2022-08-18T05:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
                stopPoints: [
                  {
                    stopStatus: 'PLANNED',
                  },
                  {
                    stopStatus: 'NOT_SERVICED',
                  },
                ],
              },
            } as PtRideLeg,
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with progress leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-17T16:00:00' },
              departure: { time: '2022-08-14T14:00:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-17T20:00:00' },
              departure: { time: '2022-08-17T18:00:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });

  describe('renders with cancelled instead of progress leg', () => {
    beforeEach(async () => {
      element = await fixture(html`
        <sbb-pearl-chain
          .now=${now}
          .legs=${[
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-16T16:00:00' },
              departure: { time: '2022-08-16T14:00:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
                stopPoints: [
                  {
                    stopStatus: 'NOT_SERVICED',
                  },
                  {
                    stopStatus: 'PLANNED',
                  },
                ],
              },
            } as PtRideLeg,
            {
              __typename: 'PTRideLeg',
              arrival: { time: '2022-08-16T18:00:00' },
              departure: { time: '2022-08-16T17:00:00' },
              serviceJourney: {
                serviceAlteration: {
                  cancelled: false,
                },
              },
            } as PtRideLeg,
          ]}
        ></sbb-pearl-chain>
      `);
    });

    it('DOM', async () => {
      await expect(element).dom.to.be.equalSnapshot();
    });

    it('Shadow DOM', async () => {
      await expect(element).shadowDom.to.be.equalSnapshot();
    });
  });
});
