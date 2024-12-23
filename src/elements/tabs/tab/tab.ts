import type { CSSResultGroup, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import type { SbbTabLabelElement } from '../tab-label.js';

import style from './tab.scss?lit&inline';

/**
 * Combined with a `sbb-tab-group`, it displays a tab's content.
 *
 * @slot - Use the unnamed slot to provide content.
 */
export
@customElement('sbb-tab')
class SbbTabElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /** The `sbb-tab-label` associated with the tab. */
  public get label(): SbbTabLabelElement | null {
    return this._label;
  }
  private _label: SbbTabLabelElement | null = null;

  private _getTabLabel(): SbbTabLabelElement | null {
    let previousSibling = this.previousElementSibling;
    while (previousSibling && previousSibling.localName !== 'sbb-tab-label') {
      previousSibling = previousSibling.previousElementSibling;
    }
    return previousSibling as SbbTabLabelElement;
  }

  /** @internal */
  public configure(): void {
    this._label = this._getTabLabel();
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-tab">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-tab': SbbTabElement;
  }
}
