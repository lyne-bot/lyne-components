import { CSSResultGroup, html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { setAttribute } from '../core/dom';

import style from './loading-indicator.scss?lit&inline';

/**
 * It displays a loading indicator.
 */
@customElement('sbb-loading-indicator')
export class SbbLoadingIndicator extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Variant of the loading indicator; `circle` is meant to be used inline, while `window` as overlay. */
  @property({ reflect: true }) public variant?: 'window' | 'circle';

  /** Size variant, either s or m. */
  @property({ reflect: true }) public size: 's' | 'l' = 's';

  /** Color variant. */
  @property({ reflect: true }) public color: 'default' | 'smoke' | 'white' = 'default';

  /** Whether the animation is enabled. */
  @property({ attribute: 'disable-animation', reflect: true, type: Boolean })
  public disableAnimation = false;

  protected override render(): TemplateResult {
    setAttribute(this, 'role', 'progressbar');
    setAttribute(this, 'aria-busy', 'true');

    return html`
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element">
          ${this.variant === 'window'
            ? html`<span>
                <span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </span>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator': SbbLoadingIndicator;
  }
}
