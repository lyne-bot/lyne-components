import type { CSSResultGroup, PropertyValues, TemplateResult } from 'lit';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { forceType, slotState } from '../core/decorators.js';
import { isLean } from '../core/dom.js';
import { SbbFormAssociatedCheckboxMixin } from '../core/mixins.js';
import { SbbIconNameMixin } from '../icon.js';

import style from './toggle-check.scss?lit&inline';

/**
 * It displays a toggle checkbox.
 *
 * @slot - Use the unnamed slot to add content to the toggle label.
 * @slot icon - Use this slot to provide an icon. If `icon-name` is set, a sbb-icon will be used.
 * @event {Event} change - Event fired on change.
 * @event {InputEvent} input - Event fired on input.
 */
export
@customElement('sbb-toggle-check')
@slotState()
class SbbToggleCheckElement extends SbbFormAssociatedCheckboxMixin(SbbIconNameMixin(LitElement)) {
  public static override styles: CSSResultGroup = style;

  /**
   * Size variant, either m, s or xs.
   * @default 's' / 'xs' (lean)
   */
  @property({ reflect: true }) public accessor size: 'xs' | 's' | 'm' = isLean() ? 'xs' : 's';

  /** The svg name for the true state - default -> 'tick-small' */
  @forceType()
  @property({ attribute: 'icon-name' })
  public override accessor iconName: string = 'tick-small';

  /** The label position relative to the toggle. Defaults to 'after' */
  @property({ attribute: 'label-position', reflect: true })
  public accessor labelPosition: 'before' | 'after' = 'after';

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    super.willUpdate(changedProperties);

    if (changedProperties.has('checked')) {
      this.internals.ariaChecked = `${this.checked}`;
      this.toggleAttribute('data-checked', this.checked);
    }
  }

  protected override render(): TemplateResult {
    return html`
      <span class="sbb-toggle-check">
        <span class="sbb-toggle-check__container">
          <span class="sbb-toggle-check__label">
            <slot></slot>
          </span>
          <span class="sbb-toggle-check__track">
            <span class="sbb-toggle-check__circle">
              <span class="sbb-toggle-check__icon"> ${this.renderIconSlot()} </span>
            </span>
          </span>
        </span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'sbb-toggle-check': SbbToggleCheckElement;
  }
}
