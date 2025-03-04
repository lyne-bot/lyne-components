import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  nothing,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { isArrowKeyOrPageKeysPressed, sbbInputModalityDetector } from '../core/a11y.js';
import { readConfig } from '../core/config.js';
import {
  SbbLanguageController,
  SbbMediaMatcherController,
  SbbMediaQueryBreakpointMediumAndAbove,
} from '../core/controllers.js';
import type { DateAdapter } from '../core/datetime.js';
import {
  DAYS_PER_ROW,
  defaultDateAdapter,
  MONTHS_PER_PAGE,
  MONTHS_PER_ROW,
  YEARS_PER_PAGE,
  YEARS_PER_ROW,
} from '../core/datetime.js';
import { forceType } from '../core/decorators.js';
import { EventEmitter } from '../core/eventing.js';
import {
  i18nCalendarDateSelection,
  i18nNextMonth,
  i18nNextYear,
  i18nNextYearRange,
  i18nPreviousMonth,
  i18nPreviousYear,
  i18nPreviousYearRange,
  i18nYearMonthSelection,
} from '../core/i18n.js';
import type { SbbDateLike } from '../core/interfaces.js';
import { SbbHydrationMixin } from '../core/mixins.js';

import style from './calendar.scss?lit&inline';

import '../button/secondary-button.js';
import '../icon.js';
import '../screen-reader-only.js';

/**
 * Parameters needed in year and month views to correctly calculate the next element in keyboard navigation.
 *
 * The cell's index and the element's index in its month / year batch must be distinguished:
 * the first is the index of the element in the array of all the rendered cells, while the second is the index of the element relative to its table.
 * In non-wide mode, the wto are the same, while in wide mode the cell's index can go from 0 to 47 for years and from 0 to 23 for months,
 * while the element index goes from 0 to, respectively, 23 and 11.
 */
interface CalendarKeyboardNavigationMonthYearViewsParameters {
  /** The element index within its year or month range. */
  elementIndexForWideMode: number;
  /** In wide mode, the index of the first element in the second panel, or, alternatively, the number of elements in the first panel. */
  offsetForWideMode: number;
  /** The index of the last element within the element's month (or year range). */
  lastElementIndexForWideMode: number;
  /** The number of cells displayed in a single row, depending on the rendered view. */
  verticalOffset: number;
}

/**
 * Parameters needed in day view to correctly calculate the next element in keyboard navigation.
 *
 * In orientation='vertical', it's not possible to rely on any array/index to calculate the element to navigate to,
 * so calculations on dates must be done, which should consider view boundaries, offsets and month's length.
 */
interface CalendarKeyboardNavigationDayViewParameters {
  /** The first day rendered. */
  firstDayInView: string | null;
  /** The last day rendered. It depends on the 'wide' value. */
  lastDayInView: string | null;
  /** The offset from the first day of the week (Monday) of the first rendered month. */
  firstMonthOffset: number;
  /** The number of days in the first rendered month. */
  firstMonthLength: number;
  /** The offset from the first day of the week (Monday) of the second rendered month. If wide is false, it's equal to zero. */
  secondMonthOffset: number;
}

export interface Day<T = Date> {
  value: string;
  dayValue: string;
  monthValue: string;
  yearValue: string;
  dateValue?: T;
}

export interface Month {
  value: string;
  longValue: string;
  monthValue: number;
}

export interface Weekday {
  long: string;
  narrow: string;
}

export type CalendarView = 'day' | 'month' | 'year';

/**
 * It displays a calendar which allows to choose a date.
 *
 * @event {CustomEvent<T>} dateSelected - Event emitted on date selection.
 */
