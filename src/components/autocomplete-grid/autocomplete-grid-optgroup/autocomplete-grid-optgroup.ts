import type { CSSResultGroup, TemplateResult, PropertyValues } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { isSafari, isValidAttribute, setAttribute } from '../../core/dom';
import { SbbDisabledMixin, SbbHydrationMixin } from '../../core/mixins';
import { AgnosticMutationObserver } from '../../core/observers';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option';

import style from './autocomplete-grid-optgroup.scss?lit&inline';
import '../../divider';

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
@customElement('sbb-autocomplete-grid-optgroup')
export class SbbAutocompleteGridOptgroupElement extends SbbDisabledMixin(
  SbbHydrationMixin(LitElement),
) {
  public static override styles: CSSResultGroup = style;

  /** Option group label. */
  @property() public label!: string;

  @state() private _negative = false;

  private _negativeObserver = new AgnosticMutationObserver(() => this._onNegativeChange());

  /**
   * On Safari, the groups labels are not read by VoiceOver.
   * To solve the problem, we remove the role="group" and add a hidden span containing the group name
   * TODO: We should periodically check if it has been solved and, if so, remove the property.
   */
  private _inertAriaGroups = isSafari();

  private get _options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? [],
    ) as SbbAutocompleteGridOptionElement[];
  }

  private get _buttons(): SbbAutocompleteGridButtonElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-button') ?? [],
    ) as SbbAutocompleteGridButtonElement[];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._negativeObserver?.disconnect();
    this._negative = !!this.closest?.(`:is(sbb-autocomplete-grid, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this._negative);

    this._negativeObserver.observe(this, {
      attributes: true,
      attributeFilter: ['data-negative'],
    });

    this._proxyGroupLabelToOptions();
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);
    if (changedProperties.has('disabled')) {
      this._proxyDisabledToOptions();
    }
    if (changedProperties.has('label')) {
      this._proxyGroupLabelToOptions();
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._negativeObserver?.disconnect();
  }

  private _handleSlotchange(): void {
    this._proxyDisabledToOptions();
    this._proxyGroupLabelToOptions();
    this._highlightOptions();
  }

  private _proxyGroupLabelToOptions(): void {
    if (!this._inertAriaGroups) {
      return;
    } else if (this.label) {
      for (const option of this._options) {
        option.setAttribute('data-group-label', this.label);
        option.requestUpdate?.();
      }
    } else {
      for (const option of this._options) {
        option.removeAttribute('data-group-label');
        option.requestUpdate?.();
      }
    }
  }

  private _proxyDisabledToOptions(): void {
    for (const el of [...this._options, ...this._buttons]) {
      el.toggleAttribute('data-group-disabled', this.disabled);
    }
  }

  private _highlightOptions(): void {
    const autocomplete = this.closest('sbb-autocomplete-grid');
    if (!autocomplete) {
      return;
    }
    const value = autocomplete.triggerElement?.value;
    if (!value) {
      return;
    }
    this._options.forEach((opt) => opt.highlight(value));
  }

  private _onNegativeChange(): void {
    this._negative = isValidAttribute(this, 'data-negative');
  }

  protected override render(): TemplateResult {
    setAttribute(this, 'role', !this._inertAriaGroups ? 'group' : null);
    setAttribute(this, 'aria-label', !this._inertAriaGroups && this.label);
    setAttribute(this, 'aria-disabled', !this._inertAriaGroups && this.disabled.toString());

    return html`
      <div class="sbb-optgroup__divider">
        <sbb-divider ?negative=${this._negative}></sbb-divider>
      </div>
      <div class="sbb-optgroup__label" aria-hidden="true">
        <div class="sbb-optgroup__icon-space"></div>
        <span>${this.label}</span>
      </div>
      <slot @slotchange=${this._handleSlotchange}></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-optgroup': SbbAutocompleteGridOptgroupElement;
  }
}
