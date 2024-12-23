import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './lead-container.scss?lit&inline';

/**
 * The `sbb-lead-container` can be used for product pages to display a lead image and following content.
 *
 * @slot - Use the unnamed slot to add any content to the container.
 * @slot image - Use the image slot to provide the lead image.
 * `sbb-image`, `img` and `picture` elements are supported.
 * For other elements the aspect ratio has to be set manually.
 */
export
@customElement('sbb-lead-container')
class SbbLeadContainerElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-lead-container">
        <div class="sbb-lead-container-image">
          <slot name="image"></slot>
        </div>
        <!-- Content wrapper needed because grid needs to be applied but container image should not be touched by grid. -->
        <div class="sbb-lead-container-content-wrapper">
          <div class="sbb-lead-container-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-lead-container': SbbLeadContainerElement;
  }
}
