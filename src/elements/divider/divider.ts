import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../core/decorators.js';
import type { SbbOrientation } from '../core/interfaces.js';
import { SbbNegativeMixin } from '../core/mixins.js';

import style from './divider.scss?lit&inline';

/**
 * It displays a divider between sections.
 */
export
@customElement('sbb-divider')
@hostAttributes({
  role: 'separator',
})
class SbbDividerElement extends SbbNegativeMixin(LitElement) {
  public static override styles: CSSResultGroup = style;

  /** Orientation property with possible values 'horizontal' | 'vertical'. Defaults to horizontal. */
  @property({ reflect: true }) public accessor orientation: SbbOrientation = 'horizontal';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  protected override render(): TemplateResult {
    return html` <div class="sbb-divider"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-divider': SbbDividerElement;
  }
}
