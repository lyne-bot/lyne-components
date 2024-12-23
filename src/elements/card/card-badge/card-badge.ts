import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './card-badge.scss?lit&inline';

/**
 * It displays content within a badge.
 *
 * @slot - Use the unnamed slot to add content to the badge.
 *   Content parts should be wrapped in `<span>` tags to achieve correct spacings.
 */
export
@customElement('sbb-card-badge')
@hostAttributes({
  slot: 'badge',
  role: 'text',
})
class SbbCardBadgeElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Color of the card badge. */
  @property({ reflect: true }) public accessor color: 'charcoal' | 'white' = 'charcoal';

  private _parentElement?: HTMLElement | null;

  public override connectedCallback(): void {
    super.connectedCallback();
    this._parentElement = this.parentElement;
    if (this._parentElement) {
      this._parentElement.toggleAttribute('data-has-card-badge', true);
    }
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._parentElement) {
      this._parentElement.removeAttribute('data-has-card-badge');
    }
    this._parentElement = undefined;
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-card-badge-wrapper">
        <span class="sbb-card-badge">
          <span class="sbb-card-badge-background" aria-hidden="true"></span>
          <span class="sbb-card-badge-content">
            <slot></slot>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card-badge': SbbCardBadgeElement;
  }
}
