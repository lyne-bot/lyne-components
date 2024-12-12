import { expect } from '@open-wc/testing';

import { TimeAdapter } from './time-adapter.js';

describe('TimeAdapter', () => {
  let timeAdapter: TimeAdapter;

  beforeEach(() => {
    timeAdapter = new TimeAdapter();
  });

  it('addMilliseconds should return the right value', () => {
    let date = new Date(2023, 4, 1, 20, 5, 20, 200);

    expect(date.toISOString()).to.be.equal('2023-05-01T18:05:20.200Z');

    date = timeAdapter.addMilliseconds(date, 200);
    expect(date.toISOString()).to.be.equal('2023-05-01T18:05:20.400Z');

    date = timeAdapter.addMilliseconds(date, -300);
    expect(date.toISOString()).to.be.equal('2023-05-01T18:05:20.100Z');
  });

  it('addMinutes should return the right value', () => {
    let date = new Date(2023, 4, 1, 20, 5);

    expect(date.toISOString()).to.be.equal('2023-05-01T18:05:00.000Z');

    date = timeAdapter.addMinutes(date, 20);
    expect(date.toISOString()).to.be.equal('2023-05-01T18:25:00.000Z');

    date = timeAdapter.addMinutes(date, 150);
    expect(date.toISOString()).to.be.equal('2023-05-01T20:55:00.000Z');
  });

  it('differenceInMilliseconds should return the right value', () => {
    let firstDate = new Date(2023, 4, 1, 18, 5);
    let secondDate = new Date(2023, 4, 1, 20, 5);

    expect(timeAdapter.differenceInMilliseconds(firstDate, secondDate)).to.be.equal(-7200000);

    firstDate = new Date(2023, 4, 3, 16, 5);
    secondDate = new Date(2023, 4, 3, 8, 5);

    expect(timeAdapter.differenceInMilliseconds(firstDate, secondDate)).to.be.equal(28800000);
  });

  it('differenceInMinutes should return the right value', () => {
    let firstDate = new Date(2023, 4, 1, 18, 5);
    let secondDate = new Date(2023, 4, 1, 20, 5);

    expect(timeAdapter.differenceInMinutes(firstDate, secondDate)).to.be.equal(-120);

    firstDate = new Date(2023, 4, 3, 16, 55);
    secondDate = new Date(2023, 4, 3, 16, 5);

    expect(timeAdapter.differenceInMinutes(firstDate, secondDate)).to.be.equal(50);
  });

  it('isBefore should return the right value', () => {
    let firstDate = new Date(2023, 4, 1, 18, 5);
    let secondDate = new Date(2023, 4, 1, 20, 5);

    expect(timeAdapter.isBefore(firstDate, secondDate)).to.be.equal(true);

    firstDate = new Date(2023, 4, 3, 16, 55);
    secondDate = new Date(2023, 4, 3, 16, 5);

    expect(timeAdapter.isBefore(firstDate, secondDate)).to.be.equal(false);
  });

  it('isAfter should return the right value', () => {
    let firstDate = new Date(2023, 4, 1, 18, 5);
    let secondDate = new Date(2023, 4, 1, 20, 5);

    expect(timeAdapter.isAfter(firstDate, secondDate)).to.be.equal(false);

    firstDate = new Date(2023, 4, 3, 16, 55);
    secondDate = new Date(2023, 4, 3, 16, 5);

    expect(timeAdapter.isAfter(firstDate, secondDate)).to.be.equal(true);
  });

  it('isValid should return the right value', () => {
    expect(timeAdapter.isValid(new Date(2023, 4, 1, 18, 5))).to.be.equal(true);
    expect(timeAdapter.isValid(new Date(NaN))).to.be.equal(false);
  });

  it('deserialize should return the right value', () => {
    expect(timeAdapter.deserialize(new Date(2023, 4, 1, 18, 5)).toISOString()).to.be.equal(
      '2023-05-01T16:05:00.000Z',
    );
    expect(timeAdapter.deserialize('2022-08-18T04:00').toISOString()).to.be.equal(
      '2022-08-18T02:00:00.000Z',
    );
    expect(timeAdapter.deserialize('1661788000').toISOString()).to.be.equal(
      '2022-08-29T15:46:40.000Z',
    );
    expect(timeAdapter.deserialize(1660628000).toISOString()).to.be.equal(
      '2022-08-16T05:33:20.000Z',
    );
    expect(timeAdapter.isValid(timeAdapter.deserialize('Invalid input'))).to.be.equal(false);
  });
});
