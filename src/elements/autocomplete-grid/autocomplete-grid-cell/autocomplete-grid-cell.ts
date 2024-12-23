import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './autocomplete-grid-cell.scss?lit&inline';

/**
 * A wrapper component for autocomplete-grid action button.
 *
 * @slot - Use the unnamed slot to add a `sbb-autocomplete-grid-button` element.
 */
export
@customElement('sbb-autocomplete-grid-cell')
@hostAttributes({
  role: 'gridcell',
})
class SbbAutocompleteGridCellElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-autocomplete-grid-cell">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-cell': SbbAutocompleteGridCellElement;
  }
}
