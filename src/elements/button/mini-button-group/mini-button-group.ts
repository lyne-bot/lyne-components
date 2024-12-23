import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType } from '../../core/decorators.js';
import { isLean } from '../../core/dom.js';
import { SbbNamedSlotListMixin, SbbNegativeMixin } from '../../core/mixins.js';
import type { SbbDividerElement } from '../../divider/divider.js';
import type { SbbMiniButtonElement } from '../mini-button/mini-button.js';

import style from './mini-button-group.scss?lit&inline';

export type SbbMiniButtonGroupSize = 's' | 'm' | 'l' | 'xl';

/**
 * Display a list of `sbb-mini-button` elements in a horizontal container,
 * possibly separated by a `sbb-divider` component.
 *
 * @slot - Use the unnamed slot to add `sbb-mini-button` and `sbb-divider` elements.
 */
export
@customElement('sbb-mini-button-group')
class SbbMiniButtonGroupElement extends SbbNegativeMixin(
  SbbNamedSlotListMixin<SbbMiniButtonElement, typeof LitElement>(LitElement),
) {
  public static override styles: CSSResultGroup = style;
  protected override readonly listChildLocalNames = ['sbb-mini-button', 'sbb-divider'];

  /** This will be forwarded as aria-label to the list that contains the buttons. */
  @forceType()
  @property({ attribute: 'accessibility-label' })
  public accessor accessibilityLabel: string = '';

  /**
   * Size variant, either s, m, l or xl.
   * @default 'm' / 's' (lean)
   */
  @property({ reflect: true }) public accessor size: SbbMiniButtonGroupSize = isLean() ? 's' : 'm';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('negative')) {
      this._proxyNegative();
    }
  }

  private _proxyNegative(): void {
    this.querySelectorAll?.<SbbDividerElement | SbbMiniButtonElement>(
      'sbb-divider, sbb-mini-button',
    ).forEach((e) => (e.negative = this.negative));
  }

  protected override render(): TemplateResult {
    return html`
      ${this.renderList(
        { ariaLabel: this.accessibilityLabel },
        { localNameVisualOnly: ['sbb-divider'] },
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-mini-button-group': SbbMiniButtonGroupElement;
  }
}
