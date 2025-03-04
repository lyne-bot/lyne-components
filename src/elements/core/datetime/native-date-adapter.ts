import { SbbLanguageController } from '../controllers.js';
import type { SbbDateLike } from '../interfaces.js';

import { DateAdapter, FORMAT_DATE, ISO8601_FORMAT_DATE } from './date-adapter.js';

/**
 * Matches strings that have the form of a valid RFC 3339 string
 * (https://tools.ietf.org/html/rfc3339). Note that the string may not actually be a valid date
 * because the regex will match strings an without of bounds month, date, etc.
 */
const ISO_8601_REGEX =
  /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

export class NativeDateAdapter extends DateAdapter<Date> {
  private readonly _cutoffYearOffset: number;

  public constructor(cutoffYearOffset: number = 15) {
    super();
    this._cutoffYearOffset = cutoffYearOffset;
  }

  /** Gets the year of the input date. */
  public getYear(date: Date): number {
    return date.getFullYear();
  }

  /** Gets the month of the input date. */
  public getMonth(date: Date): number {
    return date.getMonth() + 1;
  }

  /** Gets the day of the input date. */
  public getDate(date: Date): number {
    return date.getDate();
  }

  /** Gets the day of the week of the input date. */
  public getDayOfWeek(date: Date): number {
    return date.getDay();
  }

  /** Gets the date in the local format. */
  public getAccessibilityFormatDate(date: Date | string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat(SbbLanguageController.current, options).format(new Date(date));
  }

