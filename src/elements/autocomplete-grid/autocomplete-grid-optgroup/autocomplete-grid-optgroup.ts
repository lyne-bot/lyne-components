import { customElement } from 'lit/decorators.js';

import { SbbOptgroupBaseElement } from '../../option/optgroup.js';
import type { SbbAutocompleteGridButtonElement } from '../autocomplete-grid-button.js';
import type { SbbAutocompleteGridOptionElement } from '../autocomplete-grid-option.js';
import type { SbbAutocompleteGridElement } from '../autocomplete-grid.js';

/**
 * It can be used as a container for one or more `sbb-autocomplete-grid-option`.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-option` elements to the `sbb-autocomplete-grid-optgroup`.
 */
export
@customElement('sbb-autocomplete-grid-optgroup')
class SbbAutocompleteGridOptgroupElement extends SbbOptgroupBaseElement {
  protected get options(): SbbAutocompleteGridOptionElement[] {
    return Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-option') ?? [],
    ) as SbbAutocompleteGridOptionElement[];
  }

  protected getAutocompleteParent(): SbbAutocompleteGridElement | null {
    return this.closest?.('sbb-autocomplete-grid') || null;
  }

  protected setAttributeFromParent(): void {
    this.negative = !!this.closest(`:is(sbb-autocomplete-grid, sbb-form-field)[negative]`);
    this.toggleAttribute('data-negative', this.negative);
  }

  protected override proxyDisabledToOptions(): void {
    super.proxyDisabledToOptions();
    const buttons = Array.from(
      this.querySelectorAll?.('sbb-autocomplete-grid-button') ?? [],
    ) as SbbAutocompleteGridButtonElement[];
    for (const el of buttons) {
      el.toggleAttribute('data-group-disabled', this.disabled);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-optgroup': SbbAutocompleteGridOptgroupElement;
  }
}
