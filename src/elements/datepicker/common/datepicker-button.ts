import { html, type PropertyValues, type TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';

import { SbbButtonBaseElement } from '../../core/base-elements.js';
import { readConfig } from '../../core/config.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import { i18nToday } from '../../core/i18n.js';
import { SbbNegativeMixin } from '../../core/mixins.js';
import {
  datepickerControlRegisteredEventFactory,
  getDatePicker,
  type SbbDatepickerElement,
  type SbbInputUpdateEvent,
} from '../datepicker.js';

import '../../icon.js';

export abstract class SbbDatepickerButton<T = Date> extends SbbNegativeMixin(SbbButtonBaseElement) {
  /** Datepicker reference. */
  @property({ attribute: 'date-picker' }) public accessor datePicker:
    | string
    | SbbDatepickerElement<T>
    | null = null;

  /** The boundary date (min/max) as set in the date-picker's input. */
  @state() protected accessor boundary: string | number | null = null;

  /** Whether the component is disabled due date equals to boundary date. */
  private _disabled = false;

  /** Whether the component is disabled due date-picker's input disabled. */
  private _inputDisabled = false;

  protected datePickerElement?: SbbDatepickerElement<T> | null = null;
  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;
  private _datePickerController!: AbortController;
  private _language = new SbbLanguageController(this).withHandler(() => this._setAriaLabel());

  protected abstract iconName: string;
  protected abstract i18nOffBoundaryDay: Record<string, string>;
  protected abstract i18nSelectOffBoundaryDay: (_currentDate: string) => Record<string, string>;

  public constructor() {
    super();
    this.addEventListener?.('click', () => this._handleClick());
  }

  protected abstract findAvailableDate(_date: T): T;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._syncUpstreamProperties();
    if (!this.datePicker) {
      this._init();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('datePicker')) {
      this._init(this.datePicker!);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._datePickerController?.abort();
  }

  private _setDisabledState(): void {
    const pickerValueAsDate = this.datePickerElement?.valueAsDate;

    if (!pickerValueAsDate) {
      this._disabled = true;
      this._setDisabledRenderAttributes(true);
      return;
    }

    const availableDate: T = this.findAvailableDate(pickerValueAsDate);
    this._disabled = this._dateAdapter.compareDate(availableDate, pickerValueAsDate) === 0;
    this._setDisabledRenderAttributes();
  }

  private _handleClick(): void {
    if (!this.datePickerElement || this.hasAttribute('data-disabled')) {
      return;
    }
    const startingDate: T = this.datePickerElement.valueAsDate ?? this.datePickerElement.now;
    const date: T = this.findAvailableDate(startingDate);
    if (this._dateAdapter.compareDate(date, startingDate) !== 0) {
      this.datePickerElement.valueAsDate = date;
    }
  }

  private _syncUpstreamProperties(): void {
    const formField = this.closest?.('sbb-form-field') ?? this.closest?.('[data-form-field]');
    if (formField) {
      this.negative = formField.hasAttribute('negative');

      const inputElement = formField.querySelector('input');

      if (inputElement) {
        this._inputDisabled =
          inputElement.hasAttribute('disabled') || inputElement.hasAttribute('readonly');
        this._setDisabledRenderAttributes();
      }
    }
  }

  private _init(picker?: string | SbbDatepickerElement<T>): void {
    this._datePickerController?.abort();
    this._datePickerController = new AbortController();
    this.datePickerElement = getDatePicker(this, picker);
    this._setDisabledState();
    if (!this.datePickerElement) {
      // If the component is attached to the DOM before the datepicker, it has to listen for the datepicker init,
      // assuming that the two components share the same parent element.
      this.parentElement?.addEventListener(
        'inputUpdated',
        (e: CustomEvent<SbbInputUpdateEvent>) => this._init(e.target as SbbDatepickerElement<T>),
        { once: true, signal: this._datePickerController.signal },
      );
      return;
    }
    this._setAriaLabel();

    this.datePickerElement.addEventListener(
      'change',
      () => {
        this._setDisabledState();
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this.datePickerElement.addEventListener(
      'datePickerUpdated',
      () => {
        this._setDisabledState();
        this._setAriaLabel();
      },
      { signal: this._datePickerController.signal },
    );
    this.datePickerElement.addEventListener(
      'inputUpdated',
      (event: CustomEvent<SbbInputUpdateEvent>) => {
        this._inputDisabled = !!(event.detail.disabled || event.detail.readonly);
        this._setDisabledRenderAttributes();
        this._setAriaLabel();
        this._setDisabledState();
      },
      { signal: this._datePickerController.signal },
    );

    this.datePickerElement.dispatchEvent(datepickerControlRegisteredEventFactory());
  }

  private _setAriaLabel(): void {
    const currentDate = this.datePickerElement?.valueAsDate;

    if (!currentDate || !this._dateAdapter.isValid(currentDate)) {
      this.setAttribute('aria-label', this.i18nOffBoundaryDay[this._language.current]);
      return;
    }

    const currentDateString =
      this.datePickerElement &&
      this._dateAdapter.compareDate(this.datePickerElement.now, currentDate) === 0
        ? i18nToday[this._language.current].toLowerCase()
        : this._dateAdapter.getAccessibilityFormatDate(currentDate);

    this.setAttribute(
      'aria-label',
      this.i18nSelectOffBoundaryDay(currentDateString)[this._language.current],
    );
  }

  private _setDisabledRenderAttributes(
    isDisabled: boolean = this._disabled || this._inputDisabled,
  ): void {
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
