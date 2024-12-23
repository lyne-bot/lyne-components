import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { isLean } from '../../core/dom.js';

import style from './card.scss?lit&inline';

/**
 * It displays content related to a single subject.
 *
 * @slot - Use the unnamed slot to add content to the card.
 * @slot badge - Use this slot to render a `sbb-card-badge` component.
 * @slot action - Use this slot to render a `sbb-card-button` or a `sbb-card-link` component.
 */
export
@customElement('sbb-card')
class SbbCardElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Size variant, either xs, s, m, l, xl, xxl or xxxl.
   * @default 'm' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size:
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | 'xxl'
    | 'xxxl' = isLean() ? 'xs' : 'm';

  /** Option to set the component's background color. */
  @property({ reflect: true }) public accessor color:
    | 'white'
    | 'milk'
    | 'transparent-bordered'
    | 'transparent-bordered-dashed' = 'white';

  /**
   * It is used internally to show the `<sbb-card-badge>`.
   *
   * @returns True whether size is equal to m, l, xl or xxl.
   */
  private _isBadgeVisible(): boolean {
    return ['m', 'l', 'xl', 'xxl', 'xxxl'].includes(this.size);
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-card">
        <slot name="action"></slot>
        <span class="sbb-card__wrapper">
          <slot></slot>
        </span>
        ${this._isBadgeVisible()
          ? html`<span class="sbb-card__badge-wrapper">
              <slot name="badge"></slot>
            </span>`
          : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-card': SbbCardElement;
  }
}
