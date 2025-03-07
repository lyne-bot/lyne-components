import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './__noPrefixName__.scss?lit&inline';

/**
 * Describe the purpose of the component with a single short sentence.
 *
 * @slot - Use the unnamed slot to add `sbb-TODO` elements.
 */
export
@customElement('__name__')
class __nameUpperCase__ extends LitElement {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    // Add event names or remove
  } as const;

  protected override render(): TemplateResult {
    return html`
      <div class="__name__"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    '__name__': __nameUpperCase__;
  }
}
