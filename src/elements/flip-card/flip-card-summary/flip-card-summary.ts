import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { hostAttributes } from '../../core/decorators.js';

import style from './flip-card-summary.scss?lit&inline';

export type SbbFlipCardImageAlignment = 'after' | 'below';

/**
 * Combined with a `sbb-flip-card`, it displays its content when the card is not flipped.
 *
 * @slot - Use the unnamed slot to provide a title for the `sbb-flip-card-summary`.
 * @slot image - Use this slot to provide an image for the `sbb-flip-card-summary`.
 */
export
@customElement('sbb-flip-card-summary')
@hostAttributes({
  slot: 'summary',
})
class SbbFlipCardSummaryElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The position where to render the image. */
  @property({ attribute: 'image-alignment', reflect: true })
  public accessor imageAlignment: SbbFlipCardImageAlignment = 'after';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('imageAlignment')) {
      this.closest?.('sbb-flip-card')?.setAttribute('data-image-alignment', this.imageAlignment);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-flip-card-summary">
        <slot></slot>
        <div class="sbb-flip-card-summary--image-wrapper">
          <slot name="image"></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-flip-card-summary': SbbFlipCardSummaryElement;
  }
}
