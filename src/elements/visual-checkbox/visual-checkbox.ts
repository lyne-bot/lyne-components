import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbCheckboxSize } from '../checkbox/common.js';
import { forceType } from '../core/decorators.js';
import { isLean } from '../core/dom.js';
import { SbbDisabledMixin, SbbNegativeMixin } from '../core/mixins.js';

import style from './visual-checkbox.scss?lit&inline';

/**
 * It visually displays a non-interactive checkbox.
 */
export
@customElement('sbb-visual-checkbox')
class SbbVisualCheckboxElement extends SbbDisabledMixin(SbbNegativeMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  /** Checked state. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor checked: boolean = false;

  /** Indeterminate state. */
  @forceType()
  @property({ reflect: true, type: Boolean })
  public accessor indeterminate: boolean = false;

  /**
   * Size of the checkbox, either xs, s or m.
   * @default 'm' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size: SbbCheckboxSize = isLean() ? 'xs' : 'm';

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-visual-checkbox">
        <span class="sbb-visual-checkbox__icon">
          ${this.checked || this.indeterminate
            ? html`<svg
                width=${this.size === 'xs' ? '20' : '24'}
                height=${this.size === 'xs' ? '20' : '24'}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d=${this.indeterminate ? 'M9 12H15' : 'M8 12.3304L10.4615 15L16 9'}
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>`
            : nothing}
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-visual-checkbox': SbbVisualCheckboxElement;
  }
}
