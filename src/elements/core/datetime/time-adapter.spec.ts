import { expect } from '@open-wc/testing';

import { TimeAdapter } from './time-adapter.js';

describe('TimeAdapter', () => {
  let timeAdapter: TimeAdapter;

  beforeEach(() => {
    timeAdapter = new TimeAdapter();
  });

  it('addMilliseconds should return the right value', () => {
    let date = new Date(1682964320200);

    date = timeAdapter.addMilliseconds(date, 200);
    expect(date.getTime()).to.be.equal(1682964320400);

    date = timeAdapter.addMilliseconds(date, -300);
    expect(date.getTime()).to.be.equal(1682964320100);
  });

  it('addMinutes should return the right value', () => {
    let date = new Date(1682964300000);

    date = timeAdapter.addMinutes(date, 20);
    expect(date.getTime()).to.be.equal(1682965500000);

    date = timeAdapter.addMinutes(date, 150);
    expect(date.getTime()).to.be.equal(1682974500000);
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
    expect(timeAdapter.deserialize(new Date(Date.UTC(2023, 4, 1, 18, 5))).getTime()).to.be.equal(
      1682964300000,
    );

    const dateObject = new Date(2023, 4, 1, 20, 5);

    expect(timeAdapter.deserialize(dateObject.toISOString()).getTime()).to.be.equal(
      dateObject.getTime(),
    );
    expect(timeAdapter.deserialize('1661788000').getTime()).to.be.equal(1661788000000);
    expect(timeAdapter.deserialize(1660628000).getTime()).to.be.equal(1660628000000);
    expect(timeAdapter.isValid(timeAdapter.deserialize('Invalid input'))).to.be.equal(false);
  });
});
