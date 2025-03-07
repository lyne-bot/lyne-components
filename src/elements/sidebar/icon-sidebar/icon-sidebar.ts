import { type CSSResultGroup, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, hostAttributes } from '../../core/decorators.js';
import type { SbbIconSidebarContainerElement } from '../icon-sidebar-container.js';

import style from './icon-sidebar.scss?lit&inline';

/**
 * Icon sidebar, can be placed inside a `sbb-icon-sidebar-container` element.
 *
 * @slot - Use the unnamed slot to slot any content into the icon-sidebar.
 */
export
@customElement('sbb-icon-sidebar')
@hostAttributes({ role: 'navigation' })
class SbbIconSidebarElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** Background color of the icon sidebar. Either `white` or `milk`. **/
  @forceType((v) => (v === 'milk' ? 'milk' : 'white'))
  @property({ reflect: true })
  public accessor color: 'white' | 'milk' = 'white';

  /** Returns the SbbIconSidebarContainerElement where this icon-sidebar is contained. */
  public get container(): SbbIconSidebarContainerElement | null {
    return this.closest('sbb-icon-sidebar-container');
  }

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
    'sbb-icon-sidebar': SbbIconSidebarElement;
  }
}
