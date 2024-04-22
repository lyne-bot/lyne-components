import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators/index.js';

import style from './autocomplete-grid-actions.scss?lit&inline';

/**
 * A wrapper component for autocomplete-grid action buttons.
 *
 * @slot - Use the unnamed slot to add `sbb-autocomplete-grid-button` elements.
 */
@customElement('sbb-autocomplete-grid-actions')
@hostAttributes({
  role: 'gridcell',
})
export class SbbAutocompleteGridActionsElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-autocomplete-grid-action">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-autocomplete-grid-actions': SbbAutocompleteGridActionsElement;
  }
}
