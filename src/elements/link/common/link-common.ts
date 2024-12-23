import type { CSSResultGroup, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import type { SbbActionBaseElement } from '../../core/base-elements.js';
import { hostAttributes, slotState } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import {
  SbbNegativeMixin,
  type SbbNegativeMixinType,
  type AbstractConstructor,
} from '../../core/mixins.js';

import style from './link.scss?lit&inline';

export type SbbLinkSize = 'xs' | 's' | 'm';

export declare class SbbLinkCommonElementMixinType extends SbbNegativeMixinType {
  public accessor size: SbbLinkSize;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbLinkCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbLinkCommonElementMixinType> & T => {
  @hostAttributes({ 'data-sbb-link': '' })
  @slotState()
  abstract class SbbLinkCommonElement
    extends SbbNegativeMixin(superClass)
    implements Partial<SbbLinkCommonElementMixinType>
  {
    public static styles: CSSResultGroup = style;

    /**
     * Text size, the link should get in the non-button variation.
     * With inline variant, the text size adapts to where it is used.
     * @default 's' / 'xs' (lean)
     */
    @property({ reflect: true }) public accessor size: SbbLinkSize = isLean() ? 'xs' : 's';

    protected override renderTemplate(): TemplateResult {
      return html`<slot></slot>`;
    }
  }
  return SbbLinkCommonElement as unknown as AbstractConstructor<SbbLinkCommonElementMixinType> & T;
};