  /**
   * Creates an array of strings with length = 12, filled with the name of the months starting from January, in the document language.
   * @param style See `month` in `DateTimeFormatOptions`: `long` for full name, `short` for short name, `narrow` for single letter,
   * E.g., with January in en-gb: `long` returns "January", `short` returns "Jan", `narrow` returns "J".
   */
  public getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { month: style });
    return this._range(12, (i) => formatter.format(new Date(2017, i, 1)));
  }

  /** Creates a string array with length = 31, filled with the days in a month, starting from 1. */
  public getDateNames(): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { day: 'numeric' });
    return this._range(31, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /**
   * Creates a string array with length = 7, filled with the name of the days in a week starting from Sunday, in the document language.
   * @param style See `weekday` in `DateTimeFormatOptions` - 'long' for full name, 'short' for short name, 'narrow' for single letter;
   * E.g., with Monday in en-gb: `long` returns "Monday", `short` returns "Mon", `narrow` returns "M".
   */
  public getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    const formatter = new Intl.DateTimeFormat(SbbLanguageController.current, { weekday: style });
    return this._range(7, (i) => formatter.format(new Date(2017, 0, i + 1)));
  }

  /* Defines which is the first day of the week (0: sunday; 1: monday; etc.). */
  public getFirstDayOfWeek(): number {
    return 1;
  }

  /** Calculates the number of days in a month given the year and the month. */
  public getNumDaysInMonth(date: Date): number {
    return this.getDate(this._createDateWithOverflow(this.getYear(date), this.getMonth(date), 0));
  }

  /** Creates today's date. */
  public today(): Date {
    return new Date(new Date().setHours(0, 0, 0, 0));
  }

  /** Creates a new date, given day, month and year; the method doesn't allow date's overflow. */
  public createDate(year: number, month: number, date: number): Date {
    // Check for invalid month and date (except upper bound on date which we have to check after creating the Date).
    if (month < 1 || month > 12) {
      throw Error(`Invalid month index "${month}". Month index has to be between 1 and 12.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = this._createDateWithOverflow(year, month - 1, date);
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (result.getMonth() + 1 !== month) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result;
  }

  /** Checks whether the given `obj` is a Date. */
  public isDateInstance(obj: any): boolean {
    return obj instanceof Date;
  }

  /** Checks whether the given `date` is a valid Date. */
  public isValid(date: Date | null | undefined): date is Date {
    return !!date && !isNaN(date.valueOf());
  }

  /** Creates a new date by cloning the given one. */
  public clone(date: Date): Date {
    return new Date(date.valueOf());
  }

  /**
   * Creates a new date adding the number of provided `years` to the provided `date`.
   * @param date The starting date.
   * @param years The number of years to add.
   */
  public addCalendarYears(date: Date, years: number): Date {
    return this.addCalendarMonths(date, years * 12);
  }

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g., with `date` = new Date(2022, 0, 31) and `months` = 1, it returns new Date(2022, 1, 28).
   */
  public addCalendarMonths(date: Date, months: number): Date {
    const targetMonth = date.getMonth() + months;
    const dateWithCorrectMonth = new Date(date.getFullYear(), targetMonth, 1, 0, 0, 0, 0);
    const daysInMonth = this.getNumDaysInMonth(dateWithCorrectMonth);
    // Adapt the last day of month for shorter months
    return new Date(this.clone(date).setMonth(targetMonth, Math.min(daysInMonth, date.getDate())));
  }

  /** Creates a new date by adding the number of provided `days` to the provided `date`. */
  public addCalendarDays(date: Date, days: number): Date {
    const targetDay = date.getDate() + days;
    return new Date(date.getFullYear(), date.getMonth(), targetDay, 0, 0, 0, 0);
  }

  /** Creates a Date from a valid input (Date, string or number in seconds). */
  public override deserialize(date: SbbDateLike | null | undefined): Date | null {
    if (typeof date === 'string') {
      if (!date) {
        return null;
      } else if (!Number.isNaN(+date)) {
        return this.getValidDateOrNull(new Date(+date * 1000));

        // The `Date` constructor accepts formats other than ISO 8601, so we need to make sure the
        // string is the right format first.
      } else if (ISO_8601_REGEX.test(date)) {
        return this.getValidDateOrNull(new Date(date.includes('T') ? date : date + 'T00:00:00'));
      }
    } else if (typeof date === 'number') {
      return this.getValidDateOrNull(new Date(date * 1000));
    }
    return super.deserialize(date);
  }

  /** Returns the right format for the `valueAsDate` property. */
  public parse(value: string | null | undefined, now: Date = this.today()): Date | null {
    if (!value) {
      return null;
    }

    const isoMatch = value.match(ISO8601_FORMAT_DATE);
    const date = isoMatch ? this.createDate(+isoMatch[1], +isoMatch[2], +isoMatch[3]) : null;
    if (this.isValid(date)) {
      return date;
    }

    const strippedValue = value.replace(/\D/g, ' ').trim();

    const match: RegExpMatchArray | null | undefined = strippedValue?.match(FORMAT_DATE);
    if (
      !match ||
      match.index !== 0 ||
      match.length <= 2 ||
      match.some((e) => e === undefined) ||
      !this.isValid(this.createDate(+match[3], +match[2], +match[1]))
    ) {
      return null;
    }

    let year = +match[3];

    if (typeof year === 'number' && year < 100 && year >= 0) {
      const shift = now.getFullYear() - 2000 + this._cutoffYearOffset;
      year = year <= shift ? 2000 + year : 1900 + year;
    }

    return new Date(year, +match[2] - 1, +match[1]);
  }

  public override invalid(): Date {
    return new Date(NaN);
  }

  /**
   * Creates an array with the given length and fills it by mapping with the provided function.
   * @param length The length of the array to be created.
   * @param valueFunction The function of array's index used to fill the array.
   */
  private _range<T>(length: number, valueFunction: (index: number) => T): T[] {
    return Array.from({ length }).map((_, i) => valueFunction(i));
  }

  /** Creates a date but allows the month and date to overflow. */
  private _createDateWithOverflow(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);
    // We need to correct for the fact that JS native Date treats years in range [0, 99] as
    // abbreviations for 19xx.
    if (year >= 0 && year < 100) {
      result.setFullYear(this.getYear(result) - 1900);
    }
    return result;
  }
}

export const defaultDateAdapter = new NativeDateAdapter();
