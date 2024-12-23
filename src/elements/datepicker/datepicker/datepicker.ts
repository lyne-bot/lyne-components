import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyValues,
  type TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { readConfig } from '../../core/config.js';
import { SbbLanguageController } from '../../core/controllers.js';
import { type DateAdapter, defaultDateAdapter } from '../../core/datetime.js';
import { forceType } from '../../core/decorators.js';
import { findInput, findReferencedElement } from '../../core/dom.js';
import { EventEmitter, forwardEvent } from '../../core/eventing.js';
import { i18nDateChangedTo, i18nDatePickerPlaceholder } from '../../core/i18n.js';
import type { SbbDateLike, SbbValidationChangeEvent } from '../../core/interfaces.js';
import type { SbbDatepickerButton } from '../common.js';
import type { SbbDatepickerToggleElement } from '../datepicker-toggle.js';

import style from './datepicker.scss?lit&inline';

export interface SbbInputUpdateEvent {
  disabled?: boolean;
  readonly?: boolean;
  min?: string | number;
  max?: string | number;
}

/**
 * Given a SbbDatepickerPreviousDayElement, a SbbDatepickerNextDayElement or a SbbDatepickerToggleElement component,
 * it returns the related SbbDatepickerElement reference, if exists.
 * @param element The element potentially connected to the SbbDatepickerElement.
 * @param trigger The id or the reference of the SbbDatePicker.
 */
export function getDatePicker<T = Date>(
  element: SbbDatepickerButton<T> | SbbDatepickerToggleElement<T>,
  trigger?: string | HTMLElement,
): SbbDatepickerElement<T> | null | undefined {
  if (!trigger) {
    return element
      .closest?.('sbb-form-field')
      ?.querySelector<SbbDatepickerElement<T>>('sbb-datepicker');
  }

  return findReferencedElement<SbbDatepickerElement<T>>(trigger);
}

export const datepickerControlRegisteredEventFactory = (): CustomEvent =>
  new CustomEvent('datepickerControlRegistered', {
    bubbles: false,
    composed: true,
  });

/**
 * Combined with a native input, it displays the input's value as a formatted date.
 *
 * @event {CustomEvent<void>} change - Notifies that the connected input has changes.
 * @event {CustomEvent<void>} input - Notifies that the connected input fired the input event.
 * @event {CustomEvent<SbbInputUpdateEvent>} inputUpdated - Notifies that the attributes of the input connected to the datepicker have changes.
 * @event {CustomEvent<void>} datePickerUpdated - Notifies that the attributes of the datepicker have changes.
 * @event {CustomEvent<SbbValidationChangeEvent>} validationChange - Emits whenever the internal validation state changes.
 */
