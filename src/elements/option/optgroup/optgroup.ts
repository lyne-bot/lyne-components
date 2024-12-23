import { customElement } from 'lit/decorators.js';

import type { SbbAutocompleteElement } from '../../autocomplete.js';
import type { SbbOptionElement } from '../option.js';

import { SbbOptgroupBaseElement } from './optgroup-base-element.js';

/**
 * It can be used as a container for one or more `sbb-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-option` elements to the `sbb-optgroup`.
 */
export
@customElement('sbb-optgroup')
class SbbOptGroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbOptionElement[] {
    return Array.from(this.querySelectorAll?.('sbb-option') ?? []) as SbbOptionElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteElement | null {
    return this.closest?.('sbb-autocomplete') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest?.(`:is(sbb-autocomplete, sbb-select, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this.negative);
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.toggleAttribute('data-multiple', !!this.closest('sbb-select[multiple]'));
    this._setVariantByContext();
  }

  private _setVariantByContext(): void {
    if (this.closest?.('sbb-autocomplete')) {
      this.setAttribute('data-variant', 'autocomplete');
    } else if (this.closest?.('sbb-select')) {
      this.setAttribute('data-variant', 'select');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-optgroup': SbbOptGroupElement;
  }
}
