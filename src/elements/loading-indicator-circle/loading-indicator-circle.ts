import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../core/decorators.js';

import style from './loading-indicator-circle.scss?lit&inline';

/**
 * It displays a circle loading indicator.
 */
export
@customElement('sbb-loading-indicator-circle')
@hostAttributes({
  role: 'progressbar',
  'aria-busy': 'true',
})
class SbbLoadingIndicatorCircleElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Color variant. */
  @property({ reflect: true }) public accessor color: 'default' | 'smoke' | 'white' = 'default';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-loading-indicator">
        <span class="sbb-loading-indicator__animated-element"></span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-loading-indicator-circle': SbbLoadingIndicatorCircleElement;
  }
}