export
@customElement('sbb-datepicker')
class SbbDatepickerElement<T = Date> extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    change: 'change',
    inputUpdated: 'inputUpdated',
    datePickerUpdated: 'datePickerUpdated',
    validationChange: 'validationChange',
  } as const;

  /** If set to true, two months are displayed. */
  @forceType()
  @property({ type: Boolean })
  public accessor wide: boolean = false;

  /** A function used to filter out dates. */
  @property({ attribute: false }) public accessor dateFilter: (date: T | null) => boolean = () =>
    true;

  /** Reference of the native input connected to the datepicker. */
  @property() public accessor input: string | HTMLElement | null = null;

  /** A configured date which acts as the current date instead of the real current date. Recommended for testing purposes. */
  @property()
  public set now(value: SbbDateLike<T> | null) {
    this._now = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get now(): T {
    return this._now ?? this._dateAdapter.today();
  }
  private _now?: T | null;

  /** The currently selected date as a Date or custom date provider instance. */
  @property({ attribute: false })
  public set valueAsDate(value: SbbDateLike<T> | null) {
    this._valueAsDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (this._tryApplyFormatToInput()) {
      /* Emit blur event when value is changed programmatically to notify
      frameworks that rely on that event to update form status. */
      this._inputElement!.dispatchEvent(new Event('blur', { composed: true }));
    }
  }
  public get valueAsDate(): T | null {
    return this._valueAsDate ?? null;
  }
  private _valueAsDate?: T | null;

  /** Notifies that the connected input has changes. */
  private _change: EventEmitter = new EventEmitter(this, SbbDatepickerElement.events.change, {
    bubbles: true,
  });

  /** Notifies that the attributes of the input connected to the datepicker have changes. */
  private _inputUpdated: EventEmitter<SbbInputUpdateEvent> = new EventEmitter(
    this,
    SbbDatepickerElement.events.inputUpdated,
    { bubbles: true, cancelable: true },
  );

  /** Notifies that the attributes of the datepicker have changes. */
  private _datePickerUpdated: EventEmitter = new EventEmitter(
    this,
    SbbDatepickerElement.events.datePickerUpdated,
    {
      bubbles: true,
      cancelable: true,
    },
  );

  /** Emits whenever the internal validation state changes. */
  private _validationChange: EventEmitter<SbbValidationChangeEvent> = new EventEmitter(
    this,
    SbbDatepickerElement.events.validationChange,
  );

  @state()
  private accessor _inputElement: HTMLInputElement | null = null;
  private _inputElementPlaceholderMutable = false;

  private _datePickerController!: AbortController;

  private _inputObserver = !isServer
    ? new MutationObserver((mutationsList) => {
        this._emitInputUpdated();
        // TODO: Decide whether to remove this logic by adding a value property to the datepicker.
        if (this._inputElement && mutationsList?.some((e) => e.attributeName === 'value')) {
          const value = this._inputElement.getAttribute('value');
          this.valueAsDate = this._dateAdapter.parse(value, this.now) ?? value;
        }
      })
    : null;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  private _language = new SbbLanguageController(this).withHandler(() => {
    if (this._inputElement) {
      if (this._inputElementPlaceholderMutable) {
        this._inputElement.placeholder = i18nDatePickerPlaceholder[this._language.current];
      }
      if (this.valueAsDate) {
        this._inputElement.value = this._dateAdapter.format(this.valueAsDate);
      }
    }
  });

  public constructor() {
    super();
    this.addEventListener?.('datepickerControlRegistered', () => this._emitInputUpdated());
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._attachInput();
    if (this._inputElement) {
      this._emitInputUpdated();
    }
  }

  public override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('input')) {
      this._attachInput();
    }
    if (
      changedProperties.has('wide') ||
      changedProperties.has('dateFilter') ||
      changedProperties.has('now')
    ) {
      this._datePickerUpdated.emit();
    }
    if (changedProperties.has('valueAsDate')) {
      this._setAriaLiveMessage();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._inputObserver?.disconnect();
    this._datePickerController?.abort();
  }

  protected override firstUpdated(changedProperties: PropertyValues<this>): void {
    super.firstUpdated(changedProperties);
    this._setAriaLiveMessage();
  }

  /**
   * @internal
   * Whether a custom now is configured.
   */
  public hasCustomNow(): boolean {
    return !!this._now;
  }

  private _attachInput(): void {
    const input = findInput(this, this.input);
    if (this._inputElement === input) {
      return;
    } else if (this._inputElement) {
      this._datePickerController?.abort();
      this._inputObserver?.disconnect();
    }

    this._inputElement = input;
    if (input) {
      this._datePickerController = new AbortController();
      this._inputObserver?.observe(input, {
        attributeFilter: ['disabled', 'readonly', 'min', 'max', 'value'],
      });

      this._inputElementPlaceholderMutable = !input.placeholder;
      input.type = 'text';
      if (this._inputElementPlaceholderMutable) {
        input.placeholder = i18nDatePickerPlaceholder[this._language.current];
      }

      const options: AddEventListenerOptions = { signal: this._datePickerController.signal };
      input.addEventListener(
        'input',
        (e) => {
          forwardEvent(e, this);
          this._parseInput();
        },
        options,
      );
      input.addEventListener('change', () => this._handleInputChange(), options);
      this._parseInput(true);
      this._tryApplyFormatToInput();
      this._validateDate();
    }
  }

  private _emitInputUpdated(): void {
    const { disabled, readOnly: readonly, min, max } = this._inputElement ?? {};
    this._inputUpdated.emit({ disabled, readonly, min, max });
  }

  private _handleInputChange(): void {
    if (this._tryApplyFormatToInput()) {
      return;
    }
    this._validateDate();
    this._setAriaLiveMessage();
    this._change.emit();
  }

  private _tryApplyFormatToInput(): boolean {
    if (!this._inputElement) {
      return false;
    }

    const formattedDate = this.valueAsDate ? this._dateAdapter.format(this.valueAsDate!) : '';
    if (formattedDate && this._inputElement.value !== formattedDate) {
      // In order to support React onChange event, we have to get the setter and call it.
      // https://github.com/facebook/react/issues/11600#issuecomment-345813130
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setValue.call(this._inputElement, formattedDate);

      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this._inputElement.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      return true;
    }

    return false;
  }

  private _validateDate(): void {
    if (!this._inputElement) {
      return;
    }

    const isEmptyOrValid = !this._inputElement.value || this._isDateAvailable();
    const wasValid = !this._inputElement.hasAttribute('data-sbb-invalid');
    this._inputElement.toggleAttribute('data-sbb-invalid', !isEmptyOrValid);
    if (wasValid !== isEmptyOrValid) {
      this._validationChange.emit({ valid: isEmptyOrValid });
    }
  }

  private _parseInput(deserializeAsFallback = false): void {
    const value = this._inputElement!.value;
    // We are assigning directly to the private backing property of valueAsDate
    // as we don't want to trigger a blur event during this time.
    this._valueAsDate = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.parse(value, this.now),
    );
    if (deserializeAsFallback && !this._valueAsDate) {
      this._valueAsDate = this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value),
      );
    }
  }

  private _setAriaLiveMessage(): void {
    const containerElement: HTMLParagraphElement | null | undefined =
      this.shadowRoot?.querySelector?.<HTMLParagraphElement>('#status-container');

    if (!containerElement) {
      return;
    } else if (!this.valueAsDate) {
      containerElement.innerText = '';
    } else {
      const date = this._dateAdapter.format(this.valueAsDate, { weekdayStyle: 'long' });
      containerElement.innerText = `${i18nDateChangedTo[this._language.current]} ${date}`;
    }
  }

  protected override render(): TemplateResult {
    return html`<p id="status-container" role="status"></p>`;
  }

  /**
   * Calculates the first available date before the given one,
   * considering the SbbDatepickerElement `dateFilter` property and `min` parameter (e.g. from the self-named input's attribute).
   * @param date The starting date for calculations.
   */
  public findPreviousAvailableDate(date: T): T {
    const previousDate = this._findAvailableDate(date, -1);
    const dateMin = this._dateAdapter.deserialize(this._inputElement?.min);

    if (
      !dateMin ||
      (this._dateAdapter.isValid(dateMin) &&
        this._dateAdapter.compareDate(previousDate, dateMin) >= 0)
    ) {
      return previousDate;
    }
    return date;
  }

  /**
   * Calculates the first available date after the given one,
   * considering the SbbDatepickerElement `dateFilter` property and `max` parameter (e.g. from the self-named input's attribute).
   * @param date The starting date for calculations.
   */
  public findNextAvailableDate(date: T): T {
    const nextDate = this._findAvailableDate(date, 1);
    const dateMax = this._dateAdapter.deserialize(this._inputElement?.max);

    if (
      !dateMax ||
      (this._dateAdapter.isValid(dateMax) && this._dateAdapter.compareDate(nextDate, dateMax) <= 0)
    ) {
      return nextDate;
    }
    return date;
  }

  /**
   * Returns the first available date before or after a given one, considering the `dateFilter` property.
   * @param date The starting date for calculations.
   * @param delta The number of days to add/subtract from the starting one.
   */
  private _findAvailableDate(date: T, delta: number): T {
    let availableDate = this._dateAdapter.addCalendarDays(date, delta);

    if (this.dateFilter) {
      while (!this.dateFilter(availableDate)) {
        availableDate = this._dateAdapter.addCalendarDays(availableDate, delta);
      }
    }

    return availableDate;
  }

  /**
   * Checks if valueAsDate is valid, considering the SbbDatepickerElement `dateFilter` property
   * and `min` and `max` parameters (e.g. from the self-named input's attributes).
   */
  private _isDateAvailable(): boolean {
    if (!this.valueAsDate) {
      return false;
    }

    const dateMin = this._dateAdapter.deserialize(this._inputElement?.min);
    const dateMax = this._dateAdapter.deserialize(this._inputElement?.max);

    if (
      (this._dateAdapter.isValid(dateMin) &&
        this._dateAdapter.compareDate(this.valueAsDate, dateMin!) < 0) ||
      (this._dateAdapter.isValid(dateMax) &&
        this._dateAdapter.compareDate(this.valueAsDate, dateMax!) > 0)
    ) {
      return false;
    }

    return this.dateFilter ? this.dateFilter(this.valueAsDate) : true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-datepicker': SbbDatepickerElement;
  }

  interface GlobalEventHandlersEventMap {
    inputUpdated: CustomEvent<SbbInputUpdateEvent>;
  }
}
