import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SbbButtonCommonElement, SbbButtonSize } from '../button.js';
import { isLean } from '../core/dom.js';
import type { SbbHorizontalFrom, SbbOrientation } from '../core/interfaces.js';
import type {
  SbbBlockLinkButtonElement,
  SbbBlockLinkElement,
  SbbBlockLinkStaticElement,
  SbbLinkSize,
} from '../link.js';

import style from './action-group.scss?lit&inline';

/**
 * It can be used as a container for one or more action element, like `sbb-button` or `sbb-block-link`.
 *
 * @slot - Use the unnamed slot to add `sbb-block-link` or `sbb-button` elements to the `sbb-action-group`.
 */
export
@customElement('sbb-action-group')
class SbbActionGroupElement extends LitElement {
  public static override styles: CSSResultGroup = style;

  /**
   * Set the slotted `<sbb-action-group>` children's alignment.
   */
  @property({ attribute: 'align-group', reflect: true })
  public accessor alignGroup: 'start' | 'center' | 'stretch' | 'end' = 'start';

  /**
   * Overrides the behaviour of `orientation` property.
   */
  @property({ attribute: 'horizontal-from', reflect: true })
  public accessor horizontalFrom: SbbHorizontalFrom = 'medium';

  /**
   * Indicates the orientation of the components inside the `<sbb-action-group>`.
   */
  @property({ reflect: true })
  public accessor orientation: SbbOrientation = 'horizontal';

  /**
   * Size of the nested sbb-button instances.
   * This will overwrite the size attribute of nested sbb-button instances.
   * @default 'l' / 's' (lean)
   */
  @property({ attribute: 'button-size', reflect: true })
  public accessor buttonSize: SbbButtonSize = isLean() ? 's' : 'l';

  /**
   * Size of the nested sbb-block-link instances.
   * This will overwrite the size attribute of nested sbb-block-link instances.
   * @default 'm' / 'xs' (lean)
   */
  @property({ attribute: 'link-size', reflect: true })
  public accessor linkSize: SbbLinkSize = isLean() ? 'xs' : 'm';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('buttonSize')) {
      this._syncButtons();
    }
    if (changedProperties.has('linkSize')) {
      this._syncLinks();
    }
  }

  private _syncButtons(): void {
    this.querySelectorAll?.<SbbButtonCommonElement>('[data-sbb-button]').forEach(
      (b) => (b.size = this.buttonSize),
    );
  }

  private _syncLinks(): void {
    this.querySelectorAll?.<
      SbbBlockLinkElement | SbbBlockLinkButtonElement | SbbBlockLinkStaticElement
    >('sbb-block-link, sbb-block-link-button, sbb-block-link-static').forEach((link) => {
      link.size = this.linkSize;
    });
  }

  protected override render(): TemplateResult {
    return html`
      <div class="sbb-action-group">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-action-group': SbbActionGroupElement;
  }
}
