import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../core/decorators.js';

import style from './loading-indicator.scss?lit&inline';

/**
 * It displays a loading indicator.
 */
export
@customElement('sbb-loading-indicator')
@hostAttributes({
  role: 'progressbar',
  'aria-busy': 'true',
})
class SbbLoadingIndicatorElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Size variant, either s or m. */
  @property({ reflect: true }) public accessor size: 's' | 'l' | 'xl' | 'xxl' | 'xxxl' = 's';

  /** Color variant. */
  @property({ reflect: true }) public accessor color: 'default' | 'smoke' | 'white' = 'default';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element">
          <span>
            <span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator': SbbLoadingIndicatorElement;
  }
}
