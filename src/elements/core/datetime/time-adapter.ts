export class TimeAdapter {
  public constructor() {}

  public addMilliseconds(date: Date, amount: number): Date {
    const timestamp: number = date.getTime();

    return new Date(timestamp + amount);
  }

  public addMinutes(date: Date, amount: number): Date {
    return this.addMilliseconds(date, amount * 60000);
  }

  public differenceInMilliseconds(firstDate: Date, secondDate: Date): number {
    return firstDate.getTime() - secondDate.getTime();
  }

  public differenceInMinutes(firstDate: Date, secondDate: Date): number {
    return this.differenceInMilliseconds(firstDate, secondDate) / 60000;
  }

  public isBefore(firstDate: Date, secondDate: Date): boolean {
    return this.differenceInMilliseconds(firstDate, secondDate) < 0;
  }

  public isAfter(firstDate: Date, secondDate: Date): boolean {
    return this.differenceInMilliseconds(firstDate, secondDate) > 0;
  }

  /** Checks whether the given `date` is a valid Date. */
  public isValid(date: Date | null | undefined): boolean {
    return !!date && !isNaN(date.valueOf());
  }

  /** Creates a Date from a valid input (Date, string or number in seconds). */
  public deserialize(date: Date | string | number | null | undefined): Date {
    if (typeof date === 'object' && date instanceof Date) {
      return date;
    } else if (typeof date === 'string') {
      if (!date) {
        return new Date(NaN);
      } else if (!Number.isNaN(+date)) {
        return new Date(+date * 1000);
      } else {
        return new Date(date.includes('T') ? date : date + 'T00:00:00');
      }
    } else if (typeof date === 'number') {
      return new Date(date * 1000);
    }

    return new Date(NaN);
  }

  public invalid(): Date {
    return new Date(NaN);
  }
}
