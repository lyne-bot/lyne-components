export const DAYS_PER_ROW: number = 7;
export const MONTHS_PER_ROW: number = 4;
export const YEARS_PER_ROW: number = 4;
export const MONTHS_PER_PAGE: number = 12;
export const YEARS_PER_PAGE: number = 24;
export const FORMAT_DATE =
  /(^0?[1-9]?|[12]?[0-9]?|3?[01]?)[.,\\/\-\s](0?[1-9]?|1?[0-2]?)?[.,\\/\-\s](\d{1,4}$)?/;

/**
 * Abstract date functionality.
 *
 * Adapted from https://github.com/angular/components/blob/main/src/material/core/datetime/date-adapter.ts
 */
export abstract class DateAdapter<T = any> {
  /**
   * Get the year as a number.
   * @param date
   */
  public abstract getYear(date: T): number;

  /**
   * Get the month as a number.
   * Attention: This returns 1-12 and mitigates the default JavaScript Date behavior.
   * @param date
   */
  public abstract getMonth(date: T): number;

  /**
   * Get the day of the month as a number.
   * @param date
   */
  public abstract getDate(date: T): number;

  /**
   * Get the Day of the week as a number.
   * @param date
   */
  public abstract getDayOfWeek(date: T): number;

  /** Get the first day of the week (0: sunday; 1: monday; etc.). */
  public abstract getFirstDayOfWeek(): number;

  /**
   * Get the number of days in a month.
   * @param year
   * @param month
   */
  public abstract getNumDaysInMonth(date: T): number;

  /**
   * Get a list of all the months in a given style.
   * @param style
   */
  public abstract getMonthNames(style: 'long' | 'short' | 'narrow'): string[];

  /** Get a string array with length = 31, filled with the days in a month, starting from 1. */
  public abstract getDateNames(): string[];

  /**
   * Get a list of all the week days in a given style.
   * @param style
   */
  public abstract getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[];

  /** Creates today's date. */
  public abstract today(): T;

  /**
   * Checks whether a given `date` is valid.
   * @param date
   */
  public abstract isValid(date: T | null | undefined): date is T;

  /**
   * Creates a new date by cloning the given one.
   * @param date
   */
  public abstract clone(date: T): T;

  /**
   * Creates a new date, given day, month and year; without date's overflow.
   * @param year
   * @param month The month of the date (1-indexed, 1 = January). Must be an integer 1 - 12.
   * @param date
   */
  public abstract createDate(year: number, month: number, date: number): T;

  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null.
   * @param value Either Date, ISOString, Unix Timestamp (number of seconds since Jan 1, 1970).
   * @returns The date if the input is valid, `null` otherwise.
   */
  public deserialize(value: T | string | number | null | undefined): T | null {
    if (
      value == null ||
      (this.isDateInstance(value) && this.isValid(value as T | null | undefined))
    ) {
      return value as T | null;
    }
    return this.invalid();
  }

  /**
   * Creates a new date adding the number of provided `years` to the provided `date`.
   * @param date The starting date.
   * @param years The number of years to add.
   */
  public abstract addCalendarYears(date: T, years: number): T;

  /**
   * Creates a new date adding the number of provided `months` to the provided `date`.
   * If the calculated month has fewer days than the original one, the date is set to the last day of the month.
   * E.g. with `date` = new Date(2022, 0, 31) and `months` = 1, it returns new Date(2022, 1, 28).
   * @param date The starting date.
   * @param months The number of months to add.
   */
  public abstract addCalendarMonths(date: T, months: number): T;

  /**
   * Creates a new date by adding the number of provided `days` to the provided `date`.
   * @param date The starting date.
   * @param days The number of days to add.
   */
  public abstract addCalendarDays(date: T, days: number): T;

  /**
   * Get the date in the local format.
   * @param date The date to format
   * @returns The `date` in the local format as string.
   */
  public abstract getAccessibilityFormatDate(date: T | string): string;

  /**
   * Get the given string as Date.
   * @param value The date in the format DD.MM.YYYY.
   * @param now The current date as Date.
   */
  public abstract parse(value: string | null | undefined, now: T): T | null;

