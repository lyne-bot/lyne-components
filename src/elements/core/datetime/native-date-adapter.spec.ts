import { expect } from '@open-wc/testing';

import { NativeDateAdapter } from './native-date-adapter.js';

describe('NativeDateAdapter', () => {
  let nativeDateAdapter: NativeDateAdapter;

  beforeEach(() => {
    nativeDateAdapter = new NativeDateAdapter();
  });

  it('getFirstWeekOffset should return the right value', () => {
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 4, 1))).to.be.equal(0);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 7, 1))).to.be.equal(1);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 1, 1))).to.be.equal(2);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 5, 1))).to.be.equal(3);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 8, 1))).to.be.equal(4);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 3, 1))).to.be.equal(5);
    expect(nativeDateAdapter.getFirstWeekOffset(new Date(2023, 0, 1))).to.be.equal(6);
  });

  it('should return the right value for year month, date and weekday', () => {
    const date: Date = new Date(2023, 0, 1);
    expect(nativeDateAdapter.getYear(date)).to.be.equal(2023);
    expect(nativeDateAdapter.getMonth(date)).to.be.equal(1);
    expect(nativeDateAdapter.getDate(date)).to.be.equal(1);
    expect(nativeDateAdapter.getDayOfWeek(date)).to.be.equal(0);
  });

  it('getMonthNames, getDateNames and getDayOfWeekNames should return the correct arrays', () => {
    const longMonths: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const shortMonths: string[] = longMonths.map((el: string) => el.substring(0, 3));
    const narrowMonths: string[] = shortMonths.map((el: string) => el.substring(0, 1));

    const longWeek: string[] = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const shortWeek: string[] = longWeek.map((el: string) => el.substring(0, 3));
    const narrowWeek: string[] = shortWeek.map((el: string) => el.substring(0, 1));

    const datesArray: string[] = new Array(31).fill(undefined).map((_, i) => String(i + 1));

    expect(nativeDateAdapter.getMonthNames('long')).to.be.deep.equal(longMonths);
    expect(nativeDateAdapter.getMonthNames('short')).to.be.deep.equal(shortMonths);
    expect(nativeDateAdapter.getMonthNames('narrow')).to.be.deep.equal(narrowMonths);

    expect(nativeDateAdapter.getDayOfWeekNames('long')).to.be.deep.equal(longWeek);
    expect(nativeDateAdapter.getDayOfWeekNames('short')).to.be.deep.equal(shortWeek);
    expect(nativeDateAdapter.getDayOfWeekNames('narrow')).to.be.deep.equal(narrowWeek);

    expect(nativeDateAdapter.getDateNames()).to.be.deep.equal(datesArray);
  });

  it('getNumDaysInMonth should return the correct value', () => {
    expect(nativeDateAdapter.getNumDaysInMonth(new Date(2023, 1, 1))).to.be.equal(28);
    expect(nativeDateAdapter.getNumDaysInMonth(new Date(2024, 1, 1))).to.be.equal(29);
    expect(nativeDateAdapter.getNumDaysInMonth(new Date(2023, 3, 1))).to.be.equal(30);
    expect(nativeDateAdapter.getNumDaysInMonth(new Date(2023, 0, 1))).to.be.equal(31);
  });

  it('createDate should return the correct value or error', () => {
    expect(() => nativeDateAdapter.createDate(2023, 17, 1)).to.throw();
    expect(() => nativeDateAdapter.createDate(2023, 3, -11)).to.throw();
    expect(() => nativeDateAdapter.createDate(2023, -5, 1)).to.throw();
    expect(() => nativeDateAdapter.createDate(2023, 3, 99)).to.throw();
    const firstDate: Date = nativeDateAdapter.createDate(2023, 1, 1)!;
    expect(firstDate instanceof Date).to.be.equal(true);
    expect(
      `${firstDate.getDate()}.${firstDate.getMonth() + 1}.${firstDate.getFullYear()}`,
    ).to.be.equal('1.1.2023');
    const secondDate: Date = nativeDateAdapter.createDate(18, 1, 1)!;
    expect(secondDate instanceof Date).to.be.equal(true);
    expect(
      `${secondDate.getDate()}.${secondDate.getMonth() + 1}.${secondDate.getFullYear()}`,
    ).to.be.equal('1.1.18');
  });

  it('isDateInstance and isValid should return the correct value', () => {
    expect(nativeDateAdapter.isDateInstance(null)).to.be.false;
    expect(nativeDateAdapter.isDateInstance({ test: 'test' })).to.be.false;
    expect(nativeDateAdapter.isDateInstance(new Date(0))).to.be.true;
    expect(nativeDateAdapter.isDateInstance(100)).to.be.false;
    expect(nativeDateAdapter.isDateInstance('Test')).to.be.false;

    expect(nativeDateAdapter.isValid(null)).to.be.false;
    expect(nativeDateAdapter.isValid(undefined)).to.be.false;
    expect(nativeDateAdapter.isValid(new Date(0))).to.be.true;
    expect(nativeDateAdapter.isValid(new Date('TEST'))).to.be.false;
  });

  it('addCalendarMonths should return the correct value', () => {
    const firstDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 0, 15), 6);
    expect(firstDate instanceof Date).to.be.equal(true);
    expect(
      `${firstDate.getDate()}.${firstDate.getMonth() + 1}.${firstDate.getFullYear()}`,
    ).to.be.equal('15.7.2023');

    const secondDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 0, 31), 1);
    expect(secondDate instanceof Date).to.be.equal(true);
    expect(
      `${secondDate.getDate()}.${secondDate.getMonth() + 1}.${secondDate.getFullYear()}`,
    ).to.be.equal('28.2.2023');

    const thirdDate: Date = nativeDateAdapter.addCalendarMonths(new Date(2023, 2, 31), 6);
    expect(thirdDate instanceof Date).to.be.equal(true);
    expect(
      `${thirdDate.getDate()}.${thirdDate.getMonth() + 1}.${thirdDate.getFullYear()}`,
    ).to.be.equal('30.9.2023');
  });

  it('addCalendarDays should return the correct value', () => {
    const date: Date = new Date(2023, 0, 15);

    const plusFifteen: Date = nativeDateAdapter.addCalendarDays(date, 15);
    expect(plusFifteen instanceof Date).to.be.equal(true);
    expect(
      `${plusFifteen.getDate()}.${plusFifteen.getMonth() + 1}.${plusFifteen.getFullYear()}`,
    ).to.be.equal('30.1.2023');

    const plusThirty: Date = nativeDateAdapter.addCalendarDays(date, 30);
    expect(plusThirty instanceof Date).to.be.equal(true);
    expect(
      `${plusThirty.getDate()}.${plusThirty.getMonth() + 1}.${plusThirty.getFullYear()}`,
    ).to.be.equal('14.2.2023');

    const plusOneYear: Date = nativeDateAdapter.addCalendarDays(date, 365);
    expect(plusOneYear instanceof Date).to.be.equal(true);
    expect(
      `${plusOneYear.getDate()}.${plusOneYear.getMonth() + 1}.${plusOneYear.getFullYear()}`,
    ).to.be.equal('15.1.2024');
  });

  it('compareDate should return the correct value', () => {
    const dateZero: Date = new Date(0);
    const dateMillennium: Date = new Date(946684800000);
    const dateNow: Date = new Date(2023, 8, 15, 0, 0, 0, 0);
    expect(nativeDateAdapter.compareDate(dateZero, dateZero)).to.be.equal(0);
    expect(nativeDateAdapter.compareDate(dateZero, dateMillennium)).to.be.lessThan(0);
    expect(nativeDateAdapter.compareDate(dateMillennium, dateNow)).to.be.lessThan(0);
    expect(nativeDateAdapter.compareDate(dateNow, dateMillennium)).to.be.greaterThan(0);
    expect(nativeDateAdapter.compareDate(dateNow, dateZero)).to.be.greaterThan(0);
  });

  it('deserializeDate should return the correct value', () => {
    expect(nativeDateAdapter.deserialize(null)).to.be.null;

    const date: Date = nativeDateAdapter.deserialize(new Date(0))!;
    expect(date instanceof Date).to.be.equal(true);
    expect(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`).to.be.equal(
      '1.1.1970',
    );

    const dateNumber: Date = nativeDateAdapter.deserialize(946684800)!;
    expect(dateNumber instanceof Date).to.be.equal(true);
    expect(
      `${dateNumber.getDate()}.${dateNumber.getMonth() + 1}.${dateNumber.getFullYear()}`,
    ).to.be.equal('1.1.2000');

    const dateNumAsStr: Date = nativeDateAdapter.deserialize('946684800')!;
    expect(dateNumAsStr instanceof Date).to.be.equal(true);
    expect(
      `${dateNumAsStr.getDate()}.${dateNumAsStr.getMonth() + 1}.${dateNumAsStr.getFullYear()}`,
    ).to.be.equal('1.1.2000');

    const dateString: Date = nativeDateAdapter.deserialize('2024-01-01')!;
    expect(dateString instanceof Date).to.be.equal(true);
    expect(
      `${dateString.getDate()}.${dateString.getMonth() + 1}.${dateString.getFullYear()}`,
    ).to.be.equal('1.1.2024');

    const fakeDate: Date = nativeDateAdapter.deserialize({} as string)!;
    expect(fakeDate instanceof Date).to.be.equal(true);
    expect(+fakeDate).to.be.NaN;
  });

  it('parseDate should return the correct value', function () {
    const now = new Date(2023, 8, 15, 0, 0, 0, 0);
    expect(nativeDateAdapter.parse(null, now)).to.be.null;
    expect(nativeDateAdapter.parse('Test', now)).to.be.null;
    expect(nativeDateAdapter.parse('1.1', now)).to.be.null;
    for (const dateString of ['1/1/2000', '1.1.2000', '2000-01-01']) {
      const date = nativeDateAdapter.parse(dateString, now)!;
      expect(date.getFullYear()).to.be.equal(2000);
      expect(date.getMonth()).to.be.equal(0);
      expect(date.getDate()).to.be.equal(1);
    }
  });

  it('format should return the correct string', function () {
    document.documentElement.setAttribute('lang', 'de-CH');
    expect(nativeDateAdapter.format(null)).to.be.equal('');
    expect(nativeDateAdapter.format(new Date(2020, 9, 31))).to.be.equal('Sa, 31.10.2020');
  });

  it('should generate localized accessibility labels', async () => {
    document.documentElement.setAttribute('lang', 'en-US');
    expect(
      nativeDateAdapter.getAccessibilityFormatDate(new Date(2017, 11, 5, 0, 0, 0)),
    ).to.be.equal('December 5, 2017');

    document.documentElement.setAttribute('lang', 'de-DE');
    expect(
      nativeDateAdapter.getAccessibilityFormatDate(new Date(2023, 8, 13, 0, 0, 0)),
    ).to.be.equal('13. September 2023');

    document.documentElement.setAttribute('lang', 'it-IT');
    expect(
      nativeDateAdapter.getAccessibilityFormatDate(new Date(2015, 2, 24, 0, 0, 0)),
    ).to.be.equal('24 marzo 2015');

    document.documentElement.setAttribute('lang', 'fr-FR');
    expect(
      nativeDateAdapter.getAccessibilityFormatDate(new Date(2018, 7, 15, 0, 0, 0)),
    ).to.be.equal('15 août 2018');
  });
});
