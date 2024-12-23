import { html, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { slotState } from '../../core/decorators.js';
import {
  type AbstractConstructor,
  SbbNegativeMixin,
  type SbbNegativeMixinType,
} from '../../core/mixins.js';

export declare class SbbTeaserProductCommonElementMixinType extends SbbNegativeMixinType {
  public accessor imageAlignment: 'after' | 'before';
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbTeaserProductCommonElementMixin = <
  T extends AbstractConstructor<SbbActionBaseElement>,
>(
  superClass: T,
): AbstractConstructor<SbbTeaserProductCommonElementMixinType> & T => {
  @slotState()
  abstract class SbbTeaserProductCommonElement
    extends SbbNegativeMixin(superClass)
    implements SbbTeaserProductCommonElementMixinType
  {
    /**
     * Whether the fully visible part of the image is aligned 'before' or 'after' the content.
     * Only relevant starting from large breakpoint.
     */
    @property({ attribute: 'image-alignment', reflect: true })
    public accessor imageAlignment: 'after' | 'before' = 'after';

    protected override renderTemplate(): TemplateResult {
      return html`
        <div class="sbb-teaser-product__root">
          <div class="sbb-teaser-product__image-container"><slot name="image"></slot></div>
          <div class="sbb-teaser-product__container">
            <span class="sbb-teaser-product__content">
              <slot></slot>
            </span>
            <div class="sbb-teaser-product__footnote">
              <slot name="footnote"></slot>
            </div>
          </div>
        </div>
      `;
    }
  }
  return SbbTeaserProductCommonElement as AbstractConstructor<SbbTeaserProductCommonElementMixinType> &
    T;
};
