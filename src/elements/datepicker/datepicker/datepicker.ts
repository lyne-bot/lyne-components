import {
  type CSSResultGroup,
  html,
  isServer,
  LitElement,
  type PropertyDeclaration,
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
import type { SbbDateInputElement } from '../../date-input.js';
import { SbbDatepickerAssociationHostController, type SbbDatepickerButton } from '../common.js';
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
 * @deprecated No longer in use.
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

/**
 * @deprecated No longer in use.
 */
export const datepickerControlRegisteredEventFactory = (): CustomEvent =>
  new CustomEvent('datepickerControlRegistered', {
    bubbles: false,
    composed: true,
  });

let nextId = 0;
const isDateInput = <T>(
  element: HTMLInputElement | SbbDateInputElement<T> | null,
): element is SbbDateInputElement<T> => element?.localName === 'sbb-date-input';

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

  /**
   * A function used to filter out dates.
   * @deprecated Use dateFilter from SbbDateInputElement.
   */
  @property({ attribute: false })
  public set dateFilter(value: (date: T | null) => boolean) {
    this._dateFilter = value;
  }
  public get dateFilter(): (date: T | null) => boolean {
    return (
      this._dateFilter ??
      (isDateInput(this.inputElement) ? this.inputElement.dateFilter : null) ??
      (() => true)
    );
  }
  private _dateFilter?: (date: T | null) => boolean;

  /**
   * Reference of the sbb-date-input instance or the native input connected to the datepicker.
   * If given a string, it will be treated as an id reference and an attempt is
   * made to be resolved for the containing document fragment.
   * If given a HTMLElement instance, it will be used as is.
   */
  @property() public accessor input: string | HTMLElement | null = null;

  /**
   * A configured date which acts as the current date instead of the real current date.
   * Recommended for testing purposes.
   */
  @property()
  public set now(value: SbbDateLike<T> | null) {
    this._now = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  public get now(): T {
    return this._now ?? this._dateAdapter.today();
  }
  private _now?: T | null;

  /**
   * The currently selected date as a Date or custom date provider instance.
   * @deprecated Use valueAsDate from SbbDateInputElement.
   */
  @property({ attribute: false })
  public set valueAsDate(value: SbbDateLike<T> | null) {
    if (isDateInput(this.inputElement)) {
      this.inputElement.valueAsDate = this._dateAdapter.getValidDateOrNull(
        this._dateAdapter.deserialize(value),
      );
      return;
    }

    this._valueAsDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    if (this._tryApplyFormatToInput()) {
      // Emit blur event when value is changed programmatically to notify
      // frameworks that rely on that event to update form status.
      this.inputElement!.dispatchEvent(new Event('blur', { composed: true }));
    }
  }
  public get valueAsDate(): T | null {
    if (isDateInput(this.inputElement)) {
      return this.inputElement.valueAsDate;
    }

    return this._valueAsDate ?? null;
  }
  private _valueAsDate?: T | null;

  /** The resolved associated input element, as defined by `input`. */
  public get inputElement(): HTMLInputElement | SbbDateInputElement<T> | null {
    return this._inputElement;
  }
  @state() private accessor _inputElement: HTMLInputElement | SbbDateInputElement<T> | null = null;

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

  private _inputElementPlaceholderMutable = false;

  private _datePickerController!: AbortController;

  private _inputObserver = !isServer
    ? new MutationObserver((mutationsList) => {
        this._emitInputUpdated();
        this._associationController?.updateControls();
        // TODO: Decide whether to remove this logic by adding a value property to the datepicker.
        if (
          this.inputElement &&
          !isDateInput(this.inputElement) &&
          mutationsList?.some((e) => e.attributeName === 'value')
        ) {
          const value = this.inputElement.getAttribute('value');
          this.valueAsDate = this._dateAdapter.parse(value, this.now) ?? value;
        }
      })
    : null;

  private _dateAdapter: DateAdapter<T> = readConfig().datetime?.dateAdapter ?? defaultDateAdapter;

  private _language = new SbbLanguageController(this);
  private _associationController = new SbbDatepickerAssociationHostController(this);

  public constructor() {
    super();
  }

  public override connectedCallback(): void {
    this.id ||= `sbb-datepicker-${++nextId}`;
    super.connectedCallback();
    this._attachInput();
  }

  public override requestUpdate(
    name?: PropertyKey,
    oldValue?: unknown,
    options?: PropertyDeclaration,
  ): void {
    super.requestUpdate(name, oldValue, options);
    if (this.hasUpdated && !name && this.inputElement) {
      if (this._inputElementPlaceholderMutable) {
        this.inputElement.placeholder = i18nDatePickerPlaceholder[this._language.current];
      }
      if (this.valueAsDate) {
        this.inputElement.value = this._dateAdapter.format(this.valueAsDate);
      }
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
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
    const input = findInput(this, this.input, 'input,sbb-date-input');
    if (this.inputElement === input) {
      return;
    } else if (this.inputElement) {
      this._datePickerController?.abort();
      this._inputObserver?.disconnect();
    }
    const isNativeInput = !isDateInput(input);
    if (isNativeInput && import.meta.env.DEV) {
      console.warn(
        'Using <sbb-datepicker> with a native <input> is deprecated. Use a <sbb-date-input> instead of <input>.',
      );
    }

    this._inputElement = input;
    if (input) {
      this._datePickerController = new AbortController();
      this._inputObserver?.observe(input, {
        attributeFilter: ['disabled', 'readonly', 'min', 'max', 'value'],
      });

      if (isNativeInput) {
        this._inputElementPlaceholderMutable = !input.placeholder;
        input.type = 'text';
        if (this._inputElementPlaceholderMutable) {
          input.placeholder = i18nDatePickerPlaceholder[this._language.current];
        }
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
      this._emitInputUpdated();
      this._associationController?.updateControls();
    }
  }

  private _emitInputUpdated(): void {
    const { disabled, readOnly: readonly, min: minValue, max: maxValue } = this.inputElement ?? {};
    const min = (
      minValue && typeof minValue !== 'string' ? this._dateAdapter.toIso8601(minValue) : minValue
    ) as string | undefined;
    const max = (
      maxValue && typeof maxValue !== 'string' ? this._dateAdapter.toIso8601(maxValue) : maxValue
    ) as string | undefined;
    this._inputUpdated.emit({ disabled, readonly, min, max });
  }

  private _handleInputChange(): void {
    if (this._tryApplyFormatToInput()) {
      return;
    }
    this._validateDate();
    this._setAriaLiveMessage();
    this._change.emit();
    this._associationController?.updateControls();
  }

  private _tryApplyFormatToInput(): boolean {
    if (!this.inputElement || isDateInput(this.inputElement)) {
      return false;
    }

    const formattedDate = this.valueAsDate ? this._dateAdapter.format(this.valueAsDate!) : '';
    if (formattedDate && this.inputElement.value !== formattedDate) {
      // In order to support React onChange event, we have to get the setter and call it.
      // https://github.com/facebook/react/issues/11600#issuecomment-345813130
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setValue.call(this.inputElement, formattedDate);

      this.inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
      this.inputElement.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      return true;
    }

    return false;
  }

  private _validateDate(): void {
    if (!this.inputElement) {
      return;
    }

    const isEmptyOrValid = !this.inputElement.value || this._isDateAvailable();
    const wasValid = !this.inputElement.hasAttribute('data-sbb-invalid');
    this.inputElement.toggleAttribute('data-sbb-invalid', !isEmptyOrValid);
    if (wasValid !== isEmptyOrValid) {
      this._validationChange.emit({ valid: isEmptyOrValid });
    }
  }

  private _parseInput(deserializeAsFallback = false): void {
    if (isDateInput(this.inputElement)) {
      return;
    }

    const value = this.inputElement!.value;
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
    const dateMin = this._dateAdapter.deserialize(this.inputElement?.min);

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
    const dateMax = this._dateAdapter.deserialize(this.inputElement?.max);

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

    const dateMin = this._dateAdapter.deserialize(this.inputElement?.min);
    const dateMax = this._dateAdapter.deserialize(this.inputElement?.max);

    if (
      (this._dateAdapter.isValid(dateMin) &&
        this._dateAdapter.compareDate(this.valueAsDate, dateMin!) < 0) ||
      (this._dateAdapter.isValid(dateMax) &&
        this._dateAdapter.compareDate(this.valueAsDate, dateMax!) > 0)
    ) {
      return false;
    }

    return this.dateFilter?.(this.valueAsDate) ?? true;
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