export
@customElement('sbb-calendar')
class SbbCalendarElement<T = Date> extends SbbHydrationMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    dateSelected: 'dateSelected',
  } as const;

  /** If set to true, two months are displayed */
  @forceType()
  @property({ type: Boolean })
  public accessor wide: boolean = false;

  /** The initial view of the calendar which should be displayed on opening. */
  @property() public accessor view: CalendarView = 'day';

  /** The minimum valid date. Takes T Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @property()
  public set min(value: SbbDateLike<T> | null) {
    this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get min(): T | null {
    return this._min ?? null;
  }
  private _min?: T | null;

  /** The maximum valid date. Takes T Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @property()
  public set max(value: SbbDateLike<T> | null) {
    this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get max(): T | null {
    return this._max ?? null;
  }
  private _max?: T | null;

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: SbbDateLike<T> | null) {
    this._now = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get now(): T {
    return this._now ?? this._dateAdapter.today();
  }
  private _now: T | null = null;

  /** The selected date. Takes T Object, ISOString, and Unix Timestamp (number of seconds since Jan 1, 1970). */
  @property()
  public set selected(value: SbbDateLike<T> | null) {
    this._selectedDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (
      !!this._selectedDate &&
      (!this._isDayInRange(this._dateAdapter.toIso8601(this._selectedDate)) ||
        this._dateFilter(this._selectedDate))
    ) {
      this._selected = this._dateAdapter.toIso8601(this._selectedDate);
    } else {
      this._selected = undefined;
    }
  }
  public get selected(): T | null {
    return this._selectedDate ?? null;
  }
  private _selectedDate?: T | null;

  /** A function used to filter out dates. */
  @property({ attribute: 'date-filter' })
  public accessor dateFilter: ((date: T | null) => boolean) | null = null;

  /** The orientation of days in the calendar. */
  @property({ reflect: true }) public accessor orientation: 'horizontal' | 'vertical' =
    'horizontal';

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  /** Event emitted on date selection. */
  private _dateSelected: EventEmitter<T> = new EventEmitter(
    this,
    SbbCalendarElement.events.dateSelected,
  );

  /** The currently active date. */
  @state() private accessor _activeDate: T = this.now;

  /** The selected date as ISOString. */
  @state() private accessor _selected: string | undefined;

  /** The current wide property considering property value and breakpoints. From zero to small `wide` has always to be false. */
  @state()
  private set _wide(wide: boolean) {
    this.toggleAttribute('data-wide', wide);
  }
  private get _wide(): boolean {
    return this.hasAttribute('data-wide');
  }

  @state() private accessor _calendarView: CalendarView = 'day';

  private _nextCalendarView: CalendarView = 'day';

  /** Information about the rendered day view; used in keyboard navigation. */
  private _keyboardNavigationDayViewParameters: CalendarKeyboardNavigationDayViewParameters = {
    firstDayInView: null,
    lastDayInView: null,
    firstMonthOffset: 0,
    firstMonthLength: 0,
    secondMonthOffset: 0,
  };

  /** A list of days, in two formats (long and single char). */
  private _weekdays!: Weekday[];

  /** Grid of calendar cells representing the dates of the month. */
  private _weeks: Day<T>[][] = [];

  /** Grid of calendar cells representing months. */
  private _months!: Month[][];

  /** Grid of calendar cells representing years. */
  private _years!: number[][];

  /** Grid of calendar cells representing years for the wide view. */
  private _nextMonthYears!: number[][];

  /** Grid of calendar cells representing the dates of the next month. */
  private _nextMonthWeeks!: Day<T>[][];

  /** An array containing all the month names in the current language. */
  private _monthNames: string[] = this._dateAdapter.getMonthNames('long');

  /** A list of buttons corresponding to days, months or years depending on the view. */
  private get _cells(): HTMLButtonElement[] {
    return Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell') ?? [],
    ) as HTMLButtonElement[];
  }

  /** The chosen year in the year selection view. */
  private _chosenYear?: number;

  /** The chosen month in the year selection view. */
  private _chosenMonth?: number;

  /** Whether the focus should be reset on focusCell. */
  private _resetFocus = false;

  @state()
  private accessor _initialized = false;

  private _language = new SbbLanguageController(this).withHandler(() => {
    this._monthNames = this._dateAdapter.getMonthNames('long');
    this._createMonthRows();
  });
  private _mediaMatcher = new SbbMediaMatcherController(this, {
    [SbbMediaQueryBreakpointMediumAndAbove]: () => this._init(),
  });

  public constructor() {
    super();
    this._createMonthRows();
    this._setWeekdays();
  }

  private _dateFilter(date: T): boolean {
    return this.dateFilter?.(date) ?? true;
  }

  /** Resets the active month according to the new state of the calendar. */
  public resetPosition(): void {
    this._resetCalendarView();
    this._init();
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.resetPosition();
    this.focus = () => {
      this._resetFocus = true;
      this._focusCell();
    };
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (!this._initialized) {
      return;
    }

    if (changedProperties.has('wide') || changedProperties.has('orientation')) {
      this.resetPosition();
    }

    if (changedProperties.has('view')) {
      this._setChosenYear();
      this._chosenMonth = undefined;
      this._nextCalendarView = this._calendarView = this.view;
    }
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    super.updated(changedProperties);
    // The calendar needs to calculate tab-indexes on first render,
    // and every time a date is selected or the month view changes.
    this._setTabIndex();
    // When changing view to year/month, the tabindex is changed, but the focused element is not,
    // so if the navigation is done via keyboard, there's the need
    // to call the `_focusCell()` method explicitly to correctly set the focus.
    if (sbbInputModalityDetector.mostRecentModality === 'keyboard') {
      this._focusCell();
    }
  }

  /** Initializes the component. */
  private _init(activeDate?: T): void {
    // Due to its complexity, the calendar is only initialized on client side
    if (isServer) {
      return;
    } else if (this.hydrationRequired) {
      this.hydrationComplete.then(() => this._init());
      return;
    }

    if (activeDate) {
      this._assignActiveDate(activeDate);
    }
    this._wide =
      (this._mediaMatcher.matches(SbbMediaQueryBreakpointMediumAndAbove) ?? false) && this.wide;
    this._weeks = this._createWeekRows(this._activeDate);
    this._years = this._createYearRows();
    this._nextMonthWeeks = [[]];
    this._nextMonthYears = [[]];
    if (this._wide) {
      const nextMonthDate = this._dateAdapter.addCalendarMonths(this._activeDate, 1);
      this._nextMonthWeeks = this._createWeekRows(nextMonthDate, true);
      this._nextMonthYears = this._createYearRows(YEARS_PER_PAGE);
    }
    this._initialized = true;
  }

  /** Focuses on a day cell prioritizing the selected day, the current day, and lastly, the first selectable day. */
  private _focusCell(): void {
    if (this._resetFocus) {
      this._getFirstFocusable()?.focus();
      this._resetFocus = false;
    }
  }

  /** Creates the array of weekdays. */
  private _setWeekdays(): void {
    const narrowWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('narrow');
    const longWeekdays: string[] = this._dateAdapter.getDayOfWeekNames('long');
    const weekdays: Weekday[] = longWeekdays.map((long: string, i: number) => ({
      long,
      narrow: narrowWeekdays[i],
    }));

    // Rotates the labels for days of the week based on the configured first day of the week.
    const firstDayOfWeek: number = this._dateAdapter.getFirstDayOfWeek();
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
  }

  /** Creates the rows for each week and sets the parameters used in keyboard navigation. */
  private _createWeekRows(value: T, isSecondMonthInView = false): Day<T>[][] {
    const dateNames: string[] = this._dateAdapter.getDateNames();
    const daysInMonth: number = this._dateAdapter.getNumDaysInMonth(value);
    const weekOffset: number = this._dateAdapter.getFirstWeekOffset(value);
    if (!isSecondMonthInView) {
      this._keyboardNavigationDayViewParameters.firstMonthLength = daysInMonth;
      this._keyboardNavigationDayViewParameters.firstMonthOffset = weekOffset;
      this._keyboardNavigationDayViewParameters.firstDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          1,
        ),
      );
      this._keyboardNavigationDayViewParameters.lastDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          daysInMonth,
        ),
      );
    } else {
      this._keyboardNavigationDayViewParameters.secondMonthOffset = weekOffset;
      this._keyboardNavigationDayViewParameters.lastDayInView = this._dateAdapter.toIso8601(
        this._dateAdapter.createDate(
          this._dateAdapter.getYear(value),
          this._dateAdapter.getMonth(value),
          daysInMonth,
        ),
      );
    }
    return this.orientation === 'horizontal'
      ? this._createWeekRowsHorizontal(value, dateNames, daysInMonth, weekOffset)
      : this._createWeekRowsVertical(value, dateNames, daysInMonth, weekOffset);
  }

  /**
   * Creates the rows for each week in orientation='horizontal'.
   *
   * Iterates through the days of the months, creates a Day object for each and pushes it into and array.
   * Each seven days (considering the offset at the beginning of the month) restarts from an empty array.
   *
   * The result is a matrix in which every row is a week (or part of it, considering offset).
   */
  private _createWeekRowsHorizontal(
    value: T,
    dateNames: string[],
    daysInMonth: number,
    weekOffset: number,
  ): Day<T>[][] {
    const weeks: Day<T>[][] = [[]];
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_ROW) {
        weeks.push([]);
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(value),
        this._dateAdapter.getMonth(value),
        i + 1,
      )!;
      weeks[weeks.length - 1].push({
        value: this._dateAdapter.toIso8601(date),
        dateValue: date,
        dayValue: dateNames[i],
        monthValue: String(this._dateAdapter.getMonth(date)),
        yearValue: String(this._dateAdapter.getYear(date)),
      });
    }
    return weeks;
  }

  /**
   * Creates the rows for each week in orientation='vertical'.
   *
   * Creates a matrix with seven empty rows.
   * Iterates through the days of the months, creates a Day object for each
   * and pushes it into the correct array considering the offset at the beginning of the month.
   * Each seven days (including offset) restarts from the first.
   *
   * The result is a matrix in which every row is a set of weekdays, so:
   * - row 0: all the Mondays;
   * - row 1: all the Tuesdays;
   * - ...
   * - row 7: all the Sundays.
   */
  private _createWeekRowsVertical(
    value: T,
    dateNames: string[],
    daysInMonth: number,
    weekOffset: number,
  ): Day<T>[][] {
    const weeks: Day<T>[][] = Array.from({ length: DAYS_PER_ROW }, () => []);
    for (let i = 0, cell = weekOffset; i < daysInMonth; i++, cell++) {
      if (cell === DAYS_PER_ROW) {
        cell = 0;
      }
      const date = this._dateAdapter.createDate(
        this._dateAdapter.getYear(value),
        this._dateAdapter.getMonth(value),
        i + 1,
      )!;
      weeks[cell].push({
        value: this._dateAdapter.toIso8601(date),
        dateValue: date,
        dayValue: dateNames[i],
        monthValue: String(this._dateAdapter.getMonth(date)),
        yearValue: String(this._dateAdapter.getYear(date)),
      });
    }
    return weeks;
  }

  /** Creates the rows for the month selection view. */
  private _createMonthRows(): void {
    const shortNames: string[] = this._dateAdapter.getMonthNames('short');
    const months: Month[] = new Array(12).fill(null).map(
      (_, i: number): Month => ({
        value: shortNames[i],
        longValue: this._monthNames[i],
        monthValue: i + 1,
      }),
    );
    const rows: number = 12 / MONTHS_PER_ROW;
    const monthArray: Month[][] = [];
    for (let i: number = 0; i < rows; i++) {
      monthArray.push(months.slice(MONTHS_PER_ROW * i, MONTHS_PER_ROW * (i + 1)));
    }
    this._months = monthArray;
  }

  /** Creates the rows for the year selection view. */
  private _createYearRows(offset: number = 0): number[][] {
    const startValueYearView: number = this._getStartValueYearView();
    const allYears: number[] = new Array(YEARS_PER_PAGE)
      .fill(0)
      .map((_, i: number) => startValueYearView + offset + i);
    const rows: number = YEARS_PER_PAGE / YEARS_PER_ROW;
    const yearArray: number[][] = [];
    for (let i: number = 0; i < rows; i++) {
      yearArray.push(allYears.slice(YEARS_PER_ROW * i, YEARS_PER_ROW * (i + 1)));
    }
    return yearArray;
  }

  /**
   * Calculates the first year that will be shown in the year selection panel.
   * If `minDate` and `maxDate` are both null, the starting year is calculated as
   * the multiple of YEARS_PER_PAGE closest to and less than activeDate,
   * e.g., with `YEARS_PER_PAGE` = 24 and `activeDate` = 2020, the function will return 2016 (24 * 83),
   * while with `activeDate` = 2000, the function will return 1992 (24 * 82).
   * If `minDate` is not null, it returns the corresponding year; if `maxDate` is not null,
   * it returns the corresponding year minus `YEARS_PER_PAGE`, so that the `maxDate` is the last rendered year.
   * If both are not null, `maxDate` has priority over `minDate`.
   */
  private _getStartValueYearView(): number {
    let startingYear = 0;
    if (this.max) {
      startingYear = this._dateAdapter.getYear(this.max) - YEARS_PER_PAGE + 1;
    } else if (this.min) {
      startingYear = this._dateAdapter.getYear(this.min);
    }
    const activeYear = this._dateAdapter.getYear(this._activeDate);
    return (
      activeYear -
      ((((activeYear - startingYear) % YEARS_PER_PAGE) + YEARS_PER_PAGE) % YEARS_PER_PAGE)
    );
  }

  /** Checks if date is within the min-max range. */
  private _isDayInRange(date: string): boolean {
    if (!this.min && !this.max) {
      return true;
    }
    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this.min) &&
      this._dateAdapter.compareDate(this.min!, this._dateAdapter.deserialize(date)!) > 0;
    const isAfterMax: boolean =
      this._dateAdapter.isValid(this.max) &&
      this._dateAdapter.compareDate(this.max!, this._dateAdapter.deserialize(date)!) < 0;
    return !(isBeforeMin || isAfterMax);
  }

  /** Checks if date is within the min-max range in month view. */
  private _isMonthInRange(month: number, year: number): boolean {
    if (!this.min && !this.max) {
      return true;
    }

    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this.min) &&
      (year < this._dateAdapter.getYear(this.min!) ||
        (year === this._dateAdapter.getYear(this.min!) &&
          month < this._dateAdapter.getMonth(this.min!)));

    const isAfterMax: boolean =
      this._dateAdapter.isValid(this.max) &&
      (year > this._dateAdapter.getYear(this.max!) ||
        (year === this._dateAdapter.getYear(this.max!) &&
          month > this._dateAdapter.getMonth(this.max!)));

    return !(isBeforeMin || isAfterMax);
  }

  /** Checks if date is within the min-max range in year view. */
  private _isYearInRange(year: number): boolean {
    if (!this.min && !this.max) {
      return true;
    }
    const isBeforeMin: boolean =
      this._dateAdapter.isValid(this.min) && this._dateAdapter.getYear(this.min!) > year;
    const isAfterMax: boolean =
      this._dateAdapter.isValid(this.max) && this._dateAdapter.getYear(this.max!) < year;
    return !(isBeforeMin || isAfterMax);
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/year-view.ts#L366
  private _isMonthFilteredOut(month: number, year: number): boolean {
    if (!this.dateFilter) {
      return true;
    }

    const firstOfMonth = this._dateAdapter.createDate(year, month, 1)!;
    for (
      let date: T = firstOfMonth;
      this._dateAdapter.getMonth(date) == month;
      date = this._dateAdapter.addCalendarDays(date, 1)
    ) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  // Implementation adapted from https://github.com/angular/components/blob/main/src/material/datepicker/multi-year-view.ts#L351
  private _isYearFilteredOut(year: number): boolean {
    if (!this.dateFilter) {
      return true;
    }

    const firstOfYear = this._dateAdapter.createDate(year, 1, 1)!;
    for (
      let date: T = firstOfYear;
      this._dateAdapter.getYear(date) == year;
      date = this._dateAdapter.addCalendarDays(date, 1)
    ) {
      if (this.dateFilter(date)) {
        return true;
      }
    }

    return false;
  }

  /** Emits the selected date and sets it internally. */
  private _selectDate(day: string): void {
    this._chosenMonth = undefined;
    this._setChosenYear();
    if (this._selected !== day) {
      this._selected = day;
      this._dateSelected.emit(this._dateAdapter.deserialize(day)!);
    }
  }

  private _setChosenYear(): void {
    if (this.view === 'month') {
      this._chosenYear = this._dateAdapter.getYear(
        this._dateAdapter.deserialize(this._selected) ?? this.selected ?? this.now,
      );
    } else {
      this._chosenYear = undefined;
    }
  }

  private _assignActiveDate(date: T): void {
    if (this.min && this._dateAdapter.compareDate(this.min, date) > 0) {
      this._activeDate = this.min;
      return;
    }
    if (this.max && this._dateAdapter.compareDate(this.max, date) < 0) {
      this._activeDate = this.max;
      return;
    }
    this._activeDate = date;
  }

  /** Goes to the month identified by the shift. */
  private _goToDifferentMonth(months: number): void {
    this._init(this._dateAdapter.addCalendarMonths(this._activeDate, months));
  }

  private _goToDifferentYear(years: number): void {
    this._chosenYear! += years;
    // Can't use `_assignActiveDate(...)` here, because it will set it to min/max value if argument is out of range
    this._activeDate = this._dateAdapter.createDate(
      this._chosenYear!,
      this._dateAdapter.getMonth(this._activeDate),
      this._dateAdapter.getDate(this._activeDate),
    );
    this._init();
  }

  private _goToDifferentYearRange(years: number): void {
    this._init(this._dateAdapter.addCalendarYears(this._activeDate, years));
  }

  private _prevDisabled(prevDate: T): boolean {
    if (!this.min) {
      return false;
    }
    return this._dateAdapter.compareDate(prevDate, this.min) < 0;
  }

  private _nextDisabled(nextDate: T): boolean {
    if (!this.max) {
      return false;
    }
    return this._dateAdapter.compareDate(nextDate, this.max) > 0;
  }

  /** Checks if the "previous month" button should be disabled. */
  private _previousMonthDisabled(): boolean {
    const prevMonth = this._dateAdapter.addCalendarDays(
      this._activeDate,
      this._dateAdapter.getDate(this._activeDate) * -1,
    );
    return this._prevDisabled(prevMonth);
  }

  /** Checks if the "next month" button should be disabled. */
  private _nextMonthDisabled(): boolean {
    let nextMonth = this._dateAdapter.addCalendarMonths(this._activeDate, this._wide ? 2 : 1);
    nextMonth = this._dateAdapter.createDate(
      this._dateAdapter.getYear(nextMonth),
      this._dateAdapter.getMonth(nextMonth),
      1,
    );
    return this._nextDisabled(nextMonth);
  }

  /** Checks if the "previous year" button should be disabled. */
  private _previousYearDisabled(): boolean {
    const prevYear = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this._activeDate) - 1,
      12,
      31,
    );
    return this._prevDisabled(prevYear);
  }

  /** Checks if the "next year" button should be disabled. */
  private _nextYearDisabled(): boolean {
    const nextYear = this._dateAdapter.createDate(
      this._dateAdapter.getYear(this._activeDate) + (this._wide ? 2 : 1),
      1,
      1,
    );
    return this._nextDisabled(nextYear);
  }

  /** Checks if the "previous year" button should be disabled in year view. */
  private _previousYearRangeDisabled(): boolean {
    const prevYear = this._dateAdapter.createDate(this._years[0][0] - 1, 12, 31);
    return this._prevDisabled(prevYear);
  }

  /** Checks if the "next year" button should be disabled in year view. */
  private _nextYearRangeDisabled(): boolean {
    const years = this._wide ? this._nextMonthYears : this._years;
    const lastYearRange = years[years.length - 1];
    const lastYear = lastYearRange[lastYearRange.length - 1];
    const nextYear = this._dateAdapter.createDate(lastYear + 1, 1, 1);
    return this._nextDisabled(nextYear);
  }

  private _handleTableBlur(eventTarget: HTMLElement): void {
    if (eventTarget?.localName !== 'button') {
      this._setTabIndex();
    }
  }

  private _setTabIndex(): void {
    Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell[tabindex="0"]') ?? [],
    ).forEach((day) => ((day as HTMLElement).tabIndex = -1));
    const firstFocusable = this._getFirstFocusable();
    if (firstFocusable) {
      firstFocusable.tabIndex = 0;
    }
  }

  /** Get the element in the calendar to assign focus. */
  private _getFirstFocusable(): HTMLButtonElement {
    const active = this._selected ? this._dateAdapter.deserialize(this._selected)! : this.now;
    let firstFocusable =
      this.shadowRoot!.querySelector('.sbb-calendar__selected') ??
      this.shadowRoot!.querySelector(`[value="${this._dateAdapter.toIso8601(active)}"]`) ??
      this.shadowRoot!.querySelector(`[data-month="${this._dateAdapter.getMonth(active)}"]`) ??
      this.shadowRoot!.querySelector(`[data-year="${this._dateAdapter.getYear(active)}"]`);
    if (!firstFocusable || (firstFocusable as HTMLButtonElement)?.disabled) {
      firstFocusable =
        this._calendarView === 'day'
          ? this._getFirstFocusableDay()
          : this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])');
    }
    return (firstFocusable as HTMLButtonElement) || null;
  }

  /**
   * In `day` view in `vertical` orientation,
   * if the first of the month is not a Monday, it is not the first rendered element in the table,
   * so `this.shadowRoot!.querySelector('.sbb-calendar__cell:not([disabled])')` will return a wrong value.
   *
   * To solve this, the element with the lowest `value` is taken (ISO String are ordered).
   */
  private _getFirstFocusableDay(): HTMLButtonElement | null {
    const daysInView: HTMLButtonElement[] = Array.from(
      this.shadowRoot!.querySelectorAll('.sbb-calendar__cell:not([disabled])'),
    );
    if (!daysInView || daysInView.length === 0) {
      return null;
    } else {
      const firstElement = daysInView.map((e: HTMLButtonElement): string => e.value).sort()[0];
      return this.shadowRoot!.querySelector(`.sbb-calendar__cell[value="${firstElement}"]`);
    }
  }

  private _handleKeyboardEvent(event: KeyboardEvent, day?: Day<T>): void {
    if (isArrowKeyOrPageKeysPressed(event)) {
      event.preventDefault();
    }
    // Gets the currently rendered table's cell;
    // they could be days, months or years based on the current selection view.
    // If `wide` is true, years are doubled in number and days are (roughly) doubled too, affecting the `index` calculation.
    const cells: HTMLButtonElement[] = this._cells;
    const index: number = cells.findIndex((e: HTMLButtonElement) => e === event.target);
    let nextEl: HTMLButtonElement;
    if (day) {
      nextEl = this._navigateByKeyboardDayView(event, index, cells, day);
    } else {
      nextEl = this._navigateByKeyboard(event, index, cells);
    }
    const activeEl: HTMLButtonElement = this.shadowRoot!.activeElement as HTMLButtonElement;
    if (nextEl !== activeEl) {
      (nextEl as HTMLButtonElement).tabIndex = 0;
      nextEl?.focus();
      (activeEl as HTMLButtonElement).tabIndex = -1;
    }
  }

  private _navigateByKeyboardDayView(
    evt: KeyboardEvent,
    index: number,
    cells: HTMLButtonElement[],
    day: Day<T>,
  ): HTMLButtonElement {
    const arrowsOffset =
      this.orientation === 'horizontal'
        ? { leftRight: 1, upDown: DAYS_PER_ROW }
        : { leftRight: DAYS_PER_ROW, upDown: 1 };
    const offsetForVertical: number =
      index < this._keyboardNavigationDayViewParameters.firstMonthLength
        ? this._keyboardNavigationDayViewParameters.firstMonthOffset
        : this._keyboardNavigationDayViewParameters.secondMonthOffset;

    switch (evt.key) {
      case 'ArrowUp':
        return this._findDayArrows(cells, index, day.dateValue!, -arrowsOffset.upDown);
      case 'ArrowDown':
        return this._findDayArrows(cells, index, day.dateValue!, arrowsOffset.upDown);
      case 'ArrowLeft':
        return this._findDayArrows(cells, index, day.dateValue!, -arrowsOffset.leftRight);
      case 'ArrowRight':
        return this._findDayArrows(cells, index, day.dateValue!, arrowsOffset.leftRight);
      case 'PageUp': {
        if (this.orientation === 'horizontal') {
          const firstOfWeek: number = +day.dayValue % DAYS_PER_ROW || DAYS_PER_ROW;
          const delta: number = firstOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, arrowsOffset.upDown);
        } else {
          const weekNumber: number = Math.ceil((+day.dayValue + offsetForVertical) / DAYS_PER_ROW);
          const firstOfWeek: number = (weekNumber - 1) * DAYS_PER_ROW - offsetForVertical + 1;
          const delta: number = firstOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, arrowsOffset.upDown);
        }
      }
      case 'PageDown': {
        if (this.orientation === 'horizontal') {
          const monthInBounds = +day.monthValue + 1 > 12 ? 1 : +day.monthValue + 1;
          const yearInBounds = +day.monthValue + 1 > 12 ? +day.yearValue + 1 : +day.yearValue;
          const firstNextMonth: T = this._dateAdapter.createDate(yearInBounds, monthInBounds, 1);
          const lastOfMonth: number = this._dateAdapter.getDate(
            this._dateAdapter.addCalendarDays(firstNextMonth, -1),
          );
          const delta: number =
            Math.trunc((lastOfMonth - +day.dayValue!) / DAYS_PER_ROW) * DAYS_PER_ROW;
          return this._findDayPageUpDown(cells, index, day, delta, -arrowsOffset.upDown);
        } else {
          const weekNumber: number = Math.ceil((+day.dayValue + offsetForVertical) / DAYS_PER_ROW);
          const lastOfWeek: number = weekNumber * DAYS_PER_ROW - offsetForVertical;
          const delta: number = lastOfWeek - +day.dayValue;
          return this._findDayPageUpDown(cells, index, day, delta, -arrowsOffset.upDown);
        }
      }
      case 'Home': {
        return this._findDayFirst(cells, index, day, 1);
      }
      case 'End': {
        const monthInBounds = +day.monthValue + 1 > 12 ? 1 : +day.monthValue + 1;
        const yearInBounds = +day.monthValue + 1 > 12 ? +day.yearValue + 1 : +day.yearValue;
        const firstNextMonth: T = this._dateAdapter.createDate(yearInBounds, monthInBounds, 1);
        return this._findDayLast(cells, index, firstNextMonth);
      }
      default:
        return cells[index];
    }
  }

  private _isDayOutOfView(date: string): boolean {
    return (
      date < this._keyboardNavigationDayViewParameters.firstDayInView! ||
      date > this._keyboardNavigationDayViewParameters.lastDayInView!
    );
  }

  private _findDayArrows(
    cells: HTMLButtonElement[],
    index: number,
    date: T,
    delta: number,
  ): HTMLButtonElement {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(date, delta),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => e.value === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayArrows(cells, index, this._dateAdapter.deserialize(newDateValue)!, delta);
    }
    return nextCell;
  }

  private _findDayPageUpDown(
    cells: HTMLButtonElement[],
    index: number,
    day: Day<T>,
    delta: number,
    deltaIfDisabled: number,
  ): HTMLButtonElement {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(day.dateValue!, delta),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => e.value === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayPageUpDown(cells, index, day, delta + deltaIfDisabled, deltaIfDisabled);
    }
    return nextCell;
  }

  private _findDayFirst(
    cells: HTMLButtonElement[],
    index: number,
    day: Day<T>,
    date: number,
  ): HTMLButtonElement {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.createDate(+day.yearValue, +day.monthValue, date),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => e.value === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayFirst(cells, index, day, date + 1);
    }
    return nextCell;
  }

  private _findDayLast(
    cells: HTMLButtonElement[],
    index: number,
    firstNextMonth: T,
  ): HTMLButtonElement {
    const newDateValue = this._dateAdapter.toIso8601(
      this._dateAdapter.addCalendarDays(firstNextMonth, -1),
    );
    if (this._isDayOutOfView(newDateValue)) {
      return cells[index];
    }
    const nextCell = cells.find((e) => e.value === newDateValue);
    if (!nextCell || nextCell.disabled) {
      return this._findDayLast(cells, index, this._dateAdapter.deserialize(newDateValue)!);
    }
    return nextCell;
  }

  /**
   * Gets the index of the element to move to, based on a list of elements (which can be potentially disabled),
   * the keyboard input and the position of the current element in the list.
   * In the day view, the `day?: Day` parameter is mandatory for calculation,
   * while in month and year view it's not due to the fixed amount of rendered cells.
   */
  private _navigateByKeyboard(
    evt: KeyboardEvent,
    index: number,
    cells: HTMLButtonElement[],
  ): HTMLButtonElement {
    const {
      elementIndexForWideMode,
      offsetForWideMode,
      lastElementIndexForWideMode,
      verticalOffset,
    }: CalendarKeyboardNavigationMonthYearViewsParameters =
      this._calculateParametersForKeyboardNavigation(index, this._calendarView === 'year');

    switch (evt.key) {
      case 'ArrowUp':
        return this._findNext(cells, index, -verticalOffset);
      case 'ArrowDown':
        return this._findNext(cells, index, verticalOffset);
      case 'ArrowLeft':
        return this._findNext(cells, index, -1);
      case 'ArrowRight':
        return this._findNext(cells, index, 1);
      case 'Home':
        return this._findFirst(cells, offsetForWideMode);
      case 'PageUp':
        return this._findFirstOnColumn(
          cells,
          elementIndexForWideMode,
          offsetForWideMode,
          verticalOffset,
        );
      case 'PageDown':
        return this._findLastOnColumn(cells, index, lastElementIndexForWideMode, verticalOffset);
      case 'End':
        return this._findLast(cells, lastElementIndexForWideMode - 1);
      default:
        return cells[index];
    }
  }

  /**
   * Calculates the parameters needed in keyboard navigation in year and month view.
   * @param index The starting element's index in the cell array.
   * @param isYearView Whether the displayed `view` is the year one.
   */
  private _calculateParametersForKeyboardNavigation(
    index: number,
    isYearView: boolean,
  ): CalendarKeyboardNavigationMonthYearViewsParameters {
    const elementsPerPage = isYearView ? YEARS_PER_PAGE : MONTHS_PER_PAGE;
    const offset: number = Math.trunc(index / elementsPerPage) * elementsPerPage;
    const indexInView: number = offset === 0 ? index : index - elementsPerPage;
    return {
      verticalOffset: isYearView ? YEARS_PER_ROW : MONTHS_PER_ROW,
      elementIndexForWideMode: indexInView,
      offsetForWideMode: index - indexInView,
      lastElementIndexForWideMode: offset === 0 ? elementsPerPage : elementsPerPage * 2,
    };
  }

  /**
   * Gets the next element of the provided array starting from `index` by adding `delta`.
   * If the found element is disabled, it continues adding `delta` until it finds an enabled one in the array bounds.
   */
  private _findNext(days: HTMLButtonElement[], index: number, delta: number): HTMLButtonElement {
    let nextIndex = index + delta;
    while (nextIndex < days.length && days[nextIndex]?.disabled) {
      nextIndex += delta;
    }
    return days[nextIndex] ?? days[index];
  }

  /** Find the first enabled element in the provided array. */
  private _findFirst(days: HTMLButtonElement[], firstOfCurrentMonth: number): HTMLButtonElement {
    return !days[firstOfCurrentMonth].disabled
      ? days[firstOfCurrentMonth]
      : this._findNext(days, firstOfCurrentMonth, 1);
  }

  /** Find the last enabled element in the provided array. */
  private _findLast(days: HTMLButtonElement[], lastOfCurrentMonth: number): HTMLButtonElement {
    return !days[lastOfCurrentMonth].disabled
      ? days[lastOfCurrentMonth]
      : this._findNext(days, lastOfCurrentMonth, -1);
  }

  /** Find the first enabled element in the same column of the provided array. */
  private _findFirstOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): HTMLButtonElement {
    const nextIndex = (index % verticalOffset) + offset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, verticalOffset);
  }

  /** Find the last enabled element in the same column of the provided array. */
  private _findLastOnColumn(
    days: HTMLButtonElement[],
    index: number,
    offset: number,
    verticalOffset: number,
  ): HTMLButtonElement {
    const nextIndex = index + Math.trunc((offset - index - 1) / verticalOffset) * verticalOffset;
    return !days[nextIndex].disabled
      ? days[nextIndex]
      : this._findNext(days, nextIndex, -verticalOffset);
  }

  private _resetCalendarView(initTransition = false): void {
    this._resetFocus = true;
    this._activeDate = this.selected ?? this.now;
    this._setChosenYear();
    this._chosenMonth = undefined;
    this._nextCalendarView = this._calendarView = this.view;

    if (initTransition) {
      this._startTableTransition();
    }
  }

  /** Render the view for the day selection. */
  private _renderDayView(): TemplateResult {
    const nextMonthActiveDate = this._wide
      ? this._dateAdapter.addCalendarMonths(this._activeDate, 1)
      : undefined;
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentMonth(-1),
          i18nPreviousMonth[this._language.current],
          this._previousMonthDisabled(),
        )}
        <div class="sbb-calendar__controls-month">
          ${this._createLabelForDayView(this._activeDate)}
          ${this._wide ? this._createLabelForDayView(nextMonthActiveDate!) : nothing}
          <sbb-screen-reader-only role="status">
            ${this._createAriaLabelForDayView(this._activeDate, nextMonthActiveDate!)}
          </sbb-screen-reader-only>
        </div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentMonth(1),
          i18nNextMonth[this._language.current],
          this._nextMonthDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-container sbb-calendar__table-day-view">
        ${this.orientation === 'horizontal'
          ? html`
              ${this._createDayTable(this._weeks)}
              ${this._wide ? this._createDayTable(this._nextMonthWeeks) : nothing}
            `
          : html`
              ${this._createDayTableVertical(this._weeks)}
              ${this._wide
                ? this._createDayTableVertical(this._nextMonthWeeks, nextMonthActiveDate)
                : nothing}
            `}
      </div>
    `;
  }

  /** Creates the label with the month for the daily view. */
  private _createLabelForDayView(d: T): TemplateResult {
    const monthLabel = `${
      this._monthNames[this._dateAdapter.getMonth(d) - 1]
    } ${this._dateAdapter.getYear(d)}`;
    return html`
      <button
        type="button"
        class="sbb-calendar__date-selection sbb-calendar__controls-change-date"
        aria-label="${i18nYearMonthSelection[this._language.current]} ${monthLabel}"
        @click=${() => {
          this._resetFocus = true;
          this._nextCalendarView = 'year';
          this._startTableTransition();
        }}
      >
        ${monthLabel}
        <sbb-icon name="chevron-small-down-small"></sbb-icon>
      </button>
    `;
  }

  /** Creates the aria-label for the daily view. */
  private _createAriaLabelForDayView(...dates: T[]): string {
    let monthLabel = '';
    for (const d of dates) {
      if (d) {
        monthLabel += `${
          this._monthNames[this._dateAdapter.getMonth(d) - 1]
        } ${this._dateAdapter.getYear(d)} `;
      }
    }
    return monthLabel;
  }

  /** Creates the calendar table for the daily view. */
  private _createDayTable(weeks: Day<T>[][]): TemplateResult {
    const today: string = this._dateAdapter.toIso8601(this.now);
    return html`
      <table
        class="sbb-calendar__table"
        @focusout=${(event: FocusEvent) =>
          this._handleTableBlur(event.relatedTarget as HTMLElement)}
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        <thead class="sbb-calendar__table-header">
          <tr class="sbb-calendar__table-header-row">
            ${this._weekdays.map(
              (day: Weekday) => html`
                <th class="sbb-calendar__table-header">
                  <sbb-screen-reader-only>${day.long}</sbb-screen-reader-only>
                  <span aria-hidden="true">${day.narrow}</span>
                </th>
              `,
            )}
          </tr>
        </thead>
        <tbody class="sbb-calendar__table-body">
          ${weeks.map((week: Day<T>[], rowIndex: number) => {
            const firstRowOffset: number = DAYS_PER_ROW - week.length;
            if (rowIndex === 0 && firstRowOffset) {
              return html`
                <tr>
                  ${[...Array(firstRowOffset).keys()].map(
                    () => html`<td class="sbb-calendar__table-data"></td>`,
                  )}
                  ${this._createDayCells(week, today)}
                </tr>
              `;
            }
            return html`<tr>
              ${this._createDayCells(week, today)}
            </tr>`;
          })}
        </tbody>
      </table>
    `;
  }

  /* Creates the table in orientation='vertical'. */
  private _createDayTableVertical(weeks: Day<T>[][], nextMonthActiveDate?: T): TemplateResult {
    const today: string = this._dateAdapter.toIso8601(this.now);
    const weekOffset = this._dateAdapter.getFirstWeekOffset(
      nextMonthActiveDate ?? this._activeDate,
    );
    return html`
      <table
        class="sbb-calendar__table"
        @focusout=${(event: FocusEvent) =>
          this._handleTableBlur(event.relatedTarget as HTMLElement)}
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        <tbody class="sbb-calendar__table-body">
          ${weeks.map((week: Day<T>[], rowIndex: number) => {
            const weekday = this._weekdays[rowIndex];
            return html`
              <tr>
                ${!nextMonthActiveDate
                  ? html` <td class="sbb-calendar__table-header">
                      <sbb-screen-reader-only>${weekday.long}</sbb-screen-reader-only>
                      <span aria-hidden="true">${weekday.narrow}</span>
                    </td>`
                  : nothing}
                ${rowIndex < weekOffset
                  ? html`<td class="sbb-calendar__table-data"></td>`
                  : nothing}
                ${this._createDayCells(week, today)}
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  /** Creates the cells for the daily view. */
  private _createDayCells(week: Day<T>[], today: string): TemplateResult[] {
    return week.map((day: Day<T>) => {
      const isOutOfRange = !this._isDayInRange(day.value);
      const isFilteredOut = !this._dateFilter(this._dateAdapter.deserialize(day.value)!);
      const selected: boolean = !!this._selected && day.value === this._selected;
      const isToday = day.value === today;
      return html`
        <td
          class=${classMap({
            'sbb-calendar__table-data': true,
            'sbb-calendar__table-data-selected': selected,
          })}
        >
          <button
            class=${classMap({
              'sbb-calendar__cell': true,
              'sbb-calendar__day': true,
              'sbb-calendar__cell-current': isToday,
              'sbb-calendar__selected': selected,
              'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
            })}
            @click=${() => this._selectDate(day.value)}
            ?disabled=${isOutOfRange || isFilteredOut}
            value=${day.value}
            type="button"
            aria-label=${this._dateAdapter.getAccessibilityFormatDate(day.value)}
            aria-pressed=${selected}
            aria-disabled=${isOutOfRange || isFilteredOut}
            aria-current=${isToday ? 'date' : nothing}
            tabindex="-1"
            @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt, day)}
            sbb-popover-close
          >
            ${day.dayValue}
          </button>
        </td>
      `;
    });
  }

  /** Render the view for the month selection. */
  private _renderMonthView(): TemplateResult {
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentYear(-1),
          i18nPreviousYear[this._language.current],
          this._previousYearDisabled(),
        )}
        <div class="sbb-calendar__controls-month">${this._createLabelForMonthView()}</div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentYear(1),
          i18nNextYear[this._language.current],
          this._nextYearDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-container sbb-calendar__table-month-view">
        ${this._createMonthTable(this._months, this._chosenYear!)}
        ${this._wide ? this._createMonthTable(this._months, this._chosenYear! + 1) : nothing}
      </div>
    `;
  }

  /** Creates the label with the year for the monthly view. */
  private _createLabelForMonthView(): TemplateResult {
    return html` <button
        type="button"
        id="sbb-calendar__month-selection"
        class="sbb-calendar__controls-change-date"
        aria-label=${`${i18nCalendarDateSelection[this._language.current]} ${this._chosenYear}`}
        @click=${() => this._resetCalendarView(true)}
      >
        ${this._chosenYear} ${this._wide ? ` - ${this._chosenYear! + 1}` : nothing}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </button>
      <sbb-screen-reader-only role="status"> ${this._chosenYear} </sbb-screen-reader-only>`;
  }

  /** Creates the table for the month selection view. */
  private _createMonthTable(months: Month[][], year: number): TemplateResult {
    return html`
      <table
        class="sbb-calendar__table"
        @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
      >
        ${this._wide
          ? html`<thead class="sbb-calendar__table-header" aria-hidden="true">
              <tr class="sbb-calendar__table-header-row">
                <th class="sbb-calendar__table-header" colspan=${MONTHS_PER_ROW}>${year}</th>
              </tr>
            </thead>`
          : nothing}
        <tbody class="sbb-calendar__table-body">
          ${months.map(
            (row: Month[]) => html`
              <tr>
                ${row.map((month: Month) => {
                  const isOutOfRange = !this._isMonthInRange(month.monthValue, year);
                  const isFilteredOut = !this._isMonthFilteredOut(month.monthValue, year);
                  const selectedMonth = this._selected
                    ? this._dateAdapter.getMonth(this._dateAdapter.deserialize(this._selected)!)
                    : undefined;
                  const selectedYear = this._selected
                    ? this._dateAdapter.getYear(this._dateAdapter.deserialize(this._selected)!)
                    : undefined;
                  const selected: boolean =
                    !!this._selected && year === selectedYear && month.monthValue === selectedMonth;

                  const isCurrentMonth =
                    year === this._dateAdapter.getYear(this.now) &&
                    this._dateAdapter.getMonth(this.now) === month.monthValue;

                  return html` <td
                    class=${classMap({
                      'sbb-calendar__table-data': true,
                      'sbb-calendar__table-month': true,
                    })}
                  >
                    <button
                      class=${classMap({
                        'sbb-calendar__cell': true,
                        'sbb-calendar__pill': true,
                        'sbb-calendar__cell-current': isCurrentMonth,
                        'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                        'sbb-calendar__selected': selected,
                      })}
                      @click=${() => this._onMonthSelection(month.monthValue, year)}
                      ?disabled=${isOutOfRange || isFilteredOut}
                      aria-label=${`${month.longValue} ${year}`}
                      aria-pressed=${selected}
                      aria-disabled=${String(isOutOfRange || isFilteredOut)}
                      tabindex="-1"
                      data-month=${month.monthValue || nothing}
                      @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                    >
                      ${month.value}
                    </button>
                  </td>`;
                })}
              </tr>
            `,
          )}
        </tbody>
      </table>
    `;
  }

  /** Select the month and change the view to day selection. */
  private _onMonthSelection(month: number, year: number): void {
    this._chosenMonth = month;
    this._nextCalendarView = 'day';
    this._init(
      this._dateAdapter.createDate(
        year,
        this._chosenMonth,
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
    this._startTableTransition();
  }

  /** Render the view for the year selection. */
  private _renderYearView(): TemplateResult {
    return html`
      <div class="sbb-calendar__controls">
        ${this._getArrow(
          'left',
          () => this._goToDifferentYearRange(-YEARS_PER_PAGE),
          i18nPreviousYearRange(YEARS_PER_PAGE)[this._language.current],
          this._previousYearRangeDisabled(),
        )}
        <div class="sbb-calendar__controls-month">${this._createLabelForYearView()}</div>
        ${this._getArrow(
          'right',
          () => this._goToDifferentYearRange(YEARS_PER_PAGE),
          i18nNextYearRange(YEARS_PER_PAGE)[this._language.current],
          this._nextYearRangeDisabled(),
        )}
      </div>
      <div class="sbb-calendar__table-container sbb-calendar__table-year-view">
        ${this._createYearTable(this._years)}
        ${this._wide ? this._createYearTable(this._nextMonthYears, true) : nothing}
      </div>
    `;
  }

  /** Creates the button arrow for all the views. */
  private _getArrow(
    direction: 'left' | 'right',
    click: () => void,
    ariaLabel: string,
    disabled: boolean,
  ): TemplateResult {
    return html`<sbb-secondary-button
      size="m"
      icon-name="chevron-small-${direction}-small"
      aria-label=${ariaLabel}
      @click=${click}
      ?disabled=${disabled}
      id="sbb-calendar__controls-${direction === 'left' ? 'previous' : 'next'}"
    ></sbb-secondary-button>`;
  }

  /** Creates the label with the year range for the yearly view. */
  private _createLabelForYearView(): TemplateResult {
    const firstYear: number = this._years.flat()[0];
    const lastYearArray: number[] = (this._wide ? this._nextMonthYears : this._years).flat();
    const lastYear: number = lastYearArray[lastYearArray.length - 1];
    const yearLabel = `${firstYear} - ${lastYear}`;
    return html`
      <button
        type="button"
        id="sbb-calendar__year-selection"
        class="sbb-calendar__controls-change-date"
        aria-label="${i18nCalendarDateSelection[this._language.current]} ${yearLabel}"
        @click=${() => this._resetCalendarView(true)}
      >
        ${yearLabel}
        <sbb-icon name="chevron-small-up-small"></sbb-icon>
      </button>
      <sbb-screen-reader-only role="status"> ${yearLabel} </sbb-screen-reader-only>
    `;
  }

  /** Creates the table for the year selection view. */
  private _createYearTable(years: number[][], shiftRight = false): TemplateResult {
    const now = this.now;
    return html` <table
      class="sbb-calendar__table"
      @animationend=${(e: AnimationEvent) => this._tableAnimationEnd(e)}
    >
      <tbody class="sbb-calendar__table-body">
        ${years.map(
          (row: number[]) =>
            html` <tr>
              ${row.map((year: number) => {
                const isOutOfRange = !this._isYearInRange(year);
                const isFilteredOut = !this._isYearFilteredOut(year);
                const selectedYear = this._selected
                  ? this._dateAdapter.getYear(this._dateAdapter.deserialize(this._selected)!)
                  : undefined;
                const selected: boolean = !!this._selected && year === selectedYear;
                const isCurrentYear = this._dateAdapter.getYear(now) === year;
                return html` <td class="sbb-calendar__table-data sbb-calendar__table-year">
                  <button
                    class=${classMap({
                      'sbb-calendar__cell': true,
                      'sbb-calendar__pill': true,
                      'sbb-calendar__cell-current': isCurrentYear,
                      'sbb-calendar__crossed-out': !isOutOfRange && isFilteredOut,
                      'sbb-calendar__selected': selected,
                    })}
                    @click=${() => this._onYearSelection(year, shiftRight)}
                    ?disabled=${isOutOfRange || isFilteredOut}
                    aria-label=${year}
                    aria-pressed=${selected}
                    aria-disabled=${String(isOutOfRange || isFilteredOut)}
                    tabindex="-1"
                    data-year=${year || nothing}
                    @keydown=${(evt: KeyboardEvent) => this._handleKeyboardEvent(evt)}
                  >
                    ${year}
                  </button>
                </td>`;
              })}
            </tr>`,
        )}
      </tbody>
    </table>`;
  }

  /** Select the year and change the view to month selection. */
  private _onYearSelection(year: number, rightSide: boolean): void {
    this._chosenYear = rightSide ? year - 1 : year;
    this._nextCalendarView = 'month';
    this._assignActiveDate(
      this._dateAdapter.createDate(
        this._chosenYear,
        this._dateAdapter.getMonth(this._activeDate),
        this._dateAdapter.getDate(this._activeDate),
      ),
    );
    this._startTableTransition();
  }

  private _getView(): TemplateResult {
    if (isServer || this.hydrationRequired) {
      // TODO: We disable SSR for calendar for now. Figure our, if there is a way
      // to enable it, while considering i18n and date information.
      return html`${nothing}`;
    }
    switch (this._calendarView) {
      case 'year':
        return this._renderYearView();
      case 'month':
        return this._renderMonthView();
      case 'day':
      default:
        return this._renderDayView();
    }
  }

  private _tableAnimationEnd(event: AnimationEvent): void {
    const table = event.target as HTMLElement;
    if (event.animationName === 'hide') {
      table.classList.remove('sbb-calendar__table-hide');
      this._resetFocus = true;
      this._calendarView = this._nextCalendarView;
    } else if (event.animationName === 'show') {
      this.removeAttribute('data-transition');
    }
  }

  private _startTableTransition(): void {
    this.toggleAttribute('data-transition', true);
    this.shadowRoot
      ?.querySelectorAll('table')
      ?.forEach((e) => e.classList.toggle('sbb-calendar__table-hide'));
  }

  protected override render(): TemplateResult {
    return html`<div class="sbb-calendar__wrapper">${this._getView()}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-calendar': SbbCalendarElement;
  }
}
