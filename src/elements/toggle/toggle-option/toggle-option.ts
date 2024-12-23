import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, hostAttributes, slotState } from '../../core/decorators.js';
import { setOrRemoveAttribute } from '../../core/dom.js';
import { SbbIconNameMixin } from '../../icon.js';
import type { SbbToggleElement } from '../toggle.js';

import style from './toggle-option.scss?lit&inline';

/**
 * It displays a toggle option within a `sbb-toggle`.
 *
 * @slot - Use the unnamed slot to add content to the label of the toggle option.
 * @slot icon - Slot used to render the `sbb-icon`.
 */
export
@customElement('sbb-toggle-option')
@hostAttributes({
  role: 'radio',
})
@slotState()
class SbbToggleOptionElement extends SbbIconNameMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Whether the toggle-option is checked. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor checked: boolean = false;

  /** Whether the toggle option is disabled. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor disabled: boolean = false;

  /** Value of toggle-option. */
  @property()
  public set value(value: string) {
    this._value = `${value}`;
  }
  public get value(): string {
    return this._value;
  }
  private _value: string = '';

  private _toggle?: SbbToggleElement;

  public constructor() {
    super();
    // We need to listen input event on host as with keyboard navigation
    // the Input Event is triggered from sbb-toggle.
    this.addEventListener?.('input', () => this._handleInput());
    this.addEventListener?.('click', () => this.shadowRoot!.querySelector('label')?.click());
  }

  public override connectedCallback(): void {
    super.connectedCallback();

    // We can use closest here, as we expect the parent sbb-toggle to be in light DOM.
    this._toggle = this.closest?.('sbb-toggle') ?? undefined;
    this._verifyTabindex();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.setAttribute('aria-checked', `${this.checked}`);
      this._verifyTabindex();
      if (this.checked) {
        this._uncheckOtherOptions();
      }
    }
    if (changedProperties.has('disabled')) {
      this._handleDisabledChange();
    }
  }

  private _uncheckOtherOptions(): void {
    this._toggle?.options.filter((o) => o !== this).forEach((o) => (o.checked = false));
    this._toggle?.updatePillPosition(false);
  }

  private _handleDisabledChange(): void {
    // Enforce disabled state from parent.
    if (!this._toggle) {
      // Ignore illegal state. Our expectation  is that a sbb-toggle-option
      // always has a parent sbb-toggle.
    } else if (this._toggle.disabled && !this.disabled) {
      this.disabled = true;
    } else if (!this._toggle.disabled && this.disabled) {
      this.disabled = false;
    }
    setOrRemoveAttribute(this, 'aria-disabled', this.disabled ? `true` : null);
    this._verifyTabindex();
  }

  private _handleInput(): void {
    if (this.disabled) {
      return;
    }
    this.checked = true;
    this._uncheckOtherOptions();
  }

  private _verifyTabindex(): void {
    this.tabIndex = this.checked && !this.disabled ? 0 : -1;
  }

  protected override render(): TemplateResult {
    return html`
      <input
        type="radio"
        id="sbb-toggle-option-id"
        aria-hidden="true"
        tabindex="-1"
        ?inert=${this.checked}
        ?disabled=${this.disabled}
        .checked=${this.checked || nothing}
        .value=${this.value || nothing}
        @click=${(event: PointerEvent) => event.stopPropagation()}
      />
      <label class="sbb-toggle-option" for="sbb-toggle-option-id">
        ${this.renderIconSlot()}
        <span class="sbb-toggle-option__label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-option': SbbToggleOptionElement;
  }
}
