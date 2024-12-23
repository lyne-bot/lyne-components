import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';

import { forceType, hostAttributes } from '../core/decorators.js';
import { EventEmitter, forwardEvent } from '../core/eventing.js';
import {
  type FormRestoreReason,
  type FormRestoreState,
  SbbDisabledMixin,
  SbbFormAssociatedMixin,
} from '../core/mixins.js';

import style from './slider.scss?lit&inline';

import '../icon.js';

/**
 * It displays an input knob that can be moved in a range.
 *
 * @slot prefix - Use this slot to render an icon on the left side of the input.
 * @slot suffix - Use this slot to render an icon on the right side of the input.
 * @event {CustomEvent<void>} didChange - Deprecated. used for React. Will probably be removed once React 19 is available.
 */
export
@customElement('sbb-slider')
@hostAttributes({
  tabindex: '0',
})
class SbbSliderElement extends SbbDisabledMixin(SbbFormAssociatedMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;
  public static readonly events = {
    didChange: 'didChange',
  } as const;

  /**
   * Value of the form element.
   * If no value is provided, default is the middle point between min and max.
   */
  @property()
  public override set value(value: string | null) {
    if (this._isValidNumber(value)) {
      super.value = this._boundBetweenMinMax(value!);
    } else {
      super.value = this._getDefaultValue();
    }
    this.internals.ariaValueNow = this.value;
    this._calculateValueFraction();
  }
  public override get value(): string {
    return super.value!;
  }

  /** Numeric value for the inner HTMLInputElement. */
  @property({ attribute: 'value-as-number', type: Number })
  public set valueAsNumber(value: number | null) {
    this.value = value?.toString() ?? null;
  }
  public get valueAsNumber(): number | null {
    return Number(this.value);
  }

  /** Minimum acceptable value for the inner HTMLInputElement. */
  @property()
  public set min(value: string) {
    if (!this._isValidNumber(value!)) {
      return;
    }

    this._min = value;
    this.value = this._boundBetweenMinMax(this.value);
  }
  public get min(): string {
    return this._min;
  }
  private _min: string = '0';

  /** Maximum acceptable value for the inner HTMLInputElement. */
  @property()
  public set max(value: string) {
    if (!this._isValidNumber(value!)) {
      return;
    }

    this._max = value;
    this.value = this._boundBetweenMinMax(this.value);
  }
  public get max(): string {
    return this._max;
  }
  private _max: string = '100';

  /**
   * Readonly state for the inner HTMLInputElement.
   * Since the input range does not allow this attribute, it will be merged with the `disabled` one.
   */
  @forceType()
  @property({ type: Boolean })
  public accessor readonly: boolean = false;

  /** Name of the icon at component's start, which will be forward to the nested `sbb-icon`. */
  @forceType()
  @property({ attribute: 'start-icon' })
  public accessor startIcon: string = '';

  /** Name of the icon at component's end, which will be forward to the nested `sbb-icon`. */
  @forceType()
  @property({ attribute: 'end-icon' })
  public accessor endIcon: string = '';

  /**
   * Form type of element.
   * @default 'range'
   */
  public override get type(): string {
    return 'range';
  }

  /**
   * The ratio between the absolute value and the validity interval.
   * E.g. given `min=0`, `max=100` and `value=50`, then `_valueFraction=0.5`
   */
  @state() private accessor _valueFraction = 0;

  /**
   * @deprecated only used for React. Will probably be removed once React 19 is available.
   */
  private _didChange: EventEmitter = new EventEmitter(this, SbbSliderElement.events.didChange, {
    bubbles: true,
    cancelable: true,
  });

  /** Reference to the inner HTMLInputElement with type='range'. */
  private _rangeInput!: HTMLInputElement;

  public constructor() {
    super();
    /** @internal */
    this.internals.role = 'slider';
    this.addEventListener?.('keydown', (e) => this._handleKeydown(e));
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    if (!this.value) {
      this.value = this._getDefaultValue();
    }
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('min')) {
      this.internals.ariaValueMin = this.min;
    }
    if (changedProperties.has('max')) {
      this.internals.ariaValueMax = this.max;
    }
    if (changedProperties.has('readonly')) {
      this.internals.ariaReadOnly = Boolean(this.readonly).toString();
    }
  }

  /**
   * The reset value is the attribute value (the setup value). If not present, calculates the default.
   * @internal
   */
  public formResetCallback(): void {
    this.value = this.getAttribute('value') ?? this._getDefaultValue();
  }

  /**
   * @internal
   */
  public formStateRestoreCallback(
    state: FormRestoreState | null,
    _reason: FormRestoreReason,
  ): void {
    this.value = state as string | null;
  }

  protected override updateFormValue(): void {
    this.internals.setFormValue(this.value);
  }

  /**
   *  If no value is provided, default is the middle point between min and max
   *  (see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range#value)
   */
  private _getDefaultValue(): string {
    return (+this.min + (+this.max - +this.min) / 2).toString();
  }

  private _isValidNumber(value: string | null): boolean {
    return !!value && !isNaN(Number(value));
  }

  /**
   * Restrains the value between the min and max
   */
  private _boundBetweenMinMax(value: string): string {
    return Math.max(+this.min, Math.min(+this.max, +value)).toString();
  }

  private _calculateValueFraction(): void {
    const value = this.valueAsNumber!;
    const min = +this.min;
    const max = +this.max;

    const mathFraction: number = (value - min) / (max - min);
    this._valueFraction = isNaN(mathFraction) ? 0 : Math.max(0, Math.min(1, mathFraction));
  }

  private async _handleKeydown(event: KeyboardEvent): Promise<void> {
    if (event.key !== 'Tab') {
      event.preventDefault();
    }

    if (this.readonly) {
      return;
    }

    if (event.key === 'Home') {
      this._rangeInput.value = this.min;
    } else if (event.key === 'End') {
      this._rangeInput.value = this.max;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      this._rangeInput.stepDown();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      this._rangeInput.stepUp();
    } else if (event.key === 'PageDown') {
      this._rangeInput.stepDown((+this.max - +this.min) / 10);
    } else if (event.key === 'PageUp') {
      this._rangeInput.stepUp((+this.max - +this.min) / 10);
    } else {
      return;
    }

    // We have to manually fire events because programmatic changes don't trigger them
    this._rangeInput.dispatchEvent(
      new InputEvent('input', { bubbles: true, cancelable: true, composed: true }),
    );
    this._rangeInput.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /** Emits the change event. */
  private _emitChange(event: Event): void {
    forwardEvent(event, this);
    this._didChange.emit();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-slider__height-container">
        <div class="sbb-slider__wrapper">
          <slot name="prefix">
            ${this.startIcon ? html`<sbb-icon name="${this.startIcon}"></sbb-icon>` : nothing}
          </slot>
          <div
            class="sbb-slider__container"
            style=${styleMap({ '--sbb-slider-value-fraction': this._valueFraction.toString() })}
          >
            <input
              tabindex="-1"
              min=${this.min}
              max=${this.max}
              ?disabled=${this.disabled || this.formDisabled || this.readonly}
              value=${this.value || nothing}
              class="sbb-slider__range-input"
              type="range"
              @change=${(event: Event) => this._emitChange(event)}
              @input=${() => (this.value = this._rangeInput.value)}
              ${ref((input?: Element) => (this._rangeInput = input as HTMLInputElement))}
            />
            <div class="sbb-slider__line">
              <div class="sbb-slider__selected-line"></div>
            </div>
            <div class="sbb-slider__knob"></div>
          </div>
          <slot name="suffix">
            ${this.endIcon ? html`<sbb-icon name="${this.endIcon}"></sbb-icon>` : nothing}
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-slider': SbbSliderElement;
  }
}
