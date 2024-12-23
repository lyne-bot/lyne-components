import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import style from './screen-reader-only.scss?lit&inline';

/**
 * This component can be used to visually hide content but present it to screen readers.
 *
 * @slot - Use the unnamed slot to provide content.
 */
export
@customElement('sbb-screen-reader-only')
class SbbScreenReaderOnlyElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-screen-reader-only': SbbScreenReaderOnlyElement;
  }
}
