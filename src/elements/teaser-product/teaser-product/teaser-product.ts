import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbLinkBaseElement } from '../../core/base-elements.js';
import { SbbTeaserProductCommonElementMixin, teaserProductCommonStyle } from '../common.js';

import style from './teaser-product.scss?lit&inline';

import '../../screen-reader-only.js';

/**
 * Displays a text and a footnote, combined with an image, to tease a product
 *
 * @slot - Use this slot to provide the main content.
 * @slot image - Use this slot to provide an image or a `sbb-image` as a background.
 * @slot footnote - Use this slot to provide a footnote.
 * @cssprop [--sbb-teaser-product-background-gradient-start=25%] - At which percentage the background should start getting transparent.
 * @cssprop [--sbb-teaser-product-background-gradient-end=75%] - At which percentage the background should be fully transparent.
 */
export
@customElement('sbb-teaser-product')
class SbbTeaserProductElement extends SbbTeaserProductCommonElementMixin(SbbLinkBaseElement) {
  public static override styles: CSSResultGroup = [teaserProductCommonStyle, style];

  protected override render(): TemplateResult {
    // We render the content outside the anchor tag to allow screen readers to navigate through it
    return html`
      <div class="sbb-teaser-product__wrapper">
        ${this.renderLink(
          // For SEO we add the accessibility hidden as hidden content of the link
          html`<sbb-screen-reader-only>${this.accessibilityLabel}</sbb-screen-reader-only>`,
        )}
        ${this.renderTemplate()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-teaser-product': SbbTeaserProductElement;
  }
}
