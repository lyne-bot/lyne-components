import { html, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { readConfig } from '../../core/config.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import { i18nToday } from '../../core/i18n.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbDateInputElement } from '../../date-input.js';
import type { SbbDatepickerElement } from '../datepicker.js';

import {
  SbbDatepickerAssociationControlController,
  type SbbDatepickerControl,
} from './datepicker-association-controllers.js';

import '../../icon.js';

const isDateInput = <T>(
  element: HTMLInputElement | SbbDateInputElement<T> | null,
): element is SbbDateInputElement<T> => element?.localName === 'sbb-date-input';

export abstract class SbbDatepickerButton<T = Date>
  extends SbbNegativeMixin(SbbButtonBaseElement)
  implements SbbDatepickerControl<T>
{
  /**
   * Datepicker reference.
   * @internal
   * @deprecated Use property/attribute `datepicker` instead.
   */
  @property({ attribute: 'date-picker' })
  public set datePicker(value: string | SbbDatepickerElement<T> | null) {
    if (import.meta.env.DEV) {
      console.warn(
        `Property datePicker/Attribute date-picker is deprecated. Use 'datepicker' instead.`,
      );
    }
    this.datepicker = value as unknown as SbbDatepickerElement<T> | null;
  }
  /** @internal */
  public get datePicker(): string | SbbDatepickerElement<T> | null {
    return this.datepicker;
  }

  /** Datepicker reference. */
  @property({ attribute: 'datepicker' })
  public set datepicker(value: SbbDatepickerElement<T> | null) {
    this._datepicker =
      typeof value === 'string'
        ? // In case the value is a string, it should be treated as an id reference
          // and attempt to be resolved.
          ((this.getRootNode?.() as ParentNode | undefined)?.querySelector?.(`#${value}`) ?? null)
        : value;
    this.datePickerElement = this._datepicker;
  }
  public get datepicker(): SbbDatepickerElement<T> | null {
    return this._datepicker ?? null;
  }
  private _datepicker?: SbbDatepickerElement<T> | null;

  /** The boundary date (min/max) as set in the date-picker's input. */
  @state() protected accessor boundary: string | number | null = null;

  /** Whether the component is disabled due date equals to boundary date. */
  private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  private _inputDisabled = false;

  /**
   * @deprecated Use datepicker instead.
   */
  protected datePickerElement?: SbbDatepickerElement<T> | null = null;
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _language = new SbbLanguageController(this);

  protected abstract iconName: string;
  protected abstract i18nOffBoundaryDay: Record<string, string>;
  protected abstract i18nSelectOffBoundaryDay: (_currentDate: string) => Record<string, string>;

  public constructor() {
    super();
    this.addController(new SbbDatepickerAssociationControlController(this));
    this.addEventListener?.('click', () => this._handleClick());
  }

  protected abstract findAvailableDate(_date: T): T;

  public override connectedCallback(): void {
    super.connectedCallback();
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = formField.hasAttribute('negative');
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (!this.datepicker || !this._dateAdapter.isValid(this.datepicker.valueAsDate)) {
      this._disabled = true;
      this.setAttribute('aria-label', this.i18nOffBoundaryDay[this._language.current]);
      this._setDisabledRenderAttributes();
      return;
    }

    const availableDate: T = this.findAvailableDate(this.datepicker.valueAsDate);
    this._disabled =
      this._dateAdapter.compareDate(availableDate, this.datepicker.valueAsDate) === 0;
    this._inputDisabled =
      (this.datepicker.inputElement?.disabled || this.datepicker.inputElement?.readOnly) ?? true;
    this._setDisabledRenderAttributes();

    const currentDateString =
      this._dateAdapter.compareDate(this.datepicker.now, this.datepicker.valueAsDate) === 0
        ? i18nToday[this._language.current].toLowerCase()
        : this._dateAdapter.getAccessibilityFormatDate(this.datepicker.valueAsDate);

    this.setAttribute(
      'aria-label',
      this.i18nSelectOffBoundaryDay(currentDateString)[this._language.current],
    );
  }

  private _handleClick(): void {
    if (!this.datepicker || this.hasAttribute('data-disabled')) {
      return;
    }
    const startingDate: T = this.datepicker.valueAsDate ?? this.datepicker.now;
    const date: T = this.findAvailableDate(startingDate);
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      const input = this.datepicker.inputElement;
      if (isDateInput(input)) {
        input.valueAsDate = date;
        input.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
        input.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        // Emit blur event when value is changed programmatically to notify
        // frameworks that rely on that event to update form status.
        input.dispatchEvent(new Event('blur', { composed: true }));
      } else {
        this.datepicker.valueAsDate = date;
      }
    }
  }

  private _setDisabledRenderAttributes(): void {
    const isDisabled = this._disabled || this._inputDisabled;
    this.toggleAttribute('data-disabled', isDisabled);
    if (isDisabled) {
      this.setAttribute('aria-disabled', 'true');
      this.removeAttribute('tabindex');
    } else {
      this.removeAttribute('aria-disabled');
      this.setAttribute('tabindex', '0');
    }
  }

  protected override renderTemplate(): TemplateResult {
    return html`<sbb-icon name=${this.iconName}></sbb-icon>`;
  }
}
