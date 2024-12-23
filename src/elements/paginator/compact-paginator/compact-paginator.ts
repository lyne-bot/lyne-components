import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { SbbPaginatorCommonElementMixin } from '../common.js';
import '../../divider.js';

import style from './compact-paginator.scss?lit&inline';

/**
 * It displays a paginator component in compact mode.
 *
 * @event {CustomEvent<SbbPaginatorPageEventDetails>} page - Emits when the pageIndex changes.
 */
export
@customElement('sbb-compact-paginator')
class SbbCompactPaginatorElement extends SbbPaginatorCommonElementMixin(LitElement) {
  public static override styles: CSSResultGroup = style;
  public static readonly events: Record<string, string> = {
    page: 'page',
  } as const;

  private _renderPageNumbers(): TemplateResult {
    return html`
      <span class="sbb-paginator__pages"
        >${this.pageIndex + 1}<sbb-divider
          aria-hidden="true"
          orientation="vertical"
          class="sbb-compact-paginator__divider"
          ?negative=${this.negative}
        ></sbb-divider
        >${this.numberOfPages()}</span
      >
    `;
  }

  protected override renderPaginator(): TemplateResult {
    return html`
      <div class="sbb-compact-paginator">
        ${this.pagerPosition === 'start'
          ? html`${this.renderPrevNextButtons()} ${this._renderPageNumbers()}`
          : html`${this._renderPageNumbers()} ${this.renderPrevNextButtons()}`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-compact-paginator': SbbCompactPaginatorElement;
  }
}
