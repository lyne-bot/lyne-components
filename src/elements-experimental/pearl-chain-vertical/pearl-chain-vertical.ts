import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './pearl-chain-vertical.scss?lit&inline';

/**
 * It can be used as a container for the `sbb-pearl-chain-vertical-item` component.
 *
 * @slot - The unnamed slot is used for the `sbb-pearl-chain-vertical-item` component.
 */
export
@customElement('sbb-pearl-chain-vertical')
class SbbPearlChainVerticalElement extends LitElement {
  public static override styles: CSSResultGroup = style;

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
    'sbb-pearl-chain-vertical': SbbPearlChainVerticalElement;
  }
}
