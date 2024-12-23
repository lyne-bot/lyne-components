import { html, type LitElement, nothing, type TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { forceType, omitEmptyConverter } from '../core/decorators.js';
import type { AbstractConstructor } from '../core/mixins.js';

import './icon.js';

export declare class SbbIconNameMixinType {
  public accessor iconName: string;
  protected renderIconSlot(classname?: string): TemplateResult;
}

/**
 * Enhance your component with an iconName property and provides a template for the icon slot.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SbbIconNameMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
): AbstractConstructor<SbbIconNameMixinType> & T => {
  abstract class SbbIconNameElement extends superClass implements Partial<SbbIconNameMixinType> {
    /**
     * The icon name we want to use, choose from the small icon variants
     * from the ui-icons category from here
     * https://icons.app.sbb.ch.
     */
    @forceType()
    @property({ attribute: 'icon-name', reflect: true, converter: omitEmptyConverter })
    public accessor iconName: string = '';

    protected renderIconSlot(classname?: string): TemplateResult {
      return html`
        <slot name="icon">
          ${this.iconName
            ? html`<sbb-icon name=${this.iconName} class=${classname || nothing}></sbb-icon>`
            : nothing}
        </slot>
      `;
    }
  }

  return SbbIconNameElement as unknown as AbstractConstructor<SbbIconNameMixinType> & T;
};
