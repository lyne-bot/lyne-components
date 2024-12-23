import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';

import { SbbLanguageController } from '../core/controllers.js';
import { findInput } from '../core/dom.js';
import { EventEmitter, forwardEvent } from '../core/eventing.js';
import { i18nTimeInputChange } from '../core/i18n.js';
import type { SbbDateLike, SbbValidationChangeEvent } from '../core/interfaces.js';

import style from './time-input.scss?lit&inline';

const REGEX_ALLOWED_CHARACTERS = /[0-9.:,\-;_hH]/;
const REGEX_GROUPS_WITHOUT_COLON = /^([0-9]{1,2})([0-9]{2})$/;
const REGEX_GROUPS_WITH_COLON = /^([0-9]{1,2})?[.:,\-;_hH]?([0-9]{1,2})?$/;

interface Time {
  hours: number;
  minutes: number;
}

/**
 * * Combined with a native input, it displays the input's value as a formatted time.
 *
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 * @event {CustomEvent<SbbValidationChangeEvent>} validationChange - Emits whenever the internal validation state changes.
 */
export
@customElement('sbb-time-input')
class SbbTimeInputElement extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
    validationChange: 'validationChange',
  } as const;

  /** Reference of the native input connected to the datepicker. */
  @property()
  public set input(value: string | HTMLElement | null) {
    this._input = value;
    this._findInputElement();
  }
  public get input(): string | HTMLElement | null {
    return this._input;
  }
  private _input: string | HTMLElement | null = null;

  @state() private accessor _inputElement: HTMLInputElement | null = null;

  /** Formats the current input's value as date. */
  @property({ attribute: false })
  public set valueAsDate(date: SbbDateLike | null) {
    if (!date || !this._inputElement) {
      return;
    }
    const dateObj = date instanceof Date ? date : new Date(date);

    this._inputElement.value = this._formatValue({
      hours: dateObj.getHours(),
      minutes: dateObj.getMinutes(),
    });

    // Emit blur event when value is changed programmatically to notify
    // frameworks that rely on that event to update form status.
    this._inputElement.dispatchEvent(new FocusEvent('blur', { composed: true }));
  }
  public get valueAsDate(): Date | null {
    return this._formatValueAsDate(this._parseInput(this._inputElement?.value)) ?? null;
  }

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbTimeInputElement.events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  /** Emits whenever the internal validation state changes. */
  private _validationChange: EventEmitter<SbbValidationChangeEvent> = new EventEmitter(
    this,
    SbbTimeInputElement.events.validationChange,
    {
      bubbles: true,
      composed: false,
    },
  );

  private _statusContainer!: HTMLParagraphElement;
  private _abortController = new AbortController();
  private _language = new SbbLanguageController(this);

  public override connectedCallback(): void {
    super.connectedCallback();

    this._findInputElement();
    if (this._inputElement) {
      this._updateValue(this._inputElement.value);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._abortController?.abort();
  }

  private _findInputElement(): void {
    const oldInput = this._inputElement;
    this._inputElement = findInput(this, this.input);

    if (oldInput !== this._inputElement) {
      this._registerInputElement();
    }
  }

  private _registerInputElement(): void {
    this._abortController?.abort();

    if (!this._inputElement) {
      return;
    }

    this._abortController = new AbortController();

    // Configure input
    this._inputElement.toggleAttribute('data-sbb-time-input', true);
    this._inputElement.type = 'text';
    this._inputElement.inputMode = 'numeric';
    this._inputElement.maxLength = 5;
    if (!this._inputElement.placeholder) {
      this._inputElement.placeholder = 'HH:MM';
    }

    this._inputElement.addEventListener('input', (event: Event) => forwardEvent(event, this), {
      signal: this._abortController.signal,
    });
    this._inputElement.addEventListener(
      'keydown',
      (event: KeyboardEvent) => this._preventCharInsert(event),
      { signal: this._abortController.signal },
    );
    this._inputElement.addEventListener(
      'change',
      (event: Event) => this._updateValue((event.target as HTMLInputElement).value),
      {
        signal: this._abortController.signal,
        capture: true,
      },
    );
    this._inputElement.addEventListener(
      'change',
      (event: Event) => {
        this._emitChange(event);
        this._updateAccessibilityMessage();
      },
      {
        signal: this._abortController.signal,
      },
    );
  }

  /**
   * Updates `value` and `valueAsDate`. The direct update on the `_inputElement` is required
   * to force the input change when the typed value is the same of the current one.
   */
  private _updateValue(value: string): void {
    // Reset accessibility message
    if (this._statusContainer) {
      this._statusContainer.innerText = '';
    }
    if (!this._inputElement) {
      return;
    }

    const time = this._parseInput(value);
    const isTimeValid = !!time && this._isTimeValid(time);
    const isEmptyOrValid = !value || value.trim() === '' || isTimeValid;
    if (isEmptyOrValid && time) {
      // In order to support React onChange event, we have to get the setter and call it.
      // https://github.com/facebook/react/issues/11600#issuecomment-345813130
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;
      setValue.call(this._inputElement, this._formatValue(time));

      this._inputElement.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
    }

    const wasValid = !this._inputElement.hasAttribute('data-sbb-invalid');
    this._inputElement.toggleAttribute('data-sbb-invalid', !isEmptyOrValid);
    if (wasValid !== isEmptyOrValid) {
      this._validationChange.emit({ valid: isEmptyOrValid });
    }
  }

  /** Emits the change event. */
  private _emitChange(event: Event): void {
    forwardEvent(event, this);
    this._didChange.emit();
  }

  /** Returns the right format for the `value` property. */
  private _formatValue(time: Time): string {
    const hours = String(time.hours).padStart(2, '0');
    const minutes = String(time.minutes).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Returns the right format for the `valueAsDate` property:
   * sets the start date at 01.01.1970, then adds the typed hours/minutes.
   */
  private _formatValueAsDate(time: Time | null | undefined): Date | null {
    if (!time || !this._isTimeValid(time)) {
      return null;
    }

    return new Date(new Date(0).setHours(time.hours, time.minutes, 0, 0));
  }

  /** Checks if values of hours and minutes are possible, to avoid non-existent times. */
  private _isTimeValid(time: Time): boolean {
    return time.hours < 24 && time.minutes < 60;
  }

  /** Validate input against the defined RegExps. */
  private _parseInput(value: string | undefined): Time | null {
    const trimmedValue = value?.trim();
    if (!trimmedValue) {
      return null;
    }

    // Special case: the input is 3 or 4 digits; split like: AB?:CD
    const match = trimmedValue.match(REGEX_GROUPS_WITHOUT_COLON);
    if (match) {
      return { hours: +match[1] || 0, minutes: +match[2] || 0 };
    }

    const matchColon = trimmedValue.match(REGEX_GROUPS_WITH_COLON);
    if (matchColon) {
      return { hours: +matchColon[1] || 0, minutes: +matchColon[2] || 0 };
    }

    return null;
  }

  /**  Only allow typing numbers and separator keys. */
  private _preventCharInsert(event: KeyboardEvent): void {
    const alwaysAllowed = [
      'Backspace',
      'Tab',
      'Enter',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'PageUp',
      'PageDown',
      'Delete',
    ];

    if (
      !event.ctrlKey &&
      !event.altKey &&
      !event.metaKey &&
      !alwaysAllowed.includes(event.key) &&
      !REGEX_ALLOWED_CHARACTERS.test(event.key)
    ) {
      event.preventDefault();
    }
  }

  // We use a programmatic approach to avoid initial setting the message
  // and to not immediately change output if language should change (no reason to read out message).
  private _updateAccessibilityMessage(): void {
    const valid = !this._inputElement!.hasAttribute('data-sbb-invalid');
    if (!valid) {
      return;
    }

    this._statusContainer.innerText = `${i18nTimeInputChange[this._language.current]} ${
      this._inputElement?.value
    }.`;
  }

  protected override render(): TemplateResult {
    return html`
      <p
        role="status"
        ${ref((el?: Element) => (this._statusContainer = el as HTMLParagraphElement))}
      ></p>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-time-input': SbbTimeInputElement;
  }
}
