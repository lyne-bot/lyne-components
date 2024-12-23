import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './autocomplete-grid-row.scss?lit&inline';

let autocompleteRowNextId = 0;

/**
 * The component is used as a wrapper for options and action buttons.
 *
 * @slot - Use the unnamed slot to add a `sbb-autocomplete-grid-option` and a `sbb-autocomplete-grid-cell` with one or more `sbb-autocomplete-grid-button`.
 */
export
@customElement('sbb-autocomplete-grid-row')
@hostAttributes({
  role: 'row',
})
class SbbAutocompleteGridRowElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  public override connectedCallback(): void {
    super.connectedCallback();
    this.id ||= `sbb-autocomplete-grid-row-${++autocompleteRowNextId}`;
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-autocomplete-grid-row">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-row': SbbAutocompleteGridRowElement;
  }
}
