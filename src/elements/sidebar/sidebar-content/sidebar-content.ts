import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';

import { sidebarContentCommonStyle } from '../common.js';

import style from './sidebar-content.scss?lit&inline';

/**
 * Container for the sidebar content. Intended to be placed inside an `sbb-sidebar-container` element.
 *
 * @slot - Use the unnamed slot to add any content elements.
 * Further `sbb-sidebar-container`s are possible.
 */
export
@customElement('sbb-sidebar-content')
class SbbSidebarContentElement extends LitElement {
  public static override styles: CSSResultGroup = [sidebarContentCommonStyle, style];

  public override connectedCallback(): void {
    super.connectedCallback();

    // As we can't include the scrollbar mixin on the host and to minimize
    // payload, we decided to add the scrollbar class here.
    // This is an exception as we normally don't alter the classList of the host.
    this.classList.add('sbb-scrollbar');
  }

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-sidebar-content': SbbSidebarContentElement;
  }
}
