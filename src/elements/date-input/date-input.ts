import { isServer, LitElement, type CSSResultGroup, type PropertyDeclaration } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { readConfig } from '../core/config.js';
import { type DateAdapter, defaultDateAdapter } from '../core/datetime.js';
import { dateConverter, DateOnlyType, forceType } from '../core/decorators.js';
import {
  i18nDateMax,
  i18nDateMin,
  i18nDateInvalid,
  i18nDatePickerPlaceholder,
} from '../core/i18n.js';
import {
  SbbFormAssociatedInputMixin,
  type FormRestoreReason,
  type FormRestoreState,
} from '../core/mixins.js';

import style from './date-input.scss?lit&inline';

// As documented in form-associated-mixin.ts, we extend the prototype of
// ValidityState with custom error states for the date input.
Object.assign(ValidityState.prototype, {
  get sbbDateFilter(): boolean {
    return false;
  },
});

/**
 * Custom input for a date.
 */
export
@customElement('sbb-date-input')
class SbbDateInputElement<T = Date> extends SbbFormAssociatedInputMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _placeholderMutable = false;

  /**
   * The value of the date input. Reflects the current text value
   * of this input.
   * @attr Accepts ISO8601 formatted values, which will be
   * formatted according to the current locale.
   */
  public override set value(value: string) {
    this._tryParseValue(value);
    // As long as this element has focus we delay automatically updating
    // the value with the formatted string of the parsed date.
    if (!isServer && !this.matches(':focus') && this.valueAsDate !== null) {
      value = this._formatDate();
    }
    super.value = value;
  }
  public override get value(): string {
    return super.value ?? '';
  }

  @forceType()
  @property({ attribute: false, type: DateOnlyType })
  public set valueAsDate(value: T | null) {
    // Due to forceType and DateOnlyType, the given value
    // is either null or a date only copy of the original
    // value passed to valueAsDate.
    if (!value) {
      this._valueAsDate = null;
      this._valueCache = ['', null];
      this.value = '';
    } else if (
      !this._dateAdapter.isDateInstance(this._valueAsDate) ||
      this._dateAdapter.compareDate(this._valueAsDate!, value!) !== 0
    ) {
      // Align with the native date input, as it copies the value of
      // the given date and does not retain the original instance.
      this._valueAsDate = value;
      const stringValue = this._formatDate();
      this._valueCache = [stringValue, this._valueAsDate];
      this.value = stringValue;
    }
  }
  public get valueAsDate(): T | null {
    return this._valueAsDate ?? null;
  }
  private _valueAsDate?: T | null;

  @forceType()
  @property({ converter: dateConverter, reflect: true, type: DateOnlyType })
  public accessor min: T | null = null;

  @forceType()
  @property({ converter: dateConverter, reflect: true, type: DateOnlyType })
  public accessor max: T | null = null;

  /** A function used to filter out dates. */
  @property({ attribute: false }) public accessor dateFilter: (date: T | null) => boolean = () =>
    true;

  /**
   * How to format the displayed date.
   * `short`: Two letter abbreviation of the week day (e.g. Fr).
   * `none`: The weekday is not displayed.
   */
  @property({ attribute: 'weekday-style' })
  public accessor weekdayStyle: 'short' | 'none' = 'short';

  /**
   * Stores the last string and parsed date object value to prevent repeated
   * parsing of the string value.
   */
  private _valueCache?: [string, T | null];

  public constructor() {
    super();
    this.addEventListener?.('change', () => this._updateValueDateFormat(), { capture: true });
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    if (!this.placeholder) {
      this._placeholderMutable = true;
      this.placeholder = i18nDatePickerPlaceholder[this.language.current];
    }
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (this.hasUpdated && !name) {
      this._updateValueDateFormat();
      if (this._placeholderMutable) {
        this.placeholder = i18nDatePickerPlaceholder[this.language.current];
      }
    }
  }

  /**
   *  Called when the browser is trying to restore element’s state to state in which case
   *  reason is “restore”, or when the browser is trying to fulfill autofill on behalf of
   *  user in which case reason is “autocomplete”.
   *  In the case of “restore”, state is a string, File, or FormData object
   *  previously set as the second argument to setFormValue.
   *
   * @internal
   */
  public override formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    if (state && typeof state === 'string') {
      this.value = state;
    }
  }

  protected override updateFormValue(): void {
    this._tryParseValue();
    const formValue =
      this.valueAsDate !== null ? this._dateAdapter.toIso8601(this.valueAsDate) : null;
    this.internals.setFormValue(formValue, this.value);
  }

  private _tryParseValue(value = this.value): void {
    if (this._valueCache?.[0] !== value) {
      this._valueAsDate = this._dateAdapter.parse(value);
      this._valueCache = [value, this._valueAsDate];
    }
  }

  private _updateValueDateFormat(): void {
    if (this.valueAsDate) {
      const formattedDate = this._formatDate();
      if (this.value !== formattedDate) {
        super.value = formattedDate;
      }
    }
  }

  private _formatDate(): string {
    return this._dateAdapter.format(this.valueAsDate, { weekdayStyle: this.weekdayStyle });
  }

  protected override shouldValidate(name: PropertyKey | undefined): boolean {
    return super.shouldValidate(name) || ['valueAsDate', 'min', 'max'].includes(name as string);
  }

  protected override validate(): void {
    super.validate();
    if (!this.value) {
      this._removeValidityErrors();
    } else if (!this._dateAdapter.isValid(this.valueAsDate)) {
      this.setValidityFlag('badInput', i18nDateInvalid[this.language.current]);
    } else if (
      this._dateAdapter.isValid(this.min) &&
      this._dateAdapter.compareDate(this.min, this.valueAsDate) > 0
    ) {
      this.setValidityFlag(
        'rangeUnderflow',
        i18nDateMin(this._dateAdapter.format(this.min, { weekdayStyle: 'none' }))[
          this.language.current
        ],
      );
    } else if (
      this._dateAdapter.isValid(this.max) &&
      this._dateAdapter.compareDate(this.valueAsDate, this.max) > 0
    ) {
      this.setValidityFlag(
        'rangeOverflow',
        i18nDateMax(this._dateAdapter.format(this.max, { weekdayStyle: 'none' }))[
          this.language.current
        ],
      );
    } else if (this.dateFilter && !this.dateFilter(this.valueAsDate)) {
      this.setValidityFlag('sbbDateFilter', i18nDateInvalid[this.language.current]);
    } else {
      this._removeValidityErrors();
    }
  }

  private _removeValidityErrors(): void {
    (['badInput', 'rangeUnderflow', 'rangeOverflow', 'sbbDateFilter'] as const).forEach((f) =>
      this.removeValidityFlag(f),
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-date-input': SbbDateInputElement;
  }

  interface CustomValidityState {
    sbbDateFilter: boolean;
  }
}
