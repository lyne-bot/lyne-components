import type { CSSResultGroup, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { html } from 'lit/static-html.js';

import { SbbHydrationMixin, SbbLinkBaseElement } from '../../core/common-behaviors';
import { SbbIconNameMixin } from '../../icon';

import style from './breadcrumb.scss?lit&inline';

/**
 * It displays a link to a page; used within a `sbb-breadcrumb-group` it can display the path to the current page.
 *
 * @slot - Use the unnamed slot to add content to the breadcrumb.
 * @slot icon - Use this to display an icon as breadcrumb.
 */
@customElement('sbb-breadcrumb')
export class SbbBreadcrumbElement extends SbbIconNameMixin(SbbHydrationMixin(SbbLinkBaseElement)) {
  public static override styles: CSSResultGroup = style;

  @state() private _hasText = false;

  private _handleSlotchange(): void {
    this._hasText = Array.from(this.childNodes ?? []).some(
      (n) => !(n as Element).slot && n.textContent?.trim(),
    );
  }

  protected override renderTemplate(): TemplateResult {
    return html`
      ${this.renderIconSlot('sbb-breadcrumb__icon')}
      <span class="sbb-breadcrumb__label" ?hidden=${!this._hasText}>
        <slot @slotchange=${this._handleSlotchange}></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-breadcrumb': SbbBreadcrumbElement;
  }
}