  /**
   * Format the given date as string.
   * @param date The date to format.
   * @param options options object with weekdayStyle as property
   */
  public format(
    date: T | null | undefined,
    options?: { weekdayStyle?: 'long' | 'short' | 'narrow' },
  ): string {
    if (!this.isValid(date)) {
      return '';
    }

    const value = new Date(this.toIso8601(date!) + 'T00:00:00');
    const dateFormatter = new Intl.DateTimeFormat('de-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const weekdayStyle = options?.weekdayStyle ?? 'short';
    let weekday = this.getDayOfWeekNames(weekdayStyle)[this.getDayOfWeek(date!)];
    weekday = weekday.charAt(0).toUpperCase() + weekday.substring(1);
    // We have the special requirement for date formats at SBB, where the short form
    // for weekdays should be two characters in length.
    if (weekdayStyle === 'short') {
      weekday = weekday.substring(0, 2);
    }

    return `${weekday}, ${dateFormatter.format(value)}`;
  }

  /**
   * Checks whether the given `obj` is a Date.
   * @param obj The object to check.
   */
  public abstract isDateInstance(obj: any): boolean;

  /**
   * Gets date instance that is not valid.
   * @returns An invalid date.
   */
  public abstract invalid(): T;

  /**
   * Get the given date as ISO String.
   * @param date The date to convert to ISO String.
   */
  public toIso8601(date: T): string {
    const pad = (value: number, length = 2): string => `${value}`.padStart(length, '0');
    return `${pad(this.getYear(date), 4)}-${pad(this.getMonth(date))}-${pad(this.getDate(date))}`;
  }

  /**
   * Given a potential date object, returns that same date object if it is
   * a valid date, or `null` if it's not a valid date.
   * @param value The object to check.
   * @returns A date or `null`.
   */
  public getValidDateOrNull(value: unknown): T | null {
    return this.isDateInstance(value) && this.isValid(value as T) ? (value as T) : null;
  }

  /**
   * Calculates the day of the week of the first day of the month, and then its offset from the first day of the week.
   */
  public getFirstWeekOffset(date: T): number {
    const firstOfMonth = this.createDate(this.getYear(date), this.getMonth(date), 1)!;
    return (
      (DAYS_PER_ROW + this.getDayOfWeek(firstOfMonth) - this.getFirstDayOfWeek()) % DAYS_PER_ROW
    );
  }

  /**
   * Compares two dates.
   * @param first The first date to compare.
   * @param second The second date to compare.
   * @returns 0 if the dates are equal, a number less than 0 if the first date is earlier,
   *     a number greater than 0 if the first date is later.
   */
  public compareDate(first: T, second: T): number {
    return (
      this.getYear(first) - this.getYear(second) ||
      this.getMonth(first) - this.getMonth(second) ||
      this.getDate(first) - this.getDate(second)
    );
  }

  /**
   * Checks if two dates are equal.
   * @param first The first date to check.
   * @param second The second date to check.
   * @returns Whether the two dates are equal.
   *     Null dates are considered equal to other null dates.
   */
  public sameDate(first: T | null, second: T | null): boolean {
    if (first && second) {
      const firstValid = this.isValid(first);
      const secondValid = this.isValid(second);
      if (firstValid && secondValid) {
        return !this.compareDate(first, second);
      }
      return firstValid == secondValid;
    }
    return first == second;
  }

  /**
   * Clamp the given date between min and max dates.
   * @param date The date to clamp.
   * @param min The minimum value to allow. If null or omitted no min is enforced.
   * @param max The maximum value to allow. If null or omitted no max is enforced.
   * @returns `min` if `date` is less than `min`, `max` if date is greater than `max`,
   *     otherwise `date`.
   */
  public clampDate(date: T, min?: T | null, max?: T | null): T {
    if (min && this.compareDate(date, min) < 0) {
      return min;
    }
    if (max && this.compareDate(date, max) > 0) {
      return max;
    }
    return date;
  }
}
