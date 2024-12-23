import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../core/decorators.js';
import type { SbbProtectiveRoom } from '../core/interfaces.js';

import style from './signet.scss?lit&inline';

export type SbbSignetProtectiveRoom = SbbProtectiveRoom | 'panel';

/**
 * It displays the SBB signet.
 *
 * @cssprop [--sbb-signet-height=auto] - Can be used to set the height of the signet.
 */
export
@customElement('sbb-signet')
class SbbSignetElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Visual protective room around signet. */
  @property({ attribute: 'protective-room', reflect: true })
  public accessor protectiveRoom: SbbSignetProtectiveRoom = 'ideal';

  /** Accessibility label which will be forwarded to the inner SVG signet. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = 'Logo';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-signet">
        <span class="sbb-signet__svg-container">
          ${this.protectiveRoom === 'panel'
            ? html`
                <svg focusable="false" viewBox="0 0 143 48" xmlns="http://www.w3.org/2000/svg">
                  <title .textContent=${this.accessibilityLabel}></title>
                  <path id="sbb-signet__panel" stroke-width="1" d="M1 47h141V1H1v46z"></path>
                  <path
                    id="sbb-signet__icon"
                    d="M87 40h9.3L83.8 27.7h15.5V40h7.4V27.7h15.6L109.7 40h9.3l16-16-15.9-16h-9.3l12.5 12.3h-15.6V8h-7.4v12.3H83.8L96.3 8H87L71 24l16 16z"
                  ></path>
                </svg>
              `
            : html`
                <svg focusable="false" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
                  <title .textContent=${this.accessibilityLabel}></title>
                  <path
                    id="sbb-signet__icon"
                    d="M20.0265 40H31.6821L16 24.6154H35.3907V40H44.6093V24.6154H64.106L48.4238 40H60.0795L80 20.0531L60.0795 0H48.4238L64.106 15.3846H44.6093V0H35.3907V15.3846H16L31.6821 0H20.0265L0 20.0531L20.0265 40Z"
                  ></path>
                </svg>
              `}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-signet': SbbSignetElement;
  }
}
