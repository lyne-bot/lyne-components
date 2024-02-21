import type { TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import {
  type SbbActionBaseElement,
  type AbstractConstructor,
  type SbbDisabledMixinType,
  type SbbIconNameMixinType,
  type SbbNegativeMixinType,
  NamedSlotStateController,
  SbbIconNameMixin,
  SbbNegativeMixin,
} from '../../core/common-behaviors';

import '../../icon';

export type SbbButtonSize = 'l' | 'm';

export declare class SbbButtonCommonElementMixinType
  implements SbbNegativeMixinType, Partial<SbbDisabledMixinType>, Partial<SbbIconNameMixinType>
{
  public size?: SbbButtonSize;
  public disabled: boolean;
  public iconName?: string;
  public negative: boolean;
  protected renderIcon(): TemplateResult;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbButtonCommonElementMixin = <T extends AbstractConstructor<SbbActionBaseElement>>(
  superClass: T,
): AbstractConstructor<SbbButtonCommonElementMixinType> & T => {
  abstract class SbbButtonCommonElement
    extends SbbNegativeMixin(SbbIconNameMixin(superClass))
    implements Partial<SbbButtonCommonElementMixinType>
  {
    /** Size variant, either l or m. */
    @property({ reflect: true }) public size?: SbbButtonSize = 'l';

    public constructor(...args: any[]) {
      super(args);
      new NamedSlotStateController(this);
    }

    protected renderIcon(): TemplateResult {
      return html`<span class="sbb-button__icon"> ${super.renderIconSlot()} </span>`;
    }

    protected override renderTemplate(): TemplateResult {
      return html`
        ${this.renderIcon()}
        <span class="sbb-button__label">
          <slot></slot>
        </span>
      `;
    }
  }
  return SbbButtonCommonElement as unknown as AbstractConstructor<SbbButtonCommonElementMixinType> &
    T;
};
