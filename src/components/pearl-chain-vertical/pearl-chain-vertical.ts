import { CSSResult, html, LitElement, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './pearl-chain-vertical.scss?lit&inline';

/**
 * It can be used as a container for the `sbb-pearl-chain-vertical-item` component.
 *
 * @slot - The unnamed slot is used for the `sbb-pearl-chain-vertical-item` component.
 */
@customElement('sbb-pearl-chain-vertical')
export class SbbPearlChainVertical extends LitElement {
  public static override styles: CSSResult = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-pearl-chain-vertical">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-pearl-chain-vertical': SbbPearlChainVertical;
  }
}
